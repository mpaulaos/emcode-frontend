import { useId, useRef, useState, type ReactNode } from "react";
import { useButtonTTS } from "../../hooks/useButtonTTS";

export interface LessonOption {
  id: number;
  lessonName: string;
}

interface LessonSelectorProps {
  label: "Lección" | "Laboratorio";
  currentLessonId: number;
  currentLessonName: string;
  lessons: LessonOption[];
  icon: ReactNode;
  variant: "theory" | "practice";
  onNavigate: (lessonId: number) => void;
}

interface LessonOptionButtonProps {
  lesson: LessonOption;
  isCurrent: boolean;
  onSelect: (lessonId: number) => void;
}

function LessonOptionButton({ lesson, isCurrent, onSelect }: LessonOptionButtonProps) {
  const tts = useButtonTTS(isCurrent ? `${lesson.lessonName}, actual` : lesson.lessonName);

  return (
    <button
      type="button"
      aria-current={isCurrent ? "page" : undefined}
      onFocus={tts.onFocus}
      onClick={() => onSelect(lesson.id)}
      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-text-body outline-none transition hover:bg-surface-card focus-visible:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus"
    >
      {lesson.lessonName}
      {isCurrent && <span className="ml-3 text-xs text-text-disabled">(actual)</span>}
    </button>
  );
}

export function LessonSelector({
  label,
  currentLessonId,
  currentLessonName,
  lessons,
  icon,
  variant,
  onNavigate,
}: LessonSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listName = label === "Lección" ? "lecciones" : "laboratorios";
  const triggerText = `${label} actual: ${currentLessonName}. Lista de ${listName}`;
  const triggerTTS = useButtonTTS(triggerText);

  function handleSelect(lessonId: number) {
    setIsOpen(false);
    if (lessonId === currentLessonId) {
      triggerRef.current?.focus();
      return;
    }
    onNavigate(lessonId);
  }

  return (
    <div
      className="relative w-fit"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerText}
        aria-expanded={isOpen}
        aria-controls={listId}
        onFocus={triggerTTS.onFocus}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${variant === "practice" ? "bg-accent-50 text-accent-700 hover:bg-accent-100" : "bg-primary-50 text-primary-700 hover:bg-primary-100"}`}
      >
        {icon}
        {label}: {currentLessonName}
      </button>
      <ul
        id={listId}
        aria-label={`Lista de ${listName}`}
        hidden={!isOpen}
        className="absolute left-0 top-full z-50 mt-1 max-h-64 min-w-48 overflow-y-auto rounded-lg border border-border-card bg-surface-primary p-1 shadow-lg"
      >
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <LessonOptionButton
              lesson={lesson}
              isCurrent={lesson.id === currentLessonId}
              onSelect={handleSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}