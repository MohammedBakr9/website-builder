import type { Section } from "@/lib/types";
import { HeaderSection } from "./HeaderSection";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { GallerySection } from "./GallerySection";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";

interface SectionRendererProps {
  section: Section;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "header":
      return <HeaderSection data={section.data as Parameters<typeof HeaderSection>[0]["data"]} />;
    case "hero":
      return <HeroSection data={section.data as Parameters<typeof HeroSection>[0]["data"]} />;
    case "features":
      return <FeaturesSection data={section.data as Parameters<typeof FeaturesSection>[0]["data"]} />;
    case "testimonials":
      return <TestimonialsSection data={section.data as Parameters<typeof TestimonialsSection>[0]["data"]} />;
    case "gallery":
      return <GallerySection data={section.data as Parameters<typeof GallerySection>[0]["data"]} />;
    case "contact":
      return <ContactSection data={section.data as Parameters<typeof ContactSection>[0]["data"]} />;
    case "footer":
      return <FooterSection data={section.data as Parameters<typeof FooterSection>[0]["data"]} />;
    default:
      return null;
  }
}
