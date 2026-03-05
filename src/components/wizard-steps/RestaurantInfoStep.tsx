import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Sparkles, Store, MapPin, Mail, UtensilsCrossed } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  setSessionId: (id: string) => void;
  onUpdate: (data: any) => void;
}

export function RestaurantInfoStep({ data, sessionId, setSessionId, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [formData, setFormData] = useState({
    name: data.name || '',
    nameEn: data.nameEn || '',
    description: data.description || '',
    descriptionEn: data.descriptionEn || '',
    cuisine: data.cuisine || '',
    city: data.city || '',
    email: data.email || '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      initializeSession();
    }
  }, []);

  const initializeSession = async () => {
    try {
      const response = await fetch('/api/wizard/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email || 'temp@example.com',
        }),
      });
      const result = await response.json();
      setSessionId(result.session.id);
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.name) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/wizard/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          input: formData.name,
          type: 'restaurant-info',
        }),
      });
      const result = await response.json();

      const newFormData = {
        ...formData,
        nameEn: result.result.name_en || formData.nameEn,
        description: result.result.description || formData.description,
        descriptionEn: result.result.description_en || formData.descriptionEn,
        cuisine: result.result.cuisine || formData.cuisine,
      };
      setFormData(newFormData);
      onUpdate(newFormData);
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onUpdate({ [field]: value });
  };

  const cuisineOptions = [
    { value: 'finnish', labelKey: 'restaurantInfo.cuisine.options.finnish', flag: 'fi' },
    { value: 'italian', labelKey: 'restaurantInfo.cuisine.options.italian', flag: 'it' },
    { value: 'chinese', labelKey: 'restaurantInfo.cuisine.options.chinese', flag: 'cn' },
    { value: 'indian', labelKey: 'restaurantInfo.cuisine.options.indian', flag: 'in' },
    { value: 'thai', labelKey: 'restaurantInfo.cuisine.options.thai', flag: 'th' },
    { value: 'japanese', labelKey: 'restaurantInfo.cuisine.options.japanese', flag: 'jp' },
    { value: 'burger', labelKey: 'restaurantInfo.cuisine.options.burger', flag: 'us' },
    { value: 'pizza', labelKey: 'restaurantInfo.cuisine.options.pizza', flag: 'it' },
    { value: 'kebab', labelKey: 'restaurantInfo.cuisine.options.kebab', flag: 'tr' },
    { value: 'mexican', labelKey: 'restaurantInfo.cuisine.options.mexican', flag: 'mx' },
    { value: 'other', labelKey: 'restaurantInfo.cuisine.options.other', flag: '\u{1F30D}' },
  ];

  return (
    <div className="space-y-8">
      {/* Restaurant Name Section */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="feature-icon w-10 h-10">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900">
              {t('restaurantInfo.name.label')}
            </label>
            <p className="text-xs text-gray-500">{t('restaurantInfo.name.hint')}</p>
          </div>
          <span className="ml-auto badge text-xs">{t('restaurantInfo.name.required')}</span>
        </div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={t('restaurantInfo.name.placeholder')}
          className="input-modern"
          required
        />
        {formData.name && (
          <button
            onClick={handleAIGenerate}
            disabled={isGenerating}
            className="mt-4 btn-secondary text-sm py-3 px-4 inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('restaurantInfo.aiGenerate.generating')}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {t('restaurantInfo.aiGenerate.autoFill')}
              </>
            )}
          </button>
        )}
      </div>

      {/* Cuisine & City Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cuisine Type */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="feature-icon w-10 h-10">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900">
                {t('restaurantInfo.cuisine.label')}
              </label>
              <p className="text-xs text-gray-500">{t('restaurantInfo.cuisine.hint')}</p>
            </div>
          </div>
          <select
            value={formData.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            className="input-modern"
          >
            <option value="">{t('restaurantInfo.cuisine.placeholder')}</option>
            {cuisineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.flag} {t(option.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="feature-icon w-10 h-10">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900">
                {t('restaurantInfo.city.label')}
              </label>
              <p className="text-xs text-gray-500">{t('restaurantInfo.city.hint')}</p>
            </div>
          </div>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t('restaurantInfo.city.placeholder')}
            className="input-modern"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Finnish Description */}
        <div className="glass-card rounded-2xl p-6">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            {t('restaurantInfo.descriptionFi.label')}
          </label>
          <p className="text-xs text-gray-500 mb-4">{t('restaurantInfo.descriptionFi.hint')}</p>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder={t('restaurantInfo.descriptionFi.placeholder')}
            rows={5}
            className="input-modern resize-none"
          />
        </div>

        {/* English Description */}
        <div className="glass-card rounded-2xl p-6">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            {t('restaurantInfo.descriptionEn.label')}
          </label>
          <p className="text-xs text-gray-500 mb-4">{t('restaurantInfo.descriptionEn.hint')}</p>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => handleChange('descriptionEn', e.target.value)}
            placeholder={t('restaurantInfo.descriptionEn.placeholder')}
            rows={5}
            className="input-modern resize-none"
          />
        </div>
      </div>

      {/* Email */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="feature-icon w-10 h-10">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900">
              {t('restaurantInfo.email.label')}
            </label>
            <p className="text-xs text-gray-500">{t('restaurantInfo.email.hint')}</p>
          </div>
        </div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder={t('restaurantInfo.email.placeholder')}
          className="input-modern"
        />
      </div>
    </div>
  );
}
