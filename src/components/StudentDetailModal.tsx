import { Button } from "react-aria-components";
import { X } from "lucide-react";

import StudentAvatar from "./StudentAvatar";
import { useStudentDetail } from "../hooks/useStudentList";

interface StudentDetailModalProps {
  studentId: number;
  onClose: () => void;
}

function StudentDetailModal({ studentId, onClose }: StudentDetailModalProps) {
  const { data: student, loading, error } = useStudentDetail(studentId);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-detail-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex max-h-[calc(100vh-2rem)] w-[min(42rem,calc(100vw-2rem))] max-w-none flex-col gap-6 overflow-y-auto rounded-2xl border border-border-card bg-white p-6 shadow-xl sm:p-8"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          <div className="flex items-center justify-between">
            <h2 id="student-detail-title" className="text-lg font-semibold text-text-headings">
              Detalle del estudiante
            </h2>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          {loading && <p className="text-sm text-text-body">Cargando...</p>}
          {error && <p className="text-sm text-text-danger">{error}</p>}

          {student && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 rounded-xl bg-surface-card p-3">
                <StudentAvatar firstName={student.firstName} lastName={student.lastName} />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-text-headings">
                    {student.firstName} {student.lastName}
                  </span>
                  <span className="truncate text-xs text-text-disabled">{student.email}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-headings">Discapacidad</p>
                <div className="flex flex-wrap gap-1.5">
                  {student.disabilities.length === 0 ? (
                    <span className="text-sm text-text-body">Ninguna</span>
                  ) : (
                    student.disabilities.map((d) => (
                      <span
                        key={d.id}
                        className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
                      >
                        {d.name}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-headings">Cursos</p>
                <div className="flex flex-wrap gap-1.5">
                  {student.courses.length === 0 ? (
                    <span className="text-sm text-text-body">Sin cursos asignados</span>
                  ) : (
                    student.courses.map((c) => (
                      <span
                        key={c.id}
                        className="rounded-full bg-surface-card px-2.5 py-0.5 text-xs font-medium text-text-body"
                      >
                        {c.title}
                      </span>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentDetailModal;
