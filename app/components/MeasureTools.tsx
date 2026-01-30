"use client";

import { useState } from "react";
import { useMeasures } from "@/app/hooks/useMeasures";

export default function MeasureTools({ page }: { page: number }) {
  const [mode, setMode] = useState<"distance" | "area" | "perimeter">("distance");
  const { addMeasure } = useMeasures();
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    // finish on right-click or after required clicks
    if (
      (mode === "distance" && newPoints.length === 2) ||
      (mode !== "distance" && newPoints.length === 3)
    ) {
      addMeasure({ page: page - 1, type: mode, points: newPoints });
      setPoints([]);
    }
  };

  const reset = () => setPoints([]);

  return (
    <div className="absolute top-4 left-48 flex items-center gap-2">
      {(["distance", "area", "perimeter"] as const).map((m) => (
        <button
          key={m}
          onClick={() => {
            setMode(m);
            reset();
          }}
          className={`px-3 py-1 rounded border text-sm ${
            mode === m ? "bg-indigo-600 text-white" : "bg-white"
          }`}
        >
          {m}
        </button>
      ))}
      {points.length > 0 && (
        <button onClick={reset} className="px-2 py-1 rounded bg-gray-200 text-xs">
          Reset
        </button>
      )}

      <svg
        className="absolute inset-0 pointer-events-auto"
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          reset();
        }}
      />
    </div>
  );
}
