import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export interface DisabilityTagOption {
  value: number;
  label: string;
}

interface DisabilityTagInputProps {
  label: string;
  placeholder?: string;
  options: DisabilityTagOption[];
  selected: number[];
  onChange: (values: number[]) => void;
  error?: string | null;
}


function DisabilityTagInput({
  label,
  placeholder = "Buscar discapacidad...",
  options,
  selected,
  onChange,
  error,
}: DisabilityTagInputProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  const filteredOptions = options.filter(
    (opt) =>
      !selected.includes(opt.value) &&
      opt.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function addValue(value: number) {
    onChange([...selected, value]);
    setQuery("");
    inputRef.current?.focus();
  }

  function openDropdown() {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }
    setOpen(true);
  }

  function removeValue(value: number) {
    onChange(selected.filter((v) => v !== value));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && query === "" && selectedOptions.length > 0) {
      removeValue(selectedOptions[selectedOptions.length - 1].value);
    }
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      <label htmlFor={fieldId} className="text-sm font-medium text-text-headings">
        {label}
      </label>

      <div className="relative" ref={triggerRef}>
        <div
          className="flex w-full flex-wrap items-center gap-1.5 rounded-lg border border-border-card bg-surface-page px-2 py-1.5 focus-within:border-border-focus focus-within:ring-2 focus-within:ring-border-focus/30"
          onClick={() => {
            openDropdown();
            inputRef.current?.focus();
          }}
        >
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
            >
              {opt.label}
              <button
                type="button"
                aria-label={`Quitar ${opt.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(opt.value);
                }}
                className="rounded-full text-primary-700/70 hover:text-primary-700 focus:outline-none"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            id={fieldId}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${fieldId}-listbox`}
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => openDropdown()}
            onKeyDown={handleKeyDown}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            className="min-w-[8ch] flex-1 border-0 bg-transparent py-1 text-sm text-text-body placeholder:text-text-placeholders focus:outline-none"
          />
        </div>

        {open && triggerRect && createPortal(
          <ul
            id={`${fieldId}-listbox`}
            role="listbox"
            aria-label={label}
            className="fixed z-9999 max-h-36 w-full overflow-auto rounded-lg bg-surface-primary p-1 shadow-lg ring-1 ring-border-card"
            style={{
              top: triggerRect.bottom + 4,
              left: triggerRect.left,
              width: triggerRect.width,
            }}
          >
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-text-disabled">
                {options.length === 0 ? "No hay opciones disponibles." : "Sin coincidencias."}
              </li>
            )}
            {filteredOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => addValue(option.value)}
                  className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
      </div>

      {error && <p className="text-sm text-text-danger">{error}</p>}
    </div>
  );
}

export default DisabilityTagInput;
