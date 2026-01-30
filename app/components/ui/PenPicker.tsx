"use client";

import { useState } from "react";
import { PEN_STYLES } from "@/app/lib/constants";

export default function PenPicker() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 border border-white/20 rounded bg-white/10 text-white hover:bg-white/20 transition"
      >
        Pen
      </button>

      {open && (
        <div className="absolute top-10 left-0 bg-white p-2 shadow-lg rounded-lg flex gap-2">
          {PEN_STYLES.map((p) => (
            <div
              key={p.name}
              className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setOpen(false)}
              title={p.name}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
