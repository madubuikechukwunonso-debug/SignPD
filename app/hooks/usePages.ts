"use client";
import { useState, useEffect } from "react";
import * as pdfLib from "pdf-lib";
import { getPages, savePages } from "@/app/lib/idb";
import { TEMPLATES } from "@/app/lib/templates";

export type PageItem = {
  id: string;
  pdfBytes?: Uint8Array; // single-page blob
  rotation: 0 | 90 | 180 | 270;
  isBlank?: boolean;
  template?: keyof typeof TEMPLATES;
};

export function usePages(initialPdf?: pdfLib.PDFDocument | null) {
  const [pages, setPages] = useState<PageItem[]>([]);

  /* load existing or split initial doc */
  useEffect(() => {
    if (!initialPdf) return;
    (async () => {
      const stored = await getPages();
      if (stored.length) {
        setPages(stored);
      } else {
        const count = initialPdf.getPageCount();
        const items: PageItem[] = [];
        for (let i = 0; i < count; i++) {
          const single = await pdfLib.PDFDocument.create();
          const [copied] = await single.copyPages(initialPdf, [i]);
          single.addPage(copied);
          items.push({ id: crypto.randomUUID(), pdfBytes: await single.save(), rotation: 0 });
        }
        setPages(items);
        savePages(items);
      }
    })();
  }, [initialPdf]);

  /* ---------- actions ---------- */

  const addBlankPage = async (index?: number, template?: keyof typeof TEMPLATES) => {
    const blank = await pdfLib.PDFDocument.create();
    const pg = blank.addPage();
    if (template && template !== "blank") TEMPLATES[template](pg);
    const bytes = await blank.save();
    const newPage: PageItem = {
      id: crypto.randomUUID(),
      pdfBytes: bytes,
      rotation: 0,
      isBlank: true,
      template,
    };
    const idx = index ?? pages.length;
    const next = [...pages.slice(0, idx), newPage, ...pages.slice(idx)];
    setPages(next);
    savePages(next);
  };

  const deletePage = (id: string) => {
    const next = pages.filter((p) => p.id !== id);
    setPages(next);
    savePages(next);
  };

  const rotatePage = (id: string) => {
    const next = pages.map((p) =>
      p.id === id ? { ...p, rotation: ((p.rotation + 90) % 360) as 0 | 90 | 180 | 270 } : p
    );
    setPages(next);
    savePages(next);
  };

  const movePage = (from: number, to: number) => {
    const clone = [...pages];
    const [removed] = clone.splice(from, 1);
    clone.splice(to, 0, removed);
    setPages(clone);
    savePages(clone);
  };

  return { pages, addBlankPage, deletePage, rotatePage, movePage };
}
