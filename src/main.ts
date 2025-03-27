import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Config } from './libs/interfaces/config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get<Logger>(Logger);
  const configService = app.get<ConfigService<Config>>(ConfigService);

  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Country API')
    .setDescription('Country API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('port', 3000);
  const host = configService.get<string>('host', '0.0.0.0');

  await app.listen(port, host, () => {
    logger.log(`Server is running on ${host}:${port}`);
  });
}

bootstrap();
