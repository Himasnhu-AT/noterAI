import { Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import RetrieveInfoFromRequest from 'src/handlers/retriveInfoFromRequest.global';
import { SectionDto } from './dto/section.dto';

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
}
