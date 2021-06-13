
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { User } from '@notifications/models/user.model';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Post extends Model {
  @PrimaryKey
  @Column(DataType.STRING(32))
  id: string;

  @Column(DataType.STRING)
  title: string;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Notification)
  notifications: Notification[];
}