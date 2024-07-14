import { Module, Scope } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Redis } from "ioredis";
import { JwtStrategy } from "../auth/jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthService } from "../auth/auth.service";


@Module({
    imports: [ConfigModule],
    controllers: [UserController],
    providers: [UserService,  AuthService,
        {
          provide: 'REDIS',
          useFactory: () => {
            const client = new Redis(process.env.REDDIS_URL);
            client.on('error', (err) => console.error('Redis error', err));
            return client;
          },
          scope: Scope.DEFAULT,
        },
        JwtStrategy,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    exports: [UserService],
  })
  export class UserModule {}