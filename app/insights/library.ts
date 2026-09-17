import { insightPosts as originalPosts, type InsightPost } from "./posts";
import { moreInsightPosts } from "./more-posts";

export type { InsightPost } from "./posts";

export const insightPosts: InsightPost[] = [...originalPosts, ...moreInsightPosts];
export const insightCategories = ["All", ...Array.from(new Set(insightPosts.map((post) => post.category)))];

export function getInsightPost(slug: string) {
  return insightPosts.find((post) => post.slug === slug);
}
