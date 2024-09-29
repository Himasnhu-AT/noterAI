import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from 'apps/backend/prisma/prisma.service';
import sendEmail from 'apps/backend/handlers/email.global';
import handleErrors from 'apps/backend/handlers/handleErrors.global';
import RetrieveInfoFromRequest from 'apps/backend/handlers/retriveInfoFromRequest.global';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
    private jwtService: JwtService,
  ) {}

  async sendVerificationCode(
    email: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
      const res = await sendEmail(email, subject, text);
      return res;
    } catch (error) {
      return false;
    }
  }

  getHello(): string {
    return 'Hello from Auth Service!';
  }

  async signUp(body: SignUpDto) {
    const { name, email, password, userName } = body;

    if (!userName || !email || !password || !name) {
      throw new ForbiddenException('Missing required fields');
    }

    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password,
      )
    ) {
      throw new ForbiddenException(
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new ForbiddenException('Invalid email format');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = randomBytes(32).toString('hex');

    const user = await this.prisma.user
      .create({
        data: {
          name,
          userName,
          email,
          token,
          password: hashedPassword,
          settings: {
            create: {
              emailSubscription: {
                create: {},
              },
            },
          },
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    //! @Himasnhu-AT Improve verification Code generation logic
    const verificationCode = Math.random().toString(8).substring(2);

    try {
      await this.redisClient.set(email, verificationCode);
    } catch (error) {
      return error;
    } finally {
      const subject = 'Email Verification';
      const text = `Your verification code is ${verificationCode}`;
      await this.sendVerificationCode(email, subject, text);
    }

    delete (user as { password: string }).password;
    return user;
  }

  async verifyEmail(body: { email: string; token: string }, response) {
    const verificationCode = await this.redisClient.get(body.email);

    if (verificationCode !== body.token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    await this.redisClient.del(body.email);

    const user = await this.prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        isVerified: true,
      },
    });

    const payload = {
      sub: (user as { id: string }).id,
      email: (user as { email: string }).email,
      token: (user as { token: string }).token,
      userName: (user as { userName: string }).userName,
    };

    const access_token: string = this.jwtService.sign(payload) || '';

    // Set the access_token as a cookie
    response.cookie('access_token', access_token, { httpOnly: true });
    return { message: 'Email verified successfully' };
  }

  async forgotPassword(email: string) {
    await this.prisma.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    const verificationCode = Math.random().toString(8).substring(2);

    if (await this.redisClient.get(email)) {
      await this.redisClient.del(email);
    }

    try {
      await this.redisClient.set(email, verificationCode);
    } catch (error) {
      return error;
    } finally {
      const subject = 'Email Verification';
      const text = `Your verification code is ${verificationCode}`;
      await this.sendVerificationCode(email, subject, text);
    }
  }

  async forgotPasswordEmailVerify(body: {
    email: string;
    token: string;
    newPassword: string;
  }) {
    const verificationCode = await this.redisClient
      .get(body.email)
      .catch((error) => {
        console.error(error);
        throw new NotFoundException('Token not found for given Email');
      });

    if (body.token != verificationCode) {
      throw new ForbiddenException('Wrong verification Code.');
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await this.prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Password changed successfully!' };
  }

  async updatePassword(
    dto: { newPassword: string; oldPassword: string },
    request: any,
  ) {
    const { id, email } = RetrieveInfoFromRequest(request);

    const user = await this.prisma.user
      .findUnique({
        where: {
          id,
          email,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    if (dto.oldPassword != (user as unknown as any).password) {
      await this.prisma.user
        .update({
          where: {
            id,
            email,
          },
          data: {
            password: hashedPassword,
          },
        })
        .catch((error) => {
          handleErrors(error);
        });
    }

    return `Password updated successfully!`;
  }

  async signoutUser(id, email, response) {
    // const { id, email } = RetrieveInfoFromRequest(request);

    await this.prisma.user
      .update({
        where: {
          id,
          email,
        },
        data: {
          token: null,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    response.cookie('access_token', '', { httpOnly: true });

    return `SignOut Successful!`;
  }

  async signIn(body: SignInDto, response) {
    console.log('body', body);
    const { email, password } = body;

    if (!email || !password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = Math.random().toString(36).substring(2);
    const user = await this.prisma.user
      .update({
        where: {
          email,
        },
        data: {
          token,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (user as { password: string }).password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: (user as { id: string }).id,
      email: (user as { email: string }).email,
      token: (user as { token: string }).token,
      userName: (user as { userName: string }).userName,
    };

    const access_token: string = this.jwtService.sign(payload) || '';

    const verificationCode = Math.random().toString(8).substring(2);

    try {
      await this.redisClient.set(email, verificationCode);
    } catch (error) {
      return error;
    } finally {
      const subject = 'Email Verification';
      const text = `Your verification code is ${verificationCode}`;
      await this.sendVerificationCode(email, subject, text);
    }

    // Set the access_token as a cookie
    response.cookie('access_token', access_token, { httpOnly: true });

    delete (user as { password: string }).password;
    return user;
  }
}
