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
regions={'masthead':(0,0,1024,162),'leads-left':(14,161,512,326),'leads-right':(512,161,1010,326),'medium-left':(14,326,614,457),'medium-right':(610,326,1010,457),'map-west':(14,458,695,625),'map-europe':(686,458,1010,625),'briefs-top-left':(14,624,513,815),'briefs-top-right':(512,624,1010,815),'briefs-bottom-left':(14,810,513,998),'briefs-bottom-right':(512,810,1010,998),'footer':(0,997,1024,1024)}
(root/'build/crops').mkdir(exist_ok=True)
for name,bounds in regions.items():
    crop=im.crop(bounds)
    crop.resize((crop.width*2,crop.height*2),Image.Resampling.NEAREST).save(root/f'build/crops/{name}.png')
audit=json.loads((root/'build/audit.json').read_text())
issues=[]
for card in audit['cards']:
    for t in card['text']:
        if t['x']<card['x']+2 or t['y']<card['y']+1 or t['x']+t['w']>card['x']+card['w']-2 or t['y']+t['h']>card['y']+card['h']-1:
            issues.append(f"{card['id']} text outside padding: {t['text']}")
    for i,a in enumerate(card['text']):
        for b in card['text'][i+1:]:
            if min(a['x']+a['w'],b['x']+b['w'])-max(a['x'],b['x'])>.4 and min(a['y']+a['h'],b['y']+b['h'])-max(a['y'],b['y'])>.4:
                issues.append(f"{card['id']} text intersection: {a['text']} / {b['text']}")
    for a in card['icons']:
        for b in card['text']:
            if min(a['x']+a['w'],b['x']+b['w'])-max(a['x'],b['x'])>.4 and min(a['y']+a['h'],b['y']+b['h'])-max(a['y'],b['y'])>.4:
                issues.append(f"{card['id']} illustration touches type: {b['text']}")
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
print(f"PNG: 1024 × 1024, {(root/'assets/entry.png').stat().st_size:,} bytes. 46 cards, {len(audit['pins'])} map pins.")
print(f"Layout checks: {len(issues)} issues. 12 inspection crops at 2×.")
for issue in issues: print(issue)

if issues:
    raise SystemExit(1)
