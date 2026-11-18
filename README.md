[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
Entry for the [make.fun bounty](https://make.fun/bounty/news-image-20261118).

A newspaper front page for **Wednesday 18 November 2026**, with **43 stories**: three large illustrated leads, ten medium scenes, and 30 one-line briefs beside a world map. Taller lead panels show Shenzhen leaders and flags, claimed Gulf drone routes, and COP31’s disputed draft wording. An italic date statement and a DATE CHECK band make the reporting window explicit.

Uses only `facts1118.md`, `facts1118b.md` and `facts1118c.md`, with C’s corrections and closing figures taking priority. The EU’s proposed loan of up to €45bn for Ukraine and the Dow/gold/Fed close are illustrated; GTA VI and Jeffries are briefs. The excluded Tuesday events are named only in the DATE CHECK band. Claims and future events remain qualified.

Run offline with Node 22 and its standard library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` writes the deterministic 1024 × 1024 PNG in `assets/entry.png`, without runtime dependencies or network access. Rebuild with `node src/render.mjs` using installed Google Chrome, Liberation Serif and Barlow Condensed fonts, and Python 3 with Pillow. Original vector scenes, layout and story data are in `src/`.

The build creates a 300 px preview, twelve complete 2× crops and a layout audit in the ignored `build/` directory. The map has twelve geographic story pins, a separate Voyager deep-space marker, and location dots for the briefs.
