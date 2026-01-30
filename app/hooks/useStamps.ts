import { useState, useEffect } from "react";
import { getStamps, saveStamps } from "@/app/lib/idb";

export type Stamp = {
  id: string;
  page: number;
  x: number;
  y: number;
  type: string;
  width: number;
  height: number;
};

export function useStamps() {
  const [stamps, setStamps] = useState<Stamp[]>([]);

  useEffect(() => {
    getStamps().then(setStamps);
  }, []);

  const addStamp = (s: Omit<Stamp, "id">) => {
    const next = [...stamps, { ...s, id: crypto.randomUUID() }];
    setStamps(next);
    saveStamps(next);
  };

  const deleteStamp = (id: string) => {
    const next = stamps.filter((s) => s.id !== id);
    setStamps(next);
    saveStamps(next);
  };

  return { stamps, addStamp, deleteStamp };
}
