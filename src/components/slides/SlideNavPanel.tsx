import { Plus, X } from "lucide-react";
import type { DraftSlide } from "../../types/slide";

interface SlideNavPanelProps {
  slides: DraftSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onDelete?: (index: number) => void;
}

function SlideNavPanel({ slides, activeIndex, onSelect, onAdd, onDelete }: SlideNavPanelProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-wider text-text-body">
        Prácticas
      </p>
      <div
        role="tablist"
        aria-label="Slides del borrador"
        className="flex gap-1.5 overflow-x-auto"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const statusIcon = slide.isValid
            ? "✓"
            : slide.isDirty
              ? "!"
              : "";

          return (
            <div key={slide.tempId} className="relative group">
              <button
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${index + 1}${slide.title ? `: ${slide.title}` : " — Sin título"}${slide.isValid ? " (completado)" : slide.isDirty ? " (con errores)" : ""}`}
                onClick={() => onSelect(index)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                  isActive
                    ? "border-surface-action bg-surface-action text-text-on-action"
                    : slide.isValid
                      ? "border-success-500 text-success-600"
                      : slide.isDirty
                        ? "border-border-danger text-text-danger"
                        : "border-border-card text-text-body hover:bg-surface-card"
                }`}
              >
                {statusIcon || index + 1}
              </button>
              {onDelete && (
                <button
                  type="button"
                  aria-label={`Eliminar slide ${index + 1}`}
                  onClick={() => onDelete(index)}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-surface-danger text-text-on-action opacity-0 transition hover:opacity-100 focus:opacity-100 group-hover:opacity-100 focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <X size={11} aria-hidden="true" />
                </button>
              )}
            </div>
          );
        })}

        <button
          aria-label="Agregar nuevo slide"
          onClick={onAdd}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-border-card text-text-body transition hover:bg-surface-card hover:text-text-headings focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default SlideNavPanel;
