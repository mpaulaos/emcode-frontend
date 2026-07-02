import { memo } from "react";
import { MoreVertical, FileText, Pencil, Trash2 } from "lucide-react";
import FocusTTS from "../ui/FocusTTS";
import {
  MenuTrigger,
  Button as AriaButton,
  Menu,
  MenuItem,
  Popover,
} from "react-aria-components";

import type { Lesson } from "../../types/lesson";
import { Switch } from "../kit/Switch";
import { useLessons } from "../../hooks/useLessons";

interface LessonsListProps {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  onLessonUpdated: (updatedLesson: Lesson) => void;
  onManageSlides?: (lesson: Lesson) => void;
  onEditLesson?: (lesson: Lesson) => void;
  onDeleteLesson?: (lesson: Lesson) => void;
}

export const LessonsList = memo(function LessonsList({ lessons, loading, error, onLessonUpdated, onManageSlides, onEditLesson, onDeleteLesson }: LessonsListProps) {
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
            className="w-full mx-auto p-2 flex justify-between border-md border-neutral-100 rounded"
            key={lesson.id}
          >
            <div className="flex items-center w-full justify-between">
              <FocusTTS
                text={`${lesson.lessonType === "theory" ? "Lección" : "Laboratorio"} ${lesson.lessonName}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {lesson.lessonType === "theory" ? (
                    <p className="text-body font-semibold">Lección: </p>
                  ) : (
                    <p className="text-body font-semibold">Laboratorio: </p>
                  )}
                  <p className="text-body">{lesson.lessonName}</p>
                </div>
              </FocusTTS>

              <div className="flex items-center gap-2">
                <Switch
                  aria-label="Lección es visible"
                  isSelected={lesson.isVisible}
                  onChange={(isVisible) => handleToggleVisibility(lesson, isVisible)}
                >
                  <span className="sm:inline">Visible para estudiantes</span>
                </Switch>

                <MenuTrigger>
                  <AriaButton
                    aria-label={`Más acciones para ${lesson.lessonName}`}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-disabled transition hover:bg-surface-card hover:text-text-body focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    <MoreVertical size={18} aria-hidden="true" />
                  </AriaButton>
                  <Popover placement="bottom end" offset={4}>
                    <Menu
                      className="min-w-44 rounded-lg border border-border-card bg-surface-primary p-1 shadow-lg outline-none"
                      onAction={(key) => {
                        if (key === "slides") onManageSlides?.(lesson);
                        if (key === "edit") onEditLesson?.(lesson);
                        if (key === "delete") onDeleteLesson?.(lesson);
                      }}
                    >
                      <MenuItem
                        id="slides"
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-body outline-none transition data-hovered:bg-surface-card data-focused:bg-surface-card"
                      >
                        <FileText size={15} aria-hidden="true" />
                        Agregar slide
                      </MenuItem>
                      <MenuItem
                        id="edit"
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-body outline-none transition data-hovered:bg-surface-card data-focused:bg-surface-card"
                      >
                        <Pencil size={15} aria-hidden="true" />
                        Editar
                      </MenuItem>
                      <MenuItem
                        id="delete"
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-danger outline-none transition data-hovered:bg-surface-danger data-focused:bg-surface-danger"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        Eliminar
                      </MenuItem>
                    </Menu>
                  </Popover>
                </MenuTrigger>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default LessonsList;
