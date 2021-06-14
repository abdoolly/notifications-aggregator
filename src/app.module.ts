import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from '@notifications/notifications.module';
import { User } from '@notifications/models/user.model';
import { Post } from '@notifications/models/post.model';
import { Comment } from '@notifications/models/comment.model';
import { Notification } from '@notifications/models/notification.model';
import { Models } from 'src/helpers/constants';
import { makeModelRepository } from 'src/helpers/dbHelpers';
import * as sequelizePaginate from 'sequelize-paginate';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
      });
      sequelize.addModels([User, Post, Comment, Notification]);
      sequelizePaginate.paginate(sequelize.models.Notification as any)
      await sequelize.sync({
        alter: process.env.NODE_ENV === 'develop' ? true : false,
      });
      return sequelize;
    },
  },
];

@Module({
  imports: [
    NotificationsModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    ...databaseProvider,
    makeModelRepository(Models.NOTIFICATION, Notification),
    makeModelRepository(Models.USER, User),
    makeModelRepository(Models.COMMENT, Comment),
    makeModelRepository(Models.POST, Post),
  ],
  exports: [
    ...databaseProvider,
    makeModelRepository(Models.NOTIFICATION, Notification),
    makeModelRepository(Models.USER, User),
    makeModelRepository(Models.COMMENT, Comment),
    makeModelRepository(Models.POST, Post),
  ],
})
export class AppModule { }
