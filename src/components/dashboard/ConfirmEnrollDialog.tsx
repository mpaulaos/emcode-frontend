import { useEffect, useRef } from 'react';
import { Button } from 'react-aria-components';
import { X } from 'lucide-react';
import type { ExploreCourse } from '../../types/explore';

interface ConfirmEnrollDialogProps {
  course: ExploreCourse;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  error: string | null;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function ConfirmEnrollDialog({
  course,
  onConfirm,
  onCancel,
  isPending,
  error,
}: ConfirmEnrollDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    cancelRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" onClick={onCancel} />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="enroll-dialog-title"
        aria-describedby="enroll-dialog-desc"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          ref={dialogRef}
          className="relative flex w-[min(32rem,calc(100vw-2rem))] max-w-none flex-col gap-5 overflow-hidden rounded-2xl border border-border-card bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onCancel();
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="enroll-dialog-title" className="text-lg font-semibold text-text-headings">
                Inscribir curso
              </h2>
              <p id="enroll-dialog-desc" className="text-sm text-text-body">
                ¿Deseas inscribirte en el curso &ldquo;{course.title}&rdquo; con el profesor {course.teacherName}?
              </p>
            </div>
            <Button
              aria-label="Cerrar modal"
              onPress={onCancel}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          {error && (
            <div role="alert" className="rounded-lg bg-surface-danger/10 px-4 py-3 text-sm text-text-danger">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <button
              ref={cancelRef}
              type="button"
              onClick={onCancel}
              className="shrink-0 rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isPending}
              className="shrink-0 rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              {isPending ? 'Inscribiendo...' : 'Sí, inscribirme'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmEnrollDialog;
