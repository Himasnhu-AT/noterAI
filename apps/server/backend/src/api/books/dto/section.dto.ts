import { IsString, IsUUID, IsNotEmpty, IsArray, ValidateNested, IsDate} from 'class-validator';
import { Type } from 'class-transformer';
import { NoteDTO } from './note.dto';

export class SectionDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsUUID()
  bookId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => NoteDTO)
  notes: NoteDTO[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<SectionDTO>) {
    Object.assign(this, partial);
  }
}