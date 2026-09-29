import { useMemo } from "react";
import FocusTTS from "../ui/FocusTTS";
import { BookOpen } from "lucide-react";

import { useLessonsListData } from "../../hooks/useLessonsList";
import SlidePagination from "../slides/SlidePagination";
import { LessonSelector } from "./LessonSelector";
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
      <LessonSelector
        label="Lección"
        currentLessonId={currentLessonId}
        currentLessonName={lessonName}
        lessons={menuLessons}
        icon={<BookOpen size={16} aria-hidden="true" />}
        variant="theory"
        onNavigate={onNavigateToLesson}
      />

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
