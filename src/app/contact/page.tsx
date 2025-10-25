import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Request a Practice Analysis",
  description: "Get in touch with Compliante Solutions for expert healthcare compliance, risk management, and revenue optimization services.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="bg-white border-b-4 border-brand-secondary py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-brand-text leading-relaxed">
              Ready to strengthen your healthcare practice? Let&apos;s discuss how we can help 
              you achieve better compliance, reduce risk, and optimize revenue.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-brand-primary/2 via-transparent to-brand-secondary/2">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-brand-primary font-heading mb-6">
                Request a Practice Analysis
              </h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-primary font-heading mb-6">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10">
                    <Mail className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-primary">Email</p>
                    <a
                      href="mailto:info@compliantesolutions.com"
                      className="text-brand-text hover:text-brand-primary transition-colors"
                    >
                      info@compliantesolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10">
                    <Phone className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-primary">Phone</p>
                    <a
                      href="tel:+1-555-123-4567"
                      className="text-brand-text hover:text-brand-primary transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10">
                    <MapPin className="h-5 w-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-primary">Office</p>
                    <p className="text-brand-text">
                      Available for virtual consultations nationwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-brand-primary/5 p-6">
                <h3 className="font-semibold text-brand-primary mb-2">
                  Response Time
                </h3>
                <p className="text-sm text-brand-text">
                  We typically respond to all inquiries within 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}