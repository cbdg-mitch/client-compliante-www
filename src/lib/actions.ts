"use server";

export async function submitContactForm(formData: FormData) {
  // Honeypot check
  const honeypot = formData.get("website");
  if (honeypot) {
    return { success: false, error: "Invalid submission" };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const interest = formData.get("interest") as string;
  const message = formData.get("message") as string;

  // Validation
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  // For now, just log the submission
  console.log("Contact form submission:", {
    name,
    email,
    interest,
    message,
    timestamp: new Date().toISOString(),
  });

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true };
}