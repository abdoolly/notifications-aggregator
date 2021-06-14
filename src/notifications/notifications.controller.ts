import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NotificationsService } from '@notifications/notifications.service';
import { AddNotificationFeedRequest } from '@notifications/types/controller.types';

/** 
 * caching
 */

@Controller('notifications')
export class NotificationsController {

  constructor(
    private notificationService: NotificationsService
  ) { }

  @Get('/:postId')
  async getNotificationFeed(
    @Param('postId') postId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10) {
    return await this.notificationService.getNotifications(postId, {
      page: +page,
      pageSize: +pageSize
    });
  }

  @Post('/:postId')
  async addNotificationFeed(@Param('postId') postId: string, @Body() body: AddNotificationFeedRequest) {
    await this.notificationService.doesPostExists(postId);
    await this.notificationService.doesUserExists(body.userId);
    return await this.notificationService.createNotification({
      postId,
      userId: body.userId,
      commentText: body.commentText,
      type: body.type,
    });
  }

  @Put('/:postId')
  async markNotificationFeedAsRead(@Param('postId') postId: string) {
    await this.notificationService.doesPostExists(postId);
    return await this.notificationService.markAsRead(postId);
  }
}
