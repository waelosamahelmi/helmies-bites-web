import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Globe, Mail, ArrowRight } from 'lucide-react';

export function Success() {
  const { t } = useTranslation('success');
  const location = useLocation();
  const result = location.state as any;

  if (!result) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p>{t('noData')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-[#FF7A00]/10 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-[#FF7A00]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-white/60">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-[#1A1410] rounded-xl shadow-sm p-8 border border-white/5 mb-8">
          <h2 className="font-semibold text-white mb-4">{t('websiteLive')}</h2>

          <div className="space-y-4">
            <a
              href={result.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#2A1F15]/20 rounded-lg hover:bg-[#2A1F15]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#FF7A00]" />
                <div className="text-left">
                  <p className="font-medium text-white">{t('yourWebsite')}</p>
                  <p className="text-sm text-white/50">{result.siteUrl}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-white/40" />
            </a>

            <a
              href={result.adminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#2A1F15]/20 rounded-lg hover:bg-[#2A1F15]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#FF7A00]" />
                <div className="text-left">
                  <p className="font-medium text-white">{t('adminDashboard')}</p>
                  <p className="text-sm text-white/50">{result.adminUrl}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-white/40" />
            </a>
          </div>

          <div className="mt-6 p-4 bg-[#FF7A00]/5 rounded-lg">
            <p
              className="text-sm text-orange-900"
              dangerouslySetInnerHTML={{ __html: t('credentials') }}
            />
          </div>
        </div>

        <div className="text-sm text-white/50">
          <p>{t('contactUs')}</p>
        </div>
      </div>
    </div>
  );
}
