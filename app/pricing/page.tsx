import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start with a 14-day no-card Premium Trial, keep using the free workspace, or choose focused, comprehensive, and recurring PulseIQ analysis.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    label: "Start Here",
    name: "14-Day Premium Trial",
    price: "$0",
    cadence: "14 Days",
    description: "Experience the executive dashboard and guided decision tools before choosing a paid service.",
    features: ["No Credit Card Required", "Guided Business Onboarding", "Executive PulseIQ Dashboard", "PulseIQ Score and Ranked Priorities", "What-If Scenario Planning", "Recovery Tracking and Ask PulseIQ"],
    href: "/trial",
    cta: "Start My Free Trial",
    featured: true,
  },
  {
    label: "Always Available",
    name: "PulseIQ Workspace",
    price: "$0",
    cadence: "",
    description: "Enter your numbers, compare actuals with targets, save browser snapshots, and identify what deserves attention.",
    features: ["Actual-vs-Target Cost Scan", "Missed-Lead and Rework Models", "Ranked Findings with Source Details", "Calendar Forecasts and Stress Tests", "Saved Browser Snapshots", "Downloadable Executive PDF"],
    href: "/workspace",
    cta: "Open Free Workspace",
    featured: false,
  },
  {
    label: "Best First Paid Step",
    name: "Quick Leak Check",
    price: "$149",
    cadence: "One-Time",
    description: "A focused analysis for one high-value business question that needs a sharper answer than a monthly total can provide.",
    features: ["One Operational Question", "One Focused Dataset", "Pattern and Risk Review", "Three Prioritized Recommendations", "Concise Action Brief", "Transparent Assumptions and Limitations"],
    href: "/request?service=quick",
    cta: "Start Quick Leak Check",
    featured: false,
  },
  {
    label: "Most Comprehensive",
    name: "Profit Leak Analysis",
    price: "$399",
    cadence: "One-Time",
    description: "A deeper operational review that connects financial signals to likely root causes, business impact, and priority actions.",
    features: ["Up to Four Relevant Data Sources", "Operational Health View", "Financial-Impact Estimates", "Segmented Root-Cause Analysis", "Visual Findings Report", "30-Minute Results Review"],
    href: "/request?service=complete",
    cta: "Get Profit Leak Analysis",
    featured: false,
  },
  {
    label: "Ongoing Intelligence",
    name: "Monthly Pulse",
    price: "$199",
    cadence: "Per Month",
    description: "Recurring executive visibility for teams that want trends, risks, progress, and priorities reviewed every month.",
    features: ["Monthly KPI Review", "Trend and Risk Alerts", "Updated Action Priorities", "Monthly Executive Scorecard", "Progress Against Prior Findings", "Cancel Through Stripe at Period End"],
    href: "/request?service=monthly",
    cta: "Start Monthly Pulse",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <header className="border-b border-slate-900/10 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={16} /> Home</a>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Try it first. Pay when deeper help makes sense.</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl">Start With 14 Days of Premium PulseIQ.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Use the Premium Trial to experience the executive dashboard, ranked priorities, what-if planning, recovery tracking, and Ask PulseIQ. No card is required and the trial does not auto-charge. The free browser workspace remains available after the trial.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.name} className={`flex rounded-2xl border p-7 ${plan.featured ? "border-blue-700 bg-blue-700 text-white shadow-2xl" : "border-slate-900/10 bg-white/75 shadow-sm"}`}>
                <div className="flex w-full flex-col">
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.label}</p>
                  <h2 className="mt-4 text-2xl font-semibold">{plan.name}</h2>
                  <div className="mt-4 flex items-end gap-2"><span className="text-4xl font-semibold">{plan.price}</span>{plan.cadence ? <span className={`pb-1 text-sm font-bold ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.cadence}</span> : null}</div>
                  <p className={`mt-4 leading-7 ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.description}</p>
                  <div className="mb-8 mt-6 space-y-3">
                    {plan.features.map((feature) => <div key={feature} className="flex gap-2.5 text-sm font-semibold"><Check size={16} className="mt-0.5 shrink-0" /> <span>{feature}</span></div>)}
                  </div>
                  <a href={plan.href} className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold ${plan.featured ? "bg-white text-blue-800" : "bg-slate-900 text-white"}`}>{plan.cta} <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 leading-7 text-slate-600">The Premium Trial is browser-local and does not auto-charge. Paid services use secure Stripe checkout. After checkout, agree on the data, scope, and delivery date with PulseIQ. Read the <a href="/terms#refunds" className="font-semibold text-blue-700 underline">refund and cancellation information</a> before purchasing.</p>
          <div className="mt-10 rounded-2xl border border-slate-900/10 bg-white/70 p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Decision Intelligence, Not Inflated Promises</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-600">PulseIQ provides operational analysis and decision support—not guaranteed savings. A flagged variance or modeled opportunity identifies where deeper investigation may have financial value. Paid analysis goes further into the supporting data so recommendations are tied to actual patterns, transparent assumptions, and measurable next steps.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
