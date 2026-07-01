import { ImageOff } from "lucide-react";
import type { CourseFormState } from "../../types/modal";

interface Step2PreviewProps {
  form: CourseFormState;
}

function Step2Preview({ form }: Step2PreviewProps) {
  return (
    <div className="flex min-w-0 h-full flex-col gap-4">
      <p className="text-sm text-text-body">
        Así se verá el curso en el dashboard:
      </p>

      <article className="w-full h-full overflow-hidden rounded-2xl bg-surface-primary transition duration-300">
        <div className="aspect-video w-full overflow-hidden">
          {form.imagePreview ? (
            <img
              src={form.imagePreview}
              alt="Imagen del curso"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-surface-card rounded-t-2xl"
              aria-label="El curso aún no tiene imagen de portada"
            >
              <ImageOff
                size={36}
                aria-hidden="true"
                className="text-text-disabled"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-text-headings">
              {form.title}
            </h3>
            <p className="text-sm text-text-body">{form.subtitle}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-text-body">
            {form.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default Step2Preview;