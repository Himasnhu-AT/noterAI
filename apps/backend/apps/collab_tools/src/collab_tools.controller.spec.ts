import { Test, TestingModule } from '@nestjs/testing';
import { CollabToolsController } from './collab_tools.controller';
import { CollabToolsService } from './collab_tools.service';

describe('CollabToolsController', () => {
  let collabToolsController: CollabToolsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CollabToolsController],
      providers: [CollabToolsService],
    }).compile();

    collabToolsController = app.get<CollabToolsController>(
      CollabToolsController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(collabToolsController.getHello()).toBe('Hello World!');
    });
  });
});
