import { useState } from "react";
import { Button } from "react-aria-components";
import { CharCounter } from "./CharCounter";
import { POST_CONTENT_MAX } from "../types/forum";
import { useForum } from "../hooks/useForum";

interface PostEditFormProps {
  postId: number;
  initialContent: string;
  onCancel: () => void;
  onSaved: () => void;
}

function PostEditForm({ postId, initialContent, onCancel, onSaved }: PostEditFormProps) {
  const [content, setContent] = useState(initialContent);
  const { editPost, loading } = useForum();

  async function handleSave() {
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > POST_CONTENT_MAX) return;
    try {
      await editPost(postId, trimmed);
      onSaved();
    } catch {
      /* error handled by hook */
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        maxLength={POST_CONTENT_MAX}
        className="w-full rounded-lg border border-border-card px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus resize-y"
        autoFocus
      />
      <CharCounter current={content.length} limit={POST_CONTENT_MAX} />
      <div className="flex items-center gap-2">
        <Button
          onPress={handleSave}
          isDisabled={!content.trim() || content.trim().length > POST_CONTENT_MAX || loading}
          className="rounded-lg bg-surface-action px-4 py-1.5 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
        <Button
          onPress={onCancel}
          className="rounded-lg border border-border-card px-4 py-1.5 text-sm font-medium text-text-body transition hover:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default PostEditForm;
