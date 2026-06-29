import CourseList from '../components/CourseList';
import EnrollCourseCard from '../components/EnrollCourseCard';
import { useStudentDashboard } from '../hooks/useStudentDashboard';
import { useAuth } from '../context/AuthContext';

function StudentDashboardPage() {
  const { user } = useAuth();
  const { courses: courseList, loading, error } = useStudentDashboard(user!.id);

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <section aria-label="Bienvenida" className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-text-headings">
            ¡Hola, {user?.firstName}!
          </h1>
          <p className="text-lg text-text-body">
            Accedé a tus cursos y material de estudio.
          </p>
        </section>

        <section aria-label="Mis cursos" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-text-headings">
              Mis cursos
            </h2>
          </div>

          {loading && (
            <p className="text-sm text-text-body">Cargando cursos...</p>
          )}
          {error && <p className="text-sm text-text-danger">{error}</p>}
          {!loading && courseList.length === 0 && <EnrollCourseCard />}

          {courseList.length > 0 && <CourseList courses={courseList} />}
        </section>
      </main>
    </div>
  );
}

export default StudentDashboardPage;
