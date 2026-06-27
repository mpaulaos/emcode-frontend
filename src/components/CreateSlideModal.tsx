import { Button } from "react-aria-components";
import { X } from "lucide-react";

import CourseWizard from "./CourseWizard";
import type { Course } from "../types/dashboard";

interface CreateCourseModalProps {
  onClose: () => void;
  onAddCourse: (course: Course) => void;
}

function CreateCourseModal({ onClose, onAddCourse }: CreateCourseModalProps) {
  function handlePublish(course: Course) {
    onAddCourse(course);
    onClose();
  }

  return (
    <>
      {/*overlay*/}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex w-full max-w-[48rem] min-w-150 flex-col gap-6 rounded-2xl bg-surface-primary p-6 shadow-xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
          {/*Header*/}
          <div className="flex items-center justify-between">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-text-headings"
            >
              Crear curso
            </h2>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          <CourseWizard onCancel={onClose} onPublish={handlePublish} />
        </div>
      </div>
    </>
  );
}

export default CreateCourseModal;