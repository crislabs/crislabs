import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    origin: ['http://localhost:3000', 'https://crislabs.vercel.app', 'https://jesuscalamani92.vercel.app', 'https://jjcalamani92.vercel.app'],
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
