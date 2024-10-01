import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NoteDto } from './note.dto';

export class SectionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;

  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  notes: NoteDto[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
