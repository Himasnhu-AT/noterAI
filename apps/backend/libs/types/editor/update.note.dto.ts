import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BlockDto } from './block.dto';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  sectionId: string;

  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks: BlockDto[];
}
