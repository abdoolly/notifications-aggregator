
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Comment extends Model {
  @PrimaryKey
  @Column(DataType.STRING(32))
  id: string;

  @Column(DataType.STRING)
  commentText: string;

  @ForeignKey(() => Post)
  postId: string;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}