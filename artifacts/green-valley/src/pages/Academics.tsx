import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { BookOpen, Music, Trophy, Palette, Microscope, Globe, GraduationCap, ArrowRight, Sparkles, X } from "lucide-react";

const stages = [
  {
    id: "pre-primary",
    name: "Pre-Primary",
    grades: "Nursery & KG",
    borderColor: "border-t-[#f5c518]",
    tagBg: "bg-[#fef9e7]",
    tagText: "text-[#b8860b]",
    points: [
      "Play-based and activity-driven learning",
      "Phonics, early numeracy and storytelling",
      "Art, craft, music and outdoor exploration",
      "Focus on social skills and emotional development",
    ],
  },
  {
    id: "primary",
    name: "Primary",
    grades: "Classes 1 – 5",
    borderColor: "border-t-[#22c55e]",
    tagBg: "bg-[#e8f5e9]",
    tagText: "text-[#166534]",
    points: [
      "Concept-based curriculum aligned with NCERT/CBSE",
      "Daily reading habits and creative writing",
      "Hands-on Mathematics & Science activities",
      "Arts, music and sports integrated into learning",
    ],
  },
  {
    id: "middle-school",
    name: "Middle School",
    grades: "Classes 6 – 8",
    borderColor: "border-t-[#3b82f6]",
    tagBg: "bg-[#dbeafe]",
    tagText: "text-[#1e40af]",
    points: [
      "Subject-specialist teachers for all core subjects",
      "Lab-based Science and computer literacy",
      "Project work, presentations and debates",
      "Introduction to elective subjects and co-curriculars",
    ],
  },
  {
    id: "secondary",
    name: "Secondary",
    grades: "Classes 9 – 10",
    borderColor: "border-t-[#8b5cf6]",
    tagBg: "bg-[#ede9fe]",
    tagText: "text-[#5b21b6]",
    points: [
      "Full CBSE Board curriculum (Class X Board Exam)",
      "Science labs, Math enrichment and language skills",
      "Career awareness and stream guidance from Class 9",
      "Regular mock tests, revision cycles and counselling",
    ],
  },
  {
    id: "senior-secondary",
    name: "Senior Secondary",
    grades: "Classes 11 – 12",
    borderColor: "border-t-[#f43f5e]",
    tagBg: "bg-[#ffe4e6]",
    tagText: "text-[#9f1239]",
    points: [
      "Streams: Science (PCM / PCB), Commerce, Arts/Humanities",
      "One-on-one mentoring by experienced faculty",
      "College and competitive exam preparation (JEE, NEET, CA Foundation)",
      "Leadership, research projects and personality development",
    ],
  },
];

const beyond = [
  { icon: Trophy,     title: "Sports",       text: "Cricket, football, athletics, badminton, kho-kho, yoga." },
  { icon: Palette,    title: "Visual Arts",   text: "Painting, sketching, clay, craft, and an annual exhibition." },
  { icon: Music,      title: "Music & Dance", text: "Vocal, instrumental, and classical & folk dance forms." },
  { icon: Microscope, title: "Clubs",         text: "Science, eco, robotics, debate, drama, and book clubs." },
  { icon: Globe,      title: "Community",     text: "Service projects, plantation drives, and local outreach." },
  { icon: BookOpen,   title: "Library",       text: "10,000+ titles across fiction, reference, and journals." },
];

const Academics = () => {
  const [streamModalOpen, setStreamModalOpen] = useState(false);

  return (
    <>
      <div id="academics-overview">
        <PageHero
          eyebrow="Academics"
          title="A curriculum built around understanding."
          description="CBSE-aligned, taught with care — designed to help students think clearly, ask boldly, and learn deeply."
        />
      </div>

      {/* Classes */}
      <section id="classes" className="py-20 scroll-mt-20">
        <div className="container-prose text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Five stages, one continuous journey.
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            From Nursery to Class XII — every stage is designed to build on the last, nurturing curiosity and confidence at every step.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s) => (
            <div
              key={s.name}
              id={s.id}
              className={`rounded-2xl border border-border bg-card border-t-4 ${s.borderColor} p-7 shadow-card scroll-mt-24`}
            >
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-4 ${s.tagBg} ${s.tagText}`}>
                <GraduationCap className="h-3.5 w-3.5" />
                {s.grades}
              </div>
              <h3 className="font-bold text-xl text-foreground mb-5">{s.name}</h3>
              <ul className="space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stream Selection Guide Button */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-10 flex justify-center">
          <button
            onClick={() => setStreamModalOpen(true)}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-[#f43f5e]/40 bg-gradient-to-br from-[#fff8f8] to-[#ffe4e6] px-8 py-5 shadow-[0_4px_24px_-6px_rgba(244,63,94,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f43f5e] hover:shadow-[0_0_0_3px_rgba(244,63,94,0.15),0_16px_48px_-8px_rgba(244,63,94,0.35)] active:scale-95"
          >
            {/* animated shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f43f5e] text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.55)]">
              <GraduationCap className="h-5 w-5" />
            </span>

            <span className="relative flex flex-col items-start">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9f1239]/70 transition-colors duration-300 group-hover:text-[#9f1239]">
                <Sparkles className="h-3 w-3 transition-transform duration-300 group-hover:scale-125" />
                Classes 11 – 12
              </span>
              <span className="font-serif text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#9f1239]">
                Stream Selection Guide
              </span>
            </span>

            <ArrowRight className="relative ml-2 h-5 w-5 text-[#f43f5e] transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110" />
          </button>
        </div>
      </section>

      {/* Time Table */}
      <section id="time-table" className="container-prose py-20 scroll-mt-20">
        <SectionHeader eyebrow="Time Table" title="Daily schedule at a glance." />
        <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-5 py-3.5 text-left font-semibold">Period</th>
                <th className="px-5 py-3.5 text-left font-semibold">Time</th>
                <th className="px-5 py-3.5 text-left font-semibold">Activity</th>
              </tr>
            </thead>
            <tbody>
              {[
                { period: "1st", time: "8:00 – 8:45 AM", activity: "Morning Assembly & Prayer" },
                { period: "2nd", time: "8:45 – 9:30 AM", activity: "1st Subject" },
                { period: "3rd", time: "9:30 – 10:15 AM", activity: "2nd Subject" },
                { period: "4th", time: "10:15 – 11:00 AM", activity: "3rd Subject" },
                { period: "—", time: "11:00 – 11:20 AM", activity: "Short Break" },
                { period: "5th", time: "11:20 AM – 12:05 PM", activity: "4th Subject" },
                { period: "6th", time: "12:05 – 12:50 PM", activity: "5th Subject" },
                { period: "—", time: "12:50 – 1:20 PM", activity: "Lunch Break" },
                { period: "7th", time: "1:20 – 2:05 PM", activity: "6th Subject" },
                { period: "8th", time: "2:05 – 2:50 PM", activity: "Sports / Activity / Library" },
                { period: "—", time: "2:50 PM", activity: "Dismissal — School Over" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                  <td className="px-5 py-3 font-medium text-primary">{row.period}</td>
                  <td className="px-5 py-3 text-foreground/80">{row.time}</td>
                  <td className="px-5 py-3 text-foreground/80">{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 scroll-mt-20">
        <div className="container-prose text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Curriculum</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Rooted in national standards,<br />taught with local heart.
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Green Valley follows the CBSE curriculum and is also aligned with the Haryana State Board — ensuring every student is prepared for national and state-level pathways.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 lg:px-6 grid gap-6 md:grid-cols-2">
          {/* CBSE */}
          <div className="shimmer-card group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.2),0_16px_48px_-12px_hsl(var(--primary)/0.22)] hover:border-primary/40">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-6">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              CBSE
            </div>
            <h3 className="font-bold text-xl mb-3">Central Board of Secondary Education</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Green Valley Public School is affiliated to the Central Board of Secondary Education (CBSE), New Delhi — one of India's most respected and widely recognised educational boards. The CBSE curriculum emphasises conceptual clarity, scientific temper and holistic development.
            </p>
            <ul className="space-y-2.5">
              {[
                "NCERT textbooks and approved study material",
                "Standardised assessment pattern (CCE + Board Exams)",
                "Board examinations at Class X and Class XII",
                "National-level competitive exam alignment (JEE, NEET, CUET)",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Haryana State Board */}
          <div className="shimmer-card group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.2),0_16px_48px_-12px_hsl(var(--primary)/0.22)] hover:border-primary/40">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-6">
              <Globe className="h-3.5 w-3.5 text-primary" />
              Haryana State Board
            </div>
            <h3 className="font-bold text-xl mb-3">Board of School Education, Haryana (BSEH)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Certain programmes and electives are offered in alignment with the Board of School Education Haryana (BSEH), Bhiwani. This ensures our students are prepared for both state-level and national-level pathways.
            </p>
            <ul className="space-y-2.5">
              {[
                "Hindi medium option available for select subjects",
                "State-level scholarship and Olympiad support",
                "Regional language and cultural education",
                "Seamless transition for students from state board schools",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Activity */}
      <section id="activity" className="bg-gradient-leaf py-20 scroll-mt-20">
        <div className="container-prose">
          <SectionHeader eyebrow="Beyond the Classroom" title="Where talent finds its voice." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {beyond.map((b) => (
              <div
                key={b.title}
                className="shimmer-card group rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.2),0_16px_48px_-12px_hsl(var(--primary)/0.22)] hover:border-primary/50"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.4)]">
                  <b.icon className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-xl mb-2 transition-colors group-hover:text-primary">{b.title}</h4>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stream Selection Guide Modal */}
      {streamModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setStreamModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white border-b border-[#f43f5e]/15">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f1239]/70 mb-0.5">Classes 11 – 12</div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Stream Selection Guide</h2>
              </div>
              <button
                onClick={() => setStreamModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8f8] border border-[#f43f5e]/20 text-[#f43f5e] hover:bg-[#ffe4e6] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
                Choose the stream that matches your interests and career goals.
              </p>
              <div className="rounded-2xl border border-[#f43f5e]/30 bg-[#fff8f8] overflow-hidden">
                <div className="grid gap-0 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#f43f5e]/15">
                  {[
                    {
                      stream: "Science",
                      color: "text-[#1e40af]",
                      bg: "bg-[#dbeafe]",
                      pcm: { label: "PCM", subjects: ["Physics", "Chemistry", "Mathematics", "English", "Computer Science / Physical Education"] },
                      pcb: { label: "PCB", subjects: ["Physics", "Chemistry", "Biology", "English", "Computer Science / Physical Education"] },
                      careers: "Engineering, Medicine, Research, Defence",
                    },
                    {
                      stream: "Commerce",
                      color: "text-[#166534]",
                      bg: "bg-[#e8f5e9]",
                      subjects: ["Accountancy", "Business Studies", "Economics", "English", "Mathematics / Informatics Practices"],
                      careers: "CA, MBA, Banking, Finance, Entrepreneurship",
                    },
                    {
                      stream: "Arts / Humanities",
                      color: "text-[#92400e]",
                      bg: "bg-[#fef9e7]",
                      subjects: ["History", "Political Science", "Economics", "English", "Hindi / Geography / Sociology"],
                      careers: "Law, Civil Services, Journalism, Education, Social Work",
                    },
                  ].map((s) => (
                    <div key={s.stream} className="p-8">
                      <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4 ${s.bg} ${s.color}`}>
                        {s.stream}
                      </div>
                      {"pcm" in s ? (
                        <div className="space-y-4">
                          {[s.pcm, s.pcb].map((combo) => (
                            <div key={combo.label}>
                              <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1.5">{combo.label}</div>
                              <ul className="space-y-1.5">
                                {combo.subjects.map((sub) => (
                                  <li key={sub} className="flex items-start gap-2 text-sm text-foreground/75">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{sub}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-1.5 mb-4">
                          {(s as any).subjects.map((sub: string) => (
                            <li key={sub} className="flex items-start gap-2 text-sm text-foreground/75">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{sub}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-4 pt-4 border-t border-[#f43f5e]/15">
                        <div className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-1">Career Paths</div>
                        <p className="text-xs text-muted-foreground">{s.careers}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Academics;
