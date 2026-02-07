"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { usePages } from "@/app/hooks/usePages";
import HighlightLayer from "@/app/components/HighlightLayer";
import DrawingLayer from "@/app/components/DrawingLayer";
import StickyNotes from "@/app/components/StickyNotes";
import Stamps from "@/app/components/Stamps";
import MeasureTools from "@/app/components/MeasureTools";
import ImageManager from "@/app/components/ImageManager";
import * as pdfjsLib from "pdfjs-dist";

// Reliable worker via CDN (consistent with other components)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const { pages } = usePages();
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const current = pages[pageIndex];
  if (!current || !current.pdfBytes) {
    return <div className="text-center text-red-600">No page data available</div>;
  }

  // Render the current page using pure pdfjs-dist
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const renderPage = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ data: current.pdfBytes });
        const pdfDoc = await loadingTask.promise;
        const page = await pdfDoc.getPage(1);

        const desiredWidth = 800; // Match your original fixed width
        const viewportBase = page.getViewport({ scale: 1, rotation: current.rotation || 0 });
        const scale = desiredWidth / viewportBase.width;
        const viewport = page.getViewport({ scale, rotation: current.rotation || 0 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (!context) return;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        setIsLoading(false);
      } catch (err) {
        console.error("Page render error:", err);
        setError("Failed to render page");
        setIsLoading(false);

        // Draw error placeholder
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = 800;
            canvas.height = 600;
            ctx.fillStyle = "#fee2e2";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#991b1b";
            ctx.font = "20px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Render failed", canvas.width / 2, canvas.height / 2);
          }
        }
      }
    };

    renderPage();
  }, [current.pdfBytes, current.rotation, pageIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mt-6"
    >
      <div className="flex items-center justify-between mb-4">
        <button
          disabled={pageIndex <= 0}
          onClick={() => setPageIndex((i) => i - 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {pageIndex + 1} / {pages.length}
        </span>
        <button
          disabled={pageIndex >= pages.length - 1}
          onClick={() => setPageIndex((i) => i + 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="relative shadow-xl rounded-xl overflow-hidden bg-gray-100">
        {/* Loading / Error overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-lg">Loading page...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100/80 z-10">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {/* Base PDF canvas */}
        <canvas ref={canvasRef} className="block" />

        {/* Overlay layers – positioned absolutely over the canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <HighlightLayer page={pageIndex + 1} />
          <DrawingLayer page={pageIndex + 1} />
          <StickyNotes page={pageIndex + 1} />
          <Stamps page={pageIndex + 1} />
          <MeasureTools page={pageIndex + 1} />
          <ImageManager page={pageIndex + 1} />
        </div>
      </div>
    </motion.div>
  );
}
