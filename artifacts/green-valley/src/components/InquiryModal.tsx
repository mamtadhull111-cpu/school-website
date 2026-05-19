import { useState } from "react";
import { X, Send, GraduationCap } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

const formSchema = z.object({
  parentName: z.string().trim().min(2, "Please enter parent's full name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  childName: z.string().trim().min(2, "Please enter child's name").max(80),
  dob: z.string().min(1, "Date of birth is required"),
  grade: z.string().min(1, "Please choose a class"),
  message: z.string().trim().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const initial: FormValues = {
  parentName: "", email: "", phone: "", childName: "", dob: "", grade: "", message: "",
};

const grades = [
  "Nursery", "LKG", "UKG",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12",
];

export const InquiryModal = ({ open, onClose }: Props) => {
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
      setErrors({});
      onClose();
      toast.success("Inquiry received!", {
        description: "Our admissions team will reach out within 2 working days.",
      });
    }, 700);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-primary px-8 py-5 text-primary-foreground rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold">Admission Inquiry</h2>
                <p className="text-xs text-primary-foreground/80 mt-0.5">Green Valley Public School · Pai</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="px-8 py-7">
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
                  rows={3}
                  maxLength={500}
                />
              </Field>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="mt-6 w-full bg-primary hover:bg-primary/90"
          >
            {submitting ? "Submitting…" : (<>Submit Inquiry <Send className="ml-1 h-4 w-4" /></>)}
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            By submitting, you agree to be contacted by our admissions team. We respect your privacy.
          </p>
        </form>
      </div>
    </div>
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
