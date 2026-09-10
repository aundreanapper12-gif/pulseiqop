"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Copy, CreditCard, Download, Mail, ShieldCheck, Sparkles } from "lucide-react";

type ServiceKey = "quick" | "complete" | "monthly" | "unsure";

type RequestData = {
  name: string;
  email: string;
  businessName: string;
  industry: string;
  service: ServiceKey;
  question: string;
  dataAvailable: string;
};

const services: Record<ServiceKey, { name: string; price: string; detail: string }> = {
  quick: {
    name: "Quick Leak Check",
    price: "$149",
    detail: "One operational question, one dataset, key patterns, and three prioritized recommendations.",
  },
  complete: {
    name: "Profit Leak Analysis",
    price: "$399",
    detail: "A broader review of up to four data sources with financial-impact estimates and a visual findings report.",
  },
  monthly: {
    name: "Monthly Pulse",
    price: "$199/month",
    detail: "Recurring KPI review, trend and risk alerts, updated priorities, and a monthly scorecard.",
  },
  unsure: {
    name: "Help Me Choose",
    price: "No commitment",
    detail: "Describe the decision you are trying to make and PulseIQ can identify the smallest useful starting point.",
  },
};

const initialData: RequestData = {
  name: "",
  email: "",
  businessName: "",
  industry: "",
  service: "complete",
  question: "",
  dataAvailable: "",
};

const isServiceKey = (value: string | null): value is ServiceKey =>
  Boolean(value && Object.prototype.hasOwnProperty.call(services, value));

export default function RequestPage() {
  const [data, setData] = useState<RequestData>(initialData);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (isServiceKey(requestedService)) {
      setData((current) => ({ ...current, service: requestedService }));
    }
  }, []);

  const contactEmail = process.env.NEXT_PUBLIC_PULSEIQ_CONTACT_EMAIL || "";
  const paymentLinks: Partial<Record<ServiceKey, string>> = {
    quick: process.env.NEXT_PUBLIC_PULSEIQ_QUICK_PAY_URL || "",
    complete: process.env.NEXT_PUBLIC_PULSEIQ_COMPLETE_PAY_URL || "",
    monthly: process.env.NEXT_PUBLIC_PULSEIQ_MONTHLY_PAY_URL || "",
  };
  const selected = services[data.service];
  const paymentUrl = paymentLinks[data.service] || "";

  const requestText = useMemo(() => {
    return [
      "PULSEIQ ANALYSIS REQUEST",
      "",
      `Name: ${data.name || "Not provided"}`,
      `Business email: ${data.email || "Not provided"}`,
      `Business: ${data.businessName || "Not provided"}`,
      `Industry: ${data.industry || "Not provided"}`,
      `Requested service: ${selected.name} (${selected.price})`,
      "",
      "Decision / question:",
      data.question || "Not provided",
      "",
      "Data currently available:",
      data.dataAvailable || "Not provided",
      "",
      "Prepared through PulseIQ Operations.",
    ].join("\n");
  }, [data, selected]);

  const requiredComplete =
    data.name.trim() && data.email.trim() && data.businessName.trim() && data.question.trim();

  const validate = () => {
    if (!requiredComplete) {
      setStatus("Please complete your name, business email, business name, and business question first.");
      return false;
    }
    return true;
  };

  const copyRequest = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(requestText);
      setStatus("Request copied to your clipboard.");
    } catch {
      setStatus("Your browser blocked clipboard access. Use Download Request instead.");
    }
  };

  const downloadRequest = () => {
    if (!validate()) return;
    const blob = new Blob([requestText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pulseiq-analysis-request-${(data.businessName || "business").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Request downloaded.");
  };

  const emailRequest = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    if (!contactEmail) {
      setStatus("Direct email intake is not configured yet. Copy or download your request so none of your information is lost.");
      return;
    }

    const subject = encodeURIComponent(`PulseIQ Analysis Request — ${data.businessName}`);
    const body = encodeURIComponent(requestText);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const openCheckout = async () => {
    if (!validate()) return;
    if (!paymentUrl) {
      setStatus("Online checkout is not configured for this service yet. Prepare your request first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(requestText);
    } catch {
      // Checkout can continue even if clipboard permission is unavailable.
    }
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
    setStatus("Checkout opened in a new tab. Your analysis-request details were copied when browser permissions allowed it.");
  };

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 bg-[#f4efe7]/95 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span>
            <span>PulseIQ Operations</span>
          </a>
          <a href="/workspace" className="inline-flex items-center gap-2 text-sm font-black text-black/55 hover:text-black">
            <ArrowLeft size={16} /> Back to workspace
          </a>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.23em] text-black/35">Request an analysis</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">
              Start with the decision you need to make.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/58">
              You do not need perfect data. Tell PulseIQ what feels expensive, slow, inconsistent, or hard to explain. The goal is to identify the smallest useful analysis—not to collect every spreadsheet you own.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
            <aside className="space-y-4">
              {(Object.keys(services) as ServiceKey[]).map((key) => {
                const item = services[key];
                const active = data.service === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setData((current) => ({ ...current, service: key }))}
                    className={`w-full rounded-[1.8rem] border p-5 text-left transition ${active ? "border-black bg-black text-white shadow-xl" : "border-black/10 bg-white/70 hover:-translate-y-0.5 hover:bg-white"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-xs font-black uppercase tracking-[0.18em] ${active ? "text-white/45" : "text-black/35"}`}>{key === "complete" ? "Most complete" : key === "quick" ? "Focused" : key === "monthly" ? "Ongoing" : "Not sure"}</p>
                        <h2 className="mt-2 text-xl font-black">{item.name}</h2>
                      </div>
                      <p className="shrink-0 font-black">{item.price}</p>
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${active ? "text-white/60" : "text-black/50"}`}>{item.detail}</p>
                  </button>
                );
              })}

              <div className="rounded-[1.8rem] border border-black/10 bg-white/65 p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-1 shrink-0" size={19} />
                  <div>
                    <p className="font-black">Data-minimizing intake</p>
                    <p className="mt-2 text-sm leading-6 text-black/50">Do not paste passwords, bank credentials, Social Security numbers, payment-card data, or other unnecessary sensitive information into this request.</p>
                  </div>
                </div>
              </div>
            </aside>

            <form onSubmit={emailRequest} className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-black/60">Your name *</span>
                  <input value={data.name} onChange={(e) => setData((c) => ({ ...c, name: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-black/60">Business email *</span>
                  <input type="email" value={data.email} onChange={(e) => setData((c) => ({ ...c, email: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="you@business.com" />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-black/60">Business name *</span>
                  <input value={data.businessName} onChange={(e) => setData((c) => ({ ...c, businessName: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Business name" />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-black/60">Industry</span>
                  <input value={data.industry} onChange={(e) => setData((c) => ({ ...c, industry: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Home services, retail, agency..." />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-black text-black/60">What do you want to understand? *</span>
                <textarea value={data.question} onChange={(e) => setData((c) => ({ ...c, question: e.target.value }))} className="mt-2 min-h-36 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Example: Revenue is stable, but payroll and overtime keep climbing. I want to know which shifts, locations, or workload patterns are causing the increase." />
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-black text-black/60">What data do you already have?</span>
                <textarea value={data.dataAvailable} onChange={(e) => setData((c) => ({ ...c, dataAvailable: e.target.value }))} className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Examples: payroll export, schedule, sales by day, call report, refund log, P&L, staffing spreadsheet." />
              </label>

              <div className="mt-6 rounded-[1.6rem] bg-[#f4efe7] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Selected service</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xl font-black">{selected.name}</p>
                  <p className="font-black">{selected.price}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-black/50">{selected.detail}</p>
              </div>

              <div className={`mt-6 grid gap-3 ${paymentUrl ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-4 font-black text-white shadow-lg hover:-translate-y-0.5">
                  <Mail size={17} /> {contactEmail ? "Email PulseIQ" : "Prepare Request"}
                </button>
                {paymentUrl ? (
                  <button type="button" onClick={openCheckout} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-4 font-black text-white shadow-lg hover:-translate-y-0.5">
                    <CreditCard size={17} /> Secure Checkout
                  </button>
                ) : null}
                <button type="button" onClick={copyRequest} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-4 font-black hover:bg-black hover:text-white">
                  <Copy size={17} /> Copy Request
                </button>
                <button type="button" onClick={downloadRequest} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-4 font-black hover:bg-black hover:text-white">
                  <Download size={17} /> Download
                </button>
              </div>

              {status ? (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm font-semibold leading-6 text-black/65">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={18} /> {status}
                </div>
              ) : null}

              <p className="mt-5 text-xs leading-5 text-black/38">
                This page prepares your request in your browser. Direct email delivery and checkout appear only when PulseIQ&apos;s business contact and payment links are configured. Payment-card details are handled by the configured external checkout provider, not this form.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
