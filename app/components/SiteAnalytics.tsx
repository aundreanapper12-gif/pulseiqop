"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";

export default function SiteAnalytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    if (source && ["facebook", "linkedin", "instagram", "email", "google", "reddit"].includes(source)) {
      track("campaign_visit", { source });
    }

    const path = window.location.pathname;
    if (path === "/insights") track("insights_hub_viewed");
    if (path.startsWith("/insights/")) track("insight_article_viewed", { slug: path.replace("/insights/", "").slice(0, 80) });
    if (path === "/resources/profit-leak-checklist") track("lead_magnet_viewed", { resource: "profit-leak-checklist" });

    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      const targetPath = url.pathname;
      if (targetPath === "/workspace") track("workspace_opened");
      if (targetPath === "/request") track("analysis_request_opened");
      if (targetPath === "/checkup") track("checkup_opened", { from: path.startsWith("/insights") ? "insights" : "site" });
      if (targetPath === "/trial") track("trial_opened", { from: path.startsWith("/insights") ? "insights" : "site" });
      if (targetPath === "/resources/profit-leak-checklist") track("lead_magnet_opened", { from: path.startsWith("/insights") ? "insights" : "site" });
      if (link.hasAttribute("data-insight-link")) track("insight_article_clicked", { from: path });
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
