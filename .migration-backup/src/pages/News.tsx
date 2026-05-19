import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { announcements } from "@/data/content";
import { Calendar, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Notice", "Event", "Achievement", "Holiday"] as const;

const categoryStyles: Record<string, string> = {
  Notice: "bg-secondary text-secondary-foreground",
  Event: "bg-accent/15 text-accent-foreground",
  Achievement: "bg-primary/10 text-primary",
  Holiday: "bg-muted text-muted-foreground",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

const News = () => {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const items = useMemo(() => {
    const filtered = filter === "All" ? announcements : announcements.filter((a) => a.category === filter);
    return [...filtered].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  }, [filter]);

  return (
    <Layout>
      <PageHero
        eyebrow="News & Events"
        title="The Green Valley notice board."
        description="Stay up to date with notices, upcoming events, and the achievements of our students."
      />

      <section className="container-prose py-16">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((a) => (
            <article
              key={a.title}
              className={cn(
                "group flex flex-col gap-3 rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft sm:flex-row sm:items-start sm:gap-6",
                a.pinned ? "border-primary/30 ring-1 ring-primary/10" : "border-border",
              )}
            >
              <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground sm:w-44 sm:flex-col sm:items-start sm:gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {formatDate(a.date)}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${categoryStyles[a.category]}`}>
                  {a.category}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="flex items-center gap-2 font-serif text-xl text-foreground transition-colors group-hover:text-primary">
                  {a.pinned && <Pin className="h-4 w-4 text-primary" />}
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              </div>
            </article>
          ))}

          {items.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No items in this category.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
