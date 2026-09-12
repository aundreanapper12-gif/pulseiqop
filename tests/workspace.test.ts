import test from "node:test";
import assert from "node:assert/strict";
import { compareExpensePeriods, expensePeriods, expensesInPeriod, reviewExpensePatterns, summarizeExpenses, type ExpenseEntry } from "../app/workspace/expenses";
import { recoveryObservation, type RecoveryAction } from "../app/workspace/recovery";

const records: ExpenseEntry[] = [
  { id: "aug-1", date: "2026-08-04", vendor: "Example Supply", description: "Materials", category: "supplies", amount: 120 },
  { id: "sep-1", date: "2026-09-04", vendor: "example  supply", description: "Materials", category: "supplies", amount: 120 },
  { id: "sep-2", date: "2026-09-04", vendor: "Example Supply", description: "Materials", category: "supplies", amount: 120 },
  { id: "undated", date: "", vendor: "Office", description: "Unassigned", category: "facilities", amount: 900 },
];

test("only the selected month enters the monthly expense analysis", () => {
  assert.deepEqual(expensePeriods(records), ["2026-09", "2026-08", "undated"]);
  const september = expensesInPeriod(records, "2026-09");
  assert.equal(summarizeExpenses(september).total, 240);
  assert.equal(summarizeExpenses(expensesInPeriod(records, "undated")).total, 900);
  assert.deepEqual(summarizeExpenses(september).vendorTotals.map(({ amount }) => amount), [240]);
  const comparison = compareExpensePeriods(records, "2026-09");
  assert.equal(comparison?.previousPeriod, "2026-08");
  assert.equal(comparison?.change, 120);
  assert.equal(compareExpensePeriods(records, "2026-08"), null);
});

test("repeat charge warnings do not count undated entries or assert a duplicate is waste", () => {
  const patterns = reviewExpensePatterns(records);
  assert.equal(patterns.possibleDuplicates.length, 1);
  assert.deepEqual(patterns.possibleDuplicates[0].entryIds, ["sep-1", "sep-2"]);
  assert.deepEqual(patterns.recurringCharges[0].months, ["2026-08", "2026-09"]);
});

const baseline: RecoveryAction = {
  id: "1", business: "example", categoryId: "overtime", categoryName: "Overtime",
  baselinePeriod: "August 2026", baselineActual: 6200, baselineTarget: 3000,
  plannedFix: "Adjust schedule", createdAt: "2026-09-01", owner: "", followupPeriod: "",
  followupActual: null, evidence: "", ownerConfirmedAmount: null,
};

test("observed spending is separate from owner-confirmed savings", () => {
  assert.equal(recoveryObservation(baseline), null);
  assert.equal(recoveryObservation({ ...baseline, followupPeriod: "August 2026", followupActual: 4000 }), null);
  const followup = { ...baseline, followupPeriod: "September 2026", followupActual: 4000, ownerConfirmedAmount: 1500 };
  assert.deepEqual(recoveryObservation(followup), { observedCostChange: 2200, targetGapChange: 2200, ownerConfirmedAmount: null });
  assert.equal(recoveryObservation({ ...followup, evidence: "Same jobs; fewer overtime hours recorded." })?.ownerConfirmedAmount, 1500);
  assert.equal(recoveryObservation({ ...followup, evidence: "Same jobs; fewer overtime hours recorded.", ownerConfirmedAmount: 2500 })?.ownerConfirmedAmount, null);
  assert.equal(recoveryObservation({ ...followup, followupActual: 7000 })?.observedCostChange, -800);
});
