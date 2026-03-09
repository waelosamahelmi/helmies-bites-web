import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Check, Rocket, Mail, CreditCard, Store, FileText, ClipboardCheck } from 'lucide-react';
import { SectionTitle } from '@/components/SectionTitle';
import { EmailStep } from '@/components/wizard-steps/EmailStep';
import { PlanSelectionStep } from '@/components/wizard-steps/PlanSelectionStep';
import { RestaurantDetailsStep } from '@/components/wizard-steps/RestaurantDetailsStep';
import { MenuUploadParseStep } from '@/components/wizard-steps/MenuUploadParseStep';
import { ReviewSubmitStep } from '@/components/wizard-steps/ReviewSubmitStep';

const STEP_DEFS = [
  { id: 'email', icon: <Mail className="w-5 h-5" /> },
  { id: 'plan', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'restaurant', icon: <Store className="w-5 h-5" /> },
  { id: 'menu', icon: <FileText className="w-5 h-5" /> },
  { id: 'review', icon: <ClipboardCheck className="w-5 h-5" /> },
];

export function StartWizard() {
  const navigate = useNavigate();
  const { t } = useTranslation('wizard');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [wizardData, setWizardData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = (newData: any) => {
    setWizardData((prev: any) => ({ ...prev, ...newData }));
  };

  const canGoNext = () => {
    switch (STEP_DEFS[currentStepIndex].id) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wizardData.email || '');
      case 'plan':
        return !!wizardData.plan;
      case 'restaurant':
        return !!(wizardData.restaurantName && wizardData.city);
      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (currentStepIndex < STEP_DEFS.length - 1 && canGoNext()) {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Prepare submission data (exclude File objects from JSON)
      const { _menuFile, ...submitData } = wizardData;

      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      navigate('/success');
    } catch (error) {
      console.error('Failed to submit:', error);
      // Fallback: open mailto with the data
      const subject = encodeURIComponent(`New Restaurant Onboarding - ${wizardData.restaurantName || 'Unknown'}`);
      const body = encodeURIComponent(formatEmailBody(wizardData));
      window.location.href = `mailto:info@helmies.fi?subject=${subject}&body=${body}`;
      // Still navigate to success
      navigate('/success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStepIndex + 1) / STEP_DEFS.length) * 100;
  const isLastStep = currentStepIndex === STEP_DEFS.length - 1;

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
            {t('getStarted.backToHome')}
          </button>
        </div>

        {/* Header */}
        <SectionTitle
          subtitle={t('getStarted.subtitle')}
          title={t('getStarted.title')}
          description={t('getStarted.description')}
          icon={<Rocket className="h-4 w-4" />}
          className="mb-10"
        />

        {/* Progress Steps */}
        <div className="glass-card xb-border rounded-[20px] p-6 mb-8">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#2A1F15]/40 -translate-y-1/2 rounded-full" />
            <div
              className="absolute top-1/2 left-0 h-1 gradient-bg -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((STEP_DEFS.length - 1) > 0 ? (currentStepIndex / (STEP_DEFS.length - 1)) : 1) * 100}%` }}
            />

            <div className="relative flex justify-between">
              {STEP_DEFS.map((step, index) => {
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
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'gradient-bg text-white shadow-lg scale-110'
                          : isCurrent
                          ? 'gradient-bg text-white shadow-lg scale-110 ring-4 ring-[#FF7A00]/20'
                          : 'bg-[#1A1410] text-white/40 border-2 border-white/10'
                      }`}
                    >
                      {isCompleted ? <Check className="w-6 h-6" /> : step.icon}
                    </div>
                    <span
                      className={`text-xs font-semibold whitespace-nowrap hidden sm:block ${
                        isCurrent ? 'text-[#FF7A00]' : isCompleted ? 'text-white/60' : 'text-white/40'
                      }`}
                    >
                      {t(`getStarted.steps.${step.id}.title`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="mt-6 sm:hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white/60">{t('getStarted.stepOf', { current: currentStepIndex + 1, total: STEP_DEFS.length })}</span>
              <span className="text-sm font-bold gradient-text">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#2A1F15]/40 rounded-full overflow-hidden">
              <div className="h-full gradient-bg transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Current Step Card */}
        <div className="glass-card xb-border rounded-[20px] p-8 md:p-10 mb-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="feature-icon w-12 h-12">
                {STEP_DEFS[currentStepIndex].icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                {t(`getStarted.steps.${STEP_DEFS[currentStepIndex].id}.title`)}
              </h2>
            </div>
            <p className="text-white/60 ml-15 mt-2">
              {t(`getStarted.steps.${STEP_DEFS[currentStepIndex].id}.description`)}
            </p>
          </div>

          {STEP_DEFS[currentStepIndex].id === 'email' && (
            <EmailStep data={wizardData} onUpdate={updateData} />
          )}
          {STEP_DEFS[currentStepIndex].id === 'plan' && (
            <PlanSelectionStep data={wizardData} onUpdate={updateData} />
          )}
          {STEP_DEFS[currentStepIndex].id === 'restaurant' && (
            <RestaurantDetailsStep data={wizardData} onUpdate={updateData} />
          )}
          {STEP_DEFS[currentStepIndex].id === 'menu' && (
            <MenuUploadParseStep data={wizardData} onUpdate={updateData} />
          )}
          {STEP_DEFS[currentStepIndex].id === 'review' && (
            <ReviewSubmitStep data={wizardData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          )}
        </div>

        {/* Navigation Buttons */}
        {!isLastStep && (
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
            >
              <ChevronLeft className="h-5 w-5" />
              {t('getStarted.nav.previous')}
            </button>

            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className="aivora-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{t('getStarted.nav.nextStep')}</span>
              <span className="arrow-icon">
                <ChevronRight className="h-5 w-5 text-white" />
                <ChevronRight className="h-5 w-5 text-white" />
              </span>
              <span className="btn-bg-svg">
                <svg width="100%" height="100%" viewBox="0 0 484 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="484" height="60" fill="url(#wizard_next_grad)" />
                  <defs>
                    <radialGradient id="wizard_next_grad" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FF7A00" />
                      <stop offset="1" stopColor="#0D0907" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        )}

        {/* Back button on last step */}
        {isLastStep && (
          <div className="flex items-center justify-start">
            <button
              onClick={goToPreviousStep}
              className="btn-secondary flex items-center gap-2 font-bold"
            >
              <ChevronLeft className="h-5 w-5" />
              {t('getStarted.nav.previous')}
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/50">
            {t('getStarted.needHelp')}{' '}
            <a href="mailto:info@helmies.fi" className="text-[#FF7A00] font-semibold hover:underline">
              info@helmies.fi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function formatEmailBody(data: any): string {
  const lines = [
    `Restaurant Name: ${data.restaurantName || 'N/A'}`,
    `Email: ${data.email || 'N/A'}`,
    `Plan: ${data.plan || 'N/A'}`,
    `Cuisine: ${data.cuisine || 'N/A'}`,
    `Phone: ${data.phone || 'N/A'}`,
    `Address: ${data.street || ''}, ${data.postalCode || ''} ${data.city || ''}`,
    '',
    'Opening Hours:',
  ];

  if (data.openingHours) {
    for (const h of data.openingHours) {
      lines.push(`  ${h.day}: ${h.closed ? 'Closed' : `${h.open} - ${h.close}`}`);
    }
  }

  if (data.parsedMenu?.categories) {
    lines.push('');
    lines.push('Menu:');
    for (const cat of data.parsedMenu.categories) {
      lines.push(`  ${cat.name || cat.name_en || 'Category'}:`);
      for (const item of cat.items || []) {
        lines.push(`    - ${item.name || item.name_en}: €${item.price || '?'}`);
      }
    }
  }

  return lines.join('\n');
}
