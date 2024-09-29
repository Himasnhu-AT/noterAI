import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}