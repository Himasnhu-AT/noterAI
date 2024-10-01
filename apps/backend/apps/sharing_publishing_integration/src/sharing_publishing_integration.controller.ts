import { Controller, Get } from '@nestjs/common';
import { SharingPublishingIntegrationService } from './sharing_publishing_integration.service';

@Controller()
export class SharingPublishingIntegrationController {
  constructor(private readonly sharingPublishingIntegrationService: SharingPublishingIntegrationService) {}

  @Get()
  getHello(): string {
    return this.sharingPublishingIntegrationService.getHello();
  }
}
