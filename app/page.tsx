"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  DollarSign,
  Gauge,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Upload,
  Workflow,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Inputs = {
  businessName: string;
  industry: string;
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
  shipping: number;
  shippingTarget: number;
  inventory: number;
  inventoryTarget: number;
  rent: number;
  rentTarget: number;
  other: number;
  otherTarget: number;
  monthlyLeads: number;
  missedCallPct: number;
  conversionRate: number;
  avgCustomerValue: number;
};

type NumericKey = Exclude<keyof Inputs, "businessName" | "industry">;

type Leak = {
  name: string;
  amount: number;
  annual: number;
  reason: string;
  action: string;
  type: "expense" | "opportunity";
  severity: "Critical" | "High" | "Moderate";
};

const defaultInputs: Inputs = {
  businessName: "",
  industry: "",
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
  shipping: 0,
  shippingTarget: 0,
  inventory: 0,
  inventoryTarget: 0,
  rent: 0,
  rentTarget: 0,
  other: 0,
  otherTarget: 0,
  monthlyLeads: 0,
  missedCallPct: 0,
  conversionRate: 0,
  avgCustomerValue: 0,
};

const demoInputs: Inputs = {
  businessName: "BrightPath Home Services",
  industry: "Home services",
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
  shipping: 3100,
  shippingTarget: 3000,
  inventory: 8900,
  inventoryTarget: 7800,
  rent: 5200,
  rentTarget: 5200,
  other: 4400,
  otherTarget: 4200,
  monthlyLeads: 410,
  missedCallPct: 13,
  conversionRate: 28,
  avgCustomerValue: 390,
};

const expenseConfig: Array<{
  name: string;
  actual: NumericKey;
  target: NumericKey;
  reason: string;
  action: string;
}> = [
  {
    name: "Payroll",
    actual: "payroll",
    target: "payrollTarget",
    reason: "Labor cost is running above the target you entered.",
    action:
      "Compare staffing hours with revenue, workload, shift demand, and location performance. Look for overcoverage, low-utilization windows, or role overlap.",
  },
  {
    name: "Overtime",
    actual: "overtime",
    target: "overtimeTarget",
    reason: "Overtime is above your monthly target.",
    action:
      "Break overtime down by employee, shift, weekday, manager, and demand level. Separate necessary surge coverage from repeat scheduling problems.",
  },
  {
    name: "Marketing",
    actual: "marketing",
    target: "marketingTarget",
    reason: "Marketing spend is above target.",
    action:
      "Compare spend, leads, conversion rate, customer value, and retention by channel. Cut spend only after identifying which channels are actually underperforming.",
  },
  {
    name: "Refunds / Returns",
    actual: "refunds",
    target: "refundsTarget",
    reason: "Refund or return costs are above target.",
    action:
      "Rank refunds by product, service, reason, employee, location, and fulfillment method. A small number of causes often create most of the loss.",
  },
  {
    name: "Software",
    actual: "software",
    target: "softwareTarget",
    reason: "Software and subscription spending is above target.",
    action:
      "Audit licenses, duplicate tools, unused seats, premium tiers, and subscriptions that overlap with features you already pay for elsewhere.",
  },
  {
    name: "Shipping / Fulfillment",
    actual: "shipping",
    target: "shippingTarget",
    reason: "Shipping or fulfillment costs are above target.",
    action:
      "Compare carriers, rush fees, packaging, zones, weight bands, and order size. Identify which orders or locations carry unusually high fulfillment cost.",
  },
  {
    name: "Inventory / Supplies",
    actual: "inventory",
    target: "inventoryTarget",
    reason: "Inventory or supply spending is above target.",
    action:
      "Look for shrinkage, spoilage, over-ordering, low-turn items, price increases, and purchasing patterns that do not match actual sales or usage.",
  },
  {
    name: "Rent / Facilities",
    actual: "rent",
    target: "rentTarget",
    reason: "Facility-related spending is above target.",
    action:
      "Separate fixed rent from utilities, maintenance, storage, and location-specific charges before deciding whether the facility itself is the problem.",
  },
  {
    name: "Other Operating Costs",
    actual: "other",
    target: "otherTarget",
    reason: "Other operating costs are above target.",
    action:
      "Break the catch-all category into vendors and transaction types. Large miscellaneous categories frequently hide recurring waste that is easy to miss.",
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const pct = (value: number) => `${Math.round(value)}%`;

function NumericInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-black/60">{label}</span>
      {hint ? <span className="ml-2 text-xs text-black/35">{hint}</span> : null}
      <div className="mt-2 flex items-center rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 transition focus-within:border-black/40 focus-within:bg-white">
        {prefix ? <span className="font-bold text-black/35">{prefix}</span> : null}
        <input
          type="number"
          min="0"
          step="any"
          value={value || ""}
          onChange={(event) =>
            onChange(Math.max(0, Number(event.target.value) || 0))
          }
          className="w-full bg-transparent px-2 py-3 font-semibold outline-none"
          placeholder="0"
        />
        {suffix ? <span className="font-bold text-black/35">{suffix}</span> : null}
      </div>
    </label>
  );
}

function MetricCard({
  label,
  value,
  note,
  dark = false,
}: {
  label: string;
  value: string;
  note: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.7rem] border p-5 ${
        dark
          ? "border-white/10 bg-white/10 text-white"
          : "border-black/10 bg-white/80 text-black"
      }`}
    >
      <p className={`text-xs font-black uppercase tracking-[0.18em] ${dark ? "text-white/45" : "text-black/40"}`}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
      <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/55" : "text-black/50"}`}>
        {note}
      </p>
    </div>
  );
}

export default function Home() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [hasRun, setHasRun] = useState(false);
  const [recoveryPct, setRecoveryPct] = useState(50);
  const [uploadMessage, setUploadMessage] = useState("");

  const setValue = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const analysis = useMemo(() => {
    const expenseLeaks: Leak[] = expenseConfig
      .map((item) => {
        const actual = Number(inputs[item.actual]) || 0;
        const target = Number(inputs[item.target]) || 0;
        const amount = target > 0 ? Math.max(actual - target, 0) : 0;
        const relative = target > 0 ? amount / target : 0;
        const severity: Leak["severity"] =
          relative >= 0.25 ? "Critical" : relative >= 0.1 ? "High" : "Moderate";

        return {
          name: item.name,
          amount,
          annual: amount * 12,
          reason: item.reason,
          action: item.action,
          type: "expense" as const,
          severity,
        };
      })
      .filter((item) => item.amount > 0);

    const missedLeadOpportunity =
      inputs.monthlyLeads *
      (inputs.missedCallPct / 100) *
      (inputs.conversionRate / 100) *
      inputs.avgCustomerValue;

    const leadLeak: Leak | null =
      missedLeadOpportunity > 0
        ? {
            name: "Missed Lead Opportunity",
            amount: missedLeadOpportunity,
            annual: missedLeadOpportunity * 12,
            reason:
              "Based on your lead volume, missed-contact rate, conversion rate, and customer value, unanswered opportunities may represent recoverable revenue.",
            action:
              "Break missed contacts down by hour, channel, location, and staff coverage. Measure how many are recovered through callbacks before treating the entire estimate as lost revenue.",
            type: "opportunity",
            severity:
              inputs.missedCallPct >= 15
                ? "Critical"
                : inputs.missedCallPct >= 8
                  ? "High"
                  : "Moderate",
          }
        : null;

    const leaks = [...expenseLeaks, ...(leadLeak ? [leadLeak] : [])].sort(
      (a, b) => b.amount - a.amount,
    );

    const totalExpenses = expenseConfig.reduce(
      (sum, item) => sum + (Number(inputs[item.actual]) || 0),
      0,
    );
    const targetExpenses = expenseConfig.reduce(
      (sum, item) => sum + (Number(inputs[item.target]) || 0),
      0,
    );
    const profit = inputs.revenue - totalExpenses;
    const margin = inputs.revenue > 0 ? (profit / inputs.revenue) * 100 : 0;
    const expenseLeak = expenseLeaks.reduce((sum, item) => sum + item.amount, 0);
    const totalOpportunity = expenseLeak + missedLeadOpportunity;
    const revenueGap =
      inputs.revenueTarget > 0
        ? Math.max(inputs.revenueTarget - inputs.revenue, 0)
        : 0;

    const targetPairs = expenseConfig.filter(
      (item) => Number(inputs[item.actual]) > 0 && Number(inputs[item.target]) > 0,
    ).length;
    const funnelComplete =
      inputs.monthlyLeads > 0 &&
      inputs.missedCallPct > 0 &&
      inputs.conversionRate > 0 &&
      inputs.avgCustomerValue > 0;
    const completeness = Math.min(
      100,
      Math.round((targetPairs / expenseConfig.length) * 80 + (funnelComplete ? 20 : 0)),
    );

    const leakageRate = inputs.revenue > 0 ? totalOpportunity / inputs.revenue : 0;
    const revenueGapRate =
      inputs.revenueTarget > 0 ? revenueGap / inputs.revenueTarget : 0;
    const marginPenalty = margin < 0 ? 22 : margin < 5 ? 14 : margin < 10 ? 8 : 0;
    const score = Math.max(
      18,
      Math.min(
        98,
        Math.round(
          100 -
            Math.min(52, leakageRate * 220) -
            Math.min(18, revenueGapRate * 45) -
            marginPenalty,
        ),
      ),
    );

    const risk = score < 55 ? "High" : score < 75 ? "Moderate" : "Controlled";
    const recoverableAtScenario = totalOpportunity * (recoveryPct / 100);
    const projectedProfit = profit + recoverableAtScenario;
    const projectedMargin =
      inputs.revenue > 0 ? (projectedProfit / inputs.revenue) * 100 : 0;

    const currentVsTarget = expenseConfig
      .filter(
        (item) => Number(inputs[item.actual]) > 0 || Number(inputs[item.target]) > 0,
      )
      .map((item) => ({
        name: item.name.replace(" / ", "/"),
        Actual: Number(inputs[item.actual]) || 0,
        Target: Number(inputs[item.target]) || 0,
      }));

    const recoveryChart = [
      { name: "Current Profit", value: profit },
      { name: `${recoveryPct}% Recovery`, value: recoverableAtScenario },
      { name: "Projected Profit", value: projectedProfit },
    ];

    const top = leaks[0];
    const second = leaks[1];
    const executiveSummary =
      inputs.revenue <= 0
        ? "Enter revenue and expense data to generate an executive summary."
        : leaks.length === 0
          ? `${inputs.businessName || "This business"} is currently at or below the targets entered across the analyzed categories. PulseIQ did not identify a target-based cost overrun from the data provided.`
          : `${inputs.businessName || "This business"} shows ${money(totalOpportunity)} in monthly profit-improvement opportunity across the data provided. ${top.name} is the largest flagged area at ${money(top.amount)} per month${second ? `, followed by ${second.name} at ${money(second.amount)}` : ""}. The current operating margin is ${margin.toFixed(1)}%. At a ${recoveryPct}% recovery scenario, projected monthly profit improves by ${money(recoverableAtScenario)}.`;

    return {
      leaks,
      expenseLeak,
      missedLeadOpportunity,
      totalOpportunity,
      annualOpportunity: totalOpportunity * 12,
      totalExpenses,
      targetExpenses,
      profit,
      margin,
      revenueGap,
      score,
      risk,
      completeness,
      recoverableAtScenario,
      projectedProfit,
      projectedMargin,
      currentVsTarget,
      recoveryChart,
      executiveSummary,
    };
  }, [inputs, recoveryPct]);

  const loadDemo = () => {
    setInputs(demoInputs);
    setHasRun(true);
    setUploadMessage("Demo data loaded.");
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const runScan = () => {
    setHasRun(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const downloadTemplate = () => {
    const csv = [
      "category,actual,target",
      "revenue,78000,85000",
      "payroll,24500,21500",
      "overtime,6200,3000",
      "marketing,9200,7500",
      "refunds,4200,1800",
      "software,2800,2200",
      "shipping,3100,3000",
      "inventory,8900,7800",
      "rent,5200,5200",
      "other,4400,4200",
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pulseiq-business-data-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCsv = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text
        .split(/\r?\n/)
        .map((row) => row.trim())
        .filter(Boolean);

      if (rows.length < 2) {
        setUploadMessage("That CSV does not contain enough rows to analyze.");
        return;
      }

      const headers = rows[0]
        .split(",")
        .map((header) => header.trim().toLowerCase());
      const categoryIndex = headers.indexOf("category");
      const actualIndex = headers.indexOf("actual");
      const targetIndex = headers.indexOf("target");

      if (categoryIndex < 0 || actualIndex < 0 || targetIndex < 0) {
        setUploadMessage(
          "Use the PulseIQ template with columns named category, actual, and target.",
        );
        return;
      }

      const csvMap: Record<string, [NumericKey, NumericKey]> = {
        revenue: ["revenue", "revenueTarget"],
        payroll: ["payroll", "payrollTarget"],
        overtime: ["overtime", "overtimeTarget"],
        marketing: ["marketing", "marketingTarget"],
        refunds: ["refunds", "refundsTarget"],
        returns: ["refunds", "refundsTarget"],
        software: ["software", "softwareTarget"],
        shipping: ["shipping", "shippingTarget"],
        fulfillment: ["shipping", "shippingTarget"],
        inventory: ["inventory", "inventoryTarget"],
        supplies: ["inventory", "inventoryTarget"],
        rent: ["rent", "rentTarget"],
        facilities: ["rent", "rentTarget"],
        other: ["other", "otherTarget"],
      };

      const patch: Partial<Record<NumericKey, number>> = {};
      let matched = 0;

      rows.slice(1).forEach((row) => {
        const values = row.split(",").map((cell) => cell.trim());
        const category = (values[categoryIndex] || "")
          .toLowerCase()
          .replace(/[^a-z]/g, "");
        const mapping = csvMap[category];
        if (!mapping) return;
        patch[mapping[0]] = Math.max(0, Number(values[actualIndex]) || 0);
        patch[mapping[1]] = Math.max(0, Number(values[targetIndex]) || 0);
        matched += 1;
      });

      setInputs((current) => ({ ...current, ...patch }));
      setHasRun(true);
      setUploadMessage(
        matched > 0
          ? `Imported ${matched} financial categories from ${file.name}.`
          : "No recognized categories were found. Download the PulseIQ template and try again.",
      );
    } catch {
      setUploadMessage("PulseIQ could not read that file. Try the CSV template instead.");
    }
  };

  const expenseRows = expenseConfig.map((item) => ({
    label: item.name,
    actual: item.actual,
    target: item.target,
  }));

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f4efe7]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight">PulseIQ</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.24em] text-black/35">
                Operations Intelligence
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-black/60 md:flex">
            <a href="#how">How it works</a>
            <a href="#scan">Analyze</a>
            <a href="#services">Services</a>
          </div>

          <a
            href="#scan"
            className="rounded-full bg-black px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Find My Leaks
          </a>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pt-24">
        <div className="absolute left-[15%] top-10 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
        <div className="absolute right-[8%] top-44 h-80 w-80 rounded-full bg-amber-200/55 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-black shadow-sm">
              <Zap size={16} /> Profit Intelligence for Small Businesses
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">
              Your numbers know where the money is going.
              <span className="mt-3 block text-black/42">PulseIQ translates them.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62 md:text-xl">
              Analyze revenue, payroll, overtime, refunds, marketing, software,
              inventory, fulfillment, and lead loss in one executive diagnostic.
              See where profit is leaking, what deserves attention first, and the
              potential financial impact of fixing it.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#scan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
              >
                Run My Free Diagnostic <ArrowRight size={18} />
              </a>
              <button
                onClick={loadDemo}
                className="rounded-full border border-black/15 bg-white/70 px-7 py-4 font-black shadow-sm transition hover:-translate-y-1"
              >
                See a Real Demo
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-black/45">
              <span>✓ No login required</span>
              <span>✓ Target-based analysis</span>
              <span>✓ CSV import</span>
              <span>✓ Executive report</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="rounded-[2.2rem] border border-black/10 bg-[#111] p-5 text-white shadow-2xl md:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">
                  PulseIQ Command Center
                </p>
                <h2 className="mt-1 text-2xl font-black">Executive Diagnostic</h2>
              </div>
              <div className="rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-black text-emerald-300">
                ANALYSIS READY
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Health Score" value="71/100" note="Moderate risk" dark />
              <MetricCard label="Monthly Leak" value="$10.2K" note="Modeled opportunity" dark />
              <MetricCard label="Annual Impact" value="$122K" note="If pattern persists" dark />
            </div>

            <div className="mt-4 rounded-[1.8rem] border border-white/10 bg-white/7 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                    Highest Priority
                  </p>
                  <p className="mt-2 text-2xl font-black">Overtime + Payroll</p>
                </div>
                <div className="rounded-2xl bg-red-400/15 px-4 py-3 text-right">
                  <p className="text-xs font-black text-red-200/70">POTENTIAL IMPACT</p>
                  <p className="text-xl font-black text-red-100">$6,200/mo</p>
                </div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[73%] rounded-full bg-white" />
              </div>
              <p className="mt-4 text-sm leading-6 text-white/55">
                Labor cost is growing faster than revenue. PulseIQ would next compare
                staffing hours with demand by shift, location, and workload.
              </p>
            </div>

            <div className="mt-4 rounded-[1.8rem] bg-white p-5 text-black">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                  <Brain size={17} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">
                    Executive Insight
                  </p>
                  <p className="mt-2 font-bold leading-6">
                    Fix the highest-dollar leak first. A 50% recovery of the top three
                    flagged areas would materially improve monthly operating profit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/55 px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-black uppercase tracking-[0.23em] text-black/35">
          <span>Profit Leakage</span>
          <span>Revenue Opportunity</span>
          <span>Operational Risk</span>
          <span>Executive Recommendations</span>
          <span>Scenario Modeling</span>
        </div>
      </section>

      <section id="how" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-black uppercase tracking-[0.24em] text-black/35">How it works</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                From messy numbers to a decision.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-black/55 lg:justify-self-end">
              PulseIQ does not declare that every business should spend the same amount.
              It compares actual performance with the targets or budgets you provide,
              then prioritizes the gaps by financial impact.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Add the numbers", "Enter monthly actuals and targets manually, or upload a simple CSV."],
              ["02", "Find the gaps", "PulseIQ separates expense overruns, revenue gaps, and modeled missed-lead opportunity."],
              ["03", "Act in order", "See the biggest dollar-impact areas first, along with root-cause questions and recovery scenarios."],
            ].map(([num, title, desc]) => (
              <div key={num} className="rounded-[2rem] border border-black/10 bg-white/70 p-7 shadow-sm">
                <p className="text-sm font-black text-black/30">{num}</p>
                <h3 className="mt-8 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-black/55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="scan" className="bg-[#111] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                <Target size={16} /> Free PulseIQ Diagnostic
              </div>
              <h2 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                Show PulseIQ the numbers.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
                Enter actual monthly values and your budget or target. PulseIQ flags
                the gaps without pretending one benchmark fits every industry.
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/7 p-5">
                <div className="flex items-center gap-3">
                  <Upload size={19} />
                  <div>
                    <p className="font-black">Prefer a spreadsheet?</p>
                    <p className="mt-1 text-sm text-white/45">Use our simple category / actual / target CSV format.</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <label className="cursor-pointer rounded-full bg-white px-5 py-3 text-center text-sm font-black text-black">
                    Upload CSV
                    <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsv} />
                  </label>
                  <button
                    onClick={downloadTemplate}
                    className="rounded-full border border-white/15 px-5 py-3 text-sm font-black"
                  >
                    Download Template
                  </button>
                </div>
                {uploadMessage ? <p className="mt-4 text-sm font-semibold text-emerald-300">{uploadMessage}</p> : null}
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">What PulseIQ will calculate</p>
                <div className="mt-4 space-y-3 text-sm font-semibold text-white/65">
                  <p>✓ Monthly and annual profit-improvement opportunity</p>
                  <p>✓ Operating profit and margin</p>
                  <p>✓ Ranked leak areas by dollar impact</p>
                  <p>✓ Revenue shortfall kept separate from cost leakage</p>
                  <p>✓ 25%–100% recovery scenario modeling</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.2rem] bg-white p-6 text-black shadow-2xl md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-sm font-black text-black/60">Business Name</span>
                  <input
                    value={inputs.businessName}
                    onChange={(event) => setValue("businessName", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40"
                    placeholder="BrightPath Home Services"
                  />
                </label>
                <label>
                  <span className="text-sm font-black text-black/60">Industry</span>
                  <input
                    value={inputs.industry}
                    onChange={(event) => setValue("industry", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40"
                    placeholder="Home services, retail, salon..."
                  />
                </label>
              </div>

              <div className="mt-7 rounded-[1.8rem] bg-black p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Revenue</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <NumericInput label="Actual Revenue" value={inputs.revenue} onChange={(value) => setValue("revenue", value)} prefix="$" />
                  <NumericInput label="Revenue Target" value={inputs.revenueTarget} onChange={(value) => setValue("revenueTarget", value)} prefix="$" />
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">Monthly Costs</p>
                    <h3 className="mt-1 text-2xl font-black">Actual vs. target</h3>
                  </div>
                  <p className="text-right text-xs font-semibold text-black/40">Targets can be your budget,<br />forecast, or internal goal.</p>
                </div>
                <div className="space-y-3">
                  {expenseRows.map((row) => (
                    <div key={row.label} className="grid gap-3 rounded-[1.5rem] border border-black/8 bg-[#fbf9f5] p-4 sm:grid-cols-[1.1fr_1fr_1fr] sm:items-center">
                      <p className="font-black">{row.label}</p>
                      <NumericInput label="Actual" value={Number(inputs[row.actual])} onChange={(value) => setValue(row.actual, value)} prefix="$" />
                      <NumericInput label="Target" value={Number(inputs[row.target])} onChange={(value) => setValue(row.target, value)} prefix="$" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 rounded-[1.8rem] border border-black/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">Optional Lead-Recovery Model</p>
                <p className="mt-2 text-sm leading-6 text-black/50">This estimates opportunity, not guaranteed lost revenue.</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <NumericInput label="Monthly Leads" value={inputs.monthlyLeads} onChange={(value) => setValue("monthlyLeads", value)} />
                  <NumericInput label="Missed / Unanswered" value={inputs.missedCallPct} onChange={(value) => setValue("missedCallPct", Math.min(100, value))} suffix="%" />
                  <NumericInput label="Conversion Rate" value={inputs.conversionRate} onChange={(value) => setValue("conversionRate", Math.min(100, value))} suffix="%" />
                  <NumericInput label="Avg. Customer Value" value={inputs.avgCustomerValue} onChange={(value) => setValue("avgCustomerValue", value)} prefix="$" />
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button onClick={runScan} className="flex-1 rounded-full bg-black px-6 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5">
                  Generate My PulseIQ Report
                </button>
                <button onClick={loadDemo} className="rounded-full border border-black/15 px-6 py-4 font-black">
                  Load Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasRun ? (
        <section id="results" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-black uppercase tracking-[0.24em] text-black/35">PulseIQ Executive Report</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                  {inputs.businessName || "Business"} Diagnostic
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-black/55">
                  {analysis.executiveSummary}
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="rounded-full border border-black/15 bg-white px-6 py-4 font-black shadow-sm"
              >
                Print / Save Report
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <MetricCard label="Health Score" value={`${analysis.score}/100`} note={`${analysis.risk} risk based on entered data`} />
              <MetricCard label="Monthly Opportunity" value={money(analysis.totalOpportunity)} note="Target overruns + modeled lead recovery" />
              <MetricCard label="Annualized Impact" value={money(analysis.annualOpportunity)} note="If current monthly pattern persists" />
              <MetricCard label="Operating Margin" value={`${analysis.margin.toFixed(1)}%`} note={`${money(analysis.profit)} current monthly profit`} />
              <MetricCard label="Data Completeness" value={`${analysis.completeness}%`} note="More targets improve diagnostic coverage" />
            </div>

            {analysis.revenueGap > 0 ? (
              <div className="mt-4 rounded-[1.8rem] border border-amber-300 bg-amber-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800/60">Revenue target gap</p>
                    <p className="mt-2 text-xl font-black">Current revenue is {money(analysis.revenueGap)} below the target entered.</p>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-amber-950/60">
                    PulseIQ keeps this separate from expense leakage so the same dollars are not counted twice.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
              <div className="rounded-[2rem] bg-black p-6 text-white shadow-xl md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Where the money is leaking</p>
                    <h3 className="mt-2 text-3xl font-black">Ranked by monthly impact</h3>
                  </div>
                  <Radar className="text-white/35" />
                </div>

                <div className="mt-7 space-y-4">
                  {analysis.leaks.length > 0 ? (
                    analysis.leaks.slice(0, 6).map((leak, index) => (
                      <div key={leak.name} className="rounded-[1.7rem] border border-white/10 bg-white/7 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-black text-white/35">#{index + 1}</span>
                              <h4 className="text-xl font-black">{leak.name}</h4>
                              <span className={`rounded-full px-3 py-1 text-xs font-black ${leak.severity === "Critical" ? "bg-red-400/15 text-red-200" : leak.severity === "High" ? "bg-amber-300/15 text-amber-200" : "bg-blue-300/15 text-blue-200"}`}>
                                {leak.severity}
                              </span>
                            </div>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">{leak.reason}</p>
                          </div>
                          <div className="shrink-0 text-left sm:text-right">
                            <p className="text-2xl font-black">{money(leak.amount)}</p>
                            <p className="text-xs font-bold text-white/35">{money(leak.annual)} annualized</p>
                          </div>
                        </div>
                        <div className="mt-4 rounded-2xl bg-white/8 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-white/35">What to inspect next</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-white/75">{leak.action}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.7rem] border border-white/10 bg-white/7 p-6">
                      <CheckCircle2 className="text-emerald-300" />
                      <p className="mt-4 text-xl font-black">No target-based overruns detected.</p>
                      <p className="mt-2 text-white/50">Add more actual/target categories for a deeper diagnostic.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">Scenario Model</p>
                      <h3 className="mt-2 text-3xl font-black">What if you recover {recoveryPct}%?</h3>
                    </div>
                    <Gauge className="text-black/30" />
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="100"
                    step="25"
                    value={recoveryPct}
                    onChange={(event) => setRecoveryPct(Number(event.target.value))}
                    className="mt-8 w-full accent-black"
                  />
                  <div className="mt-2 flex justify-between text-xs font-black text-black/35">
                    <span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <MetricCard label="Recovered / Month" value={money(analysis.recoverableAtScenario)} note="Scenario, not a guarantee" />
                    <MetricCard label="Projected Margin" value={`${analysis.projectedMargin.toFixed(1)}%`} note={`${money(analysis.projectedProfit)} projected profit`} />
                  </div>
                  <div className="mt-6 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analysis.recoveryChart}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                        <Tooltip formatter={(value) => money(Number(value))} />
                        <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                          {analysis.recoveryChart.map((_, index) => (
                            <Cell key={index} fill={index === 1 ? "#78716c" : "#111111"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-black/10 bg-[#ede5d9] p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                      <Brain size={19} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">Executive Brief</p>
                      <p className="mt-3 text-lg font-bold leading-8">{analysis.executiveSummary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">Cost Structure</p>
                  <h3 className="mt-2 text-3xl font-black">Actual vs. target by category</h3>
                </div>
                <p className="max-w-xl text-sm leading-6 text-black/45">
                  A gap is a signal to investigate—not proof of waste. Business context still matters.
                </p>
              </div>
              <div className="mt-6 h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysis.currentVsTarget} margin={{ left: 10, right: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                    <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => money(Number(value))} />
                    <Bar dataKey="Actual" fill="#111111" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Target" fill="#c7beb2" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7">
                <DollarSign />
                <h3 className="mt-5 text-2xl font-black">Fix dollars first</h3>
                <p className="mt-3 leading-7 text-black/55">Prioritize the largest validated financial gap before chasing dozens of tiny improvements.</p>
              </div>
              <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7">
                <Workflow />
                <h3 className="mt-5 text-2xl font-black">Trace the root cause</h3>
                <p className="mt-3 leading-7 text-black/55">Use employee, product, location, vendor, channel, and time-of-day data to explain why the gap exists.</p>
              </div>
              <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7">
                <TrendingUp />
                <h3 className="mt-5 text-2xl font-black">Measure the fix</h3>
                <p className="mt-3 leading-7 text-black/55">Track whether the change actually improves margin instead of assuming the recommendation worked.</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="services" className="bg-[#e9e1d5] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-black uppercase tracking-[0.24em] text-black/35">Go deeper</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Software finds the signal. Analysis finds the story.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-black/55">
              Start with the free diagnostic, then move into deeper data review when you need transaction-level answers.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["PulseIQ Deep Scan", "$97", "A focused review of your financial and operational data with prioritized leak findings."],
              ["Analyst Review", "$297", "A human review of the PulseIQ findings with deeper root-cause analysis and management recommendations."],
              ["Optimization Plan", "$497+", "A complete action plan connecting financial leakage to workflow, staffing, customer, and process changes."],
            ].map(([name, price, desc], index) => (
              <div key={name} className={`rounded-[2rem] border p-8 ${index === 1 ? "border-black bg-black text-white shadow-2xl" : "border-black/10 bg-white/75"}`}>
                <p className={`text-xs font-black uppercase tracking-[0.2em] ${index === 1 ? "text-white/35" : "text-black/35"}`}>{index === 1 ? "Most Valuable" : "PulseIQ Service"}</p>
                <h3 className="mt-5 text-2xl font-black">{name}</h3>
                <p className={`mt-4 leading-7 ${index === 1 ? "text-white/55" : "text-black/55"}`}>{desc}</p>
                <p className="mt-8 text-4xl font-black">{price}</p>
                <a href="#scan" className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 font-black ${index === 1 ? "bg-white text-black" : "bg-black text-white"}`}>
                  Start With My Diagnostic
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Built for decisions</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Stop asking “Where did the money go?” after the month is over.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">Use the numbers you already have to identify where the next investigation should begin.</p>
            </div>
            <a href="#scan" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black lg:justify-self-end">
              Analyze My Business <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black">PulseIQ Operations</h3>
            <p className="mt-2 text-sm text-black/50">Business intelligence that turns numbers into next actions.</p>
          </div>
          <div className="max-w-xl text-xs leading-5 text-black/40 md:text-right">
            PulseIQ provides diagnostic estimates based on the information entered. Results are not accounting, tax, legal, or investment advice and do not prove causation.
          </div>
        </div>
      </footer>
    </main>
  );
}
