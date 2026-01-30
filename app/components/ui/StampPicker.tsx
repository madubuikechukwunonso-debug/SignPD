"use client";

import { useState } from "react";
import { STAMP_LIST } from "@/app/lib/constants";

export default function StampPicker({ stamps = STAMP_LIST }: { stamps?: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 border border-white/20 rounded bg-white/10 text-white hover:bg-white/20 transition"
      >
        Stamps
      </button>

      {open && (
        <div className="absolute top-10 left-0 bg-white p-2 shadow-lg rounded-lg grid grid-cols-2 gap-2">
          {stamps.map((s) => (
            <div
              key={s}
              className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
