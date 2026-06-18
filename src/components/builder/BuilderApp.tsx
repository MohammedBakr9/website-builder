"use client";

import { useCallback, useRef } from "react";
import { useBuilderStore } from "@/lib/store/builder";
import { TopBar } from "./TopBar";
import { SectionLibrary } from "./SectionLibrary";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import type { Section } from "@/lib/types";

export default function BuilderApp() {
  const { importConfig, exportConfig, sections } = useBuilderStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    const json = exportConfig();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportConfig]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          if (parsed.sections && Array.isArray(parsed.sections)) {
            importConfig(parsed.sections as Section[]);
          }
        } catch {
          alert("Invalid JSON file. Please export a valid configuration.");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [importConfig]
  );

  const handlePreview = useCallback(() => {
    if (sections.length === 0) {
      alert("Add some sections first!");
      return;
    }
    // Store sections in sessionStorage and open preview window
    sessionStorage.setItem("wb_preview", JSON.stringify(sections));
    window.open("/preview", "_blank");
  }, [sections]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0F1117] text-slate-200">
      <TopBar
        onExport={handleExport}
        onImport={handleImportClick}
        onPreview={handlePreview}
      />

      <div className="flex flex-1 overflow-hidden">
        <SectionLibrary />
        <Canvas />
        <PropertiesPanel />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
