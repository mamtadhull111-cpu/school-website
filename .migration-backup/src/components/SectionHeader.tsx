import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export const SectionHeader = ({ eyebrow, title, description, align = "center", className }: Props) => {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="h-px w-6 bg-primary/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  );
};
