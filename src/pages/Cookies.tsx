import { useTranslation, Trans } from 'react-i18next';
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

export function Cookies() {
  const { t } = useTranslation('legal');

  const cookieTypes: CookieType[] = [
    {
      id: 'essential',
      name: t('cookies.cookieTypes.essential.name'),
      icon: <Lock className="h-6 w-6" />,
      description: t('cookies.cookieTypes.essential.description'),
      purpose: t('cookies.cookieTypes.essential.purpose'),
      provider: t('cookies.cookieTypes.essential.provider'),
      lifetime: t('cookies.cookieTypes.essential.lifetime'),
      examples: [
        { name: t('cookies.cookieTypes.essential.examples.sessionId.name'), purpose: t('cookies.cookieTypes.essential.examples.sessionId.purpose') },
        { name: t('cookies.cookieTypes.essential.examples.csrfToken.name'), purpose: t('cookies.cookieTypes.essential.examples.csrfToken.purpose') },
        { name: t('cookies.cookieTypes.essential.examples.authToken.name'), purpose: t('cookies.cookieTypes.essential.examples.authToken.purpose') },
        { name: t('cookies.cookieTypes.essential.examples.cookieConsent.name'), purpose: t('cookies.cookieTypes.essential.examples.cookieConsent.purpose') },
      ],
    },
    {
      id: 'analytics',
      name: t('cookies.cookieTypes.analytics.name'),
      icon: <BarChart3 className="h-6 w-6" />,
      description: t('cookies.cookieTypes.analytics.description'),
      purpose: t('cookies.cookieTypes.analytics.purpose'),
      provider: t('cookies.cookieTypes.analytics.provider'),
      lifetime: t('cookies.cookieTypes.analytics.lifetime'),
      examples: [
        { name: t('cookies.cookieTypes.analytics.examples.ga.name'), purpose: t('cookies.cookieTypes.analytics.examples.ga.purpose') },
        { name: t('cookies.cookieTypes.analytics.examples.gid.name'), purpose: t('cookies.cookieTypes.analytics.examples.gid.purpose') },
        { name: t('cookies.cookieTypes.analytics.examples.gat.name'), purpose: t('cookies.cookieTypes.analytics.examples.gat.purpose') },
        { name: t('cookies.cookieTypes.analytics.examples.pageViews.name'), purpose: t('cookies.cookieTypes.analytics.examples.pageViews.purpose') },
      ],
    },
    {
      id: 'marketing',
      name: t('cookies.cookieTypes.marketing.name'),
      icon: <Megaphone className="h-6 w-6" />,
      description: t('cookies.cookieTypes.marketing.description'),
      purpose: t('cookies.cookieTypes.marketing.purpose'),
      provider: t('cookies.cookieTypes.marketing.provider'),
      lifetime: t('cookies.cookieTypes.marketing.lifetime'),
      examples: [
        { name: t('cookies.cookieTypes.marketing.examples.adPersonalization.name'), purpose: t('cookies.cookieTypes.marketing.examples.adPersonalization.purpose') },
        { name: t('cookies.cookieTypes.marketing.examples.adUserData.name'), purpose: t('cookies.cookieTypes.marketing.examples.adUserData.purpose') },
        { name: t('cookies.cookieTypes.marketing.examples.campaignId.name'), purpose: t('cookies.cookieTypes.marketing.examples.campaignId.purpose') },
        { name: t('cookies.cookieTypes.marketing.examples.conversionId.name'), purpose: t('cookies.cookieTypes.marketing.examples.conversionId.purpose') },
      ],
    },
    {
      id: 'functional',
      name: t('cookies.cookieTypes.functional.name'),
      icon: <Settings className="h-6 w-6" />,
      description: t('cookies.cookieTypes.functional.description'),
      purpose: t('cookies.cookieTypes.functional.purpose'),
      provider: t('cookies.cookieTypes.functional.provider'),
      lifetime: t('cookies.cookieTypes.functional.lifetime'),
      examples: [
        { name: t('cookies.cookieTypes.functional.examples.languagePreference.name'), purpose: t('cookies.cookieTypes.functional.examples.languagePreference.purpose') },
        { name: t('cookies.cookieTypes.functional.examples.themePreference.name'), purpose: t('cookies.cookieTypes.functional.examples.themePreference.purpose') },
        { name: t('cookies.cookieTypes.functional.examples.restaurantLocation.name'), purpose: t('cookies.cookieTypes.functional.examples.restaurantLocation.purpose') },
        { name: t('cookies.cookieTypes.functional.examples.wizardProgress.name'), purpose: t('cookies.cookieTypes.functional.examples.wizardProgress.purpose') },
      ],
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20">
      {/* Header */}
      <div className="bg-[#1A1410] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FF7A00]/10 rounded-lg">
              <CookieIcon className="h-6 w-6 text-[#FF7A00]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t('cookies.title')}</h1>
          </div>
          <p className="text-white/60">
            {t('cookies.lastUpdated', { date: LAST_UPDATED })}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1A1410] rounded-xl shadow-sm border border-white/5 p-4 lg:sticky lg:top-24">
              <h3 className="font-semibold text-white mb-4">{t('cookies.tableOfContents')}</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => handleScrollToSection('what-are-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  {t('cookies.nav.whatAreCookies')}
                </button>
                <button
                  onClick={() => handleScrollToSection('how-we-use-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  {t('cookies.nav.howWeUseCookies')}
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
                  {t('cookies.nav.thirdPartyCookies')}
                </button>
                <button
                  onClick={() => handleScrollToSection('manage-cookies')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  {t('cookies.nav.managingCookies')}
                </button>
                <button
                  onClick={() => handleScrollToSection('updates')}
                  className="block w-full text-left text-sm text-white/60 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 px-3 py-2 rounded-lg transition-colors"
                >
                  {t('cookies.nav.updatesToThisPolicy')}
                </button>
              </nav>
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handlePrint}
                  className="w-full text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-[#2A1F15]/30 transition-colors"
                >
                  {t('cookies.printPage')}
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
                    {t('cookies.introduction')}
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
                    <h2 className="text-2xl font-bold text-white">{t('cookies.whatAreCookies.title')}</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      {t('cookies.whatAreCookies.content')}
                    </p>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">{t('cookies.whatAreCookies.typesTitle')}</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>{t('cookies.whatAreCookies.sessionLabel')}</strong>{' '}
                            {t('cookies.whatAreCookies.sessionText')}
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>{t('cookies.whatAreCookies.persistentLabel')}</strong>{' '}
                            {t('cookies.whatAreCookies.persistentText')}
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>{t('cookies.whatAreCookies.firstPartyLabel')}</strong>{' '}
                            {t('cookies.whatAreCookies.firstPartyText')}
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>{t('cookies.whatAreCookies.thirdPartyLabel')}</strong>{' '}
                            {t('cookies.whatAreCookies.thirdPartyText')}
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
                    <h2 className="text-2xl font-bold text-white">{t('cookies.howWeUseCookies.title')}</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      {t('cookies.howWeUseCookies.intro')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>{t('cookies.howWeUseCookies.items.item1Label')}</strong> {t('cookies.howWeUseCookies.items.item1Text')}</li>
                      <li><strong>{t('cookies.howWeUseCookies.items.item2Label')}</strong> {t('cookies.howWeUseCookies.items.item2Text')}</li>
                      <li><strong>{t('cookies.howWeUseCookies.items.item3Label')}</strong> {t('cookies.howWeUseCookies.items.item3Text')}</li>
                      <li><strong>{t('cookies.howWeUseCookies.items.item4Label')}</strong> {t('cookies.howWeUseCookies.items.item4Text')}</li>
                      <li><strong>{t('cookies.howWeUseCookies.items.item5Label')}</strong> {t('cookies.howWeUseCookies.items.item5Text')}</li>
                      <li><strong>{t('cookies.howWeUseCookies.items.item6Label')}</strong> {t('cookies.howWeUseCookies.items.item6Text')}</li>
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
                          <p className="text-xs text-white/50 uppercase tracking-wide">{t('cookies.cookieTableLabels.purpose')}</p>
                          <p className="text-sm font-medium">{cookieType.purpose}</p>
                        </div>
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">{t('cookies.cookieTableLabels.provider')}</p>
                          <p className="text-sm font-medium">{cookieType.provider}</p>
                        </div>
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">{t('cookies.cookieTableLabels.lifetime')}</p>
                          <p className="text-sm font-medium">{cookieType.lifetime}</p>
                        </div>
                        <div className="bg-[#2A1F15]/20 p-3 rounded-lg">
                          <p className="text-xs text-white/50 uppercase tracking-wide">{t('cookies.cookieTableLabels.canBeDisabled')}</p>
                          <p className="text-sm font-medium">
                            {cookieType.id === 'essential' ? (
                              <span className="text-red-600 flex items-center gap-1">
                                <XCircle className="h-3 w-3" /> {t('cookies.cookieTableLabels.noRequired')}
                              </span>
                            ) : (
                              <span className="text-[#FF7A00] flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> {t('cookies.cookieTableLabels.yes')}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-semibold text-white mb-2">{t('cookies.cookieTableLabels.examples')}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-2 px-3 font-medium">{t('cookies.cookieTableLabels.cookieName')}</th>
                                <th className="text-left py-2 px-3 font-medium">{t('cookies.cookieTableLabels.purpose')}</th>
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
                    <h2 className="text-2xl font-bold text-white">{t('cookies.thirdPartyCookies.title')}</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      {t('cookies.thirdPartyCookies.intro')}
                    </p>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">{t('cookies.thirdPartyCookies.googleAnalytics.title')}</h4>
                      <p className="text-sm mb-2">
                        {t('cookies.thirdPartyCookies.googleAnalytics.description')}
                      </p>
                      <p className="text-sm">
                        <strong>{t('cookies.thirdPartyCookies.googleAnalytics.privacyPolicyLabel')}</strong>{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7A00] hover:underline"
                        >
                          {t('cookies.thirdPartyCookies.googleAnalytics.privacyPolicyLink')}
                        </a>
                      </p>
                    </div>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">{t('cookies.thirdPartyCookies.googleAds.title')}</h4>
                      <p className="text-sm mb-2">
                        {t('cookies.thirdPartyCookies.googleAds.description')}
                      </p>
                      <p className="text-sm">
                        <strong>{t('cookies.thirdPartyCookies.googleAds.privacyPolicyLabel')}</strong>{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF7A00] hover:underline"
                        >
                          {t('cookies.thirdPartyCookies.googleAds.privacyPolicyLink')}
                        </a>
                      </p>
                    </div>

                    <div className="bg-[#2A1F15]/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">{t('cookies.thirdPartyCookies.paymentProcessors.title')}</h4>
                      <p className="text-sm mb-2">
                        {t('cookies.thirdPartyCookies.paymentProcessors.description')}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span>
                          <strong>{t('cookies.thirdPartyCookies.paymentProcessors.stripeLabel')}</strong>{' '}
                          <a
                            href="https://stripe.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF7A00] hover:underline"
                          >
                            {t('cookies.thirdPartyCookies.paymentProcessors.stripeLink')}
                          </a>
                        </span>
                        <span>
                          <strong>{t('cookies.thirdPartyCookies.paymentProcessors.paypalLabel')}</strong>{' '}
                          <a
                            href="https://www.paypal.com/webapps/mpp/ua/privacy-full"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF7A00] hover:underline"
                          >
                            {t('cookies.thirdPartyCookies.paymentProcessors.paypalLink')}
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
                    <h2 className="text-2xl font-bold text-white">{t('cookies.managingCookies.title')}</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      {t('cookies.managingCookies.intro')}
                    </p>

                    <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
                      <h4 className="font-semibold text-white mb-3">{t('cookies.managingCookies.choicesTitle')}</h4>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg hover:bg-orange-700 font-medium text-sm transition-colors"
                        >
                          {t('cookies.managingCookies.acceptAll')}
                        </button>
                        <button
                          onClick={handleRejectNonEssential}
                          className="px-4 py-2 bg-[#1A1410] text-white/80 rounded-lg hover:bg-[#2A1F15]/20 font-medium text-sm transition-colors border border-white/10"
                        >
                          {t('cookies.managingCookies.rejectNonEssential')}
                        </button>
                      </div>
                    </div>

                    <h4 className="font-semibold text-white mt-6">{t('cookies.managingCookies.browserSettingsTitle')}</h4>
                    <p className="text-sm">
                      {t('cookies.managingCookies.browserSettingsIntro')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        {t('cookies.managingCookies.browsers.chrome')}
                      </a>
                      <a
                        href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        {t('cookies.managingCookies.browsers.firefox')}
                      </a>
                      <a
                        href="https://support.microsoft.com/en-us/help/4027915/microsoft-edge-delete-cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        {t('cookies.managingCookies.browsers.edge')}
                      </a>
                      <a
                        href="https://support.apple.com/en-us/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] hover:underline"
                      >
                        {t('cookies.managingCookies.browsers.safari')}
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
                    <h2 className="text-2xl font-bold text-white">{t('cookies.updates.title')}</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      {t('cookies.updates.content1')}
                    </p>
                    <p>
                      {t('cookies.updates.content2')}
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
                    <h2 className="text-2xl font-bold text-white">{t('cookies.contact.title')}</h2>
                  </div>
                  <div className="text-white/80 leading-relaxed pl-11 space-y-4">
                    <p>
                      {t('cookies.contact.intro')}
                    </p>
                    <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
                      <p className="font-semibold text-white">{t('cookies.contact.contactLabel')}</p>
                      <p>{t('cookies.contact.emailLabel')} <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#FF7A00] hover:underline">{PRIVACY_EMAIL}</a></p>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              {/* Footer Note */}
              <ScrollReveal delay={0.6}>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/50">
                    <Trans
                      i18nKey="cookies.footerNote"
                      ns="legal"
                      components={{
                        1: <a href="/privacy" className="text-[#FF7A00] hover:underline" />,
                      }}
                    />
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
