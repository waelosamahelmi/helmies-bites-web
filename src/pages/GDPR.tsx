import { useTranslation, Trans } from 'react-i18next';
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
const GDPR_EMAIL = 'privacy@helmiesbites.com';

export function GDPR() {
  const { t } = useTranslation('legal');

  const sections = [
    {
      id: 'data-controller',
      icon: <Shield className="h-6 w-6" />,
      title: t('gdpr.sections.dataController.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.dataController.intro')}
          </p>
          <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
            <p className="font-semibold text-white">{t('gdpr.sections.dataController.contactLabel')}</p>
            <p>{t('gdpr.sections.dataController.companyLabel')} {t('gdpr.sections.dataController.company')}</p>
            <p>{t('gdpr.sections.dataController.addressLabel')} {t('gdpr.sections.dataController.address')}</p>
            <p>{t('gdpr.sections.dataController.emailLabel')} <a href={`mailto:${GDPR_EMAIL}`} className="text-[#FF7A00] hover:underline">{GDPR_EMAIL}</a></p>
            <p>{t('gdpr.sections.dataController.businessIdLabel')} {t('gdpr.sections.dataController.businessId')}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'legal-basis',
      icon: <FileCheck className="h-6 w-6" />,
      title: t('gdpr.sections.legalBasis.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.legalBasis.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>{t('gdpr.sections.legalBasis.items.item1Label')}</strong>{' '}
              {t('gdpr.sections.legalBasis.items.item1Text')}
            </li>
            <li>
              <strong>{t('gdpr.sections.legalBasis.items.item2Label')}</strong>{' '}
              {t('gdpr.sections.legalBasis.items.item2Text')}
            </li>
            <li>
              <strong>{t('gdpr.sections.legalBasis.items.item3Label')}</strong>{' '}
              {t('gdpr.sections.legalBasis.items.item3Text')}
            </li>
            <li>
              <strong>{t('gdpr.sections.legalBasis.items.item4Label')}</strong>{' '}
              {t('gdpr.sections.legalBasis.items.item4Text')}
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-categories',
      icon: <Eye className="h-6 w-6" />,
      title: t('gdpr.sections.dataCategories.title'),
      content: (
        <div className="space-y-4">
          <p>{t('gdpr.sections.dataCategories.intro')}</p>

          <h4 className="font-semibold text-white mt-6">{t('gdpr.sections.dataCategories.accountDataTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.dataCategories.accountDataItems.item1')}</li>
            <li>{t('gdpr.sections.dataCategories.accountDataItems.item2')}</li>
            <li>{t('gdpr.sections.dataCategories.accountDataItems.item3')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('gdpr.sections.dataCategories.businessDataTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.dataCategories.businessDataItems.item1')}</li>
            <li>{t('gdpr.sections.dataCategories.businessDataItems.item2')}</li>
            <li>{t('gdpr.sections.dataCategories.businessDataItems.item3')}</li>
            <li>{t('gdpr.sections.dataCategories.businessDataItems.item4')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('gdpr.sections.dataCategories.financialDataTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.dataCategories.financialDataItems.item1')}</li>
            <li>{t('gdpr.sections.dataCategories.financialDataItems.item2')}</li>
            <li>{t('gdpr.sections.dataCategories.financialDataItems.item3')}</li>
            <li>{t('gdpr.sections.dataCategories.financialDataItems.item4')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('gdpr.sections.dataCategories.technicalDataTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.dataCategories.technicalDataItems.item1')}</li>
            <li>{t('gdpr.sections.dataCategories.technicalDataItems.item2')}</li>
            <li>{t('gdpr.sections.dataCategories.technicalDataItems.item3')}</li>
            <li>{t('gdpr.sections.dataCategories.technicalDataItems.item4')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-subject-rights',
      icon: <UserCheck className="h-6 w-6" />,
      title: t('gdpr.sections.dataSubjectRights.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.dataSubjectRights.intro')}
          </p>

          <div className="bg-[#2A1F15]/20 p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-3">{t('gdpr.sections.dataSubjectRights.howToExerciseTitle')}</h4>
            <p className="text-sm text-white/80 mb-3">
              <Trans
                i18nKey="gdpr.sections.dataSubjectRights.howToExerciseContent"
                ns="legal"
                values={{ email: GDPR_EMAIL }}
                components={{
                  1: <a href={`mailto:${GDPR_EMAIL}`} className="text-[#FF7A00] hover:underline" />,
                }}
              />
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'right-of-access',
      icon: <Eye className="h-6 w-6" />,
      title: t('gdpr.sections.rightOfAccess.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.rightOfAccess.content1')}
          </p>
          <p>{t('gdpr.sections.rightOfAccess.content2')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.rightOfAccess.items.item1')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item2')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item3')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item4')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item5')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item6')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item7')}</li>
            <li>{t('gdpr.sections.rightOfAccess.items.item8')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'right-of-rectification',
      icon: <FileCheck className="h-6 w-6" />,
      title: t('gdpr.sections.rightOfRectification.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.rightOfRectification.content1')}
          </p>
          <p>
            {t('gdpr.sections.rightOfRectification.content2')}
          </p>
        </div>
      ),
    },
    {
      id: 'right-of-erasure',
      icon: <Trash2 className="h-6 w-6" />,
      title: t('gdpr.sections.rightOfErasure.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.rightOfErasure.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.rightOfErasure.items.item1')}</li>
            <li>{t('gdpr.sections.rightOfErasure.items.item2')}</li>
            <li>{t('gdpr.sections.rightOfErasure.items.item3')}</li>
            <li>{t('gdpr.sections.rightOfErasure.items.item4')}</li>
            <li>{t('gdpr.sections.rightOfErasure.items.item5')}</li>
          </ul>
          <p className="text-white/60 italic">
            {t('gdpr.sections.rightOfErasure.note')}
          </p>
        </div>
      ),
    },
    {
      id: 'right-to-restrict',
      icon: <Lock className="h-6 w-6" />,
      title: t('gdpr.sections.rightToRestrict.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.rightToRestrict.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.rightToRestrict.items.item1')}</li>
            <li>{t('gdpr.sections.rightToRestrict.items.item2')}</li>
            <li>{t('gdpr.sections.rightToRestrict.items.item3')}</li>
            <li>{t('gdpr.sections.rightToRestrict.items.item4')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'right-to-data-portability',
      icon: <Download className="h-6 w-6" />,
      title: t('gdpr.sections.rightToDataPortability.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.rightToDataPortability.content1')}
          </p>
          <p>
            {t('gdpr.sections.rightToDataPortability.content2')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.rightToDataPortability.items.item1')}</li>
            <li>{t('gdpr.sections.rightToDataPortability.items.item2')}</li>
            <li>{t('gdpr.sections.rightToDataPortability.items.item3')}</li>
            <li>{t('gdpr.sections.rightToDataPortability.items.item4')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'right-to-object',
      icon: <AlertTriangle className="h-6 w-6" />,
      title: t('gdpr.sections.rightToObject.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.rightToObject.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.rightToObject.items.item1')}</li>
            <li>{t('gdpr.sections.rightToObject.items.item2')}</li>
          </ul>
          <p>
            {t('gdpr.sections.rightToObject.content')}
          </p>
        </div>
      ),
    },
    {
      id: 'automated-decision-making',
      icon: <Shield className="h-6 w-6" />,
      title: t('gdpr.sections.automatedDecisionMaking.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.automatedDecisionMaking.content1')}
          </p>
          <p>
            {t('gdpr.sections.automatedDecisionMaking.content2')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.automatedDecisionMaking.items.item1')}</li>
            <li>{t('gdpr.sections.automatedDecisionMaking.items.item2')}</li>
            <li>{t('gdpr.sections.automatedDecisionMaking.items.item3')}</li>
          </ul>
          <p className="text-white/60 italic">
            {t('gdpr.sections.automatedDecisionMaking.note')}
          </p>
        </div>
      ),
    },
    {
      id: 'cross-border-transfers',
      icon: <Globe className="h-6 w-6" />,
      title: t('gdpr.sections.crossBorderTransfers.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.crossBorderTransfers.intro')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('gdpr.sections.crossBorderTransfers.mechanismsTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>{t('gdpr.sections.crossBorderTransfers.items.item1Label')}</strong>{' '}
              {t('gdpr.sections.crossBorderTransfers.items.item1Text')}
            </li>
            <li>
              <strong>{t('gdpr.sections.crossBorderTransfers.items.item2Label')}</strong>{' '}
              {t('gdpr.sections.crossBorderTransfers.items.item2Text')}
            </li>
            <li>
              <strong>{t('gdpr.sections.crossBorderTransfers.items.item3Label')}</strong>{' '}
              {t('gdpr.sections.crossBorderTransfers.items.item3Text')}
            </li>
          </ul>

          <p className="text-white/60 italic mt-4">
            {t('gdpr.sections.crossBorderTransfers.note', { email: GDPR_EMAIL })}
          </p>
        </div>
      ),
    },
    {
      id: 'data-breach-notification',
      icon: <AlertTriangle className="h-6 w-6" />,
      title: t('gdpr.sections.dataBreachNotification.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.dataBreachNotification.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>{t('gdpr.sections.dataBreachNotification.items.item1Label')}</strong>{' '}
              {t('gdpr.sections.dataBreachNotification.items.item1Text')}
            </li>
            <li>
              <strong>{t('gdpr.sections.dataBreachNotification.items.item2Label')}</strong>{' '}
              {t('gdpr.sections.dataBreachNotification.items.item2Text')}
            </li>
          </ul>
          <p>
            {t('gdpr.sections.dataBreachNotification.notificationContent')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('gdpr.sections.dataBreachNotification.notificationItems.item1')}</li>
            <li>{t('gdpr.sections.dataBreachNotification.notificationItems.item2')}</li>
            <li>{t('gdpr.sections.dataBreachNotification.notificationItems.item3')}</li>
            <li>{t('gdpr.sections.dataBreachNotification.notificationItems.item4')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-retention-gdpr',
      icon: <Lock className="h-6 w-6" />,
      title: t('gdpr.sections.dataRetention.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.dataRetention.intro')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('gdpr.sections.dataRetention.retentionPeriodsTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>{t('gdpr.sections.dataRetention.items.item1Label')}</strong> {t('gdpr.sections.dataRetention.items.item1Text')}</li>
            <li><strong>{t('gdpr.sections.dataRetention.items.item2Label')}</strong> {t('gdpr.sections.dataRetention.items.item2Text')}</li>
            <li><strong>{t('gdpr.sections.dataRetention.items.item3Label')}</strong> {t('gdpr.sections.dataRetention.items.item3Text')}</li>
            <li><strong>{t('gdpr.sections.dataRetention.items.item4Label')}</strong> {t('gdpr.sections.dataRetention.items.item4Text')}</li>
            <li><strong>{t('gdpr.sections.dataRetention.items.item5Label')}</strong> {t('gdpr.sections.dataRetention.items.item5Text')}</li>
          </ul>

          <p className="text-white/60 italic">
            {t('gdpr.sections.dataRetention.note')}
          </p>
        </div>
      ),
    },
    {
      id: 'security-measures',
      icon: <Shield className="h-6 w-6" />,
      title: t('gdpr.sections.securityMeasures.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.securityMeasures.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>{t('gdpr.sections.securityMeasures.items.item1Label')}</strong> {t('gdpr.sections.securityMeasures.items.item1Text')}</li>
            <li><strong>{t('gdpr.sections.securityMeasures.items.item2Label')}</strong> {t('gdpr.sections.securityMeasures.items.item2Text')}</li>
            <li><strong>{t('gdpr.sections.securityMeasures.items.item3Label')}</strong> {t('gdpr.sections.securityMeasures.items.item3Text')}</li>
            <li><strong>{t('gdpr.sections.securityMeasures.items.item4Label')}</strong> {t('gdpr.sections.securityMeasures.items.item4Text')}</li>
          </ul>
          <p>
            {t('gdpr.sections.securityMeasures.content')}
          </p>
        </div>
      ),
    },
    {
      id: 'supervisory-authority',
      icon: <AlertTriangle className="h-6 w-6" />,
      title: t('gdpr.sections.supervisoryAuthority.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.supervisoryAuthority.intro')}
          </p>
          <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
            <p className="font-semibold text-white">{t('gdpr.sections.supervisoryAuthority.authorityLabel')}</p>
            <p>{t('gdpr.sections.supervisoryAuthority.authorityName')}</p>
            <p>{t('gdpr.sections.supervisoryAuthority.authorityAddress')}</p>
            <p>{t('gdpr.sections.supervisoryAuthority.authorityEmail')}</p>
            <p>Website: <a href={t('gdpr.sections.supervisoryAuthority.authorityWebsiteUrl')} target="_blank" rel="noopener noreferrer" className="text-[#FF7A00] hover:underline">{t('gdpr.sections.supervisoryAuthority.authorityWebsite')}</a></p>
          </div>
          <p className="text-sm text-white/60">
            {t('gdpr.sections.supervisoryAuthority.note')}
          </p>
        </div>
      ),
    },
    {
      id: 'contact-gdpr',
      icon: <Mail className="h-6 w-6" />,
      title: t('gdpr.sections.contact.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('gdpr.sections.contact.intro')}
          </p>
          <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
            <p className="font-semibold text-white">{t('gdpr.sections.contact.contactLabel')}</p>
            <p>{t('gdpr.sections.contact.emailLabel')} <a href={`mailto:${GDPR_EMAIL}`} className="text-[#FF7A00] hover:underline">{GDPR_EMAIL}</a></p>
            <p>{t('gdpr.sections.contact.addressLabel')} {t('gdpr.sections.contact.address')}</p>
            <p className="text-sm text-white/60 mt-2">
              {t('gdpr.sections.contact.responseTime')}
            </p>
          </div>
          <p className="text-sm text-white/60">
            {t('gdpr.sections.contact.representativeNote')}
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t('gdpr.title')}</h1>
          </div>
          <p className="text-white/60">
            {t('gdpr.lastUpdated', { date: LAST_UPDATED })}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1A1410] rounded-xl shadow-sm border border-white/5 p-4 lg:sticky lg:top-24">
              <h3 className="font-semibold text-white mb-4">{t('gdpr.tableOfContents')}</h3>
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
                  {t('gdpr.printPage')}
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
                    {t('gdpr.introduction')}
                  </p>
                </div>
              </ScrollReveal>

              {/* GDPR Key Principles Box */}
              <ScrollReveal delay={0.05}>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12">
                  <h3 className="font-semibold text-blue-900 mb-4">{t('gdpr.keyPrinciples.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>{t('gdpr.keyPrinciples.principle1')}</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>{t('gdpr.keyPrinciples.principle2')}</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>{t('gdpr.keyPrinciples.principle3')}</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>{t('gdpr.keyPrinciples.principle4')}</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>{t('gdpr.keyPrinciples.principle5')}</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p><strong>{t('gdpr.keyPrinciples.principle6')}</strong></p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mt-4">
                    {t('gdpr.keyPrinciples.accountability')}
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
                    {t('gdpr.footerNote')}
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
