import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Store, MapPin, Phone, Clock, Plus, Minus, UtensilsCrossed } from 'lucide-react';

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

const DEFAULT_HOURS = DAY_KEYS.map((day) => ({
  day,
  open: '10:00',
  close: '22:00',
  closed: day === 'sunday',
}));

const cuisineKeys = ['finnish', 'italian', 'chinese', 'indian', 'thai', 'japanese', 'burger', 'pizza', 'kebab', 'mexican', 'sushi', 'other'] as const;

export function RestaurantDetailsStep({ data, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [formData, setFormData] = useState({
    restaurantName: data.restaurantName || '',
    cuisine: data.cuisine || '',
    phone: data.phone || '',
    street: data.street || '',
    postalCode: data.postalCode || '',
    city: data.city || '',
    openingHours: data.openingHours || DEFAULT_HOURS,
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleHoursChange = (index: number, field: string, value: any) => {
    const newHours = [...formData.openingHours];
    newHours[index] = { ...newHours[index], [field]: value };
    handleChange('openingHours', newHours);
  };

  return (
    <div className="space-y-8">
      {/* Restaurant Name */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="feature-icon w-10 h-10">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-white">{t('getStarted.restaurant.name.label')}</label>
            <p className="text-xs text-white/50">{t('getStarted.restaurant.name.hint')}</p>
          </div>
          <span className="ml-auto badge text-xs">{t('getStarted.restaurant.name.required')}</span>
        </div>
        <input
          type="text"
          value={formData.restaurantName}
          onChange={(e) => handleChange('restaurantName', e.target.value)}
          placeholder={t('getStarted.restaurant.name.placeholder')}
          className="input-modern w-full"
        />
      </div>

      {/* Cuisine & Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="feature-icon w-10 h-10">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-white">{t('getStarted.restaurant.cuisine.label')}</label>
              <p className="text-xs text-white/50">{t('getStarted.restaurant.cuisine.hint')}</p>
            </div>
          </div>
          <select
            value={formData.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            className="input-modern w-full"
          >
            <option value="">{t('getStarted.restaurant.cuisine.placeholder')}</option>
            {cuisineKeys.map((key) => (
              <option key={key} value={key}>{t(`getStarted.restaurant.cuisine.options.${key}`)}</option>
            ))}
          </select>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="feature-icon w-10 h-10">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-white">{t('getStarted.restaurant.phone.label')}</label>
              <p className="text-xs text-white/50">{t('getStarted.restaurant.phone.hint')}</p>
            </div>
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={t('getStarted.restaurant.phone.placeholder')}
            className="input-modern w-full"
          />
        </div>
      </div>

      {/* Address */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="feature-icon w-10 h-10">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-white">{t('getStarted.restaurant.address.label')}</label>
            <p className="text-xs text-white/50">{t('getStarted.restaurant.address.hint')}</p>
          </div>
          <span className="ml-auto badge text-xs">{t('getStarted.restaurant.address.required')}</span>
        </div>
        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            placeholder={t('getStarted.restaurant.address.street')}
            className="input-modern w-full"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder={t('getStarted.restaurant.address.postalCode')}
            className="input-modern w-full"
          />
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t('getStarted.restaurant.address.city')}
            className="input-modern w-full"
          />
        </div>
      </div>

      {/* Opening Hours */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="feature-icon w-10 h-10">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-white">{t('getStarted.restaurant.hours.label')}</label>
            <p className="text-xs text-white/50">{t('getStarted.restaurant.hours.hint')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {formData.openingHours.map((schedule: any, index: number) => (
            <div
              key={schedule.day}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                schedule.closed ? 'bg-white/5 opacity-60' : 'bg-[#FF7A00]/5'
              }`}
            >
              <span className="text-sm font-semibold text-white w-24 flex-shrink-0">
                {t(`getStarted.restaurant.hours.days.${schedule.day}`)}
              </span>

              {schedule.closed ? (
                <span className="text-sm text-white/40 flex-1">{t('getStarted.restaurant.hours.closed')}</span>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={schedule.open}
                    onChange={(e) => handleHoursChange(index, 'open', e.target.value)}
                    className="input-modern text-sm py-1.5 px-3"
                  />
                  <span className="text-white/40">–</span>
                  <input
                    type="time"
                    value={schedule.close}
                    onChange={(e) => handleHoursChange(index, 'close', e.target.value)}
                    className="input-modern text-sm py-1.5 px-3"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => handleHoursChange(index, 'closed', !schedule.closed)}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  schedule.closed
                    ? 'bg-[#FF7A00]/10 text-[#FF7A00] hover:bg-[#FF7A00]/20'
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                }`}
              >
                {schedule.closed ? (
                  <>
                    <Plus className="h-3 w-3" /> {t('getStarted.restaurant.hours.open')}
                  </>
                ) : (
                  <>
                    <Minus className="h-3 w-3" /> {t('getStarted.restaurant.hours.close')}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
