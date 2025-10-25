import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Prose } from "@/components/prose";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Compliante Solutions, Inc.",
};

export default function PrivacyPage() {
  return (
    <Section className="py-12">
      <Container>
        <Prose>
          <h1>Privacy Policy</h1>
          <p className="text-sm text-brand-text/70">Last updated: October 21, 2025</p>

          <h2>Introduction</h2>
          <p>
            Compliante Solutions, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed 
            to protecting your personal data. This privacy policy explains how we collect, use, and 
            safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect and process the following data about you:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Professional information (company name, job title)</li>
            <li>Information you provide when requesting a practice analysis or contacting us</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Send you information about our services and partnerships</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:privacy@compliantesolutions.com">privacy@compliantesolutions.com</a>
          </p>
        </Prose>
      </Container>
    </Section>
  );
}