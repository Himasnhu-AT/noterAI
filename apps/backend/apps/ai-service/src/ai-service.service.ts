import { Injectable } from '@nestjs/common';

@Injectable()
export class AiServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
