import { useState } from 'react';
import CourseList from '../components/CourseList';
import { Button } from 'react-aria-components';
import { Plus } from 'lucide-react';
import type { Course } from '../types/dashboard';
import CreateCourseModal from '../components/CreateCourseModal';
import { useTeacherDashboard } from '../hooks/useTeacherDashboard';
import TeacherNavChips from '../components/TeacherChips';

function TeacherDashboardPage() {
  const { data, loading, error } = useTeacherDashboard();
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const courseList = courses.length > 0 ? courses : (data?.courses ?? []);

  function handleAddCourse(course: Course) {
    setCourses(prev => [...prev, course]);
    setShowModal(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <section aria-label="Bienvenida" className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, Profe {data?.teacherName ?? ''}!
          </h1>
          <p className="text-lg text-gray-600">
            Administra tus lecciones y recursos académicos en un solo lugar.
          </p>
        </section>

          <TeacherNavChips />
          
        <section aria-label="Mis cursos" className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Mis cursos</h2>
            <Button
              aria-label="Crear nuevo curso"
              onPress={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white border-none cursor-pointer transition hover:bg-violet-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700"
            >
              <Plus size={18} aria-hidden="true" />
              Crear curso
            </Button>
          </div>

          {loading && <p className="text-sm text-gray-500">Cargando cursos...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && courseList.length === 0 && (
            <p className="text-sm text-gray-500">Aún no tienes cursos creados.</p>
          )}

         
          {courseList.length > 0 && <CourseList courses={courseList} />}
        </section>
      </main>

      {showModal && (
        <CreateCourseModal
          onClose={() => setShowModal(false)}
          onAddCourse={handleAddCourse}
        />
      )}
    </div>
  );
}

export default TeacherDashboardPage;