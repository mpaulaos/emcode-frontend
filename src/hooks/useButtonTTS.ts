import { useCallback } from "react";
import { useAccessibility } from "./useAccessibility";
import { useSpeechContext } from "../context/SpeechContext";

export function useButtonTTS(text: string) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();
  const onFocus = useCallback(() => {
    if (settings.ttsEnabled) {
      stop();
      speak(text);
    }
  }, [settings.ttsEnabled, text, stop, speak]);
  return { onFocus };
}
