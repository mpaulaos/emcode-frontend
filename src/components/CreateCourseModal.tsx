import { useRef, useEffect } from "react";
import { Button } from "react-aria-components";
import { X } from "lucide-react";

import CourseWizard from "./CourseWizard";
import type { Course } from "../types/dashboard";

interface CreateCourseModalProps {
  onClose: () => void;
  onAddCourse: (course: Course) => void;
}

function CreateCourseModal({ onClose, onAddCourse }: CreateCourseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handlePublish(course: Course) {
    onAddCourse(course);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto flex h-fit w-full max-w-3xl min-w-150 flex-col gap-6 rounded-2xl bg-surface-primary p-6 shadow-xl backdrop:bg-black/50 open:flex"
    >
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
    </dialog>
  );
}

export default CreateCourseModal;