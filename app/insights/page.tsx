import type { Metadata } from "next";
import { ArrowRight, BarChart3, BriefcaseBusiness, Gauge, Search, Sparkles, TrendingUp } from "lucide-react";
import { insightCategories, insightPosts } from "./posts";

export const metadata: Metadata = {
  title: "PulseIQ Insights | Small Business Profit, Expenses & Operations",
  description: "Practical articles on profit leaks, business expenses, payroll, overtime, marketing ROI, and small-business KPIs from PulseIQ Operations.",
  alternates: { canonical: "/insights" },
};

const guides = [
  { title: "Profit Leak Analysis", body: "Separate verified cost variances from modeled opportunities and identify which operating gap deserves attention first.", href: "/profit-leak-analysis", icon: Search },
  { title: "Business Expense Analysis", body: "Examine category, vendor, and month-over-month movement to reveal where operating costs are drifting.", href: "/business-expense-analysis", icon: BarChart3 },
  { title: "Overtime Cost Analysis", body: "Move beyond the total and isolate the employees, shifts, teams, or demand patterns behind recurring overtime pressure.", href: "/overtime-cost-analysis", icon: Gauge },
  { title: "Labor Cost Analysis", body: "Connect payroll, paid hours, revenue, and workload before deciding what rising labor cost actually means.", href: "/labor-cost-analysis", icon: BriefcaseBusiness },
  { title: "Service Business Profitability", body: "Understand why revenue growth can coexist with thin margins when labor, expenses, rework, and revenue capture move differently.", href: "/service-business-profitability", icon: TrendingUp },
];

export default function InsightsPage() {
  const featured = insightPosts.filter((post) => post.featured);
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <header className="border-b border-slate-900/10 bg-[#f3f6fb]/95 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a>
          <div className="flex items-center gap-2"><a href="/checkup" className="hidden rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm font-semibold sm:inline-flex">Free Checkup</a><a href="/trial" className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white">Start 14-Day Trial</a></div>
        </div>
      </header>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">PulseIQ Insights</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-7xl">Smarter business decisions start with better questions.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">Practical guidance for business owners who want to understand profit, expenses, labor, overtime, marketing performance, and the operating numbers behind everyday decisions.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">{insightCategories.map((category) => <span key={category} className="rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-600">{category}</span>)}</div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Featured</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Start here</h2></div></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">{featured.map((post) => <a key={post.slug} href={`/insights/${post.slug}`} className="group rounded-3xl border border-slate-900/10 bg-slate-900 p-7 text-white shadow-xl transition hover:-translate-y-1"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">{post.category}</p><h3 className="mt-4 text-2xl font-semibold leading-8">{post.title}</h3><p className="mt-4 leading-7 text-white/70">{post.description}</p><span className="mt-7 inline-flex items-center gap-2 font-semibold">Read article <ArrowRight size={16} /></span></a>)}</div>
        </div>
      </section>

      <section className="border-y border-slate-900/10 bg-white/60 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Latest Articles</p><h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">The PulseIQ library</h2></div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{insightPosts.map((post) => <article key={post.slug} className="flex rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm"><div className="flex w-full flex-col"><div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-500"><span>{post.category}</span><span>{post.readTime}</span></div><h3 className="mt-4 text-xl font-semibold leading-7">{post.title}</h3><p className="mt-3 leading-7 text-slate-600">{post.description}</p><a href={`/insights/${post.slug}`} className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-blue-700">Read article <ArrowRight size={16} /></a></div></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Deep-Dive Guides</p><h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Go deeper into the analysis.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">These evergreen guides explain the core operating questions PulseIQ is built to help business owners investigate.</p></div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{guides.map((guide) => { const Icon = guide.icon; return <a key={guide.href} href={guide.href} className="group rounded-2xl border border-slate-900/10 bg-white/80 p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white"><Icon size={19} /></span><h3 className="mt-6 text-2xl font-semibold">{guide.title}</h3><p className="mt-4 leading-7 text-slate-600">{guide.body}</p><span className="mt-7 inline-flex items-center gap-2 font-semibold">Explore guide <ArrowRight size={16} /></span></a>; })}</div>
        </div>
      </section>

      <section className="bg-[#0f172a] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">From reading to action</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">See what the numbers say about your business.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Use the free checkup for a quick starting point or begin the 14-day PulseIQ trial for the full workspace, scenarios, executive dashboard, and action tracking.</p></div><div className="flex flex-col gap-3 lg:justify-self-end"><a href="/checkup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-slate-900">Take Free Checkup <ArrowRight size={18} /></a><a href="/trial" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 font-semibold">Start 14-Day Trial</a></div></div>
      </section>
    </main>
  );
}
