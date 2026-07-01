import { useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, User } from 'lucide-react';
import { useCoursesData } from '../../hooks/useCoursesData';
import { useStudentDashboard } from '../../hooks/useStudentDashboard';
import { useEnrollment } from '../../hooks/useEnrollment';
import { useAuth } from '../../context/AuthContext';
import welcomeGekobot from "../../assets/gekobot-welcome.png";
import ConfirmEnrollDialog from '../../components/dashboard/ConfirmEnrollDialog';
import type { ExploreCourse } from '../../types/explore';

function InscribirCursosPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses: allCourses, loading: coursesLoading, error: fetchError } = useCoursesData();
  const { courses: enrolledCourses, loading: enrolledLoading } = useStudentDashboard(user!.id);
  const { enroll, loading: enrolling, error: enrollError } = useEnrollment();

  const enrolledIds = useMemo(() => new Set(enrolledCourses.map(c => c.id)), [enrolledCourses]);
  const availableCourses = useMemo(
    () => allCourses.filter(c => !enrolledIds.has(c.id)),
    [allCourses, enrolledIds]
  );

  const loading = coursesLoading || enrolledLoading;

  const [dialogCourse, setDialogCourse] = useState<ExploreCourse | null>(null);

  const handleEnroll = useCallback(async () => {
    if (!dialogCourse || !user) return;

    try {
      await enroll(dialogCourse.id, user.id);
      navigate('/student');
    } catch {
      // error is handled by useEnrollment and displayed in dialog
    }
  }, [dialogCourse, user, enroll, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-8 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <nav aria-label="Navegación">
          <Link
            to="/student"
            className="flex items-center gap-2 text-sm text-text-body hover:text-text-headings transition w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-lg"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver a mi panel
          </Link>
        </nav>

        <h1 className="text-3xl font-bold text-text-headings">
          Inscribir cursos
        </h1>

        {loading && (
          <p className="text-sm text-text-body">Cargando cursos...</p>
        )}
        {fetchError && (
          <p className="text-sm text-text-danger">{fetchError}</p>
        )}

        {!loading && !fetchError && allCourses.length === 0 && (
          <p className="text-sm text-text-body">No hay cursos disponibles.</p>
        )}

        {!loading && !fetchError && allCourses.length > 0 && availableCourses.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-12">
            <img src={welcomeGekobot} alt="" className="w-32" />
            <p className="text-sm text-text-body text-center">
              ¡Felicidades! Ya estás inscrito en todos los cursos disponibles. Sigue aprendiendo.
            </p>
          </div>
        )}

        {!loading && availableCourses.length > 0 && (
          <section aria-label="Lista de cursos disponibles">
            <ul className="grid list-none grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availableCourses.map((course) => (
                <li key={course.id} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border-card bg-surface-primary p-5">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-text-headings">
                        {course.title}
                      </h3>
                      <p className="flex items-center gap-2 text-sm text-text-body">
                        <User size={16} aria-hidden="true" />
                        Profesor: {course.teacherName}
                      </p>
                    </div>

                    <Button
                      onPress={() => setDialogCourse(course)}
                      className="mt-auto flex w-fit items-center justify-center rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      Inscribir curso
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {dialogCourse && (
        <ConfirmEnrollDialog
          course={dialogCourse}
          onConfirm={handleEnroll}
          onCancel={() => {
            setDialogCourse(null);
          }}
          isPending={enrolling}
          error={enrollError}
        />
      )}
    </div>
  );
}

export default InscribirCursosPage;
