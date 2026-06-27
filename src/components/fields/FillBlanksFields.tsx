import type { DraftSlide, BlankItem } from "../../types/slide";

interface FillBlanksFieldsProps {
  textWithBlanks: string;
  blanks: BlankItem[];
  onChange: (updates: Partial<DraftSlide>) => void;
  errors: string[];
}

function extractBlankIds(text: string): string[] {
  const matches = text.match(/\{\{(\d+)\}\}/g);
  if (!matches) return [];
  const ids = matches.map((m) => m.replace(/\{|\}/g, ""));
  const max = Math.max(...ids.map(Number), 0);
  const seen = new Set<string>();
  const result: string[] = [];
  for (let i = 1; i <= max; i++) {
    const id = String(i);
    if (ids.includes(id) && !seen.has(id)) {
      result.push(id);
      seen.add(id);
    }
  }
  return result;
}

function renderPreview(text: string): React.ReactNode[] {
  const parts = text.split(/(\{\{\d+\}\})/g);
  return parts.map((part, i) => {
    const match = part.match(/\{\{(\d+)\}\}/);
    if (match) {
      return (
        <span
          key={i}
          className="inline-block rounded bg-primary-100 px-1 font-medium text-primary-800"
        >
          [{match[1]}]
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function FillBlanksFields({ textWithBlanks, blanks, onChange, errors }: FillBlanksFieldsProps) {
  const blankIds = extractBlankIds(textWithBlanks);

  function handleTextChange(value: string) {
    const newIds = extractBlankIds(value);
    const newBlanks: BlankItem[] = newIds.map((id) => {
      const existing = blanks.find((b) => b.id === id);
      return existing || { id, correctAnswer: '' };
    });
    onChange({ textWithBlanks: value, blanks: newBlanks });
  }

  function handleAnswerChange(index: number, value: string) {
    const updated = blanks.map((b, i) =>
      i === index ? { ...b, correctAnswer: value } : b
    );
    onChange({ blanks: updated });
  }

  const textError = errors.find(e => e.toLowerCase().includes('espacio') || e.toLowerCase().includes('texto'));
  const answersError = errors.find(e => e.toLowerCase().includes('respuesta'));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="fill-blanks-text"
          className="text-sm font-medium text-text-headings"
        >
          Texto con espacios <span className="text-text-danger">*</span>
        </label>
        <p className="text-xs text-text-body">
          Marca los espacios en blanco con {`{{1}}`}, {`{{2}}`}, etc.
        </p>
        <textarea
          id="fill-blanks-text"
          value={textWithBlanks}
          onChange={(e) => handleTextChange(e.target.value)}
          rows={4}
          placeholder={`Ej. El {{1}} es el lenguaje de marcado estándar para crear {{2}}.`}
          className="w-full resize-y rounded-lg border border-border-card bg-surface-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
          aria-invalid={!!textError}
          aria-describedby={textError ? "fill-blanks-text-error" : undefined}
        />
        {textError && (
          <p id="fill-blanks-text-error" role="alert" className="text-sm text-text-danger">
            {textError}
          </p>
        )}
      </div>

      {textWithBlanks.trim() && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-text-headings">Vista previa</span>
          <div className="rounded-lg border border-border-card bg-surface-page px-3 py-2 text-sm text-text-body">
            {renderPreview(textWithBlanks)}
          </div>
        </div>
      )}

      {blankIds.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-headings">
            Respuestas correctas <span className="text-text-danger">*</span>
          </span>
          {answersError && (
            <p role="alert" className="text-sm text-text-danger">{answersError}</p>
          )}

          {blankIds.map((id, index) => {
            const blank = blanks[index];
            return (
              <div key={id} className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary-100 text-xs font-medium text-primary-800">
                  {id}
                </span>
                <input
                  type="text"
                  value={blank?.correctAnswer || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Respuesta para espacio ${id}`}
                  className="min-w-0 flex-1 rounded-lg border border-border-card px-3 py-1.5 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
                  aria-label={`Respuesta para el espacio ${id}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FillBlanksFields;
