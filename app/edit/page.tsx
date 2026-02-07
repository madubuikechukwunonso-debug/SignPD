'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from '../context/PDFContext';
import * as pdfjsLib from 'pdfjs-dist';
import * as fabric from 'fabric';
import { PDFDocument, degrees } from 'pdf-lib';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type PageConfig =
  | { type: 'original'; originalIndex: number; rotation: number }
  | { type: 'blank'; rotation: number };

export default function EditPage() {
  const router = useRouter();
  const { pdfFile, originalBytes, originalDoc, blankPageSize } = usePDF();

  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [pageConfigs, setPageConfigs] = useState<PageConfig[]>([]);
  const [zoom, setZoom] = useState(1.5);
  const [selectedTool, setSelectedTool] = useState<'none' | 'draw' | 'text' | 'highlight'>('none');

  const canvases = useRef<fabric.Canvas[]>([]);
  const baseCanvases = useRef<HTMLCanvasElement[]>([]);
  const thumbnailCanvases = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    if (!pdfFile || !originalBytes) {
      router.push('/');
    }
  }, [pdfFile, originalBytes, router]);

  // Reliable worker via CDN
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }, []);

  // Load pdfjs document
  useEffect(() => {
    if (originalBytes) {
      const loadingTask = pdfjsLib.getDocument({ data: originalBytes });
      loadingTask.promise
        .then((doc) => {
          setPdfjsDoc(doc);
          const configs: PageConfig[] = [];
          for (let i = 0; i < doc.numPages; i++) {
            configs.push({ type: 'original', originalIndex: i, rotation: 0 });
          }
          setPageConfigs(configs);
        })
        .catch((err) => {
          console.error('pdfjs load error:', err);
        });
    }
  }, [originalBytes]);

  // Truncate refs when pages are deleted
  useEffect(() => {
    baseCanvases.current.length = pageConfigs.length;
    thumbnailCanvases.current.length = pageConfigs.length;
    canvases.current.length = pageConfigs.length;
  }, [pageConfigs.length]);

  // Initialize / cleanup fabric canvases
  useEffect(() => {
    canvases.current.forEach((c) => c?.dispose());
    canvases.current = [];

    pageConfigs.forEach((_, i) => {
      const overlayEl = document.getElementById(`overlay-canvas-${i}`) as HTMLCanvasElement;
      if (overlayEl) {
        const fCanvas = new fabric.Canvas(overlayEl, {
          backgroundColor: 'transparent',
        });
        canvases.current[i] = fCanvas;
      }
    });

    return () => {
      canvases.current.forEach((c) => c?.dispose());
      canvases.current = [];
    };
  }, [pageConfigs.length]);

  // Tool modes
  useEffect(() => {
    canvases.current.forEach((c) => {
      if (!c) return;

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
        c.on('mouse:down', (opt) => {
          const pointer = c.getPointer(opt.e);
          const text = new fabric.Textbox('Edit text...', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            width: 200,
            backgroundColor: 'rgba(255,255,255,0.8)',
          });
          c.add(text);
          c.setActiveObject(text);
          text.enterEditing();
        });
      } else {
        c.isDrawingMode = false;
        c.defaultCursor = 'default';
        c.off('mouse:down');
      }
      c.renderAll();
    });
  }, [selectedTool]);

  // Render main viewer pages
  const renderAllBases = async () => {
    for (let i = 0; i < pageConfigs.length; i++) {
      const config = pageConfigs[i];
      const baseCanvas = baseCanvases.current[i];
      if (!baseCanvas || !pdfjsDoc) continue;

      const context = baseCanvas.getContext('2d');
      if (!context) continue;

      try {
        if (config.type === 'original') {
          const page = await pdfjsDoc.getPage(config.originalIndex + 1);
          const viewport = page.getViewport({ scale: zoom, rotation: config.rotation });
          baseCanvas.width = viewport.width;
          baseCanvas.height = viewport.height;

          const overlayCanvas = document.getElementById(`overlay-canvas-${i}`) as HTMLCanvasElement;
          if (overlayCanvas) {
            overlayCanvas.width = viewport.width;
            overlayCanvas.height = viewport.height;
            canvases.current[i]?.setDimensions({ width: viewport.width, height: viewport.height });
            canvases.current[i]?.renderAll();
          }

          await page.render({ canvasContext: context, viewport }).promise;
        } else {
          // Blank page
          let width = (blankPageSize?.width || 612) * zoom;
          let height = (blankPageSize?.height || 792) * zoom;
          if (config.rotation % 180 === 90) [width, height] = [height, width];

          baseCanvas.width = width;
          baseCanvas.height = height;
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, width, height);

          const overlayCanvas = document.getElementById(`overlay-canvas-${i}`) as HTMLCanvasElement;
          if (overlayCanvas) {
            overlayCanvas.width = width;
            overlayCanvas.height = height;
            canvases.current[i]?.setDimensions({ width, height });
          }
        }
      } catch (err) {
        console.error(`Failed to render page ${i + 1}:`, err);
        context.fillStyle = '#ffcccc';
        context.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
        context.fillStyle = '#000';
        context.font = '20px sans-serif';
        context.fillText('Render error', 20, 50);
      }
    }
  };

  // Render thumbnails
  const renderThumbnails = async () => {
    if (!pdfjsDoc) return;

    const targetWidth = 150;

    for (let i = 0; i < pageConfigs.length; i++) {
      const config = pageConfigs[i];
      const canvas = thumbnailCanvases.current[i];
      if (!canvas) continue;

      const context = canvas.getContext('2d');
      if (!context) continue;

      try {
        if (config.type === 'original') {
          const page = await pdfjsDoc.getPage(config.originalIndex + 1);
          let viewport = page.getViewport({ scale: 1, rotation: config.rotation });
          const scale = targetWidth / viewport.width;
          viewport = page.getViewport({ scale, rotation: config.rotation });

          canvas.width = Math.round(viewport.width);
          canvas.height = Math.round(viewport.height);

          await page.render({ canvasContext: context, viewport }).promise;
        } else {
          // Blank page thumbnail
          let baseWidth = blankPageSize?.width || 612;
          let baseHeight = blankPageSize?.height || 792;
          if (config.rotation % 180 === 90) [baseWidth, baseHeight] = [baseHeight, baseWidth];

          const scale = targetWidth / baseWidth;
          canvas.width = Math.round(targetWidth);
          canvas.height = Math.round(baseHeight * scale);

          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = '#666666';
          context.font = '14px sans-serif';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText('Blank Page', canvas.width / 2, canvas.height / 2);
        }
      } catch (err) {
        console.error(`Thumbnail render error for page ${i + 1}:`, err);
        canvas.width = 150;
        canvas.height = 200;
        context.fillStyle = '#ffcccc';
        context.fillRect(0, 0, 150, 200);
        context.fillStyle = '#000';
        context.font = '16px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Error', 75, 100);
      }
    }
  };

  useEffect(() => {
    if (pdfjsDoc && pageConfigs.length > 0) {
      renderAllBases();
      renderThumbnails();
    }
  }, [pdfjsDoc, pageConfigs, zoom]);

  // Page operations
  const addBlankPage = () => {
    setPageConfigs([...pageConfigs, { type: 'blank', rotation: 0 }]);
  };

  const deletePage = (index: number) => {
    canvases.current[index]?.dispose();
    canvases.current.splice(index, 1);
    setPageConfigs(pageConfigs.filter((_, i) => i !== index));
  };

  const rotatePage = (index: number, amount: number) => {
    setPageConfigs(pageConfigs.map((c, i) => i === index ? { ...c, rotation: (c.rotation + amount) % 360 } : c));
  };

  const movePage = (dragIndex: number, hoverIndex: number) => {
    const dragged = pageConfigs[dragIndex];
    const newConfigs = [...pageConfigs];
    newConfigs.splice(dragIndex, 1);
    newConfigs.splice(hoverIndex, 0, dragged);
    setPageConfigs(newConfigs);

    const draggedCanvas = canvases.current[dragIndex];
    const newCanvases = [...canvases.current];
    newCanvases.splice(dragIndex, 1);
    newCanvases.splice(hoverIndex, 0, draggedCanvas);
    canvases.current = newCanvases;
  };

  // Download - FIXED TYPE ERROR (strict TS compatibility)
  const handleDownload = async () => {
    if (!originalDoc || !pdfFile) return;

    const newDoc = await PDFDocument.create();

    for (let i = 0; i < pageConfigs.length; i++) {
      const config = pageConfigs[i];
      let page;
      let pageWidth, pageHeight;

      if (config.type === 'blank') {
        let w = blankPageSize?.width || 612;
        let h = blankPageSize?.height || 792;
        if (config.rotation % 180 === 90) [w, h] = [h, w];
        page = newDoc.addPage([w, h]);
      } else {
        const [copied] = await newDoc.copyPages(originalDoc, [config.originalIndex]);
        if (config.rotation !== 0) copied.setRotation(degrees(config.rotation));
        page = newDoc.addPage(copied);
      }

      ({ width: pageWidth, height: pageHeight } = page.getSize());

      const canvas = canvases.current[i];
      if (canvas && canvas.getObjects().length > 0) {
        const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 3 });
        const imgBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
        const img = await newDoc.embedPng(imgBytes);
        page.drawImage(img, { x: 0, y: 0, width: pageWidth, height: pageHeight });
      }
    }

    const savedBytes = await newDoc.save();
    // Fixed: Copy to new Uint8Array to ensure non-shared ArrayBuffer (satisfies strict Blob typings)
    const blob = new Blob([new Uint8Array(savedBytes)], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace(/\.pdf$/i, '_edited.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pdfjsDoc || pageConfigs.length === 0) {
    return <div className="flex min-h-screen items-center justify-center">Loading editor...</div>;
  }

  const Thumbnail = ({ index, config }: { index: number; config: PageConfig }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
      type: 'page',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'page',
      hover: (item: { index: number }) => {
        if (item.index !== index) {
          movePage(item.index, index);
          item.index = index;
        }
      },
    });

    drag(drop(ref));

    return (
      <div ref={ref} className={`relative mb-8 cursor-move ${isDragging ? 'opacity-50' : ''}`}>
        <canvas
          ref={(el) => {
            if (el) thumbnailCanvases.current[index] = el;
          }}
          className="border shadow-lg rounded"
        />
        <div className="absolute top-1 right-1 flex flex-col">
          <button onClick={() => rotatePage(index, 90)} className="bg-amber-600 text-white p-1 text-xs">↻</button>
          <button onClick={() => deletePage(index)} className="bg-red-600 text-white p-1 text-xs">×</button>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-amber-600 text-white p-4 flex justify-between">
          <button onClick={() => router.push('/')} className="bg-amber-800 px-4 py-2 rounded">← Back</button>
          <h1 className="text-xl font-bold">Editing: {pdfFile?.name}</h1>
          <div className="flex gap-4 items-center">
            <button onClick={handleDownload} className="bg-green-600 px-6 py-2 rounded">Download</button>
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}>-</button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => z + 0.2)}>+</button>
            </div>
          </div>
        </header>

        <div className="bg-amber-100 p-4 flex gap-4 overflow-x-auto">
          <button onClick={addBlankPage} className="bg-amber-700 text-white px-6 py-3 rounded">+ Blank Page</button>
          <button onClick={() => setSelectedTool('draw')} className={selectedTool === 'draw' ? 'bg-amber-600' : 'bg-amber-700'} text-white px-6 py-3 rounded>✏️ Draw</button>
          <button onClick={() => setSelectedTool('text')} className={selectedTool === 'text' ? 'bg-amber-600' : 'bg-amber-700'} text-white px-6 py-3 rounded>T Text</button>
          <button onClick={() => setSelectedTool('highlight')} className={selectedTool === 'highlight' ? 'bg-amber-600' : 'bg-amber-700'} text-white px-6 py-3 rounded>🖍️ Highlight</button>
          <button onClick={() => setSelectedTool('none')} className="bg-gray-600 text-white px-6 py-3 rounded">Select</button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Thumbnails sidebar - now rendered properly */}
          <div className="w-80 bg-white dark:bg-gray-800 overflow-y-auto p-6 border-r">
            {pageConfigs.map((config, i) => (
              <Thumbnail key={i} index={i} config={config} />
            ))}
          </div>

          {/* Main viewer */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto space-y-12">
              {pageConfigs.map((config, i) => (
                <div key={i} className="relative shadow-2xl bg-white inline-block">
                  <canvas
                    ref={(el) => {
                      if (el) baseCanvases.current[i] = el;
                    }}
                    className="block"
                  />
                  <canvas
                    id={`overlay-canvas-${i}`}
                    className="absolute top-0 left-0 pointer-events-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
