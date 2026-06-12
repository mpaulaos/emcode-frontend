import { useParams } from 'react-router-dom';
// import { useState } from 'react';

import { useCourse } from '../hooks/useCourse';
import { useTopicData } from '../hooks/useTopicData';

// import type {Course} from '../types/dashboard';
// import type {Topic} from '../types/topic';

import TopicDisplay from '../components/TopicsDisplay';

function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { course, loading, error, notFound } = useCourse(id); 
  const {topics, loading: topicsLoading, error: topicsError} = useTopicData(id);
  // const [topic, setTopic] = useState<Topic | null>(null);
  // const [courseData, setCourseData] = useState<Course | null>(null);

  // function handleTopicSelect(selectedTopic: Topic) {
  //   setTopic(selectedTopic);

  // }

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12"
      >
        <section aria-label="Detalle del curso" className="flex flex-col gap-4">

          {loading && (
            <p className="text-sm text-text-body">Cargando...</p>
          )}

          {error && (
            <p role="alert" className="text-sm text-text-danger">{error}</p>
          )}

          {notFound && (                                       
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-headings">
                Curso no disponible
              </h1>
              <p className="text-sm text-text-body">
                El equipo de Emcode sigue chambeando para mostrar el detalle de este curso lo antes posible.
              </p>
            </div>
          )}

          {!loading && !error && !notFound && course && (      
            <>
              <h1 className="text-3xl font-bold text-text-headings">{course.title}</h1>
              <p>Sigla: {course?.subtitle}</p>
              <p>Descripción: {course?.description}</p>
            </>
          )}

        </section>

        <TopicDisplay topics={topics} loading={topicsLoading} error={topicsError} />
      </main>
    </div>
  );
}

export default CoursePage;