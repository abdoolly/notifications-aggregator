
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Comment extends Model {
  @Column(DataType.STRING)
  commentText: string;

  @ForeignKey(() => Post)
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}