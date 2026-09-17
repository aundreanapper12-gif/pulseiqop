"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardCheck, Sparkles } from "lucide-react";

const questions = [
  ["Do you compare monthly expenses against a target or budget?", "budget"],
  ["Do you know which cost category increased the most last month?", "costs"],
  ["Do you review overtime or labor cost regularly?", "labor"],
  ["Do you track missed leads, unanswered calls, or lost demand?", "leads"],
  ["Do you measure rework, repeat visits, refunds, or corrections?", "rework"],
  ["Can you explain your current operating margin without rebuilding a spreadsheet?", "margin"],
  ["Do you track whether cost-cutting actions actually worked the next month?", "followup"],
  ["Do you have one place that ranks your top operational priorities?", "priority"],
] as const;

export default function CheckupClient() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const complete = Object.keys(answers).length === questions.length;
  const yesCount = Object.values(answers).filter(Boolean).length;
  const score = Math.round((yesCount / questions.length) * 100);
  const result = useMemo(() => score >= 75 ? "Strong visibility" : score >= 50 ? "Some blind spots" : "Major visibility gaps", [score]);

  return (
    <main className="min-h-screen bg-[#f3f6fb] px-5 py-12 text-slate-900 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800"><ClipboardCheck size={16} /> Free 2-Minute Business Checkup</div><h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">How much of your operation can you actually see?</h1><p className="mt-5 text-lg leading-8 text-slate-600">Answer eight quick questions. This is a readiness check—not a financial diagnosis—and it will show where better operating visibility could help.</p></div>
        <div className="mt-10 space-y-4">{questions.map(([question, key], index) => <section key={key} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Question {index + 1}</p><p className="mt-2 font-semibold">{question}</p></div><div className="flex gap-2"><button onClick={() => setAnswers((current) => ({ ...current, [key]: true }))} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${answers[key] === true ? "bg-emerald-700 text-white" : "border border-slate-200 bg-white"}`}>Yes</button><button onClick={() => setAnswers((current) => ({ ...current, [key]: false }))} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${answers[key] === false ? "bg-slate-900 text-white" : "border border-slate-200 bg-white"}`}>Not consistently</button></div></div></section>)}</div>
        {complete ? <section className="mt-8 rounded-3xl bg-slate-900 p-7 text-white md:p-9"><div className="flex items-center gap-3"><Sparkles size={20} /><p className="font-semibold">Your visibility check</p></div><p className="mt-5 text-5xl font-semibold">{score}/100</p><h2 className="mt-3 text-2xl font-semibold">{result}</h2><p className="mt-4 max-w-3xl leading-7 text-white/75">You answered yes to {yesCount} of 8 operating-visibility questions. PulseIQ can help organize the numbers you already have, rank the strongest signals, and give you a repeatable way to track what changes next.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="/trial" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-semibold text-slate-900">Start 14-Day Trial <ArrowRight size={16} /></a><a href="/workspace" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3.5 font-semibold">Use Free Workspace</a></div></section> : <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-600"><CheckCircle2 size={17} /> Answer all eight questions to see your checkup result.</div>}
      </div>
    </main>
  );
}
