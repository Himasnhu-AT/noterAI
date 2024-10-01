import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentMgmtService {
  getHello(): string {
    return 'Hello World!';
  }
}
