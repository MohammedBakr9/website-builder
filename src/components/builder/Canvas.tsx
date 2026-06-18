"use client";

import { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useBuilderStore } from "@/lib/store/builder";
import { SortableSection } from "./SortableSection";
import { cn } from "@/lib/utils/cn";

const VIEWPORT_WIDTHS: Record<string, string> = {
  desktop: "max-w-[960px] w-full",
  tablet: "w-[768px]",
  mobile: "w-[390px]",
};

export function Canvas() {
  const { sections, viewport, reorderSections, selectSection, selectedId } =
    useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    },
    [sections, reorderSections]
  );

  return (
    <main
      className="flex flex-1 flex-col overflow-hidden bg-[#0F1117]"
      onClick={() => selectSection(null)}
    >
      {/* Toolbar */}
      <div className="flex items-center border-b border-[#2D3048] bg-[#1A1D27] px-4 py-2">
        <span className="text-xs text-slate-500">
          Live Preview · {sections.length} section{sections.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Scrollable canvas area */}
      <div className="flex flex-1 justify-center overflow-y-auto overflow-x-auto p-5">
        <div
          className={cn(
            "relative min-h-full overflow-hidden rounded bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300",
            VIEWPORT_WIDTHS[viewport]
          )}
        >
          {sections.length === 0 ? (
            <EmptyCanvas />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    isSelected={selectedId === section.id}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyCanvas() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 text-center">
      <div className="text-5xl opacity-20">🏗️</div>
      <p className="text-sm font-medium text-gray-400">Your page is empty</p>
      <span className="text-xs text-gray-500">
        Click sections from the left panel to add them
      </span>
    </div>
  );
}
