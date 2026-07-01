import { Button } from "react-aria-components";
import { X } from "lucide-react";

interface RemoveStudentConfirmModalProps {
  studentName: string;
  courseName?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

function RemoveStudentConfirmModal({
  studentName,
  courseName,
  loading,
  onClose,
  onConfirm,
}: RemoveStudentConfirmModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-student-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex w-[min(32rem,calc(100vw-2rem))] max-w-none flex-col gap-5 overflow-hidden rounded-2xl border border-border-card bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="remove-student-title" className="text-lg font-semibold text-text-headings">
                Remover del curso
              </h2>
              <p className="text-sm text-text-body">
                {courseName
                  ? `Seguro que querés remover a ${studentName} del curso ${courseName}?`
                  : `Seguro que querés remover a ${studentName} del curso?`}
              </p>
            </div>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="shrink-0 rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              {loading ? "Removiendo..." : "Remover"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveStudentConfirmModal;