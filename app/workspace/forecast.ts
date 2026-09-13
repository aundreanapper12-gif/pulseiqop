import { BusinessInputs, costCategories } from "./model";

export type ForecastSettings = {
  horizon: 3 | 6 | 12;
  revenueGrowth: number;
  expenseGrowth: number;
  payrollChange: number;
  costReduction: number;
  openingCash: number;
  monthlyCashAdjustments: number;
};
export const defaultForecast: ForecastSettings = { horizon: 6, revenueGrowth: 0, expenseGrowth: 0, payrollChange: 0, costReduction: 0, openingCash: 0, monthlyCashAdjustments: 0 };
export type HistoryMonth = { month: string; revenue: number; expenses: number };
const round = (n: number) => Math.round(n * 100) / 100;
const bounded = (n: number, min: number, max: number) => Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0;

export function normalizeForecast(value: unknown): ForecastSettings {
  const s = value && typeof value === "object" ? value as Partial<ForecastSettings> : {};
  return {
    horizon: s.horizon === 3 || s.horizon === 12 ? s.horizon : 6,
    revenueGrowth: bounded(Number(s.revenueGrowth), -50, 50),
    expenseGrowth: bounded(Number(s.expenseGrowth), -50, 50),
    payrollChange: bounded(Number(s.payrollChange), -100, 100),
    costReduction: bounded(Number(s.costReduction), 0, 100),
    openingCash: bounded(Number(s.openingCash), 0, 1e9),
    monthlyCashAdjustments: bounded(Number(s.monthlyCashAdjustments), -1e9, 1e9),
  };
}

export function normalizeHistory(value: unknown): HistoryMonth[] {
  if (!Array.isArray(value)) return [];
  const rows = new Map<string, HistoryMonth>();
  for (const item of value.slice(0, 24)) {
    if (!item || typeof item !== "object") continue;
    const row = item as HistoryMonth;
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(row.month) || !Number.isFinite(row.revenue) || !Number.isFinite(row.expenses) || row.revenue <= 0 || row.expenses < 0 || row.revenue > 1e9 || row.expenses > 1e9) continue;
    rows.set(row.month, { month: row.month, revenue: round(row.revenue), expenses: round(row.expenses) });
  }
  return [...rows.values()].sort((a, b) => a.month.localeCompare(b.month));
}

// Geometric month-over-month rate; only consecutive months qualify.
export function historyTrend(history: HistoryMonth[]) {
  const rows = normalizeHistory(history);
  if (rows.length < 3) return null;
  const serial = (month: string) => Number(month.slice(0, 4)) * 12 + Number(month.slice(5));
  if (rows.some((row, i) => i > 0 && serial(row.month) !== serial(rows[i - 1].month) + 1)) return null;
  const first = rows[0], last = rows[rows.length - 1];
  if (first.expenses <= 0 || rows.some(row => row.expenses <= 0)) return null;
  const intervals = rows.length - 1;
  const revenueGrowth = (Math.pow(last.revenue / first.revenue, 1 / intervals) - 1) * 100;
  const expenseGrowth = (Math.pow(last.expenses / first.expenses, 1 / intervals) - 1) * 100;
  if (Math.abs(revenueGrowth) > 50 || Math.abs(expenseGrowth) > 50) return null;
  return { revenueGrowth: round(revenueGrowth), expenseGrowth: round(expenseGrowth), months: rows.length, last };
}

export function projectBusiness(inputs: BusinessInputs, settings: ForecastSettings) {
  const s = normalizeForecast(settings);
  const revenue = bounded(inputs.revenue, 0, 1e9);
  const expenses = costCategories.reduce((total, category) => total + bounded(Number(inputs[category.actual]), 0, 1e9), 0);
  const payroll = bounded(inputs.payroll, 0, 1e9) + bounded(inputs.overtime, 0, 1e9);
  const otherCosts = Math.max(0, expenses - payroll);
  let baseCash = s.openingCash, scenarioCash = s.openingCash;
  const rows = Array.from({ length: s.horizon }, (_, i) => {
    const month = i + 1;
    const growth = Math.pow(1 + s.expenseGrowth / 100, month);
    const projectedRevenue = round(revenue * Math.pow(1 + s.revenueGrowth / 100, month));
    const baseCosts = round(expenses * growth);
    const scenarioCosts = round((payroll * (1 + s.payrollChange / 100) + otherCosts * (1 - s.costReduction / 100)) * growth);
    const baseProfit = round(projectedRevenue - baseCosts);
    const scenarioProfit = round(projectedRevenue - scenarioCosts);
    baseCash += baseProfit + s.monthlyCashAdjustments;
    scenarioCash += scenarioProfit + s.monthlyCashAdjustments;
    return { month, label: `Month ${month}`, revenue: projectedRevenue, baseCosts, scenarioCosts, baseProfit, scenarioProfit, baseCash: round(baseCash), scenarioCash: round(scenarioCash) };
  });
  const firstLoss = rows.find(row => row.baseProfit < 0)?.month ?? null;
  const firstCashShortfall = rows.find(row => row.scenarioCash < 0)?.month ?? null;
  const totalImprovement = round(rows.reduce((sum, row) => sum + row.scenarioProfit - row.baseProfit, 0));
  return { rows, firstLoss, firstCashShortfall, totalImprovement, ready: revenue > 0, expenses, payroll, otherCosts };
}

// One-time level shocks to each projected month, not changes in compounded growth.
export function compareForecastCases(inputs: BusinessInputs, settings: ForecastSettings, revenueSwing = 15, costSwing = 5) {
  const revenuePct = bounded(revenueSwing, 0, 50);
  const costPct = bounded(costSwing, 0, 50);
  const projection = projectBusiness(inputs, settings);
  const s = normalizeForecast(settings);
  return [{ name: "Best case", direction: 1 }, { name: "Expected case", direction: 0 }, { name: "Worst case", direction: -1 }].map(({ name, direction }) => {
    let cash = s.openingCash;
    const rows = projection.rows.map(row => {
      const revenue = round(row.revenue * (1 + direction * revenuePct / 100));
      const costs = round(row.scenarioCosts * (1 - direction * costPct / 100));
      const profit = round(revenue - costs);
      cash += profit + s.monthlyCashAdjustments;
      return { month: row.month, revenue, costs, profit, cash: round(cash) };
    });
    return { name, rows, final: rows[rows.length - 1], totalProfit: round(rows.reduce((sum, row) => sum + row.profit, 0)), firstShortfall: rows.find(row => row.cash < 0)?.month ?? null };
  });
}
