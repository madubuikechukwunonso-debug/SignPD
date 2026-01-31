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
      {/* Hidden file input */}
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

        {/* Glass card */}
        <div className="relative p-8 sm:p-12 md:p-16 text-center text-gray-800 dark:text-gray-100 glass hover:-translate-y-3 hover:shadow-3xl transition-all duration-500">
          {/* Smaller, fully responsive & optimized logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <motion.h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-300 whitespace-nowrap overflow-hidden">
              {/* Very lightweight stagger: grouped letters for less elements + simple bounce */}
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "backOut" }}
                className="inline-block"
              >
                Sign
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
                className="inline-block ml-1 md:ml-2"
              >
                PD
              </motion.span>
            </motion.h1>

            {/* Subtle, responsive underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              className="h-1.5 sm:h-2 md:h-3 mx-auto mt-3 sm:mt-4 md:mt-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full opacity-80"
            />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
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
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-600 dark:text-amber-400 px-4">
                  Drop to start editing
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button in original position – beautiful & fully functional */}
          <motion.button
            type="button"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.9 }}
            onClick={openFilePicker}
            className="relative z-50 inline-block px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-2xl text-white focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800 min-w-56"
            aria-label="Choose PDF file"
          >
            Choose PDF
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400"
          >
            or drag & drop your file anywhere
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-yellow-200 rounded-full filter blur-3xl opacity-20" />

      <div className="hidden dark:block absolute top-20 left-20 w-96 h-96 bg-amber-800 rounded-full filter blur-3xl opacity-15" />
      <div className="hidden dark:block absolute bottom-20 right-20 w-80 h-80 bg-orange-900 rounded-full filter blur-3xl opacity-10" />
    </main>
  );
}
