"use client";
import { useState, useEffect } from "react";
import { getHighlights, saveHighlights } from "@/app/lib/idb";

export type Highlight = {
  id: string;
  page: number;
  quads: number[]; // x,y,x,y,x,y,x,y in PDF points
  color: string;
};

export function useHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    getHighlights().then(setHighlights);
  }, []);

  const addHighlight = (h: Omit<Highlight, "id">) => {
    const next = [...highlights, { ...h, id: crypto.randomUUID() }];
    setHighlights(next);
    saveHighlights(next);
  };

  const deleteHighlight = (id: string) => {
    const next = highlights.filter((h) => h.id !== id);
    setHighlights(next);
    saveHighlights(next);
  };

  return { highlights, addHighlight, deleteHighlight };
}
