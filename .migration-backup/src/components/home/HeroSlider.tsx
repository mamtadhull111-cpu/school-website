import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import campus from "@/assets/hero-campus.jpg";
import classroom from "@/assets/hero-classroom.jpg";
import sports from "@/assets/hero-sports.jpg";

const slides = [
  {
    image: campus,
    eyebrow: "Welcome to Green Valley",
    title: "Nurturing Minds.\nBuilding Futures.",
    description:
      "A modern learning sanctuary in the heart of Pai, Kaithal — where every child is known, valued, and inspired to grow.",
    cta: { label: "Explore the School", to: "/about" },
  },
  {
    image: classroom,
    eyebrow: "Holistic Learning",
    title: "Curiosity, Sparked\nin Every Classroom.",
    description:
      "Smart classrooms, small batches, and teachers who care — designed for understanding, not just answers.",
    cta: { label: "View Academics", to: "/academics" },
  },
  {
    image: sports,
    eyebrow: "Beyond the Classroom",
    title: "Play. Create.\nDiscover Yourself.",
    description:
      "Sports, arts, music and clubs — because brilliant minds need joyful days too.",
    cta: { label: "See Gallery", to: "/gallery" },
  },
];

export const HeroSlider = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt=""
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "h-full w-full object-cover",
              i === active && "animate-kenburns",
            )}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:justify-center md:pb-0 lg:px-10">
        <div key={active} className="max-w-2xl text-primary-foreground animate-slide-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md">
            <MapPin className="h-3 w-3" /> Pai, Kaithal · Haryana
          </span>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-white/80">
            {slides[active].eyebrow}
          </p>
          <h1 className="mt-3 whitespace-pre-line font-serif text-4xl font-semibold leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            {slides[active].title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
            {slides[active].description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/admissions">
                Apply for 2025–26 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to={slides[active].cta.to}>{slides[active].cta.label}</Link>
            </Button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-2 lg:right-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full bg-white/40 transition-all duration-500",
                i === active ? "w-10 bg-white" : "w-5 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
