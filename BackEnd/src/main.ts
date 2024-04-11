import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConnectableObservable } from 'rxjs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Level UP Connect')
    .setDescription('Level UP Connect is a versatile and powerful API designed to offer an extensive range of services to gaming platforms. From obtaining detailed game data to managing users and their services, the API provides a complete solution for the smooth incorporation of the functionalities that are fundamental to the operation of the Level UP platform.')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
