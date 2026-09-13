import { ArrowLeft, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  ["Who Is PulseIQ Built For?", "PulseIQ is built for growing service businesses and operational teams that already have reports, spreadsheets, or business data but need a clearer path from numbers to decisions. The same framework can support retail, agencies, contact centers, home services, and other operations with measurable labor, customer, sales, or workflow data."],
  ["Do I Need Perfect Data?", "No. Start with the decision you need to make. PulseIQ helps identify which information is most useful for that question. A focused, relevant analysis is often more valuable than collecting every report in the business."],
  ["What Can I Use In The Free Diagnostic?", "The free diagnostic accepts monthly revenue, targets, operating-cost categories, and optional lead-recovery inputs. You can enter values manually or use the downloadable category / actual / target CSV template."],
  ["Does A Flagged Cost Mean I Should Cut It?", "No. A variance is a signal to investigate, not an instruction to reduce spending. Higher costs may be justified by growth, seasonality, service quality, capacity, or strategy. PulseIQ prioritizes financial impact so you know where a closer review may be most valuable."],
  ["Is The Free Result A Financial Statement?", "No. The free diagnostic is an operational decision-support tool based on the figures entered. It is not a GAAP financial statement, tax return, valuation, audit, or guarantee of savings."],
  ["What Is The Difference Between The Free Scan And Paid Analysis?", "The free scan surfaces high-value signals using the numbers you enter. Paid analysis goes deeper into the supporting data, examines patterns and likely drivers, states assumptions and limitations, and translates findings into prioritized business actions."],
  ["What Is Included In The Quick Leak Check?", "The $149 Quick Leak Check focuses on one operational question and one dataset. It is designed to surface the most relevant patterns or risks and deliver three prioritized recommendations in a concise action brief."],
  ["What Is Included In The Profit Leak Analysis?", "The $399 Profit Leak Analysis is a broader review of up to four data sources. It is designed to provide an operational health view, financial-impact estimates, visual findings, root-cause analysis, and a 30-minute results call."],
  ["What Is Monthly Pulse?", "Monthly Pulse is $199 per month for businesses that want ongoing KPI review, trend and risk visibility, updated priorities, and a recurring executive scorecard after the operation has been initially understood."],
  ["What Information Should I Avoid Sending?", "Do not send passwords, bank credentials, payment-card data, Social Security numbers, medical records, or unrelated sensitive personal information. Provide only what is necessary for the business question being analyzed."],
  ["Can PulseIQ Guarantee Savings?", "No. Opportunity estimates and recovery scenarios are planning tools. Actual results depend on the underlying cause, implementation cost, capacity, customer behavior, market conditions, and other operating factors."],
  ["Where Can I See How The Calculations Work?", "Visit the Methodology page for the current actual-vs-target, missed-lead, operating-margin, health-score, expense-review, and recovery-scenario logic."],
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <header className="border-b border-slate-900/10 px-5 py-4 md:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between gap-4"><a href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a><a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900/55 hover:text-slate-900"><ArrowLeft size={16} /> Home</a></div></header>
      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-5xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white"><HelpCircle size={21} /></div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-slate-900/35">Client Questions</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">Clear Answers Before You Make A Decision.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Understand what PulseIQ analyzes, how the free diagnostic differs from paid work, what information is appropriate to share, and what you can expect from each service level.</p>
        <div className="mt-12 space-y-4">{faqs.map(([question, answer]) => <details key={question} className="group rounded-xl border border-slate-900/10 bg-white/75 p-6 shadow-sm"><summary className="cursor-pointer list-none pr-8 text-xl font-semibold marker:hidden">{question}</summary><p className="mt-4 max-w-4xl leading-7 text-slate-900/55">{answer}</p></details>)}</div>
        <div className="mt-12 rounded-2xl bg-slate-900 p-7 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-9"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">Need A Recommendation?</p><h2 className="mt-2 text-3xl font-semibold">Start With The Business Decision, Not The Package.</h2><p className="mt-3 max-w-2xl leading-7 text-white/55">Choose “Help Me Choose” on the request page and describe the question you need answered. PulseIQ will help identify the smallest useful starting point.</p></div><a href="/request" className="mt-6 inline-flex rounded-xl bg-white px-6 py-4 font-semibold text-slate-900 md:mt-0">Request An Analysis</a></div>
        <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-900/10 pt-8 text-sm font-semibold"><a href="/methodology" className="rounded-xl border border-slate-900/15 px-5 py-3 hover:bg-blue-700 hover:text-white">Methodology</a><a href="/privacy" className="rounded-xl border border-slate-900/15 px-5 py-3 hover:bg-blue-700 hover:text-white">Privacy</a><a href="/terms" className="rounded-xl border border-slate-900/15 px-5 py-3 hover:bg-blue-700 hover:text-white">Terms</a></div>
      </div></section>
    </main>
  );
}
