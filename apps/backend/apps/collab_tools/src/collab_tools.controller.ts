import { Controller, Get } from '@nestjs/common';
import { CollabToolsService } from './collab_tools.service';

@Controller()
export class CollabToolsController {
  constructor(private readonly collabToolsService: CollabToolsService) {}

  @Get()
  getHello(): string {
    return this.collabToolsService.getHello();
  }
}
