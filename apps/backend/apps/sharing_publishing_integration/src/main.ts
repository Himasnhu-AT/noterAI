import { NestFactory } from '@nestjs/core';
import { SharingPublishingIntegrationModule } from './sharing_publishing_integration.module';

async function bootstrap() {
  const app = await NestFactory.create(SharingPublishingIntegrationModule);
  await app.listen(process.env.SHARING_PUBLICATION_INTEGRATION_PORT || 4003);
}
bootstrap();
