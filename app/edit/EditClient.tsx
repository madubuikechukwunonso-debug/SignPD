"use client";

import { motion } from "framer-motion";
import PdfViewer from "@/app/components/PdfViewer";
import Toolbar from "@/app/components/Toolbar";
import DownloadBtn from "@/app/components/DownloadBtn";
import PageControls from "@/app/components/PageControls";
import PageThumbnails from "@/app/components/PageThumbnails";
import { usePages } from "@/app/hooks/usePages";

export default function EditClient() {
  const { pages } = usePages();
  if (!pages.length) return null; // client-side only

  return (
    <>
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-6"
      >
        SignPD Editor
      </motion.h1>

      <Toolbar />
      <PageControls />
      <PageThumbnails />
      <PdfViewer />
      <DownloadBtn />
    </>
  );
}
