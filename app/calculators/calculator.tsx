"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, RotateCcw } from "lucide-react";
import type { CalculatorSlug } from "./data";

type Field = { key: string; label: string; suffix?: string; hint?: string; defaultValue: number; min?: number; step?: number };

const configs: Record<CalculatorSlug, { fields: Field[] }> = {
  "true-labor-cost": { fields: [
    { key: "hourly", label: "Hourly wage", suffix: "$/hr", defaultValue: 20, min: 0 },
    { key: "hours", label: "Hours per week", suffix: "hrs", defaultValue: 40, min: 0 },
    { key: "tax", label: "Payroll taxes", suffix: "%", defaultValue: 9, min: 0 },
    { key: "benefits", label: "Benefits / insurance", suffix: "%", defaultValue: 10, min: 0 },
    { key: "workers", label: "Workers comp / other burden", suffix: "%", defaultValue: 4, min: 0 },
  ]},
  "overtime-cost": { fields: [
    { key: "rate", label: "Regular hourly rate", suffix: "$/hr", defaultValue: 20, min: 0 },
    { key: "regularHours", label: "Regular hours", suffix: "hrs", defaultValue: 40, min: 0 },
    { key: "otHours", label: "Overtime hours", suffix: "hrs", defaultValue: 8, min: 0 },
    { key: "multiplier", label: "Overtime multiplier", suffix: "×", defaultValue: 1.5, min: 1, step: 0.1 },
    { key: "employees", label: "Employees working this pattern", defaultValue: 1, min: 1 },
  ]},
  "processing-fee": { fields: [
    { key: "sales", label: "Monthly card sales", suffix: "$", defaultValue: 30000, min: 0 },
    { key: "percent", label: "Percentage fee", suffix: "%", defaultValue: 2.9, min: 0, step: 0.1 },
    { key: "perTx", label: "Per-transaction fee", suffix: "$", defaultValue: 0.3, min: 0, step: 0.01 },
    { key: "transactions", label: "Transactions per month", defaultValue: 450, min: 0 },
  ]},
  "job-profitability": { fields: [
    { key: "revenue", label: "Job revenue", suffix: "$", defaultValue: 2500, min: 0 },
    { key: "labor", label: "Direct labor", suffix: "$", defaultValue: 650, min: 0 },
    { key: "materials", label: "Materials", suffix: "$", defaultValue: 500, min: 0 },
    { key: "subs", label: "Subcontractors", suffix: "$", defaultValue: 250, min: 0 },
    { key: "travel", label: "Travel / mileage", suffix: "$", defaultValue: 90, min: 0 },
    { key: "fees", label: "Processing / other direct fees", suffix: "$", defaultValue: 75, min: 0 },
  ]},
  "profit-margin": { fields: [
    { key: "revenue", label: "Revenue", suffix: "$", defaultValue: 40000, min: 0 },
    { key: "expenses", label: "Operating expenses", suffix: "$", defaultValue: 32000, min: 0 },
  ]},
  "break-even-revenue": { fields: [
    { key: "fixed", label: "Monthly fixed costs", suffix: "$", defaultValue: 12000, min: 0 },
    { key: "variable", label: "Variable costs as % of sales", suffix: "%", defaultValue: 35, min: 0, step: 0.1 },
  ]},
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export default function CalculatorTool({ slug }: { slug: CalculatorSlug }) {
  const config = configs[slug];
  const defaults = Object.fromEntries(config.fields.map((field) => [field.key, field.defaultValue])) as Record<string, number>;
  const [values, setValues] = useState<Record<string, number>>(defaults);

  const results = useMemo(() => {
    const v = values;
    switch (slug) {
      case "true-labor-cost": {
        const burden = (v.tax + v.benefits + v.workers) / 100;
        const trueHourly = v.hourly * (1 + burden);
        const weekly = trueHourly * v.hours;
        return [
          ["True hourly labor cost", currency.format(trueHourly)],
          ["Weekly labor cost", currency.format(weekly)],
          ["Approx. monthly labor cost", currency.format(weekly * 52 / 12)],
          ["Labor burden above wage", number.format(burden * 100) + "%"],
        ];
      }
      case "overtime-cost": {
        const regular = v.rate * v.regularHours * v.employees;
        const overtime = v.rate * v.multiplier * v.otHours * v.employees;
        const premium = v.rate * (v.multiplier - 1) * v.otHours * v.employees;
        return [
          ["Regular wages", currency.format(regular)],
          ["Overtime wages", currency.format(overtime)],
          ["Overtime premium", currency.format(premium)],
          ["Total weekly wages", currency.format(regular + overtime)],
        ];
      }
      case "processing-fee": {
        const monthly = v.sales * (v.percent / 100) + v.perTx * v.transactions;
        return [
          ["Estimated monthly fees", currency.format(monthly)],
          ["Estimated annual fees", currency.format(monthly * 12)],
          ["Effective fee rate", (v.sales > 0 ? number.format(monthly / v.sales * 100) : "0") + "%"],
          ["Revenue after fees", currency.format(Math.max(0, v.sales - monthly))],
        ];
      }
      case "job-profitability": {
        const costs = v.labor + v.materials + v.subs + v.travel + v.fees;
        const profit = v.revenue - costs;
        const margin = v.revenue > 0 ? profit / v.revenue * 100 : 0;
        return [
          ["Direct job costs", currency.format(costs)],
          ["Gross profit", currency.format(profit)],
          ["Gross margin", number.format(margin) + "%"],
          ["Cost as % of revenue", (v.revenue > 0 ? number.format(costs / v.revenue * 100) : "0") + "%"],
        ];
      }
      case "profit-margin": {
        const profit = v.revenue - v.expenses;
        const margin = v.revenue > 0 ? profit / v.revenue * 100 : 0;
        const expenseRate = v.revenue > 0 ? v.expenses / v.revenue * 100 : 0;
        return [
          ["Operating profit", currency.format(profit)],
          ["Operating margin", number.format(margin) + "%"],
          ["Expense percentage", number.format(expenseRate) + "%"],
          ["Profit per $1 of revenue", "$" + (v.revenue > 0 ? (profit / v.revenue).toFixed(2) : "0.00")],
        ];
      }
      case "break-even-revenue": {
        const contribution = Math.max(0.0001, 1 - v.variable / 100);
        const breakeven = v.fixed / contribution;
        return [
          ["Break-even monthly revenue", currency.format(breakeven)],
          ["Contribution margin", number.format(contribution * 100) + "%"],
          ["Fixed costs to cover", currency.format(v.fixed)],
          ["Approx. annual break-even sales", currency.format(breakeven * 12)],
        ];
      }
    }
  }, [slug, values]);

  return (
    <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3"><Calculator size={20} /><h2 className="text-2xl font-semibold">Enter your numbers</h2></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {config.fields.map((field) => (
            <label key={field.key} className="block">
              <span className="text-sm font-semibold text-slate-700">{field.label}</span>
              <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
                <input
                  type="number"
                  min={field.min}
                  step={field.step ?? 1}
                  value={values[field.key]}
                  onChange={(e) => setValues((current) => ({ ...current, [field.key]: Number(e.target.value) || 0 }))}
                  className="w-full border-0 bg-transparent px-1 py-3 font-semibold outline-none focus:shadow-none"
                />
                {field.suffix ? <span className="text-sm font-semibold text-slate-500">{field.suffix}</span> : null}
              </div>
            </label>
          ))}
        </div>
        <button onClick={() => setValues(defaults)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><RotateCcw size={15} /> Reset example</button>
      </section>

      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Your result</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {results.map(([label, value], index) => (
            <div key={label} className={`rounded-2xl border border-white/10 p-5 ${index === 0 ? "bg-white text-slate-950" : "bg-white/10"}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${index === 0 ? "text-slate-500" : "text-slate-300"}`}>{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="font-semibold">One calculator finds one signal. PulseIQ looks across the business.</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Use the free trial to compare revenue, labor, expenses, operating targets, and potential money leaks in one workspace.</p>
          <a href="/dashboard" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-950">Run my PulseIQ check <ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  );
}
