# Tournament Bracket — Visual Polish

Fixes the alignment issue visible in your screenshot (semis drifting off the midpoint of their feeder quarters, the Final not centred between the two semis) and adds proper connector lines + animations.

## Install

From the bundle root:

```cmd
cd /D "D:\xamp new\htdocs\Dawri\frontend"

REM Two files — SCSS and HTML. The TS component is unchanged.
copy /Y <bundle>\frontend\src\app\pages\tournaments\tournament-detail.component.scss src\app\pages\tournaments\
copy /Y <bundle>\frontend\src\app\pages\tournaments\tournament-detail.component.html src\app\pages\tournaments\
```

Angular's dev server will pick up the changes automatically on save. If you're not running `ng serve`, restart it.

## What changed

### 1. Alignment — the root cause

The TS computes slot heights using the canonical bracket formula:

```
slotHeight = (MATCH_H + GAP) * 2^roundIdx − GAP
           = 88,  188,  388   for rounds 1, 2, 3
```

That formula assumes there is a `GAP` of 12px **between** slots in each round. The previous SCSS had `display: flex; flex-direction: column` with **no** gap declared, so slots stacked flush against each other and round 2 / round 3 centres drifted off the midpoints of their feeder pairs.

One-line fix inside `.b-round__matches`:

```scss
gap: $slot-gap;   // 12px — matches the GAP constant used in TS
```

With that gap applied:

| Column    | Height                        |
|-----------|-------------------------------|
| Quarters  | `4 × 88 + 3 × 12 = 388`       |
| Semis     | `2 × 188 + 1 × 12 = 388`      |
| Final     | `1 × 388         = 388`       |

All columns equal height, and every match centre falls precisely at the midpoint of its two feeder matches. No more drift.

### 2. Connector lines

Replaced the old static-height `.connector--in` / `.connector--out` divs (which used a hard-coded `100px` fallback regardless of slot size) with CSS pseudo-elements driven by a `--slot-h` custom property set per slot from the template:

```html
<div class="b-slot"
     [style.height.px]="round.slotHeight"
     [style.--slot-h.px]="round.slotHeight">
```

The SCSS then draws a proper L-shape on every pair of sibling matches:

- Odd slots (1st, 3rd, 5th…) get a `┐` shape via `::after` — top border (horizontal) + right border (vertical going down).
- Even slots (2nd, 4th, 6th…) get a `┘` shape via `::after` — bottom border (horizontal) + right border (vertical going up).
- Rounds after the first get a horizontal inbound stub via `::before`.

The vertical leg length is `calc(var(--slot-h) / 2 + 6px)` — exactly half the slot plus half the inter-slot gap, which lands at the midpoint between the two feeder matches regardless of round.

A `:has(.b-match--completed)` selector tints the path **gold** for completed matches — so you can visually trace the winner's route up the bracket.

### 3. Animations

**Staggered match entry.** Every slot fades in and rises 14px on load, offset by round × 120ms + match × 60ms:

```html
[style.--delay.ms]="(matchIdx * 60) + (roundIdx * 120)"
```

So Round 1 streams in first left-to-right, then Round 2 follows, then the Final. Quick, purposeful — not Disney.

**Champion banner.** Four concurrent animations:
- `champ-glow` — outer box-shadow pulses gold, inner shadow pulses cyan.
- `champ-drift` — background gradient slowly shifts across.
- `champ-shine` — a bright sheen band sweeps diagonally across the banner every few seconds.
- `champ-text` — the champion's name has a gold→white→gold shimmer moving across the letters.

Trophy emoji rotates -5° / +5° and scales 1.0 / 1.1 on a 2s loop, with a gold drop-shadow glow.

**Winner row.** Gradient accent bar on the left edge (3px, gold→green top-to-bottom) plus a soft green gradient background. The winning score badge gets a raised gold-tinted background, `font-weight: 700`, and an outer ring.

**Match card hover.** Clickable cards lift 2px and pick up a cyan glow ring when hovered — makes it obvious which ones you can click to submit a result.

**Live / disputed.** Kept the existing `live-pulse` and `disputed-pulse` animations but refined them — the live pulse now also throws a cyan box-shadow ring on the beat. The dispute flag (`⚠`) shakes gently.

### 4. Accessibility

Added `@media (prefers-reduced-motion: reduce)` at the end of the file — disables all the animation when the user's OS setting requests it. Hover lift is also disabled.

## Expected result

Every match in a round is vertically centred on the midpoint of its two feeder matches, with clean L-shaped connectors that glow gold along the winner's path. The champion banner draws the eye with a gentle sweeping sheen without being garish. Hovering a clickable match clearly signals it's actionable.

If the alignment still looks off after installing, hard-reload the browser (Ctrl+Shift+R) — Angular sometimes caches compiled styles.
