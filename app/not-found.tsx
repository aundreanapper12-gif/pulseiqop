import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-[#f3f6fb] px-5 py-20 text-[#0f172a] md:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-[2.5rem] border border-slate-900/10 bg-white/75 p-8 shadow-xl md:p-14">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={20} /></div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-slate-900/35">404 · Wrong turn</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-tight md:text-6xl">This page is not part of the current PulseIQ map.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-900/55">The business diagnostic is still here. Head back to the main analysis or start a service request.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-4 font-semibold text-white"><ArrowLeft size={17} /> Back to PulseIQ</a>
          <a href="/request" className="rounded-xl border border-slate-900/15 px-6 py-4 font-semibold hover:bg-blue-700 hover:text-white">Request an analysis</a>
        </div>
      </div>
    </main>
  );
}
