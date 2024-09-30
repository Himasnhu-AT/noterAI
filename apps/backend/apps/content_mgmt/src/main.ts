import { NestFactory } from '@nestjs/core';
import { ContentMgmtModule } from './content_mgmt.module';

async function bootstrap() {
  const app = await NestFactory.create(ContentMgmtModule);
  await app.listen(process.env.CONTENT_MGMT_PORT || 4002);
}
bootstrap();
