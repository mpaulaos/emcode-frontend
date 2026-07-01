import StudentAvatar from "./StudentAvatar";
import ProgressBar from "../ui/ProgressBar";
import StudentActionsMenu from "./StudentActionsMenu";
import type { CourseStudent, Student } from "../../types/Student";

interface TeacherRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface CourseStudentListProps {
  teacher?: TeacherRow | null;
  students?: Student[];
  courseStudents?: CourseStudent[];
  onViewDetails: (studentId: number) => void;
  onEdit: (studentId: number) => void;
  onRemove: (studentId: number) => void;
  removeLabel?: string;
}

function disabilityLabel(disabilities: { name: string }[]) {
  if (disabilities.length === 0) return "Ninguna";
  return disabilities.map((d) => d.name).join(", ");
}

function CourseStudentList({
  teacher,
  students,
  courseStudents,
  onViewDetails,
  onEdit,
  onRemove,
  removeLabel,
}: CourseStudentListProps) {
  const isCourseView = courseStudents !== undefined;
  const rows = isCourseView ? courseStudents! : students ?? [];
  const hasStudents = rows.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Header de columnas — desktop only */}
      <div className="hidden grid-cols-[auto_1fr_1fr_auto_auto] items-center gap-4 border-b border-border-card px-4 pb-2 sm:grid">
        <div className="w-8" />
        <span className="text-xs font-semibold uppercase tracking-wide text-text-disabled">Nombre</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-text-disabled">Discapacidad</span>
        <span className="w-40 text-xs font-semibold uppercase tracking-wide text-text-disabled">
          {isCourseView ? "Progreso" : "Cursos"}
        </span>
        <div className="w-8" />
      </div>

      <ul className="flex flex-col gap-3">
        {teacher && (
          <li className="flex flex-col gap-1.5 rounded-xl border-l-4 border-primary bg-white px-4 py-3 shadow-sm sm:grid sm:grid-cols-[auto_1fr_1fr_auto_auto] sm:items-center sm:gap-4">
            <div className="flex items-center gap-3 sm:contents">
              <StudentAvatar firstName={teacher.firstName} lastName={teacher.lastName} />
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold text-text-headings">
                  {teacher.firstName} {teacher.lastName}
                </span>
                <span className="text-xs text-text-disabled">Docente del curso</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:contents">
              <span className="text-xs text-text-disabled sm:hidden">Discapacidad</span>
              <span className="text-sm text-text-disabled">—</span>
            </div>

            <div className="flex items-center justify-between sm:contents">
              <span className="text-xs text-text-disabled sm:hidden">Progreso</span>
              <div className="w-full sm:w-40 text-sm text-text-disabled">—</div>
            </div>

            <div className="hidden sm:block w-8" />
          </li>
        )}

        {rows.map((student) => (
          <li
            key={student.id}
            className="flex flex-col gap-1.5 rounded-xl border-l-4 border-primary bg-white px-4 py-3 shadow-sm sm:grid sm:grid-cols-[auto_1fr_1fr_auto_auto] sm:items-center sm:gap-4"
          >
            {/* Avatar + Name + mobile actions */}
            <div className="flex items-center justify-between gap-3 sm:contents">
              <div className="flex items-center gap-3">
                <StudentAvatar firstName={student.firstName} lastName={student.lastName} />
                <span className="text-sm font-semibold text-text-headings">
                  {student.firstName} {student.lastName}
                </span>
              </div>
              <div className="sm:hidden">
                <StudentActionsMenu
                  studentName={`${student.firstName} ${student.lastName}`}
                  removeLabel={removeLabel}
                  onViewDetails={() => onViewDetails(student.id)}
                  onEdit={() => onEdit(student.id)}
                  onRemove={() => onRemove(student.id)}
                />
              </div>
            </div>

            {/* Disability */}
            <div className="flex items-center justify-between sm:contents">
              <span className="text-xs text-text-disabled sm:hidden">Discapacidad</span>
              <span className="text-sm text-text-body">
                {disabilityLabel(student.disabilities)}
              </span>
            </div>

            {/* Progress / Courses */}
            <div className="flex items-center justify-between sm:contents">
              <span className="text-xs text-text-disabled sm:hidden">
                {isCourseView ? "Progreso" : "Cursos"}
              </span>
              <div className="w-full sm:w-40">
                {isCourseView ? (
                  <ProgressBar
                    value={(student as CourseStudent).progress}
                    label={`Progreso de ${student.firstName}`}
                  />
                ) : (
                  <span className="truncate text-sm text-text-body">
                    {(student as Student).courses.length === 0
                      ? "Sin cursos"
                      : (student as Student).courses.map((c) => c.title).join(", ")}
                  </span>
                )}
              </div>
            </div>

            {/* Actions — desktop only */}
            <div className="hidden sm:block">
              <StudentActionsMenu
                studentName={`${student.firstName} ${student.lastName}`}
                removeLabel={removeLabel}
                onViewDetails={() => onViewDetails(student.id)}
                onEdit={() => onEdit(student.id)}
                onRemove={() => onRemove(student.id)}
              />
            </div>
          </li>
        ))}

        {!hasStudents && !teacher && (
          <li className="rounded-xl bg-surface-card px-4 py-8 text-center text-sm text-text-body">
            {isCourseView
              ? "Todavía no hay estudiantes inscritos en este curso."
              : "Todavía no tenés estudiantes registrados."}
          </li>
        )}
      </ul>
    </div>
  );
}

export default CourseStudentList;