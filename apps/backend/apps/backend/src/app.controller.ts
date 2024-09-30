import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'libs/custom.decorator/custom.decorator';
import RetrieveInfoFromRequest from 'libs/handlers/retriveInfoFromRequest.global';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('validCookie')
  @UseGuards(AuthGuard('jwt'))
  getValidCookie(@Req() request) {
    return RetrieveInfoFromRequest(request);
  }
}
