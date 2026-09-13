import type { Metadata } from "next";
import { ArrowRight, BarChart3, BriefcaseBusiness, Gauge, Search, Sparkles, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Operations Insights",
  description: "Practical guidance on profit leaks, labor cost, overtime, business expenses, and service business profitability from PulseIQ Operations.",
  alternates: { canonical: "/insights" },
};

const guides = [
  {
    title: "Profit Leak Analysis",
    body: "Learn how to separate verified cost variances from modeled opportunities and decide which operating gap deserves a closer look.",
    href: "/profit-leak-analysis",
    icon: Search,
  },
  {
    title: "Business Expense Analysis",
    body: "See how category, vendor, and month-over-month expense movement can reveal where operating costs are drifting.",
    href: "/business-expense-analysis",
    icon: BarChart3,
  },
  {
    title: "Overtime Cost Analysis",
    body: "Move beyond the overtime total and investigate the employees, shifts, teams, or demand patterns driving repeated overages.",
    href: "/overtime-cost-analysis",
    icon: Gauge,
  },
  {
    title: "Labor Cost Analysis",
    body: "Compare payroll, paid hours, revenue, and workload before deciding whether rising labor cost is a problem or a growth signal.",
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">PulseIQ Insights</p>
            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl">Make Better Operating Decisions From The Numbers You Already Have.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/60 md:text-xl">Practical guidance for service-business owners who want to understand labor, expenses, profitability, and operational leakage without needing an in-house analytics team.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <a key={guide.href} href={guide.href} className="group rounded-[2rem] border border-black/10 bg-white/80 p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white"><Icon size={19} /></span>
                  <h2 className="mt-6 text-2xl font-black">{guide.title}</h2>
                  <p className="mt-4 leading-7 text-black/55">{guide.body}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-black">Explore The Guide <ArrowRight size={16} /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">From Reading To Action</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Use The Free Workspace To See Which Signal Is Strongest In Your Business.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">The guides explain the questions. The PulseIQ workspace helps you organize your own numbers, compare actuals with targets, rank findings, and decide what deserves a deeper look.</p>
          </div>
          <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black lg:justify-self-end">Analyze My Business <ArrowRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}
