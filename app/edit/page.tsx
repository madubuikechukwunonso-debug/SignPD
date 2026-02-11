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
  const [zoom, setZoom] = useState(1.0);
  const [selectedTool, setSelectedTool] = useState<'none' | 'draw' | 'text' | 'highlight'>('none');

  const canvases = useRef<fabric.Canvas[]>([]);
  const baseCanvases = useRef<HTMLCanvasElement[]>([]);
  const thumbnailCanvases = useRef<HTMLCanvasElement[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);

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

  // Auto fit-to-width on load and resize - MODIFIED: capped max zoom, tighter fit
  useEffect(() => {
    if (!pdfjsDoc || pageConfigs.length === 0 || !viewerRef.current) return;

    const calculateFitZoom = async () => {
      try {
        const page = await pdfjsDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const containerWidth = viewerRef.current!.clientWidth;
        const newZoom = (containerWidth * 0.85) / viewport.width; // Tighter fit
        setZoom(Math.min(1.5, Math.max(0.8, newZoom))); // Cap at 1.5x, min 0.8x
      } catch (err) {
        console.error('Fit zoom calculation error:', err);
        setZoom(1.2);
      }
    };

    calculateFitZoom();

    const observer = new ResizeObserver(calculateFitZoom);
    observer.observe(viewerRef.current);

    return () => observer.disconnect();
  }, [pdfjsDoc, pageConfigs.length]);

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
          selection: true,
          preserveObjectStacking: true,
        });
        canvases.current[i] = fCanvas;
      }
    });

    return () => {
      canvases.current.forEach((c) => c?.dispose());
      canvases.current = [];
    };
  }, [pageConfigs.length]);

  // Apply selected tool
  useEffect(() => {
    canvases.current.forEach((c) => {
      if (!c) return;

      c.isDrawingMode = false;
      c.defaultCursor = 'default';
      c.off('mouse:down');

      if (selectedTool === 'draw') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.color = '#000000';
        c.freeDrawingBrush.width = 5;
      } else if (selectedTool === 'highlight') {
        c.isDrawingMode = true;
        c.freeDrawingBrush = new fabric.PencilBrush(c);
        c.freeDrawingBrush.color = 'rgba(255,255,0,0.4)';
        c.freeDrawingBrush.width = 30;
      } else if (selectedTool === 'text') {
        c.defaultCursor = 'text';
        c.on('mouse:down', (opt) => {
          if (opt.target) return;
          const pointer = c.getPointer(opt.e);
          const text = new fabric.Textbox('Edit text...', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 24,
            width: 300,
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: 10,
          });
          c.add(text);
          c.setActiveObject(text);
          text.enterEditing();
          c.renderAll();
        });
      }

      c.renderAll();
    });
  }, [selectedTool, pageConfigs.length]);

  // Keyboard delete for selected objects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        canvases.current.forEach((c) => {
          if (c) {
            const active = c.getActiveObject();
            if (active) {
              c.remove(active);
              c.renderAll();
            }
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Render functions
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

          await page.render({ canvasContext: context, viewport }).promise;
        } else {
          let width = (blankPageSize?.width || 612) * zoom;
          let height = (blankPageSize?.height || 792) * zoom;
          if (config.rotation % 180 === 90) [width, height] = [height, width];

          baseCanvas.width = width;
          baseCanvas.height = height;
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, width, height);
        }

        const overlayCanvas = document.getElementById(`overlay-canvas-${i}`) as HTMLCanvasElement;
        if (overlayCanvas && canvases.current[i]) {
          overlayCanvas.width = baseCanvas.width;
          overlayCanvas.height = baseCanvas.height;
          canvases.current[i].setDimensions({ width: baseCanvas.width, height: baseCanvas.height });
          canvases.current[i].renderAll();
        }
      } catch (err) {
        console.error(`Failed to render page ${i + 1}:`, err);
      }
    }
  };

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

  const rotatePage = (index: number, amount: number = 90) => {
    setPageConfigs(pageConfigs.map((c, i) => 
      i === index ? { ...c, rotation: (c.rotation + amount) % 360 } : c
    ));
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
    newCanvases.splice(hoverIndex, 0, draggedCanvas || null);
    canvases.current = newCanvases;
  };

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
    const blob = new Blob([new Uint8Array(savedBytes)], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace(/\.pdf$/i, '_edited.pdf');
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pdfjsDoc || pageConfigs.length === 0) {
    return <div className="flex min-h-screen items-center justify-center text-xl">Loading editor...</div>;
  }

  // Thumbnail component with drag & drop
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
      <div
        ref={ref}
        className={`mb-4 cursor-move bg-white shadow-md rounded overflow-hidden ${isDragging ? 'opacity-50' : ''}`}
      >
        <canvas
          ref={(el) => {
            if (el) thumbnailCanvases.current[index] = el;
          }}
          className="block w-full"
        />
        <div className="p-2 flex justify-between text-sm">
          <span>Page {index + 1}</span>
          <div className="flex gap-2">
            <button onClick={() => rotatePage(index)} className="text-blue-600 hover:underline">Rotate</button>
            <button onClick={() => deletePage(index)} className="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Fixed toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 p-4 flex flex-wrap items-center gap-4 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedTool('none')}
            className={`px-4 py-2 rounded ${selectedTool === 'none' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Select
          </button>
          <button
            onClick={() => setSelectedTool('draw')}
            className={`px-4 py-2 rounded ${selectedTool === 'draw' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Draw (Signature)
          </button>
          <button
            onClick={() => setSelectedTool('highlight')}
            className={`px-4 py-2 rounded ${selectedTool === 'highlight' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Highlight
          </button>
          <button
            onClick={() => setSelectedTool('text')}
            className={`px-4 py-2 rounded ${selectedTool === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Text
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))} className="px-3 py-2 bg-gray-200 rounded">-</button>
          <span className="w-20 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => z + 0.1)} className="px-3 py-2 bg-gray-200 rounded">+</button>
          <button onClick={() => setZoom(1)} className="px-3 py-2 bg-gray-200 rounded text-sm">100%</button>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button onClick={addBlankPage} className="px-5 py-2 bg-indigo-600 text-white rounded">
            Add Blank Page
          </button>
          <button onClick={handleDownload} className="px-6 py-2 bg-green-600 text-white rounded">
            Save & Download
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex h-screen pt-20 bg-gray-100">
        {/* Sidebar thumbnails */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800 overflow-y-auto p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Pages</h2>
          {pageConfigs.map((config, index) => (
            <Thumbnail key={index} index={index} config={config} />
          ))}
        </div>

        {/* Main viewer */}
        <div ref={viewerRef} className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto py-8 px-4">
            {pageConfigs.map((config, i) => (
              <div key={i} className="relative shadow-2xl my-12 bg-white mx-auto inline-block">
                <canvas
                  ref={(el) => {
                    if (el) baseCanvases.current[i] = el;
                  }}
                  className="block pointer-events-none"
                />
                <canvas
                  id={`overlay-canvas-${i}`}
                  className="absolute inset-0 pointer-events-auto"
                />
                {/* Per-page controls overlay */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity bg-white rounded shadow">
                  <button onClick={() => rotatePage(i)} className="p-2 text-blue-600 hover:bg-gray-100">↻ Rotate</button>
                  <button onClick={() => deletePage(i)} className="p-2 text-red-600 hover:bg-gray-100">✕ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
