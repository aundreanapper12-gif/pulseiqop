import test from "node:test";
import assert from "node:assert/strict";
import { cashDetail, jobDetail, laborDetail } from "../app/workspace/detail-model";

test("labor burden uses employer costs once and rejects impossible productive hours", () => {
  const result = laborDetail(10000, { taxes: 800, benefits: 1000, insurance: 200, otherBurden: 0, paidHours: 400, productiveHours: 300 });
  assert.equal(result.total, 12000);
  assert.equal(result.paidRate, 30);
  assert.equal(result.productiveRate, 40);
  const invalid = laborDetail(10000, { taxes: 0, benefits: 0, insurance: 0, otherBurden: 0, paidHours: 0, productiveHours: 10 });
  assert.equal(invalid.productiveRate, null);
  assert.equal(invalid.invalidHours, true);
});

test("cash bridge separates principal and distributions from profit and respects balance movement signs", () => {
  const result = cashDetail(5000, { opening: 10000, receivablesIncrease: 2000, receivablesDecrease: 0, inventoryIncrease: 1000, inventoryDecrease: 0, payablesIncrease: 500, payablesDecrease: 0, noncash: 300, principal: 800, equipment: 1200, draws: 600, funding: 1000 });
  assert.equal(result.workingCapital, -2500);
  assert.equal(result.outflows, 2600);
  assert.equal(result.movement, 1200);
  assert.equal(result.closing, 11200);
});

test("job excess hours are a subset of actual labor and never deducted twice", () => {
  const result = jobDetail({ id: "1", name: "Repair", revenue: 500, plannedHours: 3, actualHours: 4, materials: 100, otherCosts: 20, rework: 10 }, 30);
  assert.equal(result.labor, 120);
  assert.equal(result.extraLabor, 30);
  assert.equal(result.contribution, 250);
  assert.equal(result.margin, 50);
});
