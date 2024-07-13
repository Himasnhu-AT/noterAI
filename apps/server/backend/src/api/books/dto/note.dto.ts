import { IsString, IsUUID, IsNotEmpty, IsDate } from 'class-validator';
import { SectionDTO } from './section.dto';

export class NoteDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsUUID()
  sectionId: string;

  @IsNotEmpty()
  section: SectionDTO;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<NoteDTO>) {
    Object.assign(this, partial);
  }
}