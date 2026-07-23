# Home menu slider: multi-image items

**Date:** 2026-07-23  
**Status:** Approved for planning  
**Approach:** Flattened continuous Swiper + index-range tab progress

## Goal

Let each homepage menu item hold a list of images (image + caption). The slider shows all images from all menus in one continuous carousel. Tab progress duration is derived from how many autoplay steps that menu needs, given visible count and group size. Manual dragging stays in sync with the active tab and progress.

## Decisions

| Topic | Choice |
| --- | --- |
| Carousel model | One continuous loop of all images from all menus from the start |
| Manual drag | Sync immediately to the menu that owns the focused slide; progress reflects position within that menu’s run |
| Desktop layout | 4 slides visible, advance by 2 |
| Mobile layout | 1 slide visible, advance by 1 |
| Caption | Sanity field for accessibility / alt only — not rendered as visible UI |
| Blur | Sanity LQIP → Next.js `blurDataURL` / `placeholder="blur"` (same pattern as menu cards) |
| Interval source | Existing Sanity `menu.duration` (ms) = autoplay delay; default **3000** |
| Content migration | Out of scope — editors re-add images under the new `images` array |

## Data model

### Sanity (`homePage.menu`)

Keep: `title`, `description`, `duration`, `cta`, `items[]`.

Per menu item:

- `name` (string, required)
- `images` (array, min 1) — replaces single `image`
  - `image` (image, hotspot, required)
  - `caption` (string) — used as alt text on the site

Validation: at least one image per item; caption recommended for a11y (warning if missing, with fallback to menu name in the mapper).

### Frontend types

```ts
type HomeMenuImage = {
  src: string
  alt: string
  lqip?: string
}

type HomeMenuItem = {
  name: string
  images: HomeMenuImage[]
}

type HomeMenuContent = {
  title: string
  description: string
  duration: number
  items: HomeMenuItem[]
  cta: { label: string; href: string; color: Color; hoverColor: Color }
}
```

### Query / mapper

- GROQ: `items[]{ name, images[]{ ..., caption, asset metadata.lqip } }`
- Mapper returns items with image lists; `alt = caption ?? name`
- Pass `lqip` through when present
- Update fallbacks to multi-image items
- Remove mapping for the old single `image` field

## Slider behavior

### Slide list

Flatten all `items[].images` into one ordered slide list. Each slide carries:

- image fields (`src`, `alt`, `lqip`)
- `menuIndex`
- `localImageIndex` (index within that menu’s `images`)

Duplicate the flattened set as needed for Swiper `loop` (same idea as today’s `slidesForLoop`).

### Swiper config

| Breakpoint | `slidesPerView` | `slidesPerGroup` |
| --- | --- | --- |
| Mobile (&lt; 480px) | 1 | 1 |
| Desktop (`xs` / 480px+) | 4 | 2 |

- Autoplay `delay` = `duration` from Sanity
- Loop enabled when there are enough slides
- Grab / touch move enabled
- No visible caption overlay

### Focused slide

Treat Swiper `realIndex` (mapped back through the flattened list, not the duplicated loop copies) as the focused slide — the leading / active index Swiper reports.

## Tab progress

### Steps per menu

```
slidesPerGroup = isDesktop ? 2 : 1
steps = max(1, ceil(imageCount / slidesPerGroup))
```

Example: 8 images, desktop group 2 → 4 steps. If `duration` is 3000ms, that tab’s full progress run spans 4 × 3000ms of autoplay steps (progress is continuous across those steps, not a separate CMS duration).

### Progress formula

While the focused slide belongs to menu `m`:

```
stepIndex = floor(localImageIndex / slidesPerGroup)
progress = (stepIndex + autoplayFraction) / steps
```

`autoplayFraction` = `1 - percentage` from Swiper `onAutoplayTimeLeft` (0 → 1 over the current delay). Clamp to `[0, 1]`.

When the focused slide’s `menuIndex` changes, update `activeIndex` in the home-menu store and continue progress from the new menu’s `stepIndex`.

### Manual interaction

- On `slideChange` (drag, arrows, or programmatic): remap focused slide → `menuIndex` + `stepIndex`; set store `activeIndex` and recompute progress (including current autoplay fraction when autoplay is running).
- Tab click: `slideToLoop` to that menu’s **first** image; progress starts at the beginning of that menu’s run.
- Prev/next: existing `slidePrev` / `slideNext` (Swiper respects `slidesPerGroup`).

### Responsive note

`steps` (and therefore progress pace) differs between mobile and desktop for the same menu. Recalculate when the `xs` breakpoint changes.

## Files to touch

| File | Change |
| --- | --- |
| `sanity/schemaTypes/homePage.ts` | `images[]` with image + caption; remove single `image` |
| `sanity/lib/home-query.ts` | Query new shape + lqip + caption |
| `sanity/lib/home-mapper.ts` | Map multi-image items + fallbacks |
| `types/home.ts` | `HomeMenuImage`; update `HomeMenuItem` |
| `components/home/menu-slider.tsx` | Flatten, responsive group/view, LQIP, progress formula |
| `components/home/menu-tabs.tsx` | Keep store-driven UI; `onSelect` stays menu-index based |
| `stores/home-menu.ts` | Keep `activeIndex` + `progress` (no required schema change) |
| `components/home/menu.tsx` | Pass-through if props unchanged aside from nested item shape |

## Out of scope

- Migrating existing single-`image` CMS content
- Visible caption UI on slides
- Changing tab chrome layout (still ~3 tabs visible on desktop / 1 on mobile)
- Pad-to-group-size so a 4-wide viewport never mixes two menus

## Error / edge handling

- Menu with 0 images after mapping: omit item (or skip empty lists in flatten).
- Missing caption: `alt` falls back to menu `name`.
- Missing LQIP: `placeholder="empty"` (no blur).
- Fewer slides than needed for loop: disable loop or duplicate until Swiper can loop (preserve current project pattern).
- `duration` below schema min: schema already enforces `min(1000)`.

## Testing checklist

- Studio: add multiple images + captions per menu item; confirm preview/list works
- Desktop: 4 visible, advances by 2; tab progress spans `ceil(n/2)` steps
- Mobile: 1 visible, advances by 1; tab progress spans `n` steps
- Manual drag across a menu boundary updates active tab and progress position
- Tab click jumps to that menu’s first image and resets that tab’s progress start
- Images with LQIP show blur placeholder; caption used as alt
- Fallback content still renders if Sanity menu is empty
