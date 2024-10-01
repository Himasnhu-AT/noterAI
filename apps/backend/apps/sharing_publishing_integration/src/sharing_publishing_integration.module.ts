import { Module } from '@nestjs/common';
import { SharingPublishingIntegrationController } from './sharing_publishing_integration.controller';
import { SharingPublishingIntegrationService } from './sharing_publishing_integration.service';

@Module({
  imports: [],
  controllers: [SharingPublishingIntegrationController],
  providers: [SharingPublishingIntegrationService],
})
export class SharingPublishingIntegrationModule {}
