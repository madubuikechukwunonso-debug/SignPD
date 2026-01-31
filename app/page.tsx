"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePdf } from "./hooks/usePdf";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const { loadPdf } = usePdf();
  const [drag, setDrag] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  if (!mounted) return null;

  const mainClasses = `
    min-h-screen flex items-center justify-center px-6 transition-all duration-700
    bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50
    dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-black
    ${drag ? "bg-amber-100 dark:bg-gray-800" : ""}
  `.trim().replace(/\s+/g, " ");

  return (
    <main
      className={mainClasses}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative w-full max-w-3xl"
      >
        {/* Theme Toggle */}
        <div className="absolute -top-20 right-0 z-50">
          <ThemeToggle />
        </div>

        {/* Card with glass + hover lift */}
        <div className="relative p-16 text-center text-gray-800 dark:text-gray-100 glass hover:-translate-y-3 hover:shadow-3xl transition-all duration-500">
          {/* Enhanced animated logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1 className="text-7xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-300">
              {"SignPD".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 80, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              className="h-3 mx-auto mt-6 max-w-md bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full opacity-80"
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Edit, sign, highlight & rearrange your PDFs in the browser—no uploads to any server.
          </motion.p>

          <AnimatePresence>
            {drag && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 border-4 border-dashed border-amber-500 dark:border-amber-600 rounded-3xl flex items-center justify-center pointer-events-none z-10 backdrop-blur-sm"
              >
                <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                  Drop to start editing
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* New upload-style button – completely outside the glass card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center"
        >
          <motion.button
            type="button"
            onClick={openFilePicker}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-48 h-48 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl flex items-center justify-center overflow-hidden z-50"
            aria-label="Choose PDF file to edit"
          >
            {/* Cloud background (subtle) */}
            <svg
              className="absolute inset-0 w-full h-full text-white/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>

            {/* Animated upward arrow (moves up into the cloud) */}
            <motion.div
              animate={{ y: [20, -20, 20] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative z-10"
            >
              <svg
                className="w-32 h-32 text-white drop-shadow-lg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-2xl font-semibold text-gray-700 dark:text-gray-300"
          >
            Choose PDF to start editing
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400"
          >
            or drag & drop your file anywhere
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Subtle decorative blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-yellow-200 rounded-full filter blur-3xl opacity-20" />

      {/* Dark mode blobs */}
      <div className="hidden dark:block absolute top-20 left-20 w-96 h-96 bg-amber-800 rounded-full filter blur-3xl opacity-15" />
      <div className="hidden dark:block absolute bottom-20 right-20 w-80 h-80 bg-orange-900 rounded-full filter blur-3xl opacity-10" />
    </main>
  );
}
