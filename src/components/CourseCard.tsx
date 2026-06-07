import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { Course } from "../types/dashboard";

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/courses/${course.id}`}
        aria-label={`Ver detalle del curso: ${course.title}`}
        className="flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 focus-visible:ring-offset-2 "
      >
        {/* Imagen */}
        <div className="aspect-video overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={`Imagen del curso ${course.title}`}
              loading="lazy"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gray-100 rounded-t-2xl"
              role="img"
              aria-label={`El curso ${course.title} aún no tiene imagen de portada`}
            >
              <ImageOff
                size={36}
                aria-hidden="true"
                className="text-gray-400"
              />
            </div>
          )}
        </div>

        {/* Contenido del currso*/}
        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-gray-900">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600">{course.subtitle}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-gray-700">
            {course.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default CourseCard;
