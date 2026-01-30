import { useState, useEffect } from "react";
import { getDrawings, saveDrawings } from "@/app/lib/idb";

export type Point = { x: number; y: number };

export type Drawing = {
  id: string;
  page: number;
  tool: "pen" | "pencil" | "marker" | "rectangle" | "circle" | "line";
  color: string;
  width: number;
  points?: Point[];
  bounds?: { x: number; y: number; w: number; h: number };
};

export function useDrawings() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);

  useEffect(() => {
    getDrawings().then(setDrawings);
  }, []);

  const addDrawing = (d: Omit<Drawing, "id">) => {
    const next = [...drawings, { ...d, id: crypto.randomUUID() }];
    setDrawings(next);
    saveDrawings(next);
  };

  const deleteDrawing = (id: string) => {
    const next = drawings.filter((d) => d.id !== id);
    setDrawings(next);
    saveDrawings(next);
  };

  return { drawings, addDrawing, deleteDrawing };
}
