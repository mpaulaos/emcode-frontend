import { useState } from "react";
import { Button } from "../ui/Button";
import type { PostTreeNode } from "../../types/forum";
import { useAuth } from "../../context/AuthContext";
import { useForum } from "../../hooks/useForum";
import FocusTTS from "../ui/FocusTTS";
import PostActions from "./PostActions";
import PostEditForm from "./PostEditForm";
import PostReplyForm from "./PostReplyForm";

const AVATAR_COLORS = [
  "bg-primary-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-red-500",
];

interface PostCardProps {
  readonly post: PostTreeNode;
  readonly courseId: string;
  readonly depth?: number;
  readonly onAction: () => void;
}

function getInitials(first: string | null, last: string | null): string {
  return ((first?.[0] ?? "") + (last?.[0] ?? "")).toUpperCase() || "?";
}

function getAvatarColor(userId: number): string {
  return AVATAR_COLORS[userId % AVATAR_COLORS.length];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function PostCard({ post, courseId, depth = 0, onAction }: PostCardProps) {
  const { user } = useAuth();
  const { deletePost, fetchPosts } = useForum();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isDeleted = post.isDeleted === true;
  const displayContent = isDeleted
    ? "[Este mensaje ha sido eliminado]"
    : post.content;

  const canDelete =
    user?.role === "admin" || user?.role === "teacher";

  function handleDelete() {
    setShowDeleteConfirm(true);
  }

  async function confirmDelete() {
    setDeleting(true);
    setShowDeleteConfirm(false);
    try {
      await deletePost(post.id);
      await fetchPosts(courseId);
      onAction();
    } catch {
      /* handled by hook */
    } finally {
      setDeleting(false);
    }
  }

  function handleSaved() {
    setIsEditing(false);
    fetchPosts(courseId).then(() => onAction());
  }

  function handleReplied() {
    setIsReplying(false);
    fetchPosts(courseId).then(() => onAction());
  }

  const initials = getInitials(post.author.firstName, post.author.lastName);
  const avatarColor = getAvatarColor(post.userId);
  const authorName =
    [post.author.firstName, post.author.lastName]
      .filter(Boolean)
      .join(" ") || "Usuario desconocido";

  return (
    <>
    <article
      className={`flex flex-col gap-1 ${
        depth > 0 ? "ml-3 sm:ml-6 border-l-2 border-border-card pl-2 sm:pl-4" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <div
          className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor}`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <span className="text-sm font-semibold text-text-headings">
          {authorName}
        </span>
        {post.createdAt && (
          <time
            className="text-xs text-text-disabled"
            dateTime={post.createdAt}
          >
            {formatDate(post.createdAt)}
          </time>
        )}
        {post.updatedAt && post.createdAt !== post.updatedAt && (
          <span className="text-xs text-text-disabled">(editado)</span>
        )}
      </div>

      {isEditing ? (
        <PostEditForm
          postId={post.id}
          initialContent={post.content}
          onCancel={() => setIsEditing(false)}
          onSaved={handleSaved}
        />
      ) : (
        <FocusTTS text={displayContent}>
          <p
            className={`text-sm whitespace-pre-wrap ${
              isDeleted ? "italic text-text-disabled" : "text-text-body"
            }`}
          >
            {displayContent}
          </p>
        </FocusTTS>
      )}

      {!isDeleted && !isEditing && user && (
        <PostActions
          post={post}
          currentUserId={user.id}
          canDelete={canDelete}
          onReply={() => setIsReplying((p) => !p)}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      )}

      {deleting && (
        <p className="text-xs text-text-disabled">Eliminando...</p>
      )}

      {isReplying && (
        <PostReplyForm
          postId={post.id}
          onCancel={() => setIsReplying(false)}
          onReplied={handleReplied}
        />
      )}

      {post.replies.length > 0 && (
        <div className="flex flex-col gap-2 sm:gap-3 mt-2 sm:mt-3">
          {post.replies.map((reply) => (
            <PostCard
              key={reply.id}
              post={reply}
              courseId={courseId}
              depth={depth + 1}
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </article>

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowDeleteConfirm(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setShowDeleteConfirm(false); }}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            className="relative flex w-full max-w-[24rem] flex-col gap-4 rounded-2xl bg-surface-primary p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === "Escape") setShowDeleteConfirm(false); }}
          >
            <h2
              id="delete-confirm-title"
              className="text-lg font-semibold text-text-headings"
            >
              Eliminar mensaje
            </h2>
            <p className="text-sm text-text-body">
              ¿Estás seguro de que deseas eliminar este mensaje?
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button variant="secondary" onPress={() => setShowDeleteConfirm(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onPress={confirmDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
