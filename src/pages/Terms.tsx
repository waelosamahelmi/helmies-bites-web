import { ScrollReveal } from '../components/ScrollReveal';
import {
  FileCheck,
  CreditCard,
  UserCheck,
  AlertCircle,
  Scale,
  XCircle,
  Clock,
  Mail,
  Shield
} from 'lucide-react';

const LAST_UPDATED = 'February 26, 2026';
const CONTACT_EMAIL = 'legal@helmiesbites.fi';

const sections = [
  {
    id: 'acceptance',
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Acceptance of Terms',
    content: (
      <div className="space-y-4">
        <p>
          By accessing or using Helmies Bites services, you agree to be bound by these Terms of
          Service and all applicable laws and regulations. If you do not agree with any of these
          terms, you are prohibited from using our services.
        </p>
        <p>
          These terms constitute a legally binding agreement between you and Helmies Bites Oy,
          a company registered in Finland.
        </p>
      </div>
    ),
  },
  {
    id: 'service-description',
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Description of Service',
    content: (
      <div className="space-y-4">
        <p>
          Helmies Bites provides a restaurant website builder and online ordering platform that
          enables restaurants to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Create and customize restaurant websites</li>
          <li>Display menus and pricing information</li>
          <li>Accept online orders and payments</li>
          <li>Manage orders and customer communications</li>
          <li>Integrate with domain and hosting services</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of our services at
          any time without prior notice.
        </p>
      </div>
    ),
  },
  {
    id: 'user-responsibilities',
    icon: <UserCheck className="h-6 w-6" />,
    title: 'User Responsibilities',
    content: (
      <div className="space-y-4">
        <p>As a user of our services, you agree to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
          <li>Comply with all applicable laws and regulations</li>
          <li>Not use our services for any illegal or unauthorized purpose</li>
          <li>Not attempt to gain unauthorized access to our systems</li>
          <li>Not interfere with or disrupt our services or servers</li>
        </ul>
        <p className="text-white/60 italic">
          You are solely responsible for the content you publish on your restaurant website,
          including menu items, prices, and images.
        </p>
      </div>
    ),
  },
  {
    id: 'payment-terms',
    icon: <CreditCard className="h-6 w-6" />,
    title: 'Payment and Billing',
    content: (
      <div className="space-y-4">
        <h4 className="font-semibold text-white">Service Fees</h4>
        <p>
          Helmies Bites charges a service fee of 5% on each online order processed through our
          platform. This fee is automatically deducted from the order total before settlement.
        </p>

        <h4 className="font-semibold text-white mt-6">Optional Add-ons</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Cash on Delivery: €30/month</li>
          <li>AI Assistant: €10/month</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">Payment Processing</h4>
        <p>
          All payments are processed through third-party payment processors (Stripe, PayPal).
          Additional payment processor fees may apply and are separate from our service fees.
        </p>

        <h4 className="font-semibold text-white mt-6">Settlement</h4>
        <p>
          Order proceeds (minus our service fee and payment processor fees) are settled to your
          designated bank account on a weekly basis, typically within 3-5 business days.
        </p>

        <h4 className="font-semibold text-white mt-6">Taxes</h4>
        <p>
          All prices are exclusive of VAT. Finnish VAT (25.5% as of 2026) is added to service
          fees where applicable. You are responsible for any taxes related to your business
          operations.
        </p>
      </div>
    ),
  },
  {
    id: 'cancellation',
    icon: <XCircle className="h-6 w-6" />,
    title: 'Cancellation and Termination',
    content: (
      <div className="space-y-4">
        <h4 className="font-semibold text-white">By You</h4>
        <p>
          You may cancel your account at any time by contacting us or through your account
          settings. Upon cancellation:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>You will continue to have access until the end of your current billing period</li>
          <li>All pending orders will be processed and settled</li>
          <li>Your website will be taken offline within 30 days</li>
          <li>You may request export of your data within 90 days</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">By Us</h4>
        <p>
          We reserve the right to suspend or terminate your account at any time for:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Violation of these Terms of Service</li>
          <li>Violation of applicable laws or regulations</li>
          <li>Fraudulent or abusive activity</li>
          <li>Extended period of inactivity (12+ months)</li>
        </ul>
        <p className="text-white/60 italic">
          We will provide reasonable notice before termination except in cases of fraud or
          illegal activity.
        </p>
      </div>
    ),
  },
  {
    id: ' refunds',
    icon: <CreditCard className="h-6 w-6" />,
    title: 'Refunds',
    content: (
      <div className="space-y-4">
        <p>
          Our service fee is non-refundable once an order has been processed. However, we may
          issue refunds or credits in our sole discretion in cases of:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Service interruptions lasting more than 24 hours</li>
          <li>Double charging due to technical errors</li>
          <li>Orders not fulfilled due to platform issues</li>
        </ul>
        <p>
          For customer refund requests related to orders, please refer to our individual
          restaurant refund policy, which you can set in your account settings.
        </p>
      </div>
    ),
  },
  {
    id: 'intellectual-property',
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Intellectual Property',
    content: (
      <div className="space-y-4">
        <h4 className="font-semibold text-white">Our Property</h4>
        <p>
          The Helmies Bites platform, including all software, designs, text, graphics, logos,
          and other content, is owned by Helmies Bites Oy and protected by intellectual
          property laws. You may not:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Copy, modify, or distribute our platform</li>
          <li>Use our trademarks without permission</li>
          <li>Reverse engineer or attempt to extract source code</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">Your Content</h4>
        <p>
          You retain ownership of all content you provide to our platform (menu items, images,
          descriptions). By using our services, you grant us a license to use, display, and
          process your content solely to provide our services to you.
        </p>

        <h4 className="font-semibold text-white mt-6">User-Generated Content</h4>
        <p>
          Customer reviews, feedback, and other user-generated content may be used by us for
          marketing and service improvement purposes, in accordance with our Privacy Policy.
        </p>
      </div>
    ),
  },
  {
    id: 'limitation-of-liability',
    icon: <AlertCircle className="h-6 w-6" />,
    title: 'Limitation of Liability',
    content: (
      <div className="space-y-4">
        <p className="font-semibold text-white">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, HELMIES BITES SHALL NOT BE LIABLE FOR:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Lost profits or lost business opportunities</li>
          <li>Loss of data or corruption of data</li>
          <li>Service interruptions or downtime</li>
          <li>Actions or omissions by third parties (payment processors, delivery services)</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">Total Liability</h4>
        <p>
          Our total liability to you for all claims shall not exceed the amount of service fees
          you paid to us in the 12 months preceding the claim. This limitation applies to all
          causes of action in the aggregate.
        </p>

        <h4 className="font-semibold text-white mt-6">No Warranties</h4>
        <p>
          Our services are provided "as is" without warranties of any kind, whether express or
          implied. We do not guarantee uninterrupted or error-free operation.
        </p>
      </div>
    ),
  },
  {
    id: 'dispute-resolution',
    icon: <Scale className="h-6 w-6" />,
    title: 'Dispute Resolution',
    content: (
      <div className="space-y-4">
        <h4 className="font-semibold text-white">Governing Law</h4>
        <p>
          These Terms of Service are governed by the laws of Finland. Any disputes relating to
          these terms shall be resolved in the courts of Helsinki, Finland.
        </p>

        <h4 className="font-semibold text-white mt-6">Resolution Process</h4>
        <p>
          We encourage you to contact us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7A00] hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          to resolve any issues informally. Most disputes can be resolved quickly through direct
          communication.
        </p>

        <h4 className="font-semibold text-white mt-6">EU Consumer Rights</h4>
        <p>
          For consumers located in the European Union, you may have access to alternative
          dispute resolution mechanisms through the EU Online Dispute Resolution platform.
        </p>
      </div>
    ),
  },
  {
    id: 'indemnification',
    icon: <Shield className="h-6 w-6" />,
    title: 'Indemnification',
    content: (
      <div className="space-y-4">
        <p>
          You agree to indemnify, defend, and hold harmless Helmies Bites and its affiliates,
          officers, directors, employees, and agents from and against any claims, damages,
          losses, liabilities, and expenses arising from:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Your use of our services</li>
          <li>Your violation of these Terms of Service</li>
          <li>Your violation of any third-party rights</li>
          <li>Content you provide or publish through our platform</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'modifications',
    icon: <Clock className="h-6 w-6" />,
    title: 'Modifications to Terms',
    content: (
      <div className="space-y-4">
        <p>
          We reserve the right to modify these Terms of Service at any time. We will notify you
          of material changes by:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Posting the new terms on our platform</li>
          <li>Sending an email to your registered email address</li>
          <li>Displaying a prominent notice in your account dashboard</li>
        </ul>
        <p>
          Continued use of our services after modifications constitutes acceptance of the new
          terms. If you do not agree to the modified terms, you must discontinue use of our
          services.
        </p>
      </div>
    ),
  },
  {
    id: 'general-provisions',
    icon: <FileCheck className="h-6 w-6" />,
    title: 'General Provisions',
    content: (
      <div className="space-y-4">
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Entire Agreement:</strong> These terms constitute the entire agreement
            between you and Helmies Bites regarding our services.
          </li>
          <li>
            <strong>Severability:</strong> If any provision is found invalid, the remaining
            provisions shall remain in full force.
          </li>
          <li>
            <strong>Waiver:</strong> Our failure to enforce any right does not constitute a
            waiver of that right.
          </li>
          <li>
            <strong>Assignment:</strong> You may not assign these terms without our consent.
            We may assign our rights and obligations without restriction.
          </li>
          <li>
            <strong>Force Majeure:</strong> We are not liable for delays or failures due to
            causes beyond our reasonable control.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'contact',
    icon: <Mail className="h-6 w-6" />,
    title: 'Contact Us',
    content: (
      <div className="space-y-4">
        <p>
          If you have questions about these Terms of Service, please contact us:
        </p>
        <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
          <p className="font-semibold text-white">Legal Contact</p>
          <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7A00] hover:underline">{CONTACT_EMAIL}</a></p>
          <p>Address: Helsinki, Finland</p>
          <p>Business ID: (Finnish: Y-tunnus) Available upon request</p>
        </div>
      </div>
    ),
  },
];

export function Terms() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20">
      {/* Header */}
      <div className="bg-[#1A1410] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FF7A00]/10 rounded-lg">
              <FileCheck className="h-6 w-6 text-[#FF7A00]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-white/60">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1A1410] rounded-xl shadow-sm border border-white/5 p-4 lg:sticky lg:top-24">
              <h3 className="font-semibold text-white mb-4">Table of Contents</h3>
              <nav className="space-y-2 max-h-[70vh] overflow-y-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScrollToSection(section.id)}
                    className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handlePrint}
                  className="w-full text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-[#2A1F15]/30 transition-colors"
                >
                  Print this page
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-[#1A1410] rounded-xl shadow-sm border border-white/5 p-8">
              {/* Introduction */}
              <ScrollReveal>
                <div className="prose prose-gray max-w-none mb-12">
                  <p className="text-lg text-white/80 leading-relaxed">
                    Welcome to Helmies Bites. These Terms of Service govern your use of our
                    restaurant platform and online ordering services. By using our services, you
                    agree to these terms. Please read them carefully.
                  </p>
                </div>
              </ScrollReveal>

              {/* Sections */}
              {sections.map((section, index) => (
                <ScrollReveal key={section.id} delay={index * 0.05}>
                  <section
                    id={section.id}
                    className="mb-12 scroll-mt-24 last:mb-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    </div>
                    <div className="text-white/80 leading-relaxed pl-11">
                      {section.content}
                    </div>
                  </section>
                </ScrollReveal>
              ))}

              {/* Footer Note */}
              <ScrollReveal>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/50">
                    These Terms of Service are designed to comply with Finnish and European Union
                    consumer protection laws. If you have any questions about your rights as a
                    consumer, please contact us or your local consumer protection authority.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </main>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .bg-gradient-to-br {
            background: white !important;
          }
          aside {
            display: none !important;
          }
          .shadow-sm {
            box-shadow: none !important;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
