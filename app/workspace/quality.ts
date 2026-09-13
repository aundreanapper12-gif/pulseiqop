import { ExpenseEntry, expensePeriod, UNDATED_PERIOD } from "./expenses";

export type QualityFinding = { id: string; entryId: string; title: string; detail: string; suggestedCategory?: string; suggestedVendor?: string };
const normalizedVendor = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();
const categoryRules: [RegExp, string][] = [
  [/\b(payroll|salary|wages)\b/i, "payroll"],
  [/\b(overtime)\b/i, "overtime"],
  [/\b(advertising|google ads|facebook ads|marketing)\b/i, "marketing"],
  [/\b(subscription|software|saas|microsoft 365|adobe|zoom)\b/i, "software"],
  [/\b(rent|electric|utilities|water bill)\b/i, "facilities"],
  [/\b(shipping|postage|fedex|ups delivery)\b/i, "fulfillment"],
  [/\b(contractor|subcontractor)\b/i, "contractors"],
  [/\b(inventory|materials|supplies)\b/i, "supplies"],
];

export function inspectExpenses(entries: ExpenseEntry[]): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const vendors = new Map<string, string>();
  for (const entry of entries) {
    const key = normalizedVendor(entry.vendor);
    if (key && !vendors.has(key)) vendors.set(key, entry.vendor.trim().replace(/\s+/g, " "));
    if (!key) findings.push({ id: `${entry.id}:vendor`, entryId: entry.id, title: "Missing vendor", detail: "Add a vendor so spending can be grouped correctly." });
    const canonical = vendors.get(key);
    if (canonical && canonical !== entry.vendor) findings.push({ id: `${entry.id}:name`, entryId: entry.id, title: "Inconsistent vendor name", detail: `Use “${canonical}” to match the other entries.`, suggestedVendor: canonical });
    const date = new Date(`${entry.date}T00:00:00Z`);
    if (expensePeriod(entry) === UNDATED_PERIOD || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== entry.date) findings.push({ id: `${entry.id}:date`, entryId: entry.id, title: "Missing or invalid date", detail: "Correct the date before using this entry in a monthly comparison." });
    if (entry.category === "other") {
      const matches = categoryRules.filter(([rule]) => rule.test(`${entry.vendor} ${entry.description}`));
      const categories = [...new Set(matches.map(([, category]) => category))];
      findings.push({ id: `${entry.id}:category`, entryId: entry.id, title: "Review catch-all category", detail: categories.length === 1 ? "The vendor or description suggests a more specific category. Confirm it before applying." : "Check whether this expense belongs in a specific category.", suggestedCategory: categories.length === 1 ? categories[0] : undefined });
    }
    // Only compare within the same category and month; do not compare monthly aggregates with prior months.
    const peers = entries.filter(other => other.id !== entry.id && other.category === entry.category && expensePeriod(other) === expensePeriod(entry)).map(other => other.amount).sort((a, b) => a - b);
    if (peers.length >= 4) {
      const median = peers.length % 2 ? peers[Math.floor(peers.length / 2)] : (peers[peers.length / 2 - 1] + peers[peers.length / 2]) / 2;
      if (median > 0 && entry.amount > median * 3) findings.push({ id: `${entry.id}:amount`, entryId: entry.id, title: "Unusually large expense", detail: "This is over three times the median of the other entries in this category and month. Check the invoice and coverage period." });
    }
  }
  return findings;
}
