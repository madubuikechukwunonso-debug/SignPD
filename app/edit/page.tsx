'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from '../context/PDFContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PDFDocument, degrees } from 'pdf-lib';
import * as fabric from 'fabric';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';

type Tool = 'none' | 'draw' | 'text' | 'highlight' | 'erase' | 'image';

export default function EditPage() {
  const router = useRouter();
  const { pdfFile, pdfBytes, pdfDoc, setPdfDoc, setPdfBytes } = usePDF();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [zoom, setZoom] = useState(1.2);
  const [selectedTool, setSelectedTool] = useState<Tool>('none');

  const canvases = useRef<fabric.Canvas[]>([]);
  const pageContainers = useRef<(HTMLDivElement | null)[]>([]);

  /* ---------------- Redirect guard ---------------- */
  useEffect(() => {
    if (!pdfFile || !pdfBytes) router.push('/');
  }, [pdfFile, pdfBytes, router]);

  /* ---------------- Load PDF ---------------- */
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageOrder(Array.from({ length: numPages }, (_, i) => i));
  };

  /* ---------------- Fabric init ---------------- */
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
        selection: true,
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

      if (selectedTool === 'draw' || selectedTool === 'highlight') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.width = selectedTool === 'draw' ? 4 : 20;
        c.freeDrawingBrush.color =
          selectedTool === 'draw'
            ? '#000000'
            : 'rgba(255,255,0,0.4)';
      }

      if (selectedTool === 'erase') {
        c.on('mouse:down', e => {
          const target = c.findTarget(e.e);
          if (target) c.remove(target);
        });
      }

      if (selectedTool === 'text') {
        c.on('mouse:down', e => {
          const p = c.getPointer(e.e);
          const text = new fabric.Textbox('Edit text', {
            left: p.x,
            top: p.y,
            width: 200,
            fontSize: 18,
            editable: true,
            backgroundColor: 'rgba(255,255,255,0.8)',
          });
          c.add(text);
          c.setActiveObject(text);
          text.enterEditing();
        });
      }
    });
  }, [selectedTool]);

  /* ---------------- Zoom resize ---------------- */
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

  /* ---------------- Image insert (FIXED) ---------------- */
  const addImage = async (file: File) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (!reader.result) return;

      const img = await fabric.Image.fromURL(
        reader.result as string,
        { crossOrigin: 'anonymous' }
      );

      img.scaleToWidth(200);
      img.set({
        left: 50,
        top: 50,
        selectable: true,
      });

      const canvas = canvases.current[0];
      if (!canvas) return;

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    };

    reader.readAsDataURL(file);
  };

  /* ---------------- Download ---------------- */
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
    const blob = new Blob([saved], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile!.name.replace(/\.pdf$/i, '_edited.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pdfFile || !pdfBytes) {
    return <div className="flex h-screen items-center justify-center">Loading…</div>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-amber-600 text-white flex gap-3">
        <button onClick={() => router.push('/')}>← Back</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={() => setSelectedTool('draw')}>Draw</button>
        <button onClick={() => setSelectedTool('text')}>Text</button>
        <button onClick={() => setSelectedTool('highlight')}>Highlight</button>
        <button onClick={() => setSelectedTool('erase')}>Erase</button>
        <input
          type="file"
          accept="image/*"
          onChange={e => e.target.files && addImage(e.target.files[0])}
        />
      </header>

      <div className="flex-1 overflow-auto p-8">
        <Document
          file={{ data: pdfBytes }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
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
