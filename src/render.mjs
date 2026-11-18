import './build.mjs';
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(resolve(root,'assets'),{recursive:true});
function run(command,args) {
  const result=spawnSync(command,args,{encoding:'utf8'});
  if(result.status!==0)throw new Error(`${command}: ${result.stderr}`);
}
run('python3',[resolve(root,'src/rasterize.py')]);
console.log('Rendered assets/entry.png and build/preview-300.png');
