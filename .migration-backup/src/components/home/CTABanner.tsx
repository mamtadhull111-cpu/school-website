import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTABanner = () => {
  return (
    <section className="container-prose pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 shadow-soft">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] backdrop-blur">
              Admissions 2025 — 26
            </span>
            <h2 className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl text-balance">
              Begin your child's Green Valley story.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              Limited seats across grades. Submit an inquiry form and our admissions team will reach out within two working days.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/admissions">
                Apply Online <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/contact">Visit Campus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
