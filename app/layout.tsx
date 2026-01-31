"use client";
import { Metadata } from "next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const metadata: Metadata = {
  title: "SignPD",
  description: "Edit, sign, highlight & rearrange your PDFs in the browser—no uploads to any server.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </body>
    </html>
  );
}
