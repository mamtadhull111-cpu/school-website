import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { testimonials } from "@/data/content";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[active];
  return (
    <section className="container-prose py-24">
      <SectionHeader
        eyebrow="Voices of Green Valley"
        title="What our families say."
      />
      <div className="relative mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 md:p-14 shadow-card">
        <Quote className="absolute -top-6 left-10 h-12 w-12 rounded-full bg-primary p-3 text-primary-foreground" />
        <div key={active} className="animate-fade-in">
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground text-pretty">
            “{t.quote}”
          </p>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActive((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActive((i) => (i + 1) % testimonials.length)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full bg-border transition-all duration-300",
                i === active ? "w-8 bg-primary" : "w-2 hover:bg-primary/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
