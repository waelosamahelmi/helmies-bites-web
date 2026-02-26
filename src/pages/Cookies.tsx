import { ScrollReveal } from '../components/ScrollReveal';
import {
  Cookie as CookieIcon,
  Shield,
  BarChart3,
  Megaphone,
  Lock,
  XCircle,
  CheckCircle2,
  Settings,
  Mail
} from 'lucide-react';

const LAST_UPDATED = 'February 26, 2026';
const PRIVACY_EMAIL = 'privacy@helmiesbites.fi';

interface CookieType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  purpose: string;
  provider: string;
  lifetime: string;
  examples: {
    name: string;
    purpose: string;
  }[];
}

const cookieTypes: CookieType[] = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    icon: <Lock className="h-6 w-6" />,
    description:
      'These cookies are strictly necessary for the platform to function. They enable core ' +
      'functionality such as user authentication, security, and access to secure areas. The ' +
      'platform cannot function properly without these cookies.',
    purpose: 'To enable essential platform functionality',
    provider: 'Helmies Bites',
    lifetime: 'Session to 1 year',
    examples: [
      { name: 'session_id', purpose: 'Maintains user session during navigation' },
      { name: 'csrf_token', purpose: 'Prevents Cross-Site Request Forgery attacks' },
      { name: 'auth_token', purpose: 'Authenticates user after login' },
      { name: 'cookie_consent', purpose: 'Remembers your cookie preferences' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    icon: <BarChart3 className="h-6 w-6" />,
    description:
      'These cookies help us understand how visitors interact with our platform by providing ' +
      'information about pages visited, time spent, and error messages encountered. This helps ' +
      'us improve the performance and user experience of our platform.',
    purpose: 'To analyze platform usage and improve performance',
    provider: 'Helmies Bites, Google Analytics',
    lifetime: 'Session to 2 years',
    examples: [
      { name: '_ga', purpose: 'Google Analytics - Identifies unique user' },
      { name: '_gid', purpose: 'Google Analytics - Distinguishes users' },
      { name: '_gat', purpose: 'Google Analytics - Throttles request rate' },
      { name: 'page_views', purpose: 'Counts pages visited during session' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    icon: <Megaphone className="h-6 w-6" />,
    description:
      'These cookies are used to deliver advertisements that are relevant to you and your ' +
      'interests. They are also used to limit the number of times you see an advertisement ' +
      'and help measure the effectiveness of advertising campaigns.',
    purpose: 'To deliver relevant advertisements and track campaign performance',
    provider: 'Helmies Bites, third-party advertising platforms',
    lifetime: 'Session to 1 year',
    examples: [
      { name: 'ad_personalization', purpose: 'Stores ad personalization preferences' },
      { name: 'ad_user_data', purpose: 'Controls sharing of data for ad personalization' },
      { name: 'campaign_id', purpose: 'Tracks which marketing campaign brought you here' },
      { name: 'conversion_id', purpose: 'Tracks conversions from advertising' },
    ],
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    icon: <Settings className="h-6 w-6" />,
    description:
      'These cookies enable enhanced functionality and personalization, such as videos and ' +
      'live chats. They may be set by us or by third-party providers whose services we have ' +
      'added to our pages.',
    purpose: 'To enable enhanced features and personalization',
    provider: 'Helmies Bites, third-party service providers',
    lifetime: 'Session to 1 year',
    examples: [
      { name: 'language_preference', purpose: 'Remembers selected language' },
      { name: 'theme_preference', purpose: 'Remembers visual theme selection' },
      { name: 'restaurant_location', purpose: 'Remembers last selected restaurant' },
      { name: 'wizard_progress', purpose: 'Saves progress in setup wizard' },
    ],
  },
];

export function Cookies() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAcceptAll = () => {
    // This would integrate with your cookie consent manager
    console.log('Accept all cookies');
  };

  const handleRejectNonEssential = () => {
    // This would integrate with your cookie consent manager
    console.log('Reject non-essential cookies');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-[#1A1410] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FF7A00]/10 rounded-lg">
              <CookieIcon className="h-6 w-6 text-[#FF7A00]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Cookie Policy</h1>
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
              <nav className="space-y-2">
                <button
                  onClick={() => handleScrollToSection('what-are-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  What Are Cookies?
                </button>
                <button
                  onClick={() => handleScrollToSection('how-we-use-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  How We Use Cookies
                </button>
                {cookieTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleScrollToSection(type.id)}
                    className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                  >
                    {type.name}
                  </button>
                ))}
                <button
                  onClick={() => handleScrollToSection('third-party-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  Third-Party Cookies
                </button>
                <button
                  onClick={() => handleScrollToSection('manage-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  Managing Cookies
                </button>
                <button
                  onClick={() => handleScrollToSection('updates')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  Updates to This Policy
                </button>
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
                    This Cookie Policy explains how Helmies Bites uses cookies and similar
                    technologies on our platform. By using our services, you consent to the use
                    of cookies as described in this policy.
                  </p>
                </div>
              </ScrollReveal>

              {/* What Are Cookies */}
              <ScrollReveal delay={0.05}>
                <section id="what-are-cookies" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                      <CookieIcon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">What Are Cookies?</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      Cookies are small text files that are stored on your device (computer,
                      tablet, or mobile) when you visit a website. They are widely used to make
                      websites work more efficiently and to provide information to website owners.
                    </p>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Types of Cookies</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Session Cookies:</strong> Temporary cookies that expire when
                            you close your browser
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Persistent Cookies:</strong> Remain on your device for a set
                            period or until deleted
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>First-Party Cookies:</strong> Set by the website you are visiting
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Third-Party Cookies:</strong> Set by external services used on
                            the website
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* How We Use Cookies */}
              <ScrollReveal delay={0.1}>
                <section id="how-we-use-cookies" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">How We Use Cookies</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      We use cookies for the following purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Authentication:</strong> To keep you logged in during your session</li>
                      <li><strong>Security:</strong> To protect against fraud and ensure secure access</li>
                      <li><strong>Preferences:</strong> To remember your settings and choices</li>
                      <li><strong>Analytics:</strong> To understand how our platform is used</li>
                      <li><strong>Marketing:</strong> To deliver relevant advertisements</li>
                      <li><strong>Performance:</strong> To optimize platform speed and reliability</li>
                    </ul>
                  </div>
                </section>
              </ScrollReveal>

              {/* Cookie Types */}
              {cookieTypes.map((cookieType, index) => (
                <ScrollReveal key={cookieType.id} delay={0.15 + index * 0.05}>
                  <section id={cookieType.id} className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                        {cookieType.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white">{cookieType.name}</h2>
                    </div>
                    <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                      <p>{cookieType.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">Purpose</p>
                          <p className="text-sm font-medium">{cookieType.purpose}</p>
                        </div>
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">Provider</p>
                          <p className="text-sm font-medium">{cookieType.provider}</p>
                        </div>
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">Lifetime</p>
                          <p className="text-sm font-medium">{cookieType.lifetime}</p>
                        </div>
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">Can be disabled?</p>
                          <p className="text-sm font-medium">
                            {cookieType.id === 'essential' ? (
                              <span className="text-red-600 flex items-center gap-1">
                                <XCircle className="h-3 w-3" /> No, required
                              </span>
                            ) : (
                              <span className="text-[#FF7A00] flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Yes
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-semibold text-white mb-2">Examples</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-2 px-3 font-medium">Cookie Name</th>
                                <th className="text-left py-2 px-3 font-medium">Purpose</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cookieType.examples.map((example) => (
                                <tr key={example.name} className="border-b border-white/5">
                                  <td className="py-2 px-3 font-mono text-xs bg-[#2A1F15]/20 rounded">
                                    {example.name}
                                  </td>
                                  <td className="py-2 px-3">{example.purpose}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                </ScrollReveal>
              ))}

              {/* Third-Party Cookies */}
              <ScrollReveal delay={0.4}>
                <section id="third-party-cookies" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Third-Party Cookies</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      We allow certain third parties to place cookies on your device for the
                      services described below:
                    </p>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Google Analytics</h4>
                      <p className="text-sm mb-2">
                        Google Analytics collects anonymous usage data to help us understand how
                        visitors use our platform.
                      </p>
                      <p className="text-sm">
                        <strong>Privacy Policy:</strong>{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7A00] hover:underline"
                        >
                          policies.google.com/privacy
                        </a>
                      </p>
                    </div>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Google Ads</h4>
                      <p className="text-sm mb-2">
                        Google Ads uses cookies to deliver relevant advertisements and measure
                        ad campaign performance.
                      </p>
                      <p className="text-sm">
                        <strong>Privacy Policy:</strong>{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7A00] hover:underline"
                        >
                          policies.google.com/privacy
                        </a>
                      </p>
                    </div>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Payment Processors</h4>
                      <p className="text-sm mb-2">
                        Stripe and PayPal may use cookies to process payments securely.
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span>
                          <strong>Stripe:</strong>{' '}
                          <a
                            href="https://stripe.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF7A00] hover:underline"
                          >
                            stripe.com/privacy
                          </a>
                        </span>
                        <span>
                          <strong>PayPal:</strong>{' '}
                          <a
                            href="https://www.paypal.com/webapps/mpp/ua/privacy-full"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF7A00] hover:underline"
                          >
                            paypal.com/privacy
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Managing Cookies */}
              <ScrollReveal delay={0.45}>
                <section id="manage-cookies" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                      <Settings className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Managing Cookies</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      You have the right to decide whether to accept or reject cookies. You can
                      set or amend your web browser controls to accept or refuse cookies. If you
                      choose to reject cookies, you may still use our website, though your access
                      to some functionality and areas may be restricted.
                    </p>

                    <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
                      <h4 className="font-semibold text-white mb-3">Your Cookie Choices</h4>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg hover:bg-orange-700 font-medium text-sm transition-colors"
                        >
                          Accept All Cookies
                        </button>
                        <button
                          onClick={handleRejectNonEssential}
                          className="px-4 py-2 bg-[#1A1410] text-white/80 rounded-lg hover:bg-[#2A1F15]/20 font-medium text-sm transition-colors border border-white/10"
                        >
                          Reject Non-Essential
                        </button>
                      </div>
                    </div>

                    <h4 className="font-semibold text-white mt-6">Browser Settings</h4>
                    <p className="text-sm">
                      Most web browsers allow some control over cookies through browser settings.
                      To learn more about how to manage and delete cookies, visit the help pages
                      of your browser:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        Chrome (Google)
                      </a>
                      <a
                        href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        Firefox (Mozilla)
                      </a>
                      <a
                        href="https://support.microsoft.com/en-us/help/4027915/microsoft-edge-delete-cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        Edge (Microsoft)
                      </a>
                      <a
                        href="https://support.apple.com/en-us/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        Safari (Apple)
                      </a>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Updates */}
              <ScrollReveal delay={0.5}>
                <section id="updates" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Updates to This Policy</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      We may update this Cookie Policy from time to time to reflect changes in
                      our practices, technology, legal requirements, or other factors. Any changes
                      will be posted on this page with an updated revision date.
                    </p>
                    <p>
                      We encourage you to review this policy periodically to stay informed about
                      how we use cookies and your choices regarding them.
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              {/* Contact */}
              <ScrollReveal delay={0.55}>
                <section id="contact" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FF7A00]/10 rounded-lg text-[#FF7A00]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      If you have questions about our use of cookies, please contact us:
                    </p>
                    <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
                      <p className="font-semibold text-white">Privacy Contact</p>
                      <p>Email: <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#FF7A00] hover:underline">{PRIVACY_EMAIL}</a></p>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Footer Note */}
              <ScrollReveal delay={0.6}>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/50">
                    This Cookie Policy is designed to comply with the GDPR ePrivacy Directive and
                    other applicable cookie laws. For more information about how we handle your
                    personal data, please see our{' '}
                    <a href="/privacy" className="text-[#FF7A00] hover:underline">
                      Privacy Policy
                    </a>.
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
