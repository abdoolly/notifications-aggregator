import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get<AppService>(AppService);
  await appService.seedDatabase();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
