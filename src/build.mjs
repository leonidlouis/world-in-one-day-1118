// Round 3: large illustrated front page, compact one-line news digest.
// Sources are ONLY the two supplied sheets; addendum date corrections prevail.
import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {stories} from './stories.mjs';
import {continents} from './art.mjs';
import {scenes} from './scenes.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const C={paper:'#f6f1e7',ink:'#20282c',line:'#c7c4b9',white:'#fbf8f1',europe:'#365e88',middleEast:'#ae4138',asia:'#72517f',africa:'#43765c',americas:'#bc6d36',global:'#2f7775'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const tx=(x,y,s,size=12,weight=500,fill=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const rect=(x,y,w,h,c,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${extra}/>`;
const circle=(x,y,r,c,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${extra}/>`;
const path=(d,c,extra='')=>`<path d="${d}" fill="${c}" ${extra}/>`;
const line=(x,y,x2,y2,c=C.line,w=.7)=>path(`M${x} ${y} L${x2} ${y2}`,'none',`stroke="${c}" stroke-width="${w}" stroke-linecap="round"`);
const label=(id,x,y,c,w=17,h=11)=>rect(x,y,w,h,c,'rx="2"')+tx(x+w/2,y+h-2.4,String(id),8.8,750,'white','text-anchor="middle"');
const begin=(d,x,y,w,h)=>`<g data-card="${d.id}" data-x="${x}" data-y="${y}" data-width="${w}" data-height="${h}">`;
const art=(d,x,y,w,h)=>`<svg data-illustration="${d.id}" x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${scenes[d.scene].w} ${scenes[d.scene].h}"><use href="#scene-${d.scene}"/></svg>`;
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><style>text{font-family:'Barlow Condensed',sans-serif}.serif{font-family:'Liberation Serif',serif}</style><defs>${Object.entries(scenes).map(([id,s])=>`<symbol id="scene-${id}" viewBox="0 0 ${s.w} ${s.h}">${s.art}</symbol>`).join('')}</defs>${rect(0,0,1024,1024,C.paper)}`;
svg+=tx(20,18,'THE DAY IN WORLD NEWS',11.7,750,C.ink,'letter-spacing="1.5"')+tx(1004,18,'45 STORIES · 6 CONTINENTS · ONE DAY',11.7,650,C.ink,'text-anchor="end" letter-spacing=".9"');
svg+=tx(512,80,'Wednesday 18 November 2026',74,700,C.ink,'class="serif" text-anchor="middle"')+rect(20,100,984,1.5,C.ink);
const figures=[['141','Russian drones / Ukraine air force'],['3.6%','UK October CPI / ONS'],['< $3,800','Gold per ounce / year-plus low'],['750,000 b/d','Iraq–Turkey oil / up to'],['$70–$78','Anthropic IPO / price range'],['DAY 10','COP31 / talks end Friday']];
figures.forEach(([value,caption],i)=>{const x=20+i*164;svg+=tx(x+7,133,value,27,750,i===2?C.americas:C.ink)+tx(x+7,148,caption,10.2,500);if(i)svg+=line(x,112,x,150,C.line,.7);});
svg+=line(20,156,1004,156,C.ink,.8);
const leads=stories.filter(d=>d.tier==='lead');
leads.forEach((d,i)=>{const x=20+i*332,y=166,c=C[d.region];svg+=begin(d,x,y,320,260)+art(d,x,y,320,132)+rect(x,y,320,3,c)+rect(x,y+132,320,18,'#28383d')+tx(x+8,y+145,d.caption,10.6,650,'#fff9eb','letter-spacing=".8"')+tx(x+1,y+166,`${d.id} · ${d.kicker}`,10.6,750,c,'letter-spacing=".8"')+d.title.map((s,j)=>tx(x+1,y+190+j*27,s,26,700,C.ink,'class="serif"')).join('')+d.deck.map((s,j)=>tx(x+1,y+237+j*15,s,13,500)).join('')+'</g>';});
const medium=stories.filter(d=>d.tier==='medium');
medium.forEach((d,i)=>{const x=20+(i%5)*198.4,y=436+Math.floor(i/5)*180,c=C[d.region];svg+=begin(d,x,y,190.4,170)+art(d,x,y,190.4,62)+rect(x,y,190.4,2.5,c)+rect(x,y+62,190.4,13,'#28383d')+tx(x+5,y+72,d.caption,8.6,650,'#fff9eb','letter-spacing=".4"')+tx(x+1,y+90,`${d.id} · ${d.kicker}`,8.9,750,c,'letter-spacing=".4"')+d.title.map((s,j)=>tx(x+1,y+111+j*19,s,17,700,C.ink,'class="serif"')).join('')+d.deck.map((s,j)=>tx(x+1,y+148+j*13,s,11.1,500)).join('')+'</g>';});
svg+=line(20,794,1004,794,C.ink,.8)+tx(20,810,'WHERE IT HAPPENED',12.5,700,C.ink,'class="serif"')+tx(300,809,'dots = briefs',8.8,550,C.ink,'text-anchor="end"')+tx(312,810,'ALSO ON WEDNESDAY 18 NOVEMBER',12.5,700,C.ink,'class="serif" letter-spacing=".4"');
// Compact world overview: numbered pins for illustrated stories, dots for briefs.
const P=([lon,lat])=>[24+(lon+180)/360*270,820+(80-lat)/140*124];
svg+=rect(20,817,280,142,'#e5ebe3');
for(const lon of [-120,-60,0,60,120]){const [x]=P([lon,0]);svg+=line(x,820,x,948,'#d6ded4',.5);}
for(const lat of [-30,0,30,60]){const [,y]=P([0,lat]);svg+=line(24,y,294,y,'#d6ded4',.5);}
continents.forEach(poly=>svg+=path(poly.map((p,i)=>(i?'L':'M')+P(p).join(' ')).join(' ')+'Z','#b3c3b1','stroke="#f4f5e9" stroke-width=".45"'));
const positions={1:[263,852],2:[213,858],3:[201,838],4:[181,829],5:[148,829],6:[239,903],7:[175,903],8:[251,879],9:[91,842],11:[178,876],13:[91,873]};
const mapped=stories.filter(d=>d.tier!=='brief'&&d.xy).map(d=>({d,p:P(d.xy),label:positions[d.id]}));
stories.filter(d=>d.tier==='brief'&&d.xy).forEach(d=>{const [x,y]=P(d.xy);svg+=circle(x,y,1.8,C[d.region],'stroke="#f6f1e7" stroke-width=".4"');});
mapped.forEach(({d,p:[x,y],label:[lx,ly]})=>svg+=line(x,y,lx,ly,C[d.region],.7)+circle(x,y,1.8,C[d.region]));
mapped.forEach(({d,label:[x,y]})=>svg+=`<g data-pin="${d.id}" data-lon="${d.xy[0]}" data-lat="${d.xy[1]}">${label(d.id,x-8.5,y-5.5,C[d.region])}</g>`);
svg+=label(10,24,945,C.global)+tx(45,954,'GLOBAL',8.6,650,C.global)+label(12,130,945,C.global)+tx(151,954,'DEEP SPACE',8.6,650,C.global);
const legend=[['europe','Europe'],['middleEast','Middle East'],['asia','Asia'],['africa','Africa'],['americas','Americas'],['global','Global / Oceania']];
legend.forEach(([region,name],i)=>{const x=24+(i%3)*90,y=971+Math.floor(i/3)*13;svg+=circle(x,y-3,2.6,C[region])+tx(x+7,y,name,9.7,600);});
// The list uses one line per report: bold place, specific fact, no tiny pictures.
const briefs=stories.filter(d=>d.tier==='brief');
briefs.forEach((d,i)=>{const x=312+Math.floor(i/16)*352,y=825+(i%16)*11,ink=C[d.region];svg+=`<g data-brief="${d.id}">${label(d.id,x,y-8,ink,17,10)}<text x="${x+23}" y="${y}" font-size="11.2" font-weight="500" fill="${C.ink}"><tspan font-weight="750">${esc(d.place)}:</tspan><tspan dx="3">${esc(d.fact)}</tspan></text></g>`;});
svg+=line(20,998,1004,998,C.ink,.8)+tx(20,1009,'Every story here happened or was first reported on 18 November 2026. Claims by warring sides are attributed.',9.7,500)+tx(20,1020,'Sources: AP · Reuters · Xinhua · BBC · ONS · IMD · Amnesty · ECDC · NASA · CNBC · Anadolu · supplied verified reports',9.2,550);
svg+='</svg>';
mkdirSync(resolve(root,'build'),{recursive:true});
writeFileSync(resolve(root,'build/frontpage.svg'),svg);
writeFileSync(resolve(root,'build/frontpage.html'),`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}html,body{margin:0;width:1024px;height:1024px;overflow:hidden}svg{display:block}</style>${svg}`);
writeFileSync(resolve(root,'build/stories.json'),JSON.stringify(stories,null,2));
console.log('Built 45 stories: 3 illustrated leads, 10 medium scenes, 32 one-line briefs.');
