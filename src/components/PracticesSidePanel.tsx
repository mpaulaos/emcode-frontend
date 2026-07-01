import { List } from "lucide-react";

interface PracticesSidePanelProps {
  slideCount: number;
  currentIndex: number;
  answered: boolean[];
  onSelect: (index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function PracticesSidePanel({
  slideCount,
  currentIndex,
  answered,
  onSelect,
  isOpen,
  onToggle,
}: PracticesSidePanelProps) {
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg md:hidden"
        aria-label={isOpen ? "Cerrar panel" : "Abrir panel de ejercicios"}
      >
        <List size={24} />
      </button>

      {/* Overlay backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onToggle}
          aria-hidden
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed bottom-0 left-0 right-0 z-50 max-h-[60vh] overflow-y-auto rounded-t-xl bg-surface-page p-md shadow-lg transition-transform
          md:static md:max-h-none md:w-64 md:rounded-none md:shadow-none md:border-l md:border-border-card
          ${isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
        `}
      >
        <div className="mb-sm flex items-center justify-between md:hidden">
          <span className="text-sm font-semibold text-text-headings">
            Ejercicios
          </span>
          <button
            onClick={onToggle}
            className="text-sm text-text-body"
            aria-label="Cerrar panel"
          >
            Cerrar
          </button>
        </div>

        <span className="hidden text-sm font-semibold text-text-headings md:block mb-sm">
          Ejercicios
        </span>

        <div className="grid grid-cols-5 gap-2 md:grid-cols-3">
          {Array.from({ length: slideCount }, (_, i) => {
            const isActive = i === currentIndex;
            const isAnswered = answered[i];

            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`
                  flex aspect-square items-center justify-center rounded-lg text-sm font-medium transition
                  ${isActive
                    ? "bg-primary text-white"
                    : isAnswered
                      ? "bg-primary-50 text-primary border border-primary"
                      : "bg-surface-card text-text-body border border-border-card hover:bg-neutral-100"
                  }
                `}
                aria-label={`Ejercicio ${i + 1}${isAnswered ? " (respondido)" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
