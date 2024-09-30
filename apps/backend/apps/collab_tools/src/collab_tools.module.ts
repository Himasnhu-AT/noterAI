import { Module } from '@nestjs/common';
import { CollabToolsController } from './collab_tools.controller';
import { CollabToolsService } from './collab_tools.service';

@Module({
  imports: [],
  controllers: [CollabToolsController],
  providers: [CollabToolsService],
})
export class CollabToolsModule {}
