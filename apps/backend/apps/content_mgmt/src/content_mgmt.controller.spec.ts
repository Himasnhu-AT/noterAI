import { Test, TestingModule } from '@nestjs/testing';
import { ContentMgmtController } from './content_mgmt.controller';
import { ContentMgmtService } from './content_mgmt.service';

describe('ContentMgmtController', () => {
  let contentMgmtController: ContentMgmtController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContentMgmtController],
      providers: [ContentMgmtService],
    }).compile();

    contentMgmtController = app.get<ContentMgmtController>(ContentMgmtController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(contentMgmtController.getHello()).toBe('Hello World!');
    });
  });
});
