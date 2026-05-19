import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const programs = [
  {
    stage: "Pre-Primary",
    grades: "Nursery — KG",
    blurb: "Play-based foundations that build curiosity, confidence, and early literacy.",
    color: "from-emerald-100 to-emerald-50",
  },
  {
    stage: "Primary",
    grades: "Grades 1 — 5",
    blurb: "Concept-led learning across subjects, with art, music and outdoor play built in.",
    color: "from-amber-100 to-amber-50",
  },
  {
    stage: "Secondary",
    grades: "Grades 6 — 10",
    blurb: "Strong academic core, project work, and CBSE board preparation done thoughtfully.",
    color: "from-sky-100 to-sky-50",
  },
  {
    stage: "Sr. Secondary",
    grades: "Grades 11 — 12",
    blurb: "Streams in Science, Commerce & Humanities with mentoring for college and life beyond.",
    color: "from-rose-100 to-rose-50",
  },
];

export const Programs = () => {
  return (
    <section className="container-prose py-24">
      <SectionHeader
        eyebrow="Programs"
        title="A path for every age, a future for every child."
        description="Our four academic stages flow seamlessly into one another, building confidence year by year."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((p) => (
          <Link
            key={p.stage}
            to="/academics"
            className={`group relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${p.color} p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft`}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                {p.grades}
              </div>
              <h3 className="mt-2 font-serif text-2xl text-foreground">{p.stage}</h3>
            </div>
            <p className="text-sm text-foreground/75">{p.blurb}</p>
            <div className="absolute right-5 bottom-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
