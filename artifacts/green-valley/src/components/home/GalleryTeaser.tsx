import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, X } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/content";

export const GalleryTeaser = () => {
  const items = galleryItems.slice(0, 6);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideo = (src: string) => setActiveVideo(src);
  const closeVideo = () => {
    if (videoRef.current) videoRef.current.pause();
    setActiveVideo(null);
  };

  return (
    <section className="bg-gradient-leaf py-24">
      <div className="container-prose">
        <SectionHeader
          eyebrow="Life at Green Valley"
          title="A glimpse into our days."
          description="Smart classrooms, sunny fields, art and ideas — moments from across our campus."
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {items.map((g, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl bg-muted cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.3),0_16px_48px_-12px_hsl(var(--primary)/0.25)] ${
                i === 0 ? "md:row-span-2 md:col-span-1 aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"
              }`}
              onClick={() => g.type === "video" ? openVideo(g.src) : undefined}
            >
              {g.type === "video" ? (
                <>
                  <video
                    src={g.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-4 right-4 translate-y-3 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.category}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/gallery">
              See full gallery <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            ref={videoRef}
            src={activeVideo}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}
    </section>
  );
};
