import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { NotificationsService } from '@notifications/notifications.service';
import { AddNotificationFeedRequest } from '@notifications/types/controller.types';
import { addNotificationCommentSuccess, addNotificationFailure, addNotificationValidationError, getNotificationFeedResponseFailure, getNotificationFeedResponseSuccess, markNotificationFeedAsReadError, markNotificationFeedAsReadSuccess } from 'src/data/swagger-data';

@Controller('notifications')
export class NotificationsController {

  constructor(
    private notificationService: NotificationsService
  ) { }

  @Get('/:postId')
  @ApiParam({ name: 'postId', example: '7d78ff348647b782cb3027d836d23e09' })
  @ApiParam({ name: 'page', example: 1, required: false })
  @ApiParam({ name: 'pageSize', example: 4, required: false })
  @ApiResponse({
    status: 200,
    schema: {
      example: getNotificationFeedResponseSuccess
    }
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: getNotificationFeedResponseFailure
    }
  })
  async getNotificationFeed(
    @Param('postId') postId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10) {
    await this.notificationService.doesPostExists(postId);
    return await this.notificationService.getNotifications(postId, {
      page: +page,
      pageSize: +pageSize
    });
  }

  @Post('/:postId')
  @ApiParam({ name: 'postId', example: '7d78ff348647b782cb3027d836d23e09' })
  @ApiResponse({
    status: 201,
    schema: {
      example: addNotificationCommentSuccess
    }
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: addNotificationValidationError
    }
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: addNotificationFailure
    }
  })
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
  @ApiParam({ name: 'postId', example: '7d78ff348647b782cb3027d836d23e09' })
  @ApiResponse({
    status: 200,
    schema: {
      example: markNotificationFeedAsReadSuccess
    }
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: markNotificationFeedAsReadError
    }
  })
  async markNotificationFeedAsRead(@Param('postId') postId: string) {
    await this.notificationService.doesPostExists(postId);
    return await this.notificationService.markAsRead(postId);
  }
}
