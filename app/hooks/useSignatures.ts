import { useState, useEffect } from "react";
import { getSignatures, saveSignature } from "@/app/lib/idb";

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
    saveSignature(next);
  };

  const deleteSig = (id: string) => {
    const next = sigs.filter((_, i) => i !== parseInt(id)); // simple index id
    setSigs(next);
    saveSignature(next);
  };

  return { sigs, addSig, deleteSig };
}
