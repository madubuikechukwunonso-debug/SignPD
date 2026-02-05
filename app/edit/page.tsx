'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from '../context/PDFContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PDFDocument } from 'pdf-lib';
import * as fabric from 'fabric';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';

type Tool = 'none' | 'draw' | 'text' | 'highlight' | 'erase';

export default function EditPage() {
  const router = useRouter();
  const { pdfFile, pdfBytes, pdfDoc } = usePDF();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [zoom, setZoom] = useState(1.2);
  const [tool, setTool] = useState<Tool>('none');

  const canvases = useRef<fabric.Canvas[]>([]);
  const pageContainers = useRef<(HTMLDivElement | null)[]>([]);

  /* ---------------- Guard ---------------- */
  useEffect(() => {
    if (!pdfFile || !pdfBytes) router.push('/');
  }, [pdfFile, pdfBytes, router]);

  /* ---------------- PDF Load ---------------- */
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageOrder(Array.from({ length: numPages }, (_, i) => i));
  };

  /* ---------------- Fabric Init ---------------- */
  useEffect(() => {
    if (numPages === null) return;

    canvases.current = [];
    pageContainers.current = [];

    for (let i = 0; i < numPages; i++) {
      const canvasEl = document.getElementById(
        `fabric-canvas-${i}`
      ) as HTMLCanvasElement | null;

      const container = document.getElementById(
        `main-page-${i}`
      ) as HTMLDivElement | null;

      if (!canvasEl || !container) continue;

      pageContainers.current[i] = container;

      const c = new fabric.Canvas(canvasEl, {
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 'transparent',
      });

      canvases.current.push(c);
    }

    return () => {
      canvases.current.forEach(c => c.dispose());
      canvases.current = [];
    };
  }, [numPages]);

  /* ---------------- Tools ---------------- */
  useEffect(() => {
    canvases.current.forEach(c => {
      c.isDrawingMode = false;
      c.off('mouse:down');

      if (tool === 'draw' || tool === 'highlight') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.width = tool === 'draw' ? 4 : 18;
        c.freeDrawingBrush.color =
          tool === 'draw'
            ? '#000000'
            : 'rgba(255,255,0,0.4)';
      }

      if (tool === 'erase') {
        c.on('mouse:down', e => {
          const target = c.findTarget(e.e);
          if (target) c.remove(target);
        });
      }

      if (tool === 'text') {
        c.on('mouse:down', e => {
          const p = c.getPointer(e.e);
          const t = new fabric.Textbox('Edit text', {
            left: p.x,
            top: p.y,
            width: 200,
            fontSize: 18,
            backgroundColor: 'rgba(255,255,255,0.8)',
            editable: true,
          });
          c.add(t);
          c.setActiveObject(t);
          t.enterEditing();
        });
      }
    });
  }, [tool]);

  /* ---------------- Resize on Zoom ---------------- */
  useEffect(() => {
    canvases.current.forEach((c, i) => {
      const container = pageContainers.current[i];
      if (!container) return;
      c.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
      c.renderAll();
    });
  }, [zoom]);

  /* ---------------- Download (FIXED) ---------------- */
  const handleDownload = async () => {
    if (!pdfDoc || !numPages) return;

    for (let i = 0; i < numPages; i++) {
      const c = canvases.current[i];
      if (!c || c.getObjects().length === 0) continue;

      const dataUrl = c.toDataURL({ multiplier: 2 });
      const imgBytes = await fetch(dataUrl).then(r => r.arrayBuffer());
      const img = await pdfDoc.embedPng(imgBytes);

      const page = pdfDoc.getPage(pageOrder[i]);
      const { width, height } = page.getSize();
      page.drawImage(img, { x: 0, y: 0, width, height });
    }

    const saved = await pdfDoc.save();

    // ✅ FIX: use ArrayBuffer, not Uint8Array
    const blob = new Blob([saved.buffer], {
      type: 'application/pdf',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile!.name.replace(/\.pdf$/i, '_edited.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pdfFile || !pdfBytes) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-amber-600 text-white flex gap-2">
        <button onClick={() => router.push('/')}>← Back</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={() => setTool('draw')}>Draw</button>
        <button onClick={() => setTool('text')}>Text</button>
        <button onClick={() => setTool('highlight')}>Highlight</button>
        <button onClick={() => setTool('erase')}>Erase</button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <Document file={{ data: pdfBytes }} onLoadSuccess={onDocumentLoadSuccess}>
          {pageOrder.map((p, i) => (
            <div key={i} id={`main-page-${i}`} className="relative mb-10">
              <Page pageNumber={p + 1} scale={zoom} />
              <canvas
                id={`fabric-canvas-${i}`}
                className="absolute top-0 left-0"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
