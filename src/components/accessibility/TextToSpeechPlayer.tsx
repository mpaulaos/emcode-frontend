import { Play, Pause, Square, X } from "lucide-react";
import { useSpeechContext } from "../../context/SpeechContext";
import { Toolbar } from "../Toolbar";

export function TextToSpeechPlayer() {
  const { state, stop, pause, resume } = useSpeechContext();

  if (!state.isSpeaking) return null;

  const progress =
    state.currentText.length > 0
      ? (state.activeCharIndex / state.currentText.length) * 100
      : 0;

  const snippet = state.currentText.slice(
    Math.max(0, state.activeCharIndex - 20),
    state.activeCharIndex + 60,
  ) || (state.currentText.length > 80
    ? state.currentText.slice(0, 80) + "..."
    : state.currentText);

  return (
    <div
      className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-xl px-4 motion-safe:animate-slide-up"
    >
      <div
        className="flex items-center gap-3 rounded-xxl border border-primary-200 bg-primary-50 p-3 shadow-lg dark:border-primary-800 dark:bg-primary-950 w-full min-w-0"
        role="status"
      >
      <Toolbar orientation="horizontal" className="flex items-center gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={state.isPaused ? resume : pause}
          aria-label={state.isPaused ? "Reanudar" : "Pausar"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white transition hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          {state.isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
        <button
          type="button"
          onClick={stop}
          aria-label="Detener"
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          <Square size={12} />
        </button>
      </Toolbar>
      <div className="flex flex-1 flex-col gap-1 overflow-hidden min-w-0">
        <div className="h-1 w-full overflow-hidden rounded-full bg-border-card">
          <div
            className="h-full rounded-full bg-primary-700 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="truncate text-xs text-text-body w-full block">{snippet}</p>
      </div>

      <button
        type="button"
        onClick={stop}
        aria-label="Cerrar reproductor"
        className="flex h-6 w-6 items-center justify-center rounded-full text-text-disabled transition hover:bg-surface-card hover:text-text-body focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer flex-shrink-0"
      >
        <X size={12} />
      </button>
      </div>
    </div>
  );
}
