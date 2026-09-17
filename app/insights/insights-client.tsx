"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { InsightPost } from "./library";

export default function InsightsClient({ posts, categories }: { posts: InsightPost[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesSearch = !normalized || `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [posts, query, category]);

  return (
    <section className="mt-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Search the library</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Find the question you are trying to solve.</h2>
        </div>
        <label className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-900/10 bg-white px-4 py-3 lg:w-[380px]">
          <Search size={18} className="text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search profit, payroll, overtime…" className="min-w-0 flex-1 bg-transparent font-semibold outline-none" />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${category === item ? "border-slate-900 bg-slate-900 text-white" : "border-slate-900/10 bg-white text-slate-600"}`}>{item}</button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <a key={post.slug} href={`/insights/${post.slug}`} data-insight-link className="group flex flex-col rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold text-blue-700">{post.category}</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">{post.title}</h3>
            <p className="mt-4 flex-1 leading-7 text-slate-600">{post.description}</p>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-slate-500"><span>{post.readTime}</span><span className="inline-flex items-center gap-2 text-slate-900">Read <ArrowRight size={15} /></span></div>
          </a>
        ))}
      </div>

      {!filtered.length ? <div className="mt-8 rounded-2xl border border-slate-900/10 bg-white p-8 text-center"><p className="text-xl font-semibold">No articles match that search yet.</p><p className="mt-2 text-slate-600">Try a broader term or choose All.</p></div> : null}
    </section>
  );
}
