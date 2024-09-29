import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './api/auth/auth.controller';
import { AuthService } from './api/auth/auth.service';
import Redis from 'ioredis';
import { JwtStrategy } from './api/auth/jwt.strategy';
import { BookModule } from './api/user/book.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN || 604800 },
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
  ],
})
export class AppModule {}
