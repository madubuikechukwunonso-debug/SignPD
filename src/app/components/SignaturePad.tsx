"use client";

import React, { forwardRef } from "react";
import SignatureCanvas from "react-signature-canvas";

/**
 * Typed wrapper for react-signature-canvas.
 *
 * WHY THIS EXISTS:
 * - react-signature-canvas ships broken TypeScript typings
 * - It is not recognized as a valid JSX component
 * - ref and canvasProps break TS builds
 *
 * This wrapper normalizes the component so:
 * - JSX works
 * - refs work
 * - strict TS builds pass
 */
const SignaturePad = forwardRef<any, any>((props, ref) => {
  return <SignatureCanvas ref={ref} {...props} />;
});

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
