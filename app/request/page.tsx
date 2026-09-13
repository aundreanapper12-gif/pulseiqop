"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, Copy, CreditCard, Download, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { billingPortalUrl, contactEmail } from "../site-config";

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
  quick: { name: "Quick Leak Check", price: "$149", detail: "A focused review of one operational question and one dataset, with key patterns and three prioritized recommendations." },
  complete: { name: "Profit Leak Analysis", price: "$399", detail: "A deeper review of up to four data sources, with financial-impact estimates, root-cause analysis, and an executive-ready findings report." },
  monthly: { name: "Monthly Pulse", price: "$199/month", detail: "Ongoing KPI review, trend and risk visibility, updated priorities, and a recurring executive scorecard." },
  unsure: { name: "Help Me Choose", price: "No Commitment", detail: "Describe the decision you need to make and PulseIQ will help identify the smallest useful starting point." },
};

const initialData: RequestData = { name: "", email: "", businessName: "", industry: "", service: "complete", question: "", dataAvailable: "" };
const isServiceKey = (value: string | null): value is ServiceKey => Boolean(value && Object.prototype.hasOwnProperty.call(services, value));

export default function RequestPage() {
  const [data, setData] = useState<RequestData>(initialData);
  const [status, setStatus] = useState("");
  const [requestId, setRequestId] = useState("");
  const requestIds = useRef<Partial<Record<ServiceKey, string>>>({});

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (isServiceKey(requestedService)) setData((current) => ({ ...current, service: requestedService }));
  }, []);

  const paymentLinks: Partial<Record<ServiceKey, string>> = {
    quick: process.env.NEXT_PUBLIC_PULSEIQ_QUICK_PAY_URL || "https://buy.stripe.com/6oU6oJacagNbb344EQ7ok03",
    complete: process.env.NEXT_PUBLIC_PULSEIQ_COMPLETE_PAY_URL || "https://buy.stripe.com/cNi5kF3NMcwVc787R27ok04",
    monthly: process.env.NEXT_PUBLIC_PULSEIQ_MONTHLY_PAY_URL || "https://buy.stripe.com/dRm7sNckifJ78UWdbm7ok05",
  };
  const selected = services[data.service];
  const paymentUrl = paymentLinks[data.service] || "";

  const ensureRequestId = () => {
    let id = requestIds.current[data.service];
    const storageKey = `pulseiq-request-reference-${data.service}`;
    if (!id) {
      try { id = window.sessionStorage.getItem(storageKey) || undefined; } catch {}
    }
    if (!id || !/^[0-9a-f-]{36}$/.test(id)) id = window.crypto.randomUUID();
    requestIds.current[data.service] = id;
    try { window.sessionStorage.setItem(storageKey, id); } catch {}
    setRequestId(id);
    return id;
  };

  const buildRequestText = (id: string) => [
    "PULSEIQ ANALYSIS REQUEST", `Request Reference: ${id}`, "", `Name: ${data.name || "Not provided"}`,
    `Business Email: ${data.email || "Not provided"}`, `Business: ${data.businessName || "Not provided"}`,
    `Industry: ${data.industry || "Not provided"}`, `Requested Service: ${selected.name} (${selected.price})`, "",
    "Decision / Question:", data.question || "Not provided", "", "Data Currently Available:", data.dataAvailable || "Not provided", "", "Prepared Through PulseIQ Operations.",
  ].join("\n");

  const requiredComplete = data.name.trim() && data.email.trim() && data.businessName.trim() && data.question.trim();
  const validate = () => { if (!requiredComplete) { setStatus("Please Complete Your Name, Business Email, Business Name, And Business Question First."); return false; } return true; };

  const copyRequest = async () => {
    if (!validate()) return;
    const id = ensureRequestId();
    try { await navigator.clipboard.writeText(buildRequestText(id)); setStatus(`Request ${id} Copied. Send It To PulseIQ When You Are Ready.`); }
    catch { setStatus("Clipboard Access Was Blocked. Use Download Request Instead."); }
  };

  const downloadRequest = () => {
    if (!validate()) return;
    const id = ensureRequestId();
    const blob = new Blob([buildRequestText(id)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = `pulseiq-analysis-request-${(data.businessName || "business").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`; link.click(); URL.revokeObjectURL(url);
    setStatus(`Request ${id} Downloaded. The File Has Not Yet Been Sent To PulseIQ.`);
  };

  const emailRequest = (event: FormEvent) => {
    event.preventDefault(); if (!validate()) return;
    const id = ensureRequestId(); const subject = encodeURIComponent(`PulseIQ Analysis Request ${id} — ${data.businessName}`); const body = encodeURIComponent(buildRequestText(id));
    setStatus("Your Email App Should Open A Draft Addressed To PulseIQ. Press Send There To Deliver Your Request.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const openCheckout = () => {
    if (!paymentUrl) { setStatus("Online Checkout Is Not Available For This Service Yet."); return; }
    const id = ensureRequestId(); let checkoutUrl: URL;
    try { checkoutUrl = new URL(paymentUrl); if (checkoutUrl.protocol !== "https:") throw new Error("Checkout must use HTTPS"); }
    catch { setStatus("Secure Checkout Is Temporarily Unavailable. Please Contact PulseIQ Before Paying."); return; }
    checkoutUrl.searchParams.set("client_reference_id", id); window.open(checkoutUrl.toString(), "_blank", "noopener,noreferrer");
    setStatus(`Secure Checkout Opened With Request Reference ${id}. Use The Same Business Email And Short Question So PulseIQ Can Match Your Payment And Request.`);
  };

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#101010]">
      <header className="border-b border-black/10 bg-[#f4efe7]/95 px-5 py-4 backdrop-blur md:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><a href="/" className="flex items-center gap-3 font-black"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white"><Sparkles size={18} /></span><span>PulseIQ Operations</span></a><a href="/workspace" className="inline-flex items-center gap-2 text-sm font-black text-black/55 hover:text-black"><ArrowLeft size={16} /> Back To Workspace</a></div></header>
      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-6xl">
        <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.23em] text-black/35">Private Analysis Request</p><h1 className="mt-4 text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">Start With The Decision That Matters Most.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-black/58">You do not need perfect data. Tell PulseIQ what feels expensive, inconsistent, difficult to explain, or strategically important. The goal is to identify the smallest analysis capable of producing a useful decision.</p></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
          <aside className="space-y-4">{(Object.keys(services) as ServiceKey[]).map((key) => { const item = services[key]; const active = data.service === key; return <button type="button" key={key} onClick={() => { setData((current) => ({ ...current, service: key })); setRequestId(requestIds.current[key] || ""); setStatus(""); }} className={`w-full rounded-[1.8rem] border p-5 text-left transition ${active ? "border-black bg-black text-white shadow-xl" : "border-black/10 bg-white/70 hover:-translate-y-0.5 hover:bg-white"}`}><div className="flex items-start justify-between gap-4"><div><p className={`text-xs font-black uppercase tracking-[0.18em] ${active ? "text-white/45" : "text-black/35"}`}>{key === "complete" ? "Most Complete" : key === "quick" ? "Focused" : key === "monthly" ? "Ongoing" : "Guided Selection"}</p><h2 className="mt-2 text-xl font-black">{item.name}</h2></div><p className="shrink-0 font-black">{item.price}</p></div><p className={`mt-4 text-sm leading-6 ${active ? "text-white/60" : "text-black/50"}`}>{item.detail}</p></button>; })}
            <div className="rounded-[1.8rem] border border-black/10 bg-white/65 p-5"><div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0" size={19} /><div><p className="font-black">Data-Minimizing Intake</p><p className="mt-2 text-sm leading-6 text-black/50">Do not submit passwords, bank credentials, Social Security numbers, payment-card data, or other unnecessary sensitive information.</p></div></div></div>
          </aside>
          <form onSubmit={emailRequest} className="rounded-[2.2rem] border border-black/10 bg-white p-6 shadow-xl md:p-8">
            {paymentUrl ? <div className="mb-8 rounded-[1.6rem] bg-emerald-50 p-5"><p className="text-lg font-black">Ready To Begin {selected.name}?</p><p className="mt-2 text-sm leading-6 text-black/65">Secure Stripe checkout collects your contact and payment information. After payment, PulseIQ will contact you at the checkout email to arrange the appropriate business data for your analysis. No business files are uploaded on this page.</p><button type="button" onClick={openCheckout} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-4 font-black text-white shadow-lg hover:-translate-y-0.5"><CreditCard size={17} /> Secure Checkout — {selected.price}</button>{requestId ? <p className="mt-3 break-all text-xs font-semibold text-black/55">Request Reference: {requestId}</p> : null}{data.service === "monthly" ? <p className="mt-4 text-sm leading-6 text-black/65">$199 is charged each month until canceled. You can <a href={billingPortalUrl} className="font-bold underline underline-offset-2">manage or cancel your subscription in Stripe</a>. Cancellation takes effect at the end of the current billing period.</p> : null}</div> : null}
            <p className="mb-5 text-sm font-semibold leading-6 text-black/55">Use the fields below to prepare a detailed analysis request. Email PulseIQ opens a draft in your email app; press Send there to deliver it.</p>
            <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="text-sm font-black text-black/60">Your Name *</span><input value={data.name} onChange={(e) => setData((c) => ({ ...c, name: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Your Name" /></label><label className="block"><span className="text-sm font-black text-black/60">Business Email *</span><input type="email" value={data.email} onChange={(e) => setData((c) => ({ ...c, email: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="you@business.com" /></label><label className="block"><span className="text-sm font-black text-black/60">Business Name *</span><input value={data.businessName} onChange={(e) => setData((c) => ({ ...c, businessName: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Business Name" /></label><label className="block"><span className="text-sm font-black text-black/60">Industry</span><input value={data.industry} onChange={(e) => setData((c) => ({ ...c, industry: e.target.value }))} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Home Services, Retail, Agency..." /></label></div>
            <label className="mt-5 block"><span className="text-sm font-black text-black/60">What Decision Do You Need To Make? *</span><textarea value={data.question} onChange={(e) => setData((c) => ({ ...c, question: e.target.value }))} className="mt-2 min-h-36 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Example: Revenue is stable, but payroll and overtime keep climbing. I need to understand which shifts, locations, or workload patterns are driving the increase." /></label>
            <label className="mt-5 block"><span className="text-sm font-black text-black/60">What Data Is Already Available?</span><textarea value={data.dataAvailable} onChange={(e) => setData((c) => ({ ...c, dataAvailable: e.target.value }))} className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 bg-[#f8f5ef] px-4 py-3 font-semibold outline-none focus:border-black/40" placeholder="Examples: Payroll Export, Schedule, Sales By Day, Call Report, Refund Log, P&L, Staffing Spreadsheet." /></label>
            <div className="mt-6 rounded-[1.6rem] bg-[#f4efe7] p-5"><p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Selected Service</p><div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-xl font-black">{selected.name}</p><p className="font-black">{selected.price}</p></div><p className="mt-2 text-sm leading-6 text-black/50">{selected.detail}</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3"><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-4 font-black text-white shadow-lg hover:-translate-y-0.5"><Mail size={17} /> Email PulseIQ</button><button type="button" onClick={copyRequest} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-4 font-black hover:bg-black hover:text-white"><Copy size={17} /> Copy Request</button><button type="button" onClick={downloadRequest} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-4 font-black hover:bg-black hover:text-white"><Download size={17} /> Download Request</button></div>
            {status ? <div className="mt-5 flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm font-semibold leading-6 text-black/65"><CheckCircle2 className="mt-0.5 shrink-0" size={18} /> {status}</div> : null}
            <p className="mt-5 text-xs leading-5 text-black/38">This page prepares a request in your browser and opens a draft addressed to {contactEmail}; it does not send automatically. Secure checkout is hosted by Stripe, which handles payment-card details separately from PulseIQ.</p>
          </form>
        </div>
      </div></section>
    </main>
  );
}
