import { RadioGroup, Radio } from "react-aria-components";
import { Checkbox } from "./Checkbox";
import type { SlideOption } from "../types/slide";

interface ChoiceOptionsListProps {
  type: "single" | "multiple";
  options: SlideOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function ChoiceOptionsList({
  type,
  options,
  value,
  onChange,
}: ChoiceOptionsListProps) {
  if (type === "single") {
    return (
      <RadioGroup
        value={value as string}
        onChange={(v) => onChange(v)}
        className="flex flex-col gap-sm"
      >
        {options.map((opt) => (
          <Radio
            key={opt.id}
            value={opt.id}
            className="group flex items-center gap-3 px-md py-3 rounded-lg bg-surface-card border-l-4 border-primary-700 cursor-pointer transition data-selected:bg-primary-50 data-selected:border-primary-700 data-hovered:bg-primary-100 data-focused:outline-none data-focus-visible:ring-2 data-focus-visible:ring-border-focus"
          >
            <div className="w-4.5 h-4.5 rounded-full border-2 border-neutral-400 flex items-center justify-center shrink-0 group-data-selected:border-primary">
              <div className="w-2.5 h-2.5 rounded-full bg-transparent group-data-selected:bg-primary" />
            </div>
            <span className="text-sm text-text-body">{opt.text}</span>
          </Radio>
        ))}
      </RadioGroup>
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
    <div className="flex flex-col gap-sm">
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
