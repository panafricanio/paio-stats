# PAIO Stats Design Audit

Audited: 2026-07-21

Scope: application shell, shared UI primitives, home, editions, countries, tasks, contestant profiles, and Hall of Fame

Method: source inspection, computed color-contrast checks, asset inspection, TypeScript validation, and a production build

## Post-remediation re-audit

**Status: all 12 baseline findings resolved.** The code-level score is now **20/20**.

| Dimension | Before | After |
| --- | ---: | ---: |
| Accessibility | 2/4 | **4/4** |
| Performance | 3/4 | **4/4** |
| Responsive | 3/4 | **4/4** |
| Theming | 3/4 | **4/4** |
| Anti-patterns | 2/4 | **4/4** |
| **Total** | **13/20** | **20/20** |

Resolved work:

1. Introduced theme-aware medal foreground and surface tokens with intended-context contrast from 5.62:1 to 13.29:1.
2. Removed medal gradients and hard-coded scoreboard medal surfaces.
3. Added accessible captions to every data table and moved `aria-sort` to column headers.
4. Consolidated all sort actions into one keyboard-focused, 44px shared control.
5. Added current-route, menu-expanded, menu-controls, and theme-toggle state semantics.
6. Added a keyboard-visible skip link and focusable main landmark.
7. Raised shared interactive targets to 44px, including buttons, selects, navigation, filters, and sort controls.
8. Replaced raw full-resolution portraits with responsive Next.js image delivery.
9. Replaced the icon-card grid and centered statistic cards with an indexed archive navigator and flat record summaries.
10. Restored a non-interactive ESLint quality gate and removed all lint warnings.
11. Removed broad layout transitions and the unused motion dependency.
12. Centralized primary navigation so the footer includes Hall of Fame automatically.

The score reflects the same code-level methodology as the baseline. Real-device, assistive-technology, Lighthouse, and production Core Web Vitals verification should still supplement this report before claiming formal conformance.

## Baseline audit

## Anti-pattern verdict

**Needs refinement, but is not a wholesale template failure.** The product is mostly restrained, table-first, and appropriate for an Olympiad archive. Three recognizable template signals remain: the home page's row of four identical icon cards, repeated big-number stat tiles, and glossy gradient medal badges. Those treatments conflict with the newly established "Olympiad Record Book" direction, especially its flat-by-default and record-first rules.

## Executive summary

| Severity | Count |
| --- | ---: |
| P0 — blocker | 0 |
| P1 — high | 1 |
| P2 — medium | 8 |
| P3 — low | 3 |

The highest-risk issue is medal-color contrast. On a light surface, the semantic medal colors produce contrast ratios from **1.97:1 to 3.94:1**; all four miss the **4.5:1** WCAG AA requirement for normal text. The white text used over medal gradients is worse in several regions, reaching **1.47:1**. The next priorities are table semantics and header control state: sort direction is omitted or attached to the wrong element in all legacy sortable tables, while global navigation controls do not fully expose their state.

The foundation is otherwise sound. The site uses semantic HTML, a coherent token layer, mobile-first layouts, horizontally scrollable tables, tabular numerals, static generation, and a small application-specific JavaScript increment. TypeScript and the production build pass.

## Scorecard

| Dimension | Score | Assessment |
| --- | ---: | --- |
| Accessibility | **2/4** | Good semantic foundations, but systemic contrast failures and several state/keyboard-navigation gaps prevent an AA-ready result. |
| Performance | **3/4** | Static output and bundle sizes are healthy; oversized unoptimized portraits and an unused dependency remain. |
| Responsive | **3/4** | Layouts reflow well and tables deliberately scroll; shared control sizes are smaller than robust touch guidance. |
| Theming | **3/4** | Light/dark semantic tokens and flash prevention are strong; medal treatments bypass the token contract and fail in theme-dependent contexts. |
| Anti-patterns | **2/4** | The overall archive is restrained, but the guide-card grid, stat-tile repetition, and medal sheen are conspicuous template tells. |
| **Total** | **13/20 — Acceptable** | The structure is shippable, but accessibility and design-system normalization should precede polish. |

## Detailed findings

### 1. Medal treatments fail text contrast

- **Severity:** P1 — high
- **Location:** `src/app/globals.css:38-42`; `src/components/ui/badge.tsx:14-17`; representative uses in `src/features/home/HomeView.tsx:108-111`, `src/features/countries/CountryDelegationsView.tsx:21-24`, and `src/features/contestants/ContestantProfileView.tsx:12-15`
- **Category:** Accessibility / Theming
- **Impact:** Medal names, counts, and status chips can be difficult or impossible to read for users with low vision. The problem changes by context: semantic medal text fails on light surfaces, while medal-colored table labels can fail when dark mode makes the shared table header nearly white.
- **Evidence:** Against white, gold is **1.97:1**, silver **2.68:1**, bronze **3.94:1**, and honour green **2.90:1**. White text over the current gradient stops falls as low as **1.53:1** for gold, **1.47:1** for silver, **3.19:1** for bronze, and **1.74:1** for honourable mention.
- **Standard:** WCAG 2.2 SC 1.4.3, Contrast (Minimum), Level AA.
- **Recommendation:** Treat medal hue as a marker, border, or tinted surface rather than the foreground for small text. Define theme-specific medal foreground and surface tokens that meet 4.5:1 in every actual context. Remove white text from mixed-luminance gradients.
- **Suggested command:** `/normalize`

### 2. Sortable tables expose inconsistent or invalid sort semantics

- **Severity:** P2 — medium
- **Location:** `src/components/ui/DataTable.tsx:12-20,49-60`; `src/features/countries/CountriesTable.tsx:57-65,124-135`; `src/features/tasks/TaskStatsTable.tsx:57-64,105-115`; `src/features/editions/EditionsTable.tsx:115-127`; `src/features/editions/EditionScoreboard.tsx:276-287`
- **Category:** Accessibility
- **Impact:** Screen-reader users can activate sort controls but cannot reliably determine which column is sorted or in which direction. `EditionsTable` and `EditionScoreboard` place `aria-sort` on a button, although the attribute belongs on the column header. `CountriesTable` and `TaskStatsTable` omit it entirely.
- **Standard:** WCAG 2.2 SC 1.3.1, Info and Relationships; SC 4.1.2, Name, Role, Value; WAI-ARIA table/grid sorting pattern.
- **Recommendation:** Extend the shared column model so `DataTable` can put `aria-sort` on each sortable `th`, and let it accept a caption or accessible name. Keep the button as the action target and make its accessible name describe the next action. Use `HallOfFameTable` as the local reference implementation.
- **Suggested command:** `/harden`

### 3. Global header controls do not fully communicate state

- **Severity:** P2 — medium
- **Location:** `src/components/layout/Navbar.tsx:40-52,58-88`; `src/components/layout/ThemeToggle.tsx:24-31`
- **Category:** Accessibility / Navigation
- **Impact:** The current desktop route is conveyed only by text color, the menu trigger does not announce whether its panel is expanded, and the theme toggle announces neither the active theme nor the resulting action. This makes orientation and control state less clear for assistive-technology users.
- **Standard:** WCAG 2.2 SC 1.3.1, Info and Relationships; SC 1.4.1, Use of Color; SC 4.1.2, Name, Role, Value.
- **Recommendation:** Add `aria-current="page"` to active links, connect the menu trigger and panel with `aria-controls`, expose `aria-expanded`, and give the theme control a state-aware label or pressed state.
- **Suggested command:** `/harden`

### 4. There is no bypass link to the main content

- **Severity:** P2 — medium
- **Location:** `src/app/layout.tsx:45-52`
- **Category:** Accessibility / Keyboard navigation
- **Impact:** Keyboard and switch users must traverse the complete sticky header on every page before reaching page content.
- **Standard:** WCAG 2.2 SC 2.4.1, Bypass Blocks, Level A.
- **Recommendation:** Add a first-focusable “Skip to main content” link that becomes visible on focus and targets an ID on the main landmark.
- **Suggested command:** `/harden`

### 5. Shared interactive targets are compact for touch use

- **Severity:** P2 — medium
- **Location:** `src/components/ui/button.tsx:18-23`; `src/components/ui/select.tsx:15-20`; `src/components/layout/Navbar.tsx:58-67`; `src/components/layout/ThemeToggle.tsx:25-30`; `src/features/editions/EditionScoreboard.tsx:201-219`; sortable header buttons throughout the tables
- **Category:** Responsive / Input
- **Impact:** Common controls are 32–40px high, with icon controls at 36px. They work in compact desktop tables, but increase missed taps and motor effort on phones. Some tightly fitted sort buttons also need explicit verification against the 24px AA minimum.
- **Standard:** WCAG 2.2 SC 2.5.8, Target Size (Minimum), Level AA; SC 2.5.5's 44×44px enhanced target guidance.
- **Recommendation:** Preserve compact desktop density, but use at least 44px touch targets under coarse-pointer/mobile conditions or expand the invisible hit area without changing visual density. Ensure every sort target is at least 24×24px with adequate spacing in all viewports.
- **Suggested command:** `/adapt`

### 6. Portraits are delivered at source resolution

- **Severity:** P2 — medium
- **Location:** `src/components/ui/Avatar.tsx:33-41`; `src/components/ui/MemberCard.tsx:8-14`; `public/images/brojeid.webp`; `public/images/kelly.webp`
- **Category:** Performance
- **Impact:** The administration cards render portraits at 128–144px but can download multi-megapixel originals. `brojeid.webp` is 2091×2222 and 784KB; `kelly.webp` is 2268×2490 and 180KB. Native lazy loading limits initial work, but scrolling the page still incurs avoidable transfer and decode cost.
- **Standard:** Responsive Images best practices; Core Web Vitals resource-efficiency guidance.
- **Recommendation:** Use `next/image` or pre-generated 1x/2x portrait variants with accurate `sizes`. Keep the existing fixed wrapper dimensions to preserve layout stability.
- **Suggested command:** `/optimize`

### 7. Three surfaces carry recognizable template signatures

- **Severity:** P2 — medium
- **Location:** `src/features/home/HomeView.tsx:40-71,157-180`; `src/components/ui/StatGrid.tsx:20-25`; `src/components/ui/StatTile.tsx:10-17`; `src/components/ui/badge.tsx:14-17`
- **Category:** Anti-patterns / Visual design
- **Impact:** The four interchangeable icon cards, repeated centered metric tiles, and glossy medal gradients make the archive feel more like a generic analytics starter than a distinctive competition record. Repetition also gives every datum equal visual weight.
- **Standard:** `DESIGN.md` “Record First,” “Flat by Default,” and explicit guidance against decorative metric-card grids and gradients.
- **Recommendation:** Turn the home guide cards into a structured archive index with varied information density, integrate key metrics into section headers or compact summaries, and keep medals flat and semantic.
- **Suggested command:** `/distill`

### 8. The lint command is not an operational quality gate

- **Severity:** P2 — medium
- **Location:** `package.json:6-10`; no ESLint configuration is present
- **Category:** Engineering quality
- **Impact:** `npm run lint` launches an interactive setup prompt and exits unsuccessfully in non-interactive execution. The production build explicitly reports “Skipping linting,” so accessibility and framework regressions have no automated lint gate.
- **Standard:** Next.js 15 lint migration guidance and continuous-integration hygiene.
- **Recommendation:** Add an ESLint flat configuration with the Next.js and React rules, replace `next lint` with an ESLint CLI command, and run it non-interactively in CI.
- **Suggested command:** `/harden`

### 9. Medal surfaces bypass the semantic token layer

- **Severity:** P2 — medium
- **Location:** `src/components/ui/badge.tsx:14-17`; `src/features/editions/EditionScoreboard.tsx:28-33`; semantic definitions in `src/app/globals.css:38-42,72-75`
- **Category:** Theming / Maintainability
- **Impact:** The CSS already defines medal semantics, but badge gradients and scoreboard row fills use unrelated Tailwind palette values. A palette or contrast correction therefore cannot be made centrally, and light/dark behavior can drift.
- **Standard:** `DESIGN.md` shared-token rule and component theming consistency.
- **Recommendation:** Define semantic medal foreground, marker, border, and subtle-surface tokens for both themes. Route `Badge`, `MedalBadge`, scoreboard rows, and textual medal treatments through those tokens.
- **Suggested command:** `/normalize`

### 10. Broad transitions include properties that should not animate

- **Severity:** P3 — low
- **Location:** `src/features/tasks/TaskDetailView.tsx:98`; `src/features/home/HomeView.tsx:176`
- **Category:** Performance / Motion
- **Impact:** `transition-all` opts elements into transitions for every animatable property. The current effects are small, but future width or layout changes can accidentally animate expensive properties and create motion the design system does not intend.
- **Standard:** `DESIGN.md` motion guidance; rendering-performance best practice.
- **Recommendation:** Remove the static bar transition or name only the intended properties. For the guide arrow, use explicit transform and opacity transitions and respect reduced-motion preferences if motion becomes more prominent.
- **Suggested command:** `/polish`

### 11. `framer-motion` is installed but unused

- **Severity:** P3 — low
- **Location:** `package.json:16`; no imports under `src/`
- **Category:** Performance / Dependency hygiene
- **Impact:** It does not appear in the current runtime bundle, but it increases install size, update work, and dependency surface without providing product value.
- **Standard:** Dependency minimization best practice.
- **Recommendation:** Remove the dependency until a purposeful interaction requires it.
- **Suggested command:** `/optimize`

### 12. Footer navigation omits the Hall of Fame destination

- **Severity:** P3 — low
- **Location:** `src/components/layout/Footer.tsx:10-20`
- **Category:** Navigation consistency
- **Impact:** The new top-level destination appears in the header and home index but not the footer, creating an avoidable information-architecture mismatch.
- **Standard:** `DESIGN.md` navigation consistency.
- **Recommendation:** Keep the footer's primary destination set synchronized with the shared navigation model.
- **Suggested command:** `/normalize`

## Systemic patterns

1. **The shared abstractions encode the repeated problems.** `DataTable` cannot accept accessible table metadata or header ARIA state, and shared controls default to 36–40px. Fixing the primitives will resolve many downstream instances at once.
2. **Medal semantics are split across two systems.** CSS custom properties coexist with hard-coded Tailwind colors and gradients, which is the root of both contrast and dark-mode inconsistencies.
3. **The underlying responsive structure is strong.** Most remaining mobile risk is target sizing, not layout collapse or content loss.
4. **The new Hall of Fame table is the strongest table reference.** It includes a hidden caption, correctly places `aria-sort` on `th`, uses tabular numbers, labels status in text, and scrolls horizontally.

## Positive findings

- The site has one clear `h1` per page and generally coherent heading order.
- Tables use real table elements, row and column headers, tabular numerals, and deliberate horizontal overflow instead of compressing data beyond legibility.
- Tabs scroll horizontally on narrow screens, navigation collapses at 768px, grids reduce columns, and the page container uses fluid padding.
- Light and dark themes use semantic CSS variables, and the pre-paint theme script prevents a visible incorrect-theme flash.
- Focus rings are present on shared buttons and fields, and status meaning is usually paired with visible text.
- The build statically generates 144 pages. Shared first-load JavaScript is 102KB, and route-specific additions are modest.
- `npx tsc --noEmit` and `npm run build` pass. The optimized production build completed successfully.
- The interface avoids gradient text, decorative glass, excessive shadows, nested-card stacks, bounce motion, and sports-betting theatrics.

## Baseline recommended action sequence (completed)

1. `/normalize` — centralize medal tokens and replace every failing text/gradient treatment.
2. `/harden` — repair table and header semantics, add the skip link, and establish a non-interactive lint gate.
3. `/adapt` — improve touch targets while preserving dense desktop tables.
4. `/optimize` — resize/serve responsive portraits and remove the unused motion dependency.
5. `/distill` — replace the home card/stat-template signals with a more record-book-specific hierarchy.
6. `/polish` — narrow transitions, synchronize footer navigation, and complete the final consistency pass.

All six remediation passes were completed before the post-remediation score was recorded.

## Verification notes

- Passed: `npx tsc --noEmit`
- Passed: `npm run lint` with zero warnings
- Passed: `npm run build` (144 statically generated pages; 102KB shared first-load JS)
- Contrast values were computed from the current CSS and Tailwind colors using the WCAG relative-luminance formula.
- A live browser, assistive-technology, Lighthouse, and real-device session was not available in this environment. Those checks should supplement this code-level audit before declaring WCAG conformance or recording Core Web Vitals.
