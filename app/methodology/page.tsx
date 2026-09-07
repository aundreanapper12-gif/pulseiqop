import { ArrowLeft, Calculator, Sparkles } from "lucide-react";

const blocks = [
  {
    title: "1. Actual vs. target",
    body: "For each supported expense category, PulseIQ compares the actual monthly amount you enter with the target, budget, or forecast you enter. A cost overrun is flagged only when actual spending is greater than the target. The difference is treated as a diagnostic opportunity to investigate—not proof that the entire difference can or should be eliminated.",
  },
  {
    title: "2. Missed-lead opportunity",
    body: "The optional lead model estimates potential opportunity from missed or unanswered contacts using monthly leads × missed-contact rate × conversion rate × average customer value. This is a modeled opportunity, not guaranteed lost revenue. Recovered callbacks, duplicate contacts, capacity limits, lead quality, and fulfillment constraints can reduce the amount actually recoverable.",
  },
  {
    title: "3. Revenue target gap",
    body: "If a revenue target is provided, PulseIQ shows the shortfall between target and actual revenue separately from cost leakage. Keeping the two measures separate helps avoid counting the same dollars twice.",
  },
  {
    title: "4. Operating margin",
    body: "The diagnostic estimates operating profit as entered revenue minus the supported operating-cost categories entered into the tool. The displayed margin is that estimated profit divided by entered revenue. It is not a GAAP financial statement and may exclude taxes, debt service, depreciation, owner compensation, or other items not entered into the diagnostic.",
  },
  {
    title: "5. Health score",
    body: "PulseIQ's health score is a prioritization signal, not a credit rating or industry certification. The current model reduces a 100-point baseline for the size of detected opportunity relative to revenue, revenue-target shortfall, and very low or negative estimated operating margin. The score is bounded to keep the display readable and should be interpreted alongside the underlying numbers.",
  },
  {
    title: "6. Recovery scenarios",
    body: "Scenario modeling applies a user-selected recovery percentage to the identified monthly opportunity. For example, a 50% scenario asks what estimated operating profit could look like if half of the modeled opportunity were recovered. It is a planning scenario, not a forecast or promise.",
  },
];

export default function MethodologyPage() {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><Calculator size={21} /></div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-black/35">Methodology</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[1] tracking-tight md:text-7xl">Know what the numbers mean—and what they do not.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/58">PulseIQ is designed to make operational gaps easier to see without pretending that a calculator can prove root cause. The free diagnostic uses transparent rules based on the figures and targets you provide.</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {blocks.map((block) => (
              <article key={block.title} className="rounded-[2rem] border border-black/10 bg-white/75 p-7 shadow-sm">
                <h2 className="text-2xl font-black">{block.title}</h2>
                <p className="mt-4 leading-7 text-black/55">{block.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] bg-black p-7 text-white md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">What happens in a paid analysis</p>
            <h2 className="mt-3 text-3xl font-black">The calculator flags the question. The analysis investigates the cause.</h2>
            <p className="mt-5 max-w-3xl leading-7 text-white/60">A paid PulseIQ review can go deeper by segmenting the relevant data by time, team, location, channel, product, customer type, workflow stage, or other useful dimensions. Recommendations should be tied to the patterns actually supported by the supplied data, with assumptions and limitations stated clearly.</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-black/10 pt-8 text-sm font-black">
            <a href="/privacy" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Privacy</a>
            <a href="/terms" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Terms</a>
            <a href="/request" className="rounded-full bg-black px-5 py-3 text-white">Request an analysis</a>
          </div>
        </div>
      </section>
    </main>
  );
}
