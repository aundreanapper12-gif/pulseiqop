"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Sparkles, AlertTriangle, CheckCircle2, Mail, Download, BarChart3 } from "lucide-react";


export default function PulseIQRevenueLeakScanner() {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    monthlyRevenue: 10000,
    missedLeads: 10,
    averageCustomerValue: 150,
    responseHours: 24,
    cancellations: 3,
    complaints: 5,
    manualHours: 10,
  });

  const updateField = (field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "businessName" || field === "industry" ? value : Number(value),
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

    let score = 100;
    score -= Math.min(form.missedLeads * 2, 25);
    score -= Math.min(form.responseHours / 2, 20);
    score -= Math.min(form.cancellations * 3, 20);
    score -= Math.min(form.complaints * 2, 15);
    score -= Math.min(form.manualHours, 20);
    score = Math.max(Math.round(score), 0);

    const riskLevel = score >= 80 ? "Low Risk" : score >= 60 ? "Moderate Risk" : score >= 40 ? "High Risk" : "Critical Risk";

    const leaks = [
      { label: "Missed Lead Revenue", amount: missedLeadLoss, note: "Potential revenue lost from missed calls, forms, DMs, or follow-ups." },
      { label: "Cancellation Revenue", amount: cancellationLoss, note: "Potential revenue lost from preventable cancellations or no-shows." },
      { label: "Customer Experience Risk", amount: complaintRiskLoss, note: "Estimated risk from complaints, poor follow-up, or unclear communication." },
      { label: "Manual Workflow Cost", amount: manualLaborLoss, note: "Estimated cost of repetitive admin work that may be automated." },
      { label: "Slow Response Penalty", amount: responsePenalty, note: "Potential opportunity loss caused by delayed customer response times." },
    ].sort((a, b) => b.amount - a.amount);

    const recommendations = [];
    if (form.missedLeads > 5) recommendations.push("Set up a missed-lead tracker and same-day follow-up workflow.");
    if (form.responseHours > 8) recommendations.push("Create a response-time standard for calls, emails, website forms, and social messages.");
    if (form.cancellations > 2) recommendations.push("Add automated reminders and a simple reschedule process to reduce cancellations.");
    if (form.complaints > 3) recommendations.push("Track complaint themes weekly so recurring service issues are visible.");
    if (form.manualHours > 5) recommendations.push("Automate repetitive admin tasks with templates, forms, scheduling tools, or AI support.");
    if (recommendations.length === 0) recommendations.push("Your business looks stable. Focus next on tracking conversion rates and customer retention.");

    return {
      missedLeadLoss,
      estimatedMonthlyLeak,
      annualLeak,
      score,
      riskLevel,
      leaks,
      recommendations: recommendations.slice(0, 3),
    };
  }, [form]);

const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);

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
              Find where your business is losing money.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Run a quick operational audit to estimate missed revenue, customer experience risks, and workflow leaks in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl px-6 py-6 text-base">
                Run Free Scan <Calculator className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="rounded-2xl border-slate-600 bg-transparent px-6 py-6 text-base text-white hover:bg-white hover:text-slate-950">
                Get Custom Audit <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <Card className="rounded-3xl border-slate-800 bg-white/10 shadow-2xl backdrop-blur">
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
            </CardContent>
          </Card>
        </motion.div>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-3xl border-slate-800 bg-white text-slate-950 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold">Free Revenue Leak Scan</h2>
              <p className="mt-2 text-slate-600">Enter realistic estimates. You can adjust the numbers and watch the results update instantly.</p>

              <div className="mt-6 grid gap-4">
                <Input label="Business Name" value={form.businessName} onChange={(v) => updateField("businessName", v)} placeholder="Example: Main Street Salon" />
                <Input label="Industry" value={form.industry} onChange={(v) => updateField("industry", v)} placeholder="Example: Salon, law firm, contractor" />
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
            <Card className="rounded-3xl border-slate-800 bg-slate-900 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-7 w-7 text-cyan-300" />
                  <h2 className="text-2xl font-bold">Your PulseIQ Results</h2>
                </div>

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

            <Card className="rounded-3xl border-slate-800 bg-white text-slate-950 shadow-xl">
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

            <Card className="rounded-3xl border-cyan-400/30 bg-cyan-400/10 shadow-xl">
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
                <div className="mt-6 rounded-2xl bg-white p-5 text-slate-950">
                  <p className="text-lg font-bold">Want the full report?</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Offer a $49 PulseIQ Mini Audit with a custom PDF, revenue leak breakdown, and action plan.
                  </p>
                  <Button className="mt-4 rounded-2xl px-5 py-5">
                    Request My $49 Audit <Download className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
}

function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", variant = "default" }) {
  const base = "inline-flex items-center justify-center font-semibold transition";
  const styles =
    variant === "outline"
      ? "border border-slate-600 bg-transparent text-white hover:bg-white hover:text-slate-950"
      : "bg-cyan-400 text-slate-950 hover:bg-cyan-300";

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
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

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
