import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import facebookImg from "@assets/f_1778223580218.webp";
import instagramImg from "@assets/i_1778223587092.jpg";
import youtubeImg from "@assets/download_1778223696633.png";
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
      { to: "/contact", label: "Contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-prose py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-5">
            <Logo invert />
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/75">
              A nurturing space in Pai, Kaithal where curious minds bloom — through
              compassionate teaching, modern facilities, and a deep love for learning.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+919996065035" className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 text-accent" /> +91 99960 65035
              </a>
              <a href="mailto:greenvalleypai@gmail.com" className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors">
                <Mail className="h-4 w-4 text-accent" /> greenvalleypai@gmail.com
              </a>
              <span className="inline-flex items-start gap-2 text-primary-foreground/85">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" /> Village Pai, Kaithal, Haryana — 136027
              </span>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg mb-4 text-primary-foreground">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center text-sm text-primary-foreground/70 hover:text-accent transition-colors"
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

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-primary-foreground/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Green Valley Public School, Pai (Kaithal). All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { img: facebookImg, label: "Facebook" },
              { img: instagramImg, label: "Instagram" },
              { img: youtubeImg, label: "YouTube" },
            ].map(({ img, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/25 hover:border-accent hover:shadow-[0_0_12px_hsl(var(--accent)/0.5)] transition-all duration-300 overflow-hidden hover:scale-110"
              >
                <img src={img} alt={label} className="h-7 w-7 object-contain rounded-full transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
