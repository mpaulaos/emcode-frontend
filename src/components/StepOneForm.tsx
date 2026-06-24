import { useRef } from "react";
import { ImagePlus } from "lucide-react";

import { CharCounter } from "./CharCounter";
import { limits } from "../types/modal";
import type { CourseFormState } from "../types/modal";

interface Step1FormProps {
  form: CourseFormState;
  onChange: (field: keyof CourseFormState, value: string | File | null) => void;
}

function Step1Form({ form, onChange }: Step1FormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange("imageFile", file);
      onChange("imagePreview", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex min-w-0 flex-col gap-5">
      {/* Image upload */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="course-image" className="text-sm font-medium text-text-headings">
          Imagen del curso
        </label>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex min-h-32 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-border-card bg-surface-card transition hover:border-primary-400 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:min-h-32"
          aria-label={
            form.imagePreview
              ? "Cambiar imagen del curso"
              : "Subir imagen del curso"
          }
        >
          {form.imagePreview ? (
            <img
              src={form.imagePreview}
              alt="Vista previa de la imagen"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <ImagePlus
                size={28}
                className="text-text-disabled"
                aria-hidden="true"
              />
              <p className="text-sm text-text-body">
                Haz clic para subir una imagen
              </p>
              <p className="text-xs text-text-placeholders">PNG, JPG, WEBP</p>
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          id="course-image"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleImageChange}
          aria-label="Seleccionar imagen del curso"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="course-title"
          className="text-sm font-medium text-text-headings"
        >
          Título <span className="text-text-danger">*</span>
        </label>
        <input
          id="course-title"
          type="text"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          maxLength={limits.title}
          placeholder="Ej. Fundamentos de Python"
          className="w-full rounded-lg border border-border-card px-3 py-2 text-sm text-text-headings placeholder:text-text-placeholders
          focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
        />
        <CharCounter current={form.title.length} limit={limits.title} />
      </div>

      {/* Subtitle */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="course-subtitle"
          className="text-sm font-medium text-text-headings"
        >
          Subtítulo <span className="text-text-danger">*</span>
        </label>
        <input
          id="course-subtitle"
          type="text"
          value={form.subtitle}
          onChange={(e) => onChange("subtitle", e.target.value)}
          maxLength={limits.subtitle}
          placeholder="Ej. Aprende desde cero hasta avanzado"
          className="w-full rounded-lg border border-border-card px-3 py-2 text-sm text-text-headings placeholder:text-text-placeholders
          focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
        />
        <CharCounter current={form.subtitle.length} limit={limits.subtitle} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="course-description"
          className="text-sm font-medium text-text-headings"
        >
          Descripción <span className="text-text-danger">*</span>
        </label>
        <textarea
          id="course-description"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          maxLength={limits.description}
          rows={3}
          placeholder="Describe brevemente el curso"
          className="w-full resize-y rounded-lg border border-border-card px-3 py-2 text-sm text-text-headings placeholder:text-text-placeholders
          focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
        />
        <CharCounter
          current={form.description.length}
          limit={limits.description}
        />
      </div>
    </div>
  );
}

export default Step1Form;
