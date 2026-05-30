import { useState } from 'react';                          
import CourseList from '../components/CourseList';
import { Button } from 'react-aria-components';
import { Plus } from 'lucide-react';
import Footer from '../components/Footer';
import type { Course } from '../components/dashboardData';
import  CreateCourseModal  from '../components/CreateCourseModal'; 

interface TeacherDashboardPageProps {
  teacherName: string;
  courses:     Course[];
  onAddCourse: (course: Course) => void;                  
}

function TeacherDashboardPage({ teacherName, courses, onAddCourse }: TeacherDashboardPageProps) {
  
  const [showModal, setShowModal] = useState(false);      

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <section aria-label="Bienvenida" className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, Profe {teacherName}!
          </h1>
          <p className="text-lg text-gray-600">
            Administra tus lecciones y recursos académicos en un solo lugar.
          </p>
        </section>

        <section aria-label="Mis cursos" className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Mis cursos</h2>

            <Button
              aria-label="Crear nuevo curso"
              onPress={() => setShowModal(true)}           
              className="
                flex items-center gap-2
                rounded-lg bg-violet-700
                px-4 py-2 text-sm font-semibold text-white
                border-none cursor-pointer
                transition hover:bg-violet-800
                focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700
              "
            >
              <Plus size={18} aria-hidden="true" />
              Crear curso
            </Button>
          </div>

          {courses.length === 0 && (
            <p className="text-sm text-gray-500">Aún no tienes cursos creados.</p>
          )}

          {courses.length > 0 && (
            <CourseList courses={courses} />
          )}
        </section>
      </main>

      <Footer />

      {/*Modal dashboard—overlay*/}
      {showModal && (
        <CreateCourseModal
          onClose={() => setShowModal(false)}
          onAddCourse={onAddCourse}
        />
      )}
    </div>
  );
}

export default TeacherDashboardPage;