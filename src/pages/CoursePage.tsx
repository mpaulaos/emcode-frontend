import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { DisclosurePanel, type Key, Button } from "react-aria-components";
import { Plus } from "lucide-react";

import { useCourse } from '../hooks/useCourse';
import { useTopicData } from '../hooks/useTopicData';

import { DisclosureGroup } from "../components/kit/DisclosureGroup";
import { Disclosure, DisclosureHeader } from "../components/kit/Disclosure";
import CreateTopicModal from '../components/CreateTopicModal';
import TopicLessonsPanel from '../components/TopicLessonPanel';

import type { Topic } from '../types/topic';

function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { course, loading, error, notFound } = useCourse(id);
  const { topics, loading: topicsLoading, error: topicsError } = useTopicData(id);
  const [expandedKeys, setExpandedKeys] = useState(new Set<Key>([]));
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [localTopics, setLocalTopics] = useState<Topic[]>([]);
  const [openLessonModalFor, setOpenLessonModalFor] = useState<number | null>(null);

  const topicList = [...topics, ...localTopics];

  function handleTopicCreated(newTopic: Topic) {
    setLocalTopics((prev) => [...prev, newTopic]);
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12">
        <section aria-label="Detalle del curso" className="flex flex-col gap-4">
          {loading && <p className="text-sm text-text-body">Cargando...</p>}
          {error && <p role="alert" className="text-sm text-text-danger">{error}</p>}
          {notFound && (
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-headings">Curso no disponible</h1>
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

        <section aria-label="Temas del curso" className="w-full mx-auto p-4 justify-center gap-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h2>Temas</h2>
            <Button
              aria-label="Crear nuevo tema"
              onPress={() => setShowTopicModal(true)}
              className="flex items-center gap-2 rounded-lg bg-surface-action px-4 py-2 text-sm font-semibold text-text-on-action border-none cursor-pointer transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <Plus size={18} aria-hidden="true" />
              Agregar tema
            </Button>
          </div>

          {topicsLoading && <p className="text-sm text-text-body">Cargando temas…</p>}
          {topicsError && <p role="alert" className="text-sm text-text-danger">{topicsError}</p>}

          {!topicsLoading && !topicsError && (
            <DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
              {topicList.map((topic: Topic) => (
                <Disclosure key={topic.id}>
                  <DisclosureHeader
                    onAddLessonPress={() => setOpenLessonModalFor(topic.id)}
                  >
                    {topic.topicName}
                  </DisclosureHeader>
                  <DisclosurePanel className="p-4">
                    <TopicLessonsPanel
                      topicId={topic.id}
                      showLessonModal={openLessonModalFor === topic.id}
                      onCloseLessonModal={() => setOpenLessonModalFor(null)}
                    />
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </DisclosureGroup>
          )}
        </section>
      </main>

      {showTopicModal && id && (
        <CreateTopicModal
          courseId={id}
          onClose={() => setShowTopicModal(false)}
          onAddTopic={handleTopicCreated}
        />
      )}
    </div>
  );
}

export default CoursePage;