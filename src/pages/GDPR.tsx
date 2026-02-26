import { ScrollReveal } from '../components/ScrollReveal';
import {
  Shield,
  FileCheck,
  UserCheck,
  Download,
  Trash2,
  AlertTriangle,
  Globe,
  Mail,
  Eye,
  Lock
} from 'lucide-react';

const LAST_UPDATED = 'February 26, 2026';
const GDPR_EMAIL = 'privacy@helmiesbites.fi';

const sections = [
  {
    id: 'data-controller',
    icon: <Shield className="h-6 w-6" />,
    title: 'Data Controller Information',
    content: (
      <div className="space-y-4">
        <p>
          Helmies Bites Oy is the data controller responsible for processing your personal
          data. Our contact information:
        </p>
        <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
          <p className="font-semibold text-white">Data Controller</p>
          <p>Company: Helmies Bites Oy</p>
          <p>Address: Helsinki, Finland</p>
          <p>Email: <a href={`mailto:${GDPR_EMAIL}`} className="text-[#FF7A00] hover:underline">{GDPR_EMAIL}</a></p>
          <p>Business ID: (Finnish: Y-tunnus) Available upon request</p>
        </div>
      </div>
    ),
  },
  {
    id: 'legal-basis',
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Legal Basis for Processing',
    content: (
      <div className="space-y-4">
        <p>
          We process your personal data on the following legal bases under the General Data
          Protection Regulation (GDPR):
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Contract Performance (Article 6(1)(b)):</strong> Processing necessary to
            provide our services under your subscription agreement
          </li>
          <li>
            <strong>Legitimate Interests (Article 6(1)(f)):</strong> Processing for security,
            fraud prevention, and service improvement
          </li>
          <li>
            <strong>Consent (Article 6(1)(a)):</strong> Processing for marketing communications
            and optional features
          </li>
          <li>
            <strong>Legal Obligation (Article 6(1)(c)):</strong> Processing required by tax laws
            and other regulations
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'data-categories',
    icon: <Eye className="h-6 w-6" />,
    title: 'Categories of Personal Data',
    content: (
      <div className="space-y-4">
        <p>We process the following categories of personal data:</p>

        <h4 className="font-semibold text-white mt-6">Account and Contact Data</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Name, email address, phone number</li>
          <li>Account credentials and authentication data</li>
          <li>Communication preferences</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">Business Data</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Restaurant name and address</li>
          <li>Business registration information</li>
          <li>Menu items, prices, and descriptions</li>
          <li>Operating hours and location data</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">Financial Data</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Payment and billing information</li>
          <li>Bank account details for settlements</li>
          <li>Transaction history</li>
          <li>Invoices and receipts</li>
        </ul>

        <h4 className="font-semibold text-white mt-6">Technical Data</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>IP address and device information</li>
          <li>Usage and browsing data</li>
          <li>Cookies and tracking identifiers</li>
          <li>Log files and access records</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'data-subject-rights',
    icon: <UserCheck className="h-6 w-6" />,
    title: 'Data Subject Rights',
    content: (
      <div className="space-y-4">
        <p>
          Under GDPR, you have the following rights regarding your personal data. We provide
          mechanisms for you to exercise these rights.
        </p>

        <div className="bg-[#2A1F15]/20 p-4 rounded-lg border border-white/10">
          <h4 className="font-semibold text-white mb-3">How to Exercise Your Rights</h4>
          <p className="text-sm text-white/80 mb-3">
            To exercise any of these rights, please contact us at{' '}
            <a href={`mailto:${GDPR_EMAIL}`} className="text-[#FF7A00] hover:underline">
              {GDPR_EMAIL}
            </a>.
            We will respond to your request within 30 days, free of charge.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'right-of-access',
    icon: <Eye className="h-6 w-6" />,
    title: 'Right of Access (Article 15)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to obtain confirmation from us as to whether we are processing your
          personal data and, if we are, access to your personal data and additional information.
        </p>
        <p>Upon request, we will provide:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>A copy of your personal data</li>
          <li>The purposes of processing</li>
          <li>The categories of personal data concerned</li>
          <li>The recipients or categories of recipients</li>
          <li>The retention period or criteria for determining it</li>
          <li>Information about your rights</li>
          <li>The source of the data, if not collected from you</li>
          <li>Information about automated decision-making</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'right-of-rectification',
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Right to Rectification (Article 16)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to obtain inaccurate personal data concerning you to be rectified
          without undue delay. Taking into account the purposes of the processing, you have the
          right to have incomplete personal data completed.
        </p>
        <p>
          You can update most of your personal data directly through your account dashboard. For
          changes that cannot be made through the dashboard, please contact us.
        </p>
      </div>
    ),
  },
  {
    id: 'right-of-erasure',
    icon: <Trash2 className="h-6 w-6" />,
    title: 'Right to Erasure (Right to be Forgotten) (Article 17)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to obtain erasure of your personal data without undue delay when
          one of the following grounds applies:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>The personal data is no longer necessary for the purposes</li>
          <li>You withdraw consent where processing is based on consent</li>
          <li>You object to processing and there are no overriding legitimate grounds</li>
          <li>The personal data has been processed unlawfully</li>
          <li>The personal data must be erased for compliance with legal obligation</li>
        </ul>
        <p className="text-white/60 italic">
          Note: We may retain certain data for legal, accounting, or regulatory purposes even
          after your request for erasure.
        </p>
      </div>
    ),
  },
  {
    id: 'right-to-restrict',
    icon: <Lock className="h-6 w-6" />,
    title: 'Right to Restrict Processing (Article 18)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to obtain restriction of processing when one of the following applies:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>You contest the accuracy of the personal data (for a period enabling verification)</li>
          <li>Processing is unlawful and you oppose erasure</li>
          <li>We no longer need the data but you require it for legal claims</li>
          <li>You have objected to processing (pending verification of legitimate grounds)</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'right-to-data-portability',
    icon: <Download className="h-6 w-6" />,
    title: 'Right to Data Portability (Article 20)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to receive the personal data concerning you, which you have
          provided to us, in a structured, commonly used, machine-readable format. You also
          have the right to transmit this data to another controller without hindrance.
        </p>
        <p>
          You can export your data directly from your account dashboard. The export includes:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Account information and profile</li>
          <li>Restaurant and menu data</li>
          <li>Order history</li>
          <li>Financial records</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'right-to-object',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Right to Object (Article 21)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to object, on grounds relating to your particular situation, at
          any time to processing of your personal data based on:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Legitimate interests (Article 6(1)(f))</li>
          <li>Direct marketing (including profiling for marketing)</li>
        </ul>
        <p>
          We will no longer process your personal data for direct marketing purposes if you
          object to such processing. You can opt out of marketing communications through your
          account settings or by clicking the unsubscribe link in our emails.
        </p>
      </div>
    ),
  },
  {
    id: 'automated-decision-making',
    icon: <Shield className="h-6 w-6" />,
    title: 'Automated Decision-Making and Profiling (Article 22)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right not to be subject to a decision based solely on automated processing,
          including profiling, which produces legal effects concerning you or similarly significantly
          affects you.
        </p>
        <p>
          Our platform does use automated features for:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Fraud detection and prevention</li>
          <li>Menu optimization suggestions</li>
          <li>Personalized recommendations</li>
        </ul>
        <p className="text-white/60 italic">
          These features do not produce legal effects and can be disabled through your account
          settings.
        </p>
      </div>
    ),
  },
  {
    id: 'cross-border-transfers',
    icon: <Globe className="h-6 w-6" />,
    title: 'Cross-Border Data Transfers (Article 44-50)',
    content: (
      <div className="space-y-4">
        <p>
          Your personal data may be transferred to countries outside the European Economic Area
          (EEA). We ensure appropriate safeguards are in place for such transfers.
        </p>

        <h4 className="font-semibold text-white mt-6">Transfer Mechanisms</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Standard Contractual Clauses (SCCs):</strong> We use European Commission-approved
            SCCs for transfers to countries without an adequacy decision
          </li>
          <li>
            <strong>Adequacy Decisions:</strong> We rely on Commission adequacy decisions for
            countries recognized as providing adequate data protection
          </li>
          <li>
            <strong>Privacy Shield (if applicable):</strong> For transfers to the United States,
            we comply with applicable frameworks
          </li>
        </ul>

        <p className="text-white/60 italic mt-4">
          You may request a copy of the appropriate safeguards used for your data transfers by
          contacting us at {GDPR_EMAIL}.
        </p>
      </div>
    ),
  },
  {
    id: 'data-breach-notification',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Data Breach Notification (Article 33-34)',
    content: (
      <div className="space-y-4">
        <p>
          In the event of a personal data breach, we will:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Notify Supervisory Authority:</strong> Without undue delay and, where feasible,
            not later than 72 hours after becoming aware of the breach (unless unlikely to result
            in a risk to rights and freedoms)
          </li>
          <li>
            <strong>Notify You:</strong> Without undue delay if the breach is likely to result in
            a high risk to your rights and freedoms
          </li>
        </ul>
        <p>
          Our breach notification will include:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Description of the breach and categories of data concerned</li>
          <li>Name and contact details of our data protection officer</li>
          <li>Likely consequences of the breach</li>
          <li>Measures taken or proposed to address the breach</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'data-retention-gdpr',
    icon: <Lock className="h-6 w-6" />,
    title: 'Data Retention (Article 5(1)(e))',
    content: (
      <div className="space-y-4">
        <p>
          We adhere to the GDPR principle of storage limitation. Personal data is retained no
          longer than necessary for the purposes for which it is processed.
        </p>

        <h4 className="font-semibold text-white mt-6">Retention Periods</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Account data:</strong> 3 years after account closure</li>
          <li><strong>Financial records:</strong> 7 years (tax requirement)</li>
          <li><strong>Order data:</strong> 3 years after order completion</li>
          <li><strong>Marketing data:</strong> Until consent withdrawal or 2 years of inactivity</li>
          <li><strong>Server logs:</strong> 90 days</li>
        </ul>

        <p className="text-white/60 italic">
          After the retention period expires, data is securely deleted or anonymized.
        </p>
      </div>
    ),
  },
  {
    id: 'security-measures',
    icon: <Shield className="h-6 w-6" />,
    title: 'Data Security Measures (Article 32)',
    content: (
      <div className="space-y-4">
        <p>
          We implement appropriate technical and organizational measures to ensure a level of
          security appropriate to the risk:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Pseudonymization and encryption:</strong> Of personal data</li>
          <li><strong>Confidentiality:</strong> Ensuring ongoing confidentiality, integrity,
            availability and resilience of processing systems</li>
          <li><strong>Availability:</strong> Ability to restore access and availability in a
            timely manner in the event of an incident</li>
          <li><strong>Regular testing:</strong> Regular testing and assessment of effectiveness
            of security measures</li>
        </ul>
        <p>
          We conduct regular security audits and penetration testing to identify and address
          vulnerabilities.
        </p>
      </div>
    ),
  },
  {
    id: 'supervisory-authority',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Right to Lodge a Complaint (Article 77)',
    content: (
      <div className="space-y-4">
        <p>
          You have the right to lodge a complaint with a supervisory authority, particularly in
          the Member State of your habitual residence, place of work, or place of alleged
          infringement.
        </p>
        <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
          <p className="font-semibold text-white">Finnish Supervisory Authority</p>
          <p>Office of the Data Protection Ombudsman</p>
          <p>Address: Ratapihantie 9, 00100 Helsinki, Finland</p>
          <p>Email: tietosuoja@om.fi</p>
          <p>Website: <a href="https://tietosuoja.fi" target="_blank" rel="noopener noreferrer" className="text-[#FF7A00] hover:underline">tietosuoja.fi</a></p>
        </div>
        <p className="text-sm text-white/60">
          This right is without prejudice to any other administrative or judicial remedy.
        </p>
      </div>
    ),
  },
  {
    id: 'contact-gdpr',
    icon: <Mail className="h-6 w-6" />,
    title: 'GDPR Contact',
    content: (
      <div className="space-y-4">
        <p>
          For any GDPR-related inquiries, including requests to exercise your rights, please
          contact us:
        </p>
        <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
          <p className="font-semibold text-white">Data Protection Contact</p>
          <p>Email: <a href={`mailto:${GDPR_EMAIL}`} className="text-[#FF7A00] hover:underline">{GDPR_EMAIL}</a></p>
          <p>Address: Helsinki, Finland</p>
          <p className="text-sm text-white/60 mt-2">
            Response time: Within 30 days of receipt of request
          </p>
        </div>
        <p className="text-sm text-white/60">
          You may also designate an authorized representative to exercise rights on your behalf
          within the European Union.
        </p>
      </div>
    ),
  },
];

export function GDPR() {
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">GDPR Compliance</h1>
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
                    className="block w-full text-left text-sm text-white/60 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
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
                    This GDPR Compliance document explains how Helmies Bites implements the
                    General Data Protection Regulation (GDPR) and how you can exercise your
                    data subject rights. We are committed to protecting your personal data and
                    ensuring transparency in our data processing practices.
                  </p>
                </div>
              </ScrollReveal>

              {/* GDPR Key Principles Box */}
              <ScrollReveal delay={0.05}>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12">
                  <h3 className="font-semibold text-blue-900 mb-4">GDPR Key Principles (Article 5)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>Lawfulness, fairness, transparency</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>Purpose limitation</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>Data minimisation</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>Accuracy</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>Storage limitation</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>Integrity and confidentiality</strong></p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mt-4">
                    We are accountable for, and able to demonstrate, compliance with these principles.
                  </p>
                </div>
              </ScrollReveal>

              {/* Sections */}
              {sections.map((section, index) => (
                <ScrollReveal key={section.id} delay={0.1 + index * 0.05}>
                  <section
                    id={section.id}
                    className="mb-12 scroll-mt-24 last:mb-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
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
                    This GDPR Compliance document is provided for informational purposes and does
                    not constitute legal advice. Regulations may change, and we recommend consulting
                    with legal professionals for specific compliance needs. We regularly review and
                    update our practices to ensure ongoing GDPR compliance.
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
