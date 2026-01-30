"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStamps } from "@/app/hooks/useStamps";
import { STAMP_LIST } from "@/app/lib/constants";

export default function Stamps({ page }: { page: number }) {
  const [open, setOpen] = useState(false);
  const { addStamp } = useStamps();

  const choose = (type: string) => {
    addStamp({
      page: page - 1,
      x: 200,
      y: 200,
      type,
      width: 120,
      height: 40,
    });
    setOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((v) => !v)}
        className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-2 rounded-full shadow"
        title="Add stamp"
      >
        ⭐
      </motion.button>

      {open && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-20 left-4 bg-white p-2 shadow-lg rounded-lg grid grid-cols-2 gap-2"
        >
          {STAMP_LIST.map((s) => (
            <button
              key={s}
              onClick={() => choose(s)}
              className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
            >
              {s}
            </button>
          ))}
        </motion.div>
      )}
    </>
  );
}
