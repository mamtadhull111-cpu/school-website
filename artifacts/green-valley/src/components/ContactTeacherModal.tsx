import { useState } from "react";
import { X, Send, UserRound } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Faculty } from "@/data/content";

type Props = {
  teacher: Faculty | null;
  onClose: () => void;
};

const formSchema = z.object({
  parentName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  message: z.string().trim().min(5, "Please write a message").max(500),
});

type FormValues = z.infer<typeof formSchema>;

const initial: FormValues = { parentName: "", email: "", phone: "", message: "" };

const Field = ({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <Label className="mb-1.5 inline-block text-foreground">{label}</Label>
    {children}
    {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
  </div>
);

export const ContactTeacherModal = ({ teacher, onClose }: Props) => {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!teacher) return null;

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
      toast.success("Message sent!", {
        description: `${teacher.name} will be notified. Our team will get back to you shortly.`,
      });
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-primary px-7 py-5 text-primary-foreground rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 font-serif text-lg font-semibold shrink-0">
                {teacher.initials}
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold leading-tight">Contact {teacher.name}</h2>
                <p className="text-xs text-primary-foreground/75 mt-0.5">{teacher.role} · {teacher.department}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0 ml-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="px-7 py-6 flex flex-col gap-4">
          <Field label="Your Name" error={errors.parentName}>
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

          <Field label="Your Message" error={errors.message}>
            <Textarea
              value={values.message}
              onChange={(e) => onChange("message", e.target.value)}
              placeholder={`Write your question or message for ${teacher.name}…`}
              rows={4}
              maxLength={500}
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">{values.message.length}/500</p>
          </Field>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 mt-1"
          >
            {submitting ? "Sending…" : (<>Send Message <Send className="ml-1.5 h-4 w-4" /></>)}
          </Button>

          <p className="text-center text-xs text-muted-foreground -mt-1">
            Your message will be forwarded to the school office who will connect you with {teacher.name}.
          </p>
        </form>
      </div>
    </div>
  );
};
