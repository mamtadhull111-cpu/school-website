import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
};

export const SectionHeader = ({ eyebrow, title, description, align = "center", className, invert = false }: Props) => {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
            invert ? "text-white/90" : "text-primary",
          )}
        >
          <span className={cn("h-px w-6", invert ? "bg-white/70" : "bg-primary/60")} />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 font-serif text-3xl md:text-4xl lg:text-5xl text-balance",
          invert ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-pretty",
            invert ? "text-white/90" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
