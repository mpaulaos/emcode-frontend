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
  title?: string;
  text: string;
  order: number;
  imageUrl?: string;
  imageAlt?: string;
  practiceContent?: SingleChoiceContent | MultipleChoiceContent | FillBlanksContent;
}

export interface CreateSlideInput {
  slideType: SlideTemplateType;
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
  existingId?: number;
}

let tempIdCounter = 0;
export function generateTempId(): string {
  tempIdCounter += 1;
  return `draft-${tempIdCounter}-${Date.now()}`;
}

export function slideToDraftSlide(slide: Slide): DraftSlide {
  const id1 = generateTempId();
  const id2 = generateTempId();
  const base: DraftSlide = {
    tempId: generateTempId(),
    slideType: slide.slideType,
    title: '',
    content: '',
    imageUrl: slide.imageUrl ?? '',
    imageAlt: slide.imageAlt ?? '',
    question: '',
    options: [{ id: id1, text: '' }, { id: id2, text: '' }],
    correctAnswer: '',
    correctAnswers: [],
    textWithBlanks: '',
    blanks: [],
    isValid: true,
    isDirty: false,
    existingId: slide.id,
  };

  if (slide.slideType === 'text' || slide.slideType === 'text_image') {
    const parts = slide.text.split('\n\n');
    if (parts.length >= 2) {
      base.title = parts[0];
      base.content = parts.slice(1).join('\n\n');
    } else {
      base.content = slide.text;
    }
    if (slide.slideType === 'text' && !base.content) {
      base.content = slide.text;
    }
  }

  if (slide.slideType === 'single_choice' || slide.slideType === 'multiple_choice') {
    base.question = slide.text;
    const pc = slide.practiceContent as SingleChoiceContent | MultipleChoiceContent | undefined;
    if (pc) {
      base.options = pc.options.length > 0 ? pc.options : base.options;
      if (slide.slideType === 'single_choice') {
        base.correctAnswer = (pc as SingleChoiceContent).correctAnswer;
      } else {
        base.correctAnswers = (pc as MultipleChoiceContent).correctAnswers;
      }
    }
  }

  if (slide.slideType === 'fill_blank') {
    base.question = slide.text;
    base.textWithBlanks = (slide.practiceContent as FillBlanksContent)?.textWithBlanks ?? '';
    base.blanks = (slide.practiceContent as FillBlanksContent)?.blanks ?? [];
  }

  return base;
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
