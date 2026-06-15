import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { Course } from "../types/dashboard";

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="h-full overflow-hidden rounded-2xl bg-surface-primary transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-border-focus has-[a:focus-visible]:ring-offset-2">
      <Link
        to={`/courses/${course.id}`}
        aria-label={`Ver detalle del curso: ${course.title}`}
        className="flex h-full flex-col focus:outline-none"
      >
        {/* Imagen */}
        <div className="aspect-video shrink-0 overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={`Imagen del curso ${course.title}`}
              loading="lazy"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-surface-card rounded-t-2xl"
              aria-label={`El curso ${course.title} aún no tiene imagen de portada`}
            >
              <ImageOff
                size={36}
                aria-hidden="true"
                className="text-text-disabled"
              />
            </div>
          )}
        </div>

        {/* Contenido del curso */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-text-headings">
              {course.title}
            </h3>
            <p className="text-sm text-text-body">{course.subtitle}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-text-body">
            {course.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default CourseCard;