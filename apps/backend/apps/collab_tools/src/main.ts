import { NestFactory } from '@nestjs/core';
import { CollabToolsModule } from './collab_tools.module';

async function bootstrap() {
  const app = await NestFactory.create(CollabToolsModule);
  await app.listen(process.env.COLLAB_TOOL_PORT || 4004);
}
bootstrap();
