import { Layout } from "@/components/Layout";
import { HeroSlider } from "@/components/home/HeroSlider";
import { Stats } from "@/components/home/Stats";
import { Welcome } from "@/components/home/Welcome";
import { WhyUs } from "@/components/home/WhyUs";
import { Programs } from "@/components/home/Programs";
import { Announcements } from "@/components/home/Announcements";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";

const Index = () => {
  return (
    <Layout>
      <div className="-mt-24">
        <HeroSlider />
        <Stats />
        <Welcome />
        <WhyUs />
        <Programs />
        <Announcements />
        <GalleryTeaser />
        <Testimonials />
        <CTABanner />
      </div>
    </Layout>
  );
};

export default Index;
