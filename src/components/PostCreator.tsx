import { useState } from "react";
import { Button } from "react-aria-components";
import { CharCounter } from "./CharCounter";
import { POST_CONTENT_MAX } from "../types/forum";
import { useForum } from "../hooks/useForum";

interface PostCreatorProps {
  courseId: string;
  onPostCreated: () => void;
}

function PostCreator({ courseId, onPostCreated }: PostCreatorProps) {
  const [content, setContent] = useState("");
  const { createPost, loading, error: hookError } = useForum();
  const [localError, setLocalError] = useState<string | null>(null);

  const canSubmit =
    content.trim().length > 0 && content.trim().length <= POST_CONTENT_MAX;

  async function handlePublish() {
    setLocalError(null);
    try {
      await createPost(courseId, content.trim());
      setContent("");
      onPostCreated();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  const errorMsg = localError || hookError;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border-card bg-surface-card p-4">
      <label htmlFor="post-content" className="text-sm font-semibold text-text-headings">
        Crear publicación
      </label>
      <textarea
        id="post-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        maxLength={POST_CONTENT_MAX}
        placeholder="¿Qué quieres compartir?"
        className="w-full rounded-lg border border-border-card px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus resize-y"
      />
      <CharCounter current={content.length} limit={POST_CONTENT_MAX} />
      {errorMsg && <p className="text-sm text-text-danger">{errorMsg}</p>}
      <div className="flex justify-end">
        <Button
          onPress={handlePublish}
          isDisabled={!canSubmit || loading}
          className="rounded-lg bg-surface-action px-5 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          {loading ? "Publicando..." : "Publicar"}
        </Button>
      </div>
    </div>
  );
}

export default PostCreator;
