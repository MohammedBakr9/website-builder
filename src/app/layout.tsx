import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Website Builder",
  description: "Build beautiful pages with drag-and-drop sections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
