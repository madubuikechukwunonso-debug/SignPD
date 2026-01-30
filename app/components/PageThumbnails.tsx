"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";
import { usePages } from "@/app/hooks/usePages";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ItemTypes = { PAGE: "page" };

function DraggableThumb({ index, pageItem }: { index: number; pageItem: any }) {
  const { movePage, deletePage, rotatePage } = usePages();
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: isDragging ? 0.5 : 1 }}
      className="relative border rounded p-1 cursor-move bg-white shadow"
    >
      <Document file={{ data: pageItem.pdfBytes }}>
        <Page pageNumber={1} width={100} />
      </Document>
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
