import { Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import RetrieveInfoFromRequest from 'src/handlers/retriveInfoFromRequest.global';

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
}
