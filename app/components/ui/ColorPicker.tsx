"use client";

import { useState } from "react";
import { HIGHLIGHT_COLORS } from "@/app/lib/constants";

export default function ColorPicker() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 border border-white/20 rounded bg-white/10 text-white hover:bg-white/20 transition"
      >
        Color
      </button>

      {open && (
        <div className="absolute top-10 left-0 grid grid-cols-4 gap-2 bg-white p-2 shadow-lg rounded-lg">
          {HIGHLIGHT_COLORS.map((c) => (
            <div
              key={c.value}
              className="w-6 h-6 rounded border cursor-pointer"
              style={{ backgroundColor: c.value }}
              onClick={() => setOpen(false)}
              title={c.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
