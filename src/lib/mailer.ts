// lib/mailer.ts
// Simple email sending abstraction
// In production, integrate with SendGrid, Resend, or similar

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  serviceArea?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const toEmail = process.env.CONTACT_TO_EMAIL;
  
  if (!toEmail) {
    console.warn("[mailer] CONTACT_TO_EMAIL not set. Email would be sent to:", data);
    console.log({
      to: "(not configured)",
      from: data.email,
      subject: `Contact Form: ${data.name}`,
      body: data.message,
      serviceArea: data.serviceArea || "Not specified",
    });
    return true; // Simulate success in development
  }

  // TODO: Integrate with actual email service (SendGrid, Resend, Nodemailer, etc.)
  // Example with fetch to email service API:
  /*
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: process.env.CONTACT_FROM_EMAIL || "noreply@compliantesolutions.com" },
      subject: `Contact Form: ${data.name}`,
      content: [{
        type: "text/plain",
        value: `
Name: ${data.name}
Email: ${data.email}
Service Area: ${data.serviceArea || "Not specified"}

Message:
${data.message}
        `.trim(),
      }],
    }),
  });

  return response.ok;
  */

  // For now, just log and return success
  console.log("[mailer] Would send email:", { to: toEmail, data });
  return true;
}
