import test from "node:test";
import assert from "node:assert/strict";
import { analyzeBusiness, defaultInputs, demoInputs } from "../app/workspace/model";
import { compareForecastCases, defaultForecast, historyTrend, normalizeForecast, normalizeHistory, projectBusiness } from "../app/workspace/forecast";
import { inspectExpenses } from "../app/workspace/quality";
import type { ExpenseEntry } from "../app/workspace/expenses";

test("monthly growth compounds while payroll changes apply only once", () => {
  const inputs = { ...defaultInputs, revenue: 10000, payroll: 3000, overtime: 1000, software: 2000 };
  const result = projectBusiness(inputs, { ...defaultForecast, horizon: 3, revenueGrowth: 10, expenseGrowth: 5, payrollChange: 8, costReduction: 15, openingCash: 1000, monthlyCashAdjustments: -500 });
  assert.equal(result.rows[0].revenue, 11000);
  assert.equal(result.rows[0].baseCosts, 6300);
  assert.equal(result.rows[0].scenarioCosts, 6321);
  assert.equal(result.rows[1].scenarioCosts, 6637.05);
  assert.equal(result.rows[0].scenarioCash, 5179);
  assert.equal(result.rows[2].revenue, 13310);
  assert.equal(result.totalImprovement, -66.2);
});

test("alerts find the first loss and do not call empty inputs healthy", () => {
  const result = projectBusiness({ ...defaultInputs, revenue: 1000, payroll: 900 }, { ...defaultForecast, horizon: 3, expenseGrowth: 10 });
  assert.equal(result.firstLoss, 2);
  assert.equal(result.firstCashShortfall, 2);
  assert.equal(projectBusiness(defaultInputs, defaultForecast).ready, false);
});

test("historical rates reject gaps, duplicate months are replaced, and zero costs cannot fit growth", () => {
  const rows = [{ month: "2026-01", revenue: 100, expenses: 100 }, { month: "2026-02", revenue: 110, expenses: 105 }, { month: "2026-03", revenue: 121, expenses: 110.25 }];
  assert.equal(historyTrend(rows)?.revenueGrowth, 10);
  assert.equal(historyTrend(rows)?.expenseGrowth, 5);
  assert.equal(historyTrend([rows[0], rows[1], { ...rows[2], month: "2026-04" }]), null);
  assert.equal(historyTrend(rows.map(r => ({ ...r, expenses: 0 }))), null);
  assert.equal(normalizeHistory([...rows, { ...rows[2], revenue: 150 }]).length, 3);
  assert.equal(normalizeHistory([...rows, { ...rows[2], revenue: 150 }])[2].revenue, 150);
  assert.equal(normalizeForecast({ revenueGrowth: Infinity, costReduction: 999, horizon: 99 }).costReduction, 100);
});

test("data review catches invalid calendar dates and suggests categories without changing records", () => {
  const records: ExpenseEntry[] = [{ id: "1", date: "2026-02-30", vendor: "  Zoom ", description: "subscription", category: "other", amount: 50 }, { id: "2", date: "2026-02-01", vendor: "zoom", description: "", category: "software", amount: 50 }];
  const before = JSON.stringify(records);
  const findings = inspectExpenses(records);
  assert.ok(findings.some(f => f.entryId === "1" && f.title === "Missing or invalid date"));
  assert.ok(findings.some(f => f.suggestedCategory === "software"));
  assert.ok(findings.some(f => f.suggestedVendor === "Zoom"));
  assert.equal(JSON.stringify(records), before);
  assert.doesNotThrow(() => inspectExpenses([{ ...records[0], date: "" }]));
});

test("large expense review uses comparable peers in the same month and category", () => {
  const peers = Array.from({ length: 4 }, (_, i): ExpenseEntry => ({ id: String(i), date: "2026-02-01", vendor: "Supply", description: "", category: "supplies", amount: 100 }));
  const large = { ...peers[0], id: "large", amount: 400 };
  assert.ok(inspectExpenses([...peers, large]).some(f => f.entryId === "large" && f.title === "Unusually large expense"));
  assert.ok(!inspectExpenses([...peers, { ...large, date: "2026-03-01" }]).some(f => f.title === "Unusually large expense"));
});


test("case stress tests apply level shocks once and reconcile expected to scenario", () => {
  const inputs = { ...defaultInputs, revenue: 10000, payroll: 6000 };
  const settings = { ...defaultForecast, horizon: 3 as const, revenueGrowth: 10, openingCash: 1000, monthlyCashAdjustments: -500 };
  const [best, expected, worst] = compareForecastCases(inputs, settings, 15, 5);
  const baseline = projectBusiness(inputs, settings);
  assert.equal(worst.rows[0].revenue, 9350);
  assert.equal(worst.rows[1].revenue, 10285);
  assert.equal(worst.rows[0].costs, 6300);
  assert.equal(worst.rows[0].cash, 3550);
  assert.equal(expected.final.profit, baseline.rows[2].scenarioProfit);
  assert.equal(expected.final.cash, baseline.rows[2].scenarioCash);
  assert.ok(best.totalProfit > expected.totalProfit);
  assert.ok(expected.totalProfit > worst.totalProfit);
  const collapse = compareForecastCases({ ...inputs, payroll: 10000 }, { ...defaultForecast, horizon: 3, openingCash: 500 }, 15, 5)[2];
  assert.equal(collapse.firstShortfall, 1);
});

test("health score explanation reconciles deductions and priorities stay ranked", () => {
  const result = analyzeBusiness(demoInputs, 0);
  assert.equal(result.score, Math.max(10, Math.min(98, Math.round(100 - result.scoreDeductions.reduce((sum, item) => sum + item.points, 0)))));
  assert.equal(result.priorityPlan.length, Math.min(5, result.leaks.length));
  assert.ok(result.priorityPlan.every((item, i, rows) => i === 0 || rows[i-1].amount >= item.amount));
  assert.equal(analyzeBusiness(defaultInputs, 0).score, 0);
});
