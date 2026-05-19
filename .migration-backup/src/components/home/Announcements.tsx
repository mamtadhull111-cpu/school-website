import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { announcements } from "@/data/content";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const categoryStyles: Record<string, string> = {
  Notice: "bg-secondary text-secondary-foreground",
  Event: "bg-accent/15 text-accent-foreground",
  Achievement: "bg-primary/10 text-primary",
  Holiday: "bg-muted text-muted-foreground",
};

export const Announcements = () => {
  const items = announcements.slice(0, 3);
  return (
    <section className="container-prose py-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          align="left"
          eyebrow="What's New"
          title="Latest from Green Valley"
          description="Notices, events, and achievements — straight from the school office."
          className="mb-0"
        />
        <Button asChild variant="ghost" className="text-primary hover:text-primary">
          <Link to="/news">
            View all news <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((a) => (
          <article
            key={a.title}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${categoryStyles[a.category]}`}>
                {a.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {formatDate(a.date)}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-xl text-foreground transition-colors group-hover:text-primary">
              {a.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
            <Link
              to="/news"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
