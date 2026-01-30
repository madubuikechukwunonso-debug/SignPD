"use client";

import { useEffect, useRef } from "react";
import { useHighlights } from "@/app/hooks/useHighlights";

export default function HighlightLayer({ page }: { page: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { addHighlight } = useHighlights();

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const rects = Array.from(range.getClientRects());
      if (rects.length === 0) return;

      const host = svgRef.current?.closest("div")?.getBoundingClientRect();
      if (!host) return;

      const quads: number[] = [];
      rects.forEach((r) => {
        const x = r.left - host.left;
        const y = r.top - host.top;
        quads.push(x, y, x + r.width, y, x + r.width, y + r.height, x, y + r.height);
      });

      addHighlight({ page: page - 1, quads, color: "#FFD93D" });
      selection.removeAllRanges();
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [page, addHighlight]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
