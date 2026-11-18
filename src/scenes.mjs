// Original flat-vector editorial scenes. No external assets or image generation.
const ink='#18272f',navy='#263f50',red='#b13f38',gold='#d6a14c',teal='#367c78';
const r=(x,y,w,h,c,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${extra}/>`;
const c=(x,y,rr,fill)=>`<circle cx="${x}" cy="${y}" r="${rr}" fill="${fill}"/>`;
const p=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
const l=(d,color=ink,width=2,extra='')=>p(d,'none',`stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}`);
const t=(x,y,s,size=10,color=ink,weight=700,extra='')=>`<text x="${x}" y="${y}" font-family="'Barlow Condensed',sans-serif" font-weight="${weight}" font-size="${size}" fill="${color}" ${extra}>${s}</text>`;
const drone=(x,y,s,color=red)=>`<g transform="translate(${x} ${y}) scale(${s})">${p('M0 0 L22 -9 L31 -3 L48 0 L31 5 L27 17 L20 17 L17 5 Z',color)}${l('M-7 0 H55 M21 -8 L18 -17',color,2)}</g>`;
const person=(x,y,skin,suit,hair)=>`${c(x,y,7,skin)}${p(`M${x-7} ${y-2} Q${x-7} ${y-11} ${x+7} ${y-4} L${x+6} ${y-1} Q${x} ${y-5} ${x-7} ${y-2}`,hair)}${p(`M${x-9} ${y+29} V${y+12} Q${x} ${y+5} ${x+9} ${y+12} V${y+29} Z`,suit)}${l(`M${x} ${y+9} V${y+22}`,'#f8f5ea',2)}`;
export const scenes={
 airport:{w:320,h:132,art:
 r(0,0,320,132,'#e2ecec')+r(0,53,320,79,'#c8d3cf')+r(0,119,320,13,'#bcc5bf')+
 r(242,30,68,38,'#c0d2d5')+p('M232 30 L274 13 L317 30 Z','#f0f1e8')+l('M250 39 H302 M250 49 H302','#eaf2ee',3)+
 p('M0 106 L163 91 L238 120 L176 132 H0 Z','#bd584b')+l('M7 117 L115 104','#e9c7a3',2)+
 p('M15 40 Q12 35 26 33 H95 Q111 33 121 42 L112 48 H30 Z','#fffdf4')+p('M31 33 L22 14 H33 L53 33 Z',navy)+p('M63 39 L86 15 H96 L83 39 Z','#c5c6bb')+p('M66 44 L84 66 H72 L49 44 Z','#f8f6ee')+r(97,35,10,5,navy)+[43,53,63,73].map(x=>r(x,36,5,4,navy)).join('')+c(37,50,3,ink)+c(99,50,3,ink)+l('M108 49 V73 L132 83','#f7f5ea',3)+
 [135,160,187].map((x,i)=>p(`M${x} ${14+i%2*7} l12 -3 -5 4 5 3 -12 -2 -5 3 1 -4 -1 -4 Z`,navy)).join('')+
 person(184,68,'#d3a171',navy,'#202d34')+person(221,68,'#e5b88c','#263d54','#d5af63')+
 p('M185 83 L199 92 L209 86 L213 91 L200 99 L183 91 Z',navy)+p('M220 83 L210 89 L202 93 L205 98 L218 92 L225 86 Z','#263d54')+p('M199 91 L206 89 L211 93 L205 98 L199 96 Z','#ddb284')+
 l('M180 98 V117 M190 98 V117 M217 98 V117 M226 98 V117',ink,5)+
 [260,280,300].map(x=>`${c(x,77,4,'#c49b74')}${r(x-5,82,10,21,navy)}${r(x-5,72,10,4,navy)}${l(`M${x-3} 103 V117 M${x+3} 103 V117`,ink,2.5)}${l(`M${x+8} 67 V108`,gold,1.4)}`).join('')+r(302,42,2,32,navy)+p('M304 43 H320 V57 H304',red)
 },
 gulf:{w:320,h:132,art:
 r(0,0,320,132,'#eadfcf')+p('M0 83 Q80 67 160 80 T320 74 V132 H0 Z','#d9c8aa')+r(0,110,320,22,'#c4b391')+
 p('M55 99 V79 Q88 48 123 79 V99 Z','#b6c5c3')+r(65,78,49,21,navy)+r(64,87,49,12,'#6e8885')+r(13,81,29,18,navy)+r(17,69,16,12,'#758e8a')+
 r(133,100,58,10,ink)+c(145,115,5,ink)+c(180,115,5,ink)+p('M144 97 L179 57 L188 64 L156 101 Z','#42665e')+l('M154 91 L181 61 M165 99 L192 67','#b3b9a4',5)+
 l('M261 107 V65 M261 67 L242 50 M261 67 L281 48',navy,4)+l('M241 33 Q292 32 298 83 M241 43 Q283 43 288 83',teal,2)+c(261,67,4,gold)+
 drone(52,30,1.2,red)+drone(144,17,.65,red)+l('M200 86 L123 45',gold,2,'stroke-dasharray="4 5"')+p('M121 39 L126 46 L135 45 L129 51 L132 58 L123 54 L116 61 L117 51 L109 48 L118 46 Z','#f2b563')+
 l('M21 119 H91 M236 119 H307','#f5e9cf',2)
 },
 cop:{w:320,h:132,art:
 r(0,0,320,132,'#dfece6')+c(160,42,29,'#c3d9d1')+p('M143 23 L159 16 L172 26 L168 39 L153 43 L147 59 L136 50 Z',teal)+p('M169 42 L182 45 L179 63 L166 66 L159 53 Z',teal)+
 r(97,77,128,42,'#adc7bc')+p('M89 77 L160 58 L232 77 Z','#fff9e8')+[112,138,164,190,214].map(x=>r(x,82,9,34,'#f3f3df')).join('')+r(91,117,143,7,navy)+
 r(15,17,78,78,'#fffcf1','rx="2"')+r(22,24,64,4,navy)+t(54,46,'TRANSITION',11,navy,750,'text-anchor="middle"')+t(54,61,'AWAY',16,navy,750,'text-anchor="middle"')+l('M29 74 H79 M29 81 H67','#c8d4cc',2)+
 r(230,17,78,78,'#fffcf1','rx="2"')+r(237,24,64,4,teal)+t(269,46,'FASTER',11,teal,750,'text-anchor="middle"')+t(269,63,'PHASE-OUT',15,teal,750,'text-anchor="middle"')+l('M243 75 H295 M243 82 H283','#c8d4cc',2)+
 [122,146,174,198].map((x,i)=>l(`M${x} 92 V110`,navy,1)+p(`M${x} 92 h13 l-3 9 h-10 Z`,i%2?gold:teal)).join('')+
 l('M17 122 H75 M252 122 H305',teal,2)+p('M33 121 V108 H43 V121 M49 121 V100 H59 V121',navy)+p('M267 121 V108 Q280 88 296 103 V121 Z',teal)
 },
 ukraine:{w:200,h:65,art:
 r(0,0,200,65,'#263d53')+[12,42,109,170].map(x=>c(x,8,1,'#d6e5dc')).join('')+
 p('M0 53 L17 43 L35 53 V65 H0 M39 47 L57 36 L76 47 V65 H39 M81 54 L105 43 L128 54 V65 H81 M145 50 L167 40 L191 50 V65 H145','#152733')+
 [20,49,62,94,110,161,176].map(x=>r(x,53,4,6,'#6b8283')).join('')+drone(67,17,.75,'#d96951')+
 [25,136,183].map(x=>l(`M${x} 23 V63 M${x-8} 31 H${x+8} M${x-5} 27 H${x+5}`,'#b1c5c2',1.5)).join('')+l('M25 31 Q80 45 136 31 Q159 38 183 31','#b1c5c2',1)+p('M140 38 L132 50 H139 L136 61 L149 46 H141 Z',gold)
 },
 inflation:{w:200,h:65,art:
 r(0,0,200,65,'#ede3ce')+r(0,57,200,8,'#d4c7b2')+
 r(24,11,31,46,navy,'rx="3"')+r(29,16,21,17,'#d2e4df')+r(30,39,19,9,'#fff7df')+l('M55 22 H64 V50 Q68 57 72 48 V32',ink,3)+p('M68 26 L75 32 L73 39 L67 34 Z',ink)+
 [0,1,2].map(i=>r(96,49-i*6,23,5,gold,'rx="2"')).join('')+[0,1,2,3,4].map(i=>r(128,49-i*6,23,5,gold,'rx="2"')).join('')+l('M92 26 L115 16 L137 22 L171 8',red,4)+p('M158 7 H174 V22 Z',red)+c(173,48,10,'#d9b760')+t(173,52,'£',12,'#fff9e8',700,'text-anchor="middle"')
 },
 cyclone:{w:200,h:65,art:
 r(0,0,200,65,'#cfe4e7')+p('M0 0 H64 L73 14 L71 25 L82 35 L95 43 L99 52 L114 65 H0 Z','#b4c5a9')+l('M65 5 L73 15 L71 25 L81 35 L95 44 L100 53','#f4f2dc',2)+
 l('M154 15 C127 0 111 19 126 33 C144 49 166 35 153 22 C140 9 124 29 140 33 C153 37 163 21 157 9','#fffdf5',5)+c(141,26,5,teal)+
 l('M132 41 Q111 39 87 29',red,2,'stroke-dasharray="4 4"')+p('M90 24 L82 27 L87 36 Z',red)+[92,108,124,140,156].map(x=>l(`M${x} 51 L${x-3} 58`,'#6b9fb4',1.4)).join('')
 },
 sudan:{w:200,h:65,art:
 r(0,0,200,65,'#e7d7b6')+p('M0 48 Q40 37 82 45 T200 44 V65 H0 Z','#c8ae82')+
 [10,34,60,87].map((x,i)=>r(x,39+i%2*4,20,21,'#e8c995')+p(`M${x-2} ${39+i%2*4} l12 -10 12 10 Z`,'#ad8a63')+r(x+6,49,5,11,navy)).join('')+drone(38,15,.65,navy)+
 r(130,5,56,53,'#fff9e8','rx="2"')+r(136,11,44,3,teal)+t(158,25,'AMNESTY',9,ink,750,'text-anchor="middle"')+t(158,38,'REPORT',12,red,750,'text-anchor="middle"')+t(158,49,'JUN–AUG',8,navy,650,'text-anchor="middle"')
 },
 garments:{w:200,h:65,art:
 r(0,0,200,65,'#d9e5de')+r(5,16,106,40,'#9bb5b0')+p('M5 16 L23 8 L41 16 L59 8 L77 16 L94 8 L111 16 Z',navy)+[15,36,57,78,98].map(x=>r(x,24,9,10,'#f8f7df')+r(x,39,9,10,'#d9e8df')).join('')+r(0,58,200,7,'#adb7ab')+
 [118,146,175].map((x,i)=>person(x,39,'#b88462',i%2?teal:navy,'#213238')).join('')+l('M129 47 V16 M160 47 V18',navy,1.5)+r(112,7,63,19,'#fff9e4')+t(144,20,'Tk 30,000',12,red,750,'text-anchor="middle"')+l('M3 61 H94','#ede9d3',2,'stroke-dasharray="9 7"')
 },
 ipo:{w:200,h:65,art:
 r(0,0,200,65,'#e5e0cb')+r(9,6,65,54,navy)+r(16,13,51,32,'#b9cec4')+t(41,34,'ANT',22,teal,750,'text-anchor="middle"')+t(41,55,'NASDAQ',9,'#fff8e9',700,'text-anchor="middle"')+
 r(86,12,61,45,'#fffaf0','rx="2"')+r(94,19,45,3,gold)+t(116,38,'IPO',19,navy,750,'text-anchor="middle"')+l('M96 45 H136 M96 50 H124','#b3c5bc',2)+
 p('M160 42 Q166 38 165 24 Q176 12 186 24 Q185 38 191 42 Z',gold)+r(158,43,36,4,navy)+c(177,49,3,gold)+l('M176 15 V10',navy,2)
 },
 game:{w:200,h:65,art:
 r(0,0,200,65,'#443d62')+p('M0 49 L200 22 V65 H0 Z','#705374')+l('M0 58 H198','#bd8569',2)+
 p('M34 23 H96 Q107 23 117 46 Q122 60 110 60 L91 46 H44 L28 60 Q15 61 21 45 Q27 25 34 23 Z',ink)+l('M39 32 V46 M32 39 H46','#f5ecda',3)+c(96,33,3,red)+c(104,40,3,gold)+c(88,41,3,teal)+c(58,40,3,'#859b9b')+c(76,40,3,'#859b9b')+
 r(133,13,38,46,'#c29a8e','rx="3"')+t(152,47,'VI',31,'#fff5e2',800,'text-anchor="middle"')+c(182,15,10,'#f2e7d6')+l('M182 7 V15 M182 15 V10',navy,1.5)
 },
 gaza:{w:200,h:65,art:
 r(0,0,200,65,'#dce6e2')+r(5,33,35,26,'#9bb2b3')+r(45,23,28,36,'#9bb2b3')+r(13,40,6,7,'#e8efdf')+r(25,40,6,7,'#e8efdf')+r(51,31,6,7,'#e8efdf')+
 r(87,7,59,51,'#fffaf0','rx="2"')+r(94,14,45,4,'#668d9b')+t(116,34,'TRUCE',14,navy,750,'text-anchor="middle"')+l('M97 43 H135 M97 49 H128','#b8c8c2',2)+
 p('M170 14 L191 50 H149 Z','#dcac52')+l('M170 27 V37',navy,3)+c(170,43,1.5,navy)+l('M0 62 Q10 57 20 62 T40 62 T60 62 T80 62',teal,1.5)
 },
 voyager:{w:200,h:65,art:
 r(0,0,200,65,'#1d344b')+[10,58,79,119,169,191].map((x,i)=>c(x,8+i%3*19,.8,'#d4e1dd')).join('')+c(29,41,14,'#88b3bd')+p('M20 31 L29 28 L36 36 L30 42 L32 52 L23 48 L18 40 Z','#3d8580')+
 l('M47 42 Q84 16 123 29','#e3cda0',1.5,'stroke-dasharray="3 4"')+
 `<g transform="translate(148 33) rotate(-12) scale(.78)">${p('M-20 -12 Q0 -3 20 -12 L0 3 Z','#f2eee3')}${l('M-20 -12 Q0 -21 20 -12','#fff9e7',2)}${l('M0 3 V16 M-5 4 L-30 21 M5 4 L31 19','#d1c9af',2)}${r(-7,8,14,11,'#b7a780')}${l('M0 13 L23 30 M0 12 L-10 -31','#b7c7c9',1.5)}${c(-10,-31,3,'#c0c9c3')}${r(26,15,10,6,'#c9b37a')}${r(-35,18,10,6,'#c9b37a')}</g>`
 },
 jeffries:{w:200,h:65,art:
 r(0,0,200,65,'#dbe5e4')+p('M18 27 L56 11 L94 27 Z','#f8f6e9')+r(26,28,60,29,'#b4c5c5')+[31,43,55,67,79].map(x=>r(x,31,4,25,'#f8f6e9')).join('')+p('M44 11 Q56 -4 68 11 Z','#f8f6e9')+r(15,57,83,5,navy)+
 person(112,22,'#976d52',navy,'#293339')+r(95,45,36,18,navy)+r(99,49,28,3,gold)+
 r(154,36,34,24,teal,'rx="2"')+r(161,17,21,28,'#fff9e7')+l('M166 25 L171 30 L179 21',teal,2)+r(161,41,21,2,navy)+t(171,55,'251–11',8,'#fff9e8',700,'text-anchor="middle"')
 }
};

// Round 4 literal lead scenes. The maps show claimed routes, not measured tracks.
const star=(x,y,outer,inner=outer*.42)=>p(Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,rr=i%2?inner:outer;return `${i?'L':'M'}${x+Math.cos(a)*rr} ${y+Math.sin(a)*rr}`;}).join(' ')+'Z',gold);
const chinaFlag=(x,y,w=36,h=24)=>r(x,y,w,h,'#b93832')+star(x+8,y+8,4.2)+[[15,4],[19,8],[19,13],[15,17]].map(([dx,dy])=>star(x+dx,y+dy,1.5)).join('');
const usFlag=(x,y,w=40,h=26)=>r(x,y,w,h,'#fffaf0')+Array.from({length:7},(_,i)=>r(x,y+i*h/13*2,w,h/13,'#b94e42')).join('')+r(x,y,w*.43,h*7/13,navy)+Array.from({length:9},(_,row)=>Array.from({length:row%2?5:6},(_,col)=>c(x+1.4+col*2.65+(row%2?1.3:0),y+1.1+row*1.43,.34,'#fffaf0')).join('')).join('');
const leader=(x,y,skin,suit,hair)=>c(x,y,10,skin)+p(`M${x-10} ${y-2} Q${x-9} ${y-15} ${x+10} ${y-6} L${x+9} ${y-2} Q${x} ${y-8} ${x-10} ${y-2}`,hair)+p(`M${x-13} ${y+43} V${y+17} Q${x} ${y+6} ${x+13} ${y+17} V${y+43} Z`,suit)+l(`M${x} ${y+13} V${y+33}`,'#f8f5ea',2.6)+l(`M${x-7} ${y+43} V${y+65} M${x+7} ${y+43} V${y+65}`,ink,6);
scenes.airport={w:320,h:157,art:
 r(0,0,320,157,'#e2ecec')+r(0,63,320,94,'#c8d3cf')+r(0,146,320,11,'#b9c5c0')+
 t(12,17,'SHENZHEN',14,navy,750)+r(200,6,120,19,'#c1d2d5')+l('M210 14 H309','#f0f4ec',3)+
 p('M0 127 L160 111 L254 157 H0 Z','#b9584d')+l('M6 140 L118 127','#e8c6a3',2)+
 p('M15 48 Q12 42 27 40 H91 Q108 40 119 50 L107 56 H28 Z','#fffdf4')+p('M31 40 L22 22 H34 L54 40 Z',navy)+p('M62 46 L83 25 H95 L81 46 Z','#b8c5c0')+p('M61 52 L84 73 H71 L45 52 Z','#f9f8ef')+r(95,43,10,5,navy)+[39,49,59,69].map(x=>r(x,43,5,4,navy)).join('')+c(35,60,3,ink)+c(98,60,3,ink)+l('M106 57 V82 L132 95','#f9f8ee',3)+
 [135,158,181].map((x,i)=>p(`M${x} ${11+i%2*5} l12 -3 -5 4 5 3 -12 -2 -5 3 1 -4 -1 -4 Z`,navy)).join('')+
 l('M136 25 V102 M294 27 V102',navy,1.2)+chinaFlag(137,26,35,23)+usFlag(254,27,40,26)+t(154,60,'CHINA',10,navy,700,'text-anchor="middle"')+t(274,64,'USA',10,navy,700,'text-anchor="middle"')+
 t(184,71,'XI',12.5,navy,750,'text-anchor="middle"')+t(228,71,'TRUMP',12.5,navy,750,'text-anchor="middle"')+
 leader(184,87,'#d2a16f',navy,'#243036')+leader(228,87,'#e3b487','#263d54','#cda253')+
 p('M184 106 L204 119 L214 111 L220 116 L205 128 L181 116 Z',navy)+p('M229 106 L215 116 L207 121 L212 127 L228 118 L237 110 Z','#263d54')+p('M204 118 L213 115 L220 120 L213 127 L204 124 Z','#deb082')+
 [275,293,311].map(x=>c(x,113,3.8,'#bb926c')+r(x-4.5,118,9,20,navy)+r(x-5,108,10,4,navy)+l(`M${x-2.5} 138 V151 M${x+2.5} 138 V151`,ink,2.4)+l(`M${x+6} 101 V144`,gold,1.2)).join('')
};
scenes.gulf={w:320,h:157,art:
 r(0,0,320,157,'#cbdfe0')+
 p('M0 0 H170 L149 15 L128 23 L115 43 L108 57 L123 77 L140 91 L158 128 L183 157 H0 Z','#d9c9ad')+
 p('M172 0 H320 V157 L287 134 L259 106 L239 83 L216 68 L204 45 L183 29 Z','#cfbc9e')+
 l('M170 0 L149 15 L128 23 L115 43 L108 57 L123 77 L140 91 L158 128 L183 157','#f4eddd',1.6)+l('M172 0 L183 29 L204 45 L216 68 L239 83 L259 106 L287 134 L320 157','#f4eddd',1.6)+
 t(15,26,'KUWAIT',18,navy,750)+t(15,44,'Ali Al Salem · US base',11.5,navy,650)+
 t(252,25,'IRAN',19,navy,750,'text-anchor="middle"')+t(252,41,'Iran says: drone attacks',10.5,red,650,'text-anchor="middle"')+
 l('M234 53 Q164 43 102 55',red,2.7,'stroke-dasharray="5 4"')+p('M100 56 L110 46 L113 55 Z',red)+
 l('M231 62 Q201 88 160 112',red,2.7,'stroke-dasharray="5 4"')+p('M158 114 L166 102 L171 110 Z',red)+
 drone(151,49,.5,red)+drone(196,83,.45,red)+
 c(102,56,4.5,navy)+c(102,56,1.7,'#fffdf0')+r(10,69,113,17,'#f5ecd9','rx="2"')+t(16,81,'Kuwait says: intercepted',10.5,navy,650)+
 c(159,113,5,'#b5c4ad')+c(159,113,2.8,navy)+t(144,136,'BAHRAIN',16,navy,750,'text-anchor="middle"')+t(177,150,'Bahrain says: intercepted',10.5,navy,650,'text-anchor="middle"')+
 t(248,108,'PERSIAN GULF',12,teal,650,'text-anchor="middle"')
};
scenes.cop={w:320,h:157,art:
 r(0,0,320,157,'#dfece6')+c(270,47,29,'#c0d7cd')+p('M254 28 L267 19 L281 25 L282 39 L267 47 L259 64 L247 52 Z',teal)+p('M280 47 L294 54 L286 71 L272 68 L267 55 Z',teal)+
 r(225,111,87,38,'#a4c0b3')+p('M216 111 L269 91 L320 111 Z','#f7f4df')+[236,255,274,293].map(x=>r(x,115,7,31,'#f4f2dd')).join('')+r(219,149,101,5,navy)+
 r(16,9,207,142,'#fffcf1','rx="2"')+r(26,18,187,4,navy)+t(120,43,'COP31 · DRAFT TEXT',20,navy,750,'text-anchor="middle"')+t(120,57,'TWO OPTIONS · STILL OPEN',10.5,teal,700,'text-anchor="middle"')+l('M29 65 H209','#c3d4c9',1)+
 t(30,86,'1   TRANSITION AWAY',17,navy,700)+t(30,113,'2   PHASE-OUT',20,navy,750)+l('M53 106 H153',red,2.6)+t(174,113,'?',23,red,750)+
 r(30,122,179,24,'#f0ddd1','rx="2"')+t(119,133,'DISPUTED',13.5,red,750,'text-anchor="middle"')+t(119,143,'BOTH OPTIONS REMAIN IN DRAFT',8.5,navy,650,'text-anchor="middle"')
};
scenes.markets={w:200,h:65,art:
 r(0,0,200,65,'#e9e0cd')+r(8,23,42,32,'#bdc9c0')+p('M4 23 L29 8 L55 23 Z','#fff9e9')+[14,25,36,46].map(x=>r(x,28,4,24,'#fff9e9')).join('')+r(4,55,52,5,navy)+
 r(65,5,77,55,'#fff9ed','rx="2"')+t(71,18,'DOW −1.09%',13,navy,750)+l('M72 25 L89 31 L105 27 L119 42 L134 47',red,3)+p('M124 47 H137 V35 Z',red)+t(72,56,'50,204 AT CLOSE',8.5,navy,650)+
 p('M149 35 L155 21 H180 L188 35 Z',gold)+p('M145 48 L152 34 H177 L184 48 Z','#ba8a38')+t(170,61,'$3,739.66',10,navy,750,'text-anchor="middle"')
};
scenes.euloan={w:200,h:65,art:
 r(0,0,200,65,'#dee7e4')+l('M12 9 V59 M188 12 V59',navy,1.4)+r(13,10,49,34,'#284879')+
 Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return star(37.5+11*Math.cos(a),27+11*Math.sin(a),1.8);}).join('')+
 r(153,13,35,13,'#4683ac')+r(153,26,35,13,'#e7c35c')+
 l('M52 51 H151',teal,2,'stroke-dasharray="4 4"')+p('M151 51 L142 46 V56 Z',teal)+
 r(70,3,77,59,'#fffaf0','rx="2"')+r(77,9,63,3,teal)+t(108.5,23,'PROPOSED LOAN · UP TO',8.4,navy,750,'text-anchor="middle"')+t(108.5,44,'€45bn',24,navy,750,'text-anchor="middle"')+t(108.5,57,'UKRAINE · 2027',10,teal,700,'text-anchor="middle"')
};
