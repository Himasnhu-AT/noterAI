import { IsNotEmpty, IsString } from 'class-validator';

export class SectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
