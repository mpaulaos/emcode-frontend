import { useState } from "react";
import { Button } from "react-aria-components";
import { useLessons } from "../../hooks/useLessons";
import type { Lesson } from "../../types/lesson";

interface LessonFormProps {
  topicId: string;
  onCancel: () => void;
  onPublish: (lesson: Lesson) => void;
  initialLesson?: Lesson;
}

function LessonForm({ topicId, onCancel, onPublish, initialLesson }: LessonFormProps) {
  const [lessonName, setLessonName] = useState(initialLesson?.lessonName ?? "");
  const [lessonType, setLessonType] = useState<"theory" | "practice">(initialLesson?.lessonType ?? "theory");
  const { createLesson, updateLesson, loading, error } = useLessons();

  const isEditing = !!initialLesson;
  const canSubmit = lessonName.trim().length > 0;

  async function handlePublish() {
    try {
      if (isEditing && initialLesson) {
        const updated = await updateLesson(initialLesson.id, {
          lessonName: lessonName.trim(),
          lessonType,
        });
        onPublish(updated);
      } else {
        const newLesson = await createLesson(topicId, {
          lessonName: lessonName.trim(),
          lessonType,
        });
        onPublish(newLesson);
      }
    } catch { /* error handled by hook */ }
  }

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-1 text-sm text-text-body">
        Nombre de la lección
        <input
          aria-label="Ingresar nombre de la lección"
          type="text"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          className="rounded-lg border border-border-card px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          autoFocus
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-text-body">Tipo de lección</span>
        <div className="flex gap-3" role="radiogroup" aria-label="Tipo de lección">
          <Button
            aria-label="Seleccionar tipo de lección teórica"
            aria-pressed={lessonType === "theory"}
            onPress={() => setLessonType("theory")}
            className={`rounded-lg border px-5 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-border-focus ${
              lessonType === "theory"
                ? "border-surface-action bg-surface-action text-text-on-action"
                : "border-border-card text-text-body hover:bg-surface-card"
            }`}
          >
            Teórica
          </Button>

          <Button
            aria-label="Seleccionar tipo de lección práctica"
            aria-pressed={lessonType === "practice"}
            onPress={() => setLessonType("practice")}
            className={`rounded-lg border px-5 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-border-focus ${
              lessonType === "practice"
                ? "border-surface-action bg-surface-action text-text-on-action"
                : "border-border-card text-text-body hover:bg-surface-card"
            }`}
          >
            Práctica
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-text-danger">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <Button
          aria-label="Cancelar"
          onPress={onCancel}
          className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Cancelar
        </Button>

        <Button
          aria-label="Publicar lección"
          isDisabled={!canSubmit || loading}
          onPress={handlePublish}
          className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {loading ? "Guardando..." : isEditing ? "Guardar" : "Crear"}
        </Button>
      </div>
    </div>
  );
}

export default LessonForm;