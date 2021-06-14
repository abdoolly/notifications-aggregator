export interface CreateNotificationParams {
  postId: string;
  userId: string;
  commentText?: string;
  type: 'Like' | 'Comment';
}