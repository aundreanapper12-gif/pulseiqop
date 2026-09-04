"use client";

import { useMemo, useState } from "react";
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
  other: number;
  otherTarget: number;
  monthlyLeads: number;
  missedCallPct: number;
  conversionRate: number;
  avgCustomerValue: number;
};

type Leak = {
  name: string;
  amount: number;
  reason: string;
  action: string;
  type: "expense" | "opportunity";
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
  other: 4400,
  otherTarget: 4200,
  monthlyLeads: 410,
  missedCallPct: 13,
  conversionRate: 28,
  avgCustomerValue: 390,
};

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const percent = (value: number) => `${Math.round(value)}%`;

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
      <span className="text-sm font-black text-black/55">{label}</span>
      {hint ? <span className="ml-2 text-xs text-black/35">{hint}</span> : null}
      <div className="mt-2 flex items-center rounded-2xl border border-black/10 bg-[#f7f2ea] px-4 focus-within:border-black/30">
        {prefix ? <span className="font-bold text-black/40">{prefix}</span> : null}
        <input
          type="number"
          min="0"
          step="any"
          value={value || ""}
          onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
          className="w-full bg-transparent px-2 py-3 outline-none"
          placeholder="0"
        />
        {suffix ? <span className="font-bold text-black/40">{suffix}</span> : null}
      </div>
    </label>
  );
}

export default function Home() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [hasRun, setHasRun] = useState(false);

  const analysis = useMemo(() => {
    const expensePairs = [
      ["Payroll", inputs.payroll, inputs.payrollTarget, "Labor cost is running above the target you entered.", "Compare staffing hours with sales volume, workload, and revenue by shift or location."],
      ["Overtime", inputs.overtime, inputs.overtimeTarget, "Overtime is above your monthly target.", "Break overtime down by employee, shift, day, and demand level to find avoidable coverage gaps."],
      ["Marketing", inputs.marketing, inputs.marketingTarget, "Marketing spend is above target.", "Compare spend, leads, conversion rate, and customer value by channel before increasing budget."],
      ["Refunds / returns", inputs.refunds, inputs.refundsTarget, "Refund costs are above target.", "Rank refunds by product, service, reason, employee, location, or fulfillment method to isolate the root cause."],
      ["Software", inputs.software, inputs.softwareTarget, "Software and subscription costs are above target.", "Audit licenses, duplicate tools, inactive users, and overlapping subscriptions."],
      ["Shipping / fulfillment", inputs.shipping, inputs.shippingTarget, "Shipping or fulfillment costs are above target.", "Compare carriers, rush fees, zones, order size, and packaging cost to find the expensive pattern."],
      ["Other operating costs", inputs.other, inputs.otherTarget, "Other operating costs are above target.", "Break this category into vendors and transaction types; large catch-all categories often hide recurring waste."],
    ] as const;

    const leaks: Leak[] = expensePairs
      .map(([name, actual, target, reason, action]) => ({
        name,
        amount: target > 0 ? Math.max(actual - target, 0) : 0,
        reason,
        action,
        type: "expense" as const,
      }))
      .filter((item) => item.amount > 0);

    const missedLeadOpportunity =
      inputs.monthlyLeads *
      (inputs.missedCallPct / 100) *
      (inputs.conversionRate / 100) *
      inputs.avgCustomerValue;

    if (missedLeadOpportunity > 0) {
      leaks.push({
        name: "Missed lead opportunity",
        amount: missedLeadOpportunity,
        reason: `${percent(inputs.missedCallPct)} of entered lead volume is missed, creating a modeled revenue opportunity based on your conversion rate and average customer value.`,
        action: "Review call coverage, response time, lead ownership, callback speed, and after-hours routing. Track recovered leads separately so the estimate can be validated.",
        type: "opportunity",
      });
    }

    leaks.sort((a, b) => b.amount - a.amount);

    const expenseLeak = leaks
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);
    const opportunityLeak = leaks
      .filter((item) => item.type === "opportunity")
      .reduce((sum, item) => sum + item.amount, 0);
    const totalPotential = expenseLeak + opportunityLeak;
    const revenueGap =
      inputs.revenueTarget > 0 ? Math.max(inputs.revenueTarget - inputs.revenue, 0) : 0;

    const enteredExpenses =
      inputs.payroll +
      inputs.overtime +
      inputs.marketing +
      inputs.refunds +
      inputs.software +
      inputs.shipping +
      inputs.other;
    const enteredProfit = inputs.revenue - enteredExpenses;
    const margin = inputs.revenue > 0 ? (enteredProfit / inputs.revenue) * 100 : 0;
    const leakRate = inputs.revenue > 0 ? (totalPotential / inputs.revenue) * 100 : 0;
    const score = Math.max(
      0,
      Math.min(100, Math.round(100 - Math.min(leakRate * 3.2, 55) - Math.min(inputs.missedCallPct * 0.9, 20)))
    );

    const chartData = leaks.slice(0, 6).map((item) => ({
      name: item.name,
      value: Math.round(item.amount),
    }));

    return {
      leaks,
      expenseLeak,
      opportunityLeak,
      totalPotential,
      annualPotential: totalPotential * 12,
      revenueGap,
      enteredExpenses,
      enteredProfit,
      margin,
      score,
      chartData,
    };
  }, [inputs]);

  const setValue = (key: keyof Inputs, value: string | number) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const runScan = () => {
    setHasRun(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const loadDemo = () => {
    setInputs(demoInputs);
    setHasRun(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#111111]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f2ea]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-black tracking-tight">PulseIQ Operations</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-black/70 md:flex">
            <a href="#features">What it finds</a>
            <a href="#scan">Free scan</a>
            <a href="#services">Services</a>
          </div>
          <a href="#scan" className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105">
            Find My Leaks
          </a>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden px-6 py-24">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-bold shadow-sm">
              <Zap size={16} /> Profit + Operations Intelligence
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Your business is losing money somewhere. <span className="text-black/45">PulseIQ helps you find where.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/65">
              Compare actual performance with your own targets, quantify suspected profit leaks, and get plain-English next steps for what to investigate first.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#scan" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-bold text-white shadow-xl transition hover:scale-105">
                Run My Free Scan <ArrowRight size={18} />
              </a>
              <button onClick={loadDemo} className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 font-bold text-black shadow-sm transition hover:scale-105">
                See a Real Demo
              </button>
            </div>
            <p className="mt-5 text-sm text-black/45">
              No industry benchmark guessing. PulseIQ starts with the targets and operating assumptions you provide.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }} className="rounded-[2rem] border border-black/10 bg-white/80 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black/45">PulseIQ Command Center</p>
                <h3 className="text-2xl font-black">Profit Leak Snapshot</h3>
              </div>
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">LIVE LOGIC</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-black/10 bg-[#faf7f1] p-4">
                <p className="text-xs font-bold uppercase text-black/45">Health Score</p>
                <p className="mt-2 text-2xl font-black">{hasRun ? `${analysis.score}/100` : "--"}</p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-[#faf7f1] p-4">
                <p className="text-xs font-bold uppercase text-black/45">Potential Leak</p>
                <p className="mt-2 text-2xl font-black">{hasRun ? money(analysis.totalPotential) : "--"}</p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-[#faf7f1] p-4">
                <p className="text-xs font-bold uppercase text-black/45">Annualized</p>
                <p className="mt-2 text-2xl font-black">{hasRun ? money(analysis.annualPotential) : "--"}</p>
              </div>
            </div>
            <div className="mt-5 rounded-3xl bg-black p-6 text-white">
              <p className="text-sm font-bold text-white/50">PulseIQ Insight</p>
              <p className="mt-2 text-xl font-semibold leading-8">
                {hasRun && analysis.leaks[0]
                  ? `${analysis.leaks[0].name} is currently the largest flagged area at about ${money(analysis.leaks[0].amount)} per month.`
                  : "Run the scan to replace demo marketing claims with calculations based on your business inputs."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/55 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 text-sm font-black uppercase tracking-[0.18em] text-black/35">
          <span>Profit Leakage</span><span>Labor Efficiency</span><span>Revenue Risk</span><span>Workflow Intelligence</span><span>Action Plans</span>
        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 font-black uppercase tracking-[0.25em] text-black/40">What PulseIQ Finds</p>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Not another dashboard. A money-leak diagnostic.</h2>
            <p className="mt-6 text-lg leading-8 text-black/60">PulseIQ turns business inputs into a ranked list of suspected leaks, estimated financial impact, and the next question management should ask.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [DollarSign, "Cost Leak Detection", "Flag payroll, overtime, refunds, software, marketing, fulfillment, and other expenses running above your target."],
              [TrendingUp, "Revenue Opportunity", "Estimate revenue opportunity tied to missed leads using your lead volume, conversion rate, and customer value."],
              [Brain, "Root-Cause Prompts", "Get specific follow-up questions that tell you what data to break down next instead of stopping at a chart."],
              [Radar, "Priority Ranking", "Rank issues by estimated monthly and annual financial impact so you know what deserves attention first."],
            ].map(([Icon, title, desc]) => {
              const IconComponent = Icon as typeof DollarSign;
              return (
                <motion.div key={String(title)} whileHover={{ y: -7 }} className="rounded-[2rem] border border-black/10 bg-white/75 p-7 shadow-sm">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><IconComponent size={22} /></div>
                  <h3 className="text-xl font-black">{String(title)}</h3>
                  <p className="mt-4 leading-7 text-black/60">{String(desc)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="scan" className="bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><Target size={16} /> Free Revenue Leak Scan</div>
              <h2 className="text-4xl font-black md:text-6xl">Put your numbers in. Get your biggest leaks out.</h2>
              <p className="mt-6 text-lg leading-8 text-white/60">Use one typical month. For expense targets, enter your budget or the level you believe the business should be operating at. The scan compares actual vs. target and keeps revenue shortfall separate from expense leakage to avoid double-counting.</p>
              <div className="mt-8 space-y-4 text-sm text-white/70">
                <p className="flex gap-3"><ShieldCheck className="shrink-0 text-emerald-400" size={20} /> This version performs calculations in your browser. Nothing in this form is sent to an accounting system.</p>
                <p className="flex gap-3"><Gauge className="shrink-0 text-emerald-400" size={20} /> Results are estimates for investigation, not accounting, tax, or investment advice.</p>
                <button onClick={loadDemo} className="mt-3 rounded-full border border-white/20 px-5 py-3 font-bold text-white hover:bg-white/10">Load example business</button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 text-black md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-black/55">Business name</span>
                  <input value={inputs.businessName} onChange={(e) => setValue("businessName", e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f2ea] px-4 py-3 outline-none" placeholder="Your business" />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-black/55">Industry</span>
                  <input value={inputs.industry} onChange={(e) => setValue("industry", e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f7f2ea] px-4 py-3 outline-none" placeholder="Home services, retail, salon..." />
                </label>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-black">Revenue</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <NumericInput label="Actual monthly revenue" value={inputs.revenue} onChange={(v) => setValue("revenue", v)} prefix="$" />
                  <NumericInput label="Monthly revenue target" value={inputs.revenueTarget} onChange={(v) => setValue("revenueTarget", v)} prefix="$" />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-black">Monthly costs: actual vs. target</h3>
                <p className="mt-2 text-sm text-black/45">A target can be your budget, prior normal level, or management goal.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <NumericInput label="Payroll — actual" value={inputs.payroll} onChange={(v) => setValue("payroll", v)} prefix="$" />
                  <NumericInput label="Payroll — target" value={inputs.payrollTarget} onChange={(v) => setValue("payrollTarget", v)} prefix="$" />
                  <NumericInput label="Overtime — actual" value={inputs.overtime} onChange={(v) => setValue("overtime", v)} prefix="$" />
                  <NumericInput label="Overtime — target" value={inputs.overtimeTarget} onChange={(v) => setValue("overtimeTarget", v)} prefix="$" />
                  <NumericInput label="Marketing — actual" value={inputs.marketing} onChange={(v) => setValue("marketing", v)} prefix="$" />
                  <NumericInput label="Marketing — target" value={inputs.marketingTarget} onChange={(v) => setValue("marketingTarget", v)} prefix="$" />
                  <NumericInput label="Refunds / returns — actual" value={inputs.refunds} onChange={(v) => setValue("refunds", v)} prefix="$" />
                  <NumericInput label="Refunds / returns — target" value={inputs.refundsTarget} onChange={(v) => setValue("refundsTarget", v)} prefix="$" />
                  <NumericInput label="Software — actual" value={inputs.software} onChange={(v) => setValue("software", v)} prefix="$" />
                  <NumericInput label="Software — target" value={inputs.softwareTarget} onChange={(v) => setValue("softwareTarget", v)} prefix="$" />
                  <NumericInput label="Shipping / fulfillment — actual" value={inputs.shipping} onChange={(v) => setValue("shipping", v)} prefix="$" />
                  <NumericInput label="Shipping / fulfillment — target" value={inputs.shippingTarget} onChange={(v) => setValue("shippingTarget", v)} prefix="$" />
                  <NumericInput label="Other operating costs — actual" value={inputs.other} onChange={(v) => setValue("other", v)} prefix="$" />
                  <NumericInput label="Other operating costs — target" value={inputs.otherTarget} onChange={(v) => setValue("otherTarget", v)} prefix="$" />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-black">Optional missed-lead estimate</h3>
                <p className="mt-2 text-sm text-black/45">This models potential revenue opportunity. It is not treated as a guaranteed loss.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <NumericInput label="Monthly leads" value={inputs.monthlyLeads} onChange={(v) => setValue("monthlyLeads", v)} />
                  <NumericInput label="Missed / unanswered leads" value={inputs.missedCallPct} onChange={(v) => setValue("missedCallPct", Math.min(v, 100))} suffix="%" />
                  <NumericInput label="Lead-to-customer conversion" value={inputs.conversionRate} onChange={(v) => setValue("conversionRate", Math.min(v, 100))} suffix="%" />
                  <NumericInput label="Average customer value" value={inputs.avgCustomerValue} onChange={(v) => setValue("avgCustomerValue", v)} prefix="$" />
                </div>
              </div>

              <button onClick={runScan} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 font-black text-white shadow-xl transition hover:scale-[1.01]">
                Analyze My Business <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {hasRun ? (
        <section id="results" className="scroll-mt-24 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-black uppercase tracking-[0.25em] text-black/40">PulseIQ Scan Results</p>
                <h2 className="mt-3 text-4xl font-black md:text-6xl">{inputs.businessName || "Your business"}: here&apos;s where to look first.</h2>
              </div>
              <button onClick={() => window.print()} className="rounded-full border border-black/15 bg-white px-6 py-3 font-bold shadow-sm">Print / Save Report</button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {[
                ["Health score", `${analysis.score}/100`],
                ["Monthly potential", money(analysis.totalPotential)],
                ["Annualized potential", money(analysis.annualPotential)],
                ["Revenue target gap", money(analysis.revenueGap)],
                ["Entered profit", money(analysis.enteredProfit)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-black/10 bg-white/75 p-5 shadow-sm">
                  <p className="text-xs font-black uppercase text-black/40">{label}</p>
                  <p className="mt-2 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[2rem] bg-black p-7 text-white">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Executive Snapshot</p>
                <h3 className="mt-3 text-3xl font-black">{analysis.leaks.length ? `${analysis.leaks.length} area${analysis.leaks.length === 1 ? "" : "s"} flagged` : "No target overruns flagged"}</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-white/60">Expense overruns</span><strong>{money(analysis.expenseLeak)}</strong></div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-white/60">Modeled missed-lead opportunity</span><strong>{money(analysis.opportunityLeak)}</strong></div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-white/60">Entered operating margin</span><strong>{percent(analysis.margin)}</strong></div>
                </div>
                <p className="mt-6 text-sm leading-6 text-white/45">Potential recovery is the sum of expense amounts above the targets you entered plus modeled missed-lead opportunity. Revenue target gap is displayed separately and is not added to the recovery estimate.</p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3"><BarChart3 size={22} /><h3 className="text-2xl font-black">Largest flagged areas</h3></div>
                {analysis.chartData.length ? (
                  <div className="mt-5 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analysis.chartData} layout="vertical" margin={{ left: 12, right: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis type="number" tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} />
                        <YAxis dataKey="name" type="category" width={115} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(value) => money(Number(value))} />
                        <Bar dataKey="value" fill="#111" radius={[0, 10, 10, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="mt-6 rounded-3xl bg-emerald-50 p-6 text-emerald-900">Nothing is above the targets you entered. Add more categories or upload-level analysis would be the next step for deeper diagnosis.</div>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {analysis.leaks.map((leak, index) => (
                <div key={leak.name} className="grid gap-5 rounded-[2rem] border border-black/10 bg-white/80 p-7 shadow-sm md:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black font-black text-white">{index + 1}</span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.15em] text-black/35">{leak.type === "expense" ? "Cost leak" : "Revenue opportunity"}</p>
                        <h3 className="text-2xl font-black">{leak.name}</h3>
                      </div>
                    </div>
                    <p className="mt-5 text-4xl font-black">{money(leak.amount)}<span className="text-base font-bold text-black/40"> / month</span></p>
                    <p className="mt-2 font-bold text-black/45">{money(leak.amount * 12)} annualized</p>
                  </div>
                  <div>
                    <p className="font-bold leading-7 text-black/70">{leak.reason}</p>
                    <div className="mt-5 rounded-3xl bg-[#f7f2ea] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.15em] text-black/40">What to investigate next</p>
                      <p className="mt-2 leading-7 text-black/70">{leak.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2.5rem] bg-[#efe3d4] p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="font-black uppercase tracking-[0.2em] text-black/40">What this scan does not know yet</p>
                  <h3 className="mt-3 text-3xl font-black md:text-4xl">The next level is transaction-level root-cause analysis.</h3>
                  <p className="mt-5 leading-8 text-black/60">Totals can flag where to look. A deeper PulseIQ analysis would use CSV or exported transaction data to identify which products, customers, locations, shifts, employees, vendors, or marketing channels are driving the variance.</p>
                </div>
                <div className="rounded-[2rem] bg-white/70 p-6">
                  <p className="flex items-center gap-3 font-black"><Upload size={20} /> Coming next: file-based Deep Scan</p>
                  <p className="mt-3 leading-7 text-black/60">CSV / Excel-style imports, column mapping, product and customer profitability, labor patterns, refunds, channel performance, and a downloadable executive findings report.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-black uppercase tracking-[0.25em] text-black/40">Services</p>
            <h2 className="text-4xl font-black md:text-6xl">Software finds the signal. Deeper analysis finds the cause.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Revenue Leak Audit", "$97", "Review the scan and business data to identify the most important loss areas and next analytical steps."],
              ["KPI Dashboard Build", "$297", "A custom management dashboard focused on the metrics that actually drive profit and operational performance."],
              ["Operations Intelligence Plan", "$497+", "A deeper root-cause review connecting financial performance with workflow, staffing, customer, or sales data."],
            ].map(([name, price, desc]) => (
              <div key={name} className="rounded-[2rem] border border-black/10 bg-white/75 p-8 shadow-sm">
                <h3 className="text-2xl font-black">{name}</h3>
                <p className="mt-4 leading-7 text-black/60">{desc}</p>
                <p className="mt-8 text-4xl font-black">{price}</p>
                <a href="#scan" className="mt-8 block w-full rounded-full bg-black px-6 py-4 text-center font-bold text-white">Start with the free scan</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-black">PulseIQ Operations</h3>
            <p className="mt-2 text-black/55">Business intelligence that shows you where to look, what it may be costing, and what to investigate next.</p>
          </div>
          <div className="flex gap-5 text-sm font-bold text-black/55"><a href="#features">What it finds</a><a href="#scan">Scan</a><a href="#services">Services</a></div>
        </div>
      </footer>
    </main>
  );
}
