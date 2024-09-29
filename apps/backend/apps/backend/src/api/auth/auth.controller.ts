import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto from './dto/signup.dto';
import { Public } from 'src/custom.decorator/custom.decorator';
import SignInDto from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import RetrieveInfoFromRequest from 'src/handlers/retriveInfoFromRequest.global';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Public()
  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('verify')
  verify(
    @Body() body: { email: string; token: string },
    @Res({ passthrough: true }) response,
  ) {
    return this.authService.verifyEmail(body, response);
  }

  @Public()
  @Get('password/forgot')
  forgotPassword(@Query('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Public()
  @Post('password/forgot/change')
  forgotPasswordEmailVerify(
    @Body() body: { email: string; token: string; newPassword: string },
  ) {
    return this.authService.forgotPasswordEmailVerify(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('password/update')
  updatePassword(
    @Body() dto: { newPassword: string; oldPassword: string },
    @Req() request,
  ) {
    return this.authService.updatePassword(dto, request);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('signout')
  async signoutUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id, email } = RetrieveInfoFromRequest(request);
    await this.authService.signoutUser(id, email, response);
  }

  @Public()
  @Post('signin')
  login(@Body() body: SignInDto, @Res({ passthrough: true }) response) {
    return this.authService.signIn(body, response);
  }
}
