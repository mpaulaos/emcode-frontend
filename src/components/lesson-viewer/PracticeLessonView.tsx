import { useMemo, useState, useCallback, useEffect } from "react";
import FocusTTS from "../ui/FocusTTS";
import { FlaskConical, RotateCcw, ArrowRight } from "lucide-react";

import { Meter } from "../kit/Meter";
import { ChoiceOptionsList } from "../slides/ChoiceOptionsList";
import { FillBlankOptions } from "../slides/FillBlankOptions";
import { PracticesSidePanel } from "./PracticesSidePanel";
import { LessonSelector } from "./LessonSelector";
import SlidePagination from "../slides/SlidePagination";
import { useLessonsListData } from "../../hooks/useLessonsList";
import { submitQuiz, getLastQuizAttempt } from "../../hooks/useProgress";
import { useButtonTTS } from "../../hooks/useButtonTTS";
import { useAccessibility } from "../../hooks/useAccessibility";
import { getFriendlyErrorMessage } from "../../lib/friendlyErrors";
import type { Slide, SingleChoiceContent, MultipleChoiceContent, FillBlanksContent } from "../../types/slide";
import type { QuizResult, QuizSubmissionAnswer, LastQuizAttempt, GradedSlideResult } from "../../types/progress";

function rebuildQuizResult(attempt: LastQuizAttempt, slides: Slide[]): QuizResult {
  const gradedSlides: GradedSlideResult[] = slides
    .filter((s) => s.slideType === "single_choice" || s.slideType === "multiple_choice" || s.slideType === "fill_blank")
    .map((s) => {
      const userAnswer = attempt.answers.find((a) => a.slideId === s.id);
      let isCorrect = false;

      if (userAnswer && s.practiceContent) {
        if (s.slideType === "single_choice") {
          const content = s.practiceContent as SingleChoiceContent;
          isCorrect = userAnswer.value === content.correctAnswer;
        } else if (s.slideType === "multiple_choice") {
          const content = s.practiceContent as MultipleChoiceContent;
          const userArr = userAnswer.value as string[];
          const correctArr = content.correctAnswers;
          isCorrect =
            userArr.length === correctArr.length &&
            userArr.every((v) => correctArr.includes(v));
        } else if (s.slideType === "fill_blank") {
          const content = s.practiceContent as FillBlanksContent;
          const userMap = userAnswer.value as Record<string, string>;
          isCorrect = content.blanks.every(
            (b) =>
              userMap[b.id]?.trim().toLowerCase() === b.correctAnswer.trim().toLowerCase(),
          );
        }
      }

      return { slideId: s.id, slideType: s.slideType, isCorrect };
    });

  return {
    score: attempt.score,
    correctCount: attempt.correctCount,
    incorrectCount: attempt.incorrectCount,
    totalQuestions: attempt.totalQuestions,
    gradedSlides,
    attempt: {
      id: attempt.id,
      userId: attempt.userId,
      lessonId: attempt.lessonId,
      score: attempt.score,
      correctCount: attempt.correctCount,
      incorrectCount: attempt.incorrectCount,
      totalQuestions: attempt.totalQuestions,
      createdAt: attempt.createdAt,
    },
  };
}

type AnswersState = Record<number, string | string[] | Record<string, string>>;

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
  onGoBack: () => void;
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
  onGoBack,
}: PracticeLessonViewProps) {
  const { settings } = useAccessibility();
  const [answers, setAnswers] = useState<AnswersState>({});
  const [panelOpen, setPanelOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getLastQuizAttempt(currentLessonId).then((attempt) => {
      if (cancelled) return;
      if (attempt) {
        setQuizResult(rebuildQuizResult(attempt, slides));
      }
    }).catch(() => {}).finally(() => {
      if (!cancelled) setInitialLoading(false);
    });

    return () => { cancelled = true; };
  }, [currentLessonId]);

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

  const answeredCount = answered.filter(Boolean).length;
  const progressPercent = slides.length > 0
    ? Math.round((answeredCount / slides.length) * 100)
    : 0;

  const results = useMemo(() => {
    if (!quizResult) return undefined;
    return slides.map((s) => {
      const graded = quizResult.gradedSlides.find((g) => g.slideId === s.id);
      return { isCorrect: graded?.isCorrect ?? false };
    });
  }, [quizResult, slides]);

  const isChoice =
    slide.slideType === "single_choice" || slide.slideType === "multiple_choice";
  const isFill = slide.slideType === "fill_blank";
  const nextLessonTTS = useButtonTTS("Siguiente");

  const hasPracticeSlides = slides.some(
    (s) => s.slideType === "single_choice" || s.slideType === "multiple_choice" || s.slideType === "fill_blank",
  );

  function handleAnswerChange(value: string | string[] | Record<string, string>) {
    setAnswers((prev) => ({ ...prev, [slide.id]: value }));
  }

  function handleSelectSlide(index: number) {
    onSlideChange(index);
    setPanelOpen(false);
  }

  const handleSubmitQuiz = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const submissionAnswers: QuizSubmissionAnswer[] = slides
        .filter((s) => s.id in answers)
        .map((s) => {
          let value: string | string[] | Record<string, string>;
          if (s.slideType === "fill_blank") {
            value = answers[s.id] as Record<string, string>;
          } else if (s.slideType === "multiple_choice") {
            value = answers[s.id] as string[];
          } else {
            value = answers[s.id] as string;
          }
          return { slideId: s.id, value };
        });

      const result = await submitQuiz(currentLessonId, submissionAnswers);
      setQuizResult(result);
    } catch (err) {
      setSubmitError(getFriendlyErrorMessage(err, "No pudimos enviar tus respuestas. Inténtalo de nuevo."));
    } finally {
      setSubmitting(false);
    }
  }, [slides, answers, currentLessonId]);

  function handleRetry() {
    setAnswers({});
    setQuizResult(null);
    setSubmitError(null);
    onSlideChange(0);
  }

  if (initialLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <p className="text-sm text-text-body">Cargando laboratorio…</p>
      </div>
    );
  }

  if (quizResult) {
    return (
      <div className="flex flex-col gap-lg md:flex-row">
        <div className="flex-1 space-y-lg">
          <div className="flex flex-col items-center gap-6 py-8">
            <p className="text-2xl font-bold text-text-headings">Laboratorio completado</p>
            <div className="size-36 rounded-full border-4 border-primary flex items-center justify-center">
              <span className="text-4xl font-bold text-text-headings">
                {quizResult.score}
              </span>
            </div>

            <div className="flex gap-6">
              <span className="text-lg text-text-body">
                <span className="font-semibold text-green-600">{quizResult.correctCount}</span>
                /{quizResult.totalQuestions} correctas
              </span>
              <span className="text-lg text-text-body">
                <span className="font-semibold text-red-500">{quizResult.incorrectCount}</span>
                /{quizResult.totalQuestions} incorrectas
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-2 rounded-lg border border-border-card px-6 py-2 text-sm font-semibold text-text-body hover:bg-surface-card transition cursor-pointer"
              >
                <RotateCcw size={16} />
                Reintentar
              </button>
              <button
                type="button"
                onClick={onGoBack}
                onFocus={nextLessonTTS.onFocus}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-text-on-action hover:bg-surface-action-hover transition cursor-pointer"
              >
                Siguiente
                <ArrowRight size={16} />
              </button>
            </div>

            {submitError && (
              <p className="text-sm text-text-danger">{submitError}</p>
            )}
          </div>
        </div>

        <PracticesSidePanel
          slideCount={slides.length}
          currentIndex={currentIndex}
          answered={answered}
          results={results}
          onSelect={handleSelectSlide}
          isOpen={panelOpen}
          onToggle={() => setPanelOpen((p) => !p)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg md:flex-row">
      <div className="flex-1 space-y-lg">
        <LessonSelector
          label="Laboratorio"
          currentLessonId={currentLessonId}
          currentLessonName={lessonName}
          lessons={menuLessons}
          icon={<FlaskConical size={16} aria-hidden="true" />}
          variant="practice"
          onNavigate={onNavigateToLesson}
        />

        <Meter value={progressPercent} label="Progreso" />

        <FocusTTS focusable={false} focusChildrenOnly>
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
                <p
                  id={`practice-question-${slide.id}`}
                  tabIndex={settings.ttsEnabled ? 0 : undefined}
                  className="text-body text-text-body leading-relaxed whitespace-pre-line text-pretty focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
                >
                  {(slide.practiceContent as SingleChoiceContent | MultipleChoiceContent).question}
                </p>
                <ChoiceOptionsList
                  type={slide.slideType === "single_choice" ? "single" : "multiple"}
                  options={(slide.practiceContent as SingleChoiceContent | MultipleChoiceContent).options}
                  value={(answers[slide.id] ?? (slide.slideType === "single_choice" ? "" : [])) as string | string[]}
                  labelledBy={`practice-question-${slide.id}`}
                  onChange={handleAnswerChange}
                />
              </div>
            )}

            {isFill && slide.practiceContent && (
              <FillBlankOptions
                textWithBlanks={(slide.practiceContent as FillBlanksContent).textWithBlanks}
                blanks={(slide.practiceContent as FillBlanksContent).blanks}
                value={(answers[slide.id] as Record<string, string>) ?? {}}
                onChange={handleAnswerChange}
              />
            )}
          </div>
        </FocusTTS>

        <div className="pt-lg border-t border-border-card">
          <SlidePagination
            currentIndex={currentIndex}
            totalSlides={slides.length}
            onPrevious={onPrevious}
            onNext={onNext}
            onSlideChange={onSlideChange}
            label="Ejercicio"
            onComplete={hasPracticeSlides ? handleSubmitQuiz : undefined}
            completeLabel="Terminar quiz"
            completing={submitting}
          />
        </div>

        {submitError && (
          <p className="text-sm text-text-danger">{submitError}</p>
        )}
      </div>

      <PracticesSidePanel
        slideCount={slides.length}
        currentIndex={currentIndex}
        answered={answered}
        results={results}
        onSelect={handleSelectSlide}
        isOpen={panelOpen}
        onToggle={() => setPanelOpen((p) => !p)}
      />
    </div>
  );
}
