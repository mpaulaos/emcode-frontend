import { Button } from "react-aria-components";

interface SlidePaginationProps {
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
  label?: string;
  onComplete?: () => void;
  completeLabel?: string;
  completing?: boolean;
}

const btnBase =
  "rounded-lg px-4 py-2 text-sm font-semibold transition cursor-pointer " +
  "focus:outline-none data-focus-visible:ring-2 data-focus-visible:ring-border-focus " +
  "data-disabled:cursor-not-allowed data-disabled:opacity-40";

function SlidePagination({
  currentIndex,
  totalSlides,
  onPrevious,
  onNext,
  onSlideChange,
  label = "Slide",
  onComplete,
  completeLabel = "Terminar",
  completing = false,
}: SlidePaginationProps) {
  const safeTotal = Math.max(totalSlides, 1);
  const isLastSlide = currentIndex >= totalSlides - 1;

  return (
    <nav
      aria-label="Paginación de slides"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <Button
        isDisabled={currentIndex <= 0}
        onPress={onPrevious}
        className={`${btnBase} border-2 border-border-card bg-transparent text-text-body data-hovered:bg-surface-card`}
      >
        Anterior
      </Button>

      <div className="flex items-center gap-2 text-sm text-text-body">
        <label htmlFor="slide-page-select" className="sr-only">
          {label} actual
        </label>
        <select
          id="slide-page-select"
          value={currentIndex + 1}
          onChange={(e) => onSlideChange(Number(e.target.value) - 1)}
          className="rounded-lg border border-border-card bg-surface-page px-2 py-1.5 text-sm text-text-body focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {Array.from({ length: safeTotal }, (_, i) => i + 1).map((p) => (
            <option key={p} value={p}>
              {String(p).padStart(2, "0")}
            </option>
          ))}
        </select>
        <span>De {safeTotal}</span>
      </div>

      {isLastSlide && onComplete ? (
        <Button
          isDisabled={completing}
          onPress={onComplete}
          className={`${btnBase} bg-primary text-text-on-action data-hovered:bg-surface-action-hover`}
        >
          {completing ? "Enviando..." : completeLabel}
        </Button>
      ) : (
        <Button
          isDisabled={currentIndex >= totalSlides - 1}
          onPress={onNext}
          className={`${btnBase} bg-primary text-text-on-action data-hovered:bg-surface-action-hover`}
        >
          Siguiente
        </Button>
      )}
    </nav>
  );
}

export default SlidePagination;
