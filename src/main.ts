import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // enable to pass only property in DTO. https://area-b.com/blog/2018/09/13/2245/
  app.enableCors({
    credentials: true, // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
    origin: ['http://localhost:3000'],
  });
  const config = new DocumentBuilder()
    .setTitle('Queue API')
    .setDescription('The queue API')
    .setVersion('1.0')
    .addTag('queue')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
