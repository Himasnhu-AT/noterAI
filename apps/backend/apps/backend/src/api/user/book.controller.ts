import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'libs/custom.decorator/custom.decorator';
import { BookDto, SectionDto, NoteDto } from 'libs/types';

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

  @Post('new/:bookId/section')
  @UseGuards(AuthGuard('jwt'))
  addNewSection(
    @Body() dto: SectionDto,
    @Param('bookId') bookId: string,
    @Req() request,
  ) {
    return this.userService.addNewSection(request, bookId, dto);
  }

  @Post('new/:bookId/:sectionId/note')
  @UseGuards(AuthGuard('jwt'))
  addNewNote(
    @Body() dto: NoteDto,
    @Param('sectionId') sectionId: string,
    @Param('bookId') bookId: string,
    @Req() request,
  ) {
    return this.userService.addNewNote(request, bookId, sectionId, dto);
  }

  @Get('books')
  @UseGuards(AuthGuard('jwt'))
  getBooks(@Req() request) {
    return this.userService.getBooks(request);
  }

  @Get(':bookId/sections')
  @UseGuards(AuthGuard('jwt'))
  getSections(@Param('bookId') bookId: string, @Req() request) {
    return this.userService.getSections(request, bookId);
  }

  @Get(':bookId/:sectionId/notes')
  @UseGuards(AuthGuard('jwt'))
  getNotes(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Req() request,
  ) {
    return this.userService.getNotes(request, bookId, sectionId);
  }

  @Get(':bookId/:sectionId/:noteId')
  @UseGuards(AuthGuard('jwt'))
  getNote(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Param('noteId') noteId: string,
    @Req() request,
  ) {
    return this.userService.getNote(request, bookId, sectionId, noteId);
  }

  @Patch(':bookId/:sectionId/:noteId/update')
  @UseGuards(AuthGuard('jwt'))
  updateNote(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Param('noteId') noteId: string,
    @Body() dto: NoteDto,
    @Req() request,
  ) {
    return this.userService.updateNote(request, bookId, sectionId, noteId);
  }

  @Patch(':bookId/update')
  @UseGuards(AuthGuard('jwt'))
  updateBook(
    @Param('bookId') bookId: string,
    @Body() dto: BookDto,
    @Req() request,
  ) {
    return this.userService.updateBook(request, bookId, dto);
  }

  @Patch(':bookId/:sectionId/update')
  @UseGuards(AuthGuard('jwt'))
  updateSection(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: SectionDto,
    @Req() request,
  ) {
    return this.userService.updateSection(request, bookId, sectionId, dto);
  }

  @Delete(':bookId/:sectionId/:noteId/delete')
  @UseGuards(AuthGuard('jwt'))
  deleteNote(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Param('noteId') noteId: string,
    @Req() request,
  ) {
    return this.userService.deleteNote(request, bookId, sectionId, noteId);
  }

  @Delete(':bookId/:sectionId/delete')
  @UseGuards(AuthGuard('jwt'))
  deleteSection(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Req() request,
  ) {
    return this.userService.deleteSection(request, bookId, sectionId);
  }

  @Delete(':bookId/delete')
  @UseGuards(AuthGuard('jwt'))
  deleteBook(@Param('bookId') bookId: string, @Req() request) {
    return this.userService.deleteBook(request, bookId);
  }
}
