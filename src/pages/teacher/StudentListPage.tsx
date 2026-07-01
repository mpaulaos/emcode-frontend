import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";

import CourseStudentList from "../../components/students/CourseStudentList";
import SearchBar from "../../components/ui/SearchBar";
import Pagination from "../../components/ui/Pagination";
import AddOrEditStudentModal from "../../components/students/StudentModal";
import StudentDetailModal from "../../components/students/StudentDetailModal";
import RemoveStudentConfirmModal from "../../components/students/StudentActionModal";
import { useCourseStudents, useRemoveStudentFromCourse } from "../../hooks/useStudentList";
import type { CourseStudent, Student } from "../../types/Student";

const PAGE_SIZE = 4;

function StudentListPage() {
  const { id: courseId } = useParams<{ id: string }>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToView, setStudentToView] = useState<number | null>(null);
  const [studentToRemove, setStudentToRemove] = useState<CourseStudent | null>(null);

  const { data, loading, error, refetch } = useCourseStudents(courseId, query, page, PAGE_SIZE);
  const { removeStudent, loading: removing } = useRemoveStudentFromCourse();

  const totalPages = data ? Math.max(Math.ceil(data.total / data.pageSize), 1) : 1;

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleStudentSaved() {
    setShowAddModal(false);
    setStudentToEdit(null);
    refetch();
  }

  async function handleRemove(studentId: number) {
    const student = data?.items.find((s) => s.id === studentId);
    if (!student) return;
    setStudentToRemove(student);
  }

  function handleEdit(studentId: number) {
    const student = data?.items.find((s) => s.id === studentId);
    if (!student) return;
    setStudentToEdit({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      disabilities: student.disabilities,
      courses: [],
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-6 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <Link
          to="/teacher"
          className="flex w-fit items-center gap-1.5 text-sm  text-text-body hover:text-text-headings  focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver 
        </Link>

        <section aria-label="Estudiantes del curso" className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-text-headings">Estudiantes del Curso</h1>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-text-headings">Buscar estudiante</span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SearchBar
                value={query}
                onChange={handleSearchChange}
                placeholder="Escribe el nombre que buscas"
                aria-label="Buscar estudiante por nombre"
              />
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-surface-action px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <UserPlus size={18} aria-hidden="true" />
                Agregar
              </button>
            </div>
          </div>

          {loading && (
            <p className="text-sm text-text-body" aria-live="polite">
              Cargando estudiantes...
            </p>
          )}
          {error && <p className="text-sm text-text-danger">{error}</p>}

          {!loading && !error && data && (
            <>
              <CourseStudentList
                teacher={data.teacher}
                courseStudents={data.items}
                removeLabel="Remover del curso"
                onViewDetails={(studentId) => setStudentToView(studentId)}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />

              {data.total > data.pageSize && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              )}
            </>
          )}
        </section>
      </main>

      {showAddModal && courseId && (
        <AddOrEditStudentModal
          courseId={Number(courseId)}
          onClose={() => setShowAddModal(false)}
          onSaved={handleStudentSaved}
        />
      )}

      {studentToEdit && courseId && (
        <AddOrEditStudentModal
          courseId={Number(courseId)}
          studentToEdit={studentToEdit}
          onClose={() => setStudentToEdit(null)}
          onSaved={handleStudentSaved}
        />
      )}

      {studentToView !== null && (
        <StudentDetailModal studentId={studentToView} onClose={() => setStudentToView(null)} />
      )}

      {studentToRemove && courseId && (
        <RemoveStudentConfirmModal
          studentName={`${studentToRemove.firstName} ${studentToRemove.lastName}`}
          courseName={data?.course.title}
          loading={removing}
          onClose={() => setStudentToRemove(null)}
          onConfirm={async () => {
            try {
              await removeStudent(Number(courseId), studentToRemove.id);
              setStudentToRemove(null);
              refetch();
            } catch {
              // El hook ya expone el error si se necesita mostrar feedback adicional.
            }
          }}
        />
      )}

      {removing && (
        <p role="status" aria-live="polite" className="sr-only">
          Removiendo estudiante del curso...
        </p>
      )}
    </div>
  );
}

export default StudentListPage;
