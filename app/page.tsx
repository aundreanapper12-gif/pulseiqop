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
  Upload,
  Wrench,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add the business numbers",
    body: "Enter monthly revenue, actual costs, your own targets, and optional operating metrics. You can also import the cost template by CSV.",
  },
  {
    number: "02",
    title: "PulseIQ ranks the leaks",
    body: "Direct cost overruns stay separate from modeled opportunities such as missed leads and rework, so one giant number does not hide the assumptions.",
  },
  {
    number: "03",
    title: "Fix the biggest signal first",
    body: "Each finding includes what to investigate, the first practical move, and the metric that should prove whether the change worked.",
  },
];

const useCases = [
  ["Labor", "Payroll is climbing faster than revenue and you need to know where to look first."],
  ["Overtime", "The same teams, shifts, or locations keep generating overtime."],
  ["Marketing", "Spend is up, but profitable customer growth is not keeping pace."],
  ["Refunds", "Returns, credits, or service recoveries are quietly eating margin."],
  ["Missed leads", "Demand exists, but unanswered calls or contacts may be leaving revenue on the table."],
  ["Rework", "Repeat visits, corrections, or do-overs are consuming labor and materials twice."],
];

const plans = [
  {
    name: "Quick Leak Check",
    price: "$149",
    body: "One expensive question, one focused dataset, and three prioritized recommendations.",
  },
  {
    name: "Profit Leak Analysis",
    price: "$399",
    body: "A broader review of up to four relevant data sources with financial-impact estimates and root-cause analysis.",
  },
  {
    name: "Monthly Pulse",
    price: "$199/mo",
    body: "Recurring KPI review, risk flags, updated priorities, and a decision-focused monthly scorecard.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f4efe7]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white shadow-lg"><Sparkles size={18} /></span>
            <span>
              <span className="block text-xl font-black leading-none tracking-tight">PulseIQ</span>
              <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.22em] text-black/35">Operations Intelligence</span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-black text-black/55 lg:flex">
            <a href="#how" className="hover:text-black">How it works</a>
            <a href="#use-cases" className="hover:text-black">What it finds</a>
            <a href="/methodology" className="hover:text-black">Methodology</a>
            <a href="/pricing" className="hover:text-black">Pricing</a>
          </div>
          <a href="/workspace" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white shadow-lg">Analyze my business <ArrowRight size={16} /></a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="absolute left-[8%] top-12 h-72 w-72 rounded-full bg-rose-200/55 blur-3xl" />
        <div className="absolute right-[7%] top-44 h-80 w-80 rounded-full bg-amber-200/55 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-black shadow-sm"><DollarSign size={16} /> Profit intelligence for growing businesses</div>
            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl xl:text-[5.35rem]">
              Stop wondering where the money went.
              <span className="mt-3 block text-black/38">Make the numbers point to it.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/60 md:text-xl">PulseIQ turns the numbers a business already has into a ranked money-leak diagnostic. See which gaps deserve attention first, what may be driving them, and what recovering part of the opportunity could mean financially.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-black text-white shadow-xl transition hover:-translate-y-1">Run the free business scan <ArrowRight size={18} /></a>
              <a href="#sample" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/70 px-7 py-4 font-black shadow-sm transition hover:-translate-y-1">See what PulseIQ returns</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-black/43">
              <span>✓ No bank login</span>
              <span>✓ No card required</span>
              <span>✓ Your targets drive the baseline</span>
              <span>✓ Report-ready output</span>
            </div>
          </div>

          <div id="sample" className="rounded-[2.25rem] border border-black/10 bg-[#111] p-5 text-white shadow-2xl md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Sample · fictional business</p><h2 className="mt-1 text-2xl font-black">BrightPath Home Services</h2></div>
              <span className="rounded-full bg-amber-300/10 px-3 py-2 text-xs font-black text-amber-200">MODERATE RISK</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">Monthly opportunity</p><p className="mt-2 text-3xl font-black">$10.2K</p><p className="mt-1 text-xs text-white/40">Illustrative only</p></div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">Operating margin</p><p className="mt-2 text-3xl font-black">9.8%</p><p className="mt-1 text-xs text-white/40">Entered-cost estimate</p></div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">Annualized</p><p className="mt-2 text-3xl font-black">$122K</p><p className="mt-1 text-xs text-white/40">If pattern persists</p></div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["1", "Overtime", "$3,200/mo", "Direct variance"],
                ["2", "Payroll", "$3,000/mo", "Direct variance"],
                ["3", "Missed leads", "$1,937/mo", "Modeled opportunity"],
              ].map(([rank, name, amount, type]) => (
                <div key={name} className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sm font-black">{rank}</span><div><p className="font-black">{name}</p><p className="mt-0.5 text-xs font-semibold text-white/35">{type}</p></div></div>
                  <p className="font-black">{amount}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.6rem] bg-white p-5 text-black">
              <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white"><Lightbulb size={17} /></span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Fix this first</p><p className="mt-2 font-bold leading-6">Pull four weeks of overtime by employee and shift. Isolate repeat patterns before changing staffing.</p></div></div>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/32">Sample numbers are fictional. PulseIQ diagnostics identify signals and planning opportunities, not guaranteed savings.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/55 px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-black uppercase tracking-[0.21em] text-black/34">
          <span>Profit leakage</span><span>Labor efficiency</span><span>Revenue capture</span><span>Rework cost</span><span>Recovery modeling</span>
        </div>
      </section>

      <section id="how" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-xs font-black uppercase tracking-[0.22em] text-black/35">How it works</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">From messy numbers to a next move.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-black/55 lg:justify-self-end">PulseIQ does not tell every business to hit the same ratio. It starts with the targets, budgets, and operating facts you enter, then makes the gaps easier to act on.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-[2rem] border border-black/10 bg-white/75 p-7 shadow-sm"><p className="text-sm font-black text-black/28">{step.number}</p><h3 className="mt-8 text-2xl font-black">{step.title}</h3><p className="mt-4 leading-7 text-black/53">{step.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="bg-[#111] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-white/35">What PulseIQ is looking for</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">The expensive stuff hiding in ordinary reports.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">A business can be busy, growing, and still leak money through timing, repeat work, weak revenue capture, or spending that drifts away from plan.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map(([title, body], index) => {
              const icons = [BriefcaseBusiness, Gauge, TrendingDown, Wrench, Target, Search];
              const Icon = icons[index];
              return <article key={title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6"><Icon size={20} className="text-white/70" /><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-white/50">{body}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><ShieldCheck size={20} /></div>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-black/35">Trust the number before you sell the fix</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">PulseIQ labels what it knows and what it is estimating.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55">A payroll overrun against an entered budget is different from a missed-lead estimate. PulseIQ keeps those categories separate and shows data-quality warnings when the inputs are incomplete.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.8rem] border border-black/10 bg-white p-6"><CheckCircle2 /><h3 className="mt-4 text-xl font-black">Direct variance</h3><p className="mt-3 leading-7 text-black/52">Actual spending above the target you entered. High-confidence signal; still requires business context before calling it waste.</p></div>
            <div className="rounded-[1.8rem] border border-black/10 bg-white p-6"><BarChart3 /><h3 className="mt-4 text-xl font-black">Modeled opportunity</h3><p className="mt-3 leading-7 text-black/52">A planning estimate built from operating assumptions such as missed contacts, conversion, value, rework volume, and direct rework cost.</p></div>
            <div className="rounded-[1.8rem] border border-black/10 bg-white p-6"><LockKeyhole /><h3 className="mt-4 text-xl font-black">Browser-private free scan</h3><p className="mt-3 leading-7 text-black/52">The free workspace stores drafts and optional snapshots in the user’s browser rather than requiring bank credentials or a server upload.</p></div>
            <div className="rounded-[1.8rem] border border-black/10 bg-white p-6"><TrendingUp /><h3 className="mt-4 text-xl font-black">Recovery scenario</h3><p className="mt-3 leading-7 text-black/52">See what 25%, 50%, 75%, or 100% recovery would mean without presenting the result as a guarantee or forecast.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e1d5] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center"><p className="text-xs font-black uppercase tracking-[0.22em] text-black/35">When the free answer is not enough</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Software finds the signal. Deeper analysis tests the cause.</h2><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-black/55">Use the free workspace first. Pay when the size of the question justifies going into the underlying schedules, transactions, calls, refunds, vendors, sales, or workflow data.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <article key={plan.name} className={`rounded-[2rem] border p-8 ${index === 1 ? "border-black bg-black text-white shadow-2xl" : "border-black/10 bg-white/75"}`}><p className={`text-xs font-black uppercase tracking-[0.18em] ${index === 1 ? "text-white/35" : "text-black/35"}`}>{index === 1 ? "Most complete" : index === 0 ? "Focused" : "Ongoing"}</p><h3 className="mt-5 text-2xl font-black">{plan.name}</h3><p className={`mt-4 leading-7 ${index === 1 ? "text-white/55" : "text-black/55"}`}>{plan.body}</p><p className="mt-8 text-4xl font-black">{plan.price}</p><a href="/request" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-black ${index === 1 ? "bg-white text-black" : "bg-black text-white"}`}>Choose this analysis <ArrowRight size={16} /></a></article>
            ))}
          </div>
          <div className="mt-8 text-center"><a href="/pricing" className="inline-flex items-center gap-2 font-black underline decoration-black/20 underline-offset-4">Compare everything included <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">The question PulseIQ is built to answer</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">“We’re making money. Why does it still feel like we’re losing it?”</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">Put the current month into the workspace and make the first investigation a financial decision instead of a guess.</p></div>
            <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black lg:justify-self-end">Find my biggest leak <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
