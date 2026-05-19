import { useMemo, useRef, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { galleryItems, type GalleryItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import galleryVideo from "@assets/AQOCX5QonkgKmMxcEGLmH2_P8jTLGBnlpSlqexmqy297-5nc7H5KZ07GogqjEc_1777613763249.mp4";

const categories = ["All", "Campus", "Events", "Sports", "Cultural", "Annual Day"] as const;

const Gallery = () => {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const items = useMemo<GalleryItem[]>(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  const close = () => {
    if (videoRef.current) videoRef.current.pause();
    setLightbox(null);
  };
  const prev = () => {
    if (videoRef.current) videoRef.current.pause();
    setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  };
  const next = () => {
    if (videoRef.current) videoRef.current.pause();
    setLightbox((i) => (i === null ? null : (i + 1) % items.length));
  };

  const currentItem = lightbox !== null ? items[lightbox] : null;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from across our campus."
        description="A small window into the everyday life of Green Valley — classrooms, fields, festivals and friendships."
        video={galleryVideo}
      />

      <section className="container-prose py-16">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {items.map((g, i) => (
            <button
              key={`${g.src}-${i}`}
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.3),0_16px_48px_-12px_hsl(var(--primary)/0.25)]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {g.type === "video" ? (
                <>
                  {g.poster ? (
                    <img
                      src={g.poster}
                      alt={g.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  ) : (
                    <video
                      src={`${g.src}#t=0.1`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      muted
                      playsInline
                      preload="auto"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:scale-115 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.5)]">
                      <Play className="h-6 w-6 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-4 right-4 translate-y-3 text-left text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/75">{g.category}</div>
                    {g.alt}
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fade-in-slow"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {currentItem.type === "video" ? (
            <video
              ref={videoRef}
              src={currentItem.src}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-xl animate-scale-in"
            />
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain animate-scale-in"
            />
          )}
        </div>
      )}
    </>
  );
};

export default Gallery;
