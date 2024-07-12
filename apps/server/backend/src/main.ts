import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   credentials: true,
  // });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('NoterAI API')
    .setDescription('API documentation for NoterAI application.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
function cookieParser(): any {
  throw new Error('Function not implemented.');
}
