import { Inject, Injectable } from '@nestjs/common';
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { Models } from 'src/helpers/constants';

export interface GetNotificationOptions {
  page?: number;
  pageSize?: number;
}

@Injectable()
export class NotificationsService {

  constructor(
    @Inject(Models.NOTIFICATION)
    private notificationRepo: typeof Notification,
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
}
