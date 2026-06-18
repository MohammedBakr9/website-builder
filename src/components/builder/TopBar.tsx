"use client";

import { Monitor, Tablet, Smartphone, Download, Upload, Play } from "lucide-react";
import { useBuilderStore } from "@/lib/store/builder";
import { cn } from "@/lib/utils/cn";
import type { Viewport } from "@/lib/types";

interface TopBarProps {
  onExport: () => void;
  onImport: () => void;
  onPreview: () => void;
}

const VIEWPORTS: { value: Viewport; icon: React.ReactNode; label: string }[] = [
  { value: "desktop", icon: <Monitor size={15} />, label: "Desktop" },
  { value: "tablet", icon: <Tablet size={15} />, label: "Tablet" },
  { value: "mobile", icon: <Smartphone size={15} />, label: "Mobile" },
];

export function TopBar({ onExport, onImport, onPreview }: TopBarProps) {
  const { viewport, setViewport } = useBuilderStore();

  return (
    <header className="flex h-13 items-center justify-between border-b border-[#2D3048] bg-[#1A1D27] px-4 py-0 flex-shrink-0" style={{ height: 52 }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-indigo-500" />
        <span className="text-sm font-semibold text-white">WebBuilder</span>
      </div>

      {/* Viewport switcher */}
      <div className="flex items-center gap-1 rounded-lg border border-[#2D3048] bg-[#0F1117] p-1">
        {VIEWPORTS.map(({ value, icon, label }) => (
          <button
            key={value}
            onClick={() => setViewport(value)}
            title={label}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
              viewport === value
                ? "bg-[#1E2240] text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onImport}
          className="flex items-center gap-1.5 rounded-md border border-[#2D3048] bg-transparent px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:bg-[#1E2132] hover:text-slate-200"
        >
          <Upload size={13} />
          Import
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-md border border-[#2D3048] bg-transparent px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:bg-[#1E2132] hover:text-slate-200"
        >
          <Download size={13} />
          Export
        </button>
        <button
          onClick={onPreview}
          className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-indigo-600"
        >
          <Play size={12} fill="currentColor" />
          Preview
        </button>
      </div>
    </header>
  );
}
