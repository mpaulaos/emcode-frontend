import { Checkbox } from "../ui/Checkbox";
import type { SlideOption } from "../../types/slide";

interface ChoiceOptionsListProps {
  type: "single" | "multiple";
  options: SlideOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  labelledBy: string;
}

export function ChoiceOptionsList({
  type,
  options,
  value,
  onChange,
  labelledBy,
}: ChoiceOptionsListProps) {
  if (type === "single") {
    const selected = value as string;

    return (
      <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-col gap-sm">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected === opt.id}
            aria-label={opt.text}
            tabIndex={0}
            onClick={() => onChange(opt.id)}
            onKeyDown={(event) => {
              if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
              event.preventDefault();

              const radios = event.currentTarget.closest('[role="radiogroup"]')
                ?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
              if (!radios?.length) return;

              const currentIndex = Array.from(radios).indexOf(event.currentTarget);
              const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
              const nextIndex = (currentIndex + direction + radios.length) % radios.length;
              radios[nextIndex].focus();
              onChange(options[nextIndex].id);
            }}
            className={`group flex items-center gap-3 px-md py-3 rounded-lg border-l-4 border-primary-700 cursor-pointer transition hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${selected === opt.id ? "bg-primary-50" : "bg-surface-card"}`}
          >
            <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === opt.id ? "border-primary" : "border-neutral-400"}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${selected === opt.id ? "bg-primary" : "bg-transparent"}`} />
            </div>
            <span className="text-sm text-text-body">{opt.text}</span>
          </button>
        ))}
      </div>
    );
  }

  const selected = (value as string[]) ?? [];

  function handleToggle(optId: string, isSelected: boolean) {
    if (isSelected) {
      onChange([...selected, optId]);
    } else {
      onChange(selected.filter((s) => s !== optId));
    }
  }

  return (
    <div role="group" aria-labelledby={labelledBy} className="flex flex-col gap-sm">
      {options.map((opt) => (
        <Checkbox
          key={opt.id}
          isSelected={selected.includes(opt.id)}
          onChange={(isSelected) => handleToggle(opt.id, isSelected)}
          className="flex items-center gap-3 px-md py-3 rounded-lg bg-surface-card border-l-4 border-primary-700 cursor-pointer transition data-[selected]:bg-primary-50 hover:bg-primary-100"
        >
          {opt.text}
        </Checkbox>
      ))}
    </div>
  );
}
