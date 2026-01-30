"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import { usePages } from "@/app/hooks/usePages";
import HighlightLayer from "@/app/components/HighlightLayer";
import DrawingLayer from "@/app/components/DrawingLayer";
import StickyNotes from "@/app/components/StickyNotes";
import Stamps from "@/app/components/Stamps";
import MeasureTools from "@/app/components/MeasureTools";
import ImageManager from "@/app/components/ImageManager";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer() {
  const { pages } = usePages();
  const [pageIndex, setPageIndex] = useState(0);

  const current = pages[pageIndex];
  if (!current) return null;

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

      <div className="relative shadow-xl rounded-xl overflow-hidden">
        <Document file={{ data: current.pdfBytes }}>
          <Page
            pageNumber={1}
            width={800}
            rotate={current.rotation}
          />
          <HighlightLayer page={pageIndex + 1} />
          <DrawingLayer page={pageIndex + 1} />
          <StickyNotes page={pageIndex + 1} />
          <Stamps page={pageIndex + 1} />
          <MeasureTools page={pageIndex + 1} />
          <ImageManager page={pageIndex + 1} />
        </Document>
      </div>
    </motion.div>
  );
}
