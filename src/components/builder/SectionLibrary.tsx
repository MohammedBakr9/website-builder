"use client";

import { useBuilderStore } from "@/lib/store/builder";
import { SECTION_DEFINITIONS } from "@/lib/utils/sections";
import { Plus } from "lucide-react";
import type { SectionType } from "@/lib/types";

const ICONS: Record<string, string> = {
  "layout-navbar": "🔝",
  photo: "🦸",
  "layout-grid": "⭐",
  "message-quote": "💬",
  "photo-album": "🖼️",
  mail: "✉️",
  "layout-bottombar": "⬇️",
};

export function SectionLibrary() {
  const { addSection } = useBuilderStore();

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-[#2D3048] bg-[#1A1D27]">
      <div className="px-3.5 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        Section Library
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {SECTION_DEFINITIONS.map((def) => (
          <SectionCard
            key={def.type}
            icon={ICONS[def.icon] ?? "📦"}
            name={def.name}
            description={def.description}
            onAdd={() => addSection(def.type as SectionType)}
          />
        ))}
      </div>
    </aside>
  );
}

interface SectionCardProps {
  icon: string;
  name: string;
  description: string;
  onAdd: () => void;
}

function SectionCard({ icon, name, description, onAdd }: SectionCardProps) {
  return (
    <button
      onClick={onAdd}
      className="group mb-1 flex w-full items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 text-left transition-all duration-150 hover:border-indigo-500/40 hover:bg-[#1E2240]"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#252840] text-base">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate text-[13px] font-medium text-slate-300">{name}</div>
        <div className="truncate text-[11px] text-slate-500">{description}</div>
      </div>
      <div className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        <Plus size={16} className="text-indigo-400" />
      </div>
    </button>
  );
}
