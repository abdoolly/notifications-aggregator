import { Inject, Injectable } from '@nestjs/common';
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { Post } from '@notifications/models/post.model';
import { User } from '@notifications/models/user.model';
import * as notificationFeed from 'src/data/notification-data.json';
import { Models } from 'src/helpers/constants';
import { generateUUID } from 'src/helpers/dbHelpers';

@Injectable()
export class AppService {
  constructor(
    @Inject(Models.USER)
    private userRepo: typeof User,

    @Inject(Models.POST)
    private postRepo: typeof Post,

    @Inject(Models.COMMENT)
    private commentRepo: typeof Comment,

    @Inject(Models.NOTIFICATION)
    private notificationRepo: typeof Notification,
  ) { }

  async seedDatabase() {
    if (await this.notificationRepo.count()) return;

    try {
      await this.createUsers();
      await this.createPosts();
      await this.createComments();
      await this.createNotifications();
    } catch (err) {
      console.log(err);
    }
  }

  async createNotifications() {
    if (await this.notificationRepo.count()) return;

    const notificationsObject = [];
    for (let { post, user, comment, type, read } of notificationFeed) {
      const createNotificationObject = {
        id: generateUUID(),
        notificationType: type,
        isRead: read,
        postId: post.id,
        userId: user.id,
        ...(comment ? { commentId: comment.id } : {}),
      };

      notificationsObject.push(createNotificationObject);
    }
    await this.notificationRepo.bulkCreate(notificationsObject);
    return notificationsObject;
  }

  async createComments() {
    if (await this.commentRepo.count()) return;

    const commentObject = {};
    for (let { comment, post, user } of notificationFeed) {
      if (!comment) continue;

      if (!commentObject[comment.id]) {
        commentObject[comment.id] = { ...comment, userId: user.id, postId: post.id };
      }
    }
    await this.commentRepo.bulkCreate(Object.values(commentObject));
    return commentObject;
  }

  async createPosts() {
    if (await this.postRepo.count()) return;

    const postsObject = {};
    for (let { post, user } of notificationFeed) {
      if (!postsObject[post.id]) {
        postsObject[post.id] = { ...post, userId: user.id };
      }
    }
    await this.postRepo.bulkCreate(Object.values(postsObject));
    return postsObject;
  }

  async createUsers() {
    if (await this.userRepo.count()) return;

    const usersObject = {};
    for (let { user } of notificationFeed) {
      if (!usersObject[user.id]) {
        usersObject[user.id] = user;
      }
    }
    await this.userRepo.bulkCreate(Object.values(usersObject));
    return usersObject;
  }

}
