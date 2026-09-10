export type Confidence = "High" | "Medium";
export type Severity = "Critical" | "High" | "Moderate";
export type LeakType = "direct" | "modeled";

export type BusinessInputs = {
  businessName: string;
  industry: string;
  reportingPeriod: string;
  employees: number;
  locations: number;
  revenue: number;
  revenueTarget: number;
  payroll: number;
  payrollTarget: number;
  overtime: number;
  overtimeTarget: number;
  marketing: number;
  marketingTarget: number;
  refunds: number;
  refundsTarget: number;
  software: number;
  softwareTarget: number;
  fulfillment: number;
  fulfillmentTarget: number;
  supplies: number;
  suppliesTarget: number;
  facilities: number;
  facilitiesTarget: number;
  contractors: number;
  contractorsTarget: number;
  other: number;
  otherTarget: number;
  monthlyLeads: number;
  missedContactPct: number;
  conversionRate: number;
  avgCustomerValue: number;
  completedJobs: number;
  reworkPct: number;
  reworkCostPerJob: number;
};

export type NumericKey = Exclude<
  keyof BusinessInputs,
  "businessName" | "industry" | "reportingPeriod"
>;

export type LeakFinding = {
  id: string;
  name: string;
  amount: number;
  annual: number;
  type: LeakType;
  confidence: Confidence;
  severity: Severity;
  signal: string;
  whyItMatters: string;
  investigate: string[];
  firstMove: string;
  measure: string;
};

export type CostCategory = {
  id: string;
  name: string;
  actual: NumericKey;
  target: NumericKey;
  investigate: string[];
  firstMove: string;
  measure: string;
};

export const costCategories: CostCategory[] = [
  {
    id: "payroll",
    name: "Payroll",
    actual: "payroll",
    target: "payrollTarget",
    investigate: [
      "Compare labor hours with demand by day, shift, location, and workload.",
      "Look for low-utilization windows, role overlap, or staffing that does not flex with volume.",
      "Separate growth-driven payroll from avoidable scheduling or productivity drag.",
    ],
    firstMove: "Build a four-week staffing-versus-demand view before cutting hours.",
    measure: "Payroll as a percentage of revenue plus revenue or workload per paid hour.",
  },
  {
    id: "overtime",
    name: "Overtime",
    actual: "overtime",
    target: "overtimeTarget",
    investigate: [
      "Rank overtime by employee, manager, shift, weekday, and location.",
      "Check whether overtime repeatedly follows the same call-outs, schedule gaps, or demand spikes.",
      "Separate required surge coverage from avoidable scheduling patterns.",
    ],
    firstMove: "Pull the last four weeks of overtime by employee and shift and isolate repeat patterns.",
    measure: "Overtime dollars and overtime hours per unit of demand.",
  },
  {
    id: "marketing",
    name: "Marketing",
    actual: "marketing",
    target: "marketingTarget",
    investigate: [
      "Compare spend, qualified leads, conversion rate, average customer value, and retention by channel.",
      "Identify campaigns that create volume without profitable customers.",
      "Check whether spend increased before assuming the channel itself is underperforming.",
    ],
    firstMove: "Rank channels by cost per acquired customer and estimated gross value, not clicks alone.",
    measure: "Customer acquisition cost, conversion rate, and revenue or contribution per channel.",
  },
  {
    id: "refunds",
    name: "Refunds / Returns",
    actual: "refunds",
    target: "refundsTarget",
    investigate: [
      "Rank refunds by reason, product or service, employee, location, and customer segment.",
      "Look for repeat causes such as quality, expectation mismatch, fulfillment error, or billing confusion.",
      "Check whether a small number of reasons create most of the dollar loss.",
    ],
    firstMove: "Create a Pareto view of refund dollars by reason and attack the top recurring cause first.",
    measure: "Refund dollars as a percentage of revenue and repeat-refund rate by cause.",
  },
  {
    id: "software",
    name: "Software / Subscriptions",
    actual: "software",
    target: "softwareTarget",
    investigate: [
      "Audit unused seats, duplicate tools, overlapping features, and premium tiers.",
      "Match each recurring charge to an active owner and business purpose.",
      "Check annual contracts before canceling to avoid penalties or operational disruption.",
    ],
    firstMove: "Export the subscription list, assign an owner to every tool, and flag zero-use or duplicate licenses.",
    measure: "Monthly software cost per employee and percentage of paid seats actively used.",
  },
  {
    id: "fulfillment",
    name: "Shipping / Fulfillment",
    actual: "fulfillment",
    target: "fulfillmentTarget",
    investigate: [
      "Compare carriers, rush fees, packaging, distance, order size, and fulfillment method.",
      "Identify orders, routes, or locations with unusually high cost per delivery.",
      "Separate unavoidable customer-service recoveries from routine process leakage.",
    ],
    firstMove: "Rank fulfillment cost per order by carrier or route and review the highest-cost quartile.",
    measure: "Fulfillment cost per order and fulfillment cost as a percentage of sales.",
  },
  {
    id: "supplies",
    name: "Inventory / Supplies",
    actual: "supplies",
    target: "suppliesTarget",
    investigate: [
      "Look for shrinkage, spoilage, over-ordering, low-turn items, and price increases.",
      "Compare purchasing with actual sales, job volume, or consumption.",
      "Check whether minimum-order habits are creating excess stock.",
    ],
    firstMove: "Rank inventory or supply items by dollars tied up and usage velocity.",
    measure: "Supply cost per job plus inventory turns or days on hand where applicable.",
  },
  {
    id: "facilities",
    name: "Rent / Facilities",
    actual: "facilities",
    target: "facilitiesTarget",
    investigate: [
      "Separate fixed rent from utilities, maintenance, storage, and location-specific charges.",
      "Compare facility utilization and revenue contribution across locations.",
      "Identify recurring repair or utility spikes before blaming the lease itself.",
    ],
    firstMove: "Split facility costs into fixed and variable components and rank locations by cost-to-revenue ratio.",
    measure: "Facility cost as a percentage of revenue and cost per occupied or productive unit.",
  },
  {
    id: "contractors",
    name: "Contractors / Outsourcing",
    actual: "contractors",
    target: "contractorsTarget",
    investigate: [
      "Compare outsourced cost with the internal capacity or output it replaces.",
      "Look for duplicated work, emergency vendor rates, or scope creep.",
      "Check whether contractor spend is hiding a recurring staffing or process problem.",
    ],
    firstMove: "Rank vendors by monthly spend and tie each invoice to a measurable output or capacity need.",
    measure: "Contractor cost per deliverable, job, hour, or unit of demand.",
  },
  {
    id: "other",
    name: "Other Operating Costs",
    actual: "other",
    target: "otherTarget",
    investigate: [
      "Break the catch-all amount into vendors and transaction types.",
      "Look for recurring charges that should live in a named category.",
      "Identify one-time events before treating the entire variance as recurring leakage.",
    ],
    firstMove: "Split miscellaneous spending into the ten largest vendors or transaction types.",
    measure: "Unclassified spend as a percentage of total operating costs.",
  },
];

export const defaultInputs: BusinessInputs = {
  businessName: "",
  industry: "",
  reportingPeriod: "Current month",
  employees: 0,
  locations: 1,
  revenue: 0,
  revenueTarget: 0,
  payroll: 0,
  payrollTarget: 0,
  overtime: 0,
  overtimeTarget: 0,
  marketing: 0,
  marketingTarget: 0,
  refunds: 0,
  refundsTarget: 0,
  software: 0,
  softwareTarget: 0,
  fulfillment: 0,
  fulfillmentTarget: 0,
  supplies: 0,
  suppliesTarget: 0,
  facilities: 0,
  facilitiesTarget: 0,
  contractors: 0,
  contractorsTarget: 0,
  other: 0,
  otherTarget: 0,
  monthlyLeads: 0,
  missedContactPct: 0,
  conversionRate: 0,
  avgCustomerValue: 0,
  completedJobs: 0,
  reworkPct: 0,
  reworkCostPerJob: 0,
};

export const demoInputs: BusinessInputs = {
  businessName: "BrightPath Home Services",
  industry: "Home services",
  reportingPeriod: "August 2026",
  employees: 22,
  locations: 2,
  revenue: 78000,
  revenueTarget: 85000,
  payroll: 24500,
  payrollTarget: 21500,
  overtime: 6200,
  overtimeTarget: 3000,
  marketing: 9200,
  marketingTarget: 7500,
  refunds: 4200,
  refundsTarget: 1800,
  software: 2800,
  softwareTarget: 2200,
  fulfillment: 3100,
  fulfillmentTarget: 3000,
  supplies: 8900,
  suppliesTarget: 7800,
  facilities: 5200,
  facilitiesTarget: 5200,
  contractors: 4400,
  contractorsTarget: 3600,
  other: 1800,
  otherTarget: 1500,
  monthlyLeads: 410,
  missedContactPct: 13,
  conversionRate: 28,
  avgCustomerValue: 390,
  completedJobs: 205,
  reworkPct: 6,
  reworkCostPerJob: 95,
};

const severityFromRatio = (amount: number, base: number): Severity => {
  const ratio = base > 0 ? amount / base : 0;
  if (ratio >= 0.25) return "Critical";
  if (ratio >= 0.1) return "High";
  return "Moderate";
};

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

export function analyzeBusiness(inputs: BusinessInputs, recoveryPct = 50) {
  const directLeaks = costCategories.reduce<LeakFinding[]>((findings, category) => {
    const actual = Number(inputs[category.actual]) || 0;
    const target = Number(inputs[category.target]) || 0;
    const amount = target > 0 ? Math.max(actual - target, 0) : 0;
    if (amount <= 0) return findings;

    findings.push({
      id: category.id,
      name: category.name,
      amount,
      annual: amount * 12,
      type: "direct",
      confidence: "High",
      severity: severityFromRatio(amount, target),
      signal: `${category.name} is ${money(amount)} above the target entered for this period.`,
      whyItMatters:
        "This is a direct actual-versus-target variance. It identifies dollars worth investigating, but it does not prove the entire variance is waste.",
      investigate: category.investigate,
      firstMove: category.firstMove,
      measure: category.measure,
    });
    return findings;
  }, []);

  const missedLeadOpportunity =
    inputs.monthlyLeads > 0 && inputs.missedContactPct > 0 && inputs.conversionRate > 0 && inputs.avgCustomerValue > 0
      ? inputs.monthlyLeads * (inputs.missedContactPct / 100) * (inputs.conversionRate / 100) * inputs.avgCustomerValue
      : 0;

  const reworkOpportunity =
    inputs.completedJobs > 0 && inputs.reworkPct > 0 && inputs.reworkCostPerJob > 0
      ? inputs.completedJobs * (inputs.reworkPct / 100) * inputs.reworkCostPerJob
      : 0;

  const modeledLeaks: LeakFinding[] = [];
  if (missedLeadOpportunity > 0) {
    modeledLeaks.push({
      id: "missed-leads",
      name: "Missed Lead Opportunity",
      amount: missedLeadOpportunity,
      annual: missedLeadOpportunity * 12,
      type: "modeled",
      confidence: "Medium",
      severity: inputs.missedContactPct >= 15 ? "Critical" : inputs.missedContactPct >= 8 ? "High" : "Moderate",
      signal: `${inputs.missedContactPct}% of ${Math.round(inputs.monthlyLeads)} monthly leads are entered as missed or unanswered.`,
      whyItMatters:
        "PulseIQ models the possible value of those contacts using the conversion rate and average customer value you entered. Recovered callbacks, duplicate leads, capacity limits, and lead quality can reduce the recoverable amount.",
      investigate: [
        "Break missed contacts down by hour, day, channel, location, and staffing level.",
        "Measure how many missed contacts are recovered by callback before treating them as permanently lost.",
        "Compare missed-contact rate with conversion and available fulfillment capacity.",
      ],
      firstMove: "Find the three time windows creating the most missed opportunities and compare them with staffing coverage.",
      measure: "Missed-contact rate, callback recovery rate, conversion rate, and booked revenue from recovered contacts.",
    });
  }

  if (reworkOpportunity > 0) {
    modeledLeaks.push({
      id: "rework",
      name: "Rework / Repeat-Service Cost",
      amount: reworkOpportunity,
      annual: reworkOpportunity * 12,
      type: "modeled",
      confidence: "Medium",
      severity: inputs.reworkPct >= 12 ? "Critical" : inputs.reworkPct >= 6 ? "High" : "Moderate",
      signal: `${inputs.reworkPct}% of ${Math.round(inputs.completedJobs)} completed jobs are entered as requiring rework.`,
      whyItMatters:
        "This estimate applies the direct rework cost per job you entered. It is intended to expose avoidable repeat effort, not to estimate every downstream customer-experience cost.",
      investigate: [
        "Rank rework by reason, employee or crew, service type, product, location, and original completion date.",
        "Separate customer-requested changes from true errors or quality failures.",
        "Look for repeat training, equipment, handoff, or specification problems.",
      ],
      firstMove: "Code the last month of repeat work by reason and attack the most expensive recurring cause.",
      measure: "Rework rate, direct rework cost, and first-time-right completion rate.",
    });
  }

  const leaks = [...directLeaks, ...modeledLeaks].sort((a, b) => b.amount - a.amount);
  const totalExpenses = costCategories.reduce((sum, category) => sum + (Number(inputs[category.actual]) || 0), 0);
  const targetExpenses = costCategories.reduce((sum, category) => sum + (Number(inputs[category.target]) || 0), 0);
  const directLeakTotal = directLeaks.reduce((sum, leak) => sum + leak.amount, 0);
  const modeledOpportunityTotal = modeledLeaks.reduce((sum, leak) => sum + leak.amount, 0);
  const totalOpportunity = directLeakTotal + modeledOpportunityTotal;
  const revenueGap = inputs.revenueTarget > 0 ? Math.max(inputs.revenueTarget - inputs.revenue, 0) : 0;
  const operatingProfit = inputs.revenue - totalExpenses;
  const operatingMargin = inputs.revenue > 0 ? (operatingProfit / inputs.revenue) * 100 : 0;

  const costPairs = costCategories.filter(
    (category) => Number(inputs[category.actual]) > 0 && Number(inputs[category.target]) > 0,
  ).length;
  const leadComplete =
    inputs.monthlyLeads > 0 && inputs.missedContactPct > 0 && inputs.conversionRate > 0 && inputs.avgCustomerValue > 0;
  const reworkComplete = inputs.completedJobs > 0 && inputs.reworkPct > 0 && inputs.reworkCostPerJob > 0;
  const completeness = Math.min(
    100,
    Math.round((costPairs / costCategories.length) * 75 + (leadComplete ? 15 : 0) + (reworkComplete ? 10 : 0)),
  );

  const leakageRate = inputs.revenue > 0 ? totalOpportunity / inputs.revenue : 0;
  const revenueGapRate = inputs.revenueTarget > 0 ? revenueGap / inputs.revenueTarget : 0;
  const marginPenalty = operatingMargin < 0 ? 24 : operatingMargin < 5 ? 16 : operatingMargin < 10 ? 8 : 0;
  const completenessPenalty = completeness < 25 ? 10 : completeness < 50 ? 5 : 0;
  const score =
    inputs.revenue > 0
      ? Math.max(
          10,
          Math.min(
            98,
            Math.round(
              100 - Math.min(48, leakageRate * 210) - Math.min(18, revenueGapRate * 45) - marginPenalty - completenessPenalty,
            ),
          ),
        )
      : 0;

  const risk = score === 0 ? "Incomplete" : score < 55 ? "High" : score < 75 ? "Moderate" : "Controlled";
  const recoverableAtScenario = totalOpportunity * (Math.min(100, Math.max(0, recoveryPct)) / 100);
  const projectedProfit = operatingProfit + recoverableAtScenario;
  const projectedMargin = inputs.revenue > 0 ? (projectedProfit / inputs.revenue) * 100 : 0;

  const missingTargetCount = costCategories.filter(
    (category) => Number(inputs[category.actual]) > 0 && Number(inputs[category.target]) <= 0,
  ).length;
  const warnings: string[] = [];
  if (inputs.revenue <= 0) warnings.push("Add monthly revenue before relying on the health score or margin view.");
  if (missingTargetCount > 0)
    warnings.push(`${missingTargetCount} cost categor${missingTargetCount === 1 ? "y has" : "ies have"} actual spending but no target, so those dollars are not evaluated for overrun.`);
  if (inputs.revenue > 0 && totalExpenses > inputs.revenue)
    warnings.push("The operating-cost categories entered exceed revenue. Confirm the reporting period and that amounts are not duplicated.");

  const leadPartiallyFilled = [inputs.monthlyLeads, inputs.missedContactPct, inputs.conversionRate, inputs.avgCustomerValue].some((value) => value > 0) && !leadComplete;
  if (leadPartiallyFilled)
    warnings.push("The missed-lead model is only partially filled, so PulseIQ is excluding it from the opportunity estimate.");
  const reworkPartiallyFilled = [inputs.completedJobs, inputs.reworkPct, inputs.reworkCostPerJob].some((value) => value > 0) && !reworkComplete;
  if (reworkPartiallyFilled)
    warnings.push("The rework model is only partially filled, so PulseIQ is excluding it from the opportunity estimate.");

  const top = leaks[0];
  const second = leaks[1];
  const executiveSummary =
    inputs.revenue <= 0
      ? "Add revenue plus actual and target costs to generate a decision-ready executive summary."
      : leaks.length === 0
        ? `${inputs.businessName || "This business"} is at or below the targets entered across the analyzed categories. PulseIQ did not detect a target-based cost overrun or completed modeled opportunity from the data provided.`
        : `${inputs.businessName || "This business"} shows ${money(totalOpportunity)} in monthly improvement opportunity across the completed models. ${top.name} is the largest signal at ${money(top.amount)} per month${second ? `, followed by ${second.name} at ${money(second.amount)}` : ""}. Estimated operating margin is ${operatingMargin.toFixed(1)}%. A ${recoveryPct}% recovery scenario would improve monthly operating profit by about ${money(recoverableAtScenario)}.`;

  const priorityPlan = leaks.slice(0, 3).map((leak, index) => ({
    rank: index + 1,
    name: leak.name,
    amount: leak.amount,
    firstMove: leak.firstMove,
    measure: leak.measure,
    confidence: leak.confidence,
  }));

  return {
    leaks,
    priorityPlan,
    directLeakTotal,
    modeledOpportunityTotal,
    totalOpportunity,
    annualOpportunity: totalOpportunity * 12,
    totalExpenses,
    targetExpenses,
    revenueGap,
    operatingProfit,
    operatingMargin,
    completeness,
    score,
    risk,
    recoverableAtScenario,
    projectedProfit,
    projectedMargin,
    warnings,
    executiveSummary,
  };
}
