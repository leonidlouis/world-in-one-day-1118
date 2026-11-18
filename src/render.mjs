// Chrome/CDP rendering keeps all type as real SVG text at native resolution.
import './build.mjs';
import {spawn,spawnSync} from 'node:child_process';
import {mkdirSync,mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const profile=mkdtempSync(resolve(tmpdir(),'news1118-chrome-'));
mkdirSync(resolve(root,'assets'),{recursive:true});
const child=spawn('/usr/bin/google-chrome',[
  '--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
  '--no-first-run','--no-default-browser-check','--disable-background-networking',
  '--disable-extensions','--no-proxy-server','--hide-scrollbars',
  '--force-device-scale-factor=1',`--user-data-dir=${profile}`,'--remote-debugging-pipe',
],{stdio:['ignore','ignore','pipe','pipe','pipe'],env:{...process.env,XDG_CONFIG_HOME:profile,XDG_DATA_HOME:profile,XDG_CACHE_HOME:profile}});
let serial=0,buffer='',stderr='';
const pending=new Map();
child.stderr.on('data',chunk=>{stderr=(stderr+chunk).slice(-4000);});
child.stdio[4].on('data',chunk=>{buffer+=chunk;let end;while((end=buffer.indexOf('\0'))>=0){const raw=buffer.slice(0,end);buffer=buffer.slice(end+1);if(!raw)continue;const message=JSON.parse(raw);if(message.id){const handler=pending.get(message.id);pending.delete(message.id);if(message.error)handler?.reject(Error(JSON.stringify(message.error)));else handler?.resolve(message.result);}}});
function cmd(method,params={},sessionId){return new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});child.stdio[3].write(JSON.stringify({id,method,params,sessionId})+'\0');});}
const timeout=setTimeout(()=>{console.error('Chrome rendering timed out:',stderr);child.kill('SIGKILL');process.exitCode=1;},45000);
try{
  const {targetId}=await cmd('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await cmd('Target.attachToTarget',{targetId,flatten:true});
  await cmd('Emulation.setDeviceMetricsOverride',{width:1024,height:1024,deviceScaleFactor:1,mobile:false},sessionId);
  await cmd('Page.enable',{},sessionId);
  await cmd('Page.navigate',{url:pathToFileURL(resolve(root,'build/frontpage.html')).href},sessionId);
  // Poll through CDP until the local document is parsed, then await its fonts.
  for(let i=0;i<100;i++){
    const r=await cmd('Runtime.evaluate',{expression:'document.querySelectorAll("[data-card]").length',returnByValue:true},sessionId);
    if(r.result.value===13)break;
    await new Promise(r=>setTimeout(r,50));
    if(i===99)throw Error('Document did not load');
  }
  await cmd('Runtime.evaluate',{expression:'document.fonts.ready.then(()=>true)',awaitPromise:true,returnByValue:true},sessionId);
  const audit=await cmd('Runtime.evaluate',{expression:`(()=>{
    const context=document.createElement('canvas').getContext('2d');
    const box=e=>{
      const r=e.getBoundingClientRect();
      if(!['text','tspan'].includes(e.tagName.toLowerCase()))return {x:r.x,y:r.y,w:r.width,h:r.height,text:e.textContent};
      if(e.children.length){const boxes=[...e.children].map(box);const x=Math.min(...boxes.map(b=>b.x)),y=Math.min(...boxes.map(b=>b.y));return {x,y,w:Math.max(...boxes.map(b=>b.x+b.w))-x,h:Math.max(...boxes.map(b=>b.y+b.h))-y,text:e.textContent};}
      const style=getComputedStyle(e);context.font=style.fontWeight+' '+style.fontSize+' '+style.fontFamily;
      const m=context.measureText(e.textContent),point=e.getStartPositionOfChar(0);
      return {x:point.x-m.actualBoundingBoxLeft,y:point.y-m.actualBoundingBoxAscent,w:m.actualBoundingBoxLeft+m.actualBoundingBoxRight,h:m.actualBoundingBoxAscent+m.actualBoundingBoxDescent,text:e.textContent};
    };
    const cards=[...document.querySelectorAll('[data-card]')].map(g=>({id:g.dataset.card,x:+g.dataset.x,y:+g.dataset.y,w:+g.dataset.width,h:+g.dataset.height,text:[...g.querySelectorAll('text')].map(box),icons:[...g.querySelectorAll('[data-illustration] use')].map(box)}));
    const pins=[...document.querySelectorAll('[data-pin]')].map(g=>({id:g.dataset.pin,lon:+g.dataset.lon,lat:+g.dataset.lat,text:box(g.querySelector('text'))}));
    const briefs=[...document.querySelectorAll('[data-brief]')].map(g=>({id:+g.dataset.brief,text:box(g.querySelector('text:last-child'))}));
    return {cards,pins,briefs,text:[...document.querySelectorAll('text')].filter(e=>!e.closest('defs')).map(box)};
  })()`,returnByValue:true},sessionId);
  writeFileSync(resolve(root,'build/audit.json'),JSON.stringify(audit.result.value,null,2));
  const shot=await cmd('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false,clip:{x:0,y:0,width:1024,height:1024,scale:1}},sessionId);
  writeFileSync(resolve(root,'build/raw.png'),Buffer.from(shot.data,'base64'));
  await cmd('Browser.close');
}finally{
  clearTimeout(timeout);
  child.kill();
  rmSync(profile,{recursive:true,force:true,maxRetries:4,retryDelay:100});
}
const result=spawnSync('python3',[resolve(root,'src/inspect.py')],{encoding:'utf8'});
process.stdout.write(result.stdout||'');
if(result.status!==0)throw Error(result.stderr);
