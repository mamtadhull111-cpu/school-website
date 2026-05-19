import { Sprout, BookOpen, Users, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import caringFacultyImg from "@assets/ChatGPT_Image_Apr_30,_2026,_02_38_28_PM_1777540293257.png";
import curriculumVideo from "@assets/AQMZP-FNXnq5nGdjgEeU4IgVuKu5_6v4WfSQ40eQBwF4EutlwOgwmhdztN_llG_1777614299346.mp4";

type Feature = {
  icon: typeof Sprout;
  title: string;
  description: string;
  image?: string;
  video?: string;
};

const features: Feature[] = [
  {
    icon: Sprout,
    title: "Holistic Learning",
    description: "Academics balanced with arts, sports, and life skills — so children grow in mind, body, and character.",
  },
  {
    icon: BookOpen,
    title: "Modern Curriculum",
    description: "Concept-based learning, smart classrooms, and projects that connect lessons to the real world.",
    video: curriculumVideo,
  },
  {
    icon: Users,
    title: "Caring Faculty",
    description: "Experienced, patient teachers who know every child by name and nurture them as individuals.",
    image: caringFacultyImg,
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
              className="shimmer-card group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.2),0_16px_48px_-12px_hsl(var(--primary)/0.2)] hover:border-primary/50 animate-fade-in flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {f.video && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <video
                    src={f.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
              )}
              {f.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
              )}
              <div className="relative p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl mb-2 transition-colors duration-300 group-hover:text-primary">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">{f.description}</p>
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/5 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
