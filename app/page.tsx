import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  DollarSign,
  Gauge,
  Lightbulb,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wrench,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Start with the numbers you have",
    body: "Enter monthly revenue and costs, list individual expenses, or import a CSV. PulseIQ organizes the operating data you already have and compares performance against your own targets.",
  },
  {
    number: "02",
    title: "See what deserves attention",
    body: "PulseIQ separates direct cost variances from modeled opportunities such as missed leads and rework, so every finding is clear, traceable, and easier to evaluate.",
  },
  {
    number: "03",
    title: "Choose your next move",
    body: "Each finding is translated into a practical next step. Track the next period against your baseline and document the evidence behind any verified improvement.",
  },
];

const useCases = [
  ["Labor Efficiency", "Understand when payroll is rising faster than revenue and where to investigate first."],
  ["Overtime Exposure", "Identify the teams, shifts, or operating windows repeatedly generating overtime."],
  ["Marketing Efficiency", "See whether increased spend is translating into profitable customer growth."],
  ["Refund and Recovery Cost", "Surface returns, credits, service recovery, and other costs quietly reducing margin."],
  ["Missed Revenue Opportunity", "Estimate the financial impact of unanswered calls, missed contacts, and unconverted demand."],
  ["Rework and Repeat Cost", "Measure the labor and material impact of repeat visits, corrections, and preventable do-overs."],
];

const plans = [
  {
    name: "Quick Leak Check",
    price: "$149",
    body: "One high-value operational question, one focused dataset, and three prioritized recommendations.",
    href: "/request?service=quick",
    cta: "Start Quick Leak Check",
  },
  {
    name: "Profit Leak Analysis",
    price: "$399",
    body: "A comprehensive review of up to four relevant data sources with financial-impact estimates and root-cause analysis.",
    href: "/request?service=complete",
    cta: "Get My Profit Leak Analysis",
  },
  {
    name: "Monthly Pulse",
    price: "$199/mo",
    body: "Ongoing KPI review, risk visibility, updated priorities, and an executive-ready monthly scorecard.",
    href: "/request?service=monthly",
    cta: "Start Monthly Pulse",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <nav className="sticky top-0 z-50 border-b border-slate-900/10 bg-[#f3f6fb]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg"><Sparkles size={18} /></span>
            <span>
              <span className="block text-xl font-semibold leading-none tracking-tight">PulseIQ</span>
              <span className="mt-1 block text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Operations</span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#how" className="hover:text-slate-900">How It Works</a>
            <a href="#use-cases" className="hover:text-slate-900">What PulseIQ Finds</a>
            <a href="/methodology" className="hover:text-slate-900">Methodology</a>
            <a href="/pricing" className="hover:text-slate-900">Pricing</a>
          </div>
          <a href="/workspace" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg">Free business scan <ArrowRight size={16} /></a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="absolute left-[8%] top-12 h-72 w-72 rounded-xl bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[7%] top-44 h-80 w-80 rounded-xl bg-cyan-200/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/75 px-4 py-2 text-sm font-semibold shadow-sm"><DollarSign size={16} /> Clear answers for service-business owners</div>
            <h1 className="mt-7 max-w-5xl text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl xl:text-[4.5rem]">
              Know where your money goes.
              <span className="mt-3 block text-slate-600">Know what to fix next.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">See how expenses, payroll, missed leads, and repeat work affect your bottom line. PulseIQ turns your business numbers into a clear breakdown and practical next steps—no in-house analyst needed.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-4 font-semibold text-white shadow-xl transition hover:-translate-y-1">Run the Free Business Scan <ArrowRight size={18} /></a>
              <a href="#sample" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/15 bg-white/70 px-7 py-4 font-semibold shadow-sm transition hover:-translate-y-1">View a Sample Analysis</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-600">
              <span>✓ No Bank Login</span>
              <span>✓ No Card Required</span>
              <span>✓ Compare with your own targets</span>
              <span>✓ Clear, printable reports</span>
            </div>
          </div>

          <div id="sample" className="rounded-[2.25rem] border border-slate-900/10 bg-[#0f172a] p-5 text-white shadow-2xl md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Illustrative Sample · Fictional Business</p><h2 className="mt-1 text-2xl font-semibold">BrightPath Home Services</h2></div>
              <span className="rounded-xl bg-amber-300/10 px-3 py-2 text-sm font-semibold text-amber-200">MODERATE RISK</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Monthly Opportunity</p><p className="mt-2 text-3xl font-semibold">$10.2K</p><p className="mt-1 text-sm text-white/80">Illustrative Estimate</p></div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Operating Margin</p><p className="mt-2 text-3xl font-semibold">9.8%</p><p className="mt-1 text-sm text-white/80">Entered-Cost Estimate</p></div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Annualized Opportunity</p><p className="mt-2 text-3xl font-semibold">$122K</p><p className="mt-1 text-sm text-white/80">If the Pattern Persists</p></div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["1", "Overtime", "$3,200/mo", "Direct Variance"],
                ["2", "Payroll", "$3,000/mo", "Direct Variance"],
                ["3", "Missed Leads", "$1,937/mo", "Modeled Opportunity"],
              ].map(([rank, name, amount, type]) => (
                <div key={name} className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">{rank}</span><div><p className="font-semibold">{name}</p><p className="mt-0.5 text-sm font-semibold text-white/80">{type}</p></div></div>
                  <p className="font-semibold">{amount}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-white p-5 text-slate-900">
              <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white"><Lightbulb size={17} /></span><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">Priority Action</p><p className="mt-2 font-bold leading-6">Review four weeks of overtime by employee and shift. Isolate recurring patterns before changing staffing levels.</p></div></div>
            </div>
            <p className="mt-4 text-sm leading-5 text-white/80">Sample numbers are fictional. PulseIQ identifies operating signals and planning opportunities; results are not guaranteed savings.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-900/10 bg-white/55 px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold uppercase tracking-[0.21em] text-slate-600">
          <span>Profit Leakage</span><span>Labor Efficiency</span><span>Revenue Capture</span><span>Rework Cost</span><span>Recovery Modeling</span>
        </div>
      </section>

      <section id="how" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">How It Works</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Your numbers. Clear answers. A next step.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">PulseIQ does not force every business into the same benchmark. It starts with the targets, budgets, and operating facts you provide, then translates the gaps into clear priorities.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-slate-900/10 bg-white/75 p-7 shadow-sm"><p className="text-sm font-semibold text-slate-600">{step.number}</p><h3 className="mt-8 text-2xl font-semibold">{step.title}</h3><p className="mt-4 leading-7 text-slate-600">{step.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="bg-[#0f172a] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">What PulseIQ Evaluates</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Find the costs hiding in everyday work.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">A business can be growing and still lose margin through labor timing, repeat work, weak revenue capture, or spending that quietly moves away from plan. PulseIQ makes those signals visible.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map(([title, body], index) => {
              const icons = [BriefcaseBusiness, Gauge, TrendingDown, Wrench, Target, Search];
              const Icon = icons[index];
              return <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"><Icon size={20} className="text-white/80" /><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-white/80">{body}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white"><ShieldCheck size={20} /></div>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Transparent by Design</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Understand the numbers behind every finding.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">A payroll overrun against an entered budget is not the same as a modeled missed-lead opportunity. PulseIQ keeps those categories separate and shows assumptions, limitations, and data-quality warnings so decisions are made with context.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><CheckCircle2 /><h3 className="mt-4 text-xl font-semibold">Direct Variance</h3><p className="mt-3 leading-7 text-slate-600">Actual spending above a target you entered. A high-confidence signal that still deserves operational context before being labeled waste.</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><BarChart3 /><h3 className="mt-4 text-xl font-semibold">Modeled Opportunity</h3><p className="mt-3 leading-7 text-slate-600">A planning estimate based on operating assumptions such as missed contacts, conversion, value, rework volume, and direct rework cost.</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><LockKeyhole /><h3 className="mt-4 text-xl font-semibold">Browser-Private Free Scan</h3><p className="mt-3 leading-7 text-slate-600">The free workspace stores drafts and optional snapshots in the user’s browser rather than requiring bank credentials or a server upload.</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><TrendingUp /><h3 className="mt-4 text-xl font-semibold">Recovery Scenario</h3><p className="mt-3 leading-7 text-slate-600">Model what partial or full recovery could mean without presenting the result as a guarantee or forecast.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#e8eef7] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">When the Free Insight Is Not Enough</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Need a closer look? Choose your analysis.</h2><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Use the free workspace to identify where to look. Choose a paid analysis when the decision justifies a deeper review of schedules, transactions, calls, refunds, vendors, sales, or workflow data.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <article key={plan.name} className={`flex flex-col rounded-2xl border p-8 ${index === 1 ? "border-slate-900 bg-slate-900 text-white shadow-2xl" : "border-slate-900/10 bg-white/75"}`}><p className={`text-sm font-semibold uppercase tracking-[0.18em] ${index === 1 ? "text-white/80" : "text-slate-600"}`}>{index === 1 ? "Most Comprehensive" : index === 0 ? "Focused Analysis" : "Ongoing Intelligence"}</p><h3 className="mt-5 text-2xl font-semibold">{plan.name}</h3><p className={`mt-4 leading-7 ${index === 1 ? "text-white/80" : "text-slate-600"}`}>{plan.body}</p><p className="mt-auto pt-8 text-4xl font-semibold">{plan.price}</p><a href={plan.href} className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold ${index === 1 ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`}>{plan.cta} <ArrowRight size={16} /></a></article>
            ))}
          </div>
          <div className="mt-8 text-center"><a href="/pricing" className="inline-flex items-center gap-2 font-semibold underline decoration-black/20 underline-offset-4">Compare Plans and Deliverables <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] bg-slate-900 p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-center">
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Built for the Question Behind the Numbers</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">“Revenue Is Growing. Why Does the Business Still Feel Tight?”</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">Put the current month into the workspace and turn the first investigation into a financial decision—not a guess.</p></div>
            <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-slate-900 lg:justify-self-end">Run my free business scan <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
