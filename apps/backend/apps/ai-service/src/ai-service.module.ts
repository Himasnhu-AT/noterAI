import { Module } from '@nestjs/common';
import { AiServiceController } from './ai-service.controller';
import { AiServiceService } from './ai-service.service';

@Module({
  imports: [],
  controllers: [AiServiceController],
  providers: [AiServiceService],
})
export class AiServiceModule {}
