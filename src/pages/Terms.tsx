import { useTranslation, Trans } from 'react-i18next';
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

export function Terms() {
  const { t } = useTranslation('legal');

  const sections = [
    {
      id: 'acceptance',
      icon: <FileCheck className="h-6 w-6" />,
      title: t('terms.sections.acceptance.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('terms.sections.acceptance.content1')}
          </p>
          <p>
            {t('terms.sections.acceptance.content2')}
          </p>
        </div>
      ),
    },
    {
      id: 'service-description',
      icon: <FileCheck className="h-6 w-6" />,
      title: t('terms.sections.serviceDescription.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('terms.sections.serviceDescription.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.serviceDescription.items.item1')}</li>
            <li>{t('terms.sections.serviceDescription.items.item2')}</li>
            <li>{t('terms.sections.serviceDescription.items.item3')}</li>
            <li>{t('terms.sections.serviceDescription.items.item4')}</li>
            <li>{t('terms.sections.serviceDescription.items.item5')}</li>
          </ul>
          <p>
            {t('terms.sections.serviceDescription.content')}
          </p>
        </div>
      ),
    },
    {
      id: 'user-responsibilities',
      icon: <UserCheck className="h-6 w-6" />,
      title: t('terms.sections.userResponsibilities.title'),
      content: (
        <div className="space-y-4">
          <p>{t('terms.sections.userResponsibilities.intro')}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.userResponsibilities.items.item1')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item2')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item3')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item4')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item5')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item6')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item7')}</li>
            <li>{t('terms.sections.userResponsibilities.items.item8')}</li>
          </ul>
          <p className="text-white/60 italic">
            {t('terms.sections.userResponsibilities.note')}
          </p>
        </div>
      ),
    },
    {
      id: 'payment-terms',
      icon: <CreditCard className="h-6 w-6" />,
      title: t('terms.sections.paymentTerms.title'),
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-white">{t('terms.sections.paymentTerms.serviceFeesTitle')}</h4>
          <p>
            {t('terms.sections.paymentTerms.serviceFeesContent')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.paymentTerms.addonsTitle')}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.paymentTerms.addonsItems.item1')}</li>
            <li>{t('terms.sections.paymentTerms.addonsItems.item2')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.paymentTerms.processingTitle')}</h4>
          <p>
            {t('terms.sections.paymentTerms.processingContent')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.paymentTerms.settlementTitle')}</h4>
          <p>
            {t('terms.sections.paymentTerms.settlementContent')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.paymentTerms.taxesTitle')}</h4>
          <p>
            {t('terms.sections.paymentTerms.taxesContent')}
          </p>
        </div>
      ),
    },
    {
      id: 'cancellation',
      icon: <XCircle className="h-6 w-6" />,
      title: t('terms.sections.cancellation.title'),
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-white">{t('terms.sections.cancellation.byYouTitle')}</h4>
          <p>
            {t('terms.sections.cancellation.byYouIntro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.cancellation.byYouItems.item1')}</li>
            <li>{t('terms.sections.cancellation.byYouItems.item2')}</li>
            <li>{t('terms.sections.cancellation.byYouItems.item3')}</li>
            <li>{t('terms.sections.cancellation.byYouItems.item4')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.cancellation.byUsTitle')}</h4>
          <p>
            {t('terms.sections.cancellation.byUsIntro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.cancellation.byUsItems.item1')}</li>
            <li>{t('terms.sections.cancellation.byUsItems.item2')}</li>
            <li>{t('terms.sections.cancellation.byUsItems.item3')}</li>
            <li>{t('terms.sections.cancellation.byUsItems.item4')}</li>
          </ul>
          <p className="text-white/60 italic">
            {t('terms.sections.cancellation.note')}
          </p>
        </div>
      ),
    },
    {
      id: ' refunds',
      icon: <CreditCard className="h-6 w-6" />,
      title: t('terms.sections.refunds.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('terms.sections.refunds.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.refunds.items.item1')}</li>
            <li>{t('terms.sections.refunds.items.item2')}</li>
            <li>{t('terms.sections.refunds.items.item3')}</li>
          </ul>
          <p>
            {t('terms.sections.refunds.content')}
          </p>
        </div>
      ),
    },
    {
      id: 'intellectual-property',
      icon: <FileCheck className="h-6 w-6" />,
      title: t('terms.sections.intellectualProperty.title'),
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-white">{t('terms.sections.intellectualProperty.ourPropertyTitle')}</h4>
          <p>
            {t('terms.sections.intellectualProperty.ourPropertyIntro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.intellectualProperty.ourPropertyItems.item1')}</li>
            <li>{t('terms.sections.intellectualProperty.ourPropertyItems.item2')}</li>
            <li>{t('terms.sections.intellectualProperty.ourPropertyItems.item3')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.intellectualProperty.yourContentTitle')}</h4>
          <p>
            {t('terms.sections.intellectualProperty.yourContentText')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.intellectualProperty.userGeneratedTitle')}</h4>
          <p>
            {t('terms.sections.intellectualProperty.userGeneratedText')}
          </p>
        </div>
      ),
    },
    {
      id: 'limitation-of-liability',
      icon: <AlertCircle className="h-6 w-6" />,
      title: t('terms.sections.limitationOfLiability.title'),
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-white">
            {t('terms.sections.limitationOfLiability.disclaimer')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.limitationOfLiability.items.item1')}</li>
            <li>{t('terms.sections.limitationOfLiability.items.item2')}</li>
            <li>{t('terms.sections.limitationOfLiability.items.item3')}</li>
            <li>{t('terms.sections.limitationOfLiability.items.item4')}</li>
            <li>{t('terms.sections.limitationOfLiability.items.item5')}</li>
          </ul>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.limitationOfLiability.totalLiabilityTitle')}</h4>
          <p>
            {t('terms.sections.limitationOfLiability.totalLiabilityContent')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.limitationOfLiability.noWarrantiesTitle')}</h4>
          <p>
            {t('terms.sections.limitationOfLiability.noWarrantiesContent')}
          </p>
        </div>
      ),
    },
    {
      id: 'dispute-resolution',
      icon: <Scale className="h-6 w-6" />,
      title: t('terms.sections.disputeResolution.title'),
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-white">{t('terms.sections.disputeResolution.governingLawTitle')}</h4>
          <p>
            {t('terms.sections.disputeResolution.governingLawContent')}
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.disputeResolution.resolutionProcessTitle')}</h4>
          <p>
            <Trans
              i18nKey="terms.sections.disputeResolution.resolutionProcessContent"
              ns="legal"
              values={{ email: CONTACT_EMAIL }}
              components={{
                1: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7A00] hover:underline" />,
              }}
            />
          </p>

          <h4 className="font-semibold text-white mt-6">{t('terms.sections.disputeResolution.euConsumerTitle')}</h4>
          <p>
            {t('terms.sections.disputeResolution.euConsumerContent')}
          </p>
        </div>
      ),
    },
    {
      id: 'indemnification',
      icon: <Shield className="h-6 w-6" />,
      title: t('terms.sections.indemnification.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('terms.sections.indemnification.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.indemnification.items.item1')}</li>
            <li>{t('terms.sections.indemnification.items.item2')}</li>
            <li>{t('terms.sections.indemnification.items.item3')}</li>
            <li>{t('terms.sections.indemnification.items.item4')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'modifications',
      icon: <Clock className="h-6 w-6" />,
      title: t('terms.sections.modifications.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('terms.sections.modifications.intro')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t('terms.sections.modifications.items.item1')}</li>
            <li>{t('terms.sections.modifications.items.item2')}</li>
            <li>{t('terms.sections.modifications.items.item3')}</li>
          </ul>
          <p>
            {t('terms.sections.modifications.content')}
          </p>
        </div>
      ),
    },
    {
      id: 'general-provisions',
      icon: <FileCheck className="h-6 w-6" />,
      title: t('terms.sections.generalProvisions.title'),
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>{t('terms.sections.generalProvisions.items.item1Label')}</strong>{' '}
              {t('terms.sections.generalProvisions.items.item1Text')}
            </li>
            <li>
              <strong>{t('terms.sections.generalProvisions.items.item2Label')}</strong>{' '}
              {t('terms.sections.generalProvisions.items.item2Text')}
            </li>
            <li>
              <strong>{t('terms.sections.generalProvisions.items.item3Label')}</strong>{' '}
              {t('terms.sections.generalProvisions.items.item3Text')}
            </li>
            <li>
              <strong>{t('terms.sections.generalProvisions.items.item4Label')}</strong>{' '}
              {t('terms.sections.generalProvisions.items.item4Text')}
            </li>
            <li>
              <strong>{t('terms.sections.generalProvisions.items.item5Label')}</strong>{' '}
              {t('terms.sections.generalProvisions.items.item5Text')}
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact',
      icon: <Mail className="h-6 w-6" />,
      title: t('terms.sections.contact.title'),
      content: (
        <div className="space-y-4">
          <p>
            {t('terms.sections.contact.intro')}
          </p>
          <div className="bg-[#FF7A00]/5 p-4 rounded-lg border border-orange-100">
            <p className="font-semibold text-white">{t('terms.sections.contact.contactLabel')}</p>
            <p>{t('terms.sections.contact.emailLabel')} <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7A00] hover:underline">{CONTACT_EMAIL}</a></p>
            <p>{t('terms.sections.contact.addressLabel')} {t('terms.sections.contact.address')}</p>
            <p>{t('terms.sections.contact.businessIdLabel')} {t('terms.sections.contact.businessId')}</p>
          </div>
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
              <FileCheck className="h-6 w-6 text-[#FF7A00]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t('terms.title')}</h1>
          </div>
          <p className="text-white/60">
            {t('terms.lastUpdated', { date: LAST_UPDATED })}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1A1410] rounded-xl shadow-sm border border-white/5 p-4 lg:sticky lg:top-24">
              <h3 className="font-semibold text-white mb-4">{t('terms.tableOfContents')}</h3>
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
                  {t('terms.printPage')}
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
                    {t('terms.introduction')}
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
                    {t('terms.footerNote')}
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
