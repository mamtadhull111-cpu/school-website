import { Link } from "react-router-dom";
import schoolLogo from "@assets/green-removebg-preview_1777530768576.png";

export const Logo = ({ compact = false, invert = false }: { compact?: boolean; invert?: boolean }) => {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="Green Valley Public School — home">
      <span className="relative inline-flex h-12 w-12 items-center justify-center transition-transform duration-500 group-hover:rotate-[8deg]">
        <img
          src={schoolLogo}
          alt="Green Valley Public School logo"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={
            invert
              ? "font-serif text-base md:text-lg font-semibold text-primary-foreground tracking-tight"
              : "font-serif text-base md:text-lg font-semibold text-foreground tracking-tight"
          }
        >
          Green Valley
        </span>
        {!compact && (
          <span
            className={
              invert
                ? "text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium text-primary-foreground/80"
                : "text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium text-foreground"
            }
          >
            Public School · Pai
          </span>
        )}
      </span>
    </Link>
  );
};
