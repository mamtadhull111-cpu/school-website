import { Sprout, BookOpen, Users, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const features = [
  {
    icon: Sprout,
    title: "Holistic Learning",
    description: "Academics balanced with arts, sports, and life skills — so children grow in mind, body, and character.",
  },
  {
    icon: BookOpen,
    title: "Modern Curriculum",
    description: "Concept-based learning, smart classrooms, and projects that connect lessons to the real world.",
  },
  {
    icon: Users,
    title: "Caring Faculty",
    description: "Experienced, patient teachers who know every child by name and nurture them as individuals.",
  },
  {
    icon: Trophy,
    title: "Proven Excellence",
    description: "Consistent board results and a track record of achievements in academics, sports, and culture.",
  },
];

export const WhyUs = () => {
  return (
    <section className="bg-gradient-leaf py-24">
      <div className="container-prose">
        <SectionHeader
          eyebrow="Why Green Valley"
          title="An education that goes beyond marks."
          description="We believe a great school is measured by the kind of human beings it shapes."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-700 group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
