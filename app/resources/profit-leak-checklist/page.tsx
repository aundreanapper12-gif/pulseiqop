import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import NewsletterSignup from "../../components/NewsletterSignup";
import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "Free Small Business Profit Leak Checklist",
  description: "A printable 15-point checklist to review business expenses, labor, rework, marketing, vendor costs, cash flow, and missed revenue opportunities.",
  alternates: { canonical: "/resources/profit-leak-checklist" },
};

const sections = [
  ["Labor & Scheduling", ["Compare payroll with revenue and the staffing plan for the same period.", "Break overtime down by employee, shift, location, or demand window.", "Look for rework, repeat jobs, or avoidable corrections consuming paid hours."]],
  ["Business Expenses", ["Review recurring software and subscriptions for unused seats or duplicate tools.", "Rank vendors by spend and compare current charges with prior periods or contract expectations.", "Check miscellaneous and small recurring costs that have quietly become permanent."]],
  ["Revenue Capture", ["Estimate the value of missed calls, unanswered leads, or slow follow-up using transparent assumptions.", "Review lead-to-customer conversion by source instead of judging marketing by clicks alone.", "Check refunds, cancellations, credits, and service recovery that reduce realized revenue."]],
  ["Operations & Quality", ["Track repeat visits, remakes, reopened work, and other rework by root cause.", "Review rushed shipping, emergency purchases, or expedite fees caused by planning gaps.", "Compare actual performance with targets and investigate the largest dollar variances first."]],
  ["Cash & Planning", ["Compare profit with actual cash movement, receivables, payables, debt payments, and owner draws.", "List upcoming renewals, large purchases, taxes, and other known cash obligations.", "Create a 30-day action plan for the two or three highest-value issues rather than trying to fix everything at once."]],
] as const;

export default function ProfitLeakChecklistPage() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] px-5 py-8 text-[#0f172a] md:px-8 md:py-12 print:bg-white print:p-0">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden"><a href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={16} /> PulseIQ Insights</a><PrintButton /></div>

        <section className="mt-8 rounded-3xl border border-slate-900/10 bg-white p-7 shadow-sm md:p-10 print:mt-0 print:border-0 print:p-0 print:shadow-none">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={19} /></span><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PulseIQ Operations</p><p className="font-semibold">Free Business Resource</p></div></div>
          <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">The 15-Point Small Business Profit Leak Checklist</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Use this before cutting expenses at random. The goal is to identify where money, time, and demand may be slipping through the operation—then verify the biggest signals with your own data.</p>

          <div className="mt-10 space-y-8">
            {sections.map(([title, items]) => <section key={title}><h2 className="text-2xl font-semibold">{title}</h2><div className="mt-4 space-y-3">{items.map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-900/10 bg-[#f8fafc] p-4 print:bg-white"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={18} /><p className="leading-7">{item}</p></div>)}</div></section>)}
          </div>

          <div className="mt-10 rounded-2xl bg-blue-50 p-6"><h2 className="text-2xl font-semibold">What to do after the checklist</h2><p className="mt-3 leading-7 text-slate-700">Circle the two or three items with the clearest financial impact. Establish a baseline, assign a next action, and compare the next period before calling the change a verified saving.</p></div>
        </section>

        <div className="mt-8 print:hidden"><NewsletterSignup /></div>
        <div className="mt-8 rounded-3xl bg-slate-900 p-7 text-white md:p-9 print:hidden"><h2 className="text-3xl font-semibold">Want PulseIQ to organize the numbers with you?</h2><p className="mt-3 max-w-2xl leading-7 text-white/75">Take the free business checkup or start the 14-day trial to compare actuals with targets, rank findings, test scenarios, and track what changes next.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="/checkup" data-conversion="checkup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-slate-900">Free Business Checkup <ArrowRight size={16} /></a><a href="/trial" data-conversion="trial" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3.5 font-semibold">Start 14-Day Trial</a></div></div>
      </div>
    </main>
  );
}
