"use client";

import { usePages } from "@/app/hooks/usePages";
import { TEMPLATES } from "@/app/lib/templates";

export default function PageControls() {
  const { addBlankPage } = usePages();

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <button
        onClick={() => addBlankPage()}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm"
      >
        + Blank
      </button>
      <button
        onClick={() => addBlankPage(undefined, "lined")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm"
      >
        + Lined
      </button>
      <button
        onClick={() => addBlankPage(undefined, "grid")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm"
      >
        + Grid
      </button>
      <button
        onClick={() => addBlankPage(undefined, "checklist")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm"
      >
        + Checklist
      </button>
      <button
        onClick={() => addBlankPage(undefined, "meeting")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm"
      >
        + Meeting
      </button>
    </div>
  );
}
