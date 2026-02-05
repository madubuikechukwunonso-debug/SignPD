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

  // History (Undo / Redo)
  const history = useRef<string[][]>([]);
  const historyIndex = useRef<number[]>([]);

  useEffect(() => {
    if (!pdfFile || !pdfBytes) router.push('/');
  }, [pdfFile, pdfBytes, router]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageOrder(Array.from({ length: numPages }, (_, i) => i));
  };

  useEffect(() => {
    if (numPages === null) return;

    canvases.current = [];
    pageContainers.current = [];
    history.current = [];
    historyIndex.current = [];

    for (let i = 0; i < numPages; i++) {
      const canvasEl = document.getElementById(`fabric-canvas-${i}`) as HTMLCanvasElement;
      const container = document.getElementById(`main-page-${i}`) as HTMLDivElement;

      if (!canvasEl || !container) continue;

      pageContainers.current[i] = container;

      const c = new fabric.Canvas(canvasEl, {
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 'transparent',
        selection: true,
      });

      history.current[i] = [];
      historyIndex.current[i] = -1;

      const saveHistory = () => {
        history.current[i].splice(historyIndex.current[i] + 1);
        history.current[i].push(JSON.stringify(c.toJSON()));
        historyIndex.current[i]++;
      };

      c.on('object:added', saveHistory);
      c.on('object:modified', saveHistory);
      c.on('object:removed', saveHistory);

      canvases.current.push(c);
    }

    return () => canvases.current.forEach(c => c.dispose());
  }, [numPages]);

  useEffect(() => {
    canvases.current.forEach(c => {
      c.off('mouse:down');
      c.isDrawingMode = false;

      if (selectedTool === 'draw' || selectedTool === 'highlight') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.width = selectedTool === 'draw' ? 4 : 20;
        c.freeDrawingBrush.color =
          selectedTool === 'draw' ? '#000' : 'rgba(255,255,0,0.4)';
      }

      if (selectedTool === 'erase') {
        c.on('mouse:down', opt => {
          const target = c.findTarget(opt.e);
          if (target) c.remove(target);
        });
      }

      if (selectedTool === 'text') {
        c.on('mouse:down', opt => {
          const p = c.getPointer(opt.e);
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

  const undo = (i: number) => {
    if (historyIndex.current[i] <= 0) return;
    historyIndex.current[i]--;
    canvases.current[i].loadFromJSON(
      history.current[i][historyIndex.current[i]],
      () => canvases.current[i].renderAll()
    );
  };

  const redo = (i: number) => {
    if (historyIndex.current[i] >= history.current[i].length - 1) return;
    historyIndex.current[i]++;
    canvases.current[i].loadFromJSON(
      history.current[i][historyIndex.current[i]],
      () => canvases.current[i].renderAll()
    );
  };

  const addImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result as string, img => {
        img.scaleToWidth(200);
        canvases.current[0]?.add(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const updatePdfState = async (doc: PDFDocument) => {
    const bytes = await doc.save();
    setPdfBytes(new Uint8Array(bytes));
    setPdfDoc(doc);
  };

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

    const savedBytes = await pdfDoc.save();
    const blob = new Blob([savedBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile!.name.replace(/\.pdf$/i, '_edited.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pdfFile || !pdfBytes) {
    return <div className="flex h-screen items-center justify-center">Loading editor…</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-amber-600 text-white flex gap-4">
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
        <Document file={{ data: pdfBytes }} onLoadSuccess={onDocumentLoadSuccess}>
          {pageOrder.map((p, i) => (
            <div key={i} id={`main-page-${i}`} className="relative mb-10">
              <Page pageNumber={p + 1} scale={zoom} />
              <canvas
                id={`fabric-canvas-${i}`}
                className="absolute top-0 left-0"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="flex gap-2 mt-2">
                <button onClick={() => undo(i)}>Undo</button>
                <button onClick={() => redo(i)}>Redo</button>
              </div>
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
