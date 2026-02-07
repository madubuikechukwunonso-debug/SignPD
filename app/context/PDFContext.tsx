'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PDFDocument } from 'pdf-lib';

type PDFContextType = {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  originalBytes: Uint8Array | null;
  setOriginalBytes: (bytes: Uint8Array | null) => void;
  originalDoc: PDFDocument | null;
  setOriginalDoc: (doc: PDFDocument | null) => void;
  blankPageSize: { width: number; height: number } | null;
  setBlankPageSize: (size: { width: number; height: number } | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
  isLoading: boolean;
  error: string | null;
  loadPdf: (file: File) => Promise<void>;
};

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider = ({ children }: { children: ReactNode }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [originalBytes, setOriginalBytes] = useState<Uint8Array | null>(null);
  const [originalDoc, setOriginalDoc] = useState<PDFDocument | null>(null);
  const [blankPageSize, setBlankPageSize] = useState<{ width: number; height: number } | null>(null);
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

      const firstPage = doc.getPages()[0];
      const size = firstPage ? firstPage.getSize() : { width: 612, height: 792 }; // Fallback A4

      setOriginalBytes(bytes);
      setOriginalDoc(doc);
      setBlankPageSize(size);
      setFileName(file.name.replace(/\.pdf$/i, '-signed.pdf'));
    } catch (err: any) {
      let message = 'Failed to load PDF. It may be corrupted or invalid.';
      if (err.message?.toLowerCase().includes('password')) {
        message = 'Password-protected PDFs are not supported.';
      }
      setError(message);
      console.error('PDF load error:', err);

      setPdfFile(null);
      setOriginalBytes(null);
      setOriginalDoc(null);
      setBlankPageSize(null);
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
        originalBytes,
        setOriginalBytes,
        originalDoc,
        setOriginalDoc,
        blankPageSize,
        setBlankPageSize,
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
