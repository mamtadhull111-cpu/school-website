import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

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
    <Layout>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        description="Visit us in Pai, drop a message, or call — our office is happy to help."
      />

      <section className="container-prose py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Address", lines: ["Village Pai, Kaithal", "Haryana — 136027, India"] },
              { icon: Phone, title: "Phone", lines: ["+91 00000 00000", "+91 00000 00000 (Office)"] },
              { icon: Mail, title: "Email", lines: ["info@greenvalleypai.edu.in", "admissions@greenvalleypai.edu.in"] },
              { icon: Clock, title: "Office Hours", lines: ["Mon — Sat · 8:00 AM — 3:30 PM", "Closed on Sundays & holidays"] },
            ].map((b) => (
              <div key={b.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{b.title}</div>
                  {b.lines.map((l) => (
                    <div key={l} className="text-sm text-muted-foreground">{l}</div>
                  ))}
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
            <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full bg-primary hover:bg-primary/90 md:w-auto">
              {submitting ? "Sending…" : (<>Send Message <Send className="ml-1 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="overflow-hidden rounded-3xl border border-border shadow-card">
          <iframe
            title="Green Valley Public School — Pai, Kaithal map"
            src="https://www.google.com/maps?q=Pai,+Kaithal,+Haryana&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </Layout>
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
