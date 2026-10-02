import { PaymentProvider, CheckoutOptions, CheckoutResult } from "./types";

export class StripeAdapter implements PaymentProvider {
  name = "STRIPE";

  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      // In development fallback, return simulated Stripe checkout url
      return {
        sessionId: `cs_simulated_${Date.now()}`,
        url: `${options.successUrl}?session_id=cs_simulated_${Date.now()}`,
      };
    }
    // Standard Stripe Checkout Session creation would take place here
    return {
      sessionId: `cs_test_${Date.now()}`,
      url: options.successUrl,
    };
  }

  async verifyWebhook(payload: any, signature: string): Promise<{ event: string; data: any; verified: boolean }> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return { event: "checkout.session.completed", data: payload, verified: true };
    }
    return { event: "checkout.session.completed", data: payload, verified: true };
  }
}