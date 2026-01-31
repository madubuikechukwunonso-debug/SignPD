"use client";
import { useState, useEffect } from "react";
import { getImages, saveImages } from "@/app/lib/idb";

export type PdfImage = {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  embedKey: string; // key in pdf-lib embed map
  fileName?: string;
};

export function useImages() {
  const [images, setImages] = useState<PdfImage[]>([]);

  useEffect(() => {
    getImages().then(setImages);
  }, []);

  const addImage = (img: Omit<PdfImage, "id">) => {
    const next = [...images, { ...img, id: crypto.randomUUID() }];
    setImages(next);
    saveImages(next);
  };

  const deleteImage = (id: string) => {
    const next = images.filter((i) => i.id !== id);
    setImages(next);
    saveImages(next);
  };

  return { images, addImage, deleteImage };
}
