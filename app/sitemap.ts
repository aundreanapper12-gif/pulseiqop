import type { MetadataRoute } from "next";
import { insightPosts } from "./insights/library";

const siteUrl = "https://www.pulseiqoperations.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/workspace`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/calculators`, lastModified: now, changeFrequency: "weekly", priority: 0.94 },
    { url: `${siteUrl}/calculators/true-labor-cost`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/calculators/overtime-cost`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/calculators/processing-fee`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/calculators/job-profitability`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/calculators/profit-margin`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/calculators/break-even-revenue`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/profit-leak-analysis`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/business-expense-analysis`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${siteUrl}/overtime-cost-analysis`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${siteUrl}/labor-cost-analysis`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${siteUrl}/service-business-profitability`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.92 },
    { url: `${siteUrl}/resources/profit-leak-checklist`, lastModified: now, changeFrequency: "monthly", priority: 0.86 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/checkup`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${siteUrl}/trial`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/request`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = insightPosts.map((post) => ({
    url: `${siteUrl}/insights/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: post.featured ? 0.84 : 0.79,
  }));

  return [...coreRoutes, ...articleRoutes];
}
