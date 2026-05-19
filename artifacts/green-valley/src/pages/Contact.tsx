import { Suspense, lazy, useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import contactHeroImg from "@assets/7_1777541154531.jpg";

const SchoolMap = lazy(() => import("@/components/SchoolMap"));

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  subject: z.string().trim().min(2, "Subject is required").max(120),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

type Values = z.infer<typeof schema>;
const initial: Values = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: keyof Values, v: string) => {
    setValues((o) => ({ ...o, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const fe: Partial<Record<keyof Values, string>> = {};
      for (const i of r.error.issues) {
        const k = i.path[0] as keyof Values;
        if (!fe[k]) fe[k] = i.message;
      }
      setErrors(fe);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValues(initial);
      toast.success("Message sent!", { description: "We'll get back to you soon." });
    }, 700);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        description="Visit us in Pai, drop a message, or call — our office is happy to help."
        image={contactHeroImg}
      />

      <section className="container-prose py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Address", lines: ["Village Pai, Kaithal", "Haryana — 136027, India"] },
              { icon: Phone, title: "Mobile", lines: [{ label: "099960 65035", href: "tel:+919996065035" }] },
              { icon: MessageCircle, title: "WhatsApp", lines: [{ label: "+91 99960 65035", href: "https://wa.me/919996065035" }] },
              { icon: Mail, title: "Email", lines: [{ label: "greenvalleypai@gmail.com", href: "mailto:greenvalleypai@gmail.com" }] },
              { icon: Clock, title: "Office Hours", lines: ["Mon — Sat · 8:00 AM — 3:30 PM", "Closed on Sundays & holidays"] },
            ].map((b) => (
              <div
                key={b.title}
                className="shimmer-card group flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.18),0_12px_40px_-10px_hsl(var(--primary)/0.22)] hover:border-primary/50"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)]">
                  <b.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground transition-colors group-hover:text-primary">{b.title}</div>
                  {b.lines.map((l) =>
                    typeof l === "string" ? (
                      <div key={l} className="text-sm text-muted-foreground">{l}</div>
                    ) : (
                      <a
                        key={l.label}
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </a>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card">
            <h3 className="font-serif text-2xl mb-1">Send us a message</h3>
            <p className="text-sm text-muted-foreground mb-6">We typically respond within one working day.</p>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your Name" error={errors.name}>
                <Input value={values.name} onChange={(e) => onChange("name", e.target.value)} maxLength={80} placeholder="Full name" />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input type="email" value={values.email} onChange={(e) => onChange("email", e.target.value)} maxLength={120} placeholder="you@example.com" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Subject" error={errors.subject}>
                  <Input value={values.subject} onChange={(e) => onChange("subject", e.target.value)} maxLength={120} placeholder="What is this about?" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Message" error={errors.message}>
                  <Textarea rows={5} value={values.message} onChange={(e) => onChange("message", e.target.value)} maxLength={1000} placeholder="Write your message here…" />
                </Field>
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-6 w-full bg-primary hover:bg-primary-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 md:w-auto"
            >
              {submitting ? "Sending…" : (<>Send Message <Send className="ml-1 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="group relative overflow-hidden rounded-3xl border border-border shadow-card transition-all duration-500 hover:shadow-soft hover:-translate-y-1 hover:border-primary/40">
          <Suspense
            fallback={
              <div className="h-[420px] w-full flex items-center justify-center bg-muted text-muted-foreground text-sm rounded-3xl">
                Loading map…
              </div>
            }
          >
            <SchoolMap />
          </Suspense>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto z-[1000]">
            <a
              href="https://share.google/nGal91jrhXRpwQDBO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary-glow hover:scale-105 active:scale-95"
            >
              <MapPin className="h-4 w-4" />
              View School on Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

const Field = ({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <Label className="mb-1.5 inline-block text-foreground">{label}</Label>
    {children}
    {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
  </div>
);

export default Contact;
