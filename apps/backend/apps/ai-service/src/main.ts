import { NestFactory } from '@nestjs/core';
import { AiServiceModule } from './ai-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AiServiceModule);
  await app.listen(process.env.AI_SERVICE_PORT || 4001);
}
bootstrap();
