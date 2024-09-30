import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { BlockDto, NoteDto } from 'libs/types';

@Injectable()
export class EditorService {
  constructor(private prisma: PrismaService) {}

  // async findOne(id: string): Promise<NoteDto> {
  async findOne(id: string) {
    return `Not Implemented ${id}`;
  }

  // async update(id: string, data: Partial<NoteDto>): Promise<NoteDto> {
  async update(id: string, data: Partial<NoteDto>) {
    return `Not Implemented ${id} where ${data}`;
  }

  async createBlock(
    documentId: string,
    blockData: Partial<BlockDto>,
    // ): Promise<NoteDto> {
  ) {
    // const document = await this.findOne(documentId);
    // const newBlock: BlockDto =
    // document.blocks.push(newBlock);
    // return document;
    return `Not Implemented ${documentId} where ${blockData}`;
  }

  async updateBlock(
    documentId: string,
    blockId: string,
    blockData: Partial<BlockDto>,
    // ): Promise<NoteDto> {
  ) {
    return `Not Implemented ${documentId} where ${blockId} where ${blockData}`;
  }

  // async deleteBlock(documentId: string, blockId: string): Promise<NoteDto> {
  async deleteBlock(documentId: string, blockId: string) {
    return `Not Implemented ${documentId} where ${blockId}`;
  }
}
