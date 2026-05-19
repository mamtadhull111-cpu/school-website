import { SectionHeader } from "@/components/SectionHeader";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  video?: string;
};

export const PageHero = ({ eyebrow, title, description, image, video }: Props) => {
  if (video) {
    return (
      <section className="relative overflow-hidden border-b border-border">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Minimal overlay just for text readability */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-prose relative py-20 md:py-28 animate-fade-in">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            invert
          />
        </div>
      </section>
    );
  }

  if (image) {
    return (
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Minimal overlay just for text readability */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-prose relative py-20 md:py-28 animate-fade-in text-primary-foreground">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            invert
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-leaf">
      <div className="container-prose relative py-16 md:py-24 animate-fade-in">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </div>
    </section>
  );
};
