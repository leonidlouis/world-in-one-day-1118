[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
Entry for the [make.fun bounty](https://make.fun/bounty/news-image-20261118).

An illustrated newspaper front page for **Wednesday 18 November 2026**: 18 reports across diplomacy, conflict, markets, climate, health, technology and sport, with an original world map and linked geographic pins. Reporting uses only the supplied verified fact sheet. All layout, map paths and vector illustrations were written for this entry.

Run with Node 22 and its standard library, offline:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program writes the deterministic, 1024 × 1024 palette PNG from `assets/entry.png`. To regenerate the artwork locally, run `node src/render.mjs` (requires installed Barlow Condensed fonts, librsvg/Cairo, and Python 3 with Pillow). The original SVG/HTML generator is `src/build.mjs`; rendering also creates a 300 px inspection preview in `build/`.
