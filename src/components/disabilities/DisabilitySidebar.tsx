import { ChevronDown } from "lucide-react";
import type { DisabilityCategory } from "../../types/disability";
import { useAccessibility } from "../../hooks/useAccessibility";
import { useSpeechContext } from "../../context/SpeechContext";

interface DisabilitySidebarProps {
  category: DisabilityCategory;
  activeItemId: string;
  onSelectItem: (sectionId: string, itemId: string) => void;
}

function DisabilitySidebar({
  category,
  activeItemId,
  onSelectItem,
}: DisabilitySidebarProps) {
  const { settings } = useAccessibility();
  const { speak, stop } = useSpeechContext();

  return (
    <aside className="w-full shrink-0 rounded-xl border border-border-card bg-surface-primary p-4 lg:w-64 lg:p-6">
      <h3 className="mb-3 border-b border-border-card pb-2 text-sm font-bold text-text-headings">
        {category.label}
      </h3>

      <nav aria-label={`Subcategorías de ${category.label}`}>
        <ul className="flex flex-col gap-3">
          {category.sections.map((section) => (
            <li key={section.id}>
              <details className="group" open>
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-text-headings [&::-webkit-details-marker]:hidden"
                  onFocus={() => {
                    if (settings.ttsEnabled) {
                      stop();
                      speak(section.label);
                    }
                  }}
                >
                  {section.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="shrink-0 transition group-open:rotate-180"
                  />
                </summary>

                <ul className="mt-1 flex flex-col gap-1 pl-2">
                  {section.items.map((item) => {
                    const isActive = item.id === activeItemId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => onSelectItem(section.id, item.id)}
                          onFocus={() => {
                            if (settings.ttsEnabled) {
                              stop();
                              speak(item.label);
                            }
                          }}
                          aria-current={isActive ? "true" : undefined}
                          className={`w-full rounded px-2 py-1 text-left text-sm transition ${
                            isActive
                              ? "bg-primary-50 font-bold text-primary"
                              : "text-text-body hover:bg-surface-card"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default DisabilitySidebar;
