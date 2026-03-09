import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, CreditCard, Store, MapPin, Clock, FileText, CheckCircle, Loader2, Send } from 'lucide-react';

interface Props {
  data: any;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewSubmitStep({ data, onSubmit, isSubmitting }: Props) {
  const { t } = useTranslation('wizard');
  const [agreed, setAgreed] = useState(false);

  const openDays = (data.openingHours || []).filter((h: any) => !h.closed);
  const closedDays = (data.openingHours || []).filter((h: any) => h.closed);
  const totalMenuItems = data.parsedMenu?.categories?.reduce(
    (sum: number, cat: any) => sum + (cat.items?.length || 0), 0
  ) || 0;

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black text-white mb-3">{t('getStarted.review.heading')}</h3>
        <p className="text-white/60 max-w-lg mx-auto">
          {t('getStarted.review.description')}
        </p>
      </div>

      {/* Email */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="feature-icon w-8 h-8">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">{t('getStarted.review.contactEmail')}</h4>
        </div>
        <p className="text-white text-lg font-semibold ml-11">{data.email || '—'}</p>
      </div>

      {/* Plan */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="feature-icon w-8 h-8">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">{t('getStarted.review.selectedPlan')}</h4>
        </div>
        <p className="text-[#FF7A00] text-lg font-bold ml-11">{data.plan ? t(`getStarted.review.planNames.${data.plan}`) : '—'}</p>
      </div>

      {/* Restaurant Info */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="feature-icon w-8 h-8">
            <Store className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">{t('getStarted.review.restaurantSection')}</h4>
        </div>
        <div className="ml-11 space-y-2">
          <p className="text-white text-lg font-semibold">{data.restaurantName || '—'}</p>
          {data.cuisine && <p className="text-white/60 text-sm capitalize">{data.cuisine} {t('getStarted.review.cuisine')}</p>}
          {data.phone && <p className="text-white/60 text-sm">{data.phone}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="feature-icon w-8 h-8">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">{t('getStarted.review.addressSection')}</h4>
        </div>
        <div className="ml-11">
          <p className="text-white">{data.street || '—'}</p>
          <p className="text-white/60">{[data.postalCode, data.city].filter(Boolean).join(' ') || '—'}</p>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="feature-icon w-8 h-8">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">{t('getStarted.review.openingHours')}</h4>
        </div>
        <div className="ml-11 space-y-1">
          {openDays.map((h: any) => (
            <div key={h.day} className="flex justify-between text-sm max-w-xs">
              <span className="text-white/60">{t(`getStarted.restaurant.hours.days.${h.day}`)}</span>
              <span className="text-white font-medium">{h.open} – {h.close}</span>
            </div>
          ))}
          {closedDays.length > 0 && (
            <p className="text-white/40 text-sm mt-1">
              {t('getStarted.review.closedLabel')}: {closedDays.map((h: any) => t(`getStarted.restaurant.hours.days.${h.day}`)).join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="feature-icon w-8 h-8">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">{t('getStarted.review.menuSection')}</h4>
        </div>
        <div className="ml-11">
          {data.parsedMenu ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-white">
                {t('getStarted.review.menuItemsCount', { items: totalMenuItems, categories: data.parsedMenu.categories?.length || 0 })}
              </span>
            </div>
          ) : data._menuFile ? (
            <p className="text-yellow-400 text-sm">{t('getStarted.review.menuNotParsed')}</p>
          ) : (
            <p className="text-white/40 text-sm">{t('getStarted.review.noMenu')}</p>
          )}
        </div>
      </div>

      {/* Agreement */}
      <div className="glass-card rounded-2xl p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-[#FF7A00] focus:ring-[#FF7A00] focus:ring-offset-0"
          />
          <span className="text-sm text-white/60">
            {t('getStarted.review.agreement')}{' '}
            <a href="/terms" target="_blank" className="text-[#FF7A00] hover:underline">{t('getStarted.review.termsOfService')}</a>{' '}
            {t('getStarted.review.and')}{' '}
            <a href="/privacy" target="_blank" className="text-[#FF7A00] hover:underline">{t('getStarted.review.privacyPolicy')}</a>.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!agreed || isSubmitting}
          className="aivora-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('getStarted.review.submitting')}
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                {t('getStarted.review.submitApplication')}
              </>
            )}
          </span>
          <span className="btn-bg-svg">
            <svg width="100%" height="100%" viewBox="0 0 484 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="484" height="60" fill="url(#submit_btn_grad)" />
              <defs>
                <radialGradient id="submit_btn_grad" cx="0" cy="0" r="1" gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FF7A00" />
                  <stop offset="1" stopColor="#0D0907" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
