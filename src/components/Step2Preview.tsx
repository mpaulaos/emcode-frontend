// src/components/wizard/Step2Preview.tsx
import { Button } from 'react-aria-components';
import { ImageOff } from 'lucide-react';
import type { CourseFormState } from './modalData';

interface Step2PreviewProps {
  formState: CourseFormState;
  onBack:    () => void;
  onPublish: () => void;
}

function Step2Preview({ formState, onBack, onPublish }: Step2PreviewProps) {
  const { imagePreview, title, subtitle, description } = formState;

  return (
    <div className="flex flex-col gap-5">


      {/* Card de vista previa */}
      <article
        className="overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-gray-200"
        aria-label="Vista previa de la tarjeta del curso"
      >
        <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt={`Imagen de portada del curso: ${title || 'sin título'}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gray-100"
              role="img"
              aria-label="Sin imagen de portada"
            >
              <ImageOff size={36} aria-hidden="true" className="text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {description && (
            <p className="line-clamp-3 text-sm leading-6 text-gray-700">{description}</p>
          )}
        </div>
      </article>

      {/* Pie */}
      <div className="flex items-center justify-between pt-2">
        <Button
          onPress={onBack}
          className="w-32 cursor-pointer rounded-lg border border-solid border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700"
        >
          Atrás
        </Button>
        <Button
          onPress={onPublish}
          className="w-36 cursor-pointer rounded-lg border-none bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Publicar curso
        </Button>
      </div>
    </div>
  );
}

export default Step2Preview;