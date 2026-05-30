// src/components/wizard/types.ts

export interface CourseFormState {
  imageFile:File | null;
  imagePreview: string | null;
  title:string;
  subtitle:string;
  description:string;
}

export const limits = {
  title: 60,
  subtitle:80,
  description: 90,
}

export const initialFormState: CourseFormState = {
  imageFile:    null,
  imagePreview: null,
  title:'',
  subtitle:'',
  description:'',
}