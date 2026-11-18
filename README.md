[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
Entry for the [make.fun bounty](https://make.fun/bounty/news-image-20261118).

A newspaper front page for **Wednesday 18 November 2026**: **45 stories**, with three large illustrated leads, ten medium scenes, six key figures, and 32 one-line briefs beside a world map. Large serif headlines lead with Shenzhen diplomacy, Gulf drones and COP31. Regional colours link the numbered stories and map markers.

Reporting uses only the supplied `facts1118.md` and `facts1118b.md`, with the addendum’s date corrections taking priority. Nvidia and Prague are removed; Mongolia covers only Wednesday’s committee step, and Alaska is a brief with its US/UTC timing stated. Claims are attributed and future events labelled.

Run offline using Node 22 and its standard library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` writes the 1024 × 1024 PNG stored in `assets/entry.png`. Runtime needs no network or dependencies. Rebuild with `node src/render.mjs` using installed Google Chrome, Liberation Serif and Barlow Condensed fonts, and Python 3 with Pillow. All vector scenes and layout code are original and live in `src/`.

The build writes a 300 px preview, twelve complete 2× inspection crops, and an audit of text bounds, image/type collisions and clipping into the ignored `build/` directory. The map uses geographic pins for eleven illustrated reports, separate global/deep-space markers for the other two, and small dots for located briefs.
