import { BusinessInputs, costCategories } from "./model";

export type ExpenseCategory = (typeof costCategories)[number]["id"];

export type ExpenseEntry = {
  id: string;
  date: string;
  vendor: string;
  description: string;
  category: string;
  amount: number;
};

export const MAX_EXPENSES = 500;

export const expenseCategoryAliases: Record<string, string> = {
  payroll: "payroll", wages: "payroll", salary: "payroll",
  overtime: "overtime",
  marketing: "marketing", advertising: "marketing", ads: "marketing",
  refunds: "refunds", returns: "refunds",
  software: "software", subscriptions: "software",
  shipping: "fulfillment", fulfillment: "fulfillment", delivery: "fulfillment",
  inventory: "supplies", supplies: "supplies", materials: "supplies",
  rent: "facilities", facilities: "facilities", utilities: "facilities",
  contractors: "contractors", outsourcing: "contractors", subcontractors: "contractors",
  other: "other", miscellaneous: "other",
};

const validCategory = (category: string) => costCategories.some((item) => item.id === category);
const cents = (amount: number) => Math.round(amount * 100) / 100;

export const exactMoney = (amount: number) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,
}).format(Number.isFinite(amount) ? amount : 0);

export function normalizeExpenseEntries(value: unknown): ExpenseEntry[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_EXPENSES).flatMap((item): ExpenseEntry[] => {
    if (!item || typeof item !== "object") return [];
    const entry = item as Partial<ExpenseEntry>;
    const amount = Number(entry.amount);
    if (!validCategory(String(entry.category)) || !Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000) return [];
    return [{
      id: typeof entry.id === "string" && entry.id ? entry.id : crypto.randomUUID(),
      date: typeof entry.date === "string" ? entry.date.slice(0, 10) : "",
      vendor: typeof entry.vendor === "string" ? entry.vendor.slice(0, 100) : "",
      description: typeof entry.description === "string" ? entry.description.slice(0, 180) : "",
      category: String(entry.category),
      amount: cents(amount),
    }];
  });
}

export function summarizeExpenses(entries: ExpenseEntry[]) {
  const categoryTotals = costCategories.map((category) => ({
    id: category.id,
    name: category.name,
    amount: cents(entries.filter((entry) => entry.category === category.id).reduce((sum, entry) => sum + entry.amount, 0)),
  })).filter((category) => category.amount > 0).sort((a, b) => b.amount - a.amount);
  const vendors = new Map<string, number>();
  entries.forEach((entry) => {
    const vendor = entry.vendor.trim() || "Unspecified vendor";
    vendors.set(vendor, (vendors.get(vendor) || 0) + entry.amount);
  });
  const vendorTotals = [...vendors].map(([name, amount]) => ({ name, amount: cents(amount) })).sort((a, b) => b.amount - a.amount);
  const total = cents(entries.reduce((sum, entry) => sum + entry.amount, 0));
  const months = new Set(entries.map((entry) => entry.date.slice(0, 7)).filter((month) => /^\d{4}-\d{2}$/.test(month)));
  return { total, categoryTotals, vendorTotals, mixedMonths: months.size > 1 };
}

// Selecting itemized expenses replaces ALL monthly actuals; targets remain user-entered.
// This is intentionally not additive, so an invoice cannot be counted twice.
export function applyExpensesToInputs(inputs: BusinessInputs, entries: ExpenseEntry[]): BusinessInputs {
  const next = { ...inputs };
  for (const category of costCategories) next[category.actual] = 0;
  for (const entry of entries) {
    const category = costCategories.find((item) => item.id === entry.category);
    if (category) next[category.actual] = cents(next[category.actual] + entry.amount);
  }
  return next;
}

function csvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  const content = text.replace(/^\uFEFF/, "");
  for (let index = 0; index < content.length; index++) {
    const char = content[index];
    if (char === '"') {
      if (quoted && content[index + 1] === '"') { cell += '"'; index++; }
      else quoted = !quoted;
    } else if (char === "," && !quoted) { row.push(cell.trim()); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && content[index + 1] === "\n") index++;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; cell = "";
    } else cell += char;
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

export function parseExpenseCsv(text: string) {
  const rows = csvRows(text);
  const headers = (rows[0] || []).map((cell) => cell.toLowerCase());
  const indices = ["date", "vendor", "description", "category", "amount"].map((header) => headers.indexOf(header));
  if (indices.some((index) => index < 0)) throw new Error("Use columns named date, vendor, description, category, and amount.");
  const entries: ExpenseEntry[] = [];
  let skipped = 0;
  for (const row of rows.slice(1)) {
    const [date, vendor, description, rawCategory, rawAmount] = indices.map((index) => row[index] || "");
    const normalized = rawCategory.toLowerCase().replace(/[^a-z]/g, "");
    const category = expenseCategoryAliases[normalized];
    const amount = Number(rawAmount.replace(/[$,\s]/g, ""));
    if (!category || !Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000 || (date && !/^\d{4}-\d{2}-\d{2}$/.test(date))) {
      skipped++; continue;
    }
    entries.push({ id: crypto.randomUUID(), date, vendor: vendor.slice(0, 100), description: description.slice(0, 180), category, amount: cents(amount) });
  }
  return { entries, skipped };
}
