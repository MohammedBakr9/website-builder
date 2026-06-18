# Mini Website Builder

A drag-and-drop website builder built with Next.js 14, TypeScript, dnd-kit, and Zustand.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** (App Router) | Framework, SSR-friendly shell |
| **TypeScript** | Full type safety |
| **Tailwind CSS** | Styling |
| **@dnd-kit** | Drag-and-drop reordering |
| **Zustand** | Lightweight global state |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (RSC)
│   ├── page.tsx            # Home page (RSC shell)
│   ├── preview/page.tsx    # Full-page preview route
│   └── globals.css
├── components/
│   ├── builder/
│   │   ├── BuilderShell.tsx     # Client boundary + lazy load
│   │   ├── BuilderApp.tsx       # Main layout orchestrator
│   │   ├── TopBar.tsx           # Header with actions
│   │   ├── SectionLibrary.tsx   # Left panel
│   │   ├── Canvas.tsx           # Center preview + DnD context
│   │   ├── SortableSection.tsx  # Individual draggable section
│   │   └── PropertiesPanel.tsx  # Right panel editor
│   └── sections/
│       ├── SectionRenderer.tsx  # Dispatch to section components
│       ├── index.tsx            # All section implementations
│       └── [Section].tsx        # Re-exports per section
├── lib/
│   ├── types/index.ts           # TypeScript interfaces
│   ├── store/builder.ts         # Zustand store
│   └── utils/
│       ├── sections.ts          # Definitions, defaults, prop fields
│       └── cn.ts                # Tailwind class merge utility
```

## Features

- **7 pre-built sections**: Header, Hero, Features, Testimonials, Gallery, Contact, Footer
- **Live preview** with desktop / tablet / mobile viewport switching
- **Drag-and-drop** reordering via @dnd-kit (with fallback up/down buttons)
- **Properties panel** with text, textarea, URL, and color inputs + color presets
- **Export** page as JSON
- **Import** JSON to restore and continue editing
- **Preview** opens the built page in a new tab
- **SSR-friendly** — builder is a client component loaded lazily; RSC shell is lightweight
- **Fully responsive** builder UI

## Adding New Section Types

1. Add the type to `SectionType` union in `src/lib/types/index.ts`
2. Add a `Data` interface for the section's fields
3. Add a definition + defaults to `SECTION_DEFINITIONS` in `src/lib/utils/sections.ts`
4. Add prop fields to `PROP_FIELDS`
5. Create the React component in `src/components/sections/`
6. Add a case to `SectionRenderer`
