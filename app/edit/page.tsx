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

  // Redirect if no PDF loaded
  useEffect(() => {
    if (!pdfFile || !pdfBytes) {
      router.push('/');
    }
  }, [pdfFile, pdfBytes, router]);

  // Set PDF.js worker (required for react-pdf)
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  }, []);

  if (!pdfFile || !pdfBytes) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Redirecting...</p>
      </div>
    );
  }

  const file = { data: pdfBytes }; // Uint8Array → react-pdf supports this directly

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {
    if (!pdfBytes || !pdfFile) return;

    // Use .buffer to get a clean ArrayBuffer (fixes TS error)
    const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace(/\.pdf$/i, '_edited.pdf');

    // Append to DOM for better compatibility
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    // Optional: clear context to free memory
    setPdfFile(null);
    setPdfBytes(null);
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold truncate max-w-md">
          Editing: {pdfFile.name}
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-green-600 rounded hover:bg-green-500 transition"
          >
            Download
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              −
            </button>
            <span className="w-16 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => z + 0.2)}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </div>
      </header>

      {/* Tools Toolbar (placeholders for future features) */}
      <div className="bg-gray-200 border-b border-gray-300 p-4 flex gap-4 overflow-x-auto">
        <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 whitespace-nowrap">
          ✒️ Add Signature
        </button>
        <button className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 whitespace-nowrap">
          T Add Text
        </button>
        <button className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 whitespace-nowrap">
          ✏️ Draw
        </button>
        <button className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 whitespace-nowrap">
          🖍️ Highlight
        </button>
      </div>

      {/* Main content: Sidebar + Viewer */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail Sidebar */}
        <div className="w-80 bg-gray-100 border-r border-gray-300 overflow-y-auto p-4">
          <h2 className="text-lg font-medium mb-3">Pages {numPages ? `(${numPages})` : ''}</h2>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={null}>
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={index + 1}
                className="mb-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  document
                    .getElementById(`main-page-${index + 1}`)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <Page
                  pageNumber={index + 1}
                  width={200}
                  className="border border-gray-300 shadow-sm"
                />
                <p className="text-center text-sm mt-2 text-gray-600">{index + 1}</p>
              </div>
            ))}
          </Document>
        </div>

        {/* Main Viewer */}
        <div className="flex-1 overflow-y-auto p-8">
          {numPages === null ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-600">Loading PDF...</p>
            </div>
          ) : (
            <Document file={file} loading={null}>
              {Array.from(new Array(numPages), (_, index) => (
                <div
                  key={index + 1}
                  id={`main-page-${index + 1}`}
                  className="mb-12 mx-auto max-w-4xl shadow-2xl bg-white"
                >
                  <Page
                    pageNumber={index + 1}
                    scale={zoom}
                    className="border border-gray-200"
                  />
                </div>
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
