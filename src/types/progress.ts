export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

export interface StudentProgressRecord {
  id: number;
  userId: number;
  lessonId: number;
  completedAt: string;
}

export interface QuizSubmissionAnswer {
  slideId: number;
  value: string | string[] | Record<string, string>;
}

export interface GradedSlideResult {
  slideId: number;
  slideType: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: number;
  userId: number;
  lessonId: number;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  createdAt: string;
}

export interface QuizResult {
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  gradedSlides: GradedSlideResult[];
  attempt: QuizAttempt;
}

export interface LastQuizAttempt {
  id: number;
  userId: number;
  lessonId: number;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  answers: QuizSubmissionAnswer[];
  createdAt: string;
}
