import { useMemo } from "react";
import FocusTTS from "../ui/FocusTTS";
import {
  MenuTrigger,
  Button as AriaButton,
  Menu,
  MenuItem,
  Popover,
} from "react-aria-components";
import { BookOpen } from "lucide-react";

import { useLessonsListData } from "../../hooks/useLessonsList";
import SlidePagination from "../slides/SlidePagination";
import type { Slide } from "../../types/slide";

export interface TheoryLessonViewProps {
  slide: Slide;
  lessonName: string;
  currentLessonId: number;
  currentTopicId: number;
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
  onNavigateToLesson: (lessonId: number) => void;
}

export function TheoryLessonView({
  slide,
  lessonName,
  currentLessonId,
  currentTopicId,
  currentIndex,
  totalSlides,
  onPrevious,
  onNext,
  onSlideChange,
  onNavigateToLesson,
}: TheoryLessonViewProps) {
  const showImage = slide.slideType === "text_image" && !!slide.imageUrl;

  const formatSlideText = (text: string) =>
    text
      .trim()
      .replace(/\s*(•)\s*/g, "\n$1 ")
      .trim();

  const parsedContent = useMemo(() => {
    const blocks = slide.text.split(/\n\s*\n/).filter((b) => b.trim());
    if (blocks.length === 0) return null;

    const [first, ...rest] = blocks;
    return (
      <>
        <h2 className="mb-4 text-2xl font-bold text-text-headings">{formatSlideText(first)}</h2>
        {rest.length > 0 && (
          <div className="space-y-4">
            {rest.map((block, i) => (
              <p key={i} className="whitespace-pre-line text-body text-text-body leading-relaxed">
                {formatSlideText(block)}
              </p>
            ))}
          </div>
        )}
      </>
    );
  }, [slide.text]);

  const { lessons: allLessons } = useLessonsListData(String(currentTopicId));

  const slideSpeechText = useMemo(() => {
    const parts = [lessonName, slide.title || `Slide ${currentIndex + 1}`];
    if (slide.text) parts.push(slide.text);
    if (slide.imageAlt) parts.push(slide.imageAlt);
    return parts.filter(Boolean).join(". ");
  }, [currentIndex, lessonName, slide.imageAlt, slide.text, slide.title]);

  const menuLessons = useMemo(() => {
    const visible = allLessons.filter((l) => l.isVisible);
    const includesCurrent = visible.some((l) => l.id === currentLessonId);
    if (!includesCurrent) {
      const current = allLessons.find((l) => l.id === currentLessonId);
      if (current) return [...visible, current];
    }
    return visible;
  }, [allLessons, currentLessonId]);

  return (
    <div className="flex flex-col gap-lg">
      <MenuTrigger>
        <AriaButton
          aria-label={`Lección actual: ${lessonName}. Abrir menú de lecciones`}
          className="flex items-center gap-2 bg-primary-50 text-primary-700 font-semibold px-4 py-2 rounded-lg hover:bg-primary-100 cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <BookOpen size={16} aria-hidden="true" />
          Lección: {lessonName}
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

      <FocusTTS text={slideSpeechText}>
        <div
          className="bg-surface-primary border border-border-card rounded-xl p-lg lg:p-xl"
          role="region"
          aria-label="Contenido del slide"
        >
          {showImage ? (
            <section className="grid lg:grid-cols-2 gap-lg items-center">
              <div>
                {parsedContent}
              </div>
              <div className="bg-primary-700 rounded-xl aspect-[4/3] flex items-center justify-center p-md">
                <img
                  src={slide.imageUrl}
                  alt={slide.imageAlt ?? `Diagrama ilustrativo: ${slide.title ?? ''}`}
                  className="object-contain w-full h-full"
                />
              </div>
            </section>
          ) : (
            <section className="max-w-prose">
              {parsedContent}
            </section>
          )}
        </div>
      </FocusTTS>

      <div className="mt-lg pt-lg border-t border-border-card">
        <SlidePagination
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          onPrevious={onPrevious}
          onNext={onNext}
          onSlideChange={onSlideChange}
          label="Slide"
        />
      </div>
    </div>
  );
}
