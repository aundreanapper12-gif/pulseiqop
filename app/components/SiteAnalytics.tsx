"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";

export default function SiteAnalytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    // Only known campaign labels may leave the browser, never arbitrary URL text.
    if (source && ["facebook", "linkedin", "instagram", "email", "google"].includes(source)) {
      track("campaign_visit", { source });
    }
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const path = new URL(link.href, window.location.origin).pathname;
      if (link.origin !== window.location.origin) return;
      if (path === "/workspace") track("workspace_opened");
      if (path === "/request") track("analysis_request_opened");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Analytics beforeSend={(event) => {
    const url = new URL(event.url);
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  }} />;
}
