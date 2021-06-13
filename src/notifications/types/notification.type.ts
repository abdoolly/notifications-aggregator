import { Post } from "@notifications/models/post.model";
import { User } from "@notifications/models/user.model";

export interface NotificationI {
  id: string;
  notificationType: 'Like' | 'Comment';
  isRead: boolean;
  comment: Comment;
  commentId: string;
  post: Post;
  postId: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}