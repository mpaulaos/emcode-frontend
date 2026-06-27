import { useState } from "react";
import { Button } from "react-aria-components";
import { X } from "lucide-react";

import StudentForm from "./StudentForm";
import type { StudentFormValues } from "./StudentForm";
import { useCreateStudent, useUpdateStudent, useDisabilities } from "../hooks/useStudentList";
import type { Student } from "../types/Student";

interface CourseOption {
  id: number;
  title: string;
}

interface AddOrEditStudentModalProps {
  courseId?: number;
  availableCourses?: CourseOption[];
  studentToEdit?: Student | null;
  onClose: () => void;
  onSaved: (student: Student) => void;
}

const emptyValues: StudentFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  disabilityIds: [],
};

function AddOrEditStudentModal({
  courseId,
  availableCourses,
  studentToEdit,
  onClose,
  onSaved,
}: AddOrEditStudentModalProps) {
  const mode = studentToEdit ? "edit" : "create";
  const showCourseSelector = mode === "create" && !courseId && (availableCourses?.length ?? 0) > 0;

  const [values, setValues] = useState<StudentFormValues>(
    studentToEdit
      ? {
          firstName: studentToEdit.firstName,
          lastName: studentToEdit.lastName,
          email: studentToEdit.email,
          disabilityIds: studentToEdit.disabilities.map((d) => d.id),
        }
      : emptyValues,
  );
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const { createStudent, loading: creating, error: createError } = useCreateStudent();
  const { updateStudent, loading: updating, error: updateError } = useUpdateStudent();
  const { data: disabilityOptions, loading: disabilitiesLoading, error: disabilitiesError } = useDisabilities();

  function handleChange<K extends keyof StudentFormValues>(field: K, value: StudentFormValues[K]) {
    setFormError(null);
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleCourse(id: number) {
    setFormError(null);
    setSelectedCourseIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit() {
    if (!values.firstName.trim() || !values.lastName.trim()) {
      setFormError("Ingresá el nombre y el apellido del estudiante.");
      return;
    }
    if (!isValidEmail(values.email.trim())) {
      setFormError("Ingresá un correo electrónico válido.");
      return;
    }

    const courseIds = courseId ? [courseId] : selectedCourseIds;
    if (mode === "create" && courseIds.length === 0) {
      setFormError("Asigná al menos un curso para continuar.");
      return;
    }

    try {
      if (mode === "create") {
        const student = await createStudent({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          disabilityIds: values.disabilityIds,
          courseIds,
        });
        onSaved(student);
      } else if (studentToEdit) {
        const student = await updateStudent(studentToEdit.id, {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          disabilityIds: values.disabilityIds,
        });
        onSaved(student);
      }
    } catch { /* error handled by hook */ }
  }

  const mappedDisabilityOptions = (disabilityOptions ?? []).map((d) => ({ value: d.id, label: d.name }));
  const apiError = mode === "create" ? createError : updateError;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex w-[min(42rem,calc(100vw-2rem))] max-w-none flex-col gap-6 overflow-hidden rounded-2xl border border-border-card bg-white p-6 shadow-xl sm:p-8"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          <div className="flex items-center justify-between">
            <h2 id="student-modal-title" className="text-lg font-semibold text-text-headings">
              {mode === "create" ? "Agregar Estudiante" : "Editar Estudiante"}
            </h2>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          <p className="text-sm font-medium text-text-headings">
            {mode === "create" ? "Datos del estudiante" : "Información del Estudiante"}
          </p>

          <StudentForm
            mode={mode}
            values={values}
            onChange={handleChange}
            disabilityOptions={mappedDisabilityOptions}
            disabilitiesLoading={disabilitiesLoading}
            disabilitiesError={disabilitiesError}
            error={formError ?? apiError}
            onCancel={onClose}
            onSubmit={handleSubmit}
            loading={creating || updating}
            courseSelector={
              showCourseSelector ? (
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-text-headings">Asignar a curso(s)</span>
                  <div className="flex flex-col gap-1.5 rounded-lg border border-border-card bg-white p-2">
                    {availableCourses!.map((course) => (
                      <label key={course.id} className="flex items-center gap-2 text-sm text-text-body">
                        <input
                          type="checkbox"
                          checked={selectedCourseIds.includes(course.id)}
                          onChange={() => toggleCourse(course.id)}
                          className="h-4 w-4 rounded border-border-card text-primary focus:ring-2 focus:ring-border-focus"
                        />
                        {course.title}
                      </label>
                    ))}
                  </div>
                </div>
              ) : null
            }
          />
        </div>
      </div>
    </>
  );
}

export default AddOrEditStudentModal;
