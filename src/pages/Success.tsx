import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Mail, Clock, ArrowRight } from 'lucide-react';

export function Success() {
  const { t } = useTranslation('wizard');

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center h-24 w-24 bg-green-500/10 rounded-full mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">
            {t('getStarted.success.title')}
          </h1>
          <p className="text-xl text-white/60 max-w-lg mx-auto">
            {t('getStarted.success.subtitle')}
          </p>
        </div>

        <div className="glass-card xb-border rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-[#FF7A00]" />
            <h2 className="text-xl font-bold text-white">{t('getStarted.success.whatNext')}</h2>
          </div>

          <div className="space-y-6 text-left max-w-md mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FF7A00] font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('getStarted.success.step1Title')}</h3>
                <p className="text-white/50 text-sm">{t('getStarted.success.step1Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FF7A00] font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('getStarted.success.step2Title')}</h3>
                <p className="text-white/50 text-sm">{t('getStarted.success.step2Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FF7A00] font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('getStarted.success.step3Title')}</h3>
                <p className="text-white/50 text-sm">{t('getStarted.success.step3Desc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-[#FF7A00]/5 border border-[#FF7A00]/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-[#FF7A00]" />
              <span className="font-bold text-[#FF7A00]">{t('getStarted.success.processingTime')}</span>
            </div>
            <p className="text-sm text-white/50">
              {t('getStarted.success.contactNote')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF7A00] text-white font-bold hover:bg-[#CC6200] transition-all"
          >
            {t('getStarted.success.backToHome')} <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:info@helmies.fi"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {t('getStarted.success.contactUs')}
          </a>
        </div>

        <div className="text-sm text-white/40 mt-8">
          <p>{t('getStarted.success.questions')} <a href="mailto:info@helmies.fi" className="text-[#FF7A00] hover:underline">info@helmies.fi</a></p>
        </div>
      </div>
    </div>
  );
}
