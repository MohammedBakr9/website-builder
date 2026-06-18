// ─── Section Types ────────────────────────────────────────────────────────────

export type SectionType =
  | "header"
  | "hero"
  | "features"
  | "testimonials"
  | "gallery"
  | "contact"
  | "footer";

export type Viewport = "desktop" | "tablet" | "mobile";

// ─── Section Data Shapes ──────────────────────────────────────────────────────

export interface HeaderData {
  brand: string;
  links: string; // comma-separated
  ctaText: string;
  ctaBg: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  btnText: string;
  btnBg: string;
  bgColor: string;
}

export interface FeaturesData {
  title: string;
  subtitle: string;
  bg: string;
  f1: string;
  f1d: string;
  f1icon: string;
  f2: string;
  f2d: string;
  f2icon: string;
  f3: string;
  f3d: string;
  f3icon: string;
}

export interface TestimonialsData {
  title: string;
  q1: string;
  a1: string;
  r1: string;
  q2: string;
  a2: string;
  r2: string;
  accentColor: string;
}

export interface GalleryData {
  title: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
  img6: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  bg: string;
  btnBg: string;
  btnText: string;
}

export interface FooterData {
  brand: string;
  links: string;
  copy: string;
  bg: string;
}

export type SectionData =
  | HeaderData
  | HeroData
  | FeaturesData
  | TestimonialsData
  | GalleryData
  | ContactData
  | FooterData;

// ─── Section Record ───────────────────────────────────────────────────────────

export interface Section {
  id: string;
  type: SectionType;
  data: SectionData;
}

// ─── Section Definition (Library) ────────────────────────────────────────────

export interface SectionDefinition {
  type: SectionType;
  name: string;
  description: string;
  icon: string;
  defaults: SectionData;
}

// ─── Store State ──────────────────────────────────────────────────────────────

export interface BuilderStore {
  sections: Section[];
  selectedId: string | null;
  viewport: Viewport;
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, data: Partial<SectionData>) => void;
  reorderSections: (oldIndex: number, newIndex: number) => void;
  selectSection: (id: string | null) => void;
  setViewport: (viewport: Viewport) => void;
  importConfig: (sections: Section[]) => void;
  exportConfig: () => string;
}

// ─── Property Field Definitions ───────────────────────────────────────────────

export type FieldType = "text" | "textarea" | "color" | "url";

export interface PropField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}
