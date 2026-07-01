import type { DraftSlide } from "../../../types/slide";

interface TextSlideFieldsProps {
  content: string;
  onChange: (updates: Partial<DraftSlide>) => void;
  errors: string[];
}

function TextSlideFields({ content, onChange, errors }: TextSlideFieldsProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="slide-content"
        className="text-sm font-medium text-text-headings"
      >
        Contenido explicativo <span className="text-text-danger">*</span>
      </label>
      <textarea
        id="slide-content"
        value={content}
        onChange={(e) => onChange({ content: e.target.value })}
        rows={6}
        placeholder="Escribe el contenido del slide..."
        className="w-full resize-y rounded-lg border border-border-card bg-surface-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
        aria-invalid={errors.length > 0}
        aria-describedby={errors.length > 0 ? "slide-content-error" : undefined}
      />
      {errors.length > 0 && (
        <p id="slide-content-error" role="alert" className="text-sm text-text-danger">
          {errors[0]}
        </p>
      )}
    </div>
  );
}

export default TextSlideFields;
