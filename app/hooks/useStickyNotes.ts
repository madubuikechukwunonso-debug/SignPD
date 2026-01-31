"use client";
import { useState, useEffect } from "react";
import { getStickyNotes, saveStickyNotes } from "@/app/lib/idb";

export type StickyNote = {
  id: string;
  page: number;
  x: number;
  y: number;
  text: string;
  color: string;
};

export function useStickyNotes() {
  const [notes, setNotes] = useState<StickyNote[]>([]);

  useEffect(() => {
    getStickyNotes().then(setNotes);
  }, []);

  const addNote = (n: Omit<StickyNote, "id">) => {
    const next = [...notes, { ...n, id: crypto.randomUUID() }];
    setNotes(next);
    saveStickyNotes(next);
  };

  const updateNote = (id: string, text: string) => {
    const next = notes.map((n) => (n.id === id ? { ...n, text } : n));
    setNotes(next);
    saveStickyNotes(next);
  };

  const deleteNote = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveStickyNotes(next);
  };

  return { notes, addNote, updateNote, deleteNote };
}
