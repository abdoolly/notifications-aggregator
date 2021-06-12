
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { Post } from '@notifications/models/post.model';
import { CreateUserI } from '@notifications/types/user.type';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class User extends Model<CreateUserI, CreateUserI> {
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];
}