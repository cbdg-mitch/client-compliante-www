import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Leadership & Company Mission",
  description: "Meet the leadership team at Compliante Solutions. Over 25 years of healthcare compliance and business expertise.",
};

export default function AboutPage() {

  return (
    <>
      <Section className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-heading">
              About Compliante Solutions
            </h1>
            <div className="mt-8 prose-lg">
              <p className="text-xl text-gray-600 leading-relaxed">
                Compliante Solutions represents a comprehensive approach to healthcare business partnership. 
                We understand that today&apos;s healthcare organizations face unprecedented challenges across 
                compliance, risk management, and financial performance.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our mission is simple: to serve as your complete healthcare business partner, providing 
                the expertise and innovation you need to thrive in an increasingly complex environment.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-primary font-heading sm:text-4xl">
              Leadership Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our leadership brings decades of combined experience in healthcare compliance, 
              risk management, and business operations.
            </p>
          </div>

          <div className="space-y-24">
            {/* Robert W. Lowder */}
            <div className="grid gap-12 lg:grid-cols-[400px_1fr] items-center">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto">
                <Image
                  src="/images/bios/robert-lowder.webp"
                  alt="Robert W. Lowder - President"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
                  President
                </div>
                <h3 className="text-3xl font-bold text-primary font-heading">
                  Robert W. Lowder
                </h3>
                <div className="mt-6 prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Rob Lowder has been designing business processes and supporting software 
                    for the medical and insurance industries for over twenty years. Clients include 
                    managed care organizations, medical providers, service industry providers and 
                    general business. For payers he has designed billing and managed care 
                    companies, he has created medical claim processing systems and integrated 
                    managed care oversight programs for both medical and ancillary service providers, 
                    Mr. Lowder has designed systems ranging from pharmacy card plans to 
                    primary/specialty order entry.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Mr. Lowder has been focused on assisting a wide range of clients with their 
                    medical insurance compliance programs as Compliance Officer and President 
                    of Compliante Solutions, Inc.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Mr. Lowder is a graduate of the University of Florida with a BSBA degree in 
                    Economics. Postgraduate studies conducted at The George Washington 
                    University and Old Dominion University respectively, included Industrial 
                    Personnel Management and an MBA course of instruction. He was also a 
                    founding partner of The Provider Management Group, Inc., a Florida-based 
                    workers&apos; compensation PPO.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://www.linkedin.com/in/robert-w-lowder-91135a14/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium"
                  >
                    <Linkedin className="h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Charlotte H. Lowder */}
            <div className="grid gap-12 lg:grid-cols-[400px_1fr] items-center">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto lg:order-2">
                <Image
                  src="/images/bios/charlotte-lowder.webp"
                  alt="Charlotte H. Lowder - SVP Product Development"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="lg:order-1">
                <div className="inline-block px-4 py-1.5 bg-accent/20 text-primary text-sm font-semibold rounded-full mb-4">
                  SVP Product Development
                </div>
                <h3 className="text-3xl font-bold text-primary font-heading">
                  Charlotte H. Lowder ARM
                </h3>
                <div className="mt-6 prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Charlotte Lowder is a solution-focused, entrepreneurial professional with a 
                    broad background of demonstrated accomplishments in designing product, 
                    developing revenues, reducing expenses and enhancing operational 
                    effectiveness. She has marketing and management experience in the health 
                    care, managed care and Insurance industries.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Ms. Lowder began her career as a property and casualty insurance broker for 
                    large manufacturing concerns, healthcare organizations and government 
                    entities. Later, she shifted her attention to designing and implementing 
                    business transformation solutions for hospitals, clinics, nursing homes, 
                    managed care organizations, and rehabilitation centers. She has developed 
                    national programs that trained industry representatives and concerned 
                    medical professionals in the dynamics of managed care from the provider 
                    and payer perspective.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Ms. Lowder holds an Associate in Risk Management (ARM) degree from the 
                    Insurance Institute of America. She has served the sub-acute and long-term 
                    care industry as both Risk Manager and Director of Managed Care. Ms. Lowder 
                    was also a founding partner of The Provider Management Group, Inc., an 
                    award-winning Florida based workers&apos; compensation PPO.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://www.linkedin.com/in/charlotte-h-lowder-b7690414/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium"
                  >
                    <Linkedin className="h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-secondary/10 px-6 py-3">
              <span className="text-5xl font-bold text-secondary">25+</span>
              <span className="ml-3 text-lg font-medium text-gray-700">
                Years in Healthcare Innovation
              </span>
            </div>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Founded on decades of healthcare industry experience, we combine deep regulatory 
              knowledge with practical business acumen to deliver solutions that work in the real world.
            </p>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}