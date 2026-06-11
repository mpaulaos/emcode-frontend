export interface Lesson {
  id: number;
  lessonName: string;
  lessonType: "theory" | "practice";
  isVisible: boolean;
}
