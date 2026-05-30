import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { useCourse } from '../hooks/useCourse';

function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { course, loading, error, notFound } = useCourse(id); 

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <section aria-label="Detalle del curso" className="flex flex-col gap-4">

          {loading && (
            <p className="text-sm text-gray-500">Cargando...</p>
          )}

          {error && (
            <p role="alert" className="text-sm text-red-600">{error}</p>
          )}

          {notFound && (                                       
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Curso no disponible
              </h1>
              <p className="text-sm text-gray-500">
                Seguimos trabajando para mostrar el detalle de este curso lo antes posible. Gracias por tu paciencia.
              </p>
            </div>
          )}

          {!loading && !error && !notFound && course && (      
            <>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-sm text-gray-500">
                No disponible. Estamos trabajando para mostrar el detalle del curso lo antes posible.
              </p>
            </>
          )}

        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CoursePage;