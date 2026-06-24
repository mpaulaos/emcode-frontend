import { useState } from "react";
import type { PostTreeNode } from "../types/forum";
import { useAuth } from "../context/AuthContext";
import { useForum } from "../hooks/useForum";
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
  post: PostTreeNode;
  courseId: string;
  depth?: number;
  onAction: () => void;
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

  const isDeleted = post.isDeleted === true;
  const displayContent = isDeleted
    ? "[Este mensaje ha sido eliminado]"
    : post.content;

  const canDelete =
    user?.role === "admin" || user?.role === "teacher";

  async function handleDelete() {
    if (!window.confirm("¿Estás seguro de eliminar este mensaje?")) return;
    setDeleting(true);
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
    <article
      className={`flex flex-col gap-1 ${
        depth > 0 ? "ml-6 border-l-2 border-border-card pl-4" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor}`}
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
        <p
          className={`text-sm whitespace-pre-wrap ${
            isDeleted ? "italic text-text-disabled" : "text-text-body"
          }`}
        >
          {displayContent}
        </p>
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
        <div className="flex flex-col gap-3 mt-3">
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
  );
}

export default PostCard;
