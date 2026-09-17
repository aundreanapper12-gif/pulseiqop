"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { defaultInputs } from "../workspace/model";

const TRIAL_KEY = "pulseiq:trial:v1";
const DRAFT_KEY = "pulseiq:draft:v1";

const concerns = [
  "Find where I am overspending",
  "Improve profit margins",
  "Reduce overtime and labor cost",
  "Understand my expenses",
  "Improve marketing efficiency",
  "Reduce missed revenue",
];

export default function TrialClient() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [employees, setEmployees] = useState(0);
  const [concern, setConcern] = useState(concerns[0]);
  const [existing, setExisting] = useState(false);

  useEffect(() => {
    try { setExisting(Boolean(window.localStorage.getItem(TRIAL_KEY))); } catch {}
  }, []);

  const startTrial = (event: FormEvent) => {
    event.preventDefault();
    const started = new Date();
    const ends = new Date(started.getTime() + 14 * 86_400_000);
    const trial = { startedAt: started.toISOString(), endsAt: ends.toISOString(), businessName, industry, concern };
    try {
      window.localStorage.setItem(TRIAL_KEY, JSON.stringify(trial));
      const saved = window.localStorage.getItem(DRAFT_KEY);
      const draft = saved ? { ...defaultInputs, ...JSON.parse(saved) } : { ...defaultInputs };
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, businessName: businessName || draft.businessName, industry: industry || draft.industry, employees: employees || draft.employees }));
    } catch {}
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] px-5 py-12 text-[#0f172a] md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <section>
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800"><Sparkles size={16} /> 14-Day Premium Trial</div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">See what PulseIQ can uncover before you pay.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Tell PulseIQ what matters most, then use the executive dashboard, business diagnostics, scenario planning, and action tracking for 14 days. No credit card required.</p>
          <div className="mt-8 space-y-4 text-sm font-semibold text-slate-700">
            {["Guided setup around your biggest concern", "Executive PulseIQ Score and top priorities", "What-if scenario planning", "Recovery and improvement tracking", "Browser-local privacy — no bank login required"].map((item) => <div key={item} className="flex gap-3"><CheckCircle2 size={18} className="shrink-0 text-emerald-700" /> {item}</div>)}
          </div>
          <div className="mt-8 flex gap-3 rounded-2xl border border-slate-900/10 bg-white p-5"><ShieldCheck size={20} className="shrink-0 text-teal-700" /><p className="text-sm leading-6 text-slate-600">Trial and workspace data currently stay in this browser. PulseIQ does not claim cloud sync until a secure account backend is connected.</p></div>
        </section>

        <form onSubmit={startTrial} className="rounded-3xl border border-slate-900/10 bg-white p-6 shadow-xl md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Personalize your trial</p>
          <h2 className="mt-2 text-3xl font-semibold">What should PulseIQ help you fix?</h2>
          <div className="mt-7 space-y-5">
            <label className="block"><span className="text-sm font-semibold">Business name</span><input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-blue-600" placeholder="Your business" /></label>
            <label className="block"><span className="text-sm font-semibold">Industry</span><input value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-blue-600" placeholder="Home services, salon, agency, retail..." /></label>
            <label className="block"><span className="text-sm font-semibold">Employees</span><input type="number" min="0" value={employees || ""} onChange={(e) => setEmployees(Math.max(0, Number(e.target.value) || 0))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-blue-600" placeholder="0" /></label>
            <label className="block"><span className="text-sm font-semibold">Biggest concern</span><select value={concern} onChange={(e) => setConcern(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-blue-600">{concerns.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 font-semibold text-white shadow-lg">{existing ? "Continue my PulseIQ trial" : "Start my 14-day free trial"} <ArrowRight size={18} /></button>
          <p className="mt-3 text-center text-xs leading-5 text-slate-500">No card required. Your trial does not auto-charge.</p>
        </form>
      </div>
    </main>
  );
}
