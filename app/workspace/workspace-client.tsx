"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCopy,
  Download,
  FileDown,
  Gauge,
  History,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Upload,
  WalletCards,
  Wrench,
} from "lucide-react";
import {
  analyzeBusiness,
  BusinessInputs,
  costCategories,
  defaultInputs,
  demoInputs,
  money,
  NumericKey,
} from "./model";

type Snapshot = {
  id: string;
  createdAt: string;
  inputs: BusinessInputs;
};

const SNAPSHOT_KEY = "pulseiq:snapshots:v1";
const DRAFT_KEY = "pulseiq:draft:v1";

const categoryAliases: Record<string, [NumericKey, NumericKey]> = {
  payroll: ["payroll", "payrollTarget"],
  overtime: ["overtime", "overtimeTarget"],
  marketing: ["marketing", "marketingTarget"],
  refunds: ["refunds", "refundsTarget"],
  returns: ["refunds", "refundsTarget"],
  software: ["software", "softwareTarget"],
  subscriptions: ["software", "softwareTarget"],
  shipping: ["fulfillment", "fulfillmentTarget"],
  fulfillment: ["fulfillment", "fulfillmentTarget"],
  inventory: ["supplies", "suppliesTarget"],
  supplies: ["supplies", "suppliesTarget"],
  rent: ["facilities", "facilitiesTarget"],
  facilities: ["facilities", "facilitiesTarget"],
  contractors: ["contractors", "contractorsTarget"],
  outsourcing: ["contractors", "contractorsTarget"],
  other: ["other", "otherTarget"],
};

function cleanNumber(value: unknown) {
  const parsed = Number(String(value ?? "").replace(/[$,%\s]/g, ""));
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function NumericInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-black/65">{label}</span>
      {hint ? <span className="ml-2 text-xs font-semibold text-black/35">{hint}</span> : null}
      <div className="mt-2 flex items-center rounded-2xl border border-black/10 bg-[#faf8f4] px-4 focus-within:border-black/45 focus-within:bg-white">
        {prefix ? <span className="font-black text-black/30">{prefix}</span> : null}
        <input
          type="number"
          min="0"
          step="any"
          value={value || ""}
          onChange={(event) => onChange(cleanNumber(event.target.value))}
          className="w-full bg-transparent px-2 py-3 font-bold outline-none"
          placeholder="0"
        />
        {suffix ? <span className="font-black text-black/30">{suffix}</span> : null}
      </div>
    </label>
  );
}

function StatCard({
  label,
  value,
  note,
  dark = false,
}: {
  label: string;
  value: string;
  note: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.6rem] border p-5 ${
        dark ? "border-white/10 bg-white/[0.07] text-white" : "border-black/10 bg-white text-black"
      }`}
    >
      <p className={`text-[11px] font-black uppercase tracking-[0.18em] ${dark ? "text-white/40" : "text-black/35"}`}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
      <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/50" : "text-black/48"}`}>{note}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-black/35">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-3 leading-7 text-black/52">{body}</p>
    </div>
  );
}

export default function WorkspaceClient() {
  const [inputs, setInputs] = useState<BusinessInputs>(defaultInputs);
  const [recoveryPct, setRecoveryPct] = useState(50);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [status, setStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const analysis = useMemo(() => analyzeBusiness(inputs, recoveryPct), [inputs, recoveryPct]);

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      const savedSnapshots = window.localStorage.getItem(SNAPSHOT_KEY);
      if (savedDraft) setInputs({ ...defaultInputs, ...JSON.parse(savedDraft) });
      if (savedSnapshots) setSnapshots(JSON.parse(savedSnapshots));
    } catch {
      // A blocked or cleared browser store should never break the diagnostic.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(inputs));
    } catch {
      // Keep the workspace usable even when storage is disabled.
    }
  }, [inputs, hydrated]);

  const setValue = <K extends keyof BusinessInputs>(key: K, value: BusinessInputs[K]) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const saveSnapshots = (next: Snapshot[]) => {
    setSnapshots(next);
    try {
      window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(next));
    } catch {
      setStatus("Your browser blocked local storage. The current analysis still works, but history could not be saved.");
    }
  };

  const saveSnapshot = () => {
    if (!inputs.businessName.trim() || inputs.revenue <= 0) {
      setStatus("Add a business name and monthly revenue before saving a snapshot.");
      return;
    }
    const snapshot: Snapshot = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      inputs,
    };
    const next = [snapshot, ...snapshots].slice(0, 12);
    saveSnapshots(next);
    setStatus("Snapshot saved in this browser. PulseIQ keeps up to 12 local snapshots.");
  };

  const loadSnapshot = (snapshot: Snapshot) => {
    setInputs({ ...defaultInputs, ...snapshot.inputs });
    setStatus(`Loaded ${snapshot.inputs.businessName} — ${snapshot.inputs.reportingPeriod}.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteSnapshot = (id: string) => {
    saveSnapshots(snapshots.filter((snapshot) => snapshot.id !== id));
    setStatus("Saved snapshot removed from this browser.");
  };

  const loadDemo = () => {
    setInputs(demoInputs);
    setRecoveryPct(50);
    setStatus("Demo business loaded. Every number is fictional and safe to explore.");
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const resetWorkspace = () => {
    setInputs(defaultInputs);
    setRecoveryPct(50);
    setStatus("Current workspace cleared. Saved snapshots were left alone.");
  };

  const downloadTemplate = () => {
    const rows = [
      "category,actual,target",
      "payroll,24500,21500",
      "overtime,6200,3000",
      "marketing,9200,7500",
      "refunds,4200,1800",
      "software,2800,2200",
      "fulfillment,3100,3000",
      "supplies,8900,7800",
      "facilities,5200,5200",
      "contractors,4400,3600",
      "other,1800,1500",
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pulseiq-cost-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCsv = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split(/\r?\n/).map((row) => row.trim()).filter(Boolean);
      if (rows.length < 2) {
        setStatus("That CSV does not contain enough rows to analyze.");
        return;
      }

      const headers = rows[0].split(",").map((value) => value.trim().toLowerCase());
      const categoryIndex = headers.indexOf("category");
      const actualIndex = headers.indexOf("actual");
      const targetIndex = headers.indexOf("target");
      if (categoryIndex < 0 || actualIndex < 0 || targetIndex < 0) {
        setStatus("Use a CSV with columns named category, actual, and target. The PulseIQ template has the correct format.");
        return;
      }

      const patch: Partial<Record<NumericKey, number>> = {};
      let matched = 0;
      rows.slice(1).forEach((row) => {
        const cells = row.split(",").map((value) => value.trim());
        const normalized = (cells[categoryIndex] || "").toLowerCase().replace(/[^a-z]/g, "");
        const mapping = categoryAliases[normalized];
        if (!mapping) return;
        patch[mapping[0]] = cleanNumber(cells[actualIndex]);
        patch[mapping[1]] = cleanNumber(cells[targetIndex]);
        matched += 1;
      });

      setInputs((current) => ({ ...current, ...patch }));
      setStatus(
        matched > 0
          ? `Imported ${matched} cost categories from ${file.name}. Add revenue and operating metrics to complete the picture.`
          : "No recognized categories were found. Download the PulseIQ template and try again.",
      );
    } catch {
      setStatus("PulseIQ could not read that CSV. Download the template and try again.");
    } finally {
      event.target.value = "";
    }
  };

  const reportText = useMemo(() => {
    const lines = [
      "PULSEIQ BUSINESS MONEY LEAK REPORT",
      "",
      `Business: ${inputs.businessName || "Business"}`,
      `Industry: ${inputs.industry || "Not provided"}`,
      `Reporting period: ${inputs.reportingPeriod || "Not provided"}`,
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "EXECUTIVE SUMMARY",
      analysis.executiveSummary,
      "",
      `Operations health score: ${analysis.score ? `${analysis.score}/100` : "Incomplete"}`,
      `Direct cost overruns: ${money(analysis.directLeakTotal)}/month`,
      `Modeled operational opportunity: ${money(analysis.modeledOpportunityTotal)}/month`,
      `Total monthly opportunity: ${money(analysis.totalOpportunity)}`,
      `Annualized opportunity: ${money(analysis.annualOpportunity)}`,
      `Estimated operating profit: ${money(analysis.operatingProfit)}`,
      `Estimated operating margin: ${analysis.operatingMargin.toFixed(1)}%`,
      "",
      "PRIORITY FINDINGS",
      ...analysis.leaks.flatMap((leak, index) => [
        `${index + 1}. ${leak.name} — ${money(leak.amount)}/month — ${leak.severity} — ${leak.confidence} confidence`,
        `Signal: ${leak.signal}`,
        `First move: ${leak.firstMove}`,
        `Measure: ${leak.measure}`,
        "",
      ]),
      "RECOVERY SCENARIO",
      `${recoveryPct}% recovery: ${money(analysis.recoverableAtScenario)}/month potential improvement`,
      `Projected operating profit: ${money(analysis.projectedProfit)}`,
      `Projected operating margin: ${analysis.projectedMargin.toFixed(1)}%`,
      "",
      "IMPORTANT",
      "PulseIQ identifies financial and operational signals from the data entered. A variance is not proof of waste or causation. Modeled opportunities are planning estimates, not guaranteed savings or revenue.",
    ];
    return lines.join("\n");
  }, [analysis, inputs, recoveryPct]);

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setStatus("Executive report copied to your clipboard.");
    } catch {
      setStatus("Your browser blocked clipboard access. Use Download Report instead.");
    }
  };

  const downloadReport = () => {
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pulseiq-${(inputs.businessName || "business").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Executive report downloaded.");
  };

  const highestAmount = Math.max(1, ...analysis.leaks.map((leak) => leak.amount));
  const ready = inputs.revenue > 0 && costCategories.some((category) => Number(inputs[category.actual]) > 0);

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4efe7]/90 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white shadow-lg"><Sparkles size={18} /></span>
            <span>
              <span className="block text-lg leading-none">PulseIQ</span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.22em] text-black/35">Business Workspace</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/" className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2.5 text-sm font-black sm:inline-flex"><ArrowLeft size={15} /> Home</a>
            <a href="/request" className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-black text-white">Get deeper analysis <ArrowRight size={15} /></a>
          </div>
        </div>
      </header>

      <section className="px-5 pb-12 pt-12 md:px-8 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-black"><BriefcaseBusiness size={16} /> Owner-level profit intelligence</div>
              <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.97] tracking-[-0.045em] md:text-7xl">Put your business numbers in. See where money may be leaking.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/58">PulseIQ turns actuals, targets, missed opportunities, and rework into a ranked decision list. It tells you what the signal means, what to investigate next, what to fix first, and which metric should prove the fix worked.</p>
            </div>
            <div className="rounded-[2rem] bg-black p-6 text-white shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-black"><ShieldCheck size={19} /></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Private-by-default workspace</p>
                  <p className="mt-3 font-bold leading-7 text-white/75">Your draft and saved snapshots stay in this browser. The free workspace does not upload your financial data to a PulseIQ server.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-white/50">
                <span className="rounded-full border border-white/10 px-3 py-2">No bank login</span>
                <span className="rounded-full border border-white/10 px-3 py-2">No card data</span>
                <span className="rounded-full border border-white/10 px-3 py-2">No hidden benchmark</span>
              </div>
            </div>
          </div>

          {status ? (
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-black/10 bg-white/75 p-4 text-sm font-bold leading-6 text-black/60 shadow-sm">
              <CheckCircle2 className="mt-0.5 shrink-0" size={18} /> {status}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 xl:grid-cols-[1fr_380px]">
          <div className="space-y-7">
            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="1 · Business profile" title="Give the numbers context." body="PulseIQ does not use a one-size-fits-all industry benchmark in the free workspace. Your targets, budgets, forecasts, and operating context are the baseline." />
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-sm font-black text-black/65">Business name</span>
                  <input value={inputs.businessName} onChange={(event) => setValue("businessName", event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold outline-none focus:border-black/45" placeholder="Your business" />
                </label>
                <label>
                  <span className="text-sm font-black text-black/65">Industry</span>
                  <input value={inputs.industry} onChange={(event) => setValue("industry", event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold outline-none focus:border-black/45" placeholder="Home services, agency, retail..." />
                </label>
                <label>
                  <span className="text-sm font-black text-black/65">Reporting period</span>
                  <input value={inputs.reportingPeriod} onChange={(event) => setValue("reportingPeriod", event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold outline-none focus:border-black/45" placeholder="August 2026" />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <NumericInput label="Employees" value={inputs.employees} onChange={(value) => setValue("employees", value)} />
                  <NumericInput label="Locations" value={inputs.locations} onChange={(value) => setValue("locations", value)} />
                </div>
              </div>
            </section>

            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <SectionHeading eyebrow="2 · Financial baseline" title="Actual versus target, in dollars." body="A direct cost leak is only flagged when an entered actual is above an entered target. If you leave a target blank, PulseIQ does not invent one." />
                <div className="flex shrink-0 flex-wrap gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-black text-white"><Upload size={16} /> Import CSV<input type="file" accept=".csv,text/csv" onChange={handleCsv} className="hidden" /></label>
                  <button type="button" onClick={downloadTemplate} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-3 text-sm font-black"><Download size={16} /> Template</button>
                </div>
              </div>

              <div className="mt-7 rounded-[1.8rem] bg-black p-5 text-white">
                <div className="grid gap-4 sm:grid-cols-2">
                  <NumericInput label="Actual Revenue" value={inputs.revenue} onChange={(value) => setValue("revenue", value)} prefix="$" />
                  <NumericInput label="Revenue Target" value={inputs.revenueTarget} onChange={(value) => setValue("revenueTarget", value)} prefix="$" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {costCategories.map((category) => (
                  <div key={category.id} className="grid gap-3 rounded-[1.5rem] border border-black/[0.07] bg-[#faf8f4] p-4 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center">
                    <div>
                      <p className="font-black">{category.name}</p>
                      <p className="mt-1 text-xs font-semibold text-black/35">Monthly amount</p>
                    </div>
                    <NumericInput label="Actual" value={Number(inputs[category.actual])} onChange={(value) => setValue(category.actual, value)} prefix="$" />
                    <NumericInput label="Target" value={Number(inputs[category.target])} onChange={(value) => setValue(category.target, value)} prefix="$" />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="3 · Operational opportunity" title="Catch money that never reaches the P&L cleanly." body="These optional models estimate missed opportunity and repeat-work cost. PulseIQ labels them as modeled—not as guaranteed lost revenue." />
              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.8rem] border border-black/10 bg-[#f4efe7] p-5">
                  <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><TrendingDown size={18} /></span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Revenue capture</p><h3 className="text-xl font-black">Missed leads</h3></div></div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumericInput label="Monthly Leads" value={inputs.monthlyLeads} onChange={(value) => setValue("monthlyLeads", value)} />
                    <NumericInput label="Missed / Unanswered" value={inputs.missedContactPct} onChange={(value) => setValue("missedContactPct", Math.min(100, value))} suffix="%" />
                    <NumericInput label="Conversion Rate" value={inputs.conversionRate} onChange={(value) => setValue("conversionRate", Math.min(100, value))} suffix="%" />
                    <NumericInput label="Avg. Customer Value" value={inputs.avgCustomerValue} onChange={(value) => setValue("avgCustomerValue", value)} prefix="$" />
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-black/10 bg-[#f4efe7] p-5">
                  <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Wrench size={18} /></span><div><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Process quality</p><h3 className="text-xl font-black">Rework / repeat service</h3></div></div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <NumericInput label="Completed Jobs" value={inputs.completedJobs} onChange={(value) => setValue("completedJobs", value)} />
                    <NumericInput label="Rework Rate" value={inputs.reworkPct} onChange={(value) => setValue("reworkPct", Math.min(100, value))} suffix="%" />
                    <div className="sm:col-span-2"><NumericInput label="Direct Cost Per Rework" value={inputs.reworkCostPerJob} onChange={(value) => setValue("reworkCostPerJob", value)} prefix="$" hint="labor + material + travel if known" /></div>
                  </div>
                </div>
              </div>
            </section>

            <section id="results" className="rounded-[2.2rem] bg-[#111] p-6 text-white shadow-2xl md:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/35">4 · PulseIQ executive diagnostic</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{inputs.businessName || "Your business"}: where to look first.</h2>
                  <p className="mt-4 leading-7 text-white/58">{analysis.executiveSummary}</p>
                </div>
                <div className={`rounded-full px-4 py-2 text-sm font-black ${analysis.risk === "High" ? "bg-red-400/15 text-red-200" : analysis.risk === "Moderate" ? "bg-amber-300/15 text-amber-200" : analysis.risk === "Controlled" ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-white/55"}`}>
                  {analysis.risk} risk signal
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard dark label="Health Score" value={analysis.score ? `${analysis.score}/100` : "—"} note="Prioritization signal, not a rating" />
                <StatCard dark label="Direct Overruns" value={money(analysis.directLeakTotal)} note="Actual spending above entered targets" />
                <StatCard dark label="Modeled Opportunity" value={money(analysis.modeledOpportunityTotal)} note="Completed lead + rework models" />
                <StatCard dark label="Annualized Impact" value={money(analysis.annualOpportunity)} note="If this monthly pattern persists" />
              </div>

              {analysis.warnings.length > 0 ? (
                <div className="mt-5 rounded-[1.6rem] border border-amber-300/20 bg-amber-200/[0.08] p-5">
                  <div className="flex items-center gap-2 font-black text-amber-100"><AlertTriangle size={18} /> Data-quality checks</div>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-amber-50/65">
                    {analysis.warnings.map((warning) => <p key={warning}>• {warning}</p>)}
                  </div>
                </div>
              ) : null}

              <div className="mt-7 grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
                <div>
                  <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Money leak ranking</p><h3 className="mt-2 text-2xl font-black">Largest dollar signals first</h3></div><BarChart3 className="text-white/30" /></div>
                  <div className="mt-5 space-y-4">
                    {analysis.leaks.length ? analysis.leaks.map((leak, index) => (
                      <article key={leak.id} className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-black text-white/30">#{index + 1}</span><h4 className="text-xl font-black">{leak.name}</h4><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white/55">{leak.type === "direct" ? "Direct variance" : "Modeled"}</span><span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white/55">{leak.confidence} confidence</span></div>
                            <p className="mt-3 text-sm font-semibold leading-6 text-white/60">{leak.signal}</p>
                          </div>
                          <div className="shrink-0 sm:text-right"><p className="text-2xl font-black">{money(leak.amount)}</p><p className="text-xs font-bold text-white/35">{money(leak.annual)} annualized</p></div>
                        </div>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${Math.max(4, (leak.amount / highestAmount) * 100)}%` }} /></div>
                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                          <div className="rounded-2xl bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-white/30">Why this matters</p><p className="mt-2 text-sm leading-6 text-white/58">{leak.whyItMatters}</p></div>
                          <div className="rounded-2xl bg-white/[0.06] p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-white/30">First move</p><p className="mt-2 text-sm font-bold leading-6 text-white/75">{leak.firstMove}</p></div>
                        </div>
                        <details className="mt-4 rounded-2xl border border-white/10 p-4"><summary className="cursor-pointer font-black text-white/75">Show root-cause questions</summary><div className="mt-3 space-y-2 text-sm leading-6 text-white/55">{leak.investigate.map((item) => <p key={item}>• {item}</p>)}</div><p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/60"><strong className="text-white/80">Prove the fix with:</strong> {leak.measure}</p></details>
                      </article>
                    )) : (
                      <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6"><CheckCircle2 className="text-emerald-300" /><p className="mt-4 text-xl font-black">No completed leak signal yet.</p><p className="mt-2 text-white/50">Enter revenue, actual costs, and targets—or load the demo—to see the ranked analysis.</p></div>
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[1.8rem] bg-white p-5 text-black">
                    <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Recovery scenario</p><h3 className="mt-1 text-2xl font-black">What if you recover {recoveryPct}%?</h3></div><Gauge className="text-black/30" /></div>
                    <input type="range" min="25" max="100" step="25" value={recoveryPct} onChange={(event) => setRecoveryPct(Number(event.target.value))} className="mt-6 w-full accent-black" />
                    <div className="mt-2 flex justify-between text-xs font-black text-black/30"><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1"><StatCard label="Potential Recovery" value={money(analysis.recoverableAtScenario)} note="Monthly planning scenario" /><StatCard label="Projected Margin" value={`${analysis.projectedMargin.toFixed(1)}%`} note={`${money(analysis.projectedProfit)} projected operating profit`} /></div>
                    <p className="mt-4 text-xs leading-5 text-black/40">Recovery scenarios are not forecasts or guarantees. Implementation cost and business constraints are not automatically deducted.</p>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5">
                    <div className="flex items-center gap-3"><Lightbulb size={19} /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Fix-this-first plan</p><h3 className="text-xl font-black">Three moves, in order</h3></div></div>
                    <div className="mt-5 space-y-4">
                      {analysis.priorityPlan.length ? analysis.priorityPlan.map((item) => (
                        <div key={item.rank} className="rounded-2xl bg-black/25 p-4"><div className="flex items-center justify-between gap-3"><p className="font-black">{item.rank}. {item.name}</p><p className="font-black">{money(item.amount)}/mo</p></div><p className="mt-2 text-sm leading-6 text-white/60">{item.firstMove}</p><p className="mt-3 text-xs font-bold leading-5 text-white/35">Track: {item.measure}</p></div>
                      )) : <p className="text-sm leading-6 text-white/50">Complete the financial baseline to generate a prioritized plan.</p>}
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Operating picture</p>
                    <div className="mt-4 space-y-3 text-sm font-bold"><div className="flex justify-between gap-3"><span className="text-white/45">Revenue</span><span>{money(inputs.revenue)}</span></div><div className="flex justify-between gap-3"><span className="text-white/45">Entered operating costs</span><span>{money(analysis.totalExpenses)}</span></div><div className="flex justify-between gap-3"><span className="text-white/45">Estimated operating profit</span><span>{money(analysis.operatingProfit)}</span></div><div className="flex justify-between gap-3 border-t border-white/10 pt-3"><span className="text-white/45">Operating margin</span><span>{analysis.operatingMargin.toFixed(1)}%</span></div>{analysis.revenueGap > 0 ? <div className="flex justify-between gap-3"><span className="text-white/45">Revenue target gap</span><span>{money(analysis.revenueGap)}</span></div> : null}<div className="flex justify-between gap-3"><span className="text-white/45">Diagnostic completeness</span><span>{analysis.completeness}%</span></div></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Report tools" title="Take the finding into the meeting." body="Copy the executive report, download a plain-text record, or print the page to PDF. The report states the assumptions so a modeled opportunity is not presented as guaranteed savings." />
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={copyReport} className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 font-black text-white"><ClipboardCopy size={17} /> Copy Report</button>
                <button type="button" onClick={downloadReport} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 font-black"><FileDown size={17} /> Download Report</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 font-black"><Download size={17} /> Print / Save PDF</button>
                <a href="/request" className="inline-flex items-center gap-2 rounded-full bg-[#e9e1d5] px-5 py-3 font-black">Have PulseIQ investigate the cause <ArrowRight size={17} /></a>
              </div>
            </section>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Workspace</p><h2 className="mt-1 text-xl font-black">Controls</h2></div><WalletCards className="text-black/25" /></div>
              <div className="mt-5 grid gap-2">
                <button type="button" onClick={loadDemo} className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 font-black text-white"><Sparkles size={16} /> Load Demo Business</button>
                <button type="button" onClick={saveSnapshot} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-3 font-black"><Save size={16} /> Save Snapshot</button>
                <button type="button" onClick={resetWorkspace} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-3 font-black"><RotateCcw size={16} /> Clear Current Data</button>
              </div>
              <div className="mt-5 rounded-2xl bg-[#f4efe7] p-4"><div className="flex items-start gap-3"><LockKeyhole size={17} className="mt-0.5 shrink-0" /><p className="text-xs font-semibold leading-5 text-black/48">Saved snapshots are stored only in this browser. Clearing site data or changing devices removes them.</p></div></div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3"><History size={18} /><div><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Local history</p><h2 className="text-xl font-black">Saved snapshots</h2></div></div>
              <div className="mt-4 space-y-3">
                {snapshots.length ? snapshots.map((snapshot) => {
                  const result = analyzeBusiness(snapshot.inputs, 50);
                  return (
                    <div key={snapshot.id} className="rounded-2xl border border-black/10 bg-[#faf8f4] p-4">
                      <button type="button" onClick={() => loadSnapshot(snapshot)} className="w-full text-left"><p className="font-black">{snapshot.inputs.businessName}</p><p className="mt-1 text-xs font-semibold text-black/40">{snapshot.inputs.reportingPeriod} · {new Date(snapshot.createdAt).toLocaleDateString()}</p><div className="mt-3 flex items-center justify-between text-sm"><span className="text-black/45">Opportunity</span><span className="font-black">{money(result.totalOpportunity)}</span></div></button>
                      <button type="button" aria-label={`Delete ${snapshot.inputs.businessName} snapshot`} onClick={() => deleteSnapshot(snapshot.id)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-black/40 hover:text-black"><Trash2 size={13} /> Remove</button>
                    </div>
                  );
                }) : <p className="rounded-2xl bg-[#faf8f4] p-4 text-sm leading-6 text-black/45">No snapshots yet. Save a completed month so you can reload it later.</p>}
              </div>
            </div>

            <div className="rounded-[2rem] bg-black p-5 text-white shadow-xl">
              <Target size={20} />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/35">When the free scan is not enough</p>
              <h2 className="mt-2 text-2xl font-black">Find the cause behind the number.</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">A paid analysis can segment payroll, sales, refunds, contacts, schedules, vendors, or workflow data to test why the leak exists instead of guessing from a monthly total.</p>
              <a href="/request" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-black text-black">Choose an analysis <ArrowRight size={16} /></a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#e9e1d5] px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-[1.8rem] bg-white/70 p-6"><TrendingUp /><h2 className="mt-4 text-xl font-black">Dollar-first prioritization</h2><p className="mt-3 leading-7 text-black/52">PulseIQ ranks completed signals by monthly impact instead of burying owners under a wall of ratios.</p></div>
          <div className="rounded-[1.8rem] bg-white/70 p-6"><ShieldCheck /><h2 className="mt-4 text-xl font-black">Transparent math</h2><p className="mt-3 leading-7 text-black/52">Targets come from the business. Modeled opportunities are labeled. Revenue gaps stay separate from cost overruns.</p></div>
          <div className="rounded-[1.8rem] bg-white/70 p-6"><BriefcaseBusiness /><h2 className="mt-4 text-xl font-black">Built for action</h2><p className="mt-3 leading-7 text-black/52">Every finding points to a first investigation and the metric that should confirm whether the fix worked.</p></div>
        </div>
      </section>
    </main>
  );
}
