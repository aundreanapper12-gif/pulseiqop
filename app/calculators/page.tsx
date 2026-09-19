import type { Metadata } from "next";
import { ArrowRight, Calculator, CreditCard, Gauge, HardHat, Percent, TimerReset, Users } from "lucide-react";
import { calculators } from "./data";

export const metadata: Metadata = {
  title: "Free Small Business Calculators",
  description: "Free calculators for true labor cost, overtime, card processing fees, job profitability, profit margin, and break-even revenue.",
  keywords: ["small business calculators", "business profit calculator", "labor cost calculator", "job profitability calculator", "credit card fee calculator"],
  alternates: { canonical: "/calculators" },
};

const icons = [Users, TimerReset, CreditCard, HardHat, Percent, Gauge];

export default function CalculatorsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PulseIQ Free Business Calculators",
    url: "https://www.pulseiqoperations.online/calculators",
    description: "Free business calculators for labor, overtime, merchant fees, job profitability, margins, and break-even revenue."
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800"><Calculator size={16} /> Free PulseIQ tools</div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-7xl">Know what the numbers are really costing your business.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Use these free calculators to check one business question at a time. When you want to see the bigger picture, move the numbers into PulseIQ and look for the leaks working together.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {calculators.map((calculator, index) => {
              const Icon = icons[index];
              return (
                <a key={calculator.slug} href={`/calculators/${calculator.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Icon size={20} /></span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{calculator.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{calculator.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{calculator.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700">Use calculator <ArrowRight size={16} /></span>
                </a>
              );
            })}
          </div>

          <section className="mt-12 rounded-3xl bg-slate-950 p-7 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Go beyond one calculation</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Find the leaks that hide between the numbers.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">PulseIQ combines your revenue, expenses, labor, targets, and operating inputs into ranked findings and an action plan.</p>
            <a href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950">Start free 14-day trial <ArrowRight size={16} /></a>
          </section>
        </div>
      </section>
    </main>
  );
}
