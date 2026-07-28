// Competition ranking: same total → same rank; next rank skips (1,1,1,4…).
// Pure / injectable — call once when mapping an edition, never in the UI.

/** Round to hundredths so sheet decimals compare stably. */
export function normalizeScore(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface Rankable {
  total: number;
  /** Stable tie-break within a shared total (usually full display name). */
  sortName: string;
}

/**
 * Assign competition ranks. Returns a new array sorted by total desc, then name.
 * Contestants with equal totals share a rank; the next distinct total gets
 * `index + 1` in the ordered list (so three tied at #1 → next is #4).
 */
export function assignCompetitionRanks<T extends Rankable>(items: T[]): (T & { rank: number })[] {
  const sorted = [...items].sort(
    (a, b) =>
      normalizeScore(b.total) - normalizeScore(a.total) ||
      a.sortName.localeCompare(b.sortName, undefined, { sensitivity: "base" }),
  );

  let rank = 0;
  let lastTotal: number | null = null;

  return sorted.map((item, index) => {
    const total = normalizeScore(item.total);
    if (lastTotal === null || total !== lastTotal) {
      rank = index + 1;
      lastTotal = total;
    }
    return { ...item, rank };
  });
}
