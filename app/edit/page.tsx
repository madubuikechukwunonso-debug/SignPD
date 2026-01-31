'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from '../context/PDFContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function EditPage() {
  const router = useRouter();
  const { pdfFile, pdfBytes, setPdfFile, setPdfBytes } = usePDF();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1.2);

  // Redirect if no PDF loaded (fallback protection)
  useEffect(() => {
    if (!pdfFile || !pdfBytes) {
      router.push('/');
    }
  }, [pdfFile, pdfBytes, router]);

  // LOCAL SELF-HOSTED WORKER (the only reliable fix)
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }, []);

  if (!pdfFile || !pdfBytes) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-950 dark:via-slate-900 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-8 border-amber-200 border-t-amber-600 mx-auto mb-8" />
          <p className="text-2xl font-medium text-gray-800 dark:text-white">Preparing editor...</p>
        </div>
      </div>
    );
  }

  const file = { data: pdfBytes };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {
    if (!pdfBytes || !pdfFile) return;

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace(/\.pdf$/i, '_edited.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    setPdfFile(null);
    setPdfBytes(null);
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-950 dark:via-slate-900 dark:to-black overflow-hidden">
      {/* Header - Amber gradient theme */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 flex items-center justify-between shadow-2xl">
        <button
          onClick={handleBack}
          className="px-5 py-2.5 bg-amber-800/80 rounded-lg hover:bg-amber-700 transition backdrop-blur-sm"
        >
          ← Back to Home
        </button>
        <h1 className="text-xl font-bold truncate max-w-md">
          Editing: {pdfFile.name}
        </h1>
        <div className="flex items-center gap-6">
          <button
            onClick={handleDownload}
            className="px-7 py-2.5 bg-green-600 rounded-lg hover:bg-green-500 transition font-medium"
          >
            Download PDF
          </button>
          <div className="flex items-center gap-3 bg-amber-700/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
              className="px-3 py-1 bg-amber-800 rounded hover:bg-amber-700 transition"
            >
              −
            </button>
            <span className="w-20 text-center font-medium">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => z + 0.2)}
              className="px-3 py-1 bg-amber-800 rounded hover:bg-amber-700 transition"
            >
              +
            </button>
          </div>
        </div>
      </header>

      {/* Tools Toolbar - Amber-themed placeholders */}
      <div className="bg-amber-100/80 dark:bg-gray-800 border-b border-amber-200 dark:border-gray-700 p-5 flex gap-5 overflow-x-auto shadow-md">
        <button className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-500 transition font-medium whitespace-nowrap shadow-lg">
          ✒️ Add Signature
        </button>
        <button className="px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-600 transition font-medium whitespace-nowrap shadow-lg">
          T Add Text
        </button>
        <button className="px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-600 transition font-medium whitespace-nowrap shadow-lg">
          ✏️ Free Draw
        </button>
        <button className="px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-600 transition font-medium whitespace-nowrap shadow-lg">
          🖍️ Highlight
        </button>
      </div>

      {/* Main content: Sidebar + Viewer */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail Sidebar */}
        <div className="w-80 bg-amber-50/90 dark:bg-gray-900 border-r border-amber-200 dark:border-gray-700 overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-5">
            Pages {numPages ? `(${numPages})` : ''}
          </h2>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={null}>
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={index + 1}
                className="mb-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  document
                    .getElementById(`main-page-${index + 1}`)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <div className="border-4 border-amber-300/50 rounded-xl overflow-hidden shadow-md bg-white">
                  <Page
                    pageNumber={index + 1}
                    width={200}
                  />
                </div>
                <p className="text-center text-lg font-medium mt-3 text-amber-900 dark:text-amber-400">
                  {index + 1}
                </p>
              </div>
            ))}
          </Document>
        </div>

        {/* Main Viewer */}
        <div className="flex-1 overflow-y-auto p-10">
          {numPages === null ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-20 w-20 border-8 border-amber-200 border-t-amber-600 mx-auto mb-6" />
                <p className="text-2xl font-medium text-amber-900 dark:text-amber-300">Loading PDF pages...</p>
              </div>
            </div>
          ) : (
            <Document file={file} loading={null}>
              {Array.from(new Array(numPages), (_, index) => (
                <div
                  key={index + 1}
                  id={`main-page-${index + 1}`}
                  className="mb-16 mx-auto max-w-5xl shadow-2xl bg-white rounded-2xl overflow-hidden border-4 border-amber-200/50"
                >
                  <Page
                    pageNumber={index + 1}
                    scale={zoom}
                  />
                </div>
              ))}
            </Document>
          )}
        </div>
      </div>

      {/* Decorative blobs (matching landing page) */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="hidden dark:block fixed top-20 left-20 w-96 h-96 bg-amber-800 rounded-full filter blur-3xl opacity-10 pointer-events-none" />
      <div className="hidden dark:block fixed bottom-20 right-20 w-80 h-80 bg-orange-900 rounded-full filter blur-3xl opacity-10 pointer-events-none" />
    </div>
  );
}
