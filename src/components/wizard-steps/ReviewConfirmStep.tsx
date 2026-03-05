import { useTranslation } from 'react-i18next';
import { Check, Globe, Truck, User, ShoppingBag, CreditCard } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function ReviewConfirmStep({ data }: Props) {
  const { t } = useTranslation('wizard');
  const monthlyFee = calculateMonthlyFee(data);
  const oneTimeFee = calculateOneTimeFee(data);

  return (
    <div className="space-y-8">
      {/* Review Sections */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('review.title')}</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Restaurant Information */}
          <ReviewCard
            icon={<User className="h-6 w-6" />}
            title={t('review.sections.restaurantInfo.title')}
            iconGradient="linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
            items={[
              { label: t('review.sections.restaurantInfo.name'), value: data.name || t('review.notSet') },
              { label: t('review.sections.restaurantInfo.cuisine'), value: getCuisineLabel(data.cuisine, t) || t('review.notSet') },
              { label: t('review.sections.restaurantInfo.city'), value: data.city || t('review.notSet') },
            ]}
          />

          {/* Website */}
          <ReviewCard
            icon={<Globe className="h-6 w-6" />}
            title={t('review.sections.website.title')}
            iconGradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            items={[
              {
                label: t('review.sections.website.domain'),
                value: data.domainType === 'custom'
                  ? data.customDomain || t('review.notSet')
                  : data.domainType === 'path'
                  ? `helmiesbites.fi/${data.slug || 'restaurant'}`
                  : `${data.slug || 'restaurant'}.helmiesbites.fi`
              },
              { label: t('review.sections.website.theme'), value: data.theme?.name || t('review.sections.website.selectedTheme') },
            ]}
          />

          {/* Menu */}
          <ReviewCard
            icon={<ShoppingBag className="h-6 w-6" />}
            title={t('review.sections.menu.title')}
            iconGradient="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
            items={[
              { label: t('review.sections.menu.items'), value: t('review.sections.menu.menuItems', { count: data.menu?.items?.length || 0 }) },
              { label: t('review.sections.menu.categories'), value: t('review.sections.menu.menuCategories', { count: data.menu?.categories?.length || 0 }) },
              { label: t('review.sections.menu.languages'), value: t('review.sections.menu.languageList') },
            ]}
          />

          {/* Contact */}
          <ReviewCard
            icon={<Truck className="h-6 w-6" />}
            title={t('review.sections.contact.title')}
            iconGradient="linear-gradient(135deg, #d946ef 0%, #c026d3 100%)"
            items={[
              { label: t('review.sections.contact.email'), value: data.email || t('review.notSet') },
            ]}
          />
        </div>
      </div>

      {/* Pricing Summary */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('review.pricing.title')}</h3>

        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Base Service */}
          <PricingRow
            label={t('review.pricing.basePlatformFee.label')}
            value={t('review.pricing.basePlatformFee.value')}
            included
            description={t('review.pricing.basePlatformFee.description')}
            oneTimeLabel={t('review.pricing.oneTime')}
          />

          {/* Optional Features */}
          {data.features?.cashOnDelivery && (
            <PricingRow
              label={t('review.pricing.cashOnDelivery.label')}
              value={t('review.pricing.cashOnDelivery.value')}
              included
              description={t('review.pricing.cashOnDelivery.description')}
              oneTimeLabel={t('review.pricing.oneTime')}
            />
          )}

          {data.features?.aiAssistant && (
            <PricingRow
              label={t('review.pricing.aiAssistant.label')}
              value={t('review.pricing.aiAssistant.value')}
              included
              description={t('review.pricing.aiAssistant.description')}
              oneTimeLabel={t('review.pricing.oneTime')}
            />
          )}

          {data.features?.aiImages && (
            <PricingRow
              label={t('review.pricing.aiImages.label')}
              value={t('review.pricing.aiImages.value')}
              included
              description={t('review.pricing.aiImages.description')}
              oneTime
              oneTimeLabel={t('review.pricing.oneTime')}
            />
          )}

          {data.features?.aiBranding && (
            <PricingRow
              label={t('review.pricing.aiBranding.label')}
              value={t('review.pricing.aiBranding.value')}
              included
              description={t('review.pricing.aiBranding.description')}
              oneTime
              oneTimeLabel={t('review.pricing.oneTime')}
            />
          )}

          {/* Total */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 border-t border-orange-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-900">{t('review.pricing.monthlyTotal')}</span>
              <span className="text-2xl font-black gradient-text">
                &euro;{monthlyFee}
                <span className="text-lg text-gray-500">{t('review.pricing.perMonth')}</span>
              </span>
            </div>
            {oneTimeFee > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{t('review.pricing.oneTimeCharges')}</span>
                <span className="font-bold text-gray-900">&euro;{oneTimeFee}</span>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-orange-200">
              <p className="text-sm text-gray-600">
                <Check className="h-4 w-4 inline text-green-600 mr-1" />
                {t('review.pricing.noHiddenFees')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Launch Card */}
      <div className="glass-card rounded-2xl p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Check className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-900 mb-2">{t('review.readyToLaunch.title')}</h3>
            <p className="text-green-800 mb-4">
              {t('review.readyToLaunch.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>{t('review.readyToLaunch.instantActivation')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>{t('review.readyToLaunch.freeSSL')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>{t('review.readyToLaunch.mobileResponsive')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-6 w-6 text-gray-600" />
          <h4 className="font-bold text-gray-900">{t('review.payment.title')}</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {t('review.payment.description')}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge">{t('review.payment.methods.visa')}</span>
          <span className="badge">{t('review.payment.methods.mastercard')}</span>
          <span className="badge">{t('review.payment.methods.amex')}</span>
          <span className="badge">{t('review.payment.methods.invoice')}</span>
        </div>
      </div>
    </div>
  );
}

interface ReviewCardProps {
  icon: React.ReactNode;
  title: string;
  iconGradient: string;
  items: Array<{ label: string; value: string }>;
}

function ReviewCard({ icon, title, iconGradient, items }: ReviewCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-4 text-white" style={{ background: iconGradient }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            {icon}
          </div>
          <h4 className="font-bold text-lg">{title}</h4>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">
              {item.value || '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PricingRowProps {
  label: string;
  value: string;
  included: boolean;
  description?: string;
  oneTime?: boolean;
  oneTimeLabel: string;
}

function PricingRow({ label, value, included, description, oneTime, oneTimeLabel }: PricingRowProps) {
  return (
    <div className={`flex items-start gap-4 p-5 border-b border-gray-100 last:border-b-0 ${
      included ? '' : 'bg-gray-50'
    }`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        included ? 'bg-green-100' : 'bg-gray-200'
      }`}>
        {included ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <span className="text-gray-500 text-xs">+</span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{label}</span>
          {oneTime && (
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">
              {oneTimeLabel}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

function calculateMonthlyFee(data: any): number {
  let fee = 0;
  if (data.features?.cashOnDelivery) fee += 30;
  if (data.features?.aiAssistant) fee += 10;
  return fee;
}

function calculateOneTimeFee(data: any): number {
  let fee = 0;
  if (data.features?.aiImages) fee += 20;
  if (data.features?.aiBranding) fee += 5;
  return fee;
}

function getCuisineLabel(value: string, t: (key: string) => string): string {
  const cuisineKeys: Record<string, string> = {
    finnish: 'review.cuisineLabels.finnish',
    italian: 'review.cuisineLabels.italian',
    chinese: 'review.cuisineLabels.chinese',
    indian: 'review.cuisineLabels.indian',
    thai: 'review.cuisineLabels.thai',
    japanese: 'review.cuisineLabels.japanese',
    burger: 'review.cuisineLabels.burger',
    pizza: 'review.cuisineLabels.pizza',
    kebab: 'review.cuisineLabels.kebab',
    mexican: 'review.cuisineLabels.mexican',
  };
  const key = cuisineKeys[value];
  return key ? t(key) : value;
}
