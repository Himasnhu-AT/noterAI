import { Module } from '@nestjs/common';
import { EditorController } from './editor.controller';
import { PrismaService } from 'libs/prisma/prisma.service';
import { EditorService } from './editor.service';

@Module({
  controllers: [EditorController],
  providers: [EditorService, PrismaService],
})
export class EditorModule {}
