import { Link } from "react-router-dom";

export const Logo = ({ compact = false }: { compact?: boolean }) => {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="Green Valley Public School — home">
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-500 group-hover:rotate-[8deg]">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 3c-1.5 3-4 4.5-7 5 0 6 3.2 11 7 13 3.8-2 7-7 7-13-3-.5-5.5-2-7-5z"
            fill="currentColor"
            opacity="0.95"
          />
          <path d="M12 8v9M9 12l3 3 3-4" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-base md:text-lg font-semibold text-foreground tracking-tight">
          Green Valley
        </span>
        {!compact && (
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Public School · Pai
          </span>
        )}
      </span>
    </Link>
  );
};
