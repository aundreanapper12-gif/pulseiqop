"use client";

import { track } from "@vercel/analytics";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return <button type="button" onClick={() => { track("lead_magnet_printed", { resource: "profit-leak-checklist" }); window.print(); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white print:hidden"><Printer size={17} /> Print / Save as PDF</button>;
}
