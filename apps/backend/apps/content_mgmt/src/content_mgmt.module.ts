import { Module } from '@nestjs/common';
import { ContentMgmtController } from './content_mgmt.controller';
import { ContentMgmtService } from './content_mgmt.service';

@Module({
  imports: [],
  controllers: [ContentMgmtController],
  providers: [ContentMgmtService],
})
export class ContentMgmtModule {}
