// Plain JavaScript syntax also works across Node 22 releases without a TS loader.
const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const output = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(output, { recursive: true });
writeFileSync(join(output, 'entry.png'), readFileSync(join(__dirname, 'assets', 'entry.png')));
