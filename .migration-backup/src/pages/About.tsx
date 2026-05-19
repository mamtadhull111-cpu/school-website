import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Heart, Sparkles, Shield, Lightbulb, Quote } from "lucide-react";

const values = [
  { icon: Shield, title: "Integrity", text: "Doing the right thing — even when no one is watching." },
  { icon: Sparkles, title: "Excellence", text: "Striving, learning, and improving every single day." },
  { icon: Heart, title: "Compassion", text: "Kindness as a habit, empathy as a way of life." },
  { icon: Lightbulb, title: "Innovation", text: "Asking better questions and exploring new ideas." },
];

const milestones = [
  { year: "2000", text: "Founded with a vision to bring quality education to Pai." },
  { year: "2008", text: "Senior Secondary wing established with Science & Commerce streams." },
  { year: "2014", text: "New campus block with smart classrooms and science labs opened." },
  { year: "2019", text: "Recognized among the top schools in Kaithal district." },
  { year: "2024", text: "Crossed 1,200 students with alumni in 80+ universities worldwide." },
];

const About = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="About Us"
        title="Two decades of nurturing potential, one child at a time."
        description="Green Valley Public School began in 2000 as a small dream in the village of Pai — to give every child a school they could call their own."
      />

      <section className="container-prose py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be a school where every child discovers their unique strengths and grows into a compassionate, curious, and capable young adult — ready for the world, and to make it kinder.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              We blend academic rigour with art, sport, and character — taught by teachers who lead with patience, listen with care, and inspire with their own love of learning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-leaf py-20">
        <div className="container-prose">
          <div className="rounded-3xl border border-border bg-card p-10 md:p-14 shadow-card">
            <Quote className="h-10 w-10 text-primary mb-4" />
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground text-pretty">
              “Twenty-four years ago, we opened our gates with thirty-eight children and a single belief — that a good teacher and a kind classroom can change a life. That belief still guides everything we do.”
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg">
                AV
              </div>
              <div>
                <div className="font-semibold text-foreground">Dr. Anita Verma</div>
                <div className="text-sm text-muted-foreground">Principal, Green Valley Public School</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <SectionHeader eyebrow="What We Stand For" title="Our core values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-xl mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-leaf py-20">
        <div className="container-prose">
          <SectionHeader eyebrow="Our Journey" title="Milestones along the way" />
          <ol className="relative mx-auto max-w-3xl border-l-2 border-primary/20 pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-card">
                  •
                </span>
                <div className="font-serif text-2xl text-primary">{m.year}</div>
                <p className="mt-1 text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  );
};

export default About;
