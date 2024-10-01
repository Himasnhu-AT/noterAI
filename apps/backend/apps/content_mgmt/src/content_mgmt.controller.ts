import { Controller, Get } from '@nestjs/common';
import { ContentMgmtService } from './content_mgmt.service';

@Controller()
export class ContentMgmtController {
  constructor(private readonly contentMgmtService: ContentMgmtService) {}

  @Get()
  getHello(): string {
    return this.contentMgmtService.getHello();
  }
}
