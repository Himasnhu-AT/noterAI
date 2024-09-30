import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EditorService } from './editor.service';
import { CreateBlockDto, UpdateBlockDto } from 'libs/types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EditorGateway {
  @WebSocketServer() server: Server;

  constructor(private documentService: EditorService) {}

  @SubscribeMessage('fetchDocument')
  async handleFetchDocument(
    @MessageBody() documentId: string,
    @ConnectedSocket() client: Socket,
    // ): Promise<Document> {
  ) {
    const document = await this.documentService.findOne(documentId);
    client.join(`document:${documentId}`);
    return document;
  }

  @SubscribeMessage('updateDocument')
  async handleUpdateDocument(
    @MessageBody() payload: { documentId: string; data: Partial<Document> },
    // ): Promise<void> {
  ) {
    const updatedDocument = await this.documentService.update(
      payload.documentId,
      payload.data,
    );
    this.server
      .to(`document:${payload.documentId}`)
      .emit(`documentUpdate:${payload.documentId}`, updatedDocument);
  }

  @SubscribeMessage('createBlock')
  async handleCreateBlock(
    @MessageBody() payload: { documentId: string; data: CreateBlockDto },
  ): Promise<void> {
    const updatedDocument = await this.documentService.createBlock(
      payload.documentId,
      payload.data,
    );
    this.server
      .to(`document:${payload.documentId}`)
      .emit(`documentUpdate:${payload.documentId}`, updatedDocument);
  }

  @SubscribeMessage('updateBlock')
  async handleUpdateBlock(
    @MessageBody()
    payload: {
      documentId: string;
      blockId: string;
      data: UpdateBlockDto;
    },
  ): Promise<void> {
    const updatedDocument = await this.documentService.updateBlock(
      payload.documentId,
      payload.blockId,
      payload.data,
    );
    this.server
      .to(`document:${payload.documentId}`)
      .emit(`documentUpdate:${payload.documentId}`, updatedDocument);
  }

  @SubscribeMessage('deleteBlock')
  async handleDeleteBlock(
    @MessageBody() payload: { documentId: string; blockId: string },
  ): Promise<void> {
    const updatedDocument = await this.documentService.deleteBlock(
      payload.documentId,
      payload.blockId,
    );
    this.server
      .to(`document:${payload.documentId}`)
      .emit(`documentUpdate:${payload.documentId}`, updatedDocument);
  }
}
