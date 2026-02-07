"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";
import { usePages } from "@/app/hooks/usePages";
import * as pdfjsLib from "pdfjs-dist";

// Reliable worker via CDN (same as main editor)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const ItemTypes = { PAGE: "page" };

function DraggableThumb({ index, pageItem }: { index: number; pageItem: any }) {
  const { movePage, deletePage, rotatePage } = usePages();
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PAGE,
    item: { index },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PAGE,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      movePage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  drag(drop(ref));

  // Render thumbnail using pure pdfjs-dist
  useEffect(() => {
    if (!pageItem?.pdfBytes || !(pageItem.pdfBytes instanceof Uint8Array)) {
      // Blank/fallback canvas
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 150;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#f3f4f6";
          ctx.fillRect(0, 0, 150, 200);
          ctx.fillStyle = "#6b7280";
          ctx.font = "14px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Blank", 75, 100);
        }
      }
      return;
    }

    const renderThumbnail = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ data: pageItem.pdfBytes });
        const pdfDoc = await loadingTask.promise;
        const page = await pdfDoc.getPage(1);

        // Base viewport (scale 1)
        const viewportBase = page.getViewport({ scale: 1, rotation: pageItem.rotation || 0 });

        // Target thumbnail width
        const targetWidth = 150;
        const scale = targetWidth / viewportBase.width;
        const viewport = page.getViewport({ scale, rotation: pageItem.rotation || 0 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = targetWidth;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (!context) return;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (err) {
        console.error("Thumbnail render error:", err);
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#fee2e2";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#991b1b";
            ctx.font = "12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Render failed", canvas.width / 2, canvas.height / 2);
          }
        }
      }
    };

    renderThumbnail();
  }, [pageItem.pdfBytes, pageItem.rotation]); // Re-render on bytes or rotation change

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: isDragging ? 0.5 : 1 }}
      className="relative border rounded p-1 cursor-move bg-white shadow"
    >
      <canvas ref={canvasRef} className="rounded" />
      <div className="absolute top-1 right-1 flex gap-1">
        <button
          onClick={() => rotatePage(pageItem.id)}
          className="bg-white/80 px-2 py-1 rounded text-xs hover:bg-white"
          title="Rotate"
        >
          ↻
        </button>
        <button
          onClick={() => deletePage(pageItem.id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

export default function PageThumbnails() {
  const { pages } = usePages();

  return (
    <div className="flex gap-3 overflow-x-auto pb-3 mb-4">
      {pages.map((p, i) => (
        <DraggableThumb key={p.id} index={i} pageItem={p} />
      ))}
    </div>
  );
}
