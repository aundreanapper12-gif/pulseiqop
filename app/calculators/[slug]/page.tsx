import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import CalculatorTool from "../calculator";
import { calculators, getCalculator, type CalculatorSlug } from "../data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return {};
  return {
    title: calculator.name,
    description: calculator.description,
    keywords: calculator.keywords,
    alternates: { canonical: `/calculators/${calculator.slug}` },
    openGraph: {
      title: calculator.name,
      description: calculator.description,
      url: `https://www.pulseiqoperations.online/calculators/${calculator.slug}`,
      type: "website",
    }
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `https://www.pulseiqoperations.online/calculators/${calculator.slug}`,
    description: calculator.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="px-5 py-12 md:px-8 md:py-18">
        <div className="mx-auto max-w-6xl">
          <a href="/calculators" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={16} /> All free calculators</a>
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{calculator.eyebrow} calculator</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{calculator.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{calculator.intro}</p>
          </div>

          <div className="mt-10"><CalculatorTool slug={calculator.slug as CalculatorSlug} /></div>

          <section className="mt-10 grid gap-5 md:grid-cols-3">
            {["Free to use — no account required", "Runs in your browser", "Use the result as a starting point, not accounting advice"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-700" />{item}</div>
            ))}
          </section>

          <section className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-7 md:p-9">
            <h2 className="text-2xl font-semibold">Want to know what else is eating into profit?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">A single calculator answers one question. PulseIQ helps rank multiple operating and financial signals so you know what to investigate first.</p>
            <a href="/dashboard" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white">Open PulseIQ <ArrowRight size={16} /></a>
          </section>
        </div>
      </section>
    </main>
  );
}
