"use client";

import dynamic from "next/dynamic";

// Lazy-load the heavy builder so the initial HTML shell is lightweight
const BuilderApp = dynamic(() => import("./BuilderApp"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-[#0F1117]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2D3048] border-t-indigo-500" />
        <p className="text-sm text-slate-500">Loading builder…</p>
      </div>
    </div>
  ),
});

export function BuilderShell() {
  return <BuilderApp />;
}
