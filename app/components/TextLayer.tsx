"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTextItems } from "@/app/hooks/useTextItems";

export default function TextLayer({ page }: { page: number }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { addText } = useTextItems();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addText({ page: page - 1, x: 100, y: 100, text, size: 12 });
    setText("");
    setOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((v) => !v)}
        className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-2 rounded-full shadow"
      >
        + Text
      </motion.button>

      {open && (
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={submit}
          className="absolute bottom-20 right-4 bg-white rounded-xl shadow p-3 w-64"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here…"
            className="w-full border rounded px-2 py-1 mb-2"
            autoFocus
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-indigo-600 text-white rounded py-1">
              Add
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-gray-200 rounded py-1"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </>
  );
}
