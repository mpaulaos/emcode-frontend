import type { Lesson } from "../types/lesson";

interface LessonsListProps {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
}

export function LessonsList({ lessons, loading, error }: LessonsListProps) {
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-text-body text-body-lg animate-pulse">
          Loading lessons…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="w-full flex flex-col spacing-xl">
        {lessons.map((lesson) => (
          <li
            className="w-full mx-auto p-2 flex flex-wrap justify-between text-body-sm"
            key={lesson.id}
          >
            <div className="flex items-center gap-2 w-80 ">
              {lesson.lessonType === "theory" ? (
                <p className="text-success">Lección: </p>
              ) : (
                <p className="text-success">Laboratorio: </p>
              )}
              <p className="text-success">{lesson.lessonName}</p>
            </div>
            {/* <p className="w-30 text-right ">{lesson.status}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
