import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start with the free PulseIQ business money-leak workspace, then choose a focused analysis, full profit-leak analysis, or recurring monthly monitoring.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    label: "Free workspace",
    name: "PulseIQ Snapshot",
    price: "$0",
    cadence: "",
    description: "For an owner who wants to see where the first investigation should begin.",
    features: ["Actual-vs-target cost scan", "Missed-lead and rework models", "Ranked money-leak findings", "Recovery scenarios", "Local saved snapshots", "Printable executive report"],
    href: "/workspace",
    cta: "Analyze my business",
    featured: false,
  },
  {
    label: "Best first paid step",
    name: "Quick Leak Check",
    price: "$149",
    cadence: "one-time",
    description: "For one expensive question that needs a sharper answer than a monthly total can provide.",
    features: ["One operational question", "One focused dataset", "Pattern and risk review", "Three prioritized recommendations", "Concise action brief", "Assumptions and limitations stated"],
    href: "/request",
    cta: "Request a Quick Leak Check",
    featured: false,
  },
  {
    label: "Most complete",
    name: "Profit Leak Analysis",
    price: "$399",
    cadence: "one-time",
    description: "For a business that needs the financial signal connected to the likely operational cause.",
    features: ["Up to four relevant data sources", "Operational health view", "Financial-impact estimates", "Segmented root-cause analysis", "Visual findings report", "30-minute results call"],
    href: "/request",
    cta: "Start my full analysis",
    featured: true,
  },
  {
    label: "Ongoing visibility",
    name: "Monthly Pulse",
    price: "$199",
    cadence: "per month",
    description: "For teams that want recurring review after the key metrics and business context are understood.",
    features: ["Monthly KPI review", "Trend and risk flags", "Updated action priorities", "Monthly scorecard", "Progress against prior findings", "Decision-focused management summary"],
    href: "/request",
    cta: "Request Monthly Pulse",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-black text-black/55"><ArrowLeft size={16} /> Home</a>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-black/35">Simple path to a better answer</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">Start free. Pay when the question is worth digging into.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/58">The free workspace finds the signal. Paid analysis is for the point where you need to know what is actually driving the number, what to change, and how to measure the result.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {plans.map((plan) => (
              <article key={plan.name} className={`flex rounded-[2rem] border p-7 ${plan.featured ? "border-black bg-black text-white shadow-2xl" : "border-black/10 bg-white/75 shadow-sm"}`}>
                <div className="flex w-full flex-col">
                  <p className={`text-xs font-black uppercase tracking-[0.18em] ${plan.featured ? "text-white/40" : "text-black/35"}`}>{plan.label}</p>
                  <h2 className="mt-4 text-2xl font-black">{plan.name}</h2>
                  <div className="mt-4 flex items-end gap-2"><span className="text-4xl font-black">{plan.price}</span>{plan.cadence ? <span className={`pb-1 text-sm font-bold ${plan.featured ? "text-white/45" : "text-black/40"}`}>{plan.cadence}</span> : null}</div>
                  <p className={`mt-4 leading-7 ${plan.featured ? "text-white/58" : "text-black/52"}`}>{plan.description}</p>
                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => <div key={feature} className="flex gap-2.5 text-sm font-semibold"><Check size={16} className="mt-0.5 shrink-0" /> <span>{feature}</span></div>)}
                  </div>
                  <a href={plan.href} className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-black ${plan.featured ? "bg-white text-black" : "bg-black text-white"}`}>{plan.cta} <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/70 p-6 md:p-8">
            <h2 className="text-2xl font-black">What PulseIQ is—and is not—selling</h2>
            <p className="mt-4 max-w-4xl leading-7 text-black/55">PulseIQ sells analysis and decision support, not guaranteed savings. A flagged variance or modeled opportunity tells you where the next investigation may have financial value. Paid work goes deeper into the supporting data so recommendations can be tied to actual patterns instead of generic advice.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
