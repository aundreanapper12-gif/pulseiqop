import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function PrivacyPage() {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><ShieldCheck size={21} /></div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-black/35">Privacy</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 text-sm font-semibold text-black/40">Effective September 7, 2026</p>

          <div className="mt-10 space-y-10 text-[17px] leading-8 text-black/62">
            <section>
              <h2 className="text-2xl font-black text-black">The short version</h2>
              <p className="mt-3">PulseIQ Operations is designed to use only the information needed to analyze an operational question. The current free diagnostic performs its calculations in your browser. The CSV importer reads the file you select in the browser and the diagnostic does not intentionally upload that CSV to a PulseIQ server.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Information you choose to enter</h2>
              <p className="mt-3">The diagnostic may use business name, industry, revenue, expense, target, lead-volume, conversion, and customer-value figures that you enter. The analysis-request page may also use your name, business email, business name, business question, and a description of the data you have available.</p>
              <p className="mt-3">Do not submit passwords, bank credentials, Social Security numbers, payment-card information, medical information, or other sensitive personal data that is not necessary for an operational analysis.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Browser-based diagnostic</h2>
              <p className="mt-3">The free diagnostic is currently implemented as browser-side calculations. Selecting Print / Save Report uses your browser's print functionality. Downloading the CSV template or a prepared request creates a file in your browser. PulseIQ does not claim that these browser actions create a private client account or permanent cloud record.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Website hosting and technical data</h2>
              <p className="mt-3">Like most websites, the hosting and delivery infrastructure may process standard technical information needed to serve pages, such as IP address, browser or device information, requested URLs, timestamps, and security or error logs. This technical processing is separate from the financial figures entered into the browser-based diagnostic.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Client analysis</h2>
              <p className="mt-3">If you become a paid client and provide files outside the free diagnostic, the data needed for the agreed analysis may be reviewed to produce your findings. PulseIQ's goal is to minimize the information collected, use it for the requested work, and avoid requesting unrelated sensitive information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Payments</h2>
              <p className="mt-3">The current website does not directly collect payment-card information. If payment functionality is added through a third-party payment processor, that processor's privacy practices will apply to the payment information it handles.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">No sale of submitted business data</h2>
              <p className="mt-3">PulseIQ does not offer the business figures you submit for sale to data brokers or advertisers. If this policy changes in a material way, this page will be updated before the change is represented as current practice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-black">Policy changes</h2>
              <p className="mt-3">This policy may be updated as the service adds client portals, payment processing, analytics, or other features. The effective date at the top of this page identifies the version currently posted.</p>
            </section>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-black/10 pt-8 text-sm font-black">
            <a href="/terms" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Terms</a>
            <a href="/methodology" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Methodology</a>
            <a href="/request" className="rounded-full bg-black px-5 py-3 text-white">Request an analysis</a>
          </div>
        </div>
      </article>
    </main>
  );
}
