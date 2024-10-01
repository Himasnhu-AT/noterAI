import { Injectable } from '@nestjs/common';

@Injectable()
export class CollabToolsService {
  getHello(): string {
    return 'Hello World!';
  }
}
