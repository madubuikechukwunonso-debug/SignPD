"use client";
import { useState, useEffect } from "react";
import { getMeasures, saveMeasures } from "@/app/lib/idb";

export type Measure = {
  id: string;
  page: number;
  type: "distance" | "area" | "perimeter";
  points: { x: number; y: number }[];
  value?: number;
  unit?: "px" | "mm" | "in";
};

export function useMeasures() {
  const [measures, setMeasures] = useState<Measure[]>([]);

  useEffect(() => {
    getMeasures().then(setMeasures);
  }, []);

  const addMeasure = (m: Omit<Measure, "id">) => {
    const next = [...measures, { ...m, id: crypto.randomUUID() }];
    setMeasures(next);
    saveMeasures(next);
  };

  const deleteMeasure = (id: string) => {
    const next = measures.filter((m) => m.id !== id);
    setMeasures(next);
    saveMeasures(next);
  };

  return { measures, addMeasure, deleteMeasure };
}
