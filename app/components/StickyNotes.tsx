"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStickyNotes } from "@/app/hooks/useStickyNotes";

export default function StickyNotes({ page }: { page: number }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { addNote } = useStickyNotes();

  const submit = () => {
    if (!text.trim()) return;
    addNote({ page: page - 1, x: 100, y: 100, text, color: "#FFEB3B" });
    setText("");
    setOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((v) => !v)}
        className="absolute top-4 left-4 bg-yellow-300 px-3 py-2 rounded-full shadow"
        title="Add sticky note"
      >
        📝
      </motion.button>

      {open && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-20 left-4 bg-yellow-100 p-3 rounded-xl shadow w-56"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Note…"
            className="w-full border rounded p-2 resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={submit}
              className="flex-1 bg-indigo-600 text-white rounded py-1"
            >
              Add
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex-1 bg-gray-200 rounded py-1"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
