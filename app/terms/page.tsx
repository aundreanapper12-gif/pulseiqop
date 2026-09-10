import { ArrowLeft, Scale, Sparkles } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-black text-black/55 hover:text-black"><ArrowLeft size={16} /> Home</a>
        </div>
      </header>

      <article className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><Scale size={21} /></div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-black/35">Terms</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Terms of Use</h1>
          <p className="mt-5 text-sm font-semibold text-black/40">Effective September 10, 2026</p>

          <div className="mt-10 space-y-10 text-[17px] leading-8 text-black/62">
            <section><h2 className="text-2xl font-black text-black">Purpose of PulseIQ</h2><p className="mt-3">PulseIQ Operations provides browser-based business diagnostics, analytical estimates, prioritization tools, reporting features, and optional paid analysis services. The service is intended to help business owners and managers identify financially meaningful questions worth investigating and compare actual performance with targets or assumptions they provide.</p></section>

            <section><h2 className="text-2xl font-black text-black">Estimates are not guarantees</h2><p className="mt-3">Dollar opportunities, health scores, recovery scenarios, annualized impacts, modeled missed-lead values, rework estimates, and other calculated outputs are planning estimates derived from the information entered. They do not guarantee savings, profit increases, revenue recovery, or a particular business outcome. A correlation, modeled opportunity, or target variance does not by itself prove causation.</p></section>

            <section><h2 className="text-2xl font-black text-black">Not professional financial or legal advice</h2><p className="mt-3">PulseIQ is not a substitute for an accountant, tax professional, attorney, investment adviser, or other licensed professional. Decisions involving taxes, accounting treatment, employment law, contracts, regulated industries, financing, or investments should be reviewed with an appropriate qualified professional.</p></section>

            <section><h2 className="text-2xl font-black text-black">Your inputs, targets, and data rights</h2><p className="mt-3">You are responsible for the accuracy and appropriateness of the figures, budgets, targets, assumptions, and descriptions you provide and for having the right to provide any business data submitted for analysis. PulseIQ does not represent that a target entered by a user is an industry benchmark or objectively correct.</p></section>

            <section><h2 className="text-2xl font-black text-black">Free workspace and local records</h2><p className="mt-3">The current free workspace performs its diagnostic calculations in the browser and may store draft data and optional saved snapshots in browser local storage. Local browser records are provided for convenience and are not a guaranteed backup, permanent client account, or cloud archive.</p></section>

            <section><h2 className="text-2xl font-black text-black">Paid services</h2><p className="mt-3">Website pricing describes the current standard scope of listed analysis packages. A paid engagement may require confirmation of its business question, relevant data sources, deliverables, timing, and limitations before analysis begins. Work outside an agreed scope may require a separate agreement or fee.</p></section>

            <section><h2 className="text-2xl font-black text-black">Payments</h2><p className="mt-3">When checkout is offered, payment may be processed by a third-party payment provider such as Stripe. The payment provider&apos;s terms apply to the payment transaction. Do not enter payment-card details into PulseIQ diagnostic or analysis-request fields.</p></section>

            <section><h2 className="text-2xl font-black text-black">Responsible use</h2><p className="mt-3">Do not use PulseIQ to submit malicious code, unlawfully obtained information, credentials, payment-card details, or unnecessary sensitive personal data. Do not attempt to interfere with the website, misrepresent ownership of submitted data, or use diagnostic outputs as if they were certified financial statements or guaranteed results.</p></section>

            <section><h2 className="text-2xl font-black text-black">Availability and changes</h2><p className="mt-3">The website, calculations, packages, and features may be improved, changed, or temporarily unavailable. PulseIQ may revise calculations as the methodology evolves. Material methodology or data-handling changes should be reflected on the relevant Methodology or Privacy pages.</p></section>

            <section><h2 className="text-2xl font-black text-black">Limitation of reliance</h2><p className="mt-3">Use the diagnostic as one input into business judgment, not as the sole basis for a consequential decision. Before implementing a recommendation, verify the underlying data, operational cause, implementation cost, and any legal, contractual, workforce, safety, or customer impact.</p></section>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-black/10 pt-8 text-sm font-black">
            <a href="/privacy" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Privacy</a>
            <a href="/methodology" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Methodology</a>
            <a href="/workspace" className="rounded-full bg-black px-5 py-3 text-white">Open workspace</a>
          </div>
        </div>
      </article>
    </main>
  );
}
