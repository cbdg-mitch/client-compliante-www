import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Prose } from "@/components/prose";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Compliante Solutions, Inc.",
};

export default function TermsPage() {
  return (
    <Section className="py-12">
      <Container>
        <Prose>
          <h1>Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: October 21, 2025</p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using the Compliante Solutions website and services, you accept and agree 
            to be bound by these Terms of Service and our Privacy Policy.
          </p>

          <h2>Use of Services</h2>
          <p>
            Our services are intended for healthcare organizations, professionals, and businesses 
            seeking compliance, risk management, and revenue optimization solutions. You agree to 
            use our services only for lawful purposes and in accordance with these terms.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the 
            property of Compliante Solutions, Inc. and is protected by intellectual property laws. 
            You may not reproduce, distribute, or create derivative works without our express permission.
          </p>

          <h2>Professional Services</h2>
          <p>
            The information provided on our website is for general informational purposes. It does 
            not constitute professional advice. For specific compliance, risk management, or revenue 
            optimization guidance, please contact us directly.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Compliante Solutions, Inc. shall not be liable 
            for any indirect, incidental, special, consequential, or punitive damages arising out 
            of your use of our website or services.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective 
            immediately upon posting to this website. Your continued use of our services after 
            changes are posted constitutes acceptance of the modified terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws 
            of the United States, without regard to conflict of law provisions.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:legal@compliantesolutions.com">legal@compliantesolutions.com</a>
          </p>
        </Prose>
      </Container>
    </Section>
  );
}