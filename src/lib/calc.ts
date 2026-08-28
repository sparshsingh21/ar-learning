/** Calendar-day difference (UTC date parts) from start → end. */
export function daysBetween(start: Date, end: Date): number {
  const s = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const e = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((e - s) / 86_400_000);
}

export function agingBucket(days: number): string {
  if (days < 0) return "Future";
  if (days <= 30) return "0–30";
  if (days <= 60) return "31–60";
  if (days <= 90) return "61–90";
  if (days <= 120) return "91–120";
  return "120+";
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function countWeekdays(
  from: Date,
  to: Date,
  excludeSat: boolean,
  excludeSun: boolean,
): number {
  let count = 0;
  const cur = new Date(from);
  cur.setHours(0, 0, 0, 0);
  const end = new Date(to);
  end.setHours(0, 0, 0, 0);

  while (cur <= end) {
    const day = cur.getDay();
    const isSat = day === 6;
    const isSun = day === 0;
    if (!((excludeSat && isSat) || (excludeSun && isSun))) {
      count += 1;
    }
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export function percent(part: number, whole: number): number | null {
  if (whole <= 0) return null;
  return Math.round((part / whole) * 10000) / 100;
}
