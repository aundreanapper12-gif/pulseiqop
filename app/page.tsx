"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  CheckCircle2,
  Download,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";

type IndustryKey = "general" | "salon" | "law" | "contractor" | "medspa" | "realestate" | "callcenter";

type FormState = {
  businessName: string;
  industry: IndustryKey;
  monthlyRevenue: number;
  missedLeads: number;
  averageCustomerValue: number;
  responseHours: number;
  cancellations: number;
  complaints: number;
  manualHours: number;
};

const industryPresets: Record<IndustryKey, { label: string; values: Partial<FormState>; focus: string }> = {
  general: {
    label: "General Business",
    values: {},
    focus: "missed leads, slow follow-up, workflow waste, and customer experience gaps",
  },
  salon: {
    label: "Salon",
    values: { monthlyRevenue: 12000, missedLeads: 12, averageCustomerValue: 95, responseHours: 12, cancellations: 8, complaints: 3, manualHours: 14 },
    focus: "missed appointment requests, cancellations, rebooking gaps, and client retention",
  },
  law: {
    label: "Law Firm",
    values: { monthlyRevenue: 35000, missedLeads: 10, averageCustomerValue: 750, responseHours: 24, cancellations: 2, complaints: 4, manualHours: 20 },
    focus: "missed intakes, delayed follow-up, unclear communication, and admin bottlenecks",
  },
  contractor: {
    label: "Contractor",
    values: { monthlyRevenue: 28000, missedLeads: 15, averageCustomerValue: 600, responseHours: 18, cancellations: 4, complaints: 5, manualHours: 18 },
    focus: "missed quote requests, slow estimates, scheduling gaps, and follow-up breakdowns",
  },
  medspa: {
    label: "Med Spa",
    values: { monthlyRevenue: 25000, missedLeads: 14, averageCustomerValue: 220, responseHours: 10, cancellations: 7, complaints: 4, manualHours: 16 },
    focus: "consultation follow-up, appointment reminders, upsell opportunities, and retention",
  },
  realestate: {
    label: "Real Estate",
    values: { monthlyRevenue: 18000, missedLeads: 8, averageCustomerValue: 1200, responseHours: 15, cancellations: 2, complaints: 2, manualHours: 12 },
    focus: "lead response speed, follow-up consistency, appointment setting, and CRM organization",
  },
  callcenter: {
    label: "Call Center",
    values: { monthlyRevenue: 45000, missedLeads: 30, averageCustomerValue: 80, responseHours: 4, cancellations: 1, complaints: 12, manualHours: 30 },
    focus: "missed calls, quality issues, staffing waste, repeat contacts, and workflow leakage",
  },
};

export default function PulseIQRevenueLeakScanner() {
  const [form, setForm] = useState<FormState>({
    businessName: "",
    industry: "general",
    monthlyRevenue: 10000,
    missedLeads: 10,
    averageCustomerValue: 150,
    responseHours: 24,
    cancellations: 3,
    complaints: 5,
    manualHours: 10,
  });

  const [lead, setLead] = useState({ name: "", email: "" });
  const [leadSaved, setLeadSaved] = useState(false);

  const updateField = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "businessName" || field === "industry" ? value : Number(value),
    }));
  };

  const applyPreset = (industry: IndustryKey) => {
    setForm((prev) => ({
      ...prev,
      industry,
      ...industryPresets[industry].values,
    }));
  };

  const results = useMemo(() => {
    const missedLeadLoss = form.missedLeads * form.averageCustomerValue;
    const cancellationLoss = form.cancellations * form.averageCustomerValue;
    const complaintRiskLoss = form.complaints * (form.averageCustomerValue * 0.25);
    const manualLaborLoss = form.manualHours * 25;
    const responsePenalty = form.responseHours > 24 ? form.averageCustomerValue * 3 : form.responseHours > 8 ? form.averageCustomerValue : 0;

    const estimatedMonthlyLeak = missedLeadLoss + cancellationLoss + complaintRiskLoss + manualLaborLoss + responsePenalty;
    const annualLeak = estimatedMonthlyLeak * 12;
    const leakPercent = form.monthlyRevenue > 0 ? Math.round((estimatedMonthlyLeak / form.monthlyRevenue) * 100) : 0;

    let score = 100;
    score -= Math.min(form.missedLeads * 2, 25);
    score -= Math.min(form.responseHours / 2, 20);
    score -= Math.min(form.cancellations * 3, 20);
    score -= Math.min(form.complaints * 2, 15);
    score -= Math.min(form.manualHours, 20);
    score = Math.max(Math.round(score), 0);

    const riskLevel = score >= 80 ? "Low Risk" : score >= 60 ? "Moderate Risk" : score >= 40 ? "High Risk" : "Critical Risk";

    const leaks = [
      { label: "Missed Lead Revenue", amount: missedLeadLoss, note: `If ${form.missedLeads} leads are missed at ${money(form.averageCustomerValue)} each, that could mean ${money(missedLeadLoss)} in monthly lost opportunity.` },
      { label: "Cancellation Revenue", amount: cancellationLoss, note: `If ${form.cancellations} bookings fall through monthly, that could represent ${money(cancellationLoss)} in preventable revenue risk.` },
      { label: "Customer Experience Risk", amount: complaintRiskLoss, note: "Complaints often signal hidden friction that can reduce repeat business, reviews, and referrals." },
      { label: "Manual Workflow Cost", amount: manualLaborLoss, note: `At an estimated $25/hour, ${form.manualHours} manual admin hours may cost around ${money(manualLaborLoss)} monthly.` },
      { label: "Slow Response Penalty", amount: responsePenalty, note: "Slow response time can cause prospects to choose another business before you follow up." },
    ].sort((a, b) => b.amount - a.amount);

    const recommendations: string[] = [];
    if (form.missedLeads > 5) recommendations.push("Create a missed-lead recovery workflow with same-day callback, text, or email follow-up.");
    if (form.responseHours > 8) recommendations.push("Set a response-time standard and use templates so every inquiry gets a fast answer.");
    if (form.cancellations > 2) recommendations.push("Add automated reminders, confirmation messages, and a simple reschedule process.");
    if (form.complaints > 3) recommendations.push("Track complaint themes weekly and turn the top issue into a process improvement project.");
    if (form.manualHours > 5) recommendations.push("Automate repetitive admin work with intake forms, scheduling tools, saved replies, or AI-assisted templates.");
    if (recommendations.length === 0) recommendations.push("Your operations look stable. Next, track conversion rate, retention, and repeat customer value.");

    return {
      estimatedMonthlyLeak,
      annualLeak,
      leakPercent,
      score,
      riskLevel,
      leaks,
      recommendations: recommendations.slice(0, 3),
      focus: industryPresets[form.industry].focus,
    };
  }, [form]);

  const handleLeadSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadSaved(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" /> PulseIQ Operations
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Find where your business is leaking revenue.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              PulseIQ is a free operational audit scanner that estimates missed revenue, workflow waste, customer experience risk, and automation opportunities in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#scanner" className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Run Free Scan <Calculator className="ml-2 h-5 w-5" />
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center rounded-2xl border border-slate-600 px-6 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-950">
                View Audit Options <Mail className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          <Card className="rounded-3xl border border-slate-800 bg-white/10 shadow-2xl backdrop-blur">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">Estimated Monthly Leak</p>
                  <p className="mt-2 text-4xl font-bold text-cyan-300">{money(results.estimatedMonthlyLeak)}</p>
                </div>
                <TrendingDown className="h-12 w-12 text-cyan-300" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Health Score</p>
                  <p className="text-3xl font-bold">{results.score}/100</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Risk Level</p>
                  <p className="text-2xl font-bold">{results.riskLevel}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                This estimate equals about <span className="font-bold text-cyan-200">{results.leakPercent}%</span> of the monthly revenue entered.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <section className="mt-12 grid gap-4 md:grid-cols-4">
          <Feature icon={<ShieldCheck />} title="Business Health Score" text="See how risky your current workflow may be." />
          <Feature icon={<TrendingDown />} title="Revenue Leak Estimate" text="Translate missed leads and delays into dollars." />
          <Feature icon={<Zap />} title="Automation Ideas" text="Spot repetitive work that can be simplified." />
          <Feature icon={<Users />} title="CX Risk Review" text="Find communication gaps hurting customers." />
        </section>

        <section id="scanner" className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-3xl bg-white text-slate-950 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold">Free Revenue Leak Scan</h2>
              <p className="mt-2 text-slate-600">Choose an industry preset or enter your own numbers. Results update instantly.</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {(Object.keys(industryPresets) as IndustryKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      form.industry === key ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {industryPresets[key].label}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <Input label="Business Name" value={form.businessName} onChange={(v) => updateField("businessName", v)} placeholder="Example: Main Street Salon" />
                <Input label="Monthly Revenue" type="number" value={form.monthlyRevenue} onChange={(v) => updateField("monthlyRevenue", v)} />
                <Input label="Missed Leads Per Month" type="number" value={form.missedLeads} onChange={(v) => updateField("missedLeads", v)} />
                <Input label="Average Customer Value" type="number" value={form.averageCustomerValue} onChange={(v) => updateField("averageCustomerValue", v)} />
                <Input label="Average Response Time in Hours" type="number" value={form.responseHours} onChange={(v) => updateField("responseHours", v)} />
                <Input label="Cancellations / No-Shows Per Month" type="number" value={form.cancellations} onChange={(v) => updateField("cancellations", v)} />
                <Input label="Customer Complaints Per Month" type="number" value={form.complaints} onChange={(v) => updateField("complaints", v)} />
                <Input label="Manual Admin Hours Per Month" type="number" value={form.manualHours} onChange={(v) => updateField("manualHours", v)} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-7 w-7 text-cyan-300" />
                  <h2 className="text-2xl font-bold">Your PulseIQ Results</h2>
                </div>
                <p className="mt-3 text-slate-300">For this business type, PulseIQ is watching for {results.focus}.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Metric label="Monthly Leak" value={money(results.estimatedMonthlyLeak)} />
                  <Metric label="Annual Risk" value={money(results.annualLeak)} />
                  <Metric label="Score" value={`${results.score}/100`} />
                </div>

                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 text-amber-300" />
                    <div>
                      <p className="font-semibold">Biggest Leak: {results.leaks[0].label}</p>
                      <p className="mt-1 text-sm text-slate-400">{results.leaks[0].note}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-white text-slate-950 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold">Top Revenue Leaks</h3>
                <div className="mt-4 grid gap-3">
                  {results.leaks.slice(0, 3).map((leak) => (
                    <div key={leak.label} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold">{leak.label}</p>
                        <p className="font-bold text-slate-900">{money(leak.amount)}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{leak.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold">Top 3 Recommendations</h3>
                <div className="mt-4 grid gap-3">
                  {results.recommendations.map((rec) => (
                    <div key={rec} className="flex gap-3 rounded-2xl bg-slate-950/70 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-300" />
                      <p className="text-slate-100">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl md:p-8">
            <h2 className="text-2xl font-bold">Get the Full PulseIQ Report</h2>
            <p className="mt-2 text-slate-600">Collect leads now. Later, connect this form to email, Google Sheets, Notion, or Stripe.</p>
            <form onSubmit={handleLeadSubmit} className="mt-6 grid gap-4">
              <Input label="Your Name" value={lead.name} onChange={(v) => setLead((prev) => ({ ...prev, name: v }))} placeholder="Your name" />
              <Input label="Email Address" value={lead.email} onChange={(v) => setLead((prev) => ({ ...prev, email: v }))} placeholder="you@email.com" />
              <button className="rounded-2xl bg-slate-950 px-5 py-4 font-semibold text-white transition hover:bg-slate-800">
                Send Me My Full Report
              </button>
              {leadSaved && <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">Lead captured on page. Next step: connect this form to a real email tool.</p>}
            </form>
          </Card>

          <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl md:p-8">
            <h2 className="text-2xl font-bold">How PulseIQ Works</h2>
            <div className="mt-6 grid gap-4">
              <Step number="1" title="Scan" text="Enter business basics like missed leads, customer value, response time, and manual work." />
              <Step number="2" title="Score" text="PulseIQ converts operational issues into a business health score and estimated revenue risk." />
              <Step number="3" title="Improve" text="Use the top recommendations to reduce missed revenue, improve follow-up, and simplify workflows." />
            </div>
          </Card>
        </section>

        <section id="pricing" className="mt-12">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Simple Audit Options</h2>
            <p className="mt-2 text-slate-300">Start free, then upgrade when a business wants deeper help.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <Pricing title="Free Scan" price="$0" text="Instant business score and revenue leak estimate." />
            <Pricing title="Mini Audit PDF" price="$49" text="Custom PDF with findings, top leaks, and action steps." featured />
            <Pricing title="Custom Dashboard" price="$149" text="Spreadsheet dashboard for tracking leaks, KPIs, and improvements." />
            <Pricing title="Monthly Review" price="$299/mo" text="Ongoing operations review, score tracking, and improvement plan." />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6 text-center md:p-10">
          <h2 className="text-3xl font-bold">Built for small businesses that need clarity fast.</h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-300">
            PulseIQ turns everyday operational problems into clear numbers, practical recommendations, and a simple path toward better follow-up, stronger customer experience, and less wasted time.
          </p>
        </section>
      </section>
    </main>
  );
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">{icon}</div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-slate-950 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950">{number}</div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function Pricing({ title, price, text, featured = false }: { title: string; price: string; text: string; featured?: boolean }) {
  return (
    <div className={`rounded-3xl p-6 shadow-xl ${featured ? "bg-cyan-400 text-slate-950" : "border border-slate-800 bg-slate-900 text-white"}`}>
      <p className="text-sm font-semibold uppercase tracking-wide opacity-80">{title}</p>
      <p className="mt-3 text-3xl font-bold">{price}</p>
      <p className={`mt-3 text-sm leading-6 ${featured ? "text-slate-800" : "text-slate-400"}`}>{text}</p>
      <button className={`mt-5 w-full rounded-2xl px-4 py-3 font-semibold ${featured ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>Choose Plan</button>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
