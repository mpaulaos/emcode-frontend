import { useState } from "react";
import { Button } from "react-aria-components";
import { useTopics } from "../hooks/useTopics";
import type { Topic } from "../types/topic";

interface TopicFormProps {
  courseId: string;
  onCancel: () => void;
  onPublish: (topic: Topic) => void;
}

function TopicForm({ courseId, onCancel, onPublish }: TopicFormProps) {
  const [topicName, setTopicName] = useState("");
  const { createTopic, loading, error } = useTopics();

  const canSubmit = topicName.trim().length > 0;

  async function handlePublish() {
    try {
      const newTopic = await createTopic(courseId, { topicName: topicName.trim() });
      onPublish(newTopic);
    } catch { /* error handled by hook */ }
  }

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-1 text-sm text-text-body">
        Nombre del tema
        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="rounded-lg border border-border-card px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          autoFocus
        />
      </label>

      {error && <p className="text-sm text-text-danger">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <Button
          onPress={onCancel}
          className="rounded-lg border border-border-card px-5 py-2 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Cancelar
        </Button>

        <Button
          isDisabled={!canSubmit || loading}
          onPress={handlePublish}
          className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {loading ? "Creando..." : "Crear"}
        </Button>
      </div>
    </div>
  );
}

export default TopicForm;