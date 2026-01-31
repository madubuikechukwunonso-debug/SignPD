'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type PDFContextType = {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  pdfBytes: Uint8Array | null;
  setPdfBytes: (bytes: Uint8Array | null) => void;
};

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider = ({ children }: { children: ReactNode }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

  return (
    <PDFContext.Provider value={{ pdfFile, setPdfFile, pdfBytes, setPdfBytes }}>
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
