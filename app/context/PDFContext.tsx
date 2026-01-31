'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PDFDocument } from 'pdf-lib';
import { savePdfToIdb } from '@/app/lib/idb'; // Keep your existing path

type PDFContextType = {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  pdfBytes: Uint8Array | null;
  setPdfBytes: (bytes: Uint8Array | null) => void;
  pdfDoc: PDFDocument | null; // For future editing with pdf-lib
  setPdfDoc: (doc: PDFDocument | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
  isLoading: boolean;
  error: string | null;
  loadPdf: (file: File) => Promise<void>;
};

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider = ({ children }: { children: ReactNode }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [fileName, setFileName] = useState('edited.pdf');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPdf = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      setPdfFile(file);

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const doc = await PDFDocument.load(bytes);

      setPdfBytes(bytes);
      setPdfDoc(doc);
      setFileName(file.name.replace(/\.pdf$/i, '-signed.pdf'));
      await savePdfToIdb(bytes);
    } catch (err: any) {
      let message = 'Failed to load PDF. It may be corrupted or invalid.';
      if (err.message?.toLowerCase().includes('password')) {
        message = 'Password-protected PDFs are not supported.';
      }
      setError(message);
      console.error('PDF load error:', err);

      // Reset state on failure
      setPdfFile(null);
      setPdfBytes(null);
      setPdfDoc(null);
      setFileName('edited.pdf');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PDFContext.Provider
      value={{
        pdfFile,
        setPdfFile,
        pdfBytes,
        setPdfBytes,
        pdfDoc,
        setPdfDoc,
        fileName,
        setFileName,
        isLoading,
        error,
        loadPdf,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};

export const usePDF = () => {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error('usePDF must be used within a PDFProvider');
  }
  return context;
};
