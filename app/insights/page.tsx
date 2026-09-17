import type { Metadata } from "next";
import { ArrowRight, BarChart3, BriefcaseBusiness, Gauge, Search, Sparkles, TrendingUp } from "lucide-react";
import NewsletterSignup from "../components/NewsletterSignup";
import InsightsClient from "./insights-client";
import { insightCategories, insightPosts } from "./library";

export const metadata: Metadata = {
  title: "PulseIQ Insights | Small Business Profit & Operations Blog",
  description: "Practical guides on profit leaks, business expenses, payroll, overtime, marketing ROI, KPIs, and AI for small business operations.",
  alternates: { canonical: "/insights" },
};

const guides = [
  { title: "Profit Leak Analysis", body: "Separate verified cost variances from modeled opportunities and identify which operating gap deserves executive attention first.", href: "/profit-leak-analysis", icon: Search },
  { title: "Business Expense Analysis", body: "Examine category, vendor, and month-over-month movement to reveal where operating costs are drifting and where follow-up may create value.", href: "/business-expense-analysis", icon: BarChart3 },
  { title: "Overtime Cost Analysis", body: "Move beyond the total and isolate the employees, shifts, teams, or demand patterns behind recurring overtime pressure.", href: "/overtime-cost-analysis", icon: Gauge },
  { title: "Labor Cost Analysis", body: "Connect payroll, paid hours, revenue, and workload before deciding whether rising labor cost reflects growth, inefficiency, or a deeper operating issue.", href: "/labor-cost-analysis", icon: BriefcaseBusiness },
  { title: "Service Business Profitability", body: "Understand why revenue growth can coexist with thin margins when labor, expenses, rework, and revenue capture move in different directions.", href: "/service-business-profitability", icon: TrendingUp },
];

export default function InsightsPage() {
  const featured = insightPosts.filter((post) => post.featured).slice(0, 3);
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <header className="border-b border-slate-900/10 bg-[#f3f6fb]/95 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a>
          <div className="flex items-center gap-2"><a href="/about" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 sm:inline-flex">About</a><a href="/trial" className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white">Start 14-Day Trial</a></div>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div className="max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">PulseIQ Insights</p><h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-6xl">Smarter Business Decisions Start With Better Questions.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">Practical guidance for owners who want clearer visibility into profit, expenses, payroll, overtime, marketing, KPIs, and the operating habits quietly shaping the bottom line.</p></div>
            <NewsletterSignup compact />
          </div>

          {featured.length ? <div className="mt-12 grid gap-5 md:grid-cols-3">{featured.map((post) => <a key={post.slug} href={`/insights/${post.slug}`} data-insight-link className="rounded-2xl border border-slate-900/10 bg-slate-900 p-6 text-white shadow-xl"><p className="text-sm font-semibold text-white/60">Featured · {post.category}</p><h2 className="mt-3 text-2xl font-semibold leading-tight">{post.title}</h2><p className="mt-4 leading-7 text-white/70">{post.description}</p><span className="mt-6 inline-flex items-center gap-2 font-semibold">Read article <ArrowRight size={16} /></span></a>)}</div> : null}

          <InsightsClient posts={insightPosts} categories={insightCategories} />
        </div>
      </section>

      <section className="border-y border-slate-900/10 bg-white/55 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Deep-dive guides</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Go deeper on the core PulseIQ analysis areas.</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{guides.map((guide) => { const Icon = guide.icon; return <a key={guide.href} href={guide.href} className="group rounded-2xl border border-slate-900/10 bg-white p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white"><Icon size={19} /></span><h3 className="mt-6 text-2xl font-semibold">{guide.title}</h3><p className="mt-4 leading-7 text-slate-600">{guide.body}</p><span className="mt-7 inline-flex items-center gap-2 font-semibold">Explore guide <ArrowRight size={16} /></span></a>; })}</div></div>
      </section>

      <section className="bg-[#0f172a] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Free resource</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Check 15 places profit can quietly leak out of a business.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Use the printable PulseIQ Profit Leak Checklist before you start cutting expenses at random.</p></div><a href="/resources/profit-leak-checklist" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-slate-900 lg:justify-self-end">Get the Free Checklist <ArrowRight size={18} /></a></div>
      </section>
    </main>
  );
}
