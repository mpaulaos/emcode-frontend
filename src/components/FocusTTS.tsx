import { useRef, type ReactNode } from "react";
import { useAccessibility } from "../hooks/useAccessibility";
import { useSpeechContext } from "../context/SpeechContext";

interface FocusTTSProps {
  readonly text: string;
  readonly children: ReactNode;
}

function FocusTTS({ text, children }: FocusTTSProps) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasRead = useRef(false);

  if (!settings.ttsEnabled) return <>{children}</>;

  function handleFocus(e: React.FocusEvent) {
    if (!wrapperRef.current?.contains(e.target as Node)) return;

    const tag = (e.target as HTMLElement).tagName;
    if (["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(tag)) return;

    if (!hasRead.current) {
      hasRead.current = true;
      stop();
      speak(text);
    }
  }

  function handleBlur(e: React.FocusEvent) {
    const related = e.relatedTarget as Node | null;
    if (wrapperRef.current && !wrapperRef.current.contains(related)) {
      hasRead.current = false;
    }
  }

  function handleClick() {
    hasRead.current = true;
    stop();
    speak(text);
  }

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      role="region"
      aria-label={text}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default FocusTTS;
