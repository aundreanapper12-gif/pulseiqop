"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CircleDollarSign,
  Eye,
  LineChart as LineChartIcon,
  MousePointerClick,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Metrics = {
  visitors: number;
  pageViews: number;
  insightsViews: number;
  pricingViews: number;
  ctaClicks: number;
  trials: number;
  paidCustomers: number;
  mrr: number;
};

type Snapshot = Metrics & { label: string };

const STORAGE_KEY = "pulseiq:growth-metrics:v1";
const HISTORY_KEY = "pulseiq:growth-history:v1";

const defaults: Metrics = {
  visitors: 0,
  pageViews: 0,
  insightsViews: 0,
  pricingViews: 0,
  ctaClicks: 0,
  trials: 0,
  paidCustomers: 0,
  mrr: 0,
};

function pct(part: number, whole: number) {
  if (!whole) return 0;
  return (part / whole) * 100;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function MetricCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: React.ElementType }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-2xl bg-slate-100 p-3 text-slate-700"><Icon size={19} /></span>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Live input</span>
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>
    </div>
  );
}

export default function GrowthDashboardClient() {
  const [metrics, setMetrics] = useState<Metrics>(defaults);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const savedHistory = window.localStorage.getItem(HISTORY_KEY);
      if (saved) setMetrics({ ...defaults, ...JSON.parse(saved) });
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch {
      // Owner dashboard remains usable even if browser storage is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  }, [metrics, hydrated]);

  const visitorToTrial = useMemo(() => pct(metrics.trials, metrics.visitors), [metrics]);
  const trialToPaid = useMemo(() => pct(metrics.paidCustomers, metrics.trials), [metrics]);
  const visitorToPaid = useMemo(() => pct(metrics.paidCustomers, metrics.visitors), [metrics]);
  const arpc = metrics.paidCustomers ? metrics.mrr / metrics.paidCustomers : 0;

  const funnel = [
    { stage: "Visitors", value: metrics.visitors },
    { stage: "CTA clicks", value: metrics.ctaClicks },
    { stage: "Trials", value: metrics.trials },
    { stage: "Paid", value: metrics.paidCustomers },
  ];

  const saveSnapshot = () => {
    const label = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const next = [...history, { label, ...metrics }].slice(-12);
    setHistory(next);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  };

  const reset = () => {
    setMetrics(defaults);
    setHistory([]);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(HISTORY_KEY);
  };

  if (!hydrated) return <main className="min-h-screen bg-[#f4f7fb] p-8 text-slate-500">Loading PulseIQ growth dashboard…</main>;

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Sparkles size={19} /></span>
            <div>
              <p className="text-lg font-semibold">PulseIQ Growth Intelligence</p>
              <p className="text-sm text-slate-500">Owner dashboard · traffic → trial → customer → MRR</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://vercel.com/analytics" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">Open Vercel Analytics</a>
            <button onClick={saveSnapshot} className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white">Save snapshot</button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold"><RefreshCcw size={15} /> Reset</button>
          </div>
        </div>
      </header>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Business command center</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">Know whether PulseIQ is actually growing.</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">Enter the current numbers from Vercel Analytics and Stripe. PulseIQ calculates the funnel automatically and saves your figures in this browser. The site already tracks campaign visits, Insights activity, trial opens, workspace opens, and other conversion events.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Unique visitors" value={metrics.visitors.toLocaleString()} helper="People reaching PulseIQ." icon={Users} />
            <MetricCard label="Page views" value={metrics.pageViews.toLocaleString()} helper="Total browsing activity." icon={Eye} />
            <MetricCard label="Paid customers" value={metrics.paidCustomers.toLocaleString()} helper="Customers currently paying." icon={Target} />
            <MetricCard label="Monthly recurring revenue" value={money(metrics.mrr)} helper="Recurring revenue entered from Stripe." icon={CircleDollarSign} />
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex items-center gap-3"><MousePointerClick size={20} /><h2 className="text-2xl font-semibold">Update current numbers</h2></div>
            <p className="mt-2 text-sm text-slate-500">Use Vercel Analytics for traffic and custom events, and Stripe for customers and MRR. No secret keys are stored here.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {([
                ["visitors", "Unique visitors"],
                ["pageViews", "Page views"],
                ["insightsViews", "Insights views"],
                ["pricingViews", "Pricing views"],
                ["ctaClicks", "CTA clicks"],
                ["trials", "Trial starts"],
                ["paidCustomers", "Paid customers"],
                ["mrr", "MRR ($)"],
              ] as const).map(([key, label]) => (
                <label key={key} className="rounded-2xl bg-slate-50 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
                  <input
                    type="number"
                    min="0"
                    value={metrics[key]}
                    onChange={(e) => setMetrics((current) => ({ ...current, [key]: Math.max(0, Number(e.target.value) || 0) }))}
                    className="mt-2 w-full bg-transparent text-2xl font-semibold outline-none"
                  />
                </label>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-950 p-6 text-white"><TrendingUp size={20} /><p className="mt-5 text-sm text-white/60">Visitor → Trial</p><p className="mt-2 text-4xl font-semibold">{visitorToTrial.toFixed(1)}%</p><p className="mt-2 text-sm text-white/60">How well traffic turns into trials.</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6"><Target size={20} /><p className="mt-5 text-sm text-slate-500">Trial → Paid</p><p className="mt-2 text-4xl font-semibold">{trialToPaid.toFixed(1)}%</p><p className="mt-2 text-sm text-slate-500">How well trials turn into customers.</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6"><CircleDollarSign size={20} /><p className="mt-5 text-sm text-slate-500">Revenue per customer</p><p className="mt-2 text-4xl font-semibold">{money(arpc)}</p><p className="mt-2 text-sm text-slate-500">MRR divided by paying customers.</p></div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="flex items-center gap-3"><BarChart3 size={20} /><h2 className="text-2xl font-semibold">Conversion funnel</h2></div>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnel} layout="vertical" margin={{ left: 16 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="stage" width={90} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1d4ed8" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-sm text-slate-500">Visitor → paid conversion: <strong className="text-slate-900">{visitorToPaid.toFixed(2)}%</strong></p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="flex items-center gap-3"><LineChartIcon size={20} /><h2 className="text-2xl font-semibold">Snapshot trend</h2></div>
              {history.length ? (
                <div className="mt-6 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="visitors" stroke="#1d4ed8" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="trials" stroke="#0f766e" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="paidCustomers" stroke="#7c3aed" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="mt-6 flex h-80 items-center justify-center rounded-2xl bg-slate-50 p-8 text-center text-sm leading-6 text-slate-500">Enter today’s numbers and click <strong>Save snapshot</strong>. Repeat later to build a growth trend.</div>
              )}
            </section>
          </div>

          <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Tracking already active on PulseIQ</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">The site is already sending Vercel Analytics events for campaign visits, the Insights hub, individual Insights articles, lead-magnet activity, workspace opens, analysis-request opens, checkup opens, trial opens, and article clicks. This dashboard gives those numbers a business funnel so you can judge what is driving trials and revenue instead of staring at page views alone.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
