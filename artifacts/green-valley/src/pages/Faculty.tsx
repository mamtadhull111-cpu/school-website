import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, X, Camera, Trash2, GraduationCap, Clock, BookOpen } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { faculty, type Faculty as FacultyT } from "@/data/content";
import { useTeacherPhotos } from "@/hooks/useTeacherPhotos";
import { cn } from "@/lib/utils";

type MainFilter = "All" | "Leadership" | "Department";
type Highlight = "all-teachers" | "leadership-team" | "department" | null;

// Sorted by teacher count descending so the dept with most teachers runs first
const subDepartments = ["Science", "Languages", "Arts & Sports", "Mathematics", "Computer"] as const;
type SubDept = (typeof subDepartments)[number];

// How long (ms) each department stays in the marquee before cycling to the next
const DEPT_DURATION_MS = 5000;

const Faculty = () => {
  const [mainFilter, setMainFilter] = useState<MainFilter>("All");
  const [highlight, setHighlight] = useState<Highlight>(null);
  const [search, setSearch] = useState("");
  const [activeDeptIdx, setActiveDeptIdx] = useState(0);
  const activeDeptIdxRef = useRef(0);
  const activeDept = subDepartments[activeDeptIdx];

  const { photos, setPhoto, removePhoto } = useTeacherPhotos();
  const location = useLocation();

  const gridRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);
  const rafRef = useRef<number>();
  const deptStartTimeRef = useRef(0);

  // Fade transition between departments
  const fadePhaseRef = useRef<"none" | "out" | "in">("none");
  const fadeOpacityRef = useRef(1);
  const nextDeptIdxRef = useRef(0);
  const FADE_STEP = 1 / (60 * 0.35); // reach 0 or 1 in ~350ms at 60fps

  // Teacher count per dept for badge
  const deptCounts = useMemo(() => {
    const map: Record<string, number> = {};
    subDepartments.forEach((d) => {
      map[d] = faculty.filter((f) => f.department === d).length;
    });
    return map;
  }, []);

  // Cards for the currently active department
  const currentDeptTeachers = useMemo<FacultyT[]>(
    () => faculty.filter((f) => f.department === subDepartments[activeDeptIdx]),
    [activeDeptIdx],
  );

  // How many times to repeat cards: enough to fill the ticker without obvious duplicates
  // Science(4)→2x  Languages/Arts(2)→3x  Math/Computer(1)→5x
  const repeatCount = useMemo(
    () => Math.max(2, Math.ceil(6 / currentDeptTeachers.length)),
    [currentDeptTeachers.length],
  );
  const repeatCountRef = useRef(repeatCount);
  repeatCountRef.current = repeatCount;

  const handlePhotoUpload = (teacher: FacultyT, file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) setPhoto(teacher.name, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const triggerHighlight = (section: Highlight) => {
    setHighlight(section);
    setTimeout(() => setHighlight(null), 2000);
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "") as Highlight;
    if (!hash) return;
    setTimeout(() => {
      if (hash === "all-teachers") {
        setMainFilter("All");
        const el = document.getElementById("all-teachers");
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
        triggerHighlight("all-teachers");
      } else if (hash === "leadership-team") {
        setMainFilter("Leadership");
        const el = document.getElementById("all-teachers");
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
        triggerHighlight("leadership-team");
      } else if (hash === "department") {
        setMainFilter("Department");
        const el = document.getElementById("department");
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
        triggerHighlight("department");
      }
    }, 100);
  }, [location.hash]);

  // rAF marquee loop
  useEffect(() => {
    if (mainFilter !== "Department") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      posRef.current = 0;
      activeDeptIdxRef.current = 0;
      setActiveDeptIdx(0);
      deptStartTimeRef.current = 0;
      return;
    }

    const SPEED = 1.0;

    const tick = (now: number) => {
      const inner = marqueeInnerRef.current;
      if (inner) {
        if (fadePhaseRef.current === "out") {
          // Fade out — stop scrolling, decrease opacity each frame
          fadeOpacityRef.current = Math.max(0, fadeOpacityRef.current - FADE_STEP);
          inner.style.opacity = String(fadeOpacityRef.current);
          if (fadeOpacityRef.current <= 0) {
            // Fully invisible: swap department now
            posRef.current = 0;
            inner.style.transform = "translateX(0)";
            activeDeptIdxRef.current = nextDeptIdxRef.current;
            setActiveDeptIdx(nextDeptIdxRef.current);
            deptStartTimeRef.current = now;
            fadePhaseRef.current = "in";
          }
        } else if (fadePhaseRef.current === "in") {
          // Fade in — increase opacity each frame
          fadeOpacityRef.current = Math.min(1, fadeOpacityRef.current + FADE_STEP);
          inner.style.opacity = String(fadeOpacityRef.current);
          if (fadeOpacityRef.current >= 1) fadePhaseRef.current = "none";
        } else if (!isPausedRef.current) {
          // Normal scroll
          const halfWidth = inner.scrollWidth / repeatCountRef.current;
          if (halfWidth > 0) {
            posRef.current += SPEED;
            if (posRef.current >= halfWidth) posRef.current -= halfWidth;
            inner.style.transform = `translateX(-${posRef.current}px)`;
          }
          if (deptStartTimeRef.current === 0) deptStartTimeRef.current = now;
          if (now - deptStartTimeRef.current >= DEPT_DURATION_MS) {
            // Begin fade-out to next dept
            nextDeptIdxRef.current = (activeDeptIdxRef.current + 1) % subDepartments.length;
            fadePhaseRef.current = "out";
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    deptStartTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mainFilter]);

  const jumpToDept = (deptName: SubDept) => {
    const idx = subDepartments.indexOf(deptName);
    if (idx === -1) return;
    activeDeptIdxRef.current = idx;
    setActiveDeptIdx(idx);
    posRef.current = 0;
    deptStartTimeRef.current = 0;
    fadePhaseRef.current = "none";
    fadeOpacityRef.current = 1;
    if (marqueeInnerRef.current) {
      marqueeInnerRef.current.style.transform = "translateX(0)";
      marqueeInnerRef.current.style.opacity = "1";
    }
  };

  const gridItems = useMemo<FacultyT[]>(() => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return faculty.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.role.toLowerCase().includes(q) ||
          f.subject.toLowerCase().includes(q) ||
          f.department.toLowerCase().includes(q),
      );
    }
    if (mainFilter === "All") return faculty;
    if (mainFilter === "Leadership") return faculty.filter((f) => f.department === "Leadership");
    return [];
  }, [mainFilter, search]);

  const handleMainFilter = (f: MainFilter) => {
    setMainFilter(f);
    setSearch("");
    activeDeptIdxRef.current = 0;
    setActiveDeptIdx(0);
    posRef.current = 0;
    deptStartTimeRef.current = 0;
  };

  const showMarquee = mainFilter === "Department" && !search.trim();
  const showGrid = !showMarquee;

  const renderGridCard = (f: FacultyT) => (
    <div
      key={f.name}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-soft animate-fade-in"
    >
      <div className="relative mx-auto h-20 w-20">
        {photos[f.name] ? (
          <img src={photos[f.name]} alt={f.name} className="h-20 w-20 rounded-full object-cover shadow-soft ring-2 ring-primary/20" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-serif text-2xl shadow-soft transition-transform group-hover:scale-105">
            {f.initials}
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => fileInputRefs.current[f.name]?.click()}
              title="Upload photo"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary shadow hover:bg-primary hover:text-white transition-colors"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            {photos[f.name] && (
              <button
                onClick={() => removePhoto(f.name)}
                title="Remove photo"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-destructive shadow hover:bg-destructive hover:text-white transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={(el) => { fileInputRefs.current[f.name] = el; }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handlePhotoUpload(f, file);
            e.target.value = "";
          }}
        />
      </div>
      <h4 className="mt-4 font-serif text-base leading-snug">{f.name}</h4>
      <p className="mt-1 text-xs text-primary font-medium">{f.subject}</p>
      <div className="mt-3 flex flex-col gap-1 text-left">
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>{f.qualification}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>{f.experience} yrs experience</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
        <PageHero
          eyebrow="Faculty"
          title="Meet the teachers who make Green Valley, Green Valley."
          description="Experienced, kind, and quietly dedicated — our teachers are the heart of the school."
        />

        <section className="container-prose py-16">

          {/* Search bar */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, subject or department…"
                className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); searchRef.current?.focus(); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Main filter buttons */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {(["All", "Leadership", "Department"] as MainFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => handleMainFilter(f)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                  mainFilter === f
                    ? "border-primary bg-primary text-primary-foreground shadow-card"
                    : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── MARQUEE MODE ── */}
          {showMarquee && (
            <div
              id="department"
              ref={deptRef}
              className={cn(
                "rounded-2xl transition-all duration-500",
                highlight === "department" ? "ring-2 ring-primary ring-offset-4" : "",
              )}
            >
              {/* Dept buttons with teacher count badges */}
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                {subDepartments.map((d) => (
                  <button
                    key={d}
                    onClick={() => jumpToDept(d)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                      activeDept === d
                        ? "border-primary bg-primary text-primary-foreground shadow-card scale-105"
                        : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="mb-3 flex items-center justify-center gap-2">
                {subDepartments.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpToDept(subDepartments[i])}
                    aria-label={`Go to ${subDepartments[i]}`}
                    className={cn(
                      "rounded-full transition-all duration-400",
                      i === activeDeptIdx
                        ? "w-6 h-2.5 bg-primary shadow-sm"
                        : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                    )}
                  />
                ))}
              </div>

              {/* Active dept label */}
              <p className="mb-6 text-center text-sm font-semibold text-primary tracking-wide">
                {activeDept} Department
              </p>

              {/* Scrolling ticker */}
              <div
                className="relative overflow-hidden rounded-2xl bg-muted/30 py-8"
                onMouseEnter={() => { isPausedRef.current = true; }}
                onMouseLeave={() => { isPausedRef.current = false; }}
              >
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

                <div
                  ref={marqueeInnerRef}
                  className="flex gap-6 will-change-transform pl-8"
                  style={{ width: "max-content" }}
                >
                  {/* Triple the cards for a seamless infinite loop */}
                  {Array.from({ length: repeatCount }, () => currentDeptTeachers).flat().map((f, i) => (
                    <div
                      key={`${f.name}-${i}`}
                      className="w-56 shrink-0 rounded-2xl border border-primary/30 bg-card shadow-soft overflow-hidden"
                    >
                      {/* Coloured top strip */}
                      <div className="h-1.5 w-full bg-primary" />

                      <div className="p-5">
                        {/* Avatar */}
                        <div className="mx-auto h-16 w-16 mb-4">
                          {photos[f.name] ? (
                            <img src={photos[f.name]} alt={f.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/30" />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl shadow-soft">
                              {f.initials}
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <h4 className="text-center font-serif text-sm font-semibold leading-snug text-foreground">
                          {f.name}
                        </h4>

                        <div className="mt-3 space-y-2">
                          {/* Subject */}
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="text-xs text-foreground font-medium truncate" title={f.subject}>{f.subject}</span>
                          </div>
                          {/* Qualification */}
                          <div className="flex items-start gap-2">
                            <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="text-xs text-muted-foreground leading-tight">{f.qualification}</span>
                          </div>
                          {/* Experience */}
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="text-xs text-muted-foreground">{f.experience} yrs experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Hover to pause · Click a department to jump to it
              </p>
            </div>
          )}

          {/* ── GRID MODE ── */}
          {showGrid && (
            <div
              id="all-teachers"
              ref={gridRef}
              className={cn(
                "rounded-2xl transition-all duration-500",
                highlight === "all-teachers" || highlight === "leadership-team"
                  ? "ring-2 ring-primary ring-offset-4 bg-primary/5 shadow-soft p-4"
                  : "",
              )}
            >
              {gridItems.length === 0 && search ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <Search className="h-10 w-10 text-muted-foreground/40" />
                  <p className="text-muted-foreground text-sm">
                    No teachers found for <span className="font-medium text-foreground">"{search}"</span>.
                  </p>
                  <button onClick={() => setSearch("")} className="text-sm text-primary underline-offset-4 hover:underline">
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {gridItems.map(renderGridCard)}
                </div>
              )}
            </div>
          )}

        </section>
    </>
  );
};

export default Faculty;
