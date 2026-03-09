import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Zap, Star, Crown } from 'lucide-react';

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const planKeys = ['starter', 'pro', 'annual'] as const;
const planIcons = {
  starter: <Zap className="h-6 w-6" />,
  pro: <Star className="h-6 w-6" />,
  annual: <Crown className="h-6 w-6" />,
};
const planFeatureCounts = { starter: 8, pro: 9, annual: 6 };

export function PlanSelectionStep({ data, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [selectedPlan, setSelectedPlan] = useState(data.plan || '');

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
    onUpdate({ plan: planId });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black text-white mb-3">{t('getStarted.plans.heading')}</h3>
        <p className="text-white/60 max-w-lg mx-auto">
          {t('getStarted.plans.description')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {planKeys.map((key) => {
          const isSelected = selectedPlan === key;
          const isPopular = key === 'pro';
          const featureCount = planFeatureCounts[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSelect(key)}
              className={`relative text-left glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'ring-2 ring-[#FF7A00] bg-[#FF7A00]/5 scale-[1.02]'
                  : 'hover:bg-white/5 hover:scale-[1.01]'
              } ${isPopular ? 'xb-border' : 'border border-white/10'}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#FF7A00] to-[#CC6200] text-white text-xs font-bold px-4 py-1 rounded-full">
                    {t('getStarted.plans.mostPopular')}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isSelected ? 'bg-[#FF7A00] text-white' : 'bg-[#FF7A00]/10 text-[#FF7A00]'
                }`}>
                  {planIcons[key]}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{t(`getStarted.plans.${key}.name`)}</h4>
                </div>
                {isSelected && (
                  <div className="ml-auto w-8 h-8 rounded-full bg-[#FF7A00] flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black gradient-text">{t(`getStarted.plans.${key}.price`)}</span>
                <span className="text-white/60 text-sm ml-1">{t(`getStarted.plans.${key}.priceDetail`)}</span>
                <p className="text-white/40 text-xs mt-1">{t(`getStarted.plans.${key}.subDetail`)}</p>
                <p className="text-[#FF7A00] text-xs font-semibold mt-1">{t(`getStarted.plans.${key}.setup`)}</p>
              </div>

              <ul className="space-y-2">
                {Array.from({ length: featureCount }, (_, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <Check className="h-4 w-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                    <span>{t(`getStarted.plans.${key}.features.${i + 1}`)}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
