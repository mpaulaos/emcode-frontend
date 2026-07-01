import type { BlankItem } from "../types/slide";

interface FillBlankOptionsProps {
  textWithBlanks: string;
  blanks: BlankItem[];
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

const BLANK_MARKER = "___";

export function FillBlankOptions({
  textWithBlanks,
  blanks,
  value,
  onChange,
}: FillBlankOptionsProps) {
  const parts = textWithBlanks.split(BLANK_MARKER);
  const blankId = blanks[0]?.id ?? "blank_1";
  const inputValue = value[blankId] ?? "";

  function handleInputChange(newVal: string) {
    onChange({ [blankId]: newVal });
  }

  return (
    <div className="space-y-md">
      <div className="text-body text-text-body leading-relaxed whitespace-pre-line text-pretty">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span
                className="inline-block min-w-[100px] border-b-2 border-primary-700 mx-1"
                aria-label="Espacio en blanco para escribir la respuesta"
              >
                {inputValue ? (
                  <span className="text-primary-700 font-semibold">
                    {inputValue}
                  </span>
                ) : (
                  <span className="text-transparent select-none">_</span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Escribe tu respuesta..."
        className="w-full max-w-md rounded-lg border border-border-card bg-surface-page px-md py-2 text-sm text-text-body placeholder:text-text-placeholders focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      />
    </div>
  );
}
