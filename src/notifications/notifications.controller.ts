import { Controller, Get, Inject } from '@nestjs/common';
import { User } from '@notifications/models/user.model';
import { Models } from 'src/helpers/constants';

/**
 * - The first endpoint will provide the functionality to retrieve an aggregated list of notifications 
 * for a given post. We are looking for a response that is as close to production ready as possible.
 * 
 * - The second endpoint will expose a POST method that will add an element to this feed of notifications.
 * - The third and last endpoint should expose the functionality to mark these feeds as read.
 * 
 * 
 * 
 * mongo-db
 * caching
 * apply security (cors ,using helmet)
 * health-check
 * 
 */

@Controller('notifications')
export class NotificationsController {

  constructor(
    @Inject(Models.USER)
    private userRepo: typeof User,
  ) { }

  @Get('/')
  async getHello() {
    const user = await this.userRepo.create({
      name: 'Abdallah Gamal'
    });

    return user;
  }

}
