import { ArrowRight, Building2, CheckCircle2, FileSearch, Landmark, ShieldCheck, Target, TrendingUp } from "lucide-react";

const departments = [
  { name: "Public Safety", budget: 6858716, actual: 7228795, variance: 370079, status: "Over budget" },
  { name: "Judicial", budget: 1090213, actual: 1110395, variance: 20182, status: "Over budget" },
  { name: "General Government", budget: 1880570, actual: 1679910, variance: -200660, status: "Under budget" },
  { name: "Public Works", budget: 2145453, actual: 2011028, variance: -134425, status: "Under budget" },
  { name: "Culture & Recreation", budget: 854262, actual: 836955, variance: -17307, status: "Under budget" },
  { name: "Housing & Development", budget: 254925, actual: 240184, variance: -14741, status: "Under budget" },
  { name: "Health & Welfare", budget: 671314, actual: 643860, variance: -27454, status: "Under budget" },
];

const money = (n:number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function HeardCountyDemo() {
  const totalBudget = 13755453;
  const totalActual = 13751127;
  const revenueBudget = 12111750;
  const revenueActual = 15139004;

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <nav className="border-b border-slate-900/10 bg-white/80 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="font-semibold tracking-tight">PulseIQ Operations</a>
          <a href="/workspace" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Run a Business Scan</a>
        </div>
      </nav>

      <section className="px-5 pb-16 pt-16 md:px-8 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm"><Landmark size={16}/> Local Government Demo</div>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Heard County Operations Intelligence Demo</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">An independent PulseIQ demonstration using publicly available Heard County audited financial data. The purpose is not to label spending as waste. It is to show how budget variances can be turned into clear questions, priorities, and follow-up actions for county leadership.</p>
            </div>
            <div className="rounded-2xl border border-amber-300/60 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <strong>Important:</strong> Heard County has not endorsed, commissioned, or reviewed this demonstration. Figures below are drawn from the County's FY2023 audited financial statements and should be interpreted in context.
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-500">General Fund Revenue</p><p className="mt-3 text-3xl font-semibold">{money(revenueActual)}</p><p className="mt-2 text-sm text-slate-600">{money(revenueActual-revenueBudget)} above budget</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-500">General Fund Spending</p><p className="mt-3 text-3xl font-semibold">{money(totalActual)}</p><p className="mt-2 text-sm text-slate-600">{money(totalBudget-totalActual)} below total budget</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-500">Public Safety Variance</p><p className="mt-3 text-3xl font-semibold">+{money(370079)}</p><p className="mt-2 text-sm text-slate-600">5.4% above budget</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-500">Judicial Variance</p><p className="mt-3 text-3xl font-semibold">+{money(20182)}</p><p className="mt-2 text-sm text-slate-600">1.9% above budget</p></div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-white/60">PulseIQ Priority View</p><h2 className="mt-2 text-3xl font-semibold">Where should leadership look first?</h2></div>
              <span className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">FY2023 audited data</span>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              {departments.map((d, i) => (
                <div key={d.name} className={"grid gap-3 border-white/10 bg-white/[.04] p-4 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr] md:items-center " + (i ? "border-t" : "")}>
                  <div><p className="font-semibold">{d.name}</p><p className="mt-1 text-sm text-white/60">{d.status}</p></div>
                  <div><p className="text-xs uppercase tracking-[.12em] text-white/50">Budget</p><p className="mt-1 font-semibold">{money(d.budget)}</p></div>
                  <div><p className="text-xs uppercase tracking-[.12em] text-white/50">Actual</p><p className="mt-1 font-semibold">{money(d.actual)}</p></div>
                  <div><p className="text-xs uppercase tracking-[.12em] text-white/50">Variance</p><p className={"mt-1 font-semibold " + (d.variance > 0 ? "text-amber-200" : "text-emerald-200")}>{d.variance > 0 ? "+" : ""}{money(d.variance)}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-900/10 bg-white p-7 shadow-sm"><Target/><p className="mt-5 text-sm font-semibold uppercase tracking-[.14em] text-slate-500">Priority 1</p><h3 className="mt-2 text-2xl font-semibold">Public safety spending</h3><p className="mt-4 leading-7 text-slate-600">The audited schedule shows public safety expenditures were $370,079 above the final General Fund budget. PulseIQ would next break this into payroll, overtime, equipment, contracts, fuel, and other drivers before any conclusion is made.</p></article>
            <article className="rounded-2xl border border-slate-900/10 bg-white p-7 shadow-sm"><FileSearch/><p className="mt-5 text-sm font-semibold uppercase tracking-[.14em] text-slate-500">Priority 2</p><h3 className="mt-2 text-2xl font-semibold">Recurring vendor & contract review</h3><p className="mt-4 leading-7 text-slate-600">The public audit does not provide transaction-level vendor detail. A county pilot could ingest a sanitized expenditure export to identify repeat charges, renewals, duplicate patterns, and cost growth that deserve review.</p></article>
            <article className="rounded-2xl border border-slate-900/10 bg-white p-7 shadow-sm"><TrendingUp/><p className="mt-5 text-sm font-semibold uppercase tracking-[.14em] text-slate-500">Priority 3</p><h3 className="mt-2 text-2xl font-semibold">Explain the variance, not just flag it</h3><p className="mt-4 leading-7 text-slate-600">A variance is not automatically waste. PulseIQ's role would be to rank material changes, show the evidence behind them, and help leadership document whether the cause was operational, one-time, mandated, or preventable.</p></article>
          </div>
        </div>
      </section>

      <section className="bg-[#e7edf6] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Proposed Heard County Pilot</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Start with one dataset. Prove the value before spending money.</h2><p className="mt-5 text-lg leading-8 text-slate-600">The lowest-risk pilot would use one non-sensitive export, such as departmental expenditures or vendor payments, and produce a short executive report for Finance and county leadership.</p></div>
            <div className="grid gap-4">
              {[
                ["1. Secure data intake", "Use a sanitized CSV export. No bank credentials and no access to the county's accounting system."],
                ["2. Variance & recurring-cost scan", "Identify material changes, recurring expenses, unusual growth, and categories that warrant human review."],
                ["3. Prioritized findings", "Separate direct budget variances from modeled opportunities and document the evidence behind each finding."],
                ["4. Action & follow-up", "Recommend what to investigate next and create a baseline so the county can verify whether an operational change helped."],
              ].map(([t,b]) => <div key={t} className="rounded-2xl border border-slate-900/10 bg-white p-5"><div className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0" size={19}/><div><h3 className="font-semibold">{t}</h3><p className="mt-2 leading-7 text-slate-600">{b}</p></div></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-700 p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-center">
            <div><div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[.18em] text-white/70"><Building2 size={17}/> County Pilot Proposal</div><h2 className="mt-4 text-4xl font-semibold">A 30-day proof-of-value, not a countywide software commitment.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">Recommended first conversation: Heard County Finance. The goal is a small demonstration using data the county is comfortable sharing, followed by a concise findings report and leadership review.</p></div>
            <a href="/request?service=quick" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-blue-800 lg:justify-self-end">Request a Pilot <ArrowRight size={18}/></a>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl items-start gap-3 text-sm leading-6 text-slate-500"><ShieldCheck className="mt-1 shrink-0" size={17}/><p>Source: Heard County, Georgia Financial Report for the year ended June 30, 2023. This page is an independent analytical demonstration by PulseIQ Operations and is not an official Heard County report.</p></div>
      </section>
    </main>
  );
}
