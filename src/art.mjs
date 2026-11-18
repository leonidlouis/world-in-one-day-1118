// Original vector artwork and geographic paths, authored for this entry.
const ink='#172b3b',red='#b73b31',teal='#29766d',gold='#c59136',paper='#f5f0e4',blue='#dce7e7';
const rect=(x,y,w,h,fill,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const circ=(x,y,r,fill,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const path=(d,fill=ink,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
const stroke=(d,color=ink,width=3,extra='')=>path(d,'none',`stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}`);
const txt=(x,y,s,size=16,weight=500,fill=ink,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${s}</text>`;
// Flat editorial illustrations, each in a 160 × 100 coordinate space.
export const icons = {
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
export const icon = (id,x,y,w,h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 160 100">${icons[id]}</svg>`;


export const continents = [
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

// Additional story-specific pictograms for the dense edition.
Object.assign(icons,{
intercept: `${icons.gulf}${path('M89 59 L104 43 L100 61 L94 66 Z',red)}${stroke('M87 67 L81 76',red,3)}`,
pipeline: `${stroke('M14 74 H57 V32 H103 V74 H147',ink,12)}${stroke('M14 74 H57 V32 H103 V74 H147',gold,6)}${circ(80,32,11,ink)}${stroke('M80 18 V46 M67 32 H93',paper,3)}${path('M126 20 Q107 44 126 48 Q145 44 126 20 Z',teal)}`,
podium: `${rect(46,49,67,44,ink)}${circ(79,20,12,ink)}${path('M53 47 Q79 23 107 47 Z',ink)}${stroke('M47 39 L32 22 M111 39 L128 20',ink,6)}${rect(64,61,32,6,gold)}`,
hormuz: `${path('M9 7 L61 14 L57 40 L36 54 L43 91 H8 Z',blue)}${path('M151 7 L103 17 L107 41 L127 53 L121 91 H151 Z',blue)}${path('M64 48 H101 L94 64 H73 Z',ink)}${stroke('M81 17 V36 M81 75 V91',red,4)}${stroke('M75 26 L81 36 L87 26',red,3)}`,
navigation: `${circ(80,50,37,blue)}${path('M80 15 L95 65 L80 56 L65 65 Z',ink)}${path('M80 85 L66 37 L80 44 L94 37 Z',gold)}${stroke('M20 50 H35 M125 50 H140',teal,4)}`,
shield: `${path('M80 8 L122 23 V54 Q118 76 80 94 Q42 76 38 54 V23 Z',blue)}${stroke('M61 50 L76 66 L102 36',teal,9)}`,
network: `${rect(53,7,55,31,ink,'rx="3"')}${rect(8,65,52,29,ink,'rx="3"')}${rect(101,65,51,29,ink,'rx="3"')}${stroke('M80 39 V52 H34 V65 M80 52 H127 V65',red,4)}${stroke('M67 17 H95 M67 27 H86 M20 77 H46 M113 77 H139',paper,3)}`,
mail: `${rect(19,20,123,69,blue,'rx="6"')}${stroke('M21 25 L80 66 L141 25',red,8)}${stroke('M22 83 L59 53 M139 83 L102 53',ink,3)}`,
board: `${rect(27,48,110,17,gold,'rx="4"')}${[38,80,123].map(x=>circ(x,22,12,ink)+rect(x-11,36,22,17,ink)).join('')}${stroke('M37 65 V88 M126 65 V88',ink,7)}`,
hearing: `${path('M16 35 L80 7 L144 35 Z',ink)}${rect(14,84,133,8,ink)}${[30,64,98,130].map(x=>rect(x,43,8,34,ink)).join('')}${circ(80,49,10,gold)}${rect(59,65,42,17,gold)}`,
bank: `${path('M12 29 L80 4 L148 29 Z',ink)}${[31,61,91,121].map(x=>rect(x,36,12,45,ink)).join('')}${rect(13,85,135,8,gold)}${circ(80,20,7,paper)}`,
chart: `${stroke('M18 11 V85 H148',ink,5)}${stroke('M29 61 L59 34 L86 51 L113 18 L144 30',teal,6)}${stroke('M31 25 L53 45 L80 32 L108 68 L140 58',red,5)}`,
roadmap: `${path('M24 12 L60 22 L100 11 L137 22 V87 L100 78 L60 90 L24 79 Z',blue)}${stroke('M60 22 V89 M100 12 V78',paper,3)}${stroke('M41 64 L75 49 L89 56 L121 34',teal,6)}${circ(121,34,7,teal)}`,
ballot: `${rect(28,39,104,54,ink,'rx="4"')}${rect(48,47,64,6,paper)}${path('M59 6 L107 16 L98 53 L51 43 Z',gold)}${stroke('M64 25 L75 36 L94 20',ink,5)}`,
sanction: `${rect(37,15,69,76,blue)}${stroke('M49 30 H95 M49 42 H95 M49 54 H75',ink,4)}${circ(113,68,22,red)}${stroke('M99 68 H126',paper,6)}`,
aid: `${rect(16,36,128,51,teal,'rx="3"')}${rect(68,44,23,36,paper)}${rect(61,51,37,22,paper)}${stroke('M50 34 V20 H111 V34',ink,5)}`,
train: `${rect(17,20,54,62,ink,'rx="9"')}${rect(87,20,54,62,teal,'rx="9"')}${rect(26,29,36,23,blue)}${rect(96,29,36,23,blue)}${circ(29,68,5,gold)}${circ(59,68,5,gold)}${circ(98,68,5,gold)}${circ(130,68,5,gold)}${stroke('M22 93 L68 83 M92 83 L139 93',ink,4)}${path('M80 23 L70 40 H80 L74 58 L91 36 H81 Z',red)}`,
jet: `${path('M81 7 L89 38 L146 62 V73 L89 62 L88 83 L105 91 V97 L80 91 L55 97 V91 L72 83 L71 62 L14 73 V62 L71 38 Z',ink)}${stroke('M17 17 L42 40',red,4)}`,
gavel: `${path('M56 15 L104 44 L90 66 L42 37 Z',ink)}${stroke('M81 54 L43 85',gold,13)}${rect(90,81,55,12,ink)}`,
spy: `${path('M32 28 H129 L110 8 H51 Z',ink)}${circ(80,48,26,blue)}${path('M39 99 V79 Q80 58 121 79 V99 Z',ink)}${rect(53,43,22,13,ink,'rx="4"')}${rect(85,43,22,13,ink,'rx="4"')}${stroke('M73 47 H87',ink,5)}`,
boxing: `${path('M48 14 Q24 10 21 32 V58 Q22 75 42 75 H70 V39 Q71 27 59 30 L58 21 Z',red)}${path('M112 14 Q136 10 139 32 V58 Q138 75 118 75 H90 V39 Q89 27 101 30 L102 21 Z',teal)}${rect(33,77,38,17,ink)}${rect(89,77,38,17,ink)}`,
resign: `${rect(36,9,87,83,blue)}${stroke('M50 27 H108 M50 41 H108 M50 55 H87',ink,4)}${stroke('M64 78 L98 43 L108 53 L75 85 Z',red,6)}`,
freight: `${rect(11,26,42,43,gold)}${rect(58,26,42,43,teal)}${rect(106,26,43,43,ink)}${stroke('M12 75 H149',ink,5)}${[23,43,72,92,118,139].map(x=>circ(x,83,6,ink)).join('')}${stroke('M21 15 H138 M138 15 L127 6 M138 15 L127 24',red,3)}`,
gavelball: `<use href="#art-gavel"/>${circ(126,32,21,blue)}${path('M125 20 L137 29 L132 43 H118 L113 29 Z',ink)}`,
aibudget: `${rect(26,17,76,68,ink,'rx="5"')}${rect(39,31,50,40,teal)}${txt(64,60,'AI',26,700,paper,'text-anchor="middle"')}${circ(123,65,23,gold)}${stroke('M123 50 V80 M133 54 H116 L114 64 L131 68 L129 76 H112',paper,3)}`,
mapphone: `${rect(47,5,65,91,ink,'rx="9"')}${rect(54,16,51,67,blue)}${path('M80 25 Q58 26 64 46 L80 66 L96 46 Q102 26 80 25 Z',red)}${circ(80,40,7,paper)}${circ(80,89,3,paper)}`,
});
