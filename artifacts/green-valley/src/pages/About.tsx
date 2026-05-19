import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Heart, Sparkles, Shield, Lightbulb } from "lucide-react";
import visionImg from "@assets/v_1778233826193.jpg";
import missionImg from "@assets/u_1778309592519.PNG";

const values = [
  { icon: Shield,    title: "Integrity",   text: "Doing the right thing — even when no one is watching." },
  { icon: Sparkles,  title: "Excellence",  text: "Striving, learning, and improving every single day." },
  { icon: Heart,     title: "Compassion",  text: "Kindness as a habit, empathy as a way of life." },
  { icon: Lightbulb, title: "Innovation",  text: "Asking better questions and exploring new ideas." },
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
    <>
      <div id="about-us">
        <PageHero
          eyebrow="About Us"
          title="Two decades of nurturing potential, one child at a time."
          description="Green Valley Public School began in 2000 as a small dream in the village of Pai — to give every child a school they could call their own."
        />
      </div>

      <section id="vision" className="container-prose pt-20 pb-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={visionImg}
              alt="Our Vision — Goals, Growth, Creativity, Innovation"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be a school where every child discovers their unique strengths and grows into a compassionate, curious, and capable young adult — ready for the world, and to make it kinder.
            </p>
          </div>
        </div>
      </section>

      <section id="mission" className="container-prose py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              We blend academic rigour with art, sport, and character — taught by teachers who lead with patience, listen with care, and inspire with their own love of learning.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={missionImg}
              alt="Our Mission — nurturing students through learning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="campus-life" className="container-prose py-20">
        <SectionHeader eyebrow="What We Stand For" title="Our core values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="shimmer-card group rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.2),0_16px_48px_-12px_hsl(var(--primary)/0.25)] hover:border-primary/50"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.4)]">
                <v.icon className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-xl mb-2 transition-colors duration-300 group-hover:text-primary">{v.title}</h4>
              <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="history" className="bg-gradient-leaf py-20">
        <div className="container-prose">
          <SectionHeader eyebrow="Our Journey" title="Milestones along the way" />
          <ol className="relative mx-auto max-w-3xl border-l-2 border-primary/20 pl-8">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="group relative mb-10 last:mb-0 transition-all duration-300 hover:translate-x-1"
              >
                <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-card transition-all duration-300 group-hover:scale-110 group-hover:shadow-soft">
                  •
                </span>
                <div className="font-serif text-2xl text-primary transition-colors group-hover:text-primary-glow">{m.year}</div>
                <p className="mt-1 text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default About;
