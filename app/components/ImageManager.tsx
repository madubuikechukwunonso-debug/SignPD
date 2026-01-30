"use client";

import { useCallback } from "react";
import { useImages } from "@/app/hooks/useImages";

export default function ImageManager({ page }: { page: number }) {
  const { addImage } = useImages();

  const onFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = new Blob([bytes], { type: file.type });
      const url = URL.createObjectURL(blob);

      addImage({
        page: page - 1,
        x: 150,
        y: 150,
        width: 200,
        height: 150,
        embedKey: url, // simplified; real code embeds via pdf-lib
        fileName: file.name,
      });
    },
    [page, addImage]
  );

  return (
    <label
      className="absolute bottom-4 left-48 bg-teal-600 text-white px-3 py-2 rounded-full shadow cursor-pointer text-sm"
      title="Replace / add image"
    >
      🖼 Replace
      <input type="file" accept="image/*" className="hidden" onChange={onFile} />
    </label>
  );
}
