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
  Pencil,
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
import {
  applyExpensesToInputs,
  compareExpensePeriods,
  exactMoney,
  ExpenseEntry,
  expensePeriods,
  expensesInPeriod,
  formatExpensePeriod,
  MAX_EXPENSES,
  normalizeExpenseEntries,
  parseExpenseCsv,
  reviewExpensePatterns,
  summarizeExpenses,
  UNDATED_PERIOD,
} from "./expenses";
import { businessKey, MAX_RECOVERY_ACTIONS, normalizeRecoveryActions, RecoveryAction, recoveryObservation } from "./recovery";

type Snapshot = {
  id: string;
  createdAt: string;
  inputs: BusinessInputs;
  expenses?: ExpenseEntry[];
  useItemizedExpenses?: boolean;
  expensePeriod?: string;
};

const SNAPSHOT_KEY = "pulseiq:snapshots:v1";
const DRAFT_KEY = "pulseiq:draft:v1";
const EXPENSE_DRAFT_KEY = "pulseiq:expense-draft:v1";
const RECOVERY_KEY = "pulseiq:recovery-actions:v1";

const emptyExpense = { date: "", vendor: "", description: "", category: "other", amount: 0 };

const demoExpenses: ExpenseEntry[] = costCategories.map((category) => ({
  id: `demo-${category.id}`,
  date: "2026-08-15",
  vendor: `Sample ${category.name} expense`,
  description: "Fictional monthly total for demonstration",
  category: category.id,
  amount: Number(demoInputs[category.actual]),
}));

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
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const [selectedExpensePeriod, setSelectedExpensePeriod] = useState("");
  const [useItemizedExpenses, setUseItemizedExpenses] = useState(false);
  const [expenseDraft, setExpenseDraft] = useState<Omit<ExpenseEntry, "id">>(emptyExpense);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [visibleExpenseCount, setVisibleExpenseCount] = useState(25);
  const [recoveryPct, setRecoveryPct] = useState(50);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [recoveryActions, setRecoveryActions] = useState<RecoveryAction[]>([]);
  const [status, setStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const periods = useMemo(() => expensePeriods(expenses), [expenses]);
  const activeExpensePeriod = periods.includes(selectedExpensePeriod) ? selectedExpensePeriod : periods[0] || "";
  const currentExpenses = useMemo(() => expensesInPeriod(expenses, activeExpensePeriod), [expenses, activeExpensePeriod]);
  const expenseSummary = useMemo(() => summarizeExpenses(currentExpenses), [currentExpenses]);
  const expensePatterns = useMemo(() => reviewExpensePatterns(expenses), [expenses]);
  const periodComparison = useMemo(() => compareExpensePeriods(expenses, activeExpensePeriod), [expenses, activeExpensePeriod]);
  const analyzedInputs = useMemo(
    () => useItemizedExpenses ? applyExpensesToInputs(inputs, currentExpenses) : inputs,
    [inputs, currentExpenses, useItemizedExpenses],
  );
  const analysis = useMemo(() => analyzeBusiness(analyzedInputs, recoveryPct), [analyzedInputs, recoveryPct]);
  const spendingByCategory = useMemo(() => costCategories
    .map((category) => ({ ...category, amount: Number(analyzedInputs[category.actual]) || 0 }))
    .filter((category) => category.amount > 0)
    .sort((a, b) => b.amount - a.amount), [analyzedInputs]);
  const currentPeriodLabel = useItemizedExpenses ? formatExpensePeriod(activeExpensePeriod) : inputs.reportingPeriod;
  const visibleActions = useMemo(() => recoveryActions.filter((action) => action.business === businessKey(inputs.businessName)), [recoveryActions, inputs.businessName]);

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      const savedExpenses = window.localStorage.getItem(EXPENSE_DRAFT_KEY);
      const savedSnapshots = window.localStorage.getItem(SNAPSHOT_KEY);
      const savedRecovery = window.localStorage.getItem(RECOVERY_KEY);
      if (savedDraft) setInputs({ ...defaultInputs, ...JSON.parse(savedDraft) });
      if (savedExpenses) {
        const parsed = JSON.parse(savedExpenses);
        const restored = normalizeExpenseEntries(parsed?.expenses);
        setExpenses(restored);
        setSelectedExpensePeriod(typeof parsed?.expensePeriod === "string" ? parsed.expensePeriod : "");
        setUseItemizedExpenses(Boolean(parsed?.useItemizedExpenses && restored.length));
      }
      if (savedSnapshots) setSnapshots(JSON.parse(savedSnapshots));
      if (savedRecovery) setRecoveryActions(normalizeRecoveryActions(JSON.parse(savedRecovery)));
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

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(EXPENSE_DRAFT_KEY, JSON.stringify({ expenses, useItemizedExpenses, expensePeriod: activeExpensePeriod }));
    } catch {
      setStatus("This browser could not save the expense list. Download a report before leaving this page.");
    }
  }, [expenses, useItemizedExpenses, activeExpensePeriod, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(RECOVERY_KEY, JSON.stringify(recoveryActions));
    } catch {
      setStatus("This browser could not save the recovery plan. Export the report before leaving this page.");
    }
  }, [recoveryActions, hydrated]);

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
    if (!inputs.businessName.trim() || (inputs.revenue <= 0 && analysis.totalExpenses <= 0)) {
      setStatus("Add a business name and either revenue or expenses before saving a snapshot.");
      return;
    }
    const snapshot: Snapshot = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      inputs,
      expenses,
      useItemizedExpenses,
      expensePeriod: activeExpensePeriod,
    };
    const next = [snapshot, ...snapshots].slice(0, 12);
    saveSnapshots(next);
    setStatus("Snapshot saved in this browser. PulseIQ keeps up to 12 local snapshots.");
  };

  const loadSnapshot = (snapshot: Snapshot) => {
    setInputs({ ...defaultInputs, ...snapshot.inputs });
    const restored = normalizeExpenseEntries(snapshot.expenses);
    setExpenses(restored);
    setSelectedExpensePeriod(snapshot.expensePeriod || "");
    setUseItemizedExpenses(Boolean(snapshot.useItemizedExpenses && restored.length));
    setExpenseDraft(emptyExpense);
    setEditingExpenseId(null);
    setVisibleExpenseCount(25);
    setStatus(`Loaded ${snapshot.inputs.businessName} — ${snapshot.inputs.reportingPeriod}.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteSnapshot = (id: string) => {
    saveSnapshots(snapshots.filter((snapshot) => snapshot.id !== id));
    setStatus("Saved snapshot removed from this browser.");
  };

  const loadDemo = () => {
    setInputs(demoInputs);
    setExpenses(demoExpenses);
    setSelectedExpensePeriod("2026-08");
    setUseItemizedExpenses(true);
    setExpenseDraft(emptyExpense);
    setEditingExpenseId(null);
    setVisibleExpenseCount(25);
    setRecoveryPct(50);
    setStatus("Demo business loaded. Every number is fictional and safe to explore.");
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const resetWorkspace = () => {
    setInputs(defaultInputs);
    setExpenses([]);
    setSelectedExpensePeriod("");
    setUseItemizedExpenses(false);
    setExpenseDraft(emptyExpense);
    setEditingExpenseId(null);
    setVisibleExpenseCount(25);
    setRecoveryPct(50);
    setStatus("Current workspace cleared. Saved snapshots were left alone.");
  };

  const startRecoveryAction = (findingId: string) => {
    const category = costCategories.find((item) => item.id === findingId);
    const finding = analysis.leaks.find((item) => item.id === findingId);
    if (!category || !finding) return;
    if (!inputs.businessName.trim()) {
      setStatus("Add a business name before tracking a fix, so the action stays with the right business.");
      return;
    }
    if (useItemizedExpenses && activeExpensePeriod === UNDATED_PERIOD) {
      setStatus("Date the itemized expenses and choose a month before tracking a cost fix.");
      return;
    }
    if (!currentPeriodLabel.trim() || currentPeriodLabel === "Current month") {
      setStatus("Enter a specific reporting period before starting a recovery action.");
      return;
    }
    if (recoveryActions.some((action) => action.business === businessKey(inputs.businessName) && action.categoryId === findingId && action.baselinePeriod === currentPeriodLabel)) {
      setStatus("This finding is already being tracked for this reporting period.");
      document.getElementById("recovery-tracker")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (recoveryActions.length >= MAX_RECOVERY_ACTIONS) {
      setStatus("This browser has reached its 30-action limit. Export the report and remove an older action first.");
      return;
    }
    const action: RecoveryAction = {
      id: crypto.randomUUID(), business: businessKey(inputs.businessName),
      categoryId: category.id, categoryName: category.name,
      baselinePeriod: currentPeriodLabel,
      baselineActual: Number(analyzedInputs[category.actual]),
      baselineTarget: Number(analyzedInputs[category.target]),
      plannedFix: finding.firstMove, createdAt: new Date().toISOString(), owner: "",
      followupPeriod: "", followupActual: null, evidence: "", ownerConfirmedAmount: null,
    };
    setRecoveryActions((current) => [action, ...current]);
    setStatus(`Tracking ${category.name}. Record a later period after you make the change.`);
    setTimeout(() => document.getElementById("recovery-tracker")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const updateRecoveryAction = (id: string, patch: Partial<RecoveryAction>) => {
    setRecoveryActions((current) => current.map((action) => action.id === id ? { ...action, ...patch } : action));
  };

  const recordCurrentPeriod = (action: RecoveryAction) => {
    if (useItemizedExpenses && activeExpensePeriod === UNDATED_PERIOD) {
      setStatus("Choose a dated expense month before recording a follow-up.");
      return;
    }
    if (!currentPeriodLabel.trim() || currentPeriodLabel === action.baselinePeriod) {
      setStatus("Select or enter a different reporting period to compare with this action's baseline.");
      return;
    }
    const category = costCategories.find((item) => item.id === action.categoryId);
    if (!category) return;
    updateRecoveryAction(action.id, {
      followupPeriod: currentPeriodLabel,
      followupActual: Number(analyzedInputs[category.actual]),
      ownerConfirmedAmount: null,
    });
    setStatus(`Recorded ${action.categoryName} from ${currentPeriodLabel}. Review what changed before confirming any savings.`);
  };

  const saveExpense = () => {
    const vendor = expenseDraft.vendor.trim();
    const amount = Math.round(Number(expenseDraft.amount) * 100) / 100;
    if (!vendor || !Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000) {
      setStatus("Enter an expense name or vendor and a positive amount before saving.");
      return;
    }
    if (!editingExpenseId && expenses.length >= MAX_EXPENSES) {
      setStatus(`This browser workspace supports up to ${MAX_EXPENSES} expenses. Save a report and start a new period.`);
      return;
    }
    const entry = { ...expenseDraft, vendor, amount, id: editingExpenseId || crypto.randomUUID() };
    setExpenses((current) => editingExpenseId
      ? current.map((item) => item.id === editingExpenseId ? entry : item)
      : [...current, entry]);
    setExpenseDraft(emptyExpense);
    setEditingExpenseId(null);
    setStatus("Expense saved. Choose itemized totals below to use this list in the diagnostic.");
  };

  const downloadExpenseTemplate = () => {
    const csv = "date,vendor,description,category,amount\n2026-08-15,Sample Supply Co,Work materials,supplies,125.50\n";
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "pulseiq-itemized-expenses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExpenseCsv = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) {
        setStatus("This expense CSV is over 2 MB. Split it into smaller files with up to 500 expenses per reporting period.");
        return;
      }
      const { entries, skipped } = parseExpenseCsv(await file.text());
      const available = MAX_EXPENSES - expenses.length;
      const accepted = entries.slice(0, available);
      if (accepted.length) {
        setExpenses((current) => [...current, ...accepted]);
        setStatus(`Added ${accepted.length} expenses. ${skipped + entries.length - accepted.length} rows were skipped. Imports append; review for duplicates, then choose itemized totals to include the list in the diagnostic.`);
      } else setStatus(`No expenses added. ${skipped} rows were skipped. Check the template, categories, and amounts.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not read the expense CSV. Download the template and try again.");
    } finally { event.target.value = ""; }
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
      if (matched > 0) setUseItemizedExpenses(false);
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
      `Reporting period: ${currentPeriodLabel || "Not provided"}`,
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
      "WHERE THE MONEY WENT",
      `Expense source: ${useItemizedExpenses ? `Itemized expense list, ${formatExpensePeriod(activeExpensePeriod)}` : "Monthly category totals"}`,
      `Total included operating costs: ${exactMoney(analysis.totalExpenses)}`,
      ...(useItemizedExpenses ? [
        `Itemized expenses included: ${currentExpenses.length} entries`,
        ...expenseSummary.categoryTotals.map((category) => `${category.name}: ${exactMoney(category.amount)} (${expenseSummary.total ? ((category.amount / expenseSummary.total) * 100).toFixed(1) : "0"}%)`),
        "Top vendors:",
        ...expenseSummary.vendorTotals.slice(0, 5).map((vendor) => `${vendor.name}: ${exactMoney(vendor.amount)}`),
      ] : costCategories.filter((category) => analyzedInputs[category.actual] > 0).map((category) => `${category.name}: ${exactMoney(analyzedInputs[category.actual])}`)),
      "",
      ...(analysis.warnings.length || (useItemizedExpenses && periods.length > 1) ? [
        "DATA QUALITY",
        ...analysis.warnings,
        ...(useItemizedExpenses && periods.length > 1 ? [`Only the ${formatExpensePeriod(activeExpensePeriod)} expense entries are included in this monthly analysis. Check that revenue and targets refer to the same period.`] : []),
        "",
      ] : []),
      "PRIORITY FINDINGS",
      ...analysis.leaks.flatMap((leak, index) => [
        `${index + 1}. ${leak.name} — ${money(leak.amount)}/month — ${leak.severity} — ${leak.confidence} confidence`,
        `Signal: ${leak.signal}`,
        `First move: ${leak.firstMove}`,
        `Measure: ${leak.measure}`,
        ...(useItemizedExpenses ? currentExpenses.filter((entry) => entry.category === leak.id).slice(0, 5).map((entry) => `Source entry: ${entry.date || "No date"} | ${entry.vendor} | ${exactMoney(entry.amount)}${entry.description ? ` | ${entry.description}` : ""}`) : []),
        "",
      ]),
      ...(visibleActions.length ? [
        "ACTION FOLLOW-UP (BROWSER-LOCAL)",
        ...visibleActions.flatMap((action) => {
          const result = recoveryObservation(action);
          return [
            `${action.categoryName}: ${action.plannedFix}`,
            `Baseline ${action.baselinePeriod}: ${exactMoney(action.baselineActual)} actual; ${exactMoney(action.baselineTarget)} target`,
            result ? `Follow-up ${action.followupPeriod}: ${exactMoney(action.followupActual || 0)} actual; observed cost change ${exactMoney(result.observedCostChange)}` : "Follow-up not recorded",
            result?.ownerConfirmedAmount !== null && result?.ownerConfirmedAmount !== undefined ? `Owner-confirmed amount: ${exactMoney(result.ownerConfirmedAmount)} — ${action.evidence}` : "No owner-confirmed savings recorded",
            "",
          ];
        }),
      ] : []),
      "RECOVERY SCENARIO",
      `${recoveryPct}% recovery: ${money(analysis.recoverableAtScenario)}/month potential improvement`,
      `Projected operating profit: ${money(analysis.projectedProfit)}`,
      `Projected operating margin: ${analysis.projectedMargin.toFixed(1)}%`,
      "",
      "IMPORTANT",
      "PulseIQ identifies financial and operational signals from the data entered. A variance is not proof of waste or causation. Modeled opportunities are planning estimates, not guaranteed savings or revenue.",
    ];
    return lines.join("\n");
  }, [analysis, inputs, analyzedInputs, currentExpenses, activeExpensePeriod, currentPeriodLabel, expenseSummary, useItemizedExpenses, recoveryPct, periods.length, visibleActions]);

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
                    {useItemizedExpenses ? (
                      <div><p className="text-sm font-black text-black/65">Actual · from expense list</p><p className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 font-black">{exactMoney(analyzedInputs[category.actual])}</p></div>
                    ) : <NumericInput label="Actual" value={Number(inputs[category.actual])} onChange={(value) => setValue(category.actual, value)} prefix="$" />}
                    <NumericInput label="Target" value={Number(inputs[category.target])} onChange={(value) => setValue(category.target, value)} prefix="$" />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <SectionHeading eyebrow="3 · Work expenses" title="See exactly where the money went." body="Add bills one at a time or import an expense CSV. PulseIQ groups the spending by category and vendor, shows the dollar amounts and shares, and compares it with the targets you entered above." />
                <div className="flex shrink-0 flex-wrap gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-black text-white"><Upload size={16} /> Import expenses<input type="file" accept=".csv,text/csv" onChange={handleExpenseCsv} className="hidden" /></label>
                  <button type="button" onClick={downloadExpenseTemplate} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-3 text-sm font-black"><Download size={16} /> Expense template</button>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-[#f4efe7] p-4 text-sm leading-6 text-black/60">Import multiple months to compare trends; PulseIQ includes only the selected month in a monthly diagnostic. Enter revenue and targets for that same month. Amounts are positive spending. If revenue is already net of refunds, check that entering refunds as a cost will not count them twice. Your entries stay in this browser.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-black/65">Date (optional)</span><input type="date" value={expenseDraft.date} onChange={(event) => setExpenseDraft((current) => ({ ...current, date: event.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold" /></label>
                <label className="block"><span className="text-sm font-black text-black/65">Vendor or expense name *</span><input value={expenseDraft.vendor} maxLength={100} onChange={(event) => setExpenseDraft((current) => ({ ...current, vendor: event.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold" placeholder="Example: Electric bill" /></label>
                <label className="block"><span className="text-sm font-black text-black/65">Category</span><select value={expenseDraft.category} onChange={(event) => setExpenseDraft((current) => ({ ...current, category: event.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold">{costCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                <NumericInput label="Amount *" value={expenseDraft.amount} onChange={(value) => setExpenseDraft((current) => ({ ...current, amount: value }))} prefix="$" />
                <label className="block sm:col-span-2"><span className="text-sm font-black text-black/65">Description (optional)</span><input value={expenseDraft.description} maxLength={180} onChange={(event) => setExpenseDraft((current) => ({ ...current, description: event.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold" placeholder="Example: Office electricity for August" /></label>
              </div>
              <div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={saveExpense} className="rounded-full bg-black px-5 py-3 font-black text-white">{editingExpenseId ? "Save changes" : "Add expense"}</button>{editingExpenseId ? <button type="button" onClick={() => { setEditingExpenseId(null); setExpenseDraft(emptyExpense); }} className="rounded-full border border-black/15 px-5 py-3 font-black">Cancel edit</button> : null}</div>

              {periods.length ? (
                <div className="mt-7 rounded-[1.7rem] border border-black/10 bg-white p-5">
                  <label className="block text-sm font-black text-black/65" htmlFor="expense-period">Month to analyze</label>
                  <select id="expense-period" value={activeExpensePeriod} onChange={(event) => setSelectedExpensePeriod(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f4] px-4 py-3 font-bold sm:max-w-sm">
                    {periods.map((period) => <option value={period} key={period}>{formatExpensePeriod(period)} · {expensesInPeriod(expenses, period).length} entries</option>)}
                  </select>
                  <p className="mt-2 text-sm leading-6 text-black/50">Only {formatExpensePeriod(activeExpensePeriod)} entries will feed the itemized diagnostic. Update revenue and targets above when changing months. Undated entries are separate so they cannot silently inflate a dated month.</p>
                </div>
              ) : null}

              <div className="mt-7 rounded-[1.7rem] border border-black/10 bg-[#faf8f4] p-5">
                <h3 className="text-xl font-black">Which numbers should the diagnostic use?</h3>
                <p className="mt-2 text-sm leading-6 text-black/50">Choose one source. Itemized totals replace every monthly actual above; they are never added on top of them. Targets stay the same. If you have only entered some of the month’s bills, keep using monthly category totals until the list is complete.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setUseItemizedExpenses(false)} aria-pressed={!useItemizedExpenses} className={`rounded-full px-4 py-3 text-sm font-black ${!useItemizedExpenses ? "bg-black text-white" : "border border-black/15 bg-white"}`}>Use monthly totals</button>
                  <button type="button" onClick={() => expenses.length ? setUseItemizedExpenses(true) : setStatus("Add at least one expense before choosing itemized totals.")} aria-pressed={useItemizedExpenses} className={`rounded-full px-4 py-3 text-sm font-black ${useItemizedExpenses ? "bg-black text-white" : "border border-black/15 bg-white"}`}>Use itemized expenses</button>
                </div>
                <p className="mt-4 text-sm font-semibold text-black/55">Currently included in the diagnostic: <strong className="text-black">{useItemizedExpenses ? `${exactMoney(expenseSummary.total)} from ${currentExpenses.length} ${formatExpensePeriod(activeExpensePeriod)} expense entries` : `${exactMoney(analysis.totalExpenses)} in monthly category totals`}</strong></p>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.7rem] bg-black p-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/40">{formatExpensePeriod(activeExpensePeriod)} · {currentExpenses.length} entries</p>
                  <p className="mt-2 text-3xl font-black">{exactMoney(expenseSummary.total)}</p>
                  <p className="mt-1 text-sm text-white/50">{inputs.revenue > 0 ? `${((expenseSummary.total / inputs.revenue) * 100).toFixed(1)}% of entered revenue` : "Add revenue above to see the share"}</p>
                  <div className="mt-5 space-y-3">{expenseSummary.categoryTotals.length ? expenseSummary.categoryTotals.map((category) => <div key={category.id}><div className="flex justify-between gap-3 text-sm font-bold"><span>{category.name}</span><span>{exactMoney(category.amount)} · {((category.amount / expenseSummary.total) * 100).toFixed(1)}%</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${(category.amount / expenseSummary.total) * 100}%` }} /></div><details className="mt-2 text-xs text-white/60"><summary className="cursor-pointer font-bold">Show source entries</summary><div className="mt-2 space-y-1">{currentExpenses.filter((entry) => entry.category === category.id).map((entry) => <p key={entry.id}>{entry.date || "No date"} · {entry.vendor} · {exactMoney(entry.amount)}{entry.description ? ` · ${entry.description}` : ""}</p>)}</div></details></div>) : <p className="text-sm text-white/50">Add an expense to see where money is going.</p>}</div>
                </div>
                <div className="rounded-[1.7rem] border border-black/10 bg-[#faf8f4] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Who is getting paid?</p><h3 className="mt-2 text-xl font-black">Top vendors and expense names</h3>
                  <div className="mt-5 space-y-3">{expenseSummary.vendorTotals.slice(0, 5).map((vendor) => <div key={vendor.name} className="flex justify-between gap-3 border-b border-black/10 pb-3 text-sm"><span className="font-semibold">{vendor.name}</span><span className="shrink-0 font-black">{exactMoney(vendor.amount)}</span></div>)}{expenses.length === 0 ? <p className="text-sm text-black/50">Your five largest vendors will show here.</p> : null}</div>
                </div>
              </div>
              {periodComparison ? <div className="mt-6 rounded-[1.7rem] border border-black/10 bg-[#faf8f4] p-5"><h3 className="text-xl font-black">Change since {formatExpensePeriod(periodComparison.previousPeriod)}</h3><p className="mt-2 text-sm leading-6 text-black/55">{formatExpensePeriod(periodComparison.currentPeriod)} spending was {exactMoney(Math.abs(periodComparison.change))} {periodComparison.change >= 0 ? "higher" : "lower"} across the entries provided. Compare the same scope of spending in both months; a change alone does not prove savings or waste.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{periodComparison.categories.filter((category) => category.change !== 0).slice(0, 6).map((category) => <div key={category.id} className="rounded-2xl border border-black/10 bg-white p-3 text-sm"><p className="font-black">{category.name} · {category.change >= 0 ? "+" : "−"}{exactMoney(Math.abs(category.change))}</p><p className="mt-1 text-black/50">{exactMoney(category.previous)} → {exactMoney(category.current)}</p></div>)}</div></div> : null}
              {(expensePatterns.possibleDuplicates.length || expensePatterns.recurringCharges.length) ? <div className="mt-6 rounded-[1.7rem] border border-amber-200 bg-amber-50 p-5"><h3 className="text-xl font-black">Charges to review</h3><p className="mt-2 text-sm text-black/55">Matching entries and repeat charges are review prompts. Neither is automatically a billing error or avoidable cost.</p>{expensePatterns.possibleDuplicates.slice(0, 5).map((group) => <p key={group.entryIds.join("-")} className="mt-3 text-sm"><strong>Possible duplicate:</strong> {group.count} matching entries · {group.vendor} · {group.date} · {exactMoney(group.amount)} each</p>)}{expensePatterns.recurringCharges.slice(0, 5).map((group) => <p key={`${group.vendor}-${group.amount}`} className="mt-3 text-sm"><strong>Repeated across months:</strong> {group.vendor} · {exactMoney(group.amount)} · {group.months.map(formatExpensePeriod).join(", ")}</p>)}</div> : null}
              {expenses.length ? <div className="mt-6 space-y-2"><h3 className="text-lg font-black">All expense entries · {expenses.length}</h3>{[...expenses].reverse().slice(0, visibleExpenseCount).map((entry) => <div key={entry.id} className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-[#faf8f4] p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="font-black">{entry.vendor} <span className="text-black/40">· {exactMoney(entry.amount)}</span></p><p className="mt-1 text-xs font-semibold text-black/45">{entry.date || "No date"} · {costCategories.find((category) => category.id === entry.category)?.name}{entry.description ? ` · ${entry.description}` : ""}</p></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => { setEditingExpenseId(entry.id); setExpenseDraft({ date: entry.date, vendor: entry.vendor, description: entry.description, category: entry.category, amount: entry.amount }); }} className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-2 text-xs font-black"><Pencil size={13} /> Edit</button><button type="button" onClick={() => { setExpenses((current) => current.filter((item) => item.id !== entry.id)); if (expenses.length === 1) setUseItemizedExpenses(false); if (editingExpenseId === entry.id) { setEditingExpenseId(null); setExpenseDraft(emptyExpense); } }} className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-2 text-xs font-black"><Trash2 size={13} /> Remove</button></div></div>)}{visibleExpenseCount < expenses.length ? <button type="button" onClick={() => setVisibleExpenseCount((count) => count + 25)} className="mt-3 rounded-full border border-black/15 px-5 py-3 text-sm font-black">Show 25 more of {expenses.length} expenses</button> : null}</div> : null}
            </section>

            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="4 · Operational opportunity" title="Catch money that never reaches the P&L cleanly." body="These optional models estimate missed opportunity and repeat-work cost. PulseIQ labels them as modeled—not as guaranteed lost revenue." />
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
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/35">5 · PulseIQ executive diagnostic</p>
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

              <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 md:p-6">
                <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/40">Money out · {useItemizedExpenses ? "itemized expenses" : "monthly totals"}</p><h3 className="mt-2 text-2xl font-black">Where the spending goes</h3></div><p className="text-2xl font-black">{exactMoney(analysis.totalExpenses)}</p></div>
                <p className="mt-2 text-sm text-white/55">Actual spending by category. A large category is not automatically a waste or an overrun.</p>
                {spendingByCategory.length ? <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">{spendingByCategory.map((category) => <div key={category.id}><div className="flex justify-between gap-2 text-sm font-bold"><span>{category.name}</span><span className="shrink-0">{exactMoney(category.amount)} · {((category.amount / analysis.totalExpenses) * 100).toFixed(1)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${(category.amount / analysis.totalExpenses) * 100}%` }} /></div></div>)}</div> : <p className="mt-5 text-sm text-white/45">Enter category totals above or add itemized expenses to see this breakdown.</p>}
                {spendingByCategory[0] ? <div className="mt-6 rounded-2xl bg-black/25 p-4 text-sm leading-6 text-white/65"><strong className="text-white">Largest category: {spendingByCategory[0].name} at {exactMoney(spendingByCategory[0].amount)}.</strong> Start by checking its underlying bills and activity. {spendingByCategory[0].investigate[0]}</div> : null}
                {useItemizedExpenses && expenseSummary.vendorTotals[0] ? <p className="mt-3 text-sm text-white/55">Largest vendor or expense name: {expenseSummary.vendorTotals[0].name} · {exactMoney(expenseSummary.vendorTotals[0].amount)}. Review its invoices, usage, or contract before assuming the spend can be reduced.</p> : null}
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
                        {leak.type === "direct" ? <button type="button" onClick={() => startRecoveryAction(leak.id)} className="mt-4 rounded-full border border-white/20 px-4 py-2.5 text-sm font-black hover:bg-white hover:text-black">Track a fix for {leak.name}</button> : null}
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
                  <div className="mt-4 space-y-3 text-sm font-bold"><div className="flex justify-between gap-3"><span className="text-white/45">Revenue</span><span>{money(inputs.revenue)}</span></div><div className="flex justify-between gap-3"><span className="text-white/45">Operating costs · {useItemizedExpenses ? "itemized" : "monthly totals"}</span><span>{exactMoney(analysis.totalExpenses)}</span></div><div className="flex justify-between gap-3"><span className="text-white/45">Estimated operating profit</span><span>{money(analysis.operatingProfit)}</span></div><div className="flex justify-between gap-3 border-t border-white/10 pt-3"><span className="text-white/45">Operating margin</span><span>{analysis.operatingMargin.toFixed(1)}%</span></div>{analysis.revenueGap > 0 ? <div className="flex justify-between gap-3"><span className="text-white/45">Revenue target gap</span><span>{money(analysis.revenueGap)}</span></div> : null}<div className="flex justify-between gap-3"><span className="text-white/45">Diagnostic completeness</span><span>{analysis.completeness}%</span></div></div>
                  </div>
                </div>
              </div>
            </section>

            <section id="recovery-tracker" className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="6 · Follow through" title="See whether the fix worked." body="Start tracking from a direct cost finding above. Record the next period after making a change. PulseIQ shows the observed spending change separately from any amount you personally confirm was caused by the action." />
              <p className="mt-5 rounded-2xl bg-[#f4efe7] p-4 text-sm leading-6 text-black/60">Actions stay in this browser with your drafts and snapshots. Compare like-for-like periods before claiming a result. Lower spending can reflect lower business volume, timing, or a cost moved elsewhere.</p>
              <div className="mt-6 space-y-5">
                {visibleActions.length ? visibleActions.map((action) => {
                  const observation = recoveryObservation(action);
                  return <article key={action.id} className="rounded-[1.7rem] border border-black/10 bg-[#faf8f4] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">{action.categoryName} · baseline {action.baselinePeriod}</p><h3 className="mt-2 text-xl font-black">{action.plannedFix}</h3><p className="mt-2 text-sm text-black/50">Baseline spending {exactMoney(action.baselineActual)} · target {exactMoney(action.baselineTarget)}</p></div><button type="button" onClick={() => setRecoveryActions((current) => current.filter((item) => item.id !== action.id))} className="rounded-full border border-black/15 px-3 py-2 text-xs font-black">Remove action</button></div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="text-sm font-bold">Person responsible<input value={action.owner} maxLength={80} onChange={(event) => updateRecoveryAction(action.id, { owner: event.target.value })} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Name or role (optional)" /></label>
                      <label className="text-sm font-bold">Follow-up period<input value={action.followupPeriod} maxLength={80} onChange={(event) => updateRecoveryAction(action.id, { followupPeriod: event.target.value, ownerConfirmedAmount: null })} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Example: September 2026" /></label>
                      <label className="text-sm font-bold">Follow-up spending<input type="number" min="0" max="1000000000" step="0.01" value={action.followupActual ?? ""} onChange={(event) => updateRecoveryAction(action.id, { followupActual: event.target.value === "" ? null : Math.min(1_000_000_000, Math.max(0, Number(event.target.value))), ownerConfirmedAmount: null })} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Actual cost in follow-up period" /></label>
                      <div className="flex items-end"><button type="button" onClick={() => recordCurrentPeriod(action)} className="w-full rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-black">Use {currentPeriodLabel || "current period"} from workspace</button></div>
                    </div>
                    {observation ? <div className="mt-5 rounded-2xl bg-black p-5 text-white"><p className="font-black">Observed spending {observation.observedCostChange >= 0 ? "fell" : "rose"} {exactMoney(Math.abs(observation.observedCostChange))}</p><p className="mt-2 text-sm text-white/60">Gap above the original target {observation.targetGapChange >= 0 ? "narrowed" : "widened"} {exactMoney(Math.abs(observation.targetGapChange))}. The original target is held constant; update it separately if your business changed.</p></div> : <p className="mt-4 text-sm text-black/50">Enter spending from a different period to see an observed change.</p>}
                    <label className="mt-5 block text-sm font-bold">What changed, and what evidence ties it to your action?<textarea value={action.evidence} maxLength={500} onChange={(event) => updateRecoveryAction(action.id, { evidence: event.target.value })} className="mt-2 min-h-24 w-full rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Example: Adjusted Friday staffing; same number of completed jobs; overtime hours fell. Note where you checked." /></label>
                    {observation && observation.observedCostChange > 0 ? <label className="mt-4 block max-w-sm text-sm font-bold">Amount you can confirm from the evidence<input type="number" min="0" max={observation.observedCostChange} step="0.01" value={action.ownerConfirmedAmount ?? ""} onChange={(event) => updateRecoveryAction(action.id, { ownerConfirmedAmount: event.target.value === "" ? null : Math.min(observation.observedCostChange, Math.max(0, Number(event.target.value))) })} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Optional · up to observed reduction" /></label> : null}
                    {observation?.ownerConfirmedAmount !== null && observation?.ownerConfirmedAmount !== undefined ? <p className="mt-4 text-sm font-black text-emerald-800">Owner-confirmed improvement: {exactMoney(observation.ownerConfirmedAmount)} for this follow-up period. PulseIQ has not independently verified the cause.</p> : action.ownerConfirmedAmount !== null ? <p className="mt-3 text-sm font-bold text-amber-800">Add at least 10 characters of evidence and a different follow-up period before this can be reported as owner-confirmed.</p> : null}
                  </article>;
                }) : <p className="rounded-2xl border border-black/10 bg-[#faf8f4] p-5 text-sm text-black/55">No tracked actions for this business yet. Add a business name and a specific reporting period, then choose “Track a fix” from a direct cost finding.</p>}
              </div>
            </section>

            <section className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Report tools" title="Take the finding into the meeting." body="Copy the executive report, download a plain-text record, or print the page to PDF. The report states assumptions and includes any recorded action follow-up." />
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
                  const savedExpenses = normalizeExpenseEntries(snapshot.expenses);
                  const savedPeriods = expensePeriods(savedExpenses);
                  const savedPeriod = savedPeriods.includes(snapshot.expensePeriod || "") ? snapshot.expensePeriod! : savedPeriods[0] || "";
                  const result = analyzeBusiness(snapshot.useItemizedExpenses && savedExpenses.length ? applyExpensesToInputs(snapshot.inputs, expensesInPeriod(savedExpenses, savedPeriod)) : snapshot.inputs, 50);
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
