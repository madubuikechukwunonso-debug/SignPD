"use client";

import { forwardRef } from "react";
import SignatureCanvasLib from "react-signature-canvas";

/* ------------------------------------------------------------------ */
/* Force react-signature-canvas into a valid JSX component             */
/* ------------------------------------------------------------------ */

// Hide the broken class typing from TypeScript completely
const SignatureCanvas =
  SignatureCanvasLib as unknown as React.FC<any>;

/* ------------------------------------------------------------------ */
/* Public handle type                                                  */
/* ------------------------------------------------------------------ */

export type SignaturePadHandle = {
  clear: () => void;
  toDataURL: (type?: string) => string;
  isEmpty: () => boolean;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

const SignaturePad = forwardRef<SignaturePadHandle, any>(
  (props, ref) => {
    return <SignatureCanvas ref={ref} {...props} />;
  }
);

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
