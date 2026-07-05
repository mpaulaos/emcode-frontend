import { useAccessibility } from "../../hooks/useAccessibility";
import { useSpeechContext } from "../../context/SpeechContext";

interface Category {
  id: string;
  label: string;
}

interface CategoryChipsProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

function CategoryChips({ categories, activeId, onSelect }: CategoryChipsProps) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();

  return (
    <div
      role="tablist"
      aria-label="Categorías de discapacidad"
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(cat.id)}
            onFocus={() => {
              if (settings.ttsEnabled) {
                stop();
                speak(cat.label);
              }
            }}
            className={`rounded-xl border-[1.5px] px-3 py-2.5 text-sm font-medium transition text-center ${
              isActive
                ? "border-primary bg-primary font-bold text-text-on-action"
                : "border-border-card bg-surface-primary text-text-body hover:border-primary/40"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;