import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotificationsService } from '@notifications/notifications.service';

/**
 * - The first endpoint will provide the functionality to retrieve an aggregated list of notifications 
 * for a given post. We are looking for a response that is as close to production ready as possible.
 * 
 * - The second endpoint will expose a POST method that will add an element to this feed of notifications.
 * - The third and last endpoint should expose the functionality to mark these feeds as read.
 * 
 * 
 * 
 * mysql
 * apply security (cors ,using helmet)
 * health-check
 * caching
 * 
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

}
