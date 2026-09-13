import { analyzeBusiness, BusinessInputs, costCategories, money } from "./model";
import { ExpenseEntry, exactMoney } from "./expenses";
import { compareForecastCases, ForecastSettings, projectBusiness } from "./forecast";
import { RecoveryAction, recoveryObservation } from "./recovery";

export type ReportPlan = { settings: ForecastSettings; revenueSwing: number; costSwing: number };
export type ReportData = { inputs: BusinessInputs; period: string; source: string; expenses: ExpenseEntry[]; actions: RecoveryAction[]; recoveryPct: number; plan: ReportPlan; generatedAt: string };
const clean = (text: string) => text.normalize("NFKD").replace(/[\u2010-\u2015]/g, "-").replace(/[^\x20-\x7e\n]/g, "");
const literal = (text: string) => clean(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
const navy = "0.059 0.09 0.165", muted = "0.278 0.333 0.412", blue = "0.114 0.306 0.847";

// Self-contained PDF generation keeps business figures in the browser.
export function buildExecutivePdf(data: ReportData): Uint8Array {
  const analysis = analyzeBusiness(data.inputs, data.recoveryPct);
  const inputs = { ...data.inputs, reportingPeriod: data.period };
  const projection = projectBusiness(inputs, data.plan.settings);
  const cases = compareForecastCases(inputs, data.plan.settings, data.plan.revenueSwing, data.plan.costSwing);
  const pages: string[][] = [];
  let y = 0;
  const command = (s: string) => pages[pages.length - 1].push(s);
  const drawText = (text: string, x: number, top: number, size = 10, bold = false, color = navy) => command(`BT /${bold ? "F2" : "F1"} ${size} Tf ${color} rg 1 0 0 1 ${x} ${top} Tm (${literal(text)}) Tj ET`);
  const width = (text: string, size: number) => [...clean(text)].reduce((sum, c) => sum + (/[MW@%]/.test(c) ? 0.98 : /[ilI.,:; ']/.test(c) ? 0.27 : /[A-Z]/.test(c) ? 0.68 : 0.53), 0) * size;
  const wrap = (text: string, size = 10, maxWidth = 524) => {
    const lines: string[] = [];
    for (const paragraph of clean(text).split("\n")) {
      let line = "";
      for (const raw of paragraph.split(/\s+/)) {
        const chunks: string[] = [];
        let chunk = "";
        for (const c of raw) {
          if (chunk && width(chunk + c, size) > maxWidth) { chunks.push(chunk); chunk = c; }
          else chunk += c;
        }
        chunks.push(chunk);
        for (const word of chunks) {
          if (line && width(`${line} ${word}`, size) > maxWidth) { lines.push(line); line = word; }
          else line = line ? `${line} ${word}` : word;
        }
      }
      lines.push(line);
    }
    return lines;
  };
  const newPage = (title: string) => {
    pages.push([]);
    command(`${navy} rg 0 704 612 88 re f`);
    drawText("PULSEIQ / OPERATIONS", 44, 756, 11, true, "1 1 1");
    drawText(title, 44, 728, 19, true, "1 1 1");
    y = 680;
  };
  const ensure = (height: number) => { if (y - height < 64) newPage("Executive report / continued"); };
  const text = (value: string, size = 10, bold = false, color = navy) => {
    for (const line of wrap(value, size)) { ensure(size * 1.55); drawText(line, 44, y, size, bold, color); y -= size * 1.55; }
    y -= 7;
  };
  const heading = (value: string) => { ensure(58); y -= 9; text(value, 13, true, blue); };
  const pair = (label: string, value: string) => { ensure(28); drawText(label, 44, y, 10, false, muted); drawText(value, 330, y, 11, true); y -= 26; };

  newPage("Business performance brief");
  text(data.inputs.businessName || "Unnamed business", 22, true);
  text(`${data.period || "Period not specified"} | ${data.inputs.industry || "Industry not specified"}`, 11, false, muted);
  text(`Prepared ${data.generatedAt} | Source: ${data.source}`, 9, false, muted);
  heading("Monthly financial position");
  pair("Revenue", exactMoney(data.inputs.revenue));
  pair("Entered operating costs", exactMoney(analysis.totalExpenses));
  pair("Estimated operating profit", exactMoney(analysis.operatingProfit));
  pair("Operating margin", data.inputs.revenue > 0 ? `${analysis.operatingMargin.toFixed(1)}%` : "Revenue required");
  pair("PulseIQ prioritization score", analysis.score ? `${analysis.score}/100 (${analysis.risk})` : "Incomplete");
  heading("Executive takeaway");
  text(analysis.executiveSummary);
  heading("Your next three moves");
  if (!analysis.priorityPlan.length) text("No completed finding is available. Complete revenue, costs, and targets, then review data quality.");
  analysis.priorityPlan.slice(0, 3).forEach(item => { text(`${item.rank}. ${item.name} | ${money(item.amount)} monthly signal`, 11, true); text(item.firstMove); });
  text("Figures reflect supplied records, not verified books. Operating profit excludes unentered costs, taxes, debt service, and collection timing. Annualized estimates assume the same monthly pattern continues.", 9, false, muted);

  newPage("Findings & supporting evidence");
  text(`Budget overruns: ${exactMoney(analysis.directLeakTotal)} | Modeled opportunity: ${exactMoney(analysis.modeledOpportunityTotal)}`, 11, true);
  text("These amounts are investigation signals. They are not confirmed waste, savings, or additional revenue.", 10, false, muted);
  analysis.leaks.forEach((leak, index) => {
    ensure(150); heading(`${index + 1}. ${leak.name}`);
    text(`${leak.type === "direct" ? "Budget overrun" : "Modeled opportunity"} | ${exactMoney(leak.amount)} monthly | ${exactMoney(leak.annual)} annualized`, 10, true);
    const category = costCategories.find(c => c.id === leak.id);
    if (category) text(`Calculation: max(${exactMoney(Number(inputs[category.actual]))} actual - ${exactMoney(Number(inputs[category.target]))} target, 0). Targets are owner-entered.`);
    else if (leak.id === "missed-leads") text(`Calculation: ${inputs.monthlyLeads} leads x ${inputs.missedContactPct}% missed x ${inputs.conversionRate}% conversion x ${exactMoney(inputs.avgCustomerValue)} customer value.`);
    else text(`Rework model uses ${inputs.completedJobs} jobs x ${inputs.reworkPct}% rework x ${exactMoney(inputs.reworkCostPerJob)} direct cost per job. Review overlap with entered operating costs.`);
    text(leak.signal); text(`First move: ${leak.firstMove}`); text(`Measure: ${leak.measure}`, 9, false, muted);
    const entries = data.expenses.filter(e => e.category === leak.id);
    if (entries.length) {
      text(`Supporting records: showing ${Math.min(5, entries.length)} of ${entries.length} included entries.`, 9, true);
      entries.slice(0, 5).forEach(e => text(`${e.date || "Undated"} | ${e.vendor} | ${exactMoney(e.amount)} | ${e.description || "No description"}`, 9, false, muted));
    } else text("Source: entered monthly category totals or operational model inputs; no supporting itemized records included for this finding.", 9, false, muted);
  });
  if (!analysis.leaks.length) text("No completed finding. Categories without positive targets are excluded from overrun checks.");
  heading("Score calculation & input checks");
  text("Start at 100, subtract the deductions below, round, and limit to 10-98. Revenue and operating costs are required. This does not assess actual cash flow, debt, or creditworthiness.");
  analysis.scoreDeductions.forEach(item => text(`${item.name}: ${item.points.toFixed(1)} points deducted. ${item.detail}`, 9));
  analysis.warnings.forEach(warning => text(warning, 9, false, muted));

  newPage("Forecast & decision scenarios");
  const s = data.plan.settings;
  text(`Baseline: ${data.period}. Horizon: ${s.horizon} months.`, 11, true);
  text(`Monthly revenue growth ${s.revenueGrowth}%; cost growth ${s.expenseGrowth}%. One-time payroll/overtime change ${s.payrollChange}%; other-cost reduction ${s.costReduction}%. Opening cash ${exactMoney(s.openingCash)}; monthly net cash adjustments ${exactMoney(s.monthlyCashAdjustments)}.`, 10);
  heading("Expected scenario / month by month");
  if (projection.ready) {
    drawText("Month", 44, y, 9, true); drawText("Revenue", 145, y, 9, true); drawText("Costs", 255, y, 9, true); drawText("Profit", 365, y, 9, true); drawText("Cash", 465, y, 9, true); y -= 25;
    projection.rows.forEach(row => { ensure(26); drawText(row.label, 44, y, 9); [row.revenue, row.scenarioCosts, row.scenarioProfit, row.scenarioCash].forEach((v, i) => drawText(money(v), [145, 255, 365, 465][i], y, 9)); command(`0.9 0.93 0.96 RG 44 ${y - 9} m 568 ${y - 9} l S`); y -= 26; });
    heading("Best / expected / worst comparison");
    cases.forEach(c => text(`${c.name}: ${money(c.totalProfit)} total operating profit; ${money(c.final.cash)} ending cash${c.firstShortfall ? `; first cash shortfall ${projection.rows[c.firstShortfall - 1].label}` : "; no cash shortfall in this horizon"}.`, 10));
  } else text("Enter monthly revenue to generate an outlook.");
  text(`Best and worst apply one-time revenue +/-${data.plan.revenueSwing}% and costs -/+${data.plan.costSwing}% to each expected month. Monthly growth rates stay unchanged. These are stress-test assumptions, not probabilities or confidence intervals.`, 9, false, muted);
  text("Cash assumes revenue is collected and costs paid in the same month, plus entered adjustments. Receivables, payables, seasonality, and unentered costs are excluded. Forecasts are not guarantees.", 9, false, muted);
  heading("Action follow-up");
  if (!data.actions.length) text("No action follow-up recorded for this business.");
  data.actions.forEach(action => {
    const observation = recoveryObservation(action);
    text(`${action.categoryName}: ${action.plannedFix}`, 10, true);
    text(`Owner: ${action.owner || "Unassigned"}. Baseline ${action.baselinePeriod}: ${exactMoney(action.baselineActual)}. Follow-up ${action.followupPeriod || "not entered"}: ${action.followupActual === null ? "not entered" : exactMoney(action.followupActual)}.`);
    text(observation ? `Observed cost change: ${exactMoney(observation.observedCostChange)}. Owner-confirmed improvement: ${observation.ownerConfirmedAmount === null ? "not established" : exactMoney(observation.ownerConfirmedAmount)}.` : "No comparable follow-up period recorded.");
    if (action.evidence) text(`Owner evidence: ${action.evidence}`, 9, false, muted);
  });

  pages.forEach((page, i) => { page.push(`BT /F1 8 Tf ${muted} rg 1 0 0 1 44 32 Tm (PULSEIQ | Business figures remain local | ${i + 1} / ${pages.length}) Tj ET`); });
  const objects: string[] = ["<< /Type /Catalog /Pages 2 0 R >>", "", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"];
  const kids: string[] = [];
  pages.forEach(page => { const pageId = objects.length + 1, streamId = pageId + 1; kids.push(`${pageId} 0 R`); objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${streamId} 0 R >>`); const stream = page.join("\n"); objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`); });
  objects[1] = `<< /Type /Pages /Count ${pages.length} /Kids [${kids.join(" ")}] >>`;
  let pdf = "%PDF-1.4\n"; const offsets = [0];
  objects.forEach((object, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${object}\nendobj\n`; });
  const start = pdf.length; pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach(offset => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}
