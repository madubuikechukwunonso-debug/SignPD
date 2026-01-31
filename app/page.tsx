"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePdf } from "./hooks/usePdf";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const { loadPdf } = usePdf();
  const [drag, setDrag] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    []
  );

  if (!mounted) return null;

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-6 transition-all duration-500
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
      dark:bg-gradient-to-br dark:from-purple-900 dark:via-indigo-900 dark:to-black
      ${drag ? "bg-indigo-100 dark:bg-indigo-950" : ""}`}
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
        {/* Theme Toggle */}
        <div className="absolute -top-16 right-0 z-10">
          <ThemeToggle />
        </div>

        {/* Glass card */}
        <div className="absolute inset-0 glass" />

        <div className="relative p-12 text-center text-gray-800 dark:text-white">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
          >
            SignPD
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-white/80 mb-10 max-w-lg mx-auto"
          >
            Edit, sign, highlight & rearrange your PDFs in the browser—no uploads to any server.
          </motion.p>

          <AnimatePresence>
            {drag && (
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 border-4 border-dashed border-indigo-500 rounded-3xl flex items-center justify-center pointer-events-none"
              >
                <span className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                  Drop to start editing
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.label
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-10 py-5 bg-indigo-600 rounded-full text-xl font-semibold cursor-pointer hover:bg-indigo-700 transition shadow-xl text-white"
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
            className="mt-8 text-md text-gray-500 dark:text-white/60"
          >
            or drag & drop your file anywhere
          </motion.div>
        </div>
      </motion.div>

      {/* Light mode decorative blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-30" />

      {/* Dark mode decorative blobs */}
      <div className="hidden dark:block absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
      <div className="hidden dark:block absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20" />
    </main>
  );
}
