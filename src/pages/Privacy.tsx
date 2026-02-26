import { ScrollReveal } from '../components/ScrollReveal';
import { Shield, Eye, Clock, Cookie, Mail, Lock } from 'lucide-react';

const LAST_UPDATED = 'February 26, 2026';
const PRIVACY_EMAIL = 'privacy@helmiesbites.fi';

const sections = [
  {
    id: 'information-collection',
    icon: <Eye className="h-6 w-6" />,
    title: 'Information Collection',
    content: (
      <div className="space-y-4">
        <p>
          At Helmies Bites, we collect information you provide directly to us and information we
          collect automatically when you use our services.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6">Information You Provide</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Account information (name, email address, restaurant name)</li>
          <li>Restaurant details (address, phone number, business hours)</li>
          <li>Menu items and pricing information</li>
          <li>Payment and billing information</li>
          <li>Communications with our support team</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6">Automatically Collected Information</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (pages visited, features used, time spent)</li>
          <li>Log data (access times, referring URLs)</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'data-usage',
    icon: <Shield className="h-6 w-6" />,
    title: 'How We Use Your Information',
    content: (
      <div className="space-y-4">
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices and support messages</li>
          <li>Respond to comments, questions, and customer service requests</li>
          <li>Communicate about products, services, and events</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, investigate, and prevent security incidents and fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'cookies',
    icon: <Cookie className="h-6 w-6" />,
    title: 'Cookies and Tracking Technologies',
    content: (
      <div className="space-y-4">
        <p>
          We use cookies and similar tracking technologies to collect and track information about
          your activities on our platform. Cookies are small data files stored on your device that
          help us provide you with a better experience.
        </p>
        <p>
          We use the following types of cookies:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Essential cookies:</strong> Required for the platform to function</li>
          <li><strong>Analytics cookies:</strong> Help us understand how users interact with our platform</li>
          <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
        </ul>
        <p>
          For more details, please see our{' '}
          <a href="/cookies" className="text-orange-600 hover:underline">
            Cookie Policy
          </a>.
        </p>
      </div>
    ),
  },
  {
    id: 'data-security',
    icon: <Lock className="h-6 w-6" />,
    title: 'Data Security',
    content: (
      <div className="space-y-4">
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized or unlawful processing, accidental loss, destruction,
          or damage.
        </p>
        <p>Our security measures include:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication systems</li>
          <li>Secure data centers with physical security controls</li>
        </ul>
        <p>
          However, no method of transmission over the internet is 100% secure. While we strive to
          protect your data, we cannot guarantee absolute security.
        </p>
      </div>
    ),
  },
  {
    id: 'user-rights',
    icon: <Shield className="h-6 w-6" />,
    title: 'Your Rights',
    content: (
      <div className="space-y-4">
        <p>Depending on your location, you may have the following rights:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
          <li><strong>Erasure:</strong> Request deletion of your personal data</li>
          <li><strong>Restriction:</strong> Request limitation of data processing</li>
          <li><strong>Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Objection:</strong> Object to processing of your data</li>
          <li><strong>Withdraw consent:</strong> Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{' '}
          <a href={`mailto:${PRIVACY_EMAIL}`} className="text-orange-600 hover:underline">
            {PRIVACY_EMAIL}
          </a>.
        </p>
      </div>
    ),
  },
  {
    id: 'data-retention',
    icon: <Clock className="h-6 w-6" />,
    title: 'Data Retention',
    content: (
      <div className="space-y-4">
        <p>
          We retain your personal information for as long as necessary to provide our services
          and fulfill the purposes outlined in this privacy policy.
        </p>
        <p>Retention periods vary based on:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>The type of data and its sensitivity</li>
          <li>The purpose for which it was collected</li>
          <li>Legal and regulatory requirements</li>
          <li>Statute of limitations for potential claims</li>
        </ul>
        <p>
          Account data is typically retained for 3 years after account closure. Financial records
          are retained for 7 years as required by tax laws.
        </p>
      </div>
    ),
  },
  {
    id: 'third-party-services',
    icon: <Shield className="h-6 w-6" />,
    title: 'Third-Party Services',
    content: (
      <div className="space-y-4">
        <p>
          We use third-party services to help operate our platform. These service providers have
          access to your personal information only to perform specific tasks on our behalf.
        </p>
        <p>Examples of third-party services include:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Payment processors (Stripe, PayPal)</li>
          <li>Cloud hosting providers</li>
          <li>Analytics services</li>
          <li>Email communication services</li>
          <li>Customer support tools</li>
        </ul>
        <p>
          We carefully select these partners and require them to comply with strict data
          protection standards.
        </p>
      </div>
    ),
  },
  {
    id: 'international-transfers',
    icon: <Shield className="h-6 w-6" />,
    title: 'International Data Transfers',
    content: (
      <div className="space-y-4">
        <p>
          Your information may be transferred to and processed in countries other than your own.
          We ensure appropriate safeguards are in place to protect your data in accordance with
          this privacy policy and applicable law.
        </p>
        <p>
          When transferring data from the European Economic Area (EEA), we rely on standard
          contractual clauses approved by the European Commission or other appropriate legal
          mechanisms.
        </p>
      </div>
    ),
  },
  {
    id: 'children-privacy',
    icon: <Shield className="h-6 w-6" />,
    title: 'Children Privacy',
    content: (
      <div className="space-y-4">
        <p>
          Our services are not intended for children under the age of 16. We do not knowingly
          collect personal information from children under 16. If you become aware that a child
          has provided us with personal information, please contact us immediately.
        </p>
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
          If you have questions, concerns, or complaints about this privacy policy or our data
          practices, please contact us:
        </p>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <p className="font-semibold text-gray-900">Privacy Contact</p>
          <p>Email: <a href={`mailto:${PRIVACY_EMAIL}`} className="text-orange-600 hover:underline">{PRIVACY_EMAIL}</a></p>
          <p>Address: Helsinki, Finland</p>
        </div>
        <p>
          For data subjects in the European Union, you also have the right to lodge a complaint
          with your local data protection authority.
        </p>
      </div>
    ),
  },
];

export function Privacy() {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:sticky lg:top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScrollToSection(section.id)}
                    className="block w-full text-left text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handlePrint}
                  className="w-full text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Print this page
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {/* Introduction */}
              <ScrollReveal>
                <div className="prose prose-gray max-w-none mb-12">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    At Helmies Bites, we take your privacy seriously. This Privacy Policy explains
                    how we collect, use, disclose, and safeguard your information when you use
                    our restaurant platform services. Please read this policy carefully.
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
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <div className="text-gray-700 leading-relaxed pl-11">
                      {section.content}
                    </div>
                  </section>
                </ScrollReveal>
              ))}

              {/* Footer Note */}
              <ScrollReveal>
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    This privacy policy is intended to comply with the General Data Protection
                    Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other
                    applicable data protection laws. We reserve the right to update this policy
                    from time to time. Any changes will be posted on this page with an updated
                    revision date.
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
