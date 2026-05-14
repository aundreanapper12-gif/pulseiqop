"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
    label: "General",
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

    const chartData = leaks.slice(0, 5).map((leak) => ({
      name: leak.label.replace(" Revenue", ""),
      value: Math.round(leak.amount),
    }));

    const improvementData = [
      { label: "Now", leak: Math.round(estimatedMonthlyLeak) },
      { label: "30 Days", leak: Math.round(estimatedMonthlyLeak * 0.75) },
      { label: "60 Days", leak: Math.round(estimatedMonthlyLeak * 0.55) },
      { label: "90 Days", leak: Math.round(estimatedMonthlyLeak * 0.35) },
    ];

    const beforeAfter = {
      current: Math.round(estimatedMonthlyLeak),
      improved: Math.round(estimatedMonthlyLeak * 0.35),
      recovered: Math.round(estimatedMonthlyLeak * 0.65),
    };

    return {
      estimatedMonthlyLeak,
      annualLeak,
      leakPercent,
      score,
      riskLevel,
      leaks,
      chartData,
      improvementData,
      beforeAfter,
      recommendations: recommendations.slice(0, 3),
      focus: industryPresets[form.industry].focus,
    };
  }, [form]);

  const handleLeadSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadSaved(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1ea] text-[#231a16]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-[#e9b44c]/30 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-[#7a5cff]/20 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[30%] h-[26rem] w-[26rem] rounded-full bg-[#2fbf9b]/20 blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-14">
        <nav className="mb-12 flex items-center justify-between rounded-full border border-[#231a16]/10 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 font-black tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#231a16] text-[#f7f1ea]">P</div>
            PulseIQ Operations
          </div>
          <a href="#pricing" className="hidden rounded-full bg-[#231a16] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#3b2c26] sm:block">
            Get Audit
          </a>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9b44c]/50 bg-[#fff8e8] px-4 py-2 text-sm font-bold text-[#7c5418] shadow-sm">
              <Sparkles className="h-4 w-4" /> Free Business Revenue Scan
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-[#231a16] md:text-7xl">
              Find the hidden leaks draining your business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c504b]">
              PulseIQ turns missed leads, slow response times, cancellations, complaints, and workflow waste into a simple business health score and revenue-risk estimate.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#scanner" className="inline-flex items-center justify-center rounded-2xl bg-[#231a16] px-7 py-4 font-extrabold text-white shadow-xl shadow-[#231a16]/20 transition hover:-translate-y-0.5 hover:bg-[#3b2c26]">
                Run Free Scan <Calculator className="ml-2 h-5 w-5" />
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center rounded-2xl border border-[#231a16]/15 bg-white/70 px-7 py-4 font-extrabold text-[#231a16] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                See Audit Options <Mail className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          <Card className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-2xl shadow-[#231a16]/10 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#e9b44c] via-[#7a5cff] to-[#2fbf9b]" />
            <CardContent className="p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8b7a70]">Estimated Monthly Leak</p>
                  <p className="mt-3 text-5xl font-black tracking-tight text-[#231a16]">{money(results.estimatedMonthlyLeak)}</p>
                  <p className="mt-2 text-sm font-semibold text-[#7a6b62]">About {results.leakPercent}% of monthly revenue entered</p>
                </div>
                <div className="rounded-3xl bg-[#fff1c7] p-4 text-[#7c5418]">
                  <TrendingDown className="h-10 w-10" />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-[#231a16] p-5 text-white shadow-lg">
                  <p className="text-sm text-white/60">Health Score</p>
                  <p className="mt-1 text-4xl font-black">{results.score}/100</p>
                </div>
                <div className="rounded-3xl bg-[#f2e8dc] p-5 shadow-inner">
                  <p className="text-sm text-[#7a6b62]">Risk Level</p>
                  <p className="mt-1 text-3xl font-black text-[#231a16]">{results.riskLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <section className="mt-12 grid gap-4 md:grid-cols-4">
          <Feature icon={<ShieldCheck />} title="Health Score" text="See how risky the current workflow may be." />
          <Feature icon={<TrendingDown />} title="Leak Estimate" text="Translate missed opportunities into dollars." />
          <Feature icon={<Zap />} title="Automation Ideas" text="Spot repetitive work that can be simplified." />
          <Feature icon={<Users />} title="CX Risk" text="Find customer experience gaps quickly." />
        </section>

        <section id="scanner" className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[2rem] border border-[#231a16]/10 bg-white/85 text-[#231a16] shadow-2xl shadow-[#231a16]/8 backdrop-blur">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Free Revenue Leak Scan</h2>
                  <p className="mt-2 text-[#6a5c55]">Choose a preset or enter your own numbers. Results update instantly.</p>
                </div>
                <div className="hidden rounded-2xl bg-[#f7f1ea] p-3 text-[#7a5cff] sm:block">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {(Object.keys(industryPresets) as IndustryKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`rounded-full border px-4 py-2 text-sm font-extrabold transition ${
                      form.industry === key ? "border-[#231a16] bg-[#231a16] text-white shadow-lg" : "border-[#ded1c4] bg-[#fbf7f2] text-[#66564d] hover:border-[#231a16]/40 hover:bg-white"
                    }`}
                  >
                    {industryPresets[key].label}
                  </button>
                ))}
              </div>

              <div className="mt-7 grid gap-4">
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
            <Card className="overflow-hidden rounded-[2rem] bg-[#231a16] text-white shadow-2xl shadow-[#231a16]/20">
              <div className="h-2 bg-gradient-to-r from-[#e9b44c] via-[#7a5cff] to-[#2fbf9b]" />
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-[#e9b44c]"><BarChart3 className="h-6 w-6" /></div>
                  <h2 className="text-2xl font-black">Your PulseIQ Results</h2>
                </div>
                <p className="mt-4 text-white/65">For this business type, PulseIQ is watching for {results.focus}.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Metric label="Monthly Leak" value={money(results.estimatedMonthlyLeak)} />
                  <Metric label="Annual Risk" value={money(results.annualLeak)} />
                  <Metric label="Score" value={`${results.score}/100`} />
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/8 p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-[#e9b44c]/20 p-2 text-[#ffd275]"><AlertTriangle className="h-5 w-5" /></div>
                    <div>
                      <p className="font-black">Biggest Leak: {results.leaks[0].label}</p>
                      <p className="mt-1 text-sm leading-6 text-white/60">{results.leaks[0].note}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-[#231a16]/10 bg-white/85 text-[#231a16] shadow-xl backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-black">Top Revenue Leaks</h3>
                <div className="mt-5 grid gap-3">
                  {results.leaks.slice(0, 3).map((leak, index) => (
                    <div key={leak.label} className="rounded-3xl border border-[#eadfd3] bg-[#fbf7f2] p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#231a16] text-sm font-black text-white">{index + 1}</div>
                          <p className="font-black">{leak.label}</p>
                        </div>
                        <p className="font-black text-[#7a5cff]">{money(leak.amount)}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6a5c55]">{leak.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-[#2fbf9b]/20 bg-[#e8fff8] text-[#12392f] shadow-xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-black">Top 3 Recommendations</h3>
                <div className="mt-5 grid gap-3">
                  {results.recommendations.map((rec) => (
                    <div key={rec} className="flex gap-3 rounded-3xl bg-white/75 p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#179575]" />
                      <p className="font-semibold leading-6 text-[#244b42]">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[2rem] border border-[#231a16]/10 bg-white/85 p-6 shadow-2xl shadow-[#231a16]/8 backdrop-blur md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-black uppercase tracking-[0.25em] text-[#7a5cff]">Leak Breakdown</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Where the money is slipping away</h2>
              </div>
              <div className="rounded-2xl bg-[#f7f1ea] p-3 text-[#7a5cff]"><BarChart3 className="h-6 w-6" /></div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results.chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value: number) => money(value)} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {results.chartData.map((_, index) => (
                      <Cell key={index} fill={["#7a5cff", "#e85d75", "#2fbf9b", "#e9b44c", "#231a16"][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-[2rem] bg-[#231a16] p-6 text-white shadow-2xl shadow-[#231a16]/20 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-black uppercase tracking-[0.25em] text-[#e9b44c]">90-Day Preview</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">What improvement could look like</h2>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 text-[#e9b44c]"><TrendingDown className="h-6 w-6" /></div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.improvementData}>
                  <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,.65)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,.45)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value: number) => money(value)} contentStyle={{ borderRadius: 16 }} />
                  <Area type="monotone" dataKey="leak" stroke="#e9b44c" strokeWidth={4} fill="#e9b44c" fillOpacity={0.22} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <Card className="rounded-[2rem] border border-[#231a16]/10 bg-white/85 p-6 shadow-xl backdrop-blur md:p-8 lg:col-span-2">
            <p className="font-black uppercase tracking-[0.25em] text-[#2fbf9b]">Before vs. After</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">A practical recovery target</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-[#fff3f0] p-5">
                <p className="text-sm font-bold text-[#8b5148]">Current Monthly Leak</p>
                <p className="mt-2 text-3xl font-black text-[#e85d75]">{money(results.beforeAfter.current)}</p>
              </div>
              <div className="rounded-3xl bg-[#f3efff] p-5">
                <p className="text-sm font-bold text-[#5c4e9c]">Potential Recovery</p>
                <p className="mt-2 text-3xl font-black text-[#7a5cff]">{money(results.beforeAfter.recovered)}</p>
              </div>
              <div className="rounded-3xl bg-[#e8fff8] p-5">
                <p className="text-sm font-bold text-[#16745e]">Improved Leak Target</p>
                <p className="mt-2 text-3xl font-black text-[#179575]">{money(results.beforeAfter.improved)}</p>
              </div>
            </div>
            <p className="mt-5 leading-7 text-[#6a5c55]">
              This preview assumes the business reduces missed leads, slow follow-up, manual work, and preventable cancellations over 90 days. It is an estimate, not a guarantee.
            </p>
          </Card>

          <Card className="rounded-[2rem] border border-[#231a16]/10 bg-white/85 p-6 shadow-xl backdrop-blur md:p-8">
            <p className="font-black uppercase tracking-[0.25em] text-[#7a5cff]">Report Preview</p>
            <div className="mt-5 rounded-3xl bg-[#f7f1ea] p-5 shadow-inner">
              <FileText className="h-9 w-9 text-[#7a5cff]" />
              <h3 className="mt-4 text-2xl font-black">Mini Audit PDF</h3>
              <p className="mt-2 text-sm leading-6 text-[#6a5c55]">Includes leak breakdown, recommended workflow changes, KPI tracker, and a 30-day action plan.</p>
              <button className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#231a16] px-5 py-4 font-black text-white">
                Download Sample <Download className="ml-2 h-5 w-5" />
              </button>
            </div>
          </Card>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="rounded-[2rem] border border-[#231a16]/10 bg-white/85 p-6 text-[#231a16] shadow-2xl shadow-[#231a16]/8 backdrop-blur md:p-8">
            <h2 className="text-3xl font-black tracking-tight">Get the Full PulseIQ Report</h2>
            <p className="mt-2 text-[#6a5c55]">Use this as your lead magnet. Later, connect it to Formspree, Google Sheets, Notion, or Stripe.</p>
            <form onSubmit={handleLeadSubmit} className="mt-6 grid gap-4">
              <Input label="Your Name" value={lead.name} onChange={(v) => setLead((prev) => ({ ...prev, name: v }))} placeholder="Your name" />
              <Input label="Email Address" value={lead.email} onChange={(v) => setLead((prev) => ({ ...prev, email: v }))} placeholder="you@email.com" />
              <button className="rounded-2xl bg-[#231a16] px-5 py-4 font-black text-white shadow-xl shadow-[#231a16]/20 transition hover:-translate-y-0.5 hover:bg-[#3b2c26]">
                Send Me My Full Report
              </button>
              {leadSaved && <p className="rounded-2xl bg-[#e8fff8] p-4 text-sm font-bold text-[#16745e]">Lead captured on page. Next step: connect this form to a real email tool.</p>}
            </form>
          </Card>

          <Card className="rounded-[2rem] bg-[#231a16] p-6 text-white shadow-2xl shadow-[#231a16]/20 md:p-8">
            <h2 className="text-3xl font-black tracking-tight">How PulseIQ Works</h2>
            <div className="mt-6 grid gap-4">
              <Step number="1" title="Scan" text="Enter business basics like missed leads, customer value, response time, and manual work." />
              <Step number="2" title="Score" text="PulseIQ converts operational issues into a business health score and estimated revenue risk." />
              <Step number="3" title="Improve" text="Use the top recommendations to reduce missed revenue, improve follow-up, and simplify workflows." />
            </div>
          </Card>
        </section>

        <section id="pricing" className="mt-12">
          <div className="mb-7 text-center">
            <p className="font-black uppercase tracking-[0.25em] text-[#7a5cff]">Audit Options</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-[#231a16]">Simple ways to turn leaks into action.</h2>
            <p className="mt-3 text-[#6a5c55]">Start free, then upgrade when a business wants deeper help.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <Pricing title="Free Scan" price="$0" text="Instant business score and revenue leak estimate." />
            <Pricing title="Mini Audit PDF" price="$49" text="Custom PDF with findings, top leaks, and action steps." featured />
            <Pricing title="Custom Dashboard" price="$149" text="Spreadsheet dashboard for tracking leaks, KPIs, and improvements." />
            <Pricing title="Monthly Review" price="$299/mo" text="Ongoing operations review, score tracking, and improvement plan." />
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#231a16] via-[#35251f] to-[#5d3d22] p-8 text-center text-white shadow-2xl shadow-[#231a16]/20 md:p-12">
          <p className="font-black uppercase tracking-[0.25em] text-[#e9b44c]">PulseIQ Operations</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-tight">A small business tool that makes operational problems visible.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/65">
            Turn missed leads, delayed follow-up, and messy workflows into clear numbers, practical recommendations, and better business decisions.
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
    <div className="rounded-[1.7rem] border border-[#231a16]/10 bg-white/70 p-5 shadow-lg shadow-[#231a16]/5 backdrop-blur transition hover:-translate-y-1 hover:bg-white">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#231a16] text-[#e9b44c]">{icon}</div>
      <h3 className="font-black text-[#231a16]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#6a5c55]">{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-3xl bg-white/8 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9b44c] font-black text-[#231a16]">{number}</div>
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/60">{text}</p>
      </div>
    </div>
  );
}

function Pricing({ title, price, text, featured = false }: { title: string; price: string; text: string; featured?: boolean }) {
  return (
    <div className={`rounded-[1.7rem] p-6 shadow-xl transition hover:-translate-y-1 ${featured ? "bg-[#231a16] text-white shadow-[#231a16]/20" : "border border-[#231a16]/10 bg-white/75 text-[#231a16] shadow-[#231a16]/5 backdrop-blur"}`}>
      <p className={`text-sm font-black uppercase tracking-wide ${featured ? "text-[#e9b44c]" : "text-[#7a5cff]"}`}>{title}</p>
      <p className="mt-3 text-4xl font-black">{price}</p>
      <p className={`mt-3 text-sm leading-6 ${featured ? "text-white/65" : "text-[#6a5c55]"}`}>{text}</p>
      <button className={`mt-6 w-full rounded-2xl px-4 py-3 font-black ${featured ? "bg-[#e9b44c] text-[#231a16]" : "bg-[#231a16] text-white"}`}>Choose Plan</button>
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
      <span className="text-sm font-black text-[#4a3d37]">{label}</span>
      <input
        className="rounded-2xl border border-[#ded1c4] bg-[#fffaf5] px-4 py-3 font-semibold text-[#231a16] outline-none transition placeholder:text-[#a99c92] focus:border-[#7a5cff] focus:bg-white focus:ring-4 focus:ring-[#7a5cff]/10"
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
    <div className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
