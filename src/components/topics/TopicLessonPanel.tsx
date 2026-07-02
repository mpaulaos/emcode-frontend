import { useState, useEffect, useCallback } from "react";
import { useLessonsListData } from "../../hooks/useLessonsList";
import { useLessons } from "../../hooks/useLessons";
import { LessonsList } from "../lessons/LessonsList";
import CreateLessonModal from "../lessons/CreateLessonModal";
import SlideFormModal from "../slides/SlideFormModal";
import type { Lesson } from "../../types/lesson";

interface TopicLessonsPanelProps {
  topicId: number;
  showLessonModal: boolean;
  onCloseLessonModal: () => void;
}

function TopicLessonsPanel({ topicId, showLessonModal, onCloseLessonModal }: TopicLessonsPanelProps) {
  const { lessons, loading, error } = useLessonsListData(topicId.toString());
  const { deleteLesson } = useLessons();
  const [displayLessons, setDisplayLessons] = useState<Lesson[]>([]);
  const [openSlideModalFor, setOpenSlideModalFor] = useState<Lesson | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    setDisplayLessons(lessons);
  }, [lessons]);

  function handleLessonCreated(newLesson: Lesson) {
    setDisplayLessons((prev) => [...prev, newLesson]);
    onCloseLessonModal();
  }

  function handleLessonUpdated(updatedLesson: Lesson) {
    setDisplayLessons((prev) =>
      prev.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
    );
  }

  const handleManageSlides = useCallback((lesson: Lesson) => {
    setOpenSlideModalFor(lesson);
  }, []);

  const handleEditLesson = useCallback((_lesson: Lesson) => {
    // TODO: open edit modal when available
  }, []);

  const handleDeleteLesson = useCallback((lesson: Lesson) => {
    setConfirmDeleteId(lesson.id);
  }, []);

  async function confirmDelete() {
    if (confirmDeleteId === null) return;
    try {
      await deleteLesson(confirmDeleteId);
      setDisplayLessons((prev) => prev.filter((l) => l.id !== confirmDeleteId));
    } catch {
      // error handled by hook
    }
    setConfirmDeleteId(null);
  }

  return (
    <>
      <LessonsList
        lessons={displayLessons}
        loading={loading}
        error={error}
        onLessonUpdated={handleLessonUpdated}
        onManageSlides={handleManageSlides}
        onEditLesson={handleEditLesson}
        onDeleteLesson={handleDeleteLesson}
      />

      {showLessonModal && (
        <CreateLessonModal
          topicId={topicId.toString()}
          onClose={onCloseLessonModal}
          onAddLesson={handleLessonCreated}
        />
      )}

      {openSlideModalFor && (
        <SlideFormModal
          lessonId={openSlideModalFor.id}
          lessonType={openSlideModalFor.lessonType}
          onClose={() => setOpenSlideModalFor(null)}
          onSlidesCreated={() => {
            // slides were created; parent can refresh if needed
          }}
        />
      )}

      {confirmDeleteId !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
          aria-describedby="delete-confirm-desc"
        >
          <div
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div
            className="relative flex w-[min(32rem,calc(100vw-2rem))] max-w-none flex-col gap-5 overflow-hidden rounded-2xl border border-border-card bg-surface-primary p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === "Escape") setConfirmDeleteId(null);
            }}
          >
            <div className="flex flex-col gap-1">
              <h3 id="delete-confirm-title" className="text-lg font-semibold text-text-headings">
                ¿Eliminar lección?
              </h3>
              <p id="delete-confirm-desc" className="text-sm text-text-body">
                Esta acción no se puede deshacer. Se eliminarán todos los slides asociados.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="shrink-0 rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="shrink-0 rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopicLessonsPanel;