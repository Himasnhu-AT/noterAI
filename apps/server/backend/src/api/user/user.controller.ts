import { Controller, Get } from "@nestjs/common";
import { Public } from "src/custom.decorator/custom.decorator";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

}