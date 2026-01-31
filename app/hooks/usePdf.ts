"use client";
import { useState } from "react";
import * as pdfLib from "pdf-lib";
import { savePdfToIdb } from "@/app/lib/idb";

export function usePdf() {
  const [pdf, setPdf] = useState<pdfLib.PDFDocument | null>(null);
  const [fileName, setFileName] = useState("edited.pdf");

  const loadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = await pdfLib.PDFDocument.load(bytes);
    setPdf(doc);
    setFileName(file.name.replace(".pdf", "-signed.pdf"));
    await savePdfToIdb(bytes); // persist original
  };

  return { pdf, setPdf, fileName, loadPdf };
}
