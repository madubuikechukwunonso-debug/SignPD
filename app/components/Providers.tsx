"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // now we are on the client
  }, []);

  if (!mounted) return <>{children}</>; // server / hydration-safe

  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
