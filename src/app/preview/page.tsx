"use client";

import { useEffect, useState } from "react";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import type { Section } from "@/lib/types";

export default function PreviewPage() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("wb_preview");
      if (raw) setSections(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  if (sections.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <p className="text-slate-400">No sections to preview.</p>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {sections.map((section) => (
        <section key={section.id}>
          <SectionRenderer section={section} />
        </section>
      ))}
    </main>
  );
}
