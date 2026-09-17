import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About PulseIQ Operations",
  description: "Learn how PulseIQ Operations approaches small-business analytics, educational content, modeled opportunities, and transparent decision support.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <header className="border-b border-slate-900/10 px-5 py-4 md:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><a href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={18} /></span>PulseIQ Operations</a><a href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={15} /> Insights</a></div></header>

      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-6xl"><div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">About PulseIQ</p><h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.05em] md:text-6xl">Clearer operating data. Better business questions. More defensible decisions.</h1><p className="mt-6 text-lg leading-8 text-slate-600">PulseIQ Operations is built around a simple idea: small-business owners should be able to understand where money is moving, which operating signals deserve attention, and what to investigate next without needing an in-house analytics department.</p></div>

      <div className="mt-12 grid gap-5 md:grid-cols-3"><div className="rounded-2xl border border-slate-900/10 bg-white p-6"><BarChart3 size={21} /><h2 className="mt-4 text-xl font-semibold">Traceable analysis</h2><p className="mt-3 leading-7 text-slate-600">Direct variances are kept separate from modeled opportunities so users can see what comes from entered data and what depends on assumptions.</p></div><div className="rounded-2xl border border-slate-900/10 bg-white p-6"><ShieldCheck size={21} /><h2 className="mt-4 text-xl font-semibold">Transparent limitations</h2><p className="mt-3 leading-7 text-slate-600">PulseIQ does not promise guaranteed savings. Findings are starting points for investigation, planning, and measurement.</p></div><div className="rounded-2xl border border-slate-900/10 bg-white p-6"><CheckCircle2 size={21} /><h2 className="mt-4 text-xl font-semibold">Action over noise</h2><p className="mt-3 leading-7 text-slate-600">The goal is not to overwhelm owners with metrics. It is to identify the few signals that can support a practical next decision.</p></div></div>

      <section className="mt-12 rounded-3xl bg-white p-7 md:p-9"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Editorial standards</p><h2 className="mt-3 text-3xl font-semibold">How PulseIQ Insights is written</h2><div className="mt-5 space-y-4 leading-7 text-slate-600"><p>PulseIQ Insights publishes educational material about business expenses, labor, profitability, marketing performance, operating metrics, forecasting, and decision support.</p><p>Articles avoid presenting a single benchmark as universally correct when business model, geography, staffing, seasonality, or accounting treatment can materially change the answer. Examples and models are explained as examples or estimates rather than guaranteed outcomes.</p><p>Readers should verify decisions against their own financial records, contracts, tax and accounting requirements, and operating context. PulseIQ educational content is not a substitute for legal, tax, accounting, investment, or other regulated professional advice.</p></div></section>

      <section className="mt-10 rounded-3xl bg-slate-900 p-7 text-white md:p-9"><h2 className="text-3xl font-semibold">See how PulseIQ applies the framework.</h2><p className="mt-3 max-w-2xl leading-7 text-white/75">Read the Insights library, take the free business checkup, or start a 14-day trial to work through your own operating numbers.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="/insights" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-slate-900">Browse Insights <ArrowRight size={16} /></a><a href="/trial" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3.5 font-semibold">Start 14-Day Trial</a></div></section>
      </div></section>
    </main>
  );
}
