import { SectionHeader } from "@/components/SectionHeader";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export const PageHero = ({ eyebrow, title, description }: Props) => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-leaf">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-prose relative py-16 md:py-24 animate-fade-in">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </div>
    </section>
  );
};
