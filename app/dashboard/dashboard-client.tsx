"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, CheckCircle2, CircleDollarSign, Copy, Gauge, Lightbulb, MessageSquareText, RotateCcw, Share2, Sparkles, Target, TrendingUp } from "lucide-react";
import { analyzeBusiness, defaultInputs, money } from "../workspace/model";

type TrialState = { startedAt: string; endsAt: string; businessName?: string; industry?: string; concern?: string };
type RecoveryAction = { baselineActual?: number; followupActual?: number | null; categoryName?: string; plannedFix?: string; followupPeriod?: string };

const TRIAL_KEY = "pulseiq:trial:v1";
const DRAFT_KEY = "pulseiq:draft:v1";
const RECOVERY_KEY = "pulseiq:recovery-actions:v1";

const industryGuidance: Record<string, string[]> = {
  salon: ["Track appointment utilization and cancellations", "Watch product cost as a share of service revenue", "Compare labor hours with booked demand"],
  agency: ["Track billable utilization by team", "Compare contractor spend with client margin", "Watch rework and scope creep"],
  retail: ["Review inventory and return costs", "Compare labor with traffic and revenue", "Watch slow-moving categories"],
  restaurant: ["Watch labor and food-cost variance", "Track waste and comps", "Compare staffing with daypart demand"],
  construction: ["Compare labor and material overruns by job", "Track rework and change-order leakage", "Review subcontractor variance"],
  home: ["Review overtime and repeat visits", "Track missed calls and unconverted demand", "Compare materials and travel cost by job"],
};

function getIndustryTips(industry: string) {
  const normalized = industry.toLowerCase();
  const match = Object.keys(industryGuidance).find((key) => normalized.includes(key));
  return match ? industryGuidance[match] : ["Compare actual spending with the targets you set", "Track the largest recurring variance first", "Measure the next period after each operational change"];
}

export default function DashboardClient() {
  const [hydrated, setHydrated] = useState(false);
  const [trial, setTrial] = useState<TrialState | null>(null);
  const [inputs, setInputs] = useState(defaultInputs);
  const [actions, setActions] = useState<RecoveryAction[]>([]);
  const [revenueChange, setRevenueChange] = useState(10);
  const [costChange, setCostChange] = useState(-5);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    try {
      const rawTrial = window.localStorage.getItem(TRIAL_KEY);
      const rawDraft = window.localStorage.getItem(DRAFT_KEY);
      const rawActions = window.localStorage.getItem(RECOVERY_KEY);
      if (rawTrial) setTrial(JSON.parse(rawTrial));
      if (rawDraft) setInputs({ ...defaultInputs, ...JSON.parse(rawDraft) });
      if (rawActions) setActions(JSON.parse(rawActions));
    } catch {
      // Browser-local data is optional; the dashboard still renders safely.
    } finally {
      setHydrated(true);
    }
  }, []);

  const analysis = useMemo(() => analyzeBusiness(inputs, 50), [inputs]);
  const score = Number(analysis.score || 0);
  const topFindings = analysis.leaks.slice(0, 3);
  const recovered = useMemo(() => actions.reduce((sum, action) => {
    const baseline = Number(action.baselineActual || 0);
    const followup = Number(action.followupActual || 0);
    return sum + (baseline > 0 && action.followupActual != null ? Math.max(0, baseline - followup) : 0);
  }, 0), [actions]);

  const scenario = useMemo(() => {
    const revenue = Number(inputs.revenue || 0);
    const costs = Number(analysis.totalExpenses || 0);
    const nextRevenue = revenue * (1 + revenueChange / 100);
    const nextCosts = costs * (1 + costChange / 100);
    const currentProfit = revenue - costs;
    const projectedProfit = nextRevenue - nextCosts;
    return { currentProfit, projectedProfit, change: projectedProfit - currentProfit, margin: nextRevenue > 0 ? (projectedProfit / nextRevenue) * 100 : 0 };
  }, [analysis.totalExpenses, costChange, inputs.revenue, revenueChange]);

  const daysLeft = trial ? Math.max(0, Math.ceil((new Date(trial.endsAt).getTime() - Date.now()) / 86_400_000)) : 0;
  const tips = getIndustryTips(inputs.industry || trial?.industry || "");

  const askPulseIQ = () => {
    const q = question.trim().toLowerCase();
    if (!q) return;
    const top = topFindings[0];
    if (!inputs.revenue && !analysis.totalExpenses) {
      setAnswer("Add revenue and expense data in the workspace first. Once PulseIQ has your numbers, I can point to the strongest signal in your current analysis.");
      return;
    }
    if (q.includes("first") || q.includes("priority") || q.includes("fix")) {
      setAnswer(top ? `Start with ${top.name}. It is currently the highest-ranked finding at about ${money(top.amount)} per month. The recommended first move is: ${top.firstMove}` : "Your current data does not show a ranked leak yet. Add targets or operating metrics so PulseIQ can compare actual performance with plan.");
    } else if (q.includes("payroll") || q.includes("labor") || q.includes("overtime")) {
      const labor = analysis.leaks.find((item) => /payroll|labor|overtime/i.test(item.name));
      setAnswer(labor ? `${labor.name} is showing about ${money(labor.amount)} per month of opportunity in the current model. ${labor.firstMove}` : "Labor is not currently one of your ranked findings. Review payroll and overtime actuals versus targets in the workspace before changing staffing.");
    } else if (q.includes("profit") || q.includes("margin")) {
      setAnswer(`Based on the current entries, estimated operating profit is ${money(analysis.operatingProfit)} and estimated operating margin is ${analysis.operatingMargin.toFixed(1)}%. Use the scenario panel to test revenue and cost changes before making a decision.`);
    } else if (q.includes("expense") || q.includes("spend") || q.includes("cost")) {
      setAnswer(top ? `The strongest current cost signal is ${top.name} at approximately ${money(top.amount)} per month. Treat that as a place to investigate, not guaranteed savings.` : `Current included operating costs are approximately ${money(analysis.totalExpenses)}. Add targets to identify which categories are actually above plan.`);
    } else {
      setAnswer(top ? `The clearest current signal is ${top.name} at about ${money(top.amount)} per month. ${top.firstMove} You can also ask me what to fix first, about labor, profit, margin, or expenses.` : "Your workspace needs a little more data before PulseIQ can give a specific answer. Add revenue, costs, and targets, then return here.");
    }
  };

  const copyReferral = async () => {
    const base = typeof window !== "undefined" ? window.location.origin : "https://www.pulseiqoperations.online";
    const code = (inputs.businessName || "pulseiq").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 14) || "pulseiq";
    const url = `${base}/trial?ref=${code}`;
    try { await navigator.clipboard.writeText(url); setCopyStatus("Referral link copied."); } catch { setCopyStatus(url); }
  };

  if (!hydrated) return <main className="min-h-screen bg-[#f3f6fb] p-8 text-slate-600">Loading your PulseIQ dashboard…</main>;

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <header className="border-b border-slate-900/10 bg-white/80 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={18} /></span><span><span className="block text-lg leading-none">PulseIQ</span><span className="mt-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Executive Dashboard</span></span></a>
          <div className="flex flex-wrap gap-2"><a href="/workspace" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">Open workspace</a><a href="/pricing" className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white">View plans</a></div>
        </div>
      </header>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{trial ? (daysLeft > 0 ? `${daysLeft} days left in Premium Trial` : "Premium trial complete") : "Free workspace"}</p><h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">{inputs.businessName || trial?.businessName || "Your business"}, at a glance.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">See the signal, decide what to fix, test the financial effect, and track whether the change actually worked.</p></div><div className="rounded-2xl border border-slate-200 bg-white px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Biggest concern</p><p className="mt-1 font-semibold">{trial?.concern || "Improve operating performance"}</p></div></div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-900 p-6 text-white"><Gauge size={20} /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">PulseIQ Score</p><p className="mt-2 text-4xl font-semibold">{score || "—"}{score ? "/100" : ""}</p><p className="mt-2 text-sm text-white/70">Current operating health signal</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6"><CircleDollarSign size={20} /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Monthly Opportunity</p><p className="mt-2 text-4xl font-semibold">{money(analysis.totalOpportunity)}</p><p className="mt-2 text-sm text-slate-600">Modeled and direct findings combined</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6"><TrendingUp size={20} /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Operating Margin</p><p className="mt-2 text-4xl font-semibold">{analysis.operatingMargin.toFixed(1)}%</p><p className="mt-2 text-sm text-slate-600">Based on current entered figures</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><CheckCircle2 size={20} className="text-emerald-700" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">Recovered Profit</p><p className="mt-2 text-4xl font-semibold">{money(recovered)}</p><p className="mt-2 text-sm text-emerald-900/70">Measured reduction across tracked actions</p></div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8"><div className="flex items-center gap-3"><Target size={20} /><h2 className="text-2xl font-semibold">Top priorities</h2></div><div className="mt-6 space-y-4">{topFindings.length ? topFindings.map((finding, index) => <article key={finding.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-semibold text-slate-500">#{index + 1} · {finding.severity}</p><h3 className="mt-1 text-xl font-semibold">{finding.name}</h3></div><p className="text-2xl font-semibold">{money(finding.amount)}<span className="text-sm text-slate-500">/mo</span></p></div><p className="mt-4 text-sm leading-6 text-slate-600">{finding.firstMove}</p></article>) : <div className="rounded-2xl bg-slate-50 p-6 text-slate-600">Add actuals, targets, and operating metrics in the workspace to generate ranked findings.</div>}</div><a href="/workspace#results" className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700">Review full analysis <ArrowRight size={16} /></a></section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8"><div className="flex items-center gap-3"><Lightbulb size={20} /><h2 className="text-2xl font-semibold">Industry focus</h2></div><p className="mt-3 text-sm leading-6 text-slate-600">Tailored prompts for {inputs.industry || trial?.industry || "your business model"}. These are investigation prompts, not external benchmarks.</p><div className="mt-6 space-y-3">{tips.map((tip) => <div key={tip} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold"><CheckCircle2 size={17} className="shrink-0 text-teal-700" />{tip}</div>)}</div></section>
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-3"><BarChart3 size={20} /><h2 className="text-2xl font-semibold">What-if scenario</h2></div><p className="mt-3 text-sm leading-6 text-slate-600">Test a simple revenue-and-cost scenario using your current totals. This is planning math, not a forecast guarantee.</p></div><button onClick={() => { setRevenueChange(10); setCostChange(-5); }} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><RotateCcw size={15} /> Reset</button></div><div className="mt-6 grid gap-5 md:grid-cols-2"><label><span className="text-sm font-semibold">Revenue change: {revenueChange}%</span><input type="range" min="-30" max="50" value={revenueChange} onChange={(e) => setRevenueChange(Number(e.target.value))} className="mt-3 w-full" /></label><label><span className="text-sm font-semibold">Cost change: {costChange}%</span><input type="range" min="-30" max="30" value={costChange} onChange={(e) => setCostChange(Number(e.target.value))} className="mt-3 w-full" /></label></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Projected Profit</p><p className="mt-2 text-2xl font-semibold">{money(scenario.projectedProfit)}</p></div><div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Profit Change</p><p className="mt-2 text-2xl font-semibold">{scenario.change >= 0 ? "+" : ""}{money(scenario.change)}</p></div><div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Projected Margin</p><p className="mt-2 text-2xl font-semibold">{scenario.margin.toFixed(1)}%</p></div></div></section>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-8"><div className="flex items-center gap-3"><MessageSquareText size={20} /><h2 className="text-2xl font-semibold">Ask PulseIQ</h2></div><p className="mt-3 text-sm leading-6 text-white/70">Ask about your current workspace numbers. Answers are generated from the analysis already in your browser.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") askPulseIQ(); }} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-semibold text-white outline-none placeholder:text-white/50" placeholder="What should I fix first?" /><button onClick={askPulseIQ} className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900">Ask</button></div>{answer ? <div className="mt-5 rounded-2xl bg-white/10 p-5 text-sm leading-7 text-white/90">{answer}</div> : null}<div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white/70">{["What should I fix first?", "How is my margin?", "What about overtime?", "Where am I overspending?"].map((sample) => <button key={sample} onClick={() => { setQuestion(sample); setTimeout(askPulseIQ, 0); }} className="rounded-full border border-white/15 px-3 py-2">{sample}</button>)}</div></section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8"><div className="flex items-center gap-3"><Share2 size={20} /><h2 className="text-2xl font-semibold">Refer a business</h2></div><p className="mt-3 text-sm leading-6 text-slate-600">Share PulseIQ with another owner. The referral link is ready for tracking once referral rewards are connected to the billing backend.</p><button onClick={copyReferral} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 font-semibold text-white"><Copy size={16} /> Copy referral link</button>{copyStatus ? <p className="mt-3 break-all text-xs leading-5 text-slate-500">{copyStatus}</p> : null}</section>
          </div>

          <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Your next move</p><h2 className="mt-2 text-2xl font-semibold">Turn the biggest finding into a 30-day recovery plan.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Open the workspace, start tracking the priority action, record a later period, and let PulseIQ compare the result against your baseline.</p></div><a href="/workspace#recovery-tracker" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 font-semibold text-white">Track an action <ArrowRight size={16} /></a></div></section>
        </div>
      </section>
    </main>
  );
}
