import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}

export default SignUpDto;
