import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TheoryLessonView } from "../components/TheoryLessonView";
import { PracticeLessonView } from "../components/PracticeLessonView";
import { useSlidesData } from "../hooks/useSlidesData";
import { useLessonsListData } from "../hooks/useLessonsList";
import { markLessonComplete } from "../hooks/useProgress";
import { useAuth } from "../context/AuthContext";
import type { Slide } from "../types/slide";

export default function LessonViewPage() {
  const { courseId, topicId, lessonId } = useParams<{
    courseId: string;
    topicId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { slides, loading, error } = useSlidesData(lessonId);
  const { lessons: lessonList } = useLessonsListData(topicId);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentLessonData = lessonList.find(
    (l) => l.id === Number(lessonId),
  );
  const lessonType = currentLessonData?.lessonType ?? "theory";
  const lessonName =
    currentLessonData?.lessonName ?? `Lección ${lessonId}`;
  const isPractice = lessonType === "practice";

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-surface-page">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
        >
          <p className="text-sm text-text-body" aria-live="polite">
            Cargando lección…
          </p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-surface-page">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
        >
          <p role="alert" className="text-sm text-text-danger">
            Error al cargar la lección: {error}
          </p>
        </main>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-surface-page">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
        >
          <p className="text-sm text-text-body">
            Esta lección no tiene contenido disponible.
          </p>
        </main>
      </div>
    );
  }

  const currentSlide = slides[currentSlideIndex] as Slide;

  function handlePrevious() {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  }

  function handleNext() {
    setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
  }

  function handleSlideChange(index: number) {
    setCurrentSlideIndex(index);
  }

  function handleBackToCourse() {
    if (lessonId && token) {
      markLessonComplete(Number(lessonId), token).catch(() => {});
    }
    navigate(`/courses/${courseId}`);
  }

  function handleNavigateToLesson(newLessonId: number) {
    if (lessonId && token) {
      markLessonComplete(Number(lessonId), token).catch(() => {});
    }
    navigate(`/courses/${courseId}/lesson/${topicId}/${newLessonId}`);
  }

  return (
    <div key={lessonId} className="flex min-h-screen flex-col bg-surface-page">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <button
          type="button"
          onClick={handleBackToCourse}
          className="flex items-center gap-2 text-sm text-text-body hover:text-text-headings transition w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-lg cursor-pointer"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al curso
        </button>

        {isPractice ? (
          <PracticeLessonView
            slides={slides}
            lessonName={lessonName}
            currentLessonId={Number(lessonId)}
            currentTopicId={Number(topicId)}
            currentIndex={currentSlideIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSlideChange={handleSlideChange}
            onNavigateToLesson={handleNavigateToLesson}
            onGoBack={handleBackToCourse}
          />
        ) : (
          <TheoryLessonView
            slide={currentSlide}
            lessonName={lessonName}
            currentLessonId={Number(lessonId)}
            currentTopicId={Number(topicId)}
            currentIndex={currentSlideIndex}
            totalSlides={slides.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSlideChange={handleSlideChange}
            onNavigateToLesson={handleNavigateToLesson}
          />
        )}
      </main>
    </div>
  );
}
