import type { Metadata } from "next";
import { ArrowRight, BarChart3, BriefcaseBusiness, Gauge, Search, Sparkles, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Operations Insights",
  description: "Executive-level guidance on profit leakage, labor cost, overtime, business expenses, and service business profitability from PulseIQ Operations.",
  alternates: { canonical: "/insights" },
};

const guides = [
  {
    title: "Profit Leak Analysis",
    body: "Separate verified cost variances from modeled opportunities and identify which operating gap deserves executive attention first.",
    href: "/profit-leak-analysis",
    icon: Search,
  },
  {
    title: "Business Expense Analysis",
    body: "Examine category, vendor, and month-over-month movement to reveal where operating costs are drifting and where follow-up may create value.",
    href: "/business-expense-analysis",
    icon: BarChart3,
  },
  {
    title: "Overtime Cost Analysis",
    body: "Move beyond the total and isolate the employees, shifts, teams, or demand patterns behind recurring overtime pressure.",
    href: "/overtime-cost-analysis",
    icon: Gauge,
  },
  {
    title: "Labor Cost Analysis",
    body: "Connect payroll, paid hours, revenue, and workload before deciding whether rising labor cost reflects growth, inefficiency, or a deeper operating issue.",
    href: "/labor-cost-analysis",
    icon: BriefcaseBusiness,
  },
  {
    title: "Service Business Profitability",
    body: "Understand why revenue growth can coexist with thin margins when labor, expenses, rework, and revenue capture move in different directions.",
    href: "/service-business-profitability",
    icon: TrendingUp,
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 bg-[#f4efe7]/95 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a>
          <a href="/workspace" className="rounded-full bg-black px-5 py-3 text-sm font-black text-white">Run The Free Scan</a>
        </div>
      </header>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">PulseIQ Executive Insights</p>
            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl">Turn Operational Data Into Clearer, Faster Business Decisions.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/60 md:text-xl">Practical intelligence for service-business leaders who want sharper visibility into labor, expenses, profitability, and operational leakage—without building an in-house analytics department.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <a key={guide.href} href={guide.href} className="group rounded-[2rem] border border-black/10 bg-white/80 p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white"><Icon size={19} /></span>
                  <h2 className="mt-6 text-2xl font-black">{guide.title}</h2>
                  <p className="mt-4 leading-7 text-black/55">{guide.body}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-black">Explore The Insight <ArrowRight size={16} /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">From Insight To Action</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">See Which Financial And Operational Signal Deserves Attention First.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">The Insights library explains the questions. The PulseIQ workspace helps organize your own numbers, compare actuals with targets, rank findings, and turn uncertainty into a prioritized next move.</p>
          </div>
          <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black lg:justify-self-end">Analyze My Business <ArrowRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}
