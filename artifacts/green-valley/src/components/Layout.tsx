import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { VallyWelcome } from "@/components/VallyWelcome";
import { cn } from "@/lib/utils";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);
  const [tourActive, setTourActive] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    const handle = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />

      {/* AI Assistant — hidden while tour is active */}
      <AIAssistant hidden={tourActive} />

      {/* Vally welcome + tour */}
      <VallyWelcome
        onTourStart={() => setTourActive(true)}
        onTourEnd={() => setTourActive(false)}
      />

      {/* Floating Back-to-Top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "fixed bottom-8 right-8 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-soft transition-all duration-300",
          "bg-primary text-primary-foreground",
          "hover:bg-primary-glow hover:scale-110 hover:shadow-lg",
          "active:scale-95",
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};
