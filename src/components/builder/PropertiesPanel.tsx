"use client";

import { useCallback } from "react";
import { useBuilderStore } from "@/lib/store/builder";
import { PROP_FIELDS, PRESET_COLORS, SECTION_DEFINITIONS } from "@/lib/utils/sections";
import type { SectionData, PropField } from "@/lib/types";

export function PropertiesPanel() {
  const { selectedId, sections, updateSection } = useBuilderStore();

  const section = sections.find((s) => s.id === selectedId);
  const def = section
    ? SECTION_DEFINITIONS.find((d) => d.type === section.type)
    : null;
  const fields = section ? PROP_FIELDS[section.type] : [];

  const handleChange = useCallback(
    (key: string, value: string) => {
      if (!selectedId) return;
      updateSection(selectedId, { [key]: value } as Partial<SectionData>);
    },
    [selectedId, updateSection]
  );

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-l border-[#2D3048] bg-[#1A1D27]">
      <div className="border-b border-[#2D3048] px-3.5 py-3 text-[13px] font-semibold text-slate-200">
        {def ? `${def.name} Properties` : "Properties"}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {!section ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <div className="text-3xl opacity-30">🎛️</div>
            <p className="text-xs text-slate-500">
              Select a section on the canvas to edit its content
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <PropFieldInput
                key={field.key}
                field={field}
                value={(section.data as Record<string, string>)[field.key] ?? ""}
                onChange={(val) => handleChange(field.key, val)}
              />
            ))}
          </div>
        )}

        {/* Section outline */}
        {sections.length > 0 && (
          <div className="mt-5">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Page Outline
            </div>
            <PageOutline />
          </div>
        )}
      </div>
    </aside>
  );
}

function PageOutline() {
  const { sections, selectedId, selectSection } = useBuilderStore();
  const ICONS: Record<string, string> = {
    header: "🔝", hero: "🦸", features: "⭐", testimonials: "💬",
    gallery: "🖼️", contact: "✉️", footer: "⬇️",
  };

  return (
    <div className="flex flex-col gap-1">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => selectSection(s.id)}
          className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[12px] transition-all ${
            s.id === selectedId
              ? "bg-[#1E2240] text-indigo-300"
              : "text-slate-500 hover:bg-[#1A1D27] hover:text-slate-300"
          }`}
        >
          <div
            className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
              s.id === selectedId ? "bg-indigo-400" : "bg-slate-600"
            }`}
          />
          <span>
            {i + 1}. {ICONS[s.type]} {s.type.charAt(0).toUpperCase() + s.type.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
}

interface PropFieldInputProps {
  field: PropField;
  value: string;
  onChange: (value: string) => void;
}

function PropFieldInput({ field, value, onChange }: PropFieldInputProps) {
  const inputClass =
    "w-full rounded-md border border-[#2D3048] bg-[#0F1117] px-2.5 py-1.5 text-[13px] text-slate-200 outline-none transition-colors focus:border-indigo-500 placeholder:text-slate-600";

  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          className={`${inputClass} min-h-[64px] resize-y`}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "color" ? (
        <div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onChange(color)}
                title={color}
                className="h-5 w-5 rounded transition-transform hover:scale-110"
                style={{
                  background: color,
                  border: value === color ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="color"
              value={value || "#6366F1"}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 w-10 cursor-pointer rounded border border-[#2D3048] bg-[#0F1117] p-0.5"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#6366F1"
              className={`${inputClass} flex-1`}
            />
          </div>
        </div>
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          className={inputClass}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
