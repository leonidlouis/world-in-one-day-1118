// All reporting is transcribed from /workspace/make-fun/newsimg/facts1118.md.
// All illustrations and geographic outlines are original SVG paths in this file.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ink = '#172b3b', red = '#b73b31', teal = '#29766d', gold = '#c59136';
const paper = '#f5f0e4', line = '#d4cebf', blue = '#dce7e7';
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const txt = (x,y,s,size=16,weight=500,fill=ink,extra='') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const lines = (x,y,arr,size,step,fill=ink,weight=700) => arr.map((s,i)=>txt(x,y+i*step,s,size,weight,fill)).join('');
const path = (d,fill=ink,extra='') => `<path d="${d}" fill="${fill}" ${extra}/>`;
const rect = (x,y,w,h,fill,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const circ = (x,y,r,fill,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const stroke = (d,color=ink,width=3,extra='') => path(d,'none',`stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}`);

// Flat editorial illustrations, each in a 160 × 100 coordinate space.
const icons = {
  summit: `${rect(7,77,146,7,ink)}${rect(14,41,12,36,blue)}${rect(30,25,9,52,blue)}${rect(43,33,10,44,blue)}${rect(119,27,11,50,blue)}${rect(133,42,14,35,blue)}${stroke('M18 20 V65 M143 16 V64',gold,2)}${path('M18 20 H42 L36 30 H18',red)}${path('M143 16 H120 L126 27 H143',red)}${circ(62,35,10,ink)}${circ(103,35,10,ink)}${path('M49 77 V53 Q62 43 72 54 L84 64 L78 70 L64 61 V77 Z',ink)}${path('M116 77 V53 Q103 43 94 53 L80 64 L86 71 L102 61 V77 Z',ink)}${path('M76 63 L84 59 L92 64 L84 73 L76 69 Z',gold)}${stroke('M60 48 L64 60 M103 48 L100 60',paper,2)}`,
  gulf: `${rect(3,76,153,12,blue)}${rect(23,59,62,17,ink)}${rect(32,48,18,12,ink)}${rect(26,65,9,10,paper)}${rect(43,65,9,10,paper)}${stroke('M113 76 V43 M113 45 L97 31 M113 45 L130 29',ink,4)}${stroke('M96 16 Q143 17 146 58 M96 24 Q135 26 137 58',teal,2)}${path('M43 22 L67 14 L84 22 L68 26 L66 37 L60 37 L59 26 Z',red)}${stroke('M43 22 H30 M84 22 H97 M61 14 L58 7',red,3)}${stroke('M61 43 L57 51 M57 38 L50 50',red,2)}${circ(113,45,4,gold)}`,
  nvidia: `${rect(41,15,70,70,ink,'rx="6"')}${rect(51,25,50,50,teal,'rx="3"')}${[0,1,2,3,4].map(i=>`${rect(32,23+i*12,9,5,ink)}${rect(111,23+i*12,9,5,ink)}${rect(49+i*12,6,5,9,ink)}${rect(49+i*12,85,5,9,ink)}`).join('')}${stroke('M60 61 L72 49 L80 55 L94 36',paper,4)}${path('M84 36 H94 V46',paper)}${rect(126,61,12,23,gold)}${rect(142,42,12,42,gold)}${circ(18,50,11,blue)}`,
  ukraine: `${path('M41 17 L74 8 L107 17 V47 Q106 73 74 90 Q42 72 41 47 Z',blue)}${path('M74 8 L107 17 V47 Q106 73 74 90 Z',teal)}${rect(17,72,65,12,ink,'rx="3"')}${circ(29,88,6,ink)}${circ(69,88,6,ink)}${stroke('M28 71 L62 36 M41 73 L75 38',ink,8)}${stroke('M112 72 V47 M112 47 L99 36 M112 47 L126 33',ink,4)}${stroke('M109 16 Q144 21 145 55 M110 25 Q136 30 136 55',gold,2)}${path('M69 25 L83 13 L77 31 L72 34 Z',red)}`,
  quad: `${[30,64,98,132].map((x,i)=>`${stroke(`M${x} 13 V66`,ink,2)}${path(`M${x} 13 H${x+20} L${x+16} 29 H${x}`,i%2?gold:red)}${circ(x+4,46,7,ink)}${path(`M${x-5} 66 V59 Q${x+4} 51 ${x+13} 59 V66 Z`,ink)}`).join('')}${path('M11 76 L146 76 L129 91 H32 Z',teal)}${rect(56,67,47,9,ink)}${stroke('M14 95 Q29 89 42 95 T70 95 T98 95 T126 95 T152 95',blue,3)}`,
  climate: `${circ(73,48,35,blue)}${path('M49 27 L63 17 L76 21 L74 34 L60 39 L61 52 L48 49 L41 39 Z',teal)}${path('M70 45 L85 47 L93 59 L85 80 L74 76 L70 62 Z',teal)}${path('M88 22 L101 30 L107 46 L96 49 L90 40 L79 36 Z',teal)}${stroke('M114 19 V65',ink,11)}${stroke('M114 22 V67',paper,6)}${stroke('M114 40 V69',red,4)}${circ(114,73,10,red)}${stroke('M124 29 H130 M124 40 H133 M124 51 H130',ink,2)}${stroke('M31 82 H99',gold,3)}`,
  ipo: `${path('M20 81 V38 L48 21 L75 38 V81 Z',blue)}${rect(15,79,73,8,ink)}${rect(29,45,8,31,ink)}${rect(46,45,8,31,ink)}${rect(63,45,8,31,ink)}${path('M104 77 L116 24 L127 24 L142 77 H132 L128 64 H112 L109 77 Z',ink)}${path('M116 55 H125 L120 37 Z',paper)}${stroke('M91 35 L103 23 L99 35',red,3)}${circ(49,34,4,gold)}`,
  gold: `${path('M19 65 L31 40 H70 L84 65 Z',gold)}${path('M43 85 L54 61 H100 L111 85 Z',gold)}${stroke('M19 65 H84 M43 85 H111',ink,3)}${stroke('M91 18 L110 34 L122 30 L145 54',red,6)}${path('M130 54 H146 V38 Z',red)}${stroke('M32 46 H65 M58 67 H96',paper,2)}`,
  outage: `${rect(9,17,67,44,ink,'rx="4"')}${rect(14,22,57,32,blue)}${stroke('M43 61 V72 M27 73 H58',ink,4)}${path('M92 40 L120 23 L148 40 Z',gold)}${rect(91,72,59,7,ink)}${[98,116,134].map(x=>rect(x,44,7,27,ink)).join('')}${stroke('M20 34 L32 42 L43 31 L55 40 L66 29',red,3)}${path('M87 86 L118 81 L109 69 L116 65 L132 77 L151 73 L153 78 L135 86 L130 98 L123 99 L124 89 L94 92 Z',teal)}`,
  gaza: `${rect(12,52,33,31,blue)}${path('M6 52 L28 33 L50 52 Z',ink)}${rect(50,39,34,44,blue)}${rect(55,45,8,10,ink)}${rect(70,45,8,10,ink)}${rect(99,51,43,33,gold,'rx="2"')}${rect(115,56,10,22,paper)}${rect(109,62,22,9,paper)}${[22,54,86].map(x=>stroke(`M${x} 10 L${x-6} 24`,teal,3)).join('')}${stroke('M6 90 Q20 83 33 90 T59 90 T85 90 T111 90 T150 90',teal,3)}`,
  mongolia: `${path('M12 60 Q39 15 67 60 Z',gold)}${rect(15,60,49,27,blue)}${rect(34,66,12,21,ink)}${stroke('M20 60 H58 M39 33 V60',paper,2)}${path('M83 36 L116 15 L150 36 Z',ink)}${rect(82,80,68,8,ink)}${[89,109,129].map(x=>rect(x,40,10,37,ink)).join('')}${stroke('M111 13 V4',red,2)}${path('M111 4 H130 V12 H111',red)}${circ(116,29,4,paper)}`,
  alaska: `${path('M16 24 L33 19 L44 24 L49 14 L67 17 L71 36 L82 43 L73 60 L59 54 L48 65 L36 63 L28 76 L15 80 L11 74 L25 62 L17 48 L7 40 Z',blue)}${rect(85,40,62,42,ink,'rx="3"')}${rect(94,48,44,6,paper)}${path('M99 23 L125 18 L133 45 L107 50 Z',gold)}${stroke('M106 32 L114 38 L124 25',ink,4)}${stroke('M19 88 L28 84 M7 92 L12 90',ink,2)}`,
  trade: `${rect(12,49,43,32,red)}${rect(109,49,40,32,teal)}${stroke('M20 49 V80 M29 49 V80 M38 49 V80 M47 49 V80 M117 49 V80 M127 49 V80 M137 49 V80',paper,1)}${stroke('M48 24 H113 M113 24 L102 14 M113 24 L102 34',ink,4)}${stroke('M109 91 H46 M46 91 L56 83',ink,4)}${path('M66 49 L78 45 L93 53 L82 66 L72 62 L59 64 L50 58 Z',gold)}${stroke('M78 51 L87 58',ink,2)}`,
  strike: `${[29,78,126].map((x,i)=>`${circ(x,57,9,ink)}${path(`M${x-12} 92 V75 Q${x} 63 ${x+12} 75 V92 Z`,ink)}${stroke(`M${x+5} 67 L${x+15} 41 V17`,ink,3)}${rect(x-3,9,41,26,i===1?gold:red)}`).join('')}${stroke('M17 96 H142',teal,3)}`,
  chagos: `${path('M32 24 Q49 12 68 26 L64 45 L49 52 L32 42 Z',teal)}${path('M105 68 Q119 56 130 66 L125 77 L111 78 Z',teal)}${circ(81,61,4,teal)}${circ(90,71,3,teal)}${stroke('M18 84 Q32 78 46 84 T74 84 T102 84 T144 84',blue,4)}${rect(92,6,56,39,ink,'rx="3"')}${rect(97,16,46,23,paper)}${stroke('M105 2 V12 M135 2 V12',red,4)}${txt(120,34,'DEC',18,800,red,'text-anchor="middle"')}${stroke('M43 24 L37 40 M55 25 L61 41',paper,2)}`,
  health: `${path('M21 56 L59 20 Q72 8 85 21 Q97 34 84 47 L47 82 Q34 94 21 81 Q9 69 21 56 Z',teal)}${path('M21 56 L40 38 L65 63 L47 82 Q34 94 21 81 Q9 69 21 56 Z',gold)}${stroke('M42 38 L66 62',paper,3)}${circ(124,56,17,red)}${[0,60,120,180,240,300].map(a=>{let c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);return stroke(`M${124+c*17} ${56+s*17} L${124+c*25} ${56+s*25}`,red,4)}).join('')}${circ(119,50,3,paper)}${circ(130,59,3,paper)}${stroke('M112 13 L149 87',ink,3)}`,
  football: `${circ(56,50,35,blue,`stroke="${ink}" stroke-width="2"`)}${path('M55 32 L69 43 L64 60 H46 L41 43 Z',ink)}${path('M28 29 L41 24 L43 35 L29 43 L22 39 Z M77 24 L86 37 L77 46 L68 35 Z M30 68 L42 64 L49 78 L39 82 Z M71 67 L85 61 L85 75 L73 83 Z',ink)}${rect(114,36,25,49,gold)}${circ(127,22,10,ink)}${path('M112 43 Q127 31 142 43 V58 H112 Z',ink)}${stroke('M103 86 H149',ink,3)}`,
  game: `${path('M41 32 H117 Q133 34 144 71 Q147 88 133 88 L109 69 H48 L27 87 Q12 87 18 69 Q28 33 41 32 Z',ink)}${stroke('M42 44 V64 M32 54 H52',paper,5)}${circ(120,47,5,red)}${circ(130,58,5,gold)}${circ(109,60,5,teal)}${circ(66,59,5,blue)}${circ(91,59,5,blue)}${stroke('M73 23 V7 M73 7 L82 16',red,3)}`,
};
const icon = (id,x,y,w,h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 160 100">${icons[id]}</svg>`;

const leads = [
  {n:'01',tag:'SHENZHEN · APEC',icon:'summit',color:teal,title:['Putin meets Xi;', 'Trump talks next'],detail:['Trump–Putin handshake today;', 'three-way talks set for Thursday.']},
  {n:'02',tag:'KUWAIT · BAHRAIN',icon:'gulf',color:red,title:['Iran says drones', 'targeted US base'],detail:['Kuwait engages; Bahrain intercepts.', 'Hormuz navigation talks stalled.']},
  {n:'03',tag:'NVIDIA · Q3 EARNINGS',icon:'nvidia',color:teal,title:['Nvidia Q3 revenue', '$115.84 billion'],detail:['Board: no plan to reinstate Huang.']},
  {n:'04',tag:'UKRAINE · GERMANY',icon:'ukraine',color:red,title:['Germany adds', 'Ukraine air aid'],detail:['Air defence, missiles, F-16 ammunition.']},
];

let out = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><style>
text { font-family:'Barlow Condensed',sans-serif; }
.serif { font-family:'Bitter',serif; }
</style>${rect(0,0,1024,1024,paper)}
${rect(24,16,34,4,red)}${txt(68,25,'THE WORLD IN ONE DAY',16,700,ink,'class="serif" letter-spacing="1.5"')}
${txt(1000,24,'GLOBAL NEWS  /  DAILY EDITION',14,600,ink,'text-anchor="end" letter-spacing="1.2"')}
${txt(512,101,'WEDNESDAY 18 NOVEMBER 2026',77,800,ink,'text-anchor="middle"')}
${rect(24,114,976,4,ink)}
${txt(24,138,'POWER, CONFLICT & AN AI MARKET TEST',17,700,red,'letter-spacing="1.8"')}
${txt(1000,138,'18 STORIES  •  ONE PLANET  •  ONE WEDNESDAY',15,600,ink,'text-anchor="end" letter-spacing="0.5"')}
${rect(24,150,976,44,ink)}
`;
const figures = [ ['NVIDIA Q3 REVENUE','$115.84B'],['GOLD','BELOW $3,800'],['ANTHROPIC IPO RANGE','$70–$78'],['COP31 IN ANTALYA','DAY 10'] ];
figures.forEach(([label,value],i)=>{const x=24+i*244; out+=txt(x+11,165,label,11,600,'#d9dfdc','letter-spacing="1.1"')+txt(x+11,187,value,24,700,i===1?'#efd29a':'#ffffff');if(i)out+=rect(x,159,1,26,'#61717a');});

leads.forEach((d,i)=>{
 const x=24+i*247;
 out+=rect(x,207,235,222,'#fcf9f1',`stroke="${line}"`)+rect(x,207,235,4,d.color);
 out+=circ(x+18,229,11,d.color)+txt(x+18,233,d.n,13,700,'white','text-anchor="middle"');
 out+=txt(x+35,234,d.tag,13,700,d.color,'letter-spacing="0.7"');
 out+=icon(d.icon,x+39,244,160,100);
 out+=lines(x+12,367,d.title,29,29,ink,750);
 out+=lines(x+12,d.detail.length>1?410:417,d.detail,13,14,ink,500);
});

// Recognisable hand-drawn continent outlines in longitude/latitude.
const continents = [
 [[-168,70],[-148,71],[-139,61],[-129,54],[-124,43],[-117,32],[-108,27],[-101,19],[-91,17],[-85,10],[-78,8],[-80,15],[-87,20],[-81,26],[-80,32],[-71,42],[-60,48],[-55,53],[-65,60],[-79,63],[-82,72],[-102,78],[-119,72],[-141,69],[-157,60],[-168,61]],
 [[-73,60],[-49,61],[-24,76],[-42,83],[-61,81]],
 [[-81,11],[-71,12],[-61,7],[-50,1],[-35,-7],[-40,-20],[-49,-29],[-56,-39],[-68,-55],[-74,-49],[-72,-36],[-77,-19],[-81,-5]],
 [[-10,36],[-7,45],[-1,49],[-5,55],[5,57],[8,62],[20,70],[30,71],[31,62],[44,65],[59,69],[72,73],[96,76],[115,73],[136,70],[158,63],[179,66],[176,54],[157,51],[143,48],[134,39],[129,34],[122,39],[119,29],[111,20],[106,11],[105,1],[100,5],[98,17],[90,22],[81,6],[74,17],[67,25],[58,25],[52,16],[44,13],[36,29],[30,33],[26,40],[22,38],[17,42],[13,46],[8,43],[1,42]],
 [[-17,15],[-16,28],[-6,35],[10,37],[24,32],[32,31],[35,22],[43,12],[51,12],[43,1],[39,-12],[32,-26],[21,-35],[13,-30],[9,-15],[6,0],[-1,5],[-10,5]],
 [[113,-22],[122,-14],[134,-12],[137,-17],[145,-14],[154,-28],[150,-38],[139,-39],[131,-32],[116,-35]],
 [[47,-13],[51,-16],[49,-26],[44,-25]],
 [[130,32],[137,35],[142,42],[145,44],[142,34],[135,31]],
 [[120,19],[124,15],[126,7],[122,7],[119,12]],
 [[96,5],[105,-6],[114,-8],[118,-3],[109,0],[104,1]],
 [[166,-35],[177,-39],[172,-46],[166,-46]],
 [[-8,58],[-3,59],[1,51],[-5,50]],
];
const mx=37,my=477,mw=458,mh=128;
const project = ([lon,lat])=>[mx+(lon+180)/360*mw,my+(80-lat)/140*mh];
out+=rect(24,444,482,178,blue,`stroke="${line}"`)+txt(36,462,'THE DAY, LOCATED',14,750,ink,'letter-spacing="1.5"');
for(const lon of [-120,-60,0,60,120]) {const [x]=project([lon,0]);out+=stroke(`M${x} 474 V610`,'#c9dada',0.7);}
for(const lat of [-30,0,30,60]) {const [,y]=project([0,lat]);out+=stroke(`M36 ${y} H494`,'#c9dada',0.7);}
continents.forEach(c=>out+=path(c.map((p,i)=>`${i?'L':'M'}${project(p).map(v=>v.toFixed(1)).join(' ')}`).join(' ')+'Z','#8ba9a5',`stroke="${paper}" stroke-width="0.7" stroke-linejoin="round"`));
// Pins use true geographic anchors. Crowded labels have leader lines.
const pins = [
 ['01',[114,22.5],[26,-10],teal],['02',[48,29],[-5,15],red],['03',[-122,37],[-22,4],teal],
 ['04',[31,49],[0,-11],red],['05',[121,14.6],[28,12],teal],['06',[31,37],[-24,8],gold],
 ['11',[107,48],[-9,-15],teal],['12',[-151,64],[-13,-5],teal],['14',[-67,10],[0,13],red],['15',[58,-20],[14,9],teal]
];
pins.forEach(([n,ll,offset,c])=>{const [x,y]=project(ll),xx=x+offset[0],yy=y+offset[1];out+=stroke(`M${x} ${y} L${xx} ${yy}`,c,1.3)+circ(x,y,2.3,c)+circ(xx,yy,9,c,`stroke="${paper}" stroke-width="1.2"`)+txt(xx,yy+3.5,n,10.5,700,'white','text-anchor="middle"');});
out+=txt(36,615,'NUMBERED PINS LINK TO THE REPORTS',10,600,ink,'letter-spacing="0.8"');

const center = [
 {n:'05',tag:'ASIA · SECURITY',icon:'quad',color:teal,title:['Quad reunites', 'in Manila'],detail:['US–Philippines trade pact;', 'expanded defence cooperation.']},
 {n:'06',tag:'CLIMATE · TURKEY',icon:'climate',color:gold,title:['COP31: fossil', 'fuel flashpoint'],detail:['Four more EU countries publish', 'fossil-fuel transition roadmaps.']},
];
center.forEach((d,i)=>{const x=518+i*247;out+=rect(x,444,235,178,'#fcf9f1',`stroke="${line}"`)+rect(x,444,235,3,d.color)+circ(x+17,461,10,d.color)+txt(x+17,465,d.n,12,700,'white','text-anchor="middle"')+txt(x+32,466,d.tag,12,700,d.color,'letter-spacing="0.7"')+icon(d.icon,x+152,480,75,68)+lines(x+12,503,d.title,26,28)+lines(x+12,590,d.detail,14,17,ink,500);});

const briefs = [
 {n:'07',tag:'AI · NASDAQ',icon:'ipo',color:teal,title:['Anthropic sets', 'IPO price band'],detail:'825m shares; Thursday trading debut.'},
 {n:'08',tag:'GLOBAL MARKETS',icon:'gold',color:gold,title:['Gold sinks', 'below $3,800'],detail:'Year-plus low as the dollar strengthens.'},
 {n:'09',tag:'US · DISRUPTIONS',icon:'outage',color:ink,title:['Rubio: outages', 'are separate'],detail:'Microsoft, FAA, banks; no cyberattack.'},
 {n:'10',tag:'MIDDLE EAST · WHO',icon:'gaza',color:red,title:['Gaza needs', 'open aid routes'],detail:'WHO urges supplies amid winter flooding.'},
 {n:'11',tag:'MONGOLIA',icon:'mongolia',color:teal,title:['President’s exit', 'request advances'],detail:'Committee backs it; plenary vote Thursday.'},
 {n:'12',tag:'USA · SENATE',icon:'alaska',color:teal,title:['Peltola wins', 'Alaska seat'],detail:'Democrats set for a 56–44 majority.'},
 {n:'13',tag:'CANADA · CHINA',icon:'trade',color:teal,title:['Carney, Xi agree', 'tariff relief'],detail:'Trade in pork, seafood and metals.'},
 {n:'14',tag:'VENEZUELA',icon:'strike',color:red,title:['Unions call', '24-hour strike'],detail:'Protest planned at presidential palace.'},
 {n:'15',tag:'MAURITIUS · UK',icon:'chagos',color:teal,title:['Chagos handover:', 'UK gets ultimatum'],detail:'Mauritius sets a December deadline.'},
 {n:'16',tag:'EUROPE · HEALTH',icon:'health',color:red,title:['Antibiotic', 'resistance rises'],detail:'Warning of a “pre-antibiotic era”.'},
 {n:'17',tag:'WORLD FOOTBALL',icon:'football',color:ink,title:['Diallo enters', 'FIFA race'],detail:'French FA chief to challenge Infantino.'},
 {n:'18',tag:'GAMES · THURSDAY LAUNCH',icon:'game',color:teal,title:['GTA VI arrives', 'at midnight'],detail:'13 years after Grand Theft Auto V.'},
];
briefs.forEach((d,i)=>{const x=24+(i%4)*247,y=636+Math.floor(i/4)*123;out+=rect(x,y,235,113,'#fcf9f1',`stroke="${line}"`)+circ(x+16,y+16,9,d.color)+txt(x+16,y+19.5,d.n,11,700,'white','text-anchor="middle"')+txt(x+30,y+20,d.tag,11.5,700,d.color,'letter-spacing="0.7"')+icon(d.icon,x+7,y+30,66,59)+lines(x+79,y+49,d.title,23,25)+txt(x+11,y+102,d.detail,13.2,500,ink);});
out+=rect(24,1005,976,1,ink)+txt(24,1018,'WORLD IN ONE DAY',10,700,ink,'letter-spacing="1.4"')+txt(1000,1018,'18 NOV 2026  /  REPORTS OF THE DAY',10,600,ink,'text-anchor="end" letter-spacing="1"')+'</svg>';

mkdirSync(resolve(root,'build'),{recursive:true});
writeFileSync(resolve(root,'build/frontpage.svg'),out);
writeFileSync(resolve(root,'build/frontpage.html'),`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}html,body{margin:0;width:1024px;height:1024px;overflow:hidden}svg{display:block}</style>${out}`);
console.log('Wrote build/frontpage.svg and build/frontpage.html');
