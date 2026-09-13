const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

export function reportingMonth(value: string): string | null {
  const text = value.trim().toLowerCase();
  if (/^\d{4}-(0[1-9]|1[0-2])$/.test(text)) return text;
  const match = /^([a-z]+)\s+(\d{4})$/.exec(text);
  if (!match) return null;
  const month = months.findIndex(name => name === match[1] || name.slice(0, 3) === match[1]);
  return month < 0 ? null : `${match[2]}-${String(month + 1).padStart(2, "0")}`;
}

export function forecastMonth(period: string, offset: number): string {
  const baseline = reportingMonth(period);
  if (!baseline) return `Month ${offset}`;
  const serial = Number(baseline.slice(0, 4)) * 12 + Number(baseline.slice(5)) - 1 + offset;
  return `${months[serial % 12].slice(0, 3).replace(/^./, c => c.toUpperCase())} ${Math.floor(serial / 12)}`;
}
