import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import {
  CreateBlockDto,
  CreateNoteDto,
  UpdateBlockDto,
  UpdateNoteDto,
} from 'libs/types';

@Injectable()
export class EditorService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument(createDocumentDto: CreateNoteDto) {
    return `TODO ${createDocumentDto}`;
    // return this.prisma.note.create({
    //   data: {
    //     title: createDocumentDto.title,
    //     blocks: {
    //       create: createDocumentDto.blocks,
    //     },
    //   },
    // });
  }

  async getDocument(id: string) {
    const document = await this.prisma.note.findUnique({
      where: { id },
      include: { blocks: true },
    });
    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    return document;
  }

  async updateDocument(id: string, DocumentDto: UpdateNoteDto) {
    const document = await this.getDocument(id);
    return `TODO ${document} ${DocumentDto}`;
    // return this.prisma.note.update({
    //   where: { id },
    //   data: {
    //     title: DocumentDto.title ?? document.title,
    //     blocks: {
    //       update: DocumentDto.blocks,
    //     },
    //   },
    // });
  }

  async deleteDocument(id: string) {
    const result = await this.prisma.note.delete({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
  }

  async addBlock(id: string, createBlockDto: CreateBlockDto) {
    return `TODO ${id} ${createBlockDto}`;
    // return this.prisma.block.create({
    //   data: {
    //     ...createBlockDto,
    //     id: id,
    //   },
    // });
  }

  async updateBlock(
    id: string,
    blockId: string,
    updateBlockDto: UpdateBlockDto,
  ) {
    const document = await this.getDocument(id);
    const block = document.blocks.find((b) => b.id === blockId);
    if (!block) {
      throw new NotFoundException(
        `Block with ID "${blockId}" not found in document "${id}"`,
      );
    }
    // return this.prisma.block.update({
    //   where: { id: blockId },
    //   data: updateBlockDto,
    // });
    return `TODO ${updateBlockDto}`;
  }

  async deleteBlock(id: string, blockId: string) {
    const document = await this.getDocument(id);
    const block = document.blocks.find((b) => b.id === blockId);
    if (!block) {
      throw new NotFoundException(
        `Block with ID "${blockId}" not found in document "${id}"`,
      );
    }
    await this.prisma.block.delete({ where: { id: blockId } });
  }
}
