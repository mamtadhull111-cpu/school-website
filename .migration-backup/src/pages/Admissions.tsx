import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, FileText, ClipboardCheck, MessageSquareText, Send } from "lucide-react";

const steps = [
  { icon: MessageSquareText, title: "Inquire", text: "Submit the online inquiry form below." },
  { icon: FileText, title: "Apply", text: "Visit the school office to collect & submit forms." },
  { icon: ClipboardCheck, title: "Assessment", text: "Friendly age-appropriate interaction with the child." },
  { icon: CheckCircle2, title: "Confirmation", text: "Admission letter & fee details shared on email." },
];

const fees = [
  { stage: "Pre-Primary (Nursery — KG)", admission: "₹ 5,000", quarterly: "₹ 6,500" },
  { stage: "Primary (Grades 1 — 5)", admission: "₹ 6,000", quarterly: "₹ 8,000" },
  { stage: "Secondary (Grades 6 — 10)", admission: "₹ 7,500", quarterly: "₹ 10,000" },
  { stage: "Sr. Secondary (Grades 11 — 12)", admission: "₹ 9,000", quarterly: "₹ 12,500" },
];

const documents = [
  "Birth certificate of the child",
  "Last school's Transfer Certificate (if applicable)",
  "Latest report card / progress report",
  "4 recent passport-size photographs",
  "Aadhaar copy of student & parent",
  "Address proof",
];

const formSchema = z.object({
  parentName: z.string().trim().min(2, "Please enter parent's full name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  childName: z.string().trim().min(2, "Please enter child's name").max(80),
  dob: z.string().min(1, "Date of birth is required"),
  grade: z.string().min(1, "Please choose a class"),
  message: z.string().trim().max(500, "Message must be under 500 characters").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const initial: FormValues = {
  parentName: "",
  email: "",
  phone: "",
  childName: "",
  dob: "",
  grade: "",
  message: "",
};

const grades = [
  "Nursery", "LKG", "UKG",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12",
];

const Admissions = () => {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (key: keyof FormValues, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValues(initial);
      toast.success("Inquiry received!", {
        description: "Our admissions team will reach out within 2 working days.",
      });
    }, 700);
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Admissions 2025 — 26"
        title="Begin your child's Green Valley journey."
        description="A simple, transparent process. Submit an inquiry and we'll guide you through each step."
      />

      <section className="container-prose py-20">
        <SectionHeader eyebrow="How it Works" title="Four steps to admission" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Step {i + 1}
              </div>
              <h4 className="mt-1 font-serif text-xl">{s.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-leaf py-20">
        <div className="container-prose grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Fee Structure" title="Indicative fees" className="mb-6" />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary text-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Stage</th>
                    <th className="px-5 py-3 font-semibold">Admission</th>
                    <th className="px-5 py-3 font-semibold">Quarterly</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((f) => (
                    <tr key={f.stage} className="border-t border-border">
                      <td className="px-5 py-3.5 text-foreground">{f.stage}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{f.admission}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{f.quarterly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              * Indicative figures. Final fees confirmed in the admission letter.
            </p>
          </div>
          <div>
            <SectionHeader align="left" eyebrow="What to Bring" title="Required documents" className="mb-6" />
            <ul className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-card">
              {documents.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="inquiry" className="container-prose py-20">
        <SectionHeader
          eyebrow="Inquiry Form"
          title="Tell us a little about your child."
          description="Our admissions team will get back to you within 2 working days."
        />
        <form
          onSubmit={onSubmit}
          noValidate
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Parent's Name" error={errors.parentName}>
              <Input
                value={values.parentName}
                onChange={(e) => onChange("parentName", e.target.value)}
                placeholder="e.g. Sunita Sharma"
                maxLength={80}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <Input
                type="email"
                value={values.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="you@example.com"
                maxLength={120}
              />
            </Field>
            <Field label="Mobile Number" error={errors.phone}>
              <Input
                value={values.phone}
                onChange={(e) => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile"
                inputMode="numeric"
              />
            </Field>
            <Field label="Child's Name" error={errors.childName}>
              <Input
                value={values.childName}
                onChange={(e) => onChange("childName", e.target.value)}
                placeholder="Child's full name"
                maxLength={80}
              />
            </Field>
            <Field label="Date of Birth" error={errors.dob}>
              <Input
                type="date"
                value={values.dob}
                onChange={(e) => onChange("dob", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </Field>
            <Field label="Class Applying For" error={errors.grade}>
              <select
                value={values.grade}
                onChange={(e) => onChange("grade", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select a class…</option>
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Anything you'd like us to know? (optional)" error={errors.message}>
                <Textarea
                  value={values.message ?? ""}
                  onChange={(e) => onChange("message", e.target.value)}
                  placeholder="Tell us about your child, your questions, or preferred visit timing."
                  rows={4}
                  maxLength={500}
                />
              </Field>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="mt-8 w-full bg-primary hover:bg-primary/90 md:w-auto"
          >
            {submitting ? "Submitting…" : (
              <>Submit Inquiry <Send className="ml-1 h-4 w-4" /></>
            )}
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            By submitting, you agree to be contacted by our admissions team. We respect your privacy.
          </p>
        </form>
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

export default Admissions;
