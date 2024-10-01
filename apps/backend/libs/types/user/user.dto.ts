import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookDto } from '../editor/book.dto';
import { UserSettingsDto } from './setting.user.dto';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsBoolean()
  @IsNotEmpty()
  isVerified: boolean;

  @ValidateNested({ each: true })
  @Type(() => BookDto)
  books: BookDto[];

  @ValidateNested()
  @Type(() => UserSettingsDto)
  @IsOptional()
  settings?: UserSettingsDto;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
