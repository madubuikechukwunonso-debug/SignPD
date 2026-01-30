"use client";

import { motion } from "framer-motion";
import { usePages } from "@/app/hooks/usePages";
import { useSignatures } from "@/app/hooks/useSignatures";
import { useTextItems } from "@/app/hooks/useTextItems";
import { useHighlights } from "@/app/hooks/useHighlights";
import { useDrawings } from "@/app/hooks/useDrawings";
import { useStamps } from "@/app/hooks/useStamps";
import { useImages } from "@/app/hooks/useImages";
import { buildFinalPdf } from "@/app/lib/merge";

export default function DownloadBtn() {
  const { pages } = usePages();
  const { sigs } = useSignatures();
  const { items: texts } = useTextItems();
  const { highlights } = useHighlights();
  const { drawings } = useDrawings();
  const { stamps } = useStamps();
  const { images } = useImages();

  const download = async () => {
    const bytes = await buildFinalPdf(pages, sigs, texts, highlights, drawings, stamps, images);
    // fix: wrap bytes so Blob constructor is happy
    const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SignPD-edited.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={download}
      className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white shadow-lg font-semibold"
    >
      Save & Download
    </motion.button>
  );
}
