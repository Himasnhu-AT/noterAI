import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SectionDto } from './section.dto';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
