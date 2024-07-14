import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Redis } from "ioredis";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello from User Service!';
  }

}