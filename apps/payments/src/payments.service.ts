import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY') as string,
    { apiVersion: '2024-12-18.acacia' },
  );
  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      confirm: true,
      payment_method: 'pm_card_visa',
      currency: 'usd',
    });

    return paymentIntent;
  }
}
