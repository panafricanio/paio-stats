---
name: PAIO Stats
description: A clear, credible, and celebratory record of Pan-African Informatics Olympiad history.
colors:
  archive-ink: "#0f0f0f"
  record-paper: "#ffffff"
  quiet-paper: "#f5f5f5"
  quiet-ink: "#666666"
  record-line: "#e6e6e6"
  night-ink: "#fafafa"
  night-surface: "#171717"
  night-muted: "#262626"
  night-quiet: "#a3a3a3"
  night-line: "#2e2e2e"
  result-blue: "#2463eb"
  guest-violet: "#7c3bed"
  medal-gold: "#f0ad05"
  medal-silver: "#9e9e9e"
  medal-bronze: "#c9641d"
  honour-green: "#1eae53"
  medal-gold-ink: "#7a4e00"
  medal-silver-ink: "#525252"
  medal-bronze-ink: "#914512"
  honour-green-ink: "#107033"
  medal-gold-surface: "#fff6e0"
  medal-silver-surface: "#f2f2f2"
  medal-bronze-surface: "#faeee5"
  honour-green-surface: "#e7f8ed"
  destructive-red: "#ef4444"
typography:
  display:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  control: "12px"
  md: "16px"
  lg: "24px"
  section: "40px"
  page: "56px"
components:
  button-primary:
    backgroundColor: "{colors.archive-ink}"
    textColor: "{colors.night-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.record-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  field:
    backgroundColor: "{colors.record-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "44px"
  card:
    backgroundColor: "{colors.record-paper}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.quiet-paper}"
    textColor: "{colors.archive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  navigation-link:
    textColor: "{colors.quiet-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  table-header:
    backgroundColor: "{colors.archive-ink}"
    textColor: "{colors.night-ink}"
    typography: "{typography.label}"
    padding: "8px 12px"
---

# Design System: PAIO Stats

## 1. Overview

**Creative North Star: "The Olympiad Record Book"**

PAIO Stats should feel like a carefully maintained competition archive opened on a generous desk: orderly, factual, and immediately legible, with moments of ceremony reserved for earned results. A coach or alumnus checking a record in a bright classroom should encounter the light theme first; a contestant browsing late at night should receive the same hierarchy through the dark theme.

The interface is a product surface, so familiarity is an advantage. Tables, tabs, links, and controls use standard patterns and compact density. The system rejects sports-betting spectacle, generic SaaS analytics decoration, and unexplained legacy-database density. It celebrates contestants through precise typography, medal semantics, and connected records rather than visual noise.

**Key Characteristics:**

- Table-first information architecture with strong row and column rhythm.
- Restrained neutral surfaces with color reserved for data meaning and status.
- Flat, bordered hierarchy with very limited overlay elevation.
- Poppins headings paired with Inter body and interface text.
- Responsive page containers and horizontally scrollable data tables.

**The Record First Rule.** Names, results, and relationships always outrank decoration. If a visual treatment slows factual scanning, remove it.

## 2. Colors

The palette treats the interface as an archival record: ink, paper, and quiet dividers carry the structure, while competition colors identify outcomes.

### Primary

- **Archive Ink** (`#0f0f0f`): Primary actions, light-theme table headers, and the strongest text.
- **Record Paper** (`#ffffff`): Light-theme page and card surfaces.
- **Night Ink** (`#fafafa`): Dark-theme text and primary surfaces.

### Secondary

- **Result Blue** (`#2463eb`): Progress bars and quantitative emphasis.
- **Guest Violet** (`#7c3bed`): Guest status only, never general decoration.

### Tertiary

- **Medal Gold** (`#f0ad05`): Gold markers and borders, never small text.
- **Medal Silver** (`#9e9e9e`): Silver markers and borders, never small text.
- **Medal Bronze** (`#c9641d`): Bronze markers and borders, never small text.
- **Honour Green** (`#1eae53`): Honourable Mention markers and borders, never small text.
- **Medal Inks** (`#7a4e00`, `#525252`, `#914512`, `#107033`): Accessible light-theme text for gold, silver, bronze, and Honourable Mention. Dark mode supplies corresponding lighter foreground tokens.
- **Medal Surfaces** (`#fff6e0`, `#f2f2f2`, `#faeee5`, `#e7f8ed`): Flat, low-chroma light-theme fills for badges and awarded rows. Dark mode supplies corresponding deep surfaces.
- **Destructive Red** (`#ef4444`): Destructive state only.

### Neutral

- **Quiet Paper** (`#f5f5f5`): Secondary light surfaces and subtle section distinction.
- **Quiet Ink** (`#666666`): Supporting light-theme copy.
- **Record Line** (`#e6e6e6`): Light-theme borders and dividers.
- **Night Surface** (`#171717`): Dark-theme cards and popovers.
- **Night Muted** (`#262626`): Dark-theme secondary surfaces.
- **Night Quiet** (`#a3a3a3`): Supporting dark-theme copy.
- **Night Line** (`#2e2e2e`): Dark-theme borders and dividers.

**The Restrained Color Rule.** Neutral structure owns the screen. Saturated color appears only when it communicates a score, medal, status, error, or interactive state.

## 3. Typography

**Display Font:** Poppins (with Inter and sans-serif fallback)
**Body Font:** Inter (with system-ui and sans-serif fallback)

**Character:** Poppins gives public records a friendly institutional voice; Inter keeps dense tables and supporting text quiet and efficient. The pairing is contemporary without pretending the statistics product is an editorial campaign.

### Hierarchy

- **Display** (600, `3rem`, 1.05): Page-defining titles and the home introduction; mobile steps down to `2.25rem`.
- **Headline** (600, `2.25rem`, 1.15): Major content sections; mobile steps down to `1.875rem`.
- **Title** (600, `1.5rem`, 1.25): Tab panels, edition sections, and component groups.
- **Body** (400, `1rem`, 1.625): Explanations and supporting content, capped near 70 characters when prose is the primary content.
- **Label** (500, `0.875rem`, 1.25): Navigation, controls, table headings, and compact metadata.

**The Tabular Clarity Rule.** Every numeric comparison uses tabular figures and a consistent alignment. Display typography is prohibited inside data cells and controls.

## 4. Elevation

The system is flat by default. Borders, tinted secondary surfaces, and whitespace establish depth; cards do not float above the page. A medium structural shadow is permitted only for temporary floating content such as the open select menu. The sticky navigation may use restrained background translucency to preserve context while scrolling.

### Shadow Vocabulary

- **Overlay Medium** (`0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)`): Select menus and other temporary overlays only.

**The Flat by Default Rule.** Resting content uses lines and tonal layers. If every card casts a shadow, the hierarchy has failed.

## 5. Components

Components are refined and restrained: gently curved, compact, and explicit about state.

### Buttons

- **Shape:** Gently curved rectangle (`10px`) with a minimum 44px interactive target.
- **Primary:** Archive Ink with Night Ink text, medium label weight, and `20px` horizontal padding.
- **Hover / Focus:** Color or opacity changes complete within roughly `150ms`; keyboard focus uses a visible two-pixel semantic ring.
- **Secondary / Ghost / Tertiary:** Secondary uses Quiet Paper, outline uses a Record Line border, ghost adds only a hover surface, and link buttons underline on hover.

### Chips

- **Style:** Full pill radius with a one-pixel semantic border, flat semantic surface, and compact `2px 10px` padding. Medal sheen and gradients are prohibited.
- **State:** Status always includes a text label. Medal, guest, and unofficial meaning must never rely on color alone.

### Cards / Containers

- **Corner Style:** Gently curved (`12px`).
- **Background:** Record Paper in light mode and Night Surface in dark mode.
- **Shadow Strategy:** Flat at rest; use the Elevation rule.
- **Border:** One-pixel Record Line or Night Line.
- **Internal Padding:** Usually `16px` for metrics and `24px` for content.

### Inputs / Fields

- **Style:** Forty-four-pixel control height, `10px` radius, one-pixel border, and the current page surface.
- **Focus:** Two-pixel semantic focus ring, with no layout shift.
- **Error / Disabled:** Destructive Red is reserved for real errors; disabled controls retain their shape and reduce opacity.

### Navigation

- **Style:** A sticky 64-pixel top bar with a compact logo lockup, muted inactive links, and standard hover surfaces. Desktop navigation is inline from `768px`; mobile uses explicit theme and menu buttons followed by a full-width link list.
- **State:** The current destination uses foreground text on desktop and a quiet selected surface on mobile.
- **Archive Index:** Primary record destinations use an indexed, divided list rather than interchangeable icon cards.

### Data Tables

- **Style:** A single bordered container, dark semantic header, compact rows, tabular numerals, and clear horizontal alignment.
- **Behavior:** Dense tables retain semantic table markup and scroll horizontally on narrow screens. Every table has an accessible caption. Sort controls use a 44px target and expose direction through both iconography and `aria-sort` on the column header.

## 6. Do's and Don'ts

### Do:

- **Do** reserve medal marker color for earned outcomes, use the accessible medal ink for text, and pair color with a label or numeric context.
- **Do** keep body prose near 70 characters per line and let data tables use the width they need.
- **Do** use the shared semantic tokens for every surface, border, state, and data color.
- **Do** preserve familiar table, tab, link, select, and navigation behavior.
- **Do** use `8px`, `10px`, and `12px` radii consistently according to component scale.

### Don't:

- **Don't** turn the product into a sports-betting dashboard that sensationalizes rankings or turns every value into a promotional graphic.
- **Don't** build a generic SaaS analytics page filled with decorative metric cards, gradients, and empty visual effects.
- **Don't** recreate a dense legacy database whose abbreviations, ranking rules, and horizontal tables are unexplained.
- **Don't** use color, flag emoji, or medal sheen as the only carrier of meaning.
- **Don't** nest cards, repeat identical icon-card grids without a task reason, or add decorative glass effects.
- **Don't** animate layout properties or add bounce and elastic easing.
