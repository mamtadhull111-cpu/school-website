import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/content";

export const GalleryTeaser = () => {
  const items = galleryItems.slice(0, 6);
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
              className={`group relative overflow-hidden rounded-2xl bg-muted ${
                i === 0 ? "md:row-span-2 md:col-span-1 aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-4 right-4 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.category}
              </div>
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
    </section>
  );
};
