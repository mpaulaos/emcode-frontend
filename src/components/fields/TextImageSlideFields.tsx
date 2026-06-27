import { useRef } from "react";
import { Upload } from "lucide-react";
import type { DraftSlide } from "../../types/slide";

interface TextImageSlideFieldsProps {
  content: string;
  imageUrl: string;
  imageAlt: string;
  onChange: (updates: Partial<DraftSlide>) => void;
  errors: string[];
}

function TextImageSlideFields({ content, imageUrl, imageAlt, onChange, errors }: TextImageSlideFieldsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      onChange({ imageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  const urlError = errors.find(e => e.toLowerCase().includes('url') || e.toLowerCase().includes('imagen'));
  const altError = errors.find(e => e.toLowerCase().includes('alternativo'));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="slide-content"
          className="text-sm font-medium text-text-headings"
        >
          Contenido explicativo
          <span className="ml-1 text-xs text-text-disabled">(opcional)</span>
        </label>
        <textarea
          id="slide-content"
          value={content}
          onChange={(e) => onChange({ content: e.target.value })}
          rows={4}
          placeholder="Explicación opcional que acompaña a la imagen..."
          className="w-full resize-y rounded-lg border border-border-card bg-surface-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
        />
      </div>

      {/* Dropzone */}
      <div
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition ${
          imageUrl
            ? "border-surface-action bg-surface-card"
            : "border-border-card bg-surface-page"
        }`}
      >
        {imageUrl ? (
          <div className="flex w-full flex-col items-center gap-3">
            <img
              src={imageUrl}
              alt={imageAlt || "Vista previa"}
              className="max-h-40 rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-border-card px-4 py-1.5 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              Cambiar imagen
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <Upload size={28} className="text-text-disabled" aria-hidden="true" />
              <p className="text-sm text-text-body">Arrastra una imagen aquí o</p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              Subir imagen
            </button>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelected}
          className="hidden"
          aria-label="Seleccionar imagen"
        />
      </div>

      {urlError && (
        <p role="alert" className="text-sm text-text-danger">{urlError}</p>
      )}

      <div className="flex flex-col gap-1">
        <label
          htmlFor="slide-image-alt"
          className="text-sm font-medium text-text-headings"
        >
          Texto alternativo (alt) — Accesibilidad <span className="text-text-danger">*</span>
        </label>
        <p className="text-xs text-text-body">
          Descripción de la imagen para lectores de pantalla.
        </p>
        <input
          id="slide-image-alt"
          type="text"
          value={imageAlt}
          onChange={(e) => onChange({ imageAlt: e.target.value })}
          placeholder="Placeholder"
          className="w-full rounded-lg border border-border-card px-3 py-2 text-sm text-text-body placeholder:text-text-placeholders focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30"
          aria-required="true"
          aria-invalid={!!altError}
          aria-describedby={altError ? "slide-image-alt-error" : undefined}
        />
        {altError && (
          <p id="slide-image-alt-error" role="alert" className="text-sm text-text-danger">
            {altError}
          </p>
        )}
      </div>
    </div>
  );
}

export default TextImageSlideFields;
