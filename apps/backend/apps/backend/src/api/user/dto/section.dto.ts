import { IsNotEmpty, IsString } from 'class-validator';

class SectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export { SectionDto };
