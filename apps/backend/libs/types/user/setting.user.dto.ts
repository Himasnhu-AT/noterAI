import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EmailsSubscriptionDto } from './emailSubscription.dto';

export class UserSettingsDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  emailsSubscriptionId: string;

  @ValidateNested()
  @Type(() => EmailsSubscriptionDto)
  emailSubscription: EmailsSubscriptionDto;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
