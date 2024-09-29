import { Module } from '@nestjs/common';
import { UserController } from './book.controller';
import { UserService } from './book.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class BookModule {}
