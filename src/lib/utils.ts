export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatStat(value: number, decimals?: number): string {
  if (decimals === undefined) return Math.round(value).toString();
  return value.toFixed(decimals);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
