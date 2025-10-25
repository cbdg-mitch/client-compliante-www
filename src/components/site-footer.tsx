import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-primary/20 bg-white">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-wider">
                Services
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/services/compliance" className="text-brand-text hover:text-brand-primary transition-colors">
                    Regulatory Compliance
                  </Link>
                </li>
                <li>
                  <Link href="/services/revenue-optimization" className="text-brand-text hover:text-brand-primary transition-colors">
                    Revenue Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/services/risk-management" className="text-brand-text hover:text-brand-primary transition-colors">
                    Risk Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-wider">
                Innovation Partners
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/partners/smartfit" className="text-brand-text hover:text-brand-primary transition-colors">
                    SmartFit
                  </Link>
                </li>
                <li>
                  <Link href="/partners/alzbetter" className="text-brand-text hover:text-brand-primary transition-colors">
                    AlzBetter
                  </Link>
                </li>
                <li>
                  <Link href="/partners/healthy-senior-lighting" className="text-brand-text hover:text-brand-primary transition-colors">
                    Healthy Senior Lighting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/about" className="text-brand-text hover:text-brand-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-brand-text hover:text-brand-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="text-brand-text hover:text-brand-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-brand-text hover:text-brand-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-primary/20 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm text-brand-text">
                © 2025 Compliante Solutions Inc. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-brand-text/70">
                Complete Privacy and Security Management for the Health, Insurance, and Financial Industries.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/company/compliante-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text/70 hover:text-brand-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}