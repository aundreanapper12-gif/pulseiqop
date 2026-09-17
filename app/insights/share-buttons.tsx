"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Copy, Share2 } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        track("insight_shared", { method: "native" });
        setStatus("Shared.");
      } else {
        await navigator.clipboard.writeText(url);
        track("insight_shared", { method: "copy" });
        setStatus("Link copied.");
      }
    } catch {
      setStatus("");
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      track("insight_shared", { method: "copy" });
      setStatus("Link copied.");
    } catch {
      setStatus("Copy was blocked by this browser.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white px-4 py-2.5 text-sm font-semibold"><Share2 size={15} /> Share</button>
      <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white px-4 py-2.5 text-sm font-semibold"><Copy size={15} /> Copy link</button>
      {status ? <span className="text-sm font-semibold text-slate-500">{status}</span> : null}
    </div>
  );
}
