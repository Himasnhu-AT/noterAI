import { Injectable } from '@nestjs/common';

@Injectable()
export class SharingPublishingIntegrationService {
  getHello(): string {
    return 'Hello World!';
  }
}
