import { IsString, IsEmail, MinLength, MaxLength, IsDate, IsArray, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { BookDTO } from './book.dto';

export class UserDTO {
  @IsString()
  id: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookDTO)
  books: BookDTO[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}