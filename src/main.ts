import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function swaggerSetup(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Notification Aggregator')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get<AppService>(AppService);
  await appService.seedDatabase();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(helmet());
  swaggerSetup(app);

  await app.listen(3000);
}
bootstrap();
