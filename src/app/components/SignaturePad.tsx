"use client";

import { forwardRef } from "react";
import SignatureCanvas from "react-signature-canvas";

/**
 * react-signature-canvas has incorrect TypeScript typings.
 * This wrapper fixes JSX + ref support safely.
 */

export type SignaturePadHandle = SignatureCanvas;
export type SignaturePadProps = {
  canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
};

const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(
  ({ canvasProps }, ref) => {
    return (
      <SignatureCanvas
        ref={ref as unknown as React.Ref<SignatureCanvas>}
        canvasProps={canvasProps}
      />
    );
  }
);

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
