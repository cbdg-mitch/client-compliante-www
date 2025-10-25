"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Regulatory Compliance", href: "/services/compliance" },
      { name: "Revenue Optimization", href: "/services/revenue-optimization" },
      { name: "Risk Management", href: "/services/risk-management" },
    ],
  },
  {
    name: "Partners",
    href: "/partners",
    children: [
      { name: "AlzBetter", href: "/partners/alzbetter" },
      { name: "SmartFit", href: "/partners/smartfit" },
      { name: "Healthy Blue Lighting", href: "/partners/healthy-blue-lighting" },
      { name: "Rudio", href: "/partners/rudio" },
    ],
  },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Container>
        <nav className="flex items-center justify-between py-4" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Compliante Solutions</span>
              <div className="relative h-12 w-48">
                <Image
                  src="/images/logo_transparent.png"
                  alt="Compliante Solutions logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-text"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium leading-6 text-brand-text hover:text-brand-primary transition-colors"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 rounded-xl bg-surface border border-surface-border shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg mx-1"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button asChild>
              <Link href="/contact">Request a Practice Analysis</Link>
            </Button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Compliante Solutions</span>
                <div className="relative h-10 w-40">
                  <Image
                    src="/images/logo_transparent.png"
                    alt="Compliante Solutions logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-brand-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-surface-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <div className="ml-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm leading-7 text-brand-text/80 hover:bg-brand-primary/10 hover:text-brand-primary"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Request a Practice Analysis
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}