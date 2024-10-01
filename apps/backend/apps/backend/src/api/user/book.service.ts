import { Injectable } from '@nestjs/common';
import RetrieveInfoFromRequest from 'libs/handlers/retriveInfoFromRequest.global';
import { PrismaService } from 'libs/prisma/prisma.service';
import { BookDto, SectionDto, NoteDto } from 'libs/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'User Service is running';
  }

  async addNewBook(request: any, dto: BookDto) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    return await this.prisma.book.create({
      data: {
        title: dto.title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async addNewSection(request: any, bookId: string, dto: SectionDto) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    return await this.prisma.section.create({
      data: {
        title: dto.title,
        book: {
          connect: {
            id: bookId,
          },
        },
      },
    });
  }

  async addNewNote(
    request: any,
    bookId: string,
    sectionId: string,
    note: NoteDto,
  ) {
    const userId = RetrieveInfoFromRequest(request).id;

    //! TODO: Handle Note content
    console.log(note);

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (
      !(await this.prisma.section.findUnique({
        where: { bookId, id: sectionId },
      }))
    ) {
      throw new Error('Section not found');
    }

    // return await this.prisma.note.create({
    //   data: {
    //     // TODO save content
    //     // content: note.content,
    //     section: {
    //       connect: {
    //         id: sectionId,
    //       },
    //     },
    //   },
    // });
    return 'TODO';
  }

  async getBooks(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    return await this.prisma.book.findMany({
      where: {
        userId,
      },
    });
  }

  async getSections(request: any, bookId: string) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    return await this.prisma.section.findMany({
      where: {
        bookId,
      },
    });
  }

  async getNotes(request: any, bookId: string, sectionId: string) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    if (
      !(await this.prisma.section.findUnique({
        where: { bookId, id: sectionId },
      }))
    ) {
      throw new Error('Section not found');
    }

    return await this.prisma.note.findMany({
      where: {
        id: sectionId,
      },
    });
  }

  async getNote(
    request: any,
    bookId: string,
    sectionId: string,
    noteId: string,
  ) {
    {
      const userId = RetrieveInfoFromRequest(request).id;

      if (!userId) {
        throw new Error(
          'Unable to retrieve user information, please try again',
        );
      }

      if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
        throw new Error('User not found');
      }

      if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
        throw new Error('Book not found');
      }

      if (
        !(await this.prisma.section.findUnique({
          where: { bookId, id: sectionId },
        }))
      ) {
        throw new Error('Section not found');
      }

      if (
        !(await this.prisma.note.findUnique({
          where: { sectionId, id: noteId },
        }))
      ) {
        throw new Error('Note not found');
      }

      return await this.prisma.note.findUnique({
        where: {
          sectionId,
          id: noteId,
        },
      });
    }
  }

  async updateNote(
    request: any,
    bookId: string,
    sectionId: string,
    noteId: string,
  ) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    if (
      !(await this.prisma.section.findUnique({
        where: { bookId, id: sectionId },
      }))
    ) {
      throw new Error('Section not found');
    }

    if (
      !(await this.prisma.note.findUnique({ where: { sectionId, id: noteId } }))
    ) {
      throw new Error('Note not found');
    }

    return await this.prisma.note.update({
      where: {
        sectionId,
        id: noteId,
      },
      data: {
        // TODO save content
        // content: note.content,
      },
    });
  }

  async updateBook(request: any, bookId: string, dto: BookDto) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    return await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        title: dto.title,
      },
    });
  }

  async updateSection(
    request: any,
    bookId: string,
    sectionId: string,
    dto: SectionDto,
  ) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    if (
      !(await this.prisma.section.findUnique({
        where: { bookId, id: sectionId },
      }))
    ) {
      throw new Error('Section not found');
    }

    return await this.prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        title: dto.title,
      },
    });
  }

  async deleteNote(
    request: any,
    bookId: string,
    sectionId: string,
    noteId: string,
  ) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    if (
      !(await this.prisma.section.findUnique({
        where: { bookId, id: sectionId },
      }))
    ) {
      throw new Error('Section not found');
    }

    if (
      !(await this.prisma.note.findUnique({ where: { sectionId, id: noteId } }))
    ) {
      throw new Error('Note not found');
    }

    return await this.prisma.note.delete({
      where: {
        id: noteId,
      },
    });
  }

  async deleteSection(request: any, bookId: string, sectionId: string) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    if (
      !(await this.prisma.section.findUnique({
        where: { bookId, id: sectionId },
      }))
    ) {
      throw new Error('Section not found');
    }

    return await this.prisma.section.delete({
      where: {
        id: sectionId,
      },
    });
  }

  async deleteBook(request: any, bookId: string) {
    const userId = RetrieveInfoFromRequest(request).id;

    if (!userId) {
      throw new Error('Unable to retrieve user information, please try again');
    }

    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error('User not found');
    }

    if (!(await this.prisma.book.findUnique({ where: { id: bookId } }))) {
      throw new Error('Book not found');
    }

    return await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  }
}
