import { Module } from '@nestjs/common';
import { ContentMgmtController } from './content_mgmt.controller';
import { ContentMgmtService } from './content_mgmt.service';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { EditorModule } from './editor/editor.module';
import { EditorService } from './editor/editor.service';

@Module({
  imports: [PrismaModule],
  controllers: [ContentMgmtController, EditorModule],
  providers: [ContentMgmtService, EditorService],
})
export class ContentMgmtModule {}
