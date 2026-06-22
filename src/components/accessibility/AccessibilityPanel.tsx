import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { TextSizePanel } from './panels/TextSizePanel';
import { TextSpacingPanel } from './panels/TextSpacingPanel';
import { ContrastPanel } from './panels/ContrastPanel';
import { ColorBlindnessPanel } from './panels/ColorBlindnessPanel';
import { ReadingFocusPanel } from './panels/ReadingFocusPanel';
import { CursorPanel } from './panels/CursorPanel';
import { KeyboardNavPanel } from './panels/KeyboardNavPanel';
import { MotionPanel } from './panels/MotionPanel';
import { MultimediaPanel } from './panels/MultimediaPanel';
import { CognitivePanel } from './panels/CognitivePanel';
import { LanguagePanel } from './panels/LanguagePanel';
import { ResetPanel } from './panels/ResetPanel';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <section
        ref={panelRef}
        aria-label="Panel de accesibilidad"
        className={`fixed top-0 z-[9999] h-screen transition-[right] duration-300 ease-in-out ${
          isOpen ? 'right-0' : 'right-[-100%]'
        }`}
      >
        <div className="flex h-full w-72 flex-col bg-surface-page shadow-xl sm:w-80 md:w-96">
          <div className="flex shrink-0 items-center justify-between border-b border-border-card px-5 py-4">
            <h2 className="text-lg font-semibold text-text-headings">
              Accesibilidad
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel de accesibilidad"
              className="flex items-center justify-center rounded-lg p-2 text-text-body transition hover:bg-surface-action-hover-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
            <div className="space-y-8">
              <TextSizePanel />
              <TextSpacingPanel />
              <ContrastPanel />
              <ColorBlindnessPanel />
              <ReadingFocusPanel />
              <CursorPanel />
              <KeyboardNavPanel />
              <MotionPanel />
              <MultimediaPanel />
              <CognitivePanel />
              <LanguagePanel />
              <ResetPanel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
