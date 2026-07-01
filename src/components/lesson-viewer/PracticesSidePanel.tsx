import { List } from "lucide-react";

interface PracticesSidePanelProps {
  slideCount: number;
  currentIndex: number;
  answered: boolean[];
  results?: { isCorrect: boolean }[];
  onSelect: (index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function PracticesSidePanel({
  slideCount,
  currentIndex,
  answered,
  results,
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
          md:sticky md:top-24 md:self-start md:z-auto md:max-h-[calc(100vh-8rem)] md:overflow-y-auto md:w-64 md:rounded-none md:shadow-none md:border-l md:border-border-card
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

        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: slideCount }, (_, i) => {
            const isActive = i === currentIndex;
            const isAnswered = answered[i];
            const result = results?.[i];
            const showResult = result !== undefined;

            let itemClass = "bg-surface-card text-text-body border border-border-card";
            if (isActive && showResult) {
              itemClass = result.isCorrect
                ? "bg-green-100 text-green-800 border border-green-500"
                : "bg-red-100 text-red-800 border border-red-500";
            } else if (isActive) {
              itemClass = "bg-primary text-white";
            } else if (showResult) {
              itemClass = result.isCorrect
                ? "bg-green-50 text-green-700 border border-green-300"
                : "bg-red-50 text-red-700 border border-red-300";
            } else if (isAnswered) {
              itemClass = "bg-primary-50 text-primary border border-primary";
            }

            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`
                  flex aspect-square items-center justify-center rounded-lg text-sm font-medium transition
                  ${itemClass}
                `}
                aria-label={`Ejercicio ${i + 1}${isAnswered ? " (respondido)" : ""}${showResult ? ` (${result.isCorrect ? "correcto" : "incorrecto"})` : ""}`}
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
