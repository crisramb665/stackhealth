/**
 * Format a Date into YYYY-MM-DD (local time).
 */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Calculate streak length from an array of completion date strings (YYYY-MM-DD).
 * Assumes dates are sorted descending (most recent first).
 */
export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const today = toDateString(new Date());
  let streak = 0;
  let expected = today;

  for (const date of dates) {
    if (date === expected) {
      streak++;
      // Move expected to previous day
      const d = new Date(expected);
      d.setDate(d.getDate() - 1);
      expected = toDateString(d);
    } else if (date < expected) {
      break;
    }
  }

  return streak;
}
