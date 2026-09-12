import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { contactEmail } from "../site-config";

export default function PrivacyPage() {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><ShieldCheck size={21} /></div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-black/35">Privacy</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 text-sm font-semibold text-black/40">Effective September 12, 2026</p>

          <div className="mt-10 space-y-10 text-[17px] leading-8 text-black/62">
            <section><h2 className="text-2xl font-black text-black">The short version</h2><p className="mt-3">The free PulseIQ Business Workspace is designed to keep the business figures you enter in your browser. Core calculations run in the browser, selected CSV files are read in the browser, and optional saved snapshots use browser local storage rather than a PulseIQ cloud account.</p></section>

            <section><h2 className="text-2xl font-black text-black">Information you choose to enter</h2><p className="mt-3">The free workspace may use business name, industry, reporting period, revenue, expense amounts, dates, vendor names, descriptions, categories, targets, employee or location counts, lead-volume, conversion, customer-value, completed-job, and rework figures that you enter. The analysis-request page may also use your name, business email, business name, business question, and a description of the data you have available.</p><p className="mt-3">Do not submit passwords, bank credentials, Social Security numbers, payment-card information, medical information, or other sensitive personal data that is not necessary for an operational analysis.</p></section>

            <section><h2 className="text-2xl font-black text-black">Browser storage and saved snapshots</h2><p className="mt-3">The workspace can save the current draft, itemized expense list, up to 12 optional analysis snapshots, and up to 30 action follow-ups in local browser storage. Follow-ups may include a person responsible, planned fix, later spending, evidence notes, and an amount you identify as confirmed. Those records stay on that browser unless browser or device features outside PulseIQ copy or synchronize local storage. Clearing site data, using another browser, or changing devices may remove those saved records. PulseIQ does not represent browser storage as a permanent backup or client account.</p></section>

            <section><h2 className="text-2xl font-black text-black">CSV, downloads, and reports</h2><p className="mt-3">When you choose a CSV in the free workspace, the current importer reads that file with browser-side code. Downloading a template or report creates a file through your browser. Print / Save PDF uses your browser&apos;s print functionality. These actions do not intentionally upload the selected CSV or generated report to a PulseIQ server.</p></section>

            <section><h2 className="text-2xl font-black text-black">Website hosting and technical data</h2><p className="mt-3">Like most websites, hosting, security, and delivery infrastructure may process technical information needed to serve pages and protect the service, such as IP address, browser or device information, requested URLs, timestamps, and security or error logs. This technical processing is separate from the financial figures entered into the browser-based workspace.</p></section>

            <section><h2 className="text-2xl font-black text-black">Paid client analysis</h2><p className="mt-3">If you become a paid client and provide files for a deeper analysis, information needed for the agreed business question may be reviewed to produce the requested findings. PulseIQ&apos;s goal is to minimize the information collected, use it for the requested work, and avoid requesting unrelated sensitive information.</p></section>

            <section><h2 className="text-2xl font-black text-black">Email requests</h2><p className="mt-3">Selecting Email PulseIQ opens a draft in your own email app addressed to {contactEmail}. The website does not automatically send it. If you choose to send the draft, your email provider and PulseIQ&apos;s email provider process the message and any information you include. Do not attach unnecessary sensitive personal information. A random request reference is kept in this browser session for the chosen service and may be included in the draft to help connect it to checkout.</p></section>

            <section><h2 className="text-2xl font-black text-black">Payments</h2><p className="mt-3">PulseIQ uses Stripe-hosted checkout for paid offers. When you choose checkout, the random request reference may be sent as a checkout URL parameter to help match your payment to an email request. The form details on the analysis-request page are not automatically sent to Stripe. Payment-card information is handled by Stripe and should not be entered into PulseIQ&apos;s business diagnostic or request fields. Stripe&apos;s privacy policy and security practices apply to information it handles during payment.</p></section>

            <section><h2 className="text-2xl font-black text-black">No sale of submitted business figures</h2><p className="mt-3">PulseIQ does not offer the business figures you enter into the free workspace or provide for an analysis for sale to data brokers or advertisers. If this practice changes materially, this policy should be updated before the change is represented as current practice.</p></section>

            <section><h2 className="text-2xl font-black text-black">Policy changes</h2><p className="mt-3">This policy may be updated as the service adds account features, cloud storage, analytics, payment processing, or other capabilities. The effective date at the top identifies the version currently posted.</p></section>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-black/10 pt-8 text-sm font-black">
            <a href="/terms" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Terms</a>
            <a href="/methodology" className="rounded-full border border-black/15 px-5 py-3 hover:bg-black hover:text-white">Methodology</a>
            <a href="/workspace" className="rounded-full bg-black px-5 py-3 text-white">Open workspace</a>
          </div>
        </div>
      </article>
    </main>
  );
}
