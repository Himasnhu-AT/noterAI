import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './book.service';
import { Public } from 'src/custom.decorator/custom.decorator';
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from './dto/book.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('new/book')
  @UseGuards(AuthGuard('jwt'))
  addNewBook(@Body() dto: BookDto, @Req() request) {
    return this.userService.addNewBook(request, dto);
  }
}
