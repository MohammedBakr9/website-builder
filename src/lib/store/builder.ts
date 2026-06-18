import { create } from "zustand";
import { v4 as uuidv4 } from "crypto";
import type { BuilderStore, Section, SectionData, SectionType, Viewport } from "@/lib/types";
import { SECTION_DEFINITIONS } from "@/lib/utils/sections";

// Simple ID generator (avoids crypto.v4 in browser)
let counter = 1;
function genId(): string {
  return `sec_${Date.now()}_${counter++}`;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  sections: [],
  selectedId: null,
  viewport: "desktop",

  addSection: (type: SectionType) => {
    const def = SECTION_DEFINITIONS.find((d) => d.type === type);
    if (!def) return;
    const section: Section = {
      id: genId(),
      type,
      data: { ...def.defaults } as SectionData,
    };
    set((state) => ({ sections: [...state.sections, section] }));
  },

  removeSection: (id: string) => {
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));
  },

  updateSection: (id: string, data: Partial<SectionData>) => {
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, data: { ...s.data, ...data } as SectionData } : s
      ),
    }));
  },

  reorderSections: (oldIndex: number, newIndex: number) => {
    set((state) => {
      const sections = [...state.sections];
      const [moved] = sections.splice(oldIndex, 1);
      sections.splice(newIndex, 0, moved);
      return { sections };
    });
  },

  selectSection: (id: string | null) => {
    set({ selectedId: id });
  },

  setViewport: (viewport: Viewport) => {
    set({ viewport });
  },

  importConfig: (sections: Section[]) => {
    set({ sections, selectedId: null });
  },

  exportConfig: () => {
    return JSON.stringify({ version: 1, sections: get().sections }, null, 2);
  },
}));
