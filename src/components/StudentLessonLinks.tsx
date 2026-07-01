import { Link } from "react-router-dom";
import { useLessonsListData } from "../hooks/useLessonsList";
import { BookOpen, Beaker } from "lucide-react";

interface StudentLessonLinksProps {
  topicId: number;
  courseId: string;
}

function StudentLessonLinks({ topicId, courseId }: StudentLessonLinksProps) {
  const { lessons, loading, error } = useLessonsListData(String(topicId));

  const visibleLessons = lessons.filter((l) => l.isVisible);

  if (loading) {
    return (
      <p className="text-sm text-text-body" aria-live="polite">
        Cargando lecciones…
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-sm text-text-danger">
        Error al cargar lecciones: {error}
      </p>
    );
  }

  if (visibleLessons.length === 0) {
    return (
      <p className="text-sm text-text-disabled">
        No hay lecciones disponibles en este tema.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-sm">
      {visibleLessons.map((lesson) => (
        <li key={lesson.id}>
          <Link
            to={`/courses/${courseId}/lesson/${topicId}/${lesson.id}`}
            className="mx-auto flex w-full items-center justify-between rounded border-md border-neutral-100 p-2 text-text-body transition hover:bg-surface-action-hover-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <div className="flex flex-wrap items-center gap-2">
              {lesson.lessonType === "theory" ? (
                <BookOpen size={16} aria-hidden="true" className="shrink-0 text-primary-700" />
              ) : (
                <Beaker size={16} aria-hidden="true" className="shrink-0 text-primary-700" />
              )}
              <p className="text-body font-semibold">
                {lesson.lessonType === "theory" ? "Lección:" : "Laboratorio:"}
              </p>
              <p className="text-body">{lesson.lessonName}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default StudentLessonLinks;
