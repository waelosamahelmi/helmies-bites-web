import { useTranslation, Trans } from 'react-i18next';
import { ScrollReveal } from '../components/ScrollReveal';
import { Shield, Eye, Clock, Cookie, Mail, Lock } from 'lucide-react';

const LAST_UPDATED = 'February 26, 2026';
const PRIVACY_EMAIL = 'privacy@helmiesbites.com';

export function Privacy() {
  const { t } = useTranslation('legal');

  const sections = [
    {
      id: 'information-collection',
      icon: <Eye className="h-6 w-6" />,
      title: t('privacy.sections.informationCollection.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.informationCollection.intro')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('privacy.sections.informationCollection.youProvideTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('privacy.sections.informationCollection.youProvideItems.item1')}</li>
            <li>{t('privacy.sections.informationCollection.youProvideItems.item2')}</li>
            <li>{t('privacy.sections.informationCollection.youProvideItems.item3')}</li>
            <li>{t('privacy.sections.informationCollection.youProvideItems.item4')}</li>
            <li>{t('privacy.sections.informationCollection.youProvideItems.item5')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('privacy.sections.informationCollection.autoCollectedTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('privacy.sections.informationCollection.autoCollectedItems.item1')}</li>
            <li>{t('privacy.sections.informationCollection.autoCollectedItems.item2')}</li>
            <li>{t('privacy.sections.informationCollection.autoCollectedItems.item3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-usage',
      icon: <Shield className="h-6 w-6" />,
      title: t('privacy.sections.dataUsage.title'),
      content: (
        <div className="space-y-4">
          <p>{t('privacy.sections.dataUsage.intro')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('privacy.sections.dataUsage.items.item1')}</li>
            <li>{t('privacy.sections.dataUsage.items.item2')}</li>
            <li>{t('privacy.sections.dataUsage.items.item3')}</li>
            <li>{t('privacy.sections.dataUsage.items.item4')}</li>
            <li>{t('privacy.sections.dataUsage.items.item5')}</li>
            <li>{t('privacy.sections.dataUsage.items.item6')}</li>
            <li>{t('privacy.sections.dataUsage.items.item7')}</li>
            <li>{t('privacy.sections.dataUsage.items.item8')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'cookies',
      icon: <Cookie className="h-6 w-6" />,
      title: t('privacy.sections.cookies.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.cookies.content1')}
          </p>
          <p>
            {t('privacy.sections.cookies.content2')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>{t('privacy.sections.cookies.items.item1Label')}</strong> {t('privacy.sections.cookies.items.item1Text')}</li>
            <li><strong>{t('privacy.sections.cookies.items.item2Label')}</strong> {t('privacy.sections.cookies.items.item2Text')}</li>
            <li><strong>{t('privacy.sections.cookies.items.item3Label')}</strong> {t('privacy.sections.cookies.items.item3Text')}</li>
          </ul>
          <p>
            <Trans
              i18nKey="privacy.sections.cookies.cookiePolicyLink"
              ns="legal"
              components={{
                1: <a href="/cookies" className="text-[#FF7A00] hover:underline" />,
              }}
            />
          </p>
        </div>
      ),
    },
    {
      id: 'data-security',
      icon: <Lock className="h-6 w-6" />,
      title: t('privacy.sections.dataSecurity.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.dataSecurity.content1')}
          </p>
          <p>{t('privacy.sections.dataSecurity.content2')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('privacy.sections.dataSecurity.items.item1')}</li>
            <li>{t('privacy.sections.dataSecurity.items.item2')}</li>
            <li>{t('privacy.sections.dataSecurity.items.item3')}</li>
            <li>{t('privacy.sections.dataSecurity.items.item4')}</li>
          </ul>
          <p>
            {t('privacy.sections.dataSecurity.content3')}
          </p>
        </div>
      ),
    },
    {
      id: 'user-rights',
      icon: <Shield className="h-6 w-6" />,
      title: t('privacy.sections.userRights.title'),
      content: (
        <div className="space-y-4">
          <p>{t('privacy.sections.userRights.intro')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>{t('privacy.sections.userRights.items.item1Label')}</strong> {t('privacy.sections.userRights.items.item1Text')}</li>
            <li><strong>{t('privacy.sections.userRights.items.item2Label')}</strong> {t('privacy.sections.userRights.items.item2Text')}</li>
            <li><strong>{t('privacy.sections.userRights.items.item3Label')}</strong> {t('privacy.sections.userRights.items.item3Text')}</li>
            <li><strong>{t('privacy.sections.userRights.items.item4Label')}</strong> {t('privacy.sections.userRights.items.item4Text')}</li>
            <li><strong>{t('privacy.sections.userRights.items.item5Label')}</strong> {t('privacy.sections.userRights.items.item5Text')}</li>
            <li><strong>{t('privacy.sections.userRights.items.item6Label')}</strong> {t('privacy.sections.userRights.items.item6Text')}</li>
            <li><strong>{t('privacy.sections.userRights.items.item7Label')}</strong> {t('privacy.sections.userRights.items.item7Text')}</li>
          </ul>
          <p>
            <Trans
              i18nKey="privacy.sections.userRights.contactText"
              ns="legal"
              values={{ email: PRIVACY_EMAIL }}
              components={{
                1: <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#FF7A00] hover:underline" />,
              }}
            />
          </p>
        </div>
      ),
    },
    {
      id: 'data-retention',
      icon: <Clock className="h-6 w-6" />,
      title: t('privacy.sections.dataRetention.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.dataRetention.content1')}
          </p>
          <p>{t('privacy.sections.dataRetention.content2')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('privacy.sections.dataRetention.items.item1')}</li>
            <li>{t('privacy.sections.dataRetention.items.item2')}</li>
            <li>{t('privacy.sections.dataRetention.items.item3')}</li>
            <li>{t('privacy.sections.dataRetention.items.item4')}</li>
          </ul>
          <p>
            {t('privacy.sections.dataRetention.content3')}
          </p>
        </div>
      ),
    },
    {
      id: 'third-party-services',
      icon: <Shield className="h-6 w-6" />,
      title: t('privacy.sections.thirdPartyServices.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.thirdPartyServices.content1')}
          </p>
          <p>{t('privacy.sections.thirdPartyServices.content2')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('privacy.sections.thirdPartyServices.items.item1')}</li>
            <li>{t('privacy.sections.thirdPartyServices.items.item2')}</li>
            <li>{t('privacy.sections.thirdPartyServices.items.item3')}</li>
            <li>{t('privacy.sections.thirdPartyServices.items.item4')}</li>
            <li>{t('privacy.sections.thirdPartyServices.items.item5')}</li>
          </ul>
          <p>
            {t('privacy.sections.thirdPartyServices.content3')}
          </p>
        </div>
      ),
    },
    {
      id: 'international-transfers',
      icon: <Shield className="h-6 w-6" />,
      title: t('privacy.sections.internationalTransfers.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.internationalTransfers.content1')}
          </p>
          <p>
            {t('privacy.sections.internationalTransfers.content2')}
          </p>
        </div>
      ),
    },
    {
      id: 'children-privacy',
      icon: <Shield className="h-6 w-6" />,
      title: t('privacy.sections.childrenPrivacy.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.childrenPrivacy.content')}
          </p>
        </div>
      ),
    },
    {
      id: 'contact',
      icon: <Mail className="h-6 w-6" />,
      title: t('privacy.sections.contact.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('privacy.sections.contact.intro')}
          </p>
          <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
            <p className="font-semibold text-white">{t('privacy.sections.contact.contactLabel')}</p>
            <p>{t('privacy.sections.contact.emailLabel')} <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#FF7A00] hover:underline">{PRIVACY_EMAIL}</a></p>
            <p>{t('privacy.sections.contact.addressLabel')} {t('privacy.sections.contact.address')}</p>
          </div>
          <p>
            {t('privacy.sections.contact.euNote')}
          </p>
        </div>
      ),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20">
      {/* Header */}
      <div className="bg-[#1A1410] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FF7A00]/10 rounded-lg">
              <Shield className="h-6 w-6 text-[#FF7A00]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t('privacy.title')}</h1>
          </div>
          <p className="text-white/60">
            {t('privacy.lastUpdated', { date: LAST_UPDATED })}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1A1410] rounded-xl shadow-sm border border-white/5 p-4 lg:sticky lg:top-24">
              <h3 className="font-semibold text-white mb-4">{t('privacy.tableOfContents')}</h3>
              <nav className="space-y-2">
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
                  {t('privacy.printPage')}
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
                    {t('privacy.introduction')}
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
                    {t('privacy.footerNote')}
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
