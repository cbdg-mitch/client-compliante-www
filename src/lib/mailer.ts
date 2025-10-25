// lib/mailer.ts
// Email sending via Mailgun API

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  serviceArea?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@compliantesolutions.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || `noreply@${domain}`;

  if (!apiKey || !domain) {
    console.error("[mailer] MAILGUN_API_KEY or MAILGUN_DOMAIN not configured");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("from", `Compliante Solutions <${fromEmail}>`);
    formData.append("to", toEmail);
    formData.append("subject", `Contact Form Submission: ${data.name}`);
    formData.append("text", `
Name: ${data.name}
Email: ${data.email}
Service Area: ${data.serviceArea || "Not specified"}

Message:
${data.message}

---
Sent from compliantesolutions.com contact form
    `.trim());
    formData.append("h:Reply-To", data.email);

    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[mailer] Mailgun API error:", error);
      return false;
    }

    const result = await response.json();
    console.log("[mailer] Email sent successfully:", result.id);
    return true;
  } catch (error) {
    console.error("[mailer] Failed to send email:", error);
    return false;
  }
}
