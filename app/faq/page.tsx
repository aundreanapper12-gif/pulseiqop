import { ArrowLeft, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  [
    "What kind of business is PulseIQ for?",
    "PulseIQ is built primarily for growing service businesses and operational teams that already have reports or spreadsheets but need help turning them into a decision. The same framework can also be useful for retail, agencies, contact centers, home services, and other businesses with measurable labor, customer, sales, or workflow data.",
  ],
  [
    "Do I need perfect data?",
    "No. Start with the decision you need to make. PulseIQ can identify which data is useful for that question. A focused analysis is often more valuable than collecting every report in the business.",
  ],
  [
    "What can I use in the free diagnostic?",
    "The current diagnostic accepts monthly revenue, targets, operating-cost categories, and an optional lead-recovery model. You can enter values manually or use the downloadable category / actual / target CSV template.",
  ],
  [
    "Does a flagged cost mean I should cut it?",
    "No. A variance is a signal to investigate. Higher spending can be justified by growth, seasonality, service quality, capacity, or strategy. PulseIQ ranks the dollar impact so you know where to ask the next question first.",
  ],
  [
    "Is the free result a financial statement?",
    "No. The free diagnostic is an operational estimate based on the figures entered. It is not a GAAP financial statement, tax return, valuation, audit, or guarantee of savings.",
  ],
  [
    "What is the difference between the free scan and a paid analysis?",
    "The free scan compares the numbers you enter and identifies high-value areas to investigate. A paid analysis examines the underlying data in more detail, looks for patterns and likely drivers, states assumptions and limitations, and turns the findings into prioritized actions.",
  ],
  [
    "What is included in the Quick Leak Check?",
    "The $149 Quick Leak Check focuses on one operational question and one dataset. It is designed to surface the key patterns or risks and provide three prioritized recommendations in a concise action brief.",
  ],
  [
    "What is included in the Profit Leak Analysis?",
    "The $399 Profit Leak Analysis is a broader review of up to four data sources and is designed to include an operational health view, estimated financial impact, a visual findings report, and a 30-minute results call.",
  ],
  [
    "What is Monthly Pulse?",
    "Monthly Pulse is $199 per month and is intended for businesses that want recurring metric review, trend and risk alerts, updated action priorities, and a monthly scorecard after an initial understanding of the operation has been established.",
  ],
  [
    "What information should I avoid sending?",
    "Do not send passwords, bank credentials, payment-card data, Social Security numbers, medical records, or unrelated sensitive personal data. Provide only the information necessary for the business question being analyzed.",
  ],
  [
    "Can PulseIQ guarantee the savings shown?",
    "No. Opportunity estimates and recovery scenarios are planning tools. Actual results depend on the underlying cause, implementation cost, capacity, customer behavior, market conditions, and other factors.",
  ],
  [
    "Where can I see how the calculator works?",
    "See the Methodology page for the current actual-vs-target, missed-lead, operating-margin, health-score, and recovery-scenario logic.",
  ],
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span>
            <span>PulseIQ Operations</span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-black text-black/55 hover:text-black"><ArrowLeft size={16} /> Home</a>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><HelpCircle size={21} /></div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-black/35">Questions</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">PulseIQ FAQ</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/58">What the diagnostic does, what a paid analysis adds, and what to expect before sharing business data.</p>

          <div className="mt-12 space-y-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-[1.6rem] border border-black/10 bg-white/75 p-6 shadow-sm">
                <summary className="cursor-pointer list-none pr-8 text-xl font-black marker:hidden">{question}</summary>
                <p className="mt-4 max-w-4xl leading-7 text-black/55">{answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-black p-7 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-9">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Still deciding?</p>
              <h2 className="mt-2 text-3xl font-black">Start with the business question, not the package.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/55">Choose “Help Me Choose” on the request page and describe what you are trying to understand.</p>
            </div>
            <a href="/request" className="mt-6 inline-flex rounded-full bg-white px-6 py-4 font-black text-black md:mt-0">Request an analysis</a>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-black/10 pt-8 text-sm font-black">
            <a href="/methodology" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Methodology</a>
            <a href="/privacy" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Privacy</a>
            <a href="/terms" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Terms</a>
          </div>
        </div>
      </section>
    </main>
  );
}
