import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { CreateNotificationParams } from '@notifications/types/notification-service.types';
import { Models } from 'src/helpers/constants';
import { generateUUID } from 'src/helpers/dbHelpers';

export interface GetNotificationOptions {
  page?: number;
  pageSize?: number;
}

@Injectable()
export class NotificationsService {

  constructor(
    @Inject(Models.NOTIFICATION)
    private notificationRepo: typeof Notification,

    @Inject(Models.USER)
    private userRepo: typeof User,

    @Inject(Models.POST)
    private postRepo: typeof Post,
  ) { }

  async getNotifications(postId: string, { page = 1, pageSize = 10 }: GetNotificationOptions) {
    const notifications = await this.notificationRepo['paginate']({
      page: page,
      paginate: pageSize,
      where: {
        postId
      },
      include: [
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, attributes: ['id', 'commentText'], },
        { model: User, attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
      attributes: [['notificationType', 'type'], ['isRead', 'read']],
    });

    return {
      ...notifications,
      next: notifications.pages < page + 1 ? null : page + 1,
      prev: page - 1 < 1 ? null : page - 1,
      first: 1,
      last: notifications.pages
    };
  }

  async createNotification(data: CreateNotificationParams) {
    const isComment = data.type === 'Comment';
    return await this.notificationRepo.create({
      id: generateUUID(),
      notificationType: data.type,
      postId: data.postId,
      userId: data.userId,
      isRead: false,
      ...(isComment ? {
        comment: {
          id: generateUUID(),
          commentText: data.commentText,
          postId: data.postId,
          userId: data.userId,
        }
      } : {}),
    } as any, {
      include: [...(isComment ? [Comment] : [])]
    });
  }

  async markAsRead(postId: string) {
    await this.notificationRepo.update(
      { isRead: true },
      {
        where: { postId }
      });
    return 'all post notifications are now marked as read';
  }

  async doesUserExists(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(`User with id ${id} does not exist`);
  }

  async doesPostExists(id: string) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post)
      throw new BadRequestException(`Post with id ${id} does not exist`);
  }
}
