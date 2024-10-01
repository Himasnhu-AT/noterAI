import { IsString, IsNotEmpty } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
