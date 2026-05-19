import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import campus from "@assets/front_1777530967634.avif";
import classroom from "@assets/side_1777532267565.jpg";
import schoolVideo from "@assets/AQOkrhV617gTSpe-CR1TdFPVwBey8HS0yzuw40yxJ5s0_atZ19SAmeK8MAX9t6_1777538644301.mp4";

type Slide =
  | {
      kind: "name";
      image: string;
      eyebrow: string;
      schoolName: string;
      tagline: string;
    }
  | {
      kind: "default";
      image: string;
      eyebrow: string;
      title: string;
      description: string;
      cta: { label: string; to: string };
    };

const slides: Slide[] = [
  {
    kind: "name",
    image: campus,
    eyebrow: "Established 2006 · Pai, Kaithal",
    schoolName: "Green Valley\nPublic School",
    tagline: "Where every child is known, valued, and inspired to grow.",
  },
  {
    kind: "default",
    image: classroom,
    eyebrow: "Welcome to Green Valley",
    title: "Nurturing Minds.\nBuilding Futures.",
    description:
      "A modern learning sanctuary in the heart of Pai, Kaithal — smart classrooms, small batches, and teachers who care.",
    cta: { label: "Explore the School", to: "/about" },
  },
];

export const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoOpen) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [videoOpen]);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (videoOpen) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [videoOpen]);

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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end overflow-hidden px-6 pb-24 md:justify-center md:pb-0 lg:px-10">
        {slides[active].kind === "name" ? (
          <div
            key={`name-${active}`}
            className="mx-auto max-w-3xl text-center text-primary-foreground animate-slide-in-right"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent md:text-sm">
              {slides[active].eyebrow}
            </p>
            <h1 className="mt-5 whitespace-pre-line font-serif text-4xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
              {slides[active].schoolName}
            </h1>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              Affiliated to CBSE &amp; State Board
            </p>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-accent" />
            <p className="mx-auto mt-6 max-w-md text-base text-white/85 md:text-lg">
              {slides[active].tagline}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/public-disclosure"
                className="group/disc relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/60 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_24px_4px_rgba(var(--accent-rgb,234,179,8)/0.5)] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/disc:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Public Disclosure
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/disc:translate-x-full" />
              </Link>
            </div>
          </div>
        ) : (
          <div key={`default-${active}`} className="max-w-2xl text-primary-foreground animate-slide-up">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/80">
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
                type="button"
                size="lg"
                variant="outline"
                onClick={() => setVideoOpen(true)}
                className="group/btn border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-primary transition-transform duration-300 group-hover/btn:scale-110">
                  <Play className="h-3 w-3 fill-current" />
                </span>
                Watch School Video
              </Button>
            </div>
          </div>
        )}

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

      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="School video"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-fade-in-slow"
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVideoOpen(false);
            }}
            aria-label="Close video"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            ref={videoRef}
            src={schoolVideo}
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-5xl rounded-2xl bg-black shadow-soft animate-scale-in"
          />
        </div>
      )}
    </section>
  );
};
