import { Button } from "react-aria-components";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";
import type { PostTreeNode } from "../types/forum";

interface PostActionsProps {
  readonly post: PostTreeNode;
  readonly currentUserId: number;
  readonly canDelete: boolean;
  readonly onReply: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

function PostActions({ post, currentUserId, canDelete, onReply, onEdit, onDelete }: PostActionsProps) {
  const isAuthor = post.userId === currentUserId;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 mt-2 flex-wrap">
      <Button
        onPress={onReply}
        aria-label="Responder"
        className="inline-flex items-center gap-1 rounded-md px-3 sm:px-2.5 py-1.5 sm:py-1 text-xs font-semibold text-text-on-action bg-surface-action transition hover:bg-surface-action-hover focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
      >
        <MessageSquare size={14} aria-hidden="true" />
        Responder
      </Button>

      {isAuthor && (
        <Button
          onPress={onEdit}
          aria-label="Editar"
          className="inline-flex items-center gap-1 rounded-md px-3 sm:px-2.5 py-1.5 sm:py-1 text-xs font-medium text-text-body border border-border-card transition hover:bg-surface-card focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          <Pencil size={14} aria-hidden="true" />
          Editar
        </Button>
      )}

      {(isAuthor || canDelete) && (
        <Button
          onPress={onDelete}
          aria-label="Eliminar"
          className="inline-flex items-center gap-1 rounded-md px-3 sm:px-2.5 py-1.5 sm:py-1 text-xs font-medium text-text-danger border border-border-danger transition hover:bg-surface-danger focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          <Trash2 size={14} aria-hidden="true" />
          Eliminar
        </Button>
      )}
    </div>
  );
}

export default PostActions;
