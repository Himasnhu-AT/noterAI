import { Test, TestingModule } from '@nestjs/testing';
import { SharingPublishingIntegrationController } from './sharing_publishing_integration.controller';
import { SharingPublishingIntegrationService } from './sharing_publishing_integration.service';

describe('SharingPublishingIntegrationController', () => {
  let sharingPublishingIntegrationController: SharingPublishingIntegrationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SharingPublishingIntegrationController],
      providers: [SharingPublishingIntegrationService],
    }).compile();

    sharingPublishingIntegrationController = app.get<SharingPublishingIntegrationController>(SharingPublishingIntegrationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sharingPublishingIntegrationController.getHello()).toBe('Hello World!');
    });
  });
});
