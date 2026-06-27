import { createContext, useContext } from "react";
import { useSpeech, type SpeechControls } from "../hooks/useSpeech";
import { useAccessibility } from "../hooks/useAccessibility";

const SpeechCtx = createContext<SpeechControls | null>(null);

export function SpeechProvider({ children }: { readonly children: React.ReactNode }) {
  const { settings } = useAccessibility();
  const controls = useSpeech(settings.ttsRate);

  return (
    <SpeechCtx.Provider value={controls}>
      {children}
    </SpeechCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSpeechContext(): SpeechControls {
  const ctx = useContext(SpeechCtx);
  if (!ctx) {
    throw new Error("useSpeechContext debe usarse dentro de un SpeechProvider");
  }
  return ctx;
}
