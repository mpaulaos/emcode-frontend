export type SlideTemplateType = 'text' | 'text_image' | 'single_choice' | 'multiple_choice' | 'fill_blank';

export const THEORY_TEMPLATES: SlideTemplateType[] = ['text', 'text_image'];
export const PRACTICE_TEMPLATES: SlideTemplateType[] = ['single_choice', 'multiple_choice', 'fill_blank'];

export function getTemplatesForLessonType(lessonType: 'theory' | 'practice'): SlideTemplateType[] {
  return lessonType === 'theory' ? THEORY_TEMPLATES : PRACTICE_TEMPLATES;
}

export const templateLabels: Record<SlideTemplateType, string> = {
  text: 'Texto',
  text_image: 'Texto + Imagen',
  single_choice: 'Selección única',
  multiple_choice: 'Selección múltiple',
  fill_blank: 'Completar textos',
};

export interface SlideOption {
  id: string;
  text: string;
}

export interface BlankItem {
  id: string;
  correctAnswer: string;
}

export interface SingleChoiceContent {
  question: string;
  options: SlideOption[];
  correctAnswer: string;
}

export interface MultipleChoiceContent {
  question: string;
  options: SlideOption[];
  correctAnswers: string[];
}

export interface FillBlanksContent {
  textWithBlanks: string;
  blanks: BlankItem[];
}

export interface Slide {
  id: number;
  lessonId: number;
  slideType: SlideTemplateType;
  title: string;
  text: string;
  order: number;
  imageUrl?: string;
  imageAlt?: string;
  practiceContent?: SingleChoiceContent | MultipleChoiceContent | FillBlanksContent;
}

export interface CreateSlideInput {
  slideType: SlideTemplateType;
  title: string;
  text: string;
  order: number;
  imageUrl?: string;
  imageAlt?: string;
  practiceContent?: SingleChoiceContent | MultipleChoiceContent | FillBlanksContent;
}

export interface UpdateSlideInput extends Partial<CreateSlideInput> {}

export interface DraftSlide {
  tempId: string;
  slideType: SlideTemplateType;
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  question: string;
  options: SlideOption[];
  correctAnswer: string;
  correctAnswers: string[];
  textWithBlanks: string;
  blanks: BlankItem[];
  isValid: boolean;
  isDirty: boolean;
}

let tempIdCounter = 0;
export function generateTempId(): string {
  tempIdCounter += 1;
  return `draft-${tempIdCounter}-${Date.now()}`;
}

export function createEmptyDraftSlide(slideType: SlideTemplateType): DraftSlide {
  const id1 = generateTempId();
  const id2 = generateTempId();
  return {
    tempId: generateTempId(),
    slideType,
    title: '',
    content: '',
    imageUrl: '',
    imageAlt: '',
    question: '',
    options: [{ id: id1, text: '' }, { id: id2, text: '' }],
    correctAnswer: '',
    correctAnswers: [],
    textWithBlanks: '',
    blanks: [],
    isValid: false,
    isDirty: false,
  };
}
