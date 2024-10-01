import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BlockTypeEnum } from './block-type.enum';

export class BlockDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  noteId: string;

  @IsEnum(BlockTypeEnum)
  @IsNotEmpty()
  type: BlockTypeEnum;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
