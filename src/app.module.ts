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
      // await sequelize.sync({
      //   alter: process.env.NODE_ENV === 'develop' ? true : false,
      // });
      return sequelize;
    },
  },
];

@Module({
  imports: [NotificationsModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProvider],
  exports: [...databaseProvider],
})
export class AppModule { }
