import { Quote } from "lucide-react";

export const Welcome = () => {
  return (
    <section className="container-prose py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">

        {/* LEFT — large principal photo */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-soft">
            <img
              src="/principal.jpg"
              alt="Mr. Jagmohan Sharma, Principal"
              className="w-full h-[480px] lg:h-[560px] object-cover object-top"
            />
            {/* Bottom gradient overlay with name */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-7 pb-7 pt-16">
              <p className="font-serif text-xl text-white font-semibold">Mr. Jagmohan Sharma</p>
              <p className="text-sm text-white/80 mt-0.5">Principal, Green Valley Public School</p>
            </div>
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl bg-primary/10 -z-10" />
          <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-secondary -z-10" />
        </div>

        {/* RIGHT — school intro + quote */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Welcome</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-snug text-foreground">
              A school where children come first — always.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              At Green Valley Public School, learning is more than textbooks. It is the quiet confidence of a child who tried, the spark of a question asked, and the joy of discovering one's own potential. For over two decades, we have served the families of Pai and the wider Kaithal community with care, character, and academic rigour.
            </p>
          </div>

          {/* Principal's quote card */}
          <figure className="shimmer-card group relative rounded-2xl border border-border bg-gradient-leaf p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.18),0_12px_40px_-10px_hsl(var(--primary)/0.22)] hover:border-primary/40">
            <Quote className="absolute -top-4 left-7 h-9 w-9 rounded-full bg-primary p-2 text-primary-foreground" />
            <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-foreground">
              "Education is not the filling of a pail, but the lighting of a fire. At Green Valley, we strive every day to keep that fire burning bright in every child."
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground font-medium">
              — Mr. Jagmohan Sharma, Principal
            </figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
};
