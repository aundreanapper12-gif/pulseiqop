import { ArrowRight, BarChart3, CheckCircle2, Search, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

type Section = { title: string; body: string };

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  problem: string;
  signals: string[];
  sections: Section[];
  outcomeTitle: string;
  outcomeBody: string;
};

export default function SolutionLanding({ eyebrow, title, description, problem, signals, sections, outcomeTitle, outcomeBody }: Props) {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 bg-[#f4efe7]/95 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span>
            <span>PulseIQ Operations</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-black text-black/55 md:flex">
            <a href="/insights" className="hover:text-black">Insights</a>
            <a href="/pricing" className="hover:text-black">Pricing</a>
            <a href="/workspace" className="rounded-full bg-black px-5 py-3 text-white">Run The Free Scan</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="absolute left-[7%] top-16 h-72 w-72 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute right-[5%] top-36 h-80 w-80 rounded-full bg-rose-200/45 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">{eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl">{title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/60 md:text-xl">{description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-black text-white shadow-xl hover:-translate-y-0.5">Run The Free Business Scan <ArrowRight size={18} /></a>
              <a href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/75 px-7 py-4 font-black">View Analysis Options</a>
            </div>
          </div>

          <aside className="rounded-[2.2rem] border border-black/10 bg-[#111] p-7 text-white shadow-2xl md:p-9">
            <div className="flex items-center gap-3"><Search size={20} /><p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">What To Investigate</p></div>
            <p className="mt-5 text-2xl font-black leading-tight">{problem}</p>
            <div className="mt-7 space-y-3">
              {signals.map((signal) => <div key={signal} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold leading-6 text-white/75"><CheckCircle2 className="mt-0.5 shrink-0" size={17} />{signal}</div>)}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/55 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-black uppercase tracking-[0.2em] text-black/38">
          <span>Owner-Friendly</span><span>Evidence-Led</span><span>Financial Impact</span><span>Prioritized Actions</span><span>No Bank Login Required</span>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/38">How PulseIQ Approaches It</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Move From A Suspicious Number To A Better Business Question.</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {sections.map((section, index) => (
              <article key={section.title} className="rounded-[2rem] border border-black/10 bg-white/80 p-7 shadow-sm">
                <p className="text-sm font-black text-black/30">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black">{section.title}</h3>
                <p className="mt-4 leading-7 text-black/55">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] px-5 py-24 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"><BarChart3 size={20} /></div>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-white/40">What Better Analysis Looks Like</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{outcomeTitle}</h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 md:p-9">
            <p className="text-lg leading-8 text-white/62">{outcomeBody}</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-black text-white/70"><span className="rounded-full border border-white/10 px-4 py-2">Direct Variances</span><span className="rounded-full border border-white/10 px-4 py-2">Modeled Opportunities</span><span className="rounded-full border border-white/10 px-4 py-2">Data Quality Warnings</span><span className="rounded-full border border-white/10 px-4 py-2">Next-Step Priorities</span></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-black/10 bg-white/80 p-8 shadow-xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-black/45"><ShieldCheck size={17} /> Operational Profit Intelligence For Service Businesses</div>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">You Do Not Need An In-House Analyst To Ask Better Questions Of Your Numbers.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-black/55">Start with the free PulseIQ workspace. If the signal is important enough to investigate, move into a focused or full analysis with clearly stated assumptions and practical next steps.</p>
            </div>
            <a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-black text-white lg:justify-self-end">Analyze My Business <TrendingUp size={18} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
