interface SlidePaginationProps {
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
  label?: string;
}

function SlidePagination({ currentIndex, totalSlides, onPrevious, onNext, onSlideChange, label = "Slide" }: SlidePaginationProps) {
  const safeTotal = Math.max(totalSlides, 1);

  return (
    <nav
      aria-label="Paginación de slides"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentIndex <= 0}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        Anterior
      </button>

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

      <button
        type="button"
        onClick={onNext}
        disabled={currentIndex >= totalSlides - 1}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        Siguiente
      </button>
    </nav>
  );
}

export default SlidePagination;
