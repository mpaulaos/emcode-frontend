export interface PostAuthor {
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
}

export interface PostTreeNode {
  id: number;
  courseId: number;
  userId: number;
  parentPostId: number | null;
  content: string;
  isDeleted: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  author: PostAuthor;
  replies: PostTreeNode[];
  replyCount: number;
}

export interface CreatePostPayload {
  content: string;
}

export interface ValidationError {
  code: string;
  message: string;
  path: string[];
}

export interface ValidationErrorResponse {
  message: string;
  errors: ValidationError[];
}

export const POST_CONTENT_MIN = 1;
export const POST_CONTENT_MAX = 500;
