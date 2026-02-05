'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from '../context/PDFContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PDFDocument } from 'pdf-lib';

// Correct fabric.js import (standard for TypeScript)
import * as fabric from 'fabric';

export default function EditPage() {
  const router = useRouter();
  const { pdfFile, pdfBytes, pdfDoc, setPdfDoc, setPdfBytes } = usePDF();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [zoom, setZoom] = useState(1.2);
  const [selectedTool, setSelectedTool] = useState<'none' | 'draw' | 'text' | 'highlight'>('none');

  const canvases = useRef<fabric.Canvas[]>([]);
  const pageContainers = useRef<(HTMLDivElement | null)[]>([]);

  // Redirect if no PDF
  useEffect(() => {
    if (!pdfFile || !pdfBytes) {
      router.push('/');
    }
  }, [pdfFile, pdfBytes, router]);

  // Worker src (your local file)
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
  }, []);

  // Initialize page order on load
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageOrder(Array.from({ length: numPages }, (_, i) => i));
  };

  // Initialize and cleanup fabric canvases
  useEffect(() => {
    if (numPages === null) return;

    canvases.current = [];
    pageContainers.current = [];

    for (let i = 0; i < numPages; i++) {
      const canvasEl = document.getElementById(`fabric-canvas-${i}`) as HTMLCanvasElement;
      const container = document.getElementById(`main-page-${i}`) as HTMLDivElement;
      if (canvasEl && container) {
        pageContainers.current[i] = container;

        const { clientWidth, clientHeight } = container;

        const fCanvas = new fabric.Canvas(canvasEl, {
          width: clientWidth,
          height: clientHeight,
          backgroundColor: 'transparent',
        });

        canvases.current.push(fCanvas);
      }
    }

    return () => {
      canvases.current.forEach(c => c.dispose());
      canvases.current = [];
    };
  }, [numPages]);

  // Update tool modes (fixed: explicitly initialize brush to avoid undefined)
  useEffect(() => {
    canvases.current.forEach(c => {
      if (selectedTool === 'draw') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.color = '#000000';
        c.freeDrawingBrush.width = 5;
      } else if (selectedTool === 'highlight') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.color = 'rgba(255,255,0,0.5)';
        c.freeDrawingBrush.width = 20;
      } else if (selectedTool === 'text') {
        c.isDrawingMode = false;
        c.defaultCursor = 'text';
        c.off('mouse:down');
        c.on('mouse:down', (opt) => {
          const pointer = c.getPointer(opt.e);
          const text = new fabric.Textbox('Edit text...', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            width: 200,
            backgroundColor: 'rgba(255,255,255,0.8)',
            editable: true,
          });
          c.add(text);
          c.setActiveObject(text);
          text.enterEditing();
          c.renderAll();
        });
      } else {
        c.isDrawingMode = false;
        c.defaultCursor = 'default';
        c.off('mouse:down');
      }
      c.renderAll();
    });
  }, [selectedTool]);

  // Resize canvases on zoom
  useEffect(() => {
    canvases.current.forEach((c, i) => {
      const container = pageContainers.current[i];
      if (container) {
        const { clientWidth, clientHeight } = container;
        c.setDimensions({ width: clientWidth, height: clientHeight });
        c.renderAll();
      }
    });
  }, [zoom]);

  // Update PDF state after modifications
  const updatePdfState = async (newDoc: PDFDocument) => {
    const newBytesArray = await newDoc.save();
    const newBytes = new Uint8Array(newBytesArray);
    setPdfBytes(newBytes);
    setPdfDoc(newDoc);
  };

  // Delete page
  const deletePage = (thumbIndex: number) => {
    if (!pdfDoc || numPages === 1) return;
    const actualIndex = pageOrder[thumbIndex];
    pdfDoc.removePage(actualIndex);
    const newOrder = pageOrder.filter((_, i) => i !== thumbIndex);
    setPageOrder(newOrder);
    updatePdfState(pdfDoc);
  };

  // Rotate page
  const rotatePage = (thumbIndex: number, degrees: number) => {
    if (!pdfDoc) return;
    const actualIndex = pageOrder[thumbIndex];
    const page = pdfDoc.getPage(actualIndex);
    const currentRot = page.getRotation();
    page.setRotation((currentRot + degrees + 360) % 360);
    updatePdfState(pdfDoc);
  };

  // Move page (reorder)
  const movePage = (thumbIndex: number, direction: 'up' | 'down') => {
    const newOrder = [...pageOrder];
    if (direction === 'up' && thumbIndex > 0) {
      [newOrder[thumbIndex - 1], newOrder[thumbIndex]] = [newOrder[thumbIndex], newOrder[thumbIndex - 1]];
    } else if (direction === 'down' && thumbIndex < newOrder.length - 1) {
      [newOrder[thumbIndex], newOrder[thumbIndex + 1]] = [newOrder[thumbIndex + 1], newOrder[thumbIndex]];
    } else return;

    setPageOrder(newOrder);

    const rebuildDoc = async () => {
      if (!pdfDoc) return;
      const tempDoc = await PDFDocument.create();
      for (const idx of newOrder) {
        const [copiedPage] = await tempDoc.copyPages(pdfDoc, [idx]);
        tempDoc.addPage(copiedPage);
      }
      updatePdfState(tempDoc);
    };
    rebuildDoc();
  };

  // Add blank page
  const addBlankPage = async () => {
    if (!pdfDoc) return;
    const pages = pdfDoc.getPages();
    const size = pages[0]?.getSize() ?? [612, 792]; // US Letter fallback
    pdfDoc.addPage(size);
    updatePdfState(pdfDoc);
  };

  // Download with flattened annotations
  const handleDownload = async () => {
    if (!pdfDoc || !pdfFile || !numPages) return;

    let docToSave = pdfDoc;

    // Flatten annotations if present
    for (let i = 0; i < numPages; i++) {
      const c = canvases.current[i];
      if (c && c.getObjects().length > 0) {
        const dataUrl = c.toDataURL({ format: 'png' });
        const imgBytes = await fetch(dataUrl).then(r => r.arrayBuffer());
        const img = await docToSave.embedPng(imgBytes);
        const page = docToSave.getPage(pageOrder[i]);
        const { width, height } = page.getSize();
        page.drawImage(img, { x: 0, y: 0, width, height });
      }
    }

    const savedBytes = await docToSave.save();
    const blob = new Blob([savedBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace(/\.pdf$/i, '_edited.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!pdfFile || !pdfBytes) {
    return <div className="flex min-h-screen items-center justify-center">Preparing editor...</div>;
  }

  const file = { data: pdfBytes }; // Bytes for reliable re-rendering after edits

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-950 dark:via-slate-900 dark:to-black overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 flex items-center justify-between shadow-2xl">
        <button onClick={handleBack} className="px-5 py-2.5 bg-amber-800/80 rounded-lg hover:bg-amber-700 transition">
          ← Back to Home
        </button>
        <h1 className="text-xl font-bold truncate max-w-md">Editing: {pdfFile.name}</h1>
        <div className="flex items-center gap-6">
          <button onClick={handleDownload} className="px-7 py-2.5 bg-green-600 rounded-lg hover:bg-green-500 transition font-medium">
            Download Edited PDF
          </button>
          <div className="flex items-center gap-3 bg-amber-700/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="px-3 py-1 bg-amber-800 rounded hover:bg-amber-700 transition">
              −
            </button>
            <span className="w-20 text-center font-medium">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => z + 0.2)} className="px-3 py-1 bg-amber-800 rounded hover:bg-amber-700 transition">
              +
            </button>
          </div>
        </div>
      </header>

      {/* Tools Toolbar */}
      <div className="bg-amber-100/80 dark:bg-gray-800 border-b border-amber-200 dark:border-gray-700 p-5 flex gap-5 overflow-x-auto shadow-md">
        <button onClick={addBlankPage} className="px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-600 transition font-medium whitespace-nowrap shadow-lg">
          + Add Blank Page
        </button>
        <button onClick={() => setSelectedTool('draw')} className={`px-6 py-3 rounded-xl transition font-medium whitespace-nowrap shadow-lg ${selectedTool === 'draw' ? 'bg-amber-600 text-white' : 'bg-amber-700 text-white hover:bg-amber-600'}`}>
          ✒️ Signature / ✏️ Draw
        </button>
        <button onClick={() => setSelectedTool('text')} className={`px-6 py-3 rounded-xl transition font-medium whitespace-nowrap shadow-lg ${selectedTool === 'text' ? 'bg-amber-600 text-white' : 'bg-amber-700 text-white hover:bg-amber-600'}`}>
          T Add Text
        </button>
        <button onClick={() => setSelectedTool('highlight')} className={`px-6 py-3 rounded-xl transition font-medium whitespace-nowrap shadow-lg ${selectedTool === 'highlight' ? 'bg-amber-600 text-white' : 'bg-amber-700 text-white hover:bg-amber-600'}`}>
          🖍️ Highlight
        </button>
        <button onClick={() => setSelectedTool('none')} className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition font-medium whitespace-nowrap shadow-lg">
          Select / Move
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail Sidebar */}
        <div className="w-80 bg-amber-50/90 dark:bg-gray-900 border-r border-amber-200 dark:border-gray-700 overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-5">Pages {numPages ? `(${numPages})` : ''}</h2>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={null}>
            {pageOrder.map((actualIndex, thumbIndex) => (
              <div key={thumbIndex} className="mb-8 relative group">
                <div className="flex justify-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => movePage(thumbIndex, 'up')} disabled={thumbIndex === 0} className="text-xs px-2 py-1 bg-amber-600 text-white rounded">↑</button>
                  <button onClick={() => movePage(thumbIndex, 'down')} disabled={thumbIndex === pageOrder.length - 1} className="text-xs px-2 py-1 bg-amber-600 text-white rounded">↓</button>
                  <button onClick={() => rotatePage(thumbIndex, -90)} className="text-xs px-2 py-1 bg-amber-600 text-white rounded">↺</button>
                  <button onClick={() => rotatePage(thumbIndex, 90)} className="text-xs px-2 py-1 bg-amber-600 text-white rounded">↻</button>
                  <button onClick={() => deletePage(thumbIndex)} className="text-xs px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
                <div
                  className="border-4 border-amber-300/50 rounded-xl overflow-hidden shadow-md bg-white cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById(`main-page-${thumbIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  <Page pageNumber={actualIndex + 1} width={200} />
                </div>
                <p className="text-center text-lg font-medium mt-3 text-amber-900 dark:text-amber-400">{thumbIndex + 1}</p>
              </div>
            ))}
          </Document>
        </div>

        {/* Main Viewer */}
        <div className="flex-1 overflow-y-auto p-10">
          {numPages === null ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl font-medium text-amber-900 dark:text-amber-300">Loading PDF pages...</p>
            </div>
          ) : (
            <Document file={file} loading={null}>
              {pageOrder.map((actualIndex, displayIndex) => (
                <div
                  key={displayIndex}
                  id={`main-page-${displayIndex}`}
                  className="mb-16 mx-auto max-w-5xl shadow-2xl bg-white rounded-2xl overflow-hidden border-4 border-amber-200/50 relative"
                >
                  <Page pageNumber={actualIndex + 1} scale={zoom} />
                  <canvas
                    id={`fabric-canvas-${displayIndex}`}
                    className="absolute top-0 left-0 pointer-events-auto"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ))}
            </Document>
          )}
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="hidden dark:block fixed top-20 left-20 w-96 h-96 bg-amber-800 rounded-full filter blur-3xl opacity-10 pointer-events-none" />
      <div className="hidden dark:block fixed bottom-20 right-20 w-80 h-80 bg-orange-900 rounded-full filter blur-3xl opacity-10 pointer-events-none" />
    </div>
  );
}
