import { ArrowLeft, Scale, Sparkles } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span>
            <span>PulseIQ Operations</span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-black text-black/55 hover:text-black"><ArrowLeft size={16} /> Home</a>
        </div>
      </header>

      <article className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><Scale size={21} /></div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-black/35">Terms</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Terms of Use</h1>
          <p className="mt-5 text-sm font-semibold text-black/40">Effective September 7, 2026</p>

          <div className="mt-10 space-y-10 text-[17px] leading-8 text-black/62">
            <section>
              <h2 className="text-2xl font-black text-black">Purpose of PulseIQ</h2>
              <p className="mt-3">PulseIQ Operations provides business-operating diagnostics, analytical estimates, prioritization tools, and consulting-style recommendations. The website is intended to help business owners and managers identify questions worth investigating and compare actual performance with targets or assumptions they provide.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Estimates are not guarantees</h2>
              <p className="mt-3">Dollar opportunities, health scores, recovery scenarios, annualized impacts, and other calculated outputs are estimates derived from the information entered. They do not guarantee savings, profit increases, revenue recovery, or a particular business outcome. Correlation or a target variance does not by itself prove the cause of a business problem.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Not professional financial or legal advice</h2>
              <p className="mt-3">PulseIQ is not a substitute for an accountant, tax professional, attorney, investment adviser, or other licensed professional. Decisions involving taxes, accounting treatment, employment law, contracts, regulated industries, financing, or investments should be reviewed with the appropriate qualified professional.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Your inputs and targets</h2>
              <p className="mt-3">You are responsible for the accuracy and appropriateness of the figures, budgets, targets, assumptions, and descriptions you provide. PulseIQ may compare actual values with those targets; it does not represent that every target is an industry benchmark or that a target entered by a user is objectively correct.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Paid services</h2>
              <p className="mt-3">Website pricing describes the current scope of the listed service packages. A paid engagement should be confirmed with its specific deliverables, data sources, timing, and any limitations before work begins. Work outside an agreed scope may require a separate agreement or fee.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Responsible use</h2>
              <p className="mt-3">Do not use PulseIQ to upload or distribute malicious code, unlawfully obtained information, credentials, payment-card details, or unnecessary sensitive personal data. You must have the right to provide any business data you submit for analysis.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Availability</h2>
              <p className="mt-3">The website and its features may be improved, changed, or temporarily unavailable. PulseIQ may revise calculations or presentation as the methodology evolves. Material methodology changes should be reflected on the Methodology page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Limitation of reliance</h2>
              <p className="mt-3">Use the diagnostic as one input into business judgment, not as the sole basis for a consequential decision. Before implementing a recommendation, verify the underlying data, operational cause, costs of implementation, and any legal, contractual, or customer impact.</p>
            </section>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-black/10 pt-8 text-sm font-black">
            <a href="/privacy" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Privacy</a>
            <a href="/methodology" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Methodology</a>
            <a href="/request" className="rounded-full bg-black px-5 py-3 text-white">Request an analysis</a>
          </div>
        </div>
      </article>
    </main>
  );
}
