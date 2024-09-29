import { IsNotEmpty, IsString } from 'class-validator';

class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export { BookDto };
