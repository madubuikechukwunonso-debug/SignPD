import { useEffect } from "react";
import { savePdfToIdb } from "@/app/lib/idb";
import * as pdfLib from "pdf-lib";

export function useAutoSave(pdf: pdfLib.PDFDocument | null) {
  useEffect(() => {
    if (!pdf) return;
    const t = setTimeout(async () => {
      const bytes = await pdf.save();
      await savePdfToIdb(bytes);
    }, 1500);
    return () => clearTimeout(t);
  }, [pdf]);
}
