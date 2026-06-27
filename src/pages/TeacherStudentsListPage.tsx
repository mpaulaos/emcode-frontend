import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";

import CourseStudentList from "../components/CourseStudentList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import AddOrEditStudentModal from "../components/StudentModal";
import StudentDetailModal from "../components/StudentDetailModal";
import { useTeacherStudents, useRemoveStudentFromCourse } from "../hooks/useStudentList";
import { useTeacherDashboard } from "../hooks/useTeacherDashboard";
import type { Student } from "../types/Student";

const PAGE_SIZE = 10;

function TeacherStudentsListPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToView, setStudentToView] = useState<number | null>(null);

  const { students, total, pageSize, loading, error, refetch } = useTeacherStudents(query, page, PAGE_SIZE);
  const { data: dashboardData } = useTeacherDashboard();
  const { removeStudent } = useRemoveStudentFromCourse();

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const availableCourses = (dashboardData?.courses ?? []).map((c) => ({ id: c.id, title: c.title }));

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleStudentSaved() {
    setShowAddModal(false);
    setStudentToEdit(null);
    refetch();
  }

  function handleEdit(studentId: number) {
    const student = students.find((s) => s.id === studentId);
    if (student) setStudentToEdit(student);
  }

  async function handleRemoveFromAllCourses(studentId: number) {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const confirmed = window.confirm(
      `¿Seguro que querés remover a ${student.firstName} ${student.lastName} de todos sus cursos?`,
    );
    if (!confirmed) return;

    try {
      await Promise.all(student.courses.map((c) => removeStudent(c.id, studentId)));
      refetch();
    } catch {
     
    }
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
          className="flex w-fit items-center gap-2 text-sm font-semibold text-text-headings hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Volver al dashboard
        </Link>

        <section aria-label="Mis estudiantes" className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-text-headings">Mis estudiantes</h1>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-text-headings">Buscar estudiante</span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SearchBar
                value={query}
                onChange={handleSearchChange}
                placeholder="Buscar estudiante por nombre"
                aria-label="Buscar estudiante por nombre"
              />
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-surface-action px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <UserPlus size={18} aria-hidden="true" />
                Agregar estudiante
              </button>
            </div>
          </div>

          {loading && (
            <p className="text-sm text-text-body" aria-live="polite">
              Cargando estudiantes...
            </p>
          )}
          {error && <p className="text-sm text-text-danger">{error}</p>}

          {!loading && !error && (
            <>
              <CourseStudentList
                students={students}
                removeLabel="Remover de todos los cursos"
                onViewDetails={(studentId) => setStudentToView(studentId)}
                onEdit={handleEdit}
                onRemove={handleRemoveFromAllCourses}
              />

              {total > pageSize && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
            </>
          )}
        </section>
      </main>

      {showAddModal && (
        <AddOrEditStudentModal
          availableCourses={availableCourses}
          onClose={() => setShowAddModal(false)}
          onSaved={handleStudentSaved}
        />
      )}

      {studentToEdit && (
        <AddOrEditStudentModal
          studentToEdit={studentToEdit}
          onClose={() => setStudentToEdit(null)}
          onSaved={handleStudentSaved}
        />
      )}

      {studentToView !== null && (
        <StudentDetailModal studentId={studentToView} onClose={() => setStudentToView(null)} />
      )}
    </div>
  );
}

export default TeacherStudentsListPage;
