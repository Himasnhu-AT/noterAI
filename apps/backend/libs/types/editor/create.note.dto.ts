import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBlockDto } from './create.block';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  sectionId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBlockDto)
  blocks: CreateBlockDto[];
}
