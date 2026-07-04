import CourseList from '../../components/courses/CourseList';
import EnrollCourseCard from '../../components/courses/EnrollCourseCard';
import { DashboardCourseCardSkeleton } from '../../components/courses/DashboardCourseCardSkeleton';
import { useStudentDashboard } from '../../hooks/useStudentDashboard';
import { useAuth } from '../../context/AuthContext';

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
            <ul className="grid list-none grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Cargando cursos">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i}><DashboardCourseCardSkeleton /></li>
              ))}
            </ul>
          )}
          {error && <p className="text-sm text-text-danger">{error}</p>}
          {!loading && !error && courseList.length === 0 && <EnrollCourseCard />}

          {!loading && !error && courseList.length > 0 && <CourseList courses={courseList} />}
        </section>
      </main>
    </div>
  );
}

export default StudentDashboardPage;
