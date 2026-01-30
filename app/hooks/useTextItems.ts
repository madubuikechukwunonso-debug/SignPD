import { useState, useEffect } from "react";
import { getTextItems, saveTextItems } from "@/app/lib/idb";

export type TextItem = {
  id: string;
  page: number;
  x: number;
  y: number;
  text: string;
  size: number;
  color?: string;
};

export function useTextItems() {
  const [items, setItems] = useState<TextItem[]>([]);

  useEffect(() => {
    getTextItems().then(setItems);
  }, []);

  const addText = (t: Omit<TextItem, "id">) => {
    const next = [...items, { ...t, id: crypto.randomUUID() }];
    setItems(next);
    saveTextItems(next);
  };

  const updateText = (id: string, updates: Partial<TextItem>) => {
    const next = items.map((i) => (i.id === id ? { ...i, ...updates } : i));
    setItems(next);
    saveTextItems(next);
  };

  const deleteText = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    saveTextItems(next);
  };

  return { items, addText, updateText, deleteText };
}
