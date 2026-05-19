import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const cols = [
  {
    title: "Explore",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/academics", label: "Academics" },
      { to: "/faculty", label: "Faculty" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { to: "/admissions", label: "Apply Online" },
      { to: "/admissions", label: "Fee Structure" },
      { to: "/news", label: "News & Events" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-leaf">
      <div className="container-prose py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-5">
            <Logo />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A nurturing space in Pai, Kaithal where curious minds bloom — through
              compassionate teaching, modern facilities, and a deep love for learning.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+910000000000" className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> +91 00000 00000
              </a>
              <a href="mailto:info@greenvalleypai.edu.in" className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" /> info@greenvalleypai.edu.in
              </a>
              <span className="inline-flex items-start gap-2 text-foreground/80">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" /> Village Pai, Kaithal, Haryana — 136027
              </span>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Green Valley Public School, Pai (Kaithal). All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
