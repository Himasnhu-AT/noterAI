import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default SignInDto;
