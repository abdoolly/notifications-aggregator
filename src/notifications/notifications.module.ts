import { Module } from '@nestjs/common';
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import { NotificationsController } from '@notifications/notifications.controller';
import { Models } from 'src/helpers/constants';
import { makeModelRepository } from 'src/helpers/dbHelpers';

@Module({
  controllers: [NotificationsController],
  providers: [
    makeModelRepository(Models.NOTIFICATION, Notification),
    makeModelRepository(Models.USER, User),
    makeModelRepository(Models.COMMENT, Comment),
    makeModelRepository(Models.POST, Post),
  ],
})
export class NotificationsModule { }
