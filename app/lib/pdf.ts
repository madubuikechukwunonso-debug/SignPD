import * as pdfLib from "pdf-lib";
import { TEMPLATES } from "./templates";

/* ---------- embedding helpers for every layer ---------- */

export async function embedSignature(
  pdf: pdfLib.PDFDocument,
  sigs: { dataUrl: string; page: number; x: number; y: number; width: number; height: number }[]
) {
  for (const s of sigs) {
    const img = await pdf.embedPng(s.dataUrl);
    const pages = pdf.getPages();
    const page = pages[s.page];
    page.drawImage(img, { x: s.x, y: s.y, width: s.width, height: s.height });
  }
}

export async function embedText(
  pdf: pdfLib.PDFDocument,
  items: { page: number; x: number; y: number; text: string; size: number; color?: string }[]
) {
  for (const t of items) {
    const pages = pdf.getPages();
    const page = pages[t.page];
    page.drawText(t.text, {
      x: t.x,
      y: t.y,
      size: t.size,
      color: t.color
        ? (() => { const [r, g, b] = hexToRgb(t.color, 1).slice(0, 3); return pdfLib.rgb(r, g, b); })()
        : pdfLib.rgb(0, 0, 0),
    });
  }
}

export async function embedHighlights(
  pdf: pdfLib.PDFDocument,
  highs: { page: number; quads: number[]; color: string }[]
) {
  for (const h of highs) {
    const page = pdf.getPages()[h.page];
    const xs = h.quads.filter((_, i) => i % 2 === 0);
    const ys = h.quads.filter((_, i) => i % 2 === 1);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const width = Math.max(...xs) - x;
    const height = Math.max(...ys) - y;
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color: (() => { const [r, g, b] = hexToRgb(h.color, 0.3).slice(0, 3); return pdfLib.rgb(r, g, b); })(),
      borderWidth: 0,
    });
  }
}

export async function embedDrawings(
  pdf: pdfLib.PDFDocument,
  drawings: { page: number; tool: string; color: string; width: number; points?: { x: number; y: number }[]; bounds?: any }[]
) {
  for (const d of drawings) {
    const pg = pdf.getPages()[d.page];
    const col = (() => { const [r, g, b] = hexToRgb(d.color, 1).slice(0, 3); return pdfLib.rgb(r, g, b); })();

    if (d.tool === "rectangle" && d.bounds) {
      pg.drawRectangle({ ...d.bounds, borderColor: col, borderWidth: d.width });
    } else if (d.tool === "circle" && d.bounds) {
      pg.drawCircle({
        x: d.bounds.x + d.bounds.w / 2,
        y: d.bounds.y + d.bounds.h / 2,
        size: d.bounds.w / 2,
        borderColor: col,
        borderWidth: d.width,
      });
    } else if (d.tool === "line" && d.points && d.points.length === 2) {
      const [a, b] = d.points;
      pg.drawLine({ start: { x: a.x, y: a.y }, end: { x: b.x, y: b.y }, thickness: d.width, color: col });
    } else if (d.points && d.points.length > 1) {
      const path = d.points.map((p) => `${p.x} ${p.y}`).join(" L ");
      pg.drawSvgPath(`M ${path}`, { borderColor: col, borderWidth: d.width });
    }
  }
}

export async function embedStamps(
  pdf: pdfLib.PDFDocument,
  stamps: { page: number; x: number; y: number; type: string; width: number; height: number }[]
) {
  for (const s of stamps) {
    const page = pdf.getPages()[s.page];
    const imgBytes = await fetch(`/stamps/${s.type.toLowerCase()}.svg`)
      .then((r) => r.arrayBuffer())
      .catch(() => new Uint8Array());
    if (!imgBytes.byteLength) continue;
    const img = await pdf.embedPng(imgBytes);
    page.drawImage(img, { x: s.x, y: s.y, width: s.width, height: s.height });
  }
}

export async function embedImages(
  pdf: pdfLib.PDFDocument,
  images: { page: number; x: number; y: number; width: number; height: number; embedKey: string }[]
) {
  for (const img of images) {
    const page = pdf.getPages()[img.page];
    // embedKey usage omitted for brevity
  }
}

/* ---------- helpers ---------- */
function hexToRgb(hex: string, alpha: number): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b, alpha];
}
