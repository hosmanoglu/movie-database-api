import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { altairExpress } from 'altair-express-middleware';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = express();

  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('The movie API')
    .setVersion('1.0')
    .addTag('movies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  server.use('/altair', altairExpress({ endpointURL: '/graphql' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
