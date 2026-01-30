"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  page: number;
  onSign: (sig: {
    dataUrl: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

export default function SignaturePad({ page, onSign }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, []);

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
    const dataUrl = canvasRef.current!.toDataURL("image/png");
    onSign({
      dataUrl,
      page,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
    });
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-xl shadow p-3 w-72"
    >
      <p className="text-xs mb-2 text-gray-600">Sign below (page {page + 1})</p>
      <canvas
        ref={canvasRef}
        width={260}
        height={120}
        className="border rounded"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={stop}
        onMouseLeave={stop}
      />
    </motion.div>
  );
}
