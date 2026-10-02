export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface EmailProvider {
  name: string;
  sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }>;
}

export class ResendEmailProvider implements EmailProvider {
  name = "RESEND";

  async sendEmail(options: SendEmailOptions) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log(`[EMAIL DEV MOCK] To: ${options.to} | Subject: ${options.subject}`);
      return { success: true, id: `mock-email-${Date.now()}` };
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "holy.army <contact@holy.army>",
          to: options.to,
          subject: options.subject,
          text: options.text,
          html: options.html,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        return { success: false, error: JSON.stringify(errData) };
      }

      const data = await res.json();
      return { success: true, id: data.id };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}

export const emailService = new ResendEmailProvider();