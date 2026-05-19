import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { BookOpen, Music, Trophy, Palette, Microscope, Globe } from "lucide-react";

const stages = [
  {
    name: "Pre-Primary",
    grades: "Nursery to KG",
    points: ["Play-based learning", "Phonics & early numeracy", "Story circles & art", "Outdoor exploration"],
  },
  {
    name: "Primary",
    grades: "Grades 1 — 5",
    points: ["Concept-based curriculum", "Daily reading habit", "Hands-on math & science", "Arts, music & sports built in"],
  },
  {
    name: "Secondary",
    grades: "Grades 6 — 10",
    points: ["CBSE-aligned curriculum", "Lab-based science learning", "Project work & presentations", "Career awareness from Grade 9"],
  },
  {
    name: "Senior Secondary",
    grades: "Grades 11 — 12",
    points: ["Streams: Science, Commerce, Humanities", "One-on-one mentoring", "College & competitive exam prep", "Leadership opportunities"],
  },
];

const beyond = [
  { icon: Trophy, title: "Sports", text: "Cricket, football, athletics, badminton, kho-kho, yoga." },
  { icon: Palette, title: "Visual Arts", text: "Painting, sketching, clay, craft, and an annual exhibition." },
  { icon: Music, title: "Music & Dance", text: "Vocal, instrumental, and classical & folk dance forms." },
  { icon: Microscope, title: "Clubs", text: "Science, eco, robotics, debate, drama, and book clubs." },
  { icon: Globe, title: "Community", text: "Service projects, plantation drives, and local outreach." },
  { icon: BookOpen, title: "Library", text: "10,000+ titles across fiction, reference, and journals." },
];

const Academics = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="Academics"
        title="A curriculum built around understanding."
        description="CBSE-aligned, taught with care — designed to help students think clearly, ask boldly, and learn deeply."
      />

      <section className="container-prose py-20">
        <SectionHeader eyebrow="Stages" title="Four stages, one continuous journey." />
        <div className="grid gap-6 md:grid-cols-2">
          {stages.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{s.grades}</div>
              <h3 className="mt-2 font-serif text-2xl">{s.name}</h3>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-leaf py-20">
        <div className="container-prose">
          <SectionHeader eyebrow="Beyond the Classroom" title="Where talent finds its voice." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {beyond.map((b) => (
              <div key={b.title} className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
                  <b.icon className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-xl mb-2">{b.title}</h4>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
