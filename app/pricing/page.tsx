import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Operational profit intelligence for service businesses without an in-house analyst. Start free, then choose focused, full, or recurring analysis.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    label: "Free Workspace",
    name: "PulseIQ Snapshot",
    price: "$0",
    cadence: "",
    description: "See your expenses, compare costs with your targets, and choose what to investigate first.",
    features: ["Actual-vs-Target Cost Scan", "Missed-Lead and Rework Models", "Ranked Profit-Leak Findings", "Recovery Scenarios", "Saved Browser Snapshots", "Printable Executive Report"],
    href: "/workspace",
    cta: "Analyze My Business",
    featured: false,
  },
  {
    label: "Best First Paid Step",
    name: "Quick Leak Check",
    price: "$149",
    cadence: "One-Time",
    description: "A focused analysis for one high-value business question that needs a sharper answer than a monthly total can provide.",
    features: ["One Operational Question", "One Focused Dataset", "Pattern and Risk Review", "Three Prioritized Recommendations", "Concise Action Brief", "Transparent Assumptions and Limitations"],
    href: "https://buy.stripe.com/6oU6oJacagNbb344EQ7ok03",
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
    href: "https://buy.stripe.com/cNi5kF3NMcwVc787R27ok04",
    cta: "Get Profit Leak Analysis",
    featured: true,
  },
  {
    label: "Ongoing Intelligence",
    name: "Monthly Pulse",
    price: "$199",
    cadence: "Per Month",
    description: "Recurring executive visibility for teams that want trends, risks, progress, and priorities reviewed every month.",
    features: ["Monthly KPI Review", "Trend and Risk Alerts", "Updated Action Priorities", "Monthly Executive Scorecard", "Progress Against Prior Findings", "Cancel Through Stripe at Period End"],
    href: "https://buy.stripe.com/dRm7sNckifJ78UWdbm7ok05",
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Clear pricing. Practical answers.</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl">Start Free. Go Deeper When the Decision Matters.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">PulseIQ turns operational data into clear financial priorities. Use the free workspace to identify the signal, then choose a focused or comprehensive analysis when you need to understand what is driving the number, what to change, and how to measure the result.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.name} className={`flex rounded-2xl border p-7 ${plan.featured ? "border-slate-900 bg-slate-900 text-white shadow-2xl" : "border-slate-900/10 bg-white/75 shadow-sm"}`}>
                <div className="flex w-full flex-col">
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.label}</p>
                  <h2 className="mt-4 text-2xl font-semibold">{plan.name}</h2>
                  <div className="mt-4 flex items-end gap-2"><span className="text-4xl font-semibold">{plan.price}</span>{plan.cadence ? <span className={`pb-1 text-sm font-bold ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.cadence}</span> : null}</div>
                  <p className={`mt-4 leading-7 ${plan.featured ? "text-white/80" : "text-slate-600"}`}>{plan.description}</p>
                  <div className="mb-8 mt-6 space-y-3">
                    {plan.features.map((feature) => <div key={feature} className="flex gap-2.5 text-sm font-semibold"><Check size={16} className="mt-0.5 shrink-0" /> <span>{feature}</span></div>)}
                  </div>
                  <a href={plan.href} className={`mt-auto pt-3.5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold ${plan.featured ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`}>{plan.cta} <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-900/10 bg-white/70 p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Decision Intelligence, Not Inflated Promises</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-600">PulseIQ provides operational analysis and decision support—not guaranteed savings. A flagged variance or modeled opportunity identifies where deeper investigation may have financial value. Paid analysis goes further into the supporting data so recommendations are tied to actual patterns, transparent assumptions, and measurable next steps.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
