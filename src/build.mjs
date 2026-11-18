// Original dense front page. Reporting is exclusively the supplied fact sheet.
import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {stories} from './stories.mjs';
import {icons,continents} from './art.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const C={ink:'#142a3b',paper:'#f6f1e6',line:'#d3cec1',white:'#fffdf7',water:'#e4edeb',land:'#a7bdb4',politics:'#173d5b',conflict:'#b73731',economy:'#9b6c18',climate:'#387346',society:'#237c7c',sport:'#bb5a1b'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text=(x,y,s,size=12,weight=500,fill=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const rect=(x,y,w,h,c,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${extra}/>`;
const path=(d,c,extra='')=>`<path d="${d}" fill="${c}" ${extra}/>`;
const stroke=(d,c,w=1)=>path(d,'none',`stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`);
const circle=(x,y,r,c,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${extra}/>`;
const artwork=(name,x,y,w,h)=>`<svg data-illustration="${name}" x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 160 100"><use href="#art-${name}"/></svg>`;
const badge=(id,x,y,c,r=8,size=9)=>circle(x,y,r,c)+text(x,y+size*.34,id,size,750,'white','text-anchor="middle"');
const group=(d,x,y,w,h,content)=>`<g data-card="${d.id}" data-x="${x}" data-y="${y}" data-width="${w}" data-height="${h}">${rect(x,y,w,h,C.white,`stroke="${C.line}" stroke-width=".7"`)}${content}</g>`;
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><style>text{font-family:'Barlow Condensed',sans-serif}.serif{font-family:'Bitter',serif}</style><defs>${Object.entries(icons).map(([id,art])=>`<symbol id="art-${id}" viewBox="0 0 160 100">${art}</symbol>`).join('')}</defs>${rect(0,0,1024,1024,C.paper)}`;
svg+=rect(20,13,30,3,C.conflict)+text(60,21,'THE WORLD IN ONE DAY',14,700,C.ink,'class="serif" letter-spacing="1.2"')+text(1004,21,'46 REPORTS  /  SIX CONTINENTS  /  DAILY EDITION',12,650,C.ink,'text-anchor="end" letter-spacing=".7"');
svg+=text(512,90,'WEDNESDAY 18 NOVEMBER 2026',77,800,C.ink,'text-anchor="middle"')+rect(20,101,984,3,C.ink);
svg+=text(20,113,'THE DAY IN FIGURES',9,750,C.ink,'letter-spacing="1.4"')+text(1004,113,'DIPLOMACY / GULF WAR / AI MARKETS / CLIMATE / HEALTH / SPORT',8.5,600,C.ink,'text-anchor="end" letter-spacing=".6"');
const figures=[['NVIDIA Q3','$115.84B','revenue doubles'],['NVIDIA Q4','$130B','revenue guidance'],['ANTHROPIC IPO','$70–$78','range; pricing due today'],['GOLD','BELOW $3,800','lowest in >1 year'],['IRAQ → TURKEY','UP TO 750,000 b/d','pipeline oil flow'],['PRAGUE TRAINS','46 INJURED','near main station'],['ALASKA FLIPS','56–44 SENATE','January Dems / Anadolu'],['COP31','DAY 10','Antalya; ends Friday']];
svg+=rect(20,119,984,38,C.ink);
figures.forEach(([label,value,note],i)=>{const x=20+i*123;svg+=text(x+7,129,label,8.5,650,'#dbe3df','letter-spacing=".8"')+text(x+7,147,value,i===4?17:19,750,i===3?'#f0d29a':'white')+text(x+7,155,note,8.4,500,'#e4e7de');if(i)svg+=rect(x,125,.6,26,'#6a7b84');});
const leads=stories.filter(d=>d.tier==='lead');
leads.forEach((d,i)=>{const x=20+248*i,y=167,c=C[d.topic];svg+=group(d,x,y,240,154,rect(x,y,240,3,c)+badge(d.id,x+14,y+15,c,8,9)+text(x+28,y+19,d.tag,10,700,c,'letter-spacing=".8"')+artwork(d.icon,x+60,y+24,120,70)+d.title.map((s,j)=>text(x+10,y+110+j*24,s,25.5,750)).join('')+text(x+10,y+150,d.detail[0],10.3,500));});
const medium=stories.filter(d=>d.tier==='medium');
medium.forEach((d,i)=>{const x=20+(i%5)*198.4,y=331+Math.floor(i/5)*64,c=C[d.topic];svg+=group(d,x,y,190.4,59,rect(x,y,2,59,c)+badge(d.id,x+13,y+12,c,7.5,8.5)+artwork(d.icon,x+5,y+20,29,15)+d.title.map((s,j)=>text(x+39,y+16+j*18,s,16.5,750)).join('')+d.detail.map((s,j)=>text(x+8,y+46+j*10,s,9.7,500)).join(''));});

// Map: a world overview plus regional enlargements, all true geographic anchors.
svg+=rect(20,464,984,156,C.water,`stroke="${C.line}" stroke-width=".7"`)+text(28,476,'THE DAY MAPPED',10,750,C.ink,'letter-spacing="1"');
const legend=[['conflict','CONFLICT'],['politics','POLITICS'],['economy','ECONOMY'],['climate','CLIMATE'],['society','SOCIETY'],['sport','SPORT']];
legend.forEach(([topic,name],i)=>svg+=circle(142+i*54,473,2.3,C[topic])+text(147+i*54,476,name,7.7,650,C[topic]));
svg+=text(457,476,'NORTH AMERICA',8.5,750,C.ink,'letter-spacing=".6"')+text(678,476,'GLOBAL: 11, 14',8,650,C.ink,'text-anchor="end"')+text(698,476,'EUROPE · ENLARGED',9,750,C.ink,'letter-spacing=".7"');
const P=([lon,lat])=>[28+(lon+180)/360*410,484+(80-lat)/140*128];
for(const lon of [-120,-60,0,60,120]){const [x]=P([lon,0]);svg+=stroke(`M${x} 484 V613`,'#d2dfda',.5);}
for(const lat of [-30,0,30,60]){const [,y]=P([0,lat]);svg+=stroke(`M28 ${y} H438`,'#d2dfda',.5);}
continents.forEach(poly=>svg+=path(poly.map((p,i)=>(i?'L':'M')+P(p).join(' ')).join(' ')+'Z',C.land,'stroke="#f6f1e6" stroke-width=".5"'));
svg+=text(96,521,'NORTH AMERICA',8,650,'#405d5d','text-anchor="middle"')+text(147,588,'SOUTH AMERICA',8,650,'#405d5d','text-anchor="middle"')+text(232,575,'AFRICA',8.3,650,'#405d5d','text-anchor="middle"')+text(380,505,'ASIA',8.3,650,'#405d5d','text-anchor="middle"')+text(389,606,'OCEANIA',8.3,650,'#405d5d','text-anchor="middle"')+text(226,506,'EUROPE →',7.5,650,'#405d5d','text-anchor="middle"');
svg+=rect(449,482,235,132,'#edf2ed',`stroke="#b1c6bc" stroke-width=".8"`)+rect(691,482,305,132,'#edf2ed',`stroke="#b1c6bc" stroke-width=".8"`);
const N=([lon,lat])=>[456+(lon+170)/115*220,487+(75-lat)/65*122];
const E=([lon,lat])=>[699+(lon+15)/60*285,487+(65-lat)/36*122];
// The Europe inset has a more detailed coastline: Iberia, Italy, Greece, UK.
const europeCoasts=[
[[-9,36],[-9.5,43],[-2,44],[-1,46],[-5,48],[-4,49],[-1,49],[1,51],[4,52],[7,54],[8,55],[8,57],[10,58],[12,56],[12,55],[14,55],[14,54],[18,54],[20,55],[21,57],[24,59],[25,60],[23,61],[21,63],[18,65],[16,68],[20,70],[28,71],[31,70],[31,66],[29,63],[26,60],[29,60],[31,62],[40,65],[45,65],[45,42],[41,42],[40,43],[38,44],[37,45],[36,45],[34,45],[33,44],[32,45],[30,46],[28,45],[28,43],[27,41],[26,40],[24,40],[24,37],[22,36],[21,38],[20,40],[19,42],[16,43],[16,40],[18,40],[16,38],[15,38],[15,40],[13,42],[12,44],[9,44],[7,43],[5,43],[3,43],[3,41],[0,39],[-1,37],[-5,36]],
[[-8,58],[-5,59],[-3,58],[-2,56],[0,53],[1,51],[-1,50],[-5,50],[-5,52],[-3,53],[-5,55]],
[[-10,52],[-10,55],[-7,56],[-6,54],[-6,52]],
[[26,40],[30,41],[34,42],[40,41],[43,41],[44,37],[36,36],[32,36],[28,37]],
[[-12,29],[-10,34],[-5,36],[0,36],[7,37],[12,33],[20,32],[25,31],[33,31],[34,29]],
[[12.5,38],[15.7,38],[15,36.5],[13,37]],[[8,41],[9.5,41],[9.5,39],[8,39]]
];
svg+='<defs><clipPath id="north-clip">'+rect(450,483,233,130,'white')+'</clipPath><clipPath id="europe-clip">'+rect(692,483,303,130,'white')+'</clipPath></defs>';
for(const [id,project,coasts] of [['north',N,continents],['europe',E,europeCoasts]]){svg+=`<g clip-path="url(#${id}-clip)">`;coasts.forEach(poly=>svg+=path(poly.map((p,i)=>(i?'L':'M')+project(p).join(' ')).join(' ')+'Z','#b6c9b9','stroke="#f7f8ee" stroke-width=".7"'));svg+='</g>';}
const euro={'04':[958,598],'08':[918,498],'28':[840,496],'30':[728,497],'31':[937,498],'32':[850,533],'33':[901,558],'34':[908,580],'36':[707,515],'42':[782,567],'43':[717,596],'44':[822,516],'45':[782,497],'46':[804,496]};
const north={'03':[483,580],'05':[502,580],'09':[470,499],'20':[590,579],'21':[629,574],'22':[651,544],'23':[521,580],'24':[540,580],'25':[658,523],'26':[611,599],'27':[650,597],'37':[562,601],'38':[578,498]};
const world={'01':[382,522],'02':[288,519],'06':[308,535],'07':[270,510],'10':[350,497],'12':[390,553],'13':[248,550],'15':[399,522],'16':[416,522],'17':[408,553],'18':[326,550],'19':[339,570],'29':[247,533],'35':[326,601],'39':[180,548],'40':[191,599],'41':[310,497]};
const mapped=new Set();
const mapPoints=stories.filter(d=>d.xy).map(d=>{const [project,positions]=euro[d.id]?[E,euro]:north[d.id]?[N,north]:[P,world],loc=positions[d.id];if(!loc)throw Error('Missing map pin '+d.id);return {d,point:project(d.xy),label:loc};});
// Put every leader below every label, so a later line never crosses printed type.
mapPoints.forEach(({d,point:[x,y],label:[lx,ly]})=>{const c=C[d.topic];svg+=stroke(`M${x} ${y} L${lx} ${ly}`,c,.65)+circle(x,y,1.5,c);});
mapPoints.forEach(({d,label:[lx,ly]})=>{const c=C[d.topic];svg+=`<g data-pin="${d.id}" data-lon="${d.xy[0]}" data-lat="${d.xy[1]}"><title>${esc(d.id+' '+d.place)}</title>${rect(lx-7,ly-5,14,10,c,'rx="3" stroke="#fffdf7" stroke-width=".55"')}${text(lx,ly+2.8,d.id,8.5,750,'white','text-anchor="middle"')}</g>`;mapped.add(d.id);});
if(mapped.size!==44)throw Error('Expected 44 geographically located reports');
svg+=text(28,616,'PINS LINK TO REPORT NUMBERS; LINES LOCATE DISPLACED LABELS',7.2,550,C.ink,'letter-spacing=".3"');

const small=stories.filter(d=>d.tier==='small');
small.forEach((d,i)=>{const x=20+(i%4)*248,y=630+Math.floor(i/4)*46,c=C[d.topic];svg+=group(d,x,y,240,42,rect(x,y,2,42,c)+text(x+7,y+12,d.id,10.5,750,c)+artwork(d.icon,x+6,y+18,24,23)+text(x+36,y+15,d.title,13.2,750)+d.detail.map((s,j)=>text(x+36,y+28+j*10.5,s,9.8,d.id==='29'&&j===0?650:500,d.id==='29'&&j===0?C.conflict:C.ink)).join(''));});
svg+=rect(20,1003,984,1,C.ink)+text(20,1017,'SOURCES: ANADOLU / XINHUA / CNBC / EURONEWS / YAHOO FINANCE / IBD / SAXO',9.5,650,C.ink,'letter-spacing=".6"')+text(1004,1017,'18 NOVEMBER 2026',10,700,C.ink,'text-anchor="end" letter-spacing="1.2"')+'</svg>';
mkdirSync(resolve(root,'build'),{recursive:true});
writeFileSync(resolve(root,'build/frontpage.svg'),svg);
writeFileSync(resolve(root,'build/frontpage.html'),`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}html,body{margin:0;width:1024px;height:1024px;overflow:hidden}svg{display:block}</style>${svg}`);
writeFileSync(resolve(root,'build/stories.json'),JSON.stringify(stories,null,2));
console.log('Built 46 reports: 4 leads, 10 medium stories, 32 briefs; 44 geographic pins.');
