# Hall of Fame Implementation Plan

## Goal

Add a first-class Hall of Fame tab to PAIO Stats that turns the available edition results into an all-time contestant ranking. The page should follow the useful information architecture of the IOI Statistics Hall of Fame while fitting the existing PAIO Stats design system and data model.

## Reference findings

### IOI Statistics Hall of Fame

Source: <https://stats.ioinformatics.org/halloffame/>

- The Hall of Fame is a primary navigation destination.
- The default table shows rank, contestant, participation count, gold, silver, bronze, and total medals.
- The default ranking is lexicographic by gold, then silver, then bronze.
- Contestants with the same medal tally share a competition rank, and the following rank skips the occupied positions. For example, three contestants tied at rank 2 are followed by rank 5.
- Contestant names link to their historical profiles.
- Participation and total-medal columns can be used as alternate sort views, but the Hall of Fame rank remains based on medal performance.
- The default IOI page limits the display to the first 100 ranks because its dataset is large. PAIO currently has one edition and 66 entries, so pagination is unnecessary for now.

### PAIO 2025 official results

Source: <https://2025.panafricanio.com/results>

- 66 total contestants: 57 official, 6 guest, and 3 unofficial.
- 13 official countries plus 1 guest country.
- The published results include each contestant's rank, country, per-task scores, total, and award.
- Guest contestants receive individual awards in the published results.
- Unofficial contestants are reported separately. PAIO Stats already encodes the product rule that their appearances are retained but their awards do not count as medals.
- The repository's static results contain the same 66 entries and already map them into reusable contestant, country, status, medal, and profile data.

## Product decisions

1. Add `/hall-of-fame` to desktop and mobile primary navigation.
2. Include every contestant appearance in the aggregation, including guest and unofficial appearances, because participation history is part of the Hall of Fame record.
3. Count gold, silver, and bronze medals for official and guest contestants through the existing domain rules. Keep unofficial medal counts at zero.
4. Exclude Honourable Mentions from the medal total and ranking, matching the IOI Hall of Fame's G/S/B model. They remain visible on contestant and edition result pages.
5. Merge appearances by the existing contestant slug so future editions automatically increase participation and medal counts.
6. Use competition ranking for the default medal order. Ties compare only the G/S/B tuple, not name, country, participation count, or score.
7. Show country context and status badges inside the contestant column. This adds PAIO-specific clarity without adding another wide table column.
8. Keep the page compact and table-led. On narrow screens, preserve semantic table structure and allow horizontal scrolling, consistent with the site's existing data tables.
9. Add client-side sorting for medal rank, participations, and total medals. Alternate sorting changes display order only; the all-time rank column remains the canonical medal rank.

## Implementation

1. Add a `HallOfFameRow` view model and `listHallOfFameRows()` aggregation to `StatsService`.
2. Aggregate appearances, medal tallies, latest country/status context, and latest-edition year.
3. Sort by gold, silver, bronze, then stable name order; assign shared competition ranks from the medal tuple.
4. Build a reusable Hall of Fame table with accessible sort buttons, profile links, country links, status badges, tabular numerals, and medal-semantic color.
5. Add the `/hall-of-fame` server page with metadata, a concise explanation of ranking rules, the latest covered edition, and the table.
6. Add the Hall of Fame navigation item and ensure active-route behavior works on desktop and mobile.
7. Verify type checking, production build, default ranking/ties, aggregation counts, profile links, and responsive table overflow.

## Acceptance criteria

- `/hall-of-fame` renders from the same domain data as the rest of the site, with no duplicated hard-coded standings.
- The page contains all 66 known PAIO contestant identities for the current one-edition dataset.
- The default groups are ranked 1 for gold medalists, 10 for silver medalists, 22 for counted bronze medalists, and 36 for contestants with no counted G/S/B medal under the current status rules.
- The table exposes contestant, participation, G/S/B, and total medal data and links each contestant to their profile.
- Guest and unofficial statuses are understandable without relying on color alone.
- Navigation, dark mode, keyboard focus, and small-screen horizontal scrolling remain usable.
- `npm run build` completes successfully.
