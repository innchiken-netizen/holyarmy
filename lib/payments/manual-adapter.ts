import { PaymentProvider, CheckoutOptions, CheckoutResult } from "./types";

export class ManualPaymentAdapter implements PaymentProvider {
  name = "MANUAL";

  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const reference = `HA-MANUAL-${Date.now().toString(36).toUpperCase()}`;
    return {
      reference,
      instructions: `Veuillez effectuer votre virement bancaire ou paiement mobile avec la référence: ${reference}. holy.army validera votre accès dès réception.`,
      url: `/dashboard/billing?manual_ref=${reference}`,
    };
  }

  async verifyWebhook(): Promise<{ event: string; data: any; verified: boolean }> {
    return { event: "manual.noop", data: {}, verified: true };
  }
}