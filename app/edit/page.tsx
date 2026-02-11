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

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }, []);

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
        .catch((err) => console.error('pdfjs load error:', err));
    }
  }, [originalBytes]);

  // Auto-fit zoom with caps and tighter fit
  useEffect(() => {
    if (!pdfjsDoc || pageConfigs.length === 0 || !viewerRef.current) return;

    const calculateFitZoom = async () => {
      try {
        const page = await pdfjsDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const containerWidth = viewerRef.current!.clientWidth;
        const newZoom = (containerWidth * 0.85) / viewport.width;
        setZoom(Math.min(1.5, Math.max(0.8, newZoom)));
      } catch (err) {
        setZoom(1.2);
      }
    };

    calculateFitZoom();
    const observer = new ResizeObserver(calculateFitZoom);
    observer.observe(viewerRef.current);
    return () => observer.disconnect();
  }, [pdfjsDoc, pageConfigs.length]);

  // Truncate refs on delete
  useEffect(() => {
    baseCanvases.current.length = pageConfigs.length;
    thumbnailCanvases.current.length = pageConfigs.length;
    canvases.current.length = pageConfigs.length;
  }, [pageConfigs.length]);

  // Function to apply current tool to a single canvas
  const applyToolToCanvas = (c: fabric.Canvas) => {
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
      c.freeDrawingBrush.color = 'rgba(255, 255, 0, 0.4)';
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
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: 10,
        });
        c.add(text);
        c.setActiveObject(text);
        text.enterEditing();
        c.renderAll();
      });
    }
    c.renderAll();
  };

  // Apply tool when it changes
  useEffect(() => {
    canvases.current.forEach((c) => c && applyToolToCanvas(c));
  }, [selectedTool]);

  // Keyboard delete
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

  // Render bases + robust overlay init and resize
  const renderAllBases = async () => {
    for (let i = 0; i < pageConfigs.length; i++) {
      const config = pageConfigs[i];
      const baseCanvas = baseCanvases.current[i];
      if (!baseCanvas || !pdfjsDoc) continue;

      const context = baseCanvas.getContext('2d');
      if (!context) continue;

      try {
        let viewport;
        if (config.type === 'original') {
          const page = await pdfjsDoc.getPage(config.originalIndex + 1);
          viewport = page.getViewport({ scale: zoom, rotation: config.rotation });
        } else {
          let width = (blankPageSize?.width || 612) * zoom;
          let height = (blankPageSize?.height || 792) * zoom;
          if (config.rotation % 180 === 90) [width, height] = [height, width];
          viewport = { width, height };
        }

        baseCanvas.width = viewport.width;
        baseCanvas.height = viewport.height;

        if (config.type === 'original') {
          const page = await pdfjsDoc.getPage(config.originalIndex + 1);
          await page.render({ canvasContext: context, viewport }).promise;
        } else {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, viewport.width, viewport.height);
        }

        // Overlay handling
        const overlayCanvas = document.getElementById(`overlay-canvas-${i}`) as HTMLCanvasElement;
        if (overlayCanvas) {
          overlayCanvas.width = baseCanvas.width;
          overlayCanvas.height = baseCanvas.height;

          // Initialize fabric canvas if not exists (robust against timing issues)
          if (!canvases.current[i]) {
            const fCanvas = new fabric.Canvas(overlayCanvas, {
              backgroundColor: 'transparent',
              selection: true,
              preserveObjectStacking: true,
            });
            canvases.current[i] = fCanvas;
            applyToolToCanvas(fCanvas); // Apply current tool immediately
          } else {
            canvases.current[i].setDimensions({ width: baseCanvas.width, height: baseCanvas.height });
            canvases.current[i].renderAll();
          }
        }
      } catch (err) {
        console.error(`Render error page ${i + 1}:`, err);
      }
    }
  };

  const renderThumbnails = async () => {
    // ... (keep your existing thumbnail render logic unchanged)
    if (!pdfjsDoc) return;
    const targetWidth = 150;
    for (let i = 0; i < pageConfigs.length; i++) {
      // ... existing thumbnail code
    }
  };

  useEffect(() => {
    if (pdfjsDoc && pageConfigs.length > 0) {
      renderAllBases();
      renderThumbnails();
    }
  }, [pdfjsDoc, pageConfigs, zoom]);

  // Page operations (unchanged)
  const addBlankPage = () => setPageConfigs([...pageConfigs, { type: 'blank', rotation: 0 }]);
  const deletePage = (index: number) => {
    canvases.current[index]?.dispose();
    canvases.current.splice(index, 1);
    setPageConfigs(pageConfigs.filter((_, i) => i !== index));
  };
  const rotatePage = (index: number) => {
    setPageConfigs(pageConfigs.map((c, i) => i === index ? { ...c, rotation: (c.rotation + 90) % 360 } : c));
  };
  const movePage = (dragIndex: number, hoverIndex: number) => {
    // ... existing move logic
  };
  const handleDownload = async () => {
    // ... existing download logic
  };

  if (!pdfjsDoc || pageConfigs.length === 0) {
    return <div className="flex min-h-screen items-center justify-center text-xl">Loading...</div>;
  }

  const Thumbnail = /* your existing Thumbnail component */;

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 p-4 flex flex-wrap items-center gap-4 border-b">
        <div className="flex gap-3">
          <button onClick={() => setSelectedTool('none')} className={`px-4 py-2 rounded ${selectedTool === 'none' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Select/Move</button>
          <button onClick={() => setSelectedTool('draw')} className={`px-4 py-2 rounded ${selectedTool === 'draw' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Draw/Signature</button>
          <button onClick={() => setSelectedTool('highlight')} className={`px-4 py-2 rounded ${selectedTool === 'highlight' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Highlight</button>
          <button onClick={() => setSelectedTool('text')} className={`px-4 py-2 rounded ${selectedTool === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Add Text</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="px-3 py-2 bg-gray-200 rounded">-</button>
          <span className="w-20 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => z + 0.1)} className="px-3 py-2 bg-gray-200 rounded">+</button>
          <button onClick={() => setZoom(1)} className="px-3 py-2 bg-gray-200 rounded">100%</button>
        </div>
        <div className="ml-auto flex gap-4">
          <button onClick={addBlankPage} className="px-5 py-2 bg-indigo-600 text-white rounded">Add Blank Page</button>
          <button onClick={handleDownload} className="px-6 py-2 bg-green-600 text-white rounded">Save & Download</button>
        </div>
      </div>

      <div className="flex h-screen pt-20 bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 overflow-y-auto p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Pages</h2>
          {pageConfigs.map((config, i) => <Thumbnail key={i} index={i} config={config} />)}
        </div>

        {/* Viewer */}
        <div ref={viewerRef} className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto py-8">
            {pageConfigs.map((config, i) => (
              <div key={i} className="relative shadow-2xl my-12 bg-white mx-auto">
                <canvas ref={el => el && (baseCanvases.current[i] = el)} className="block pointer-events-none" />
                <canvas id={`overlay-canvas-${i}`} className="absolute inset-0 pointer-events-auto" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition bg-white rounded shadow">
                  <button onClick={() => rotatePage(i)} className="p-2 text-blue-600">↻</button>
                  <button onClick={() => deletePage(i)} className="p-2 text-red-600">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
