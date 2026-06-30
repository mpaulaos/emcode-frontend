import { useRef, type ReactNode } from "react";
import { useAccessibility } from "../hooks/useAccessibility";
import { useSpeechContext } from "../context/SpeechContext";

interface FocusTTSProps {
  readonly text?: string;
  readonly children: ReactNode;
  readonly focusable?: boolean;
}

function FocusTTS({ text, children, focusable = true }: FocusTTSProps) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasRead = useRef(false);

  if (!settings.ttsEnabled) return <>{children}</>;

  const INTERACTIVE = ["INPUT", "BUTTON", "SELECT", "TEXTAREA", "A"];

  function getText(): string {
    if (text) return text;
    return wrapperRef.current?.innerText?.trim() ?? "";
  }

  function getElementLabel(el: HTMLElement): string {
    const aria = el.getAttribute("aria-label");
    if (aria) return aria;

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
      const id = el.id;
      if (id) {
        const labelEl = document.querySelector(`label[for="${id}"]`);
        if (labelEl) return labelEl.textContent?.trim() || "";
      }
      const parentLabel = el.closest("label");
      if (parentLabel) return parentLabel.textContent?.trim() || "";
      if ("placeholder" in el && el.placeholder) return el.placeholder;
    }

    return el.textContent?.trim() || "";
  }

  function handleFocus(e: React.FocusEvent) {
    if (!wrapperRef.current?.contains(e.target as Node)) return;

    const target = e.target as HTMLElement;

    if (INTERACTIVE.includes(target.tagName)) {
      const label = getElementLabel(target);
      if (label) {
        stop();
        speak(label);
      }
      return;
    }

    if (!hasRead.current) {
      hasRead.current = true;
      stop();
      speak(getText());
    }
  }

  function handleBlur(e: React.FocusEvent) {
    const related = e.relatedTarget as Node | null;
    if (wrapperRef.current && !wrapperRef.current.contains(related)) {
      hasRead.current = false;
    }
  }

  function handleClick(e: React.MouseEvent) {
    if (INTERACTIVE.includes((e.target as HTMLElement).tagName)) return;
    hasRead.current = true;
    stop();
    speak(getText());
  }

  return (
    <div
      ref={wrapperRef}
      tabIndex={focusable ? 0 : -1}
      role="region"
      aria-label={text ? text.slice(0, 120) : "Contenido de la página"}
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
