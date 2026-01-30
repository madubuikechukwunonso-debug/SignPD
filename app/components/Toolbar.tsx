"use client";

import { motion } from "framer-motion";
import ColorPicker from "./ui/ColorPicker";
import PenPicker from "./ui/PenPicker";
import StampPicker from "./ui/StampPicker";
import { STAMP_LIST } from "@/app/lib/constants";

export default function Toolbar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-2xl bg-white/10 backdrop-blur border border-white/20 shadow-lg"
    >
      <span className="text-sm text-white/80">Tools:</span>

      <ColorPicker />
      <PenPicker />
      <StampPicker stamps={STAMP_LIST} />

      <div className="ml-auto text-xs text-white/60">
        Auto-saving every change
      </div>
    </motion.div>
  );
}
