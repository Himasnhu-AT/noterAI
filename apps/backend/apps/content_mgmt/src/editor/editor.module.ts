import { Module } from '@nestjs/common';
import { EditorGateway } from './editor.gateway';
import { EditorService } from './editor.service';

@Module({
  providers: [EditorGateway, EditorService],
})
export class EditorModule {}
