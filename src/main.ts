import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
// import { ExceptionsFilter } from './common/aspects/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),

  );
  // app.useGlobalFilters(new ExceptionsFilter());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://crislabs.vercel.app'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(6002);
}
bootstrap();
