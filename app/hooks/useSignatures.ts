"use client";
import { useState, useEffect } from "react";
import { saveSignatures, getSignatures } from "@/app/lib/idb";

export type Sig = {
  dataUrl: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export function useSignatures() {
  const [sigs, setSigs] = useState<Sig[]>([]);

  useEffect(() => {
    getSignatures().then(setSigs);
  }, []);

  const addSig = (s: Sig) => {
    const next = [...sigs, s];
    setSigs(next);
    saveSignatures(next); // ✅ uses the correct wrapper
  };

  const deleteSig = (id: string) => {
    const next = sigs.filter((_, i) => i !== parseInt(id));
    setSigs(next);
    saveSignatures(next);
  };

  return { sigs, addSig, deleteSig };
}
