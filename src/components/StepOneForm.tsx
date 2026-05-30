import { useRef } from "react";
import { ImagePlus } from "lucide-react";

import { CharCounter } from "./CharCounter";
import { limits } from "./modalData";
import type { CourseFormState } from "./modalData";

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
    <div className="flex flex-col gap-5">
      {/* Image upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Imagen del curso
        </label>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition overflow-hidden 
          hover:border-violet-400 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-700"
          style={{ minHeight: "10rem" }}
          aria-label={form.imagePreview ? "Cambiar imagen del curso" : "Subir imagen del curso"}
        >
          {form.imagePreview ? (
            <img
              src={form.imagePreview}
              alt="Vista previa de la imagen"
              className="h-40 w-full object-cover"
            />
          ) : (
            <>
              <ImagePlus
                size={28}
                className="text-gray-400"
                aria-hidden="true"
              />
              <p className="text-sm text-gray-500">
                Haz clic para subir una imagen
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP</p>
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
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
          className="text-sm font-medium text-gray-700"
        >
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="course-title"
          type="text"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          maxLength={limits.title}
          placeholder="Ej. Fundamentos de Python"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400
          focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />
        <CharCounter current={form.title.length} limit={limits.title} />
      </div>

      {/* Subtitle */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="course-subtitle"
          className="text-sm font-medium text-gray-700"
        >
          Subtítulo <span className="text-red-500">*</span>
        </label>
        <input
          id="course-subtitle"
          type="text"
          value={form.subtitle}
          onChange={(e) => onChange("subtitle", e.target.value)}
          maxLength={limits.subtitle}
          placeholder="Ej. Aprende desde cero hasta avanzado"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400
          focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />
        <CharCounter current={form.subtitle.length} limit={limits.subtitle} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="course-description"
          className="text-sm font-medium text-gray-700"
        >
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="course-description"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          maxLength={limits.description}
          rows={3}
          placeholder="Describe brevemente el curso"
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400
          focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
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
