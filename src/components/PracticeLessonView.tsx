import { useMemo, useState } from "react";
import {
  MenuTrigger,
  Button as AriaButton,
  Menu,
  MenuItem,
  Popover,
} from "react-aria-components";
import { FlaskConical } from "lucide-react";

import { Meter } from "./kit/Meter";
import { ChoiceOptionsList } from "./ChoiceOptionsList";
import { FillBlankOptions } from "./FillBlankOptions";
import { PracticesSidePanel } from "./PracticesSidePanel";
import SlidePagination from "./SlidePagination";
import { useLessonsListData } from "../hooks/useLessonsList";
import type { Slide, SingleChoiceContent, MultipleChoiceContent, FillBlanksContent } from "../types/slide";

type AnswersState = Record<number, string | string[]>;

export interface PracticeLessonViewProps {
  slides: Slide[];
  lessonName: string;
  currentLessonId: number;
  currentTopicId: number;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
  onNavigateToLesson: (lessonId: number) => void;
}

export function PracticeLessonView({
  slides,
  lessonName,
  currentLessonId,
  currentTopicId,
  currentIndex,
  onPrevious,
  onNext,
  onSlideChange,
  onNavigateToLesson,
}: PracticeLessonViewProps) {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [panelOpen, setPanelOpen] = useState(false);

  const slide = slides[currentIndex];

  const { lessons: allLessons } = useLessonsListData(String(currentTopicId));

  const menuLessons = useMemo(() => {
    const visible = allLessons.filter((l) => l.isVisible);
    const includesCurrent = visible.some((l) => l.id === currentLessonId);
    if (!includesCurrent) {
      const current = allLessons.find((l) => l.id === currentLessonId);
      if (current) return [...visible, current];
    }
    return visible;
  }, [allLessons, currentLessonId]);

  const answered = useMemo(
    () => slides.map((s) => s.id in answers),
    [slides, answers],
  );

  function handleAnswerChange(value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [slide.id]: value }));
  }

  function handleSelectSlide(index: number) {
    onSlideChange(index);
    setPanelOpen(false);
  }

  const isChoice =
    slide.slideType === "single_choice" || slide.slideType === "multiple_choice";
  const isFill = slide.slideType === "fill_blank";

  return (
    <div className="flex flex-col gap-lg md:flex-row">
      {/* Main content */}
      <div className="flex-1 space-y-lg">
        <MenuTrigger>
          <AriaButton
            aria-label={`Lección actual: ${lessonName}. Abrir menú de lecciones`}
            className="flex items-center gap-2 bg-accent-50 text-accent-700 font-semibold px-4 py-2 rounded-lg hover:bg-accent-100 cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <FlaskConical size={16} aria-hidden="true" />
            Laboratorio: {lessonName}
          </AriaButton>
          <Popover placement="bottom start" offset={4}>
            <Menu
              className="min-w-48 rounded-lg border border-border-card bg-surface-primary p-1 shadow-lg outline-none"
              onAction={(key) => onNavigateToLesson(Number(key))}
            >
              {menuLessons.map((lesson) => (
                <MenuItem
                  key={lesson.id}
                  id={String(lesson.id)}
                  isDisabled={lesson.id === currentLessonId}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-text-body outline-none transition data-hovered:bg-surface-card data-focused:bg-surface-card data-disabled:text-text-disabled data-disabled:cursor-not-allowed"
                >
                  {lesson.lessonName}
                  {lesson.id === currentLessonId && (
                    <span className="ml-auto text-xs text-text-disabled">
                      (actual)
                    </span>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Popover>
        </MenuTrigger>

        <Meter value={66} label="Progreso" />

        <div
          className="bg-surface-primary border border-border-card rounded-xl p-lg lg:p-xl"
          role="region"
          aria-label="Contenido del ejercicio"
        >
          <h2 className="text-2xl font-bold text-text-headings mb-lg">
            {slide.title || `Ejercicio ${currentIndex + 1}`}
          </h2>

          {isChoice && slide.practiceContent && (
            <div className="space-y-md">
              <p className="text-body text-text-body leading-relaxed whitespace-pre-line text-pretty">
                {(slide.practiceContent as SingleChoiceContent | MultipleChoiceContent).question}
              </p>
              <ChoiceOptionsList
                type={slide.slideType === "single_choice" ? "single" : "multiple"}
                options={(slide.practiceContent as SingleChoiceContent | MultipleChoiceContent).options}
                value={answers[slide.id] ?? (slide.slideType === "single_choice" ? "" : [])}
                onChange={handleAnswerChange}
              />
            </div>
          )}

          {isFill && slide.practiceContent && (
            <FillBlankOptions
              textWithBlanks={(slide.practiceContent as FillBlanksContent).textWithBlanks}
              value={(answers[slide.id] as string) ?? ""}
              onChange={handleAnswerChange}
            />
          )}
        </div>

        <div className="pt-lg border-t border-border-card">
          <SlidePagination
            currentIndex={currentIndex}
            totalSlides={slides.length}
            onPrevious={onPrevious}
            onNext={onNext}
            onSlideChange={onSlideChange}
            label="Ejercicio"
          />
        </div>
      </div>

      {/* Side panel */}
      <PracticesSidePanel
        slideCount={slides.length}
        currentIndex={currentIndex}
        answered={answered}
        onSelect={handleSelectSlide}
        isOpen={panelOpen}
        onToggle={() => setPanelOpen((p) => !p)}
      />
    </div>
  );
}
