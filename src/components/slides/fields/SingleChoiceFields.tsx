import { Plus, Trash2 } from "lucide-react";
import type { DraftSlide, SlideOption } from "../../../types/slide";
import { generateTempId } from "../../../types/slide";

interface SingleChoiceFieldsProps {
  question: string;
  options: SlideOption[];
  correctAnswer: string;
  onChange: (updates: Partial<DraftSlide>) => void;
  errors: string[];
}

function SingleChoiceFields({ question, options, correctAnswer, onChange, errors }: SingleChoiceFieldsProps) {
  function handleQuestionChange(value: string) {
    onChange({ question: value });
  }

  function handleOptionChange(index: number, value: string) {
    const updated = options.map((opt, i) =>
      i === index ? { ...opt, text: value } : opt
    );
    onChange({ options: updated });
  }

  function addOption() {
    onChange({ options: [...options, { id: generateTempId(), text: '' }] });
  }

  function removeOption(index: number) {
    if (options.length <= 2) return;
    const removed = options[index];
    const updated = options.filter((_, i) => i !== index);
    const newCorrect = correctAnswer === removed.id ? '' : correctAnswer;
    onChange({ options: updated, correctAnswer: newCorrect });
  }

  function handleCorrectChange(index: number) {
    onChange({ correctAnswer: options[index].id });
  }

  const questionError = errors.find(e => e.toLowerCase().includes('pregunta'));
  const optionsError = errors.find(e => e.toLowerCase().includes('opciones'));
  const correctError = errors.find(e => e.toLowerCase().includes('correcta'));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="slide-question"
          className="text-sm font-medium text-text-headings"
        >
          Pregunta <span className="text-text-danger">*</span>
        </label>
        <textarea
          id="slide-question"
          value={question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          rows={2}
          placeholder="Escribe la pregunta..."
          className="w-full resize-y rounded-lg border border-border-card bg-surface-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
          aria-invalid={!!questionError}
          aria-describedby={questionError ? "slide-question-error" : undefined}
        />
        {questionError && (
          <p id="slide-question-error" role="alert" className="text-sm text-text-danger">
            {questionError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-headings">
            Opciones <span className="text-text-danger">*</span>
          </span>
          {optionsError && (
            <p role="alert" className="text-sm text-text-danger">{optionsError}</p>
          )}
        </div>

        {options.map((option, index) => (
          <div
            key={option.id}
            className={`flex items-center gap-2 rounded-lg border-l-4 bg-surface-card px-3 py-2 ${
              correctAnswer === option.id
                ? "border-surface-action"
                : "border-transparent"
            }`}
          >
            <input
              type="radio"
              id={`correct-${option.id}`}
              name="correct-answer"
              checked={correctAnswer === option.id}
              onChange={() => handleCorrectChange(index)}
              className="h-4 w-4 shrink-0 accent-purple-600"
              aria-label={`Opción ${index + 1} como respuesta correcta`}
            />
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Opción ${index + 1}`}
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-text-body placeholder:text-text-placeholders focus:outline-none"
              aria-label={`Texto de la opción ${index + 1}`}
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="flex shrink-0 items-center justify-center rounded p-1 text-text-disabled transition hover:bg-surface-danger hover:text-text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                aria-label={`Eliminar opción ${index + 1}`}
              >
                <Trash2 size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        ))}

        {correctError && (
          <p role="alert" className="text-sm text-text-danger">{correctError}</p>
        )}

        <button
          type="button"
          onClick={addOption}
          className="flex items-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-sm font-medium text-surface-action transition hover:bg-surface-action-hover-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Plus size={15} aria-hidden="true" />
          Agregar opción
        </button>
      </div>
    </div>
  );
}

export default SingleChoiceFields;
