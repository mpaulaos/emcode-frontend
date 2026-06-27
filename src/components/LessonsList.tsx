import type { Lesson } from "../types/lesson";
import { Switch } from "./kit/Switch";
import { useLessons } from "../hooks/useLessons";

interface LessonsListProps {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  onLessonUpdated: (updatedLesson: Lesson) => void;
}

export function LessonsList({ lessons, loading, error, onLessonUpdated }: LessonsListProps) {
  const { updateLesson } = useLessons();

  async function handleToggleVisibility(lesson: Lesson, isVisible: boolean) {
    try {
      const updated = await updateLesson(lesson.id, { isVisible });
      onLessonUpdated(updated);
    } catch { /* error handled by hook */ }
  }

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
      <ul className="w-full flex flex-col gap-sm">
        {lessons.map((lesson) => (
          <li
            className="w-full mx-auto p-2 flex justify-between border-md  border-neutral-100 rounded"
            key={lesson.id}
          >
            <div className="flex items-center w-full justify-between ">
              <div className="flex flex-wrap items-center gap-2">
                {lesson.lessonType === "theory" ? (
                  <p className="text-body font-semibold">Lección: </p>
                ) : (
                  <p className="text-body font-semibold">Laboratorio: </p>
                )}
                <p className="text-body">{lesson.lessonName}</p>
              </div>

              <Switch
                aria-label="Lección es visible"
                isSelected={lesson.isVisible}
                onChange={(isVisible) => handleToggleVisibility(lesson, isVisible)}
              >
                <span className="sm:inline">Visible para estudiantes</span>
              </Switch>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonsList;
