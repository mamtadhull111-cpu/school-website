import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, MapPin, Home, ChevronDown, Info, Clock, Target, Trees, BookOpen, BookMarked, Star, LayoutDashboard, ListChecks, Banknote, FileText, Send, Users, Shield, LayoutGrid, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { InquiryModal } from "@/components/InquiryModal";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LanguageContext";
import facebookImg from "@assets/f_1778223580218.webp";
import instagramImg from "@assets/i_1778223587092.jpg";
import youtubeImg from "@assets/download_1778223696633.png";

const socials = [
  { img: facebookImg, label: "Facebook", href: "#" },
  { img: instagramImg, label: "Instagram", href: "#" },
  { img: youtubeImg, label: "YouTube", href: "#" },
];

type NavLink = { to: string; label: string; icon?: React.ElementType };

const links: NavLink[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/faculty", label: "Faculty" },
  { to: "/admissions", label: "Admissions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const aboutItems = [
  { label: "About Us", hash: "about-us", icon: Info },
  { label: "Vision", hash: "vision", icon: Star },
  { label: "Mission", hash: "mission", icon: Target },
  { label: "Campus Life", hash: "campus-life", icon: Trees },
  { label: "History", hash: "history", icon: Clock },
];

const academicsItems = [
  { label: "Academics Overview", hash: "academics-overview", icon: BookOpen },
  { label: "Classes", hash: "classes", icon: BookMarked },
  { label: "Time Table", hash: "time-table", icon: Clock },
  { label: "Curriculum", hash: "curriculum", icon: Star },
  { label: "Activity", hash: "activity", icon: Trophy },
];

const admissionsItems = [
  { label: "Overview", hash: "admissions-overview", icon: LayoutDashboard },
  { label: "Process", hash: "process", icon: ListChecks },
  { label: "Fee Structure", hash: "fee-structure", icon: Banknote },
  { label: "Documents", hash: "fee-structure", icon: FileText },
  { label: "Apply Now", hash: "inquiry", icon: Send },
];

const facultyItems = [
  { label: "All Teachers", hash: "all-teachers", icon: Users },
  { label: "Leadership Team", hash: "leadership-team", icon: Shield },
  { label: "Department", hash: "department", icon: LayoutGrid },
];

export const Navbar = () => {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top utility bar — address + socials. Hides on scroll. */}
      <div
        className={cn(
          "bg-primary text-primary-foreground transition-all duration-500 overflow-hidden",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
          <a
            href="https://maps.google.com/?q=Green+Valley+Public+School+Pai+Kaithal+Haryana"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-primary-foreground/90 hover:text-accent transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Village Pai, Kaithal, Haryana — 136027</span>
            <span className="sm:hidden">Pai, Kaithal · Haryana</span>
          </a>
          <div className="flex items-center gap-1">
            {socials.map(({ img, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <img src={img} alt={label} className="h-5 w-5 object-contain rounded-full" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 lg:px-6 transition-all duration-500",
          scrolled
            ? "glass border border-border/60 rounded-2xl shadow-card"
            : "bg-transparent",
        )}
      >
        <div className="flex h-14 items-center justify-between">
          <Logo compact={scrolled} />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {links.map((l) => {
              if (l.to === "/about") {
                return (
                  <div
                    key={l.to}
                    ref={aboutRef}
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        cn(
                          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          About
                          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", aboutOpen && "rotate-180")} />
                          <span className={cn("absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300", isActive && "scale-x-100")} />
                        </>
                      )}
                    </NavLink>

                    <div className={cn(
                      "absolute left-0 top-full pt-2 transition-all duration-200",
                      aboutOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none",
                    )}>
                      <div className="w-48 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                        {aboutItems.map((item) => (
                          <button
                            key={item.hash}
                            onClick={() => {
                              setAboutOpen(false);
                              const scrollToSection = () => {
                                const el = document.getElementById(item.hash);
                                if (el) {
                                  const offset = 80;
                                  const top = el.getBoundingClientRect().top + window.scrollY - offset;
                                  window.scrollTo({ top, behavior: "smooth" });
                                }
                              };
                              if (location.pathname === "/about") {
                                scrollToSection();
                              } else {
                                navigate("/about");
                                setTimeout(scrollToSection, 350);
                              }
                            }}
                            className="group flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/75 hover:bg-secondary hover:text-primary transition-all duration-200 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-0.5 before:rounded-full before:bg-primary before:scale-y-0 before:transition-transform before:duration-200 hover:before:scale-y-100 hover:pl-5"
                          >
                            <item.icon className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (l.to === "/academics") {
                return (
                  <div
                    key={l.to}
                    className="relative"
                    onMouseEnter={() => setAcademicsOpen(true)}
                    onMouseLeave={() => setAcademicsOpen(false)}
                  >
                    <NavLink
                      to="/academics"
                      className={({ isActive }) =>
                        cn(
                          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Academics
                          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", academicsOpen && "rotate-180")} />
                          <span className={cn("absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300", isActive && "scale-x-100")} />
                        </>
                      )}
                    </NavLink>

                    <div className={cn(
                      "absolute left-0 top-full pt-2 transition-all duration-200 z-10",
                      academicsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none",
                    )}>
                      <div className="w-52 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                        {academicsItems.map((item) => (
                          <button
                            key={item.hash}
                            onClick={() => {
                              setAcademicsOpen(false);
                              const scrollToSection = () => {
                                const el = document.getElementById(item.hash);
                                if (el) {
                                  const offset = 80;
                                  const top = el.getBoundingClientRect().top + window.scrollY - offset;
                                  window.scrollTo({ top, behavior: "smooth" });
                                }
                              };
                              if (location.pathname === "/academics") {
                                scrollToSection();
                              } else {
                                navigate("/academics");
                                setTimeout(scrollToSection, 350);
                              }
                            }}
                            className="group flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/75 hover:bg-secondary hover:text-primary transition-all duration-200 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-0.5 before:rounded-full before:bg-primary before:scale-y-0 before:transition-transform before:duration-200 hover:before:scale-y-100 hover:pl-5"
                          >
                            <item.icon className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (l.to === "/admissions") {
                return (
                  <div
                    key={l.to}
                    className="relative"
                    onMouseEnter={() => setAdmissionsOpen(true)}
                    onMouseLeave={() => setAdmissionsOpen(false)}
                  >
                    <NavLink
                      to="/admissions"
                      className={({ isActive }) =>
                        cn(
                          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Admissions
                          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", admissionsOpen && "rotate-180")} />
                          <span className={cn("absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300", isActive && "scale-x-100")} />
                        </>
                      )}
                    </NavLink>

                    <div className={cn(
                      "absolute left-0 top-full pt-2 transition-all duration-200 z-10",
                      admissionsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none",
                    )}>
                      <div className="w-48 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                        {admissionsItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => {
                              setAdmissionsOpen(false);
                              const scrollToSection = () => {
                                const el = document.getElementById(item.hash);
                                if (el) {
                                  const offset = 80;
                                  const top = el.getBoundingClientRect().top + window.scrollY - offset;
                                  window.scrollTo({ top, behavior: "smooth" });
                                }
                              };
                              if (location.pathname === "/admissions") {
                                scrollToSection();
                              } else {
                                navigate("/admissions");
                                setTimeout(scrollToSection, 350);
                              }
                            }}
                            className="group flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/75 hover:bg-secondary hover:text-primary transition-all duration-200 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-0.5 before:rounded-full before:bg-primary before:scale-y-0 before:transition-transform before:duration-200 hover:before:scale-y-100 hover:pl-5"
                          >
                            <item.icon className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (l.to === "/faculty") {
                return (
                  <div
                    key={l.to}
                    className="relative"
                    onMouseEnter={() => setFacultyOpen(true)}
                    onMouseLeave={() => setFacultyOpen(false)}
                  >
                    <NavLink
                      to="/faculty"
                      className={({ isActive }) =>
                        cn(
                          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          Faculty
                          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", facultyOpen && "rotate-180")} />
                          <span className={cn("absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300", isActive && "scale-x-100")} />
                        </>
                      )}
                    </NavLink>

                    <div className={cn(
                      "absolute left-0 top-full pt-2 transition-all duration-200 z-10",
                      facultyOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none",
                    )}>
                      <div className="w-48 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                        {facultyItems.map((item) => (
                          <button
                            key={item.hash}
                            onClick={() => {
                              setFacultyOpen(false);
                              navigate(`/faculty#${item.hash}`);
                            }}
                            className="group flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/75 hover:bg-secondary hover:text-primary transition-all duration-200 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-0.5 before:rounded-full before:bg-primary before:scale-y-0 before:transition-transform before:duration-200 hover:before:scale-y-100 hover:pl-5"
                          >
                            <item.icon className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="inline-flex items-center gap-1.5">
                        {l.icon && <l.icon className="h-3.5 w-3.5" />}
                        {l.label}
                      </span>
                      <span className={cn("absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300", isActive && "scale-x-100")} />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden md:inline-flex bg-primary hover:bg-primary/90"
              onClick={() => setInquiryOpen(true)}
            >
              Apply Now <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "lg:hidden grid transition-all duration-500 overflow-hidden",
            open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <nav className="flex flex-col gap-1 rounded-xl border border-border bg-card p-2" aria-label="Mobile">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors inline-flex items-center gap-1.5",
                      isActive
                        ? "bg-secondary text-primary"
                        : "text-foreground/80 hover:bg-muted",
                    )
                  }
                >
                  {l.icon && <l.icon className="h-3.5 w-3.5" />}
                  {l.label}
                </NavLink>
              ))}
              <Button
                className="mt-2 bg-primary hover:bg-primary/90"
                onClick={() => { setOpen(false); setInquiryOpen(true); }}
              >
                Apply Now
              </Button>
            </nav>
          </div>
        </div>
      </div>
      </div>
    </header>

    <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
};
