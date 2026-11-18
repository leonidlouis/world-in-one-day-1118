[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/leonidlouis/world-in-one-day-1118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
Entry for the [make.fun bounty](https://make.fun/bounty/news-image-20261118).

An illustrated front page for **Wednesday 18 November 2026**, covering **46 distinct reports** from the supplied verified fact sheet: four illustrated leads, ten medium stories, and 32 numbered briefs. The world map has 44 topic-coloured pins, North American and European insets, six continent labels, and a legend. Eight key figures span the top. Claims are attributed, future events are labelled, and the Knesset item is explicitly dated late Tuesday.

Run offline with Node 22 and its standard library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` writes the deterministic, 1024 × 1024 PNG stored in `assets/entry.png`. It needs no network, packages, fonts, browser, or Python at runtime.

Rebuild the original artwork with `node src/render.mjs`. The build uses installed Barlow Condensed and Bitter fonts, Google Chrome through its debugging pipe, and Python 3 with Pillow for a deterministic 256-colour PNG. All SVG shapes, illustrations, geographic paths, layout, and story data are authored in `src/`.

The build also creates `build/frontpage.svg`, a 300 px preview, twelve complete inspection crops at 2× zoom, and a text-bound audit checking card padding, text intersections, illustration collisions, pin-label collisions, and canvas clipping. Generated inspection files and `out/` are ignored by Git.
