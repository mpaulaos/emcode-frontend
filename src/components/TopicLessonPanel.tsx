import { useState, useEffect } from "react";
import { useLessonsListData } from "../hooks/useLessonsList";
import { LessonsList } from "./LessonsList";
import CreateLessonModal from "./CreateLessonModal";
import type { Lesson } from "../types/lesson";

interface TopicLessonsPanelProps {
  topicId: number;
  showLessonModal: boolean;
  onCloseLessonModal: () => void;
}

function TopicLessonsPanel({ topicId, showLessonModal, onCloseLessonModal }: TopicLessonsPanelProps) {
  const { lessons, loading, error } = useLessonsListData(topicId.toString());
  const [displayLessons, setDisplayLessons] = useState<Lesson[]>([]);

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

  return (
    <>
      <LessonsList
        lessons={displayLessons}
        loading={loading}
        error={error}
        onLessonUpdated={handleLessonUpdated}
      />

      {showLessonModal && (
        <CreateLessonModal
          topicId={topicId.toString()}
          onClose={onCloseLessonModal}
          onAddLesson={handleLessonCreated}
        />
      )}
    </>
  );
}

export default TopicLessonsPanel;