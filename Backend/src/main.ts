import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './interface/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix(configService.get<string>('API_PREFIX', 'api'), {
    exclude: ['health'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:4321'),
    credentials: true,
  });

  app.enableShutdownHooks();

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

  logger.log(`Application running on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});