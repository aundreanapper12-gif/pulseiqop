import { ArrowRight, CheckCircle2, CreditCard, DollarSign, Home, PiggyBank, Receipt, ShieldCheck, Sparkles, TrendingDown, WalletCards } from "lucide-react";

const leaks = [
  ["Recurring Bills", "Spot subscriptions, memberships, and repeat charges that keep quietly draining your budget."],
  ["Food & Convenience", "See how groceries, takeout, delivery fees, and convenience spending are affecting the month."],
  ["Debt Payments", "Understand how much of your cash flow is tied up in minimum payments and interest-heavy balances."],
  ["Housing & Utilities", "Track increases in rent, mortgage, power, water, internet, insurance, and other household essentials."],
  ["Transportation", "See the real monthly cost of gas, car payments, insurance, maintenance, and rides."],
  ["Lifestyle Creep", "Catch small spending increases before they become your new normal."],
];

const steps = [
  ["01", "Add your monthly numbers", "Enter income, bills, debt payments, subscriptions, and spending categories—or upload a simple CSV when available."],
  ["02", "Find what is squeezing your budget", "PulseIQ Home highlights recurring costs, category growth, cash-flow pressure, and spending patterns that deserve attention."],
  ["03", "Choose the easiest win first", "Instead of telling you to cut everything, PulseIQ ranks the changes that could free up the most money with the least disruption."],
  ["04", "Track whether it actually helped", "Save your baseline, make the change, then compare the next month so you can see whether the improvement was real."],
];

export default function PulseIQHomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-900/10 bg-[#f7f4ef]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Home size={18}/></span>
            <span><span className="block text-xl font-semibold leading-none">PulseIQ Home</span><span className="mt-1 block text-xs font-semibold uppercase tracking-[.2em] text-slate-500">Personal Money Intelligence</span></span>
          </a>
          <a href="#scan" className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg">Try the Home Scan</a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="absolute left-[8%] top-16 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl"/>
        <div className="absolute right-[10%] top-36 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"/>
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm"><Sparkles size={16}/> Your money should make more sense than this.</div>
            <h1 className="mt-7 max-w-5xl text-[2.7rem] font-semibold leading-[1.03] tracking-[-.05em] md:text-6xl xl:text-[4.6rem]">Find where your money is going.<span className="mt-3 block text-slate-500">Know what to fix first.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">PulseIQ Home turns household income, bills, subscriptions, debt payments, and everyday spending into a clear picture of what is squeezing your budget—and what change could make the biggest difference first.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#scan" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 py-4 font-semibold text-white shadow-xl transition hover:-translate-y-1">Run the Home Scan <ArrowRight size={18}/></a>
              <a href="#sample" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/15 bg-white/80 px-7 py-4 font-semibold shadow-sm">See a Sample</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-500">
              <span>✓ No Bank Login</span><span>✓ No Credit Check</span><span>✓ Start With What You Know</span><span>✓ Private Household Snapshot</span>
            </div>
          </div>

          <div id="sample" className="rounded-[2.2rem] bg-slate-900 p-6 text-white shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-5">
              <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-white/60">Illustrative Household</p><h2 className="mt-2 text-2xl font-semibold">The Carter Household</h2></div>
              <span className="rounded-xl bg-amber-300/10 px-3 py-2 text-sm font-semibold text-amber-200">CASH-FLOW PRESSURE</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><p className="text-xs font-semibold uppercase tracking-[.14em] text-white/50">Monthly Income</p><p className="mt-2 text-3xl font-semibold">$5,200</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><p className="text-xs font-semibold uppercase tracking-[.14em] text-white/50">Monthly Outflow</p><p className="mt-2 text-3xl font-semibold">$5,010</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><p className="text-xs font-semibold uppercase tracking-[.14em] text-white/50">Cash Cushion</p><p className="mt-2 text-3xl font-semibold">$190</p></div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["1","Subscriptions & memberships","$214/mo"],
                ["2","Food delivery & takeout","$468/mo"],
                ["3","Auto insurance increase","+$96/mo"],
              ].map(([n,name,amt]) => <div key={name} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.05] p-4"><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold">{n}</span><p className="font-semibold">{name}</p></div><p className="font-semibold">{amt}</p></div>)}
            </div>
            <div className="mt-5 rounded-2xl bg-white p-5 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-500">Best first move</p>
              <p className="mt-2 font-semibold leading-6">Review recurring subscriptions and the three highest-frequency delivery purchases first. Estimated monthly breathing room if reduced: $180–$260.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Then move part of that savings to the highest-interest debt or emergency fund and compare next month to this baseline.</p>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/50">Sample data is fictional. PulseIQ Home provides budgeting and spending insights, not individualized financial, tax, credit, or investment advice.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-900/10 bg-white/60 px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
          <span>Bills</span><span>Subscriptions</span><span>Debt</span><span>Food</span><span>Transportation</span><span>Savings</span>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[.2em] text-slate-500">What PulseIQ Home Looks For</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">You do not need another budget telling you to stop buying coffee.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">You need to know which changes actually matter. PulseIQ Home focuses on the spending patterns creating the most pressure and helps you prioritize the easiest, highest-impact wins first.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {leaks.map(([title,body],i) => {
              const icons=[Receipt, WalletCards, CreditCard, Home, DollarSign, TrendingDown];
              const Icon=icons[i];
              return <article key={title} className="rounded-2xl border border-slate-900/10 bg-white/80 p-7 shadow-sm"><Icon size={21}/><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></article>
            })}
          </div>
        </div>
      </section>

      <section id="scan" className="bg-[#14342b] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-sm font-semibold uppercase tracking-[.2em] text-white/60">How It Works</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">See it. Fix it. Keep the win.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-white/70 lg:justify-self-end">PulseIQ Home starts with your own numbers instead of generic rules. The goal is not perfection. It is to create enough breathing room that your money stops feeling like it disappears.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n,t,b]) => <article key={n} className="rounded-2xl border border-white/10 bg-white/[.06] p-6"><p className="text-sm font-semibold text-white/50">{n}</p><h3 className="mt-8 text-xl font-semibold">{t}</h3><p className="mt-3 leading-7 text-white/70">{b}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white"><ShieldCheck size={20}/></div>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[.2em] text-slate-500">Built for Real Life</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">A household plan that does not pretend every dollar is optional.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Rent, groceries, childcare, medication, transportation, and emergencies are real. PulseIQ Home separates essential commitments from adjustable spending so recommendations stay practical instead of judgmental.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><CheckCircle2/><h3 className="mt-4 text-xl font-semibold">Essential vs. Flexible</h3><p className="mt-3 leading-7 text-slate-600">Separate must-pay costs from categories where you actually have room to make a choice.</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><PiggyBank/><h3 className="mt-4 text-xl font-semibold">Goal Redirect</h3><p className="mt-3 leading-7 text-slate-600">Turn freed-up cash into a clear next destination such as savings, debt payoff, or a planned expense.</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><CreditCard/><h3 className="mt-4 text-xl font-semibold">Debt Visibility</h3><p className="mt-3 leading-7 text-slate-600">See how minimum payments and debt obligations are affecting monthly breathing room.</p></div>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6"><WalletCards/><h3 className="mt-4 text-xl font-semibold">Month-to-Month Tracking</h3><p className="mt-3 leading-7 text-slate-600">Compare future months against your own baseline instead of chasing a one-size-fits-all budget.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#ece6dc] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] bg-slate-900 p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center">
            <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-white/60">PulseIQ Home</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Stop wondering where it all went.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Start with one month. Find the biggest pressure point. Make one change. See what happens next.</p></div>
            <a href="#sample" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-slate-900 lg:justify-self-end">See the household example <ArrowRight size={18}/></a>
          </div>
        </div>
      </section>
    </main>
  );
}
