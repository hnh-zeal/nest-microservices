import { CreateChargeDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
