import { ImageOff } from "lucide-react";
import type { CourseFormState } from "./modalData";

interface Step2PreviewProps {
  form: CourseFormState;
}

function Step2Preview({ form }: Step2PreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        Así se verá el curso en el dashboard:
      </p>

      <article className="overflow-hidden rounded-2xl bg-white transition duration-300">
        <div className="aspect-video overflow-hidden">
          {form.imagePreview ? (
            <img
              src={form.imagePreview}
              alt="Imagen del curso"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gray-100 rounded-t-2xl"
              role="img"
              aria-label="El curso aún no tiene imagen de portada"
            >
              <ImageOff
                size={36}
                aria-hidden="true"
                className="text-gray-400"
              />
            </div>
          )}
        </div>

        {/*Contenido del curso*/}
        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-gray-900">{form.title}</h3>
            <p className="text-sm text-gray-600">{form.subtitle}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-gray-700">
            {form.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default Step2Preview;
