import { Button } from "react-aria-components";
import { X } from "lucide-react";

import LessonForm from "./lessonForm";
import type { Lesson } from "../../types/lesson";

interface EditLessonModalProps {
  topicId: string;
  lesson: Lesson;
  onClose: () => void;
  onLessonUpdated: (lesson: Lesson) => void;
}

function EditLessonModal({ topicId, lesson, onClose, onLessonUpdated }: EditLessonModalProps) {
  function handlePublish(updated: Lesson) {
    onLessonUpdated(updated);
    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-lesson-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex w-[min(56rem,calc(100vw-2rem))] max-w-none max-h-[calc(100vh-2rem)] flex-col gap-6 rounded-2xl bg-surface-primary p-6 shadow-xl overflow-y-auto overflow-x-visible"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
          <div className="flex items-center justify-between">
            <h2
              id="edit-lesson-modal-title"
              className="text-lg font-semibold text-text-headings"
            >
              Editar lección
            </h2>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          <LessonForm topicId={topicId} initialLesson={lesson} onCancel={onClose} onPublish={handlePublish} />
        </div>
      </div>
    </>
  );
}

export default EditLessonModal;
