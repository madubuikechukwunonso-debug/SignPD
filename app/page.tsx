"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePdf } from "./hooks/usePdf";

export default function Home() {
  const router = useRouter();
  const { loadPdf } = usePdf();
  const [drag, setDrag] = useState(false);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") return;
    await loadPdf({ target: { files: [file] } } as any);
    router.push("/edit");
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center px-6 ${
        drag ? "bg-indigo-950" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative w-full max-w-2xl"
      >
        {/* glass card */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20" />
        <div className="relative p-10 text-white text-center">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight mb-2"
          >
            SignPD
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-8"
          >
            Edit, sign, highlight & rearrange your PDFs in the browser—no uploads to any server.
          </motion.p>

          <AnimatePresence>
            {drag && (
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 border-4 border-dashed border-indigo-400 rounded-3xl flex items-center justify-center pointer-events-none"
              >
                <span className="text-2xl font-semibold">Drop to start editing</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.label
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-8 py-4 bg-indigo-600 rounded-full text-lg font-semibold cursor-pointer hover:bg-indigo-500 transition shadow-lg"
          >
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            Choose PDF
          </motion.label>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-sm text-white/60"
          >
            or drag & drop your file anywhere
          </motion.div>
        </div>
      </motion.div>

      {/* decorative blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20" />
    </main>
  );
}
