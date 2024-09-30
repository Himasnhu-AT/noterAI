import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EditorService } from './editor.service';
import {
  CreateBlockDto,
  CreateNoteDto,
  UpdateBlockDto,
  UpdateNoteDto,
} from 'libs/types';

@Controller('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  // POST /api/documents - Create a new document
  @Post('note/new')
  createDocument(@Body() createDocumentDto: CreateNoteDto) {
    return this.editorService.createDocument(createDocumentDto);
  }

  // GET /api/documents/:id - Retrieve a document
  @Get('note/:id')
  getDocument(@Param('id') id: string) {
    return this.editorService.getDocument(id);
  }

  // PATCH /api/documents/:id - Update a document
  @Patch('note/:id')
  updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateNoteDto,
  ) {
    return this.editorService.updateDocument(id, updateDocumentDto);
  }

  // DELETE /api/documents/:id - Delete a document
  @Delete('note/:id')
  deleteDocument(@Param('id') id: string) {
    return this.editorService.deleteDocument(id);
  }

  // POST /api/documents/:id/blocks - Add a new block to a document
  @Post('note/:id/block/new')
  addBlock(@Param('id') id: string, @Body() createBlockDto: CreateBlockDto) {
    return this.editorService.addBlock(id, createBlockDto);
  }

  // PATCH /api/documents/:id/blocks/:blockId - Update a block
  @Patch('note/:id/block/:blockId')
  updateBlock(
    @Param('id') id: string,
    @Param('blockId') blockId: string,
    @Body() updateBlockDto: UpdateBlockDto,
  ) {
    return this.editorService.updateBlock(id, blockId, updateBlockDto);
  }

  // DELETE /api/documents/:id/blocks/:blockId - Delete a block
  @Delete('note/:id/block/:blockId')
  deleteBlock(@Param('id') id: string, @Param('blockId') blockId: string) {
    return this.editorService.deleteBlock(id, blockId);
  }
}
