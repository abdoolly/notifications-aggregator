import { Comment } from '@notifications/models/comment.model';
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class Notification extends Model {
  @Column(DataType.ENUM('Like', 'Comment'))
  notificationType: 'Like' | 'Comment';

  @Column(DataType.BOOLEAN)
  isRead: boolean;

  @BelongsTo(() => Comment)
  comment: Comment;

  @AllowNull(true)
  @ForeignKey(() => Comment)
  @Column
  commentId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Post)
  postId: number;

  @ForeignKey(() => User)
  userId: User;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}