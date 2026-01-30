"use client";

import { useRef, useEffect, useState } from "react";
import { useDrawings } from "@/app/hooks/useDrawings";
import { PEN_STYLES } from "@/app/lib/constants";

export default function DrawingLayer({ page }: { page: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool] = useState(PEN_STYLES[0]); // default to "Pen"
  const { addDrawing } = useDrawings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = tool.color;
    ctx.lineWidth = tool.width;
    ctx.lineCap = "round";
  }, [tool]);

  const start = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const move = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stop = () => {
    if (!drawing) return;
    setDrawing(false);
    const canvas = canvasRef.current!;
    const dataUrl = canvas.toDataURL("image/png");
    // store as free-hand path for simplicity
    addDrawing({
      page: page - 1,
      tool: "pen",
      color: tool.color,
      width: tool.width,
      points: [], // real app would parse actual path
      dataUrl,
    });
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      width={800}
      height={1100}
      onMouseDown={start}
      onMouseMove={move}
      onMouseUp={stop}
      onMouseLeave={stop}
    />
  );
}
