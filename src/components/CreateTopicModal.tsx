import { Button } from "react-aria-components";
import { X } from "lucide-react";

import TopicForm from "./TopicForm";
import type { Topic } from "../types/topic";

interface CreateTopicModalProps {
  courseId: string;
  onClose: () => void;
  onAddTopic: (topic: Topic) => void;
}

function CreateTopicModal({ courseId, onClose, onAddTopic }: CreateTopicModalProps) {
  function handlePublish(topic: Topic) {
    onAddTopic(topic);
    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="topic-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative flex w-full max-w-3xl min-w-150 flex-col gap-6 rounded-2xl bg-surface-primary p-6 shadow-xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
          <div className="flex items-center justify-between">
            <h2
              id="topic-modal-title"
              className="text-lg font-semibold text-text-headings"
            >
              Crear tema
            </h2>
            <Button
              aria-label="Cerrar modal"
              onPress={onClose}
              className="flex items-center justify-center rounded-lg p-1.5 text-text-disabled transition hover:bg-surface-card hover:text-text-body focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>

          <TopicForm courseId={courseId} onCancel={onClose} onPublish={handlePublish} />
        </div>
      </div>
    </>
  );
}

export default CreateTopicModal;