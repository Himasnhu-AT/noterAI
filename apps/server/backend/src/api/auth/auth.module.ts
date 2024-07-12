import { Module, Scope } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import Redis from 'ioredis';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
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
    ConfigService,
  ],
  exports: [AuthService, ConfigService],
})
export class AuthModule {}
