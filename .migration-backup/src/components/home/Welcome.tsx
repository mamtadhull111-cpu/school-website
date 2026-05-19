import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Welcome = () => {
  return (
    <section className="container-prose py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
        <SectionHeader
          align="left"
          eyebrow="Welcome"
          title="A school where children come first — always."
          description="At Green Valley Public School, learning is more than textbooks. It is the quiet confidence of a child who tried, the spark of a question asked, and the joy of discovering one's own potential. For over two decades, we have served the families of Pai and the wider Kaithal community with care, character, and academic rigour."
          className="mb-0"
        />
        <figure className="relative rounded-2xl border border-border bg-gradient-leaf p-8 md:p-10 shadow-card">
          <Quote className="absolute -top-4 left-8 h-10 w-10 rounded-full bg-primary p-2 text-primary-foreground" />
          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-foreground">
            “Education is not the filling of a pail, but the lighting of a fire. At Green Valley, we strive every day to keep that fire burning bright in every child.”
          </blockquote>
          <figcaption className="mt-6">
            <div className="font-semibold text-foreground">Principal's Message</div>
            <div className="text-sm text-muted-foreground">Green Valley Public School</div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
