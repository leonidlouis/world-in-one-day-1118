"""Palette conversion, text-bound checks, and complete 2× inspection crops."""
from pathlib import Path
import json
from PIL import Image
root=Path(__file__).resolve().parent.parent
im=Image.open(root/'build/raw.png').convert('RGB')
assert im.size==(1024,1024)
im.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE).save(root/'assets/entry.png',optimize=True)
im=Image.open(root/'assets/entry.png').convert('RGB')
im.resize((300,300),Image.Resampling.LANCZOS).save(root/'build/preview-300.png')
regions={'masthead':(0,0,1024,132),'lead-1':(14,130,346,428),'lead-2':(346,130,678,428),'lead-3':(678,130,1010,428),'medium-top-left':(14,426,612,610),'medium-top-right':(610,426,1010,610),'medium-bottom-left':(14,608,612,790),'medium-bottom-right':(610,608,1010,790),'map':(14,786,305,981),'briefs-left':(306,786,658,981),'briefs-right':(658,786,1010,981),'footer':(0,979,1024,1024)}
(root/'build/crops').mkdir(exist_ok=True)
for name,bounds in regions.items():
    crop=im.crop(bounds)
    crop.resize((crop.width*2,crop.height*2),Image.Resampling.NEAREST).save(root/f'build/crops/{name}.png')
audit=json.loads((root/'build/audit.json').read_text())
issues=[]
for card in audit['cards']:
    for t in card['text']:
        if t['x']<card['x']+.4 or t['y']<card['y']+1 or t['x']+t['w']>card['x']+card['w']-.4 or t['y']+t['h']>card['y']+card['h']-1:
            issues.append(f"{card['id']} text outside padding: {t['text']}")
    for i,a in enumerate(card['text']):
        for b in card['text'][i+1:]:
            if min(a['x']+a['w'],b['x']+b['w'])-max(a['x'],b['x'])>.4 and min(a['y']+a['h'],b['y']+b['h'])-max(a['y'],b['y'])>.4:
                issues.append(f"{card['id']} text intersection: {a['text']} / {b['text']}")
    for a in card['icons']:
        for b in card['text']:
            if min(a['x']+a['w'],b['x']+b['w'])-max(a['x'],b['x'])>.4 and min(a['y']+a['h'],b['y']+b['h'])-max(a['y'],b['y'])>.4:
                issues.append(f"{card['id']} illustration touches type: {b['text']}")
for b in audit['briefs']:
    right=652 if b['id']<29 else 1004
    t=b['text']
    if t['x']+t['w']>right-1:
        issues.append(f"Brief {b['id']} exceeds its column: {t['text']}")
for i,a in enumerate(audit['pins']):
    for b in audit['pins'][i+1:]:
        aa,bb=a['text'],b['text']
        if min(aa['x']+aa['w'],bb['x']+bb['w'])>max(aa['x'],bb['x']) and min(aa['y']+aa['h'],bb['y']+bb['h'])>max(aa['y'],bb['y']):
            issues.append(f"Map label intersection: {a['id']} / {b['id']}")
for t in audit['text']:
    if t['x']<0 or t['y']<0 or t['x']+t['w']>1024 or t['y']+t['h']>1024:
        issues.append('Canvas clipping: '+t['text'])
# Check all printed text together, including figures, map regions and masthead.
for i,a in enumerate(audit['text']):
    for b in audit['text'][i+1:]:
        if min(a['x']+a['w'],b['x']+b['w'])-max(a['x'],b['x'])>.4 and min(a['y']+a['h'],b['y']+b['h'])-max(a['y'],b['y'])>.4:
            issues.append(f"Page text intersection: {a['text']} / {b['text']}")
(root/'build/layout-issues.json').write_text(json.dumps(issues,indent=2))
print(f"PNG: 1024 × 1024, {(root/'assets/entry.png').stat().st_size:,} bytes. 13 scenes, 30 briefs, {len(audit['pins'])} geographic pins.")
print(f"Layout checks: {len(issues)} issues. 12 inspection crops at 2×.")
for issue in issues: print(issue)

if issues:
    raise SystemExit(1)
