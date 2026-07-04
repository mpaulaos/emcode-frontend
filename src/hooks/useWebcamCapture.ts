import { useCallback, useRef, useState } from "react";
import type Webcam from "react-webcam";

export interface WebcamCaptureOptions {
  maxWidth?: number;
  maxHeight?: number;
  facingMode?: "user" | "environment";
}

export interface WebcamCaptureReturn {
  webcamRef: React.RefObject<Webcam | null>;
  lastCapture: string | null;
  capture: () => string | null;
  clearCapture: () => void;
}

export function useWebcamCapture(): WebcamCaptureReturn {
  const webcamRef = useRef<Webcam | null>(null);
  const [lastCapture, setLastCapture] = useState<string | null>(null);

  const capture = useCallback((): string | null => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return null;
    setLastCapture(imageSrc);
    return imageSrc;
  }, []);

  const clearCapture = useCallback(() => {
    setLastCapture(null);
  }, []);

  return {
    webcamRef,
    lastCapture,
    capture,
    clearCapture,
  };
}
