import { useMemo, useState, useCallback, useEffect } from "react";
import {
  MenuTrigger,
  Button as AriaButton,
  Menu,
  MenuItem,
  Popover,
} from "react-aria-components";
import { FlaskConical, RotateCcw, ArrowRight } from "lucide-react";

import { Meter } from "./kit/Meter";
import { ChoiceOptionsList } from "./ChoiceOptionsList";
import { FillBlankOptions } from "./FillBlankOptions";
import { PracticesSidePanel } from "./PracticesSidePanel";
import SlidePagination from "./SlidePagination";
import { useLessonsListData } from "../hooks/useLessonsList";
import { submitQuiz, getLastQuizAttempt } from "../hooks/useProgress";
import { useAuth } from "../context/AuthContext";
import type { Slide, SingleChoiceContent, MultipleChoiceContent, FillBlanksContent } from "../types/slide";
import type { QuizResult, QuizSubmissionAnswer, LastQuizAttempt, GradedSlideResult } from "../types/progress";

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
  const { token } = useAuth();
  const [answers, setAnswers] = useState<AnswersState>({});
  const [panelOpen, setPanelOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    getLastQuizAttempt(currentLessonId, token).then((attempt) => {
      if (cancelled) return;
      if (attempt) {
        setQuizResult(rebuildQuizResult(attempt, slides));
      }
    }).catch(() => {}).finally(() => {
      if (!cancelled) setInitialLoading(false);
    });

    return () => { cancelled = true; };
  }, [currentLessonId, token]);

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
    if (!token) return;
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

      const result = await submitQuiz(currentLessonId, submissionAnswers, token);
      setQuizResult(result);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error al enviar el quiz");
    } finally {
      setSubmitting(false);
    }
  }, [slides, answers, token, currentLessonId]);

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

        <Meter value={progressPercent} label="Progreso" />

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
              blanks={(slide.practiceContent as FillBlanksContent).blanks}
              value={(answers[slide.id] as Record<string, string>) ?? {}}
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
