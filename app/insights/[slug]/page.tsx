import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { getInsightPost, insightPosts } from "../posts";

const siteUrl = "https://www.pulseiqoperations.online";

export function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/insights/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      siteName: "PulseIQ Operations",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) notFound();

  const related = insightPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "PulseIQ Operations" },
    publisher: { "@type": "Organization", name: "PulseIQ Operations", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/insights/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#0f172a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <header className="border-b border-slate-900/10 bg-[#f3f6fb]/95 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/insights" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={16} /> PulseIQ Insights</a>
          <a href="/trial" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white">Start 14-Day Trial <ArrowRight size={15} /></a>
        </div>
      </header>

      <article className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600"><Sparkles size={14} /> {post.category}</div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-slate-600">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2"><CalendarDays size={15} /> September 17, 2026</span>
            <span className="inline-flex items-center gap-2"><Clock3 size={15} /> {post.readTime}</span>
          </div>

          <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Key takeaway</p>
            <p className="mt-2 text-lg font-semibold leading-7">{post.takeaway}</p>
          </div>

          <div className="mt-12 space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-slate-700">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets ? <ul className="mt-5 space-y-3 pl-5 text-[1.03rem] leading-7 text-slate-700">{section.bullets.map((item) => <li key={item} className="list-disc pl-1">{item}</li>)}</ul> : null}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-slate-900 p-7 text-white md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Apply this to your business</p>
            <h2 className="mt-3 text-3xl font-semibold">Turn the article into an actual business check.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">Use PulseIQ to organize your own revenue and expenses, compare actuals with targets, rank the biggest signals, test scenarios, and track what changes next.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/checkup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-slate-900">Take Free Business Checkup <ArrowRight size={16} /></a>
              <a href="/trial" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-semibold">Start 14-Day Trial</a>
            </div>
          </div>

          {related.length ? (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold">More in {post.category}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <a key={item.slug} href={`/insights/${item.slug}`} className="rounded-2xl border border-slate-900/10 bg-white p-5 shadow-sm hover:shadow-md">
                    <p className="text-sm font-semibold text-slate-500">{item.readTime}</p>
                    <h3 className="mt-2 font-semibold leading-6">{item.title}</h3>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
