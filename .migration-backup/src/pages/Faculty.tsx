import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { faculty, type Faculty as FacultyT } from "@/data/content";
import { cn } from "@/lib/utils";

const departments = ["All", "Leadership", "Science", "Mathematics", "Languages", "Humanities", "Arts & Sports"] as const;

const Faculty = () => {
  const [filter, setFilter] = useState<(typeof departments)[number]>("All");

  const items = useMemo<FacultyT[]>(
    () => (filter === "All" ? faculty : faculty.filter((f) => f.department === filter)),
    [filter],
  );

  return (
    <Layout>
      <PageHero
        eyebrow="Faculty"
        title="Meet the teachers who make Green Valley, Green Valley."
        description="Experienced, kind, and quietly dedicated — our teachers are the heart of the school."
      />

      <section className="container-prose py-16">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === d
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground",
              )}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((f) => (
            <div
              key={f.name}
              className="group rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-soft animate-fade-in"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-serif text-2xl shadow-soft transition-transform group-hover:scale-105">
                {f.initials}
              </div>
              <h4 className="mt-5 font-serif text-lg">{f.name}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{f.role}</p>
              <span className="mt-3 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs text-primary">
                {f.department}
              </span>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No faculty in this department yet.</p>
        )}
      </section>
    </Layout>
  );
};

export default Faculty;
