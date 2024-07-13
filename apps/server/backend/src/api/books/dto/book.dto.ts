import { IsString, IsUUID, IsNotEmpty, IsArray, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { SectionDTO } from './section.dto';

export class BookDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => SectionDTO)
  sections: SectionDTO[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<BookDTO>) {
    Object.assign(this, partial);
  }
}

