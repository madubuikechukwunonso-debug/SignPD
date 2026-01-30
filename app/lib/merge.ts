import * as pdfLib from "pdf-lib";
import {
  embedSignature,
  embedText,
  embedHighlights,
  embedDrawings,
  embedStamps,
  embedImages,
} from "./pdf";

export async function buildFinalPdf(
  pages: { pdfBytes?: Uint8Array; rotation: 0 | 90 | 180 | 270 }[],
  signatures: any[],
  texts: any[],
  highlights: any[],
  drawings: any[],
  stamps: any[],
  images: any[]
): Promise<Uint8Array> {
  const merged = await pdfLib.PDFDocument.create();

  /* 1. merge pages (with rotation) */
  for (const p of pages) {
    if (!p.pdfBytes) continue;
    const src = await pdfLib.PDFDocument.load(p.pdfBytes);
    const [copied] = await merged.copyPages(src, [0]);
    if (p.rotation) copied.setRotation(p.rotation);
    merged.addPage(copied);
  }

  /* 2. flatten layers */
  await embedSignature(merged, signatures);
  await embedText(merged, texts);
  await embedHighlights(merged, highlights);
  await embedDrawings(merged, drawings);
  await embedStamps(merged, stamps);
  await embedImages(merged, images);

  return merged.save();
}
