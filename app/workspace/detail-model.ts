export function safeAmount(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(1_000_000_000, Math.max(0, n)) : 0;
}

export type LaborDetail = { taxes: number; benefits: number; insurance: number; otherBurden: number; paidHours: number; productiveHours: number };
export function laborDetail(wages: number, detail: LaborDetail) {
  const burden = [detail.taxes, detail.benefits, detail.insurance, detail.otherBurden].reduce((sum, n) => sum + safeAmount(n), 0);
  const total = safeAmount(wages) + burden;
  const paid = safeAmount(detail.paidHours);
  const productive = safeAmount(detail.productiveHours);
  return { burden, total, paidRate: paid > 0 ? total / paid : null, productiveRate: productive > 0 && productive <= paid ? total / productive : null, invalidHours: productive > paid };
}

export type CashDetail = { opening: number; receivablesIncrease: number; receivablesDecrease: number; inventoryIncrease: number; inventoryDecrease: number; payablesIncrease: number; payablesDecrease: number; noncash: number; principal: number; equipment: number; draws: number; funding: number };
export function cashDetail(profit: number, d: CashDetail) {
  const workingCapital = -safeAmount(d.receivablesIncrease) + safeAmount(d.receivablesDecrease) - safeAmount(d.inventoryIncrease) + safeAmount(d.inventoryDecrease) + safeAmount(d.payablesIncrease) - safeAmount(d.payablesDecrease);
  const outflows = safeAmount(d.principal) + safeAmount(d.equipment) + safeAmount(d.draws);
  const movement = profit + safeAmount(d.noncash) + workingCapital - outflows + safeAmount(d.funding);
  return { workingCapital, outflows, movement, closing: safeAmount(d.opening) + movement };
}

export type JobDetail = { id: string; name: string; revenue: number; plannedHours: number; actualHours: number; materials: number; otherCosts: number; rework: number };
export function jobDetail(job: JobDetail, rate: number) {
  const labor = safeAmount(job.actualHours) * safeAmount(rate);
  const extraLabor = Math.max(safeAmount(job.actualHours) - safeAmount(job.plannedHours), 0) * safeAmount(rate);
  const contribution = safeAmount(job.revenue) - labor - safeAmount(job.materials) - safeAmount(job.otherCosts) - safeAmount(job.rework);
  return { labor, extraLabor, contribution, margin: job.revenue > 0 ? contribution / job.revenue * 100 : null };
}
