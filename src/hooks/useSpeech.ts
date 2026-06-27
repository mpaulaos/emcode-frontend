import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeechState {
  isSpeaking: boolean;
  isPaused: boolean;
  activeCharIndex: number;
  currentText: string;
}

export interface SpeechControls {
  state: SpeechState;
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeakingText: (text: string) => boolean;
}

export function useSpeech(rate: number): SpeechControls {
  const [state, setState] = useState<SpeechState>({
    isSpeaking: false,
    isPaused: false,
    activeCharIndex: 0,
    currentText: "",
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  const getSpanishVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = synthRef.current?.getVoices() ?? [];
    const preferred = voices.find(
      (v) => v.lang === "es-MX" && !v.name.includes("Google"),
    );
    if (preferred) return preferred;
    const esEs = voices.find(
      (v) => v.lang.startsWith("es") && !v.name.includes("Google"),
    );
    if (esEs) return esEs;
    const anySpanish = voices.find((v) => v.lang.startsWith("es"));
    if (anySpanish) return anySpanish;
    return voices[0] ?? null;
  }, []);

  const speak = useCallback(
    (text: string) => {
      const synth = synthRef.current;
      if (!synth) return;

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es";
      utterance.rate = rate;

      const voice = getSpanishVoice();
      if (voice) utterance.voice = voice;

      utterance.onboundary = (e) => {
        if (e.name === "word") {
          setState((prev) => ({ ...prev, activeCharIndex: e.charIndex }));
        }
      };

      utterance.onstart = () => {
        setState({
          isSpeaking: true,
          isPaused: false,
          activeCharIndex: 0,
          currentText: text,
        });
      };

      utterance.onend = () => {
        setState({
          isSpeaking: false,
          isPaused: false,
          activeCharIndex: 0,
          currentText: "",
        });
      };

      utterance.onerror = () => {
        setState({
          isSpeaking: false,
          isPaused: false,
          activeCharIndex: 0,
          currentText: "",
        });
      };

      utterance.onpause = () => {
        setState((prev) => ({ ...prev, isPaused: true }));
      };

      utterance.onresume = () => {
        setState((prev) => ({ ...prev, isPaused: false }));
      };

      utteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [rate, getSpanishVoice],
  );

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setState({
      isSpeaking: false,
      isPaused: false,
      activeCharIndex: 0,
      currentText: "",
    });
  }, []);

  const pause = useCallback(() => {
    synthRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    synthRef.current?.resume();
  }, []);

  const isSpeakingText = useCallback(
    (text: string) => state.isSpeaking && state.currentText === text,
    [state.isSpeaking, state.currentText],
  );

  return { state, speak, stop, pause, resume, isSpeakingText };
}
