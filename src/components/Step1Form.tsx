// src/components/wizard/Step1Form.tsx
import {
  Form, TextField, Label,
  Input, TextArea, Button, FileTrigger,
} from 'react-aria-components';
import { CharCounter } from './CharCounter';
import type { CourseFormState } from './modalData';
import { limits } from './modalData';

interface Step1FormProps {
  formState:    CourseFormState;
  onFormChange: (next: Partial<CourseFormState>) => void;
  onCancel:     () => void;
  onNext:       () => void;
}

function Step1Form({ formState, onFormChange, onCancel, onNext }: Step1FormProps) {
  const { imageFile, title, subtitle, description } = formState;

  const canAdvance = title.trim().length > 0;

  function handleImageSelect(files: FileList | null) {
    const file = files?.[0] ?? null;
    onFormChange({
      imageFile:    file,
      imagePreview: file ? URL.createObjectURL(file) : null,
    });
  }

  return (
    <Form
      onSubmit={(e) => { e.preventDefault(); if (canAdvance) onNext(); }}
      className="flex flex-col gap-5"
    >
      {/* Imagen de portada */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-900">
          Imagen de portada
        </span>
        <FileTrigger acceptedFileTypes={['image/*']} onSelect={handleImageSelect}>
          <Button className="w-fit cursor-pointer rounded-lg border border-solid border-violet-700 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700">
            {imageFile ? 'Cambiar imagen' : 'Seleccionar imagen'}
          </Button>
        </FileTrigger>
        {imageFile && (
          <p className="text-xs text-gray-500">{imageFile.name}</p>
        )}
      </div>

      {/* Título */}
      <TextField
        isRequired
        value={title}
        onChange={(val) => val.length <= limits.title && onFormChange({ title: val })}
      >
        <Label className="text-sm font-semibold text-gray-900">
          Título{' '}
          <span aria-hidden="true" className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="Ej: Programación web con React"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300"
        />
        <CharCounter current={title.length} limit={limits.title} />
      </TextField>

      {/* Subtítulo */}
      <TextField
        value={subtitle}
        onChange={(val) => val.length <= limits.subtitle && onFormChange({ subtitle: val })}
      >
        <Label className="text-sm font-semibold text-gray-900">
          Subtítulo{' '}
          <span className="font-normal text-gray-400">(opcional)</span>
        </Label>
        <Input
          placeholder="Ej: React 18, Node.js y bases de datos"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300"
        />
        <CharCounter current={subtitle.length} limit={limits.subtitle} />
      </TextField>

      {/* Descripción */}
      <TextField
        value={description}
        onChange={(val) => val.length <= limits.description && onFormChange({ description: val })}
      >
        <Label className="text-sm font-semibold text-gray-900">
          Descripción del curso{' '}
          <span className="font-normal text-gray-400">(opcional)</span>
        </Label>
        <TextArea
          placeholder="Describe brevemente de qué trata el curso..."
          rows={3}
          className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-700 focus-visible:ring-2 focus-visible:ring-violet-300"
        />
        <CharCounter current={description.length} limit={limits.description} />
      </TextField>

      {/* Pie */}
      <div className="flex items-center justify-between pt-2">
        <Button
          onPress={onCancel}
          className="w-32 cursor-pointer rounded-lg border border-solid border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          isDisabled={!canAdvance}
          className="w-32 cursor-pointer rounded-lg border-none bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </Button>
      </div>
    </Form>
  );
}

export default Step1Form;