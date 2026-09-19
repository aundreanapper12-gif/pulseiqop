"use client";

import { ArrowRight, BadgeDollarSign, Banknote, BriefcaseBusiness, CreditCard, Repeat2, SearchCheck, TrendingDown } from "lucide-react";

type Finding = {
  id: string;
  name: string;
  amount: number;
  severity?: string;
  firstMove?: string;
};

type Props = {
  revenue: number;
  totalExpenses: number;
  monthlyOpportunity: number;
  operatingMargin: number;
  findings: Finding[];
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function money(value: number) {
  return usd.format(Number.isFinite(value) ? value : 0);
}

export default function ProfitIntelligence({
  revenue,
  totalExpenses,
  monthlyOpportunity,
  operatingMargin,
  findings,
}: Props) {
  const annualOpportunity = monthlyOpportunity * 12;
  const expenseRate = revenue > 0 ? (totalExpenses / revenue) * 100 : 0;

  const labor = findings.find((f) => /labor|payroll|overtime|staff/i.test(f.name));
  const fees = findings.find((f) => /fee|processing|merchant|stripe|square|paypal|card/i.test(f.name));
  const recurring = findings.find((f) => /subscription|software|recurring|membership/i.test(f.name));
  const jobVariance = findings.find((f) => /job|project|material|rework|scope|variance/i.test(f.name));

  const leakCards = [
    {
      label: "Labor inefficiency",
      icon: BriefcaseBusiness,
      value: labor?.amount || 0,
      note: labor?.firstMove || "Compare scheduled, worked, overtime, and billable hours against revenue.",
    },
    {
      label: "Processing & transaction fees",
      icon: CreditCard,
      value: fees?.amount || 0,
      note: fees?.firstMove || "Track your effective processing rate and annualized fee drag.",
    },
    {
      label: "Recurring expense drag",
      icon: Repeat2,
      value: recurring?.amount || 0,
      note: recurring?.firstMove || "Review software, memberships, services, and other repeating charges.",
    },
    {
      label: "Job / project variance",
      icon: TrendingDown,
      value: jobVariance?.amount || 0,
      note: jobVariance?.firstMove || "Compare expected labor and materials with actual cost by job or project.",
    },
  ];

  const ranked = [...findings].sort((a,b) => b.amount - a.amount).slice(0, 5);

  return (
    <section className="mt-8 space-y-6">
      <div className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">PulseIQ Profit Intelligence</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
              PulseIQ found {money(annualOpportunity)} in potential annual improvement.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              This is an annualized estimate based on your current modeled monthly opportunities. Treat it as an investigation target, not guaranteed savings.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Expense load</p>
              <p className="mt-2 text-3xl font-semibold">{expenseRate.toFixed(1)}%</p>
              <p className="mt-1 text-sm text-slate-300">of entered revenue</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Operating margin</p>
              <p className="mt-2 text-3xl font-semibold">{operatingMargin.toFixed(1)}%</p>
              <p className="mt-1 text-sm text-slate-300">based on current entries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {leakCards.map(({ label, icon: Icon, value, note }) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100"><Icon size={19} /></span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Leak scan</span>
            </div>
            <h3 className="mt-5 font-semibold">{label}</h3>
            <p className="mt-2 text-3xl font-semibold">{value > 0 ? money(value) : "Check"}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{note}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="flex items-center gap-3"><SearchCheck size={20} /><h3 className="text-2xl font-semibold">Where your money may be leaking</h3></div>
          <p className="mt-3 text-sm leading-6 text-slate-600">PulseIQ ranks the strongest signals in the numbers you entered so you can investigate the biggest dollar impact first.</p>
          <div className="mt-6 space-y-3">
            {ranked.length ? ranked.map((finding, index) => (
              <div key={finding.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">#{index + 1} opportunity</p>
                  <p className="mt-1 font-semibold">{finding.name}</p>
                  {finding.firstMove ? <p className="mt-1 text-sm text-slate-600">{finding.firstMove}</p> : null}
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-xl font-semibold">{money(finding.amount)}</p>
                  <p className="text-xs text-slate-500">estimated / month</p>
                </div>
              </div>
            )) : <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">Add targets and operating data in the workspace to generate ranked money-leak signals.</div>}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
          <div className="flex items-center gap-3"><Banknote size={20} /><h3 className="text-2xl font-semibold">Where your cash is stuck</h3></div>
          <p className="mt-3 text-sm leading-6 text-slate-700">Use this as your cash-eaters checklist. PulseIQ should eventually connect these balances directly to uploaded accounting and payment data.</p>
          <div className="mt-6 space-y-3 text-sm font-semibold">
            {["Unpaid customer invoices / receivables","Inventory and materials sitting unused","Merchant processing fees and refunds","Debt payments and financing costs","Deposits, retainers, and prepaid expenses","Recurring tools and subscriptions"].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4"><BadgeDollarSign size={17} className="mt-0.5 shrink-0" />{item}</div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Opportunity Finder</p>
            <h3 className="mt-2 text-2xl font-semibold">Turn the biggest leak into a measurable action.</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Quick wins, cost reductions, and revenue opportunities become much more useful when you track a baseline and compare the next period.</p>
          </div>
          <a href="/workspace#recovery-tracker" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 font-semibold text-white">Build recovery plan <ArrowRight size={16} /></a>
        </div>
      </section>
    </section>
  );
}
