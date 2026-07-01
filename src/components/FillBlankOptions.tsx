interface FillBlankOptionsProps {
  textWithBlanks: string;
  value: string;
  onChange: (value: string) => void;
}

const BLANK_MARKER = "___";
const INPUT_ID = "fill-blank-input";

export function FillBlankOptions({
  textWithBlanks,
  value,
  onChange,
}: FillBlankOptionsProps) {
  const parts = textWithBlanks.split(BLANK_MARKER);

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
                aria-describedby={INPUT_ID}
              >
                {value ? (
                  <span className="text-primary-700 font-semibold">
                    {value}
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
        id={INPUT_ID}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu respuesta..."
        className="w-full max-w-md rounded-lg border border-border-card bg-surface-page px-md py-2 text-sm text-text-body placeholder:text-text-placeholders focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      />
    </div>
  );
}
