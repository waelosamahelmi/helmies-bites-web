import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Loader2, Check, ArrowUpRight, Rocket } from 'lucide-react';
import { api } from '@/lib/api';
import { SectionTitle } from '@/components/SectionTitle';
import { RestaurantInfoStep } from '@/components/wizard-steps/RestaurantInfoStep';
import { MenuUploadStep } from '@/components/wizard-steps/MenuUploadStep';
import { ThemeSelectionStep } from '@/components/wizard-steps/ThemeSelectionStep';
import { DomainSetupStep } from '@/components/wizard-steps/DomainSetupStep';
import { ReviewConfirmStep } from '@/components/wizard-steps/ReviewConfirmStep';

const stepKeys = [
  { id: 'restaurant-info', titleKey: 'steps.restaurantInfo.title', descriptionKey: 'steps.restaurantInfo.description', icon: 'store' },
  { id: 'menu-upload', titleKey: 'steps.menuUpload.title', descriptionKey: 'steps.menuUpload.description', icon: 'menu' },
  { id: 'theme', titleKey: 'steps.theme.title', descriptionKey: 'steps.theme.description', icon: 'palette' },
  { id: 'domain', titleKey: 'steps.domain.title', descriptionKey: 'steps.domain.description', icon: 'globe' },
  { id: 'review', titleKey: 'steps.review.title', descriptionKey: 'steps.review.description', icon: 'check' },
];

const stepComponents: Record<string, React.ComponentType<any>> = {
  'restaurant-info': RestaurantInfoStep,
  'menu-upload': MenuUploadStep,
  'theme': ThemeSelectionStep,
  'domain': DomainSetupStep,
  'review': ReviewConfirmStep,
};

const stepIcons: Record<string, React.ReactNode> = {
  store: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  menu: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  palette: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function StartWizard() {
  const { t } = useTranslation('wizard');
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [wizardData, setWizardData] = useState<any>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CurrentStepComponent = stepComponents[stepKeys[currentStepIndex].id];

  const updateData = (newData: any) => {
    setWizardData((prev: any) => ({ ...prev, ...newData }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < stepKeys.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (index: number) => {
    if (index <= currentStepIndex) {
      setCurrentStepIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      const result = await api.post('/api/wizard/complete', {
        sessionId,
        data: wizardData,
      });
      navigate('/success', { state: result });
    } catch (error) {
      console.error('Failed to complete wizard:', error);
      alert(t('errors.completeFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStepIndex + 1) / stepKeys.length) * 100;

  return (
    <div className="min-h-screen hero-gradient pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF7A00] transition-colors font-semibold"
          >
            <ChevronLeft className="h-5 w-5" />
            {t('backToHome')}
          </button>
        </div>

        {/* Header - SectionTitle */}
        <SectionTitle
          subtitle={t('header.subtitle')}
          title={t('header.title')}
          description={t('header.description')}
          icon={<Rocket className="h-4 w-4" />}
          className="mb-10"
        />

        {/* Progress Steps */}
        <div className="glass-card xb-border rounded-[20px] p-6 mb-8">
          <div className="relative">
            {/* Progress Line Background */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#2A1F15]/40 -translate-y-1/2 rounded-full" />

            {/* Active Progress Line */}
            <div
              className="absolute top-1/2 left-0 h-1 gradient-bg -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((stepKeys.length - 1) > 0 ? (currentStepIndex / (stepKeys.length - 1)) : 1) * 100}%` }}
            />

            {/* Step Indicators */}
            <div className="relative flex justify-between">
              {stepKeys.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isClickable = index <= currentStepIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => isClickable && goToStep(index)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center gap-2 transition-all ${
                      isClickable ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    {/* Step Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'gradient-bg text-white shadow-lg scale-110'
                          : isCurrent
                          ? 'gradient-bg text-white shadow-lg scale-110 ring-4 ring-[#FF7A00]/20'
                          : 'bg-[#1A1410] text-white/40 border-2 border-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        stepIcons[step.icon]
                      )}
                    </div>

                    {/* Step Label */}
                    <span
                      className={`text-xs font-semibold whitespace-nowrap hidden sm:block ${
                        isCurrent ? 'text-[#FF7A00]' : isCompleted ? 'text-white/60' : 'text-white/40'
                      }`}
                    >
                      {t(step.titleKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Bar (Mobile) */}
          <div className="mt-6 sm:hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white/60">{t('progress.stepOf', { current: currentStepIndex + 1, total: stepKeys.length })}</span>
              <span className="text-sm font-bold gradient-text">{t('progress.percentage', { value: Math.round(progress) })}</span>
            </div>
            <div className="h-2 bg-[#2A1F15]/40 rounded-full overflow-hidden">
              <div
                className="h-full gradient-bg transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Step Card */}
        <div className="glass-card xb-border rounded-[20px] p-8 md:p-10 mb-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="feature-icon w-12 h-12">
                {stepIcons[stepKeys[currentStepIndex].icon]}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                {t(stepKeys[currentStepIndex].titleKey)}
              </h2>
            </div>
            <p className="text-white/60 ml-15 mt-2">
              {t(stepKeys[currentStepIndex].descriptionKey)}
            </p>
          </div>

          <CurrentStepComponent
            data={wizardData}
            sessionId={sessionId}
            setSessionId={setSessionId}
            onUpdate={updateData}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Previous - btn-secondary */}
          <button
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
          >
            <ChevronLeft className="h-5 w-5" />
            {t('buttons.previous')}
          </button>

          {/* Next / Complete - aivora-btn style */}
          {currentStepIndex === stepKeys.length - 1 ? (
            <button
              onClick={handleComplete}
              disabled={isSubmitting}
              className="aivora-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('buttons.settingUp')}
                  </span>
                ) : (
                  t('buttons.completeSetup')
                )}
              </span>
              <span className="arrow-icon">
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <>
                    <ArrowUpRight className="h-5 w-5 text-white" />
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </>
                )}
              </span>
              <span className="btn-bg-svg">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 484 60"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="484" height="60" fill="url(#wizard_btn_grad)" />
                  <defs>
                    <radialGradient
                      id="wizard_btn_grad"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FF7A00" />
                      <stop offset="1" stopColor="#0D0907" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </button>
          ) : (
            <button
              onClick={goToNextStep}
              className="aivora-btn"
            >
              <span className="relative z-10">{t('buttons.nextStep')}</span>
              <span className="arrow-icon">
                <ChevronRight className="h-5 w-5 text-white" />
                <ChevronRight className="h-5 w-5 text-white" />
              </span>
              <span className="btn-bg-svg">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 484 60"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="484" height="60" fill="url(#wizard_next_grad)" />
                  <defs>
                    <radialGradient
                      id="wizard_next_grad"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FF7A00" />
                      <stop offset="1" stopColor="#0D0907" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/50">
            {t('help.text')}{' '}
            <a href="mailto:support@helmiesbites.com" className="text-[#FF7A00] font-semibold hover:underline">
              {t('help.email')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
