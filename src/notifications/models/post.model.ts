
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { User } from '@notifications/models/user.model';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Post extends Model {
  @Column(DataType.STRING)
  title: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Notification)
  notifications: Notification[];
}