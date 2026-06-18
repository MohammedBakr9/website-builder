"use client";

import { useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useBuilderStore } from "@/lib/store/builder";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { cn } from "@/lib/utils/cn";
import type { Section } from "@/lib/types";

interface SortableSectionProps {
  section: Section;
  isSelected: boolean;
}

export function SortableSection({ section, isSelected }: SortableSectionProps) {
  const { selectSection, removeSection, sections, reorderSections } =
    useBuilderStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const idx = sections.findIndex((s) => s.id === section.id);

  const moveUp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (idx > 0) reorderSections(idx, idx - 1);
    },
    [idx, reorderSections]
  );

  const moveDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (idx < sections.length - 1) reorderSections(idx, idx + 1);
    },
    [idx, sections.length, reorderSections]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      removeSection(section.id);
    },
    [removeSection, section.id]
  );

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      selectSection(section.id);
    },
    [selectSection, section.id]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "section-block section-wrapper group relative",
        isSelected && "selected",
        isDragging && "opacity-30 z-50"
      )}
      onClick={handleSelect}
    >
      {/* Floating controls */}
      <div className="section-controls">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex h-7 w-7 cursor-grab items-center justify-center rounded-md border border-[#2D3048] bg-[#0F1117]/90 text-slate-400 transition-colors hover:bg-[#1A1D27] hover:text-white active:cursor-grabbing"
          title="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={13} />
        </button>

        {/* Move up */}
        <button
          onClick={moveUp}
          disabled={idx === 0}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#2D3048] bg-[#0F1117]/90 text-slate-400 transition-colors hover:bg-[#1A1D27] hover:text-white disabled:opacity-30"
          title="Move up"
        >
          <ChevronUp size={13} />
        </button>

        {/* Move down */}
        <button
          onClick={moveDown}
          disabled={idx === sections.length - 1}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#2D3048] bg-[#0F1117]/90 text-slate-400 transition-colors hover:bg-[#1A1D27] hover:text-white disabled:opacity-30"
          title="Move down"
        >
          <ChevronDown size={13} />
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#2D3048] bg-[#0F1117]/90 text-slate-400 transition-colors hover:bg-red-950 hover:text-red-400"
          title="Delete section"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <SectionRenderer section={section} />
    </div>
  );
}
