import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class EmailsSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  announcements: boolean;

  @IsBoolean()
  @IsNotEmpty()
  securityFeatures: boolean;

  @IsBoolean()
  @IsNotEmpty()
  productUpgrades: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
