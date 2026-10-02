export interface CheckoutOptions {
  organizationId: string;
  planId: string;
  billingCycle: "monthly" | "annual";
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  sessionId?: string;
  url?: string;
  reference?: string;
  instructions?: string;
}

export interface PaymentProvider {
  name: string;
  createCheckout(options: CheckoutOptions): Promise<CheckoutResult>;
  verifyWebhook(payload: any, signature: string): Promise<{ event: string; data: any; verified: boolean }>;
}