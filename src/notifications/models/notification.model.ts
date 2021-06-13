import { Comment } from '@notifications/models/comment.model';
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { NotificationI } from '@notifications/types/notification.type';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class Notification extends Model<NotificationI, NotificationI> {
  @PrimaryKey
  @Column(DataType.STRING(32))
  id: string;

  @Column(DataType.ENUM('Like', 'Comment'))
  notificationType: 'Like' | 'Comment';

  @Column(DataType.BOOLEAN)
  isRead: boolean;

  @BelongsTo(() => Comment)
  comment: Comment;

  @AllowNull(true)
  @ForeignKey(() => Comment)
  @Column
  commentId: string;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Post)
  postId: string;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}