import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Link as LinkIcon, Check, Crown, Zap } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

type DomainType = 'subdomain' | 'custom' | 'path';

export function DomainSetupStep({ data, onUpdate }: Props) {
  const { t } = useTranslation('wizard');
  const [domainType, setDomainType] = useState<DomainType>(data.domainType || 'subdomain');
  const [slug, setSlug] = useState(data.slug || '');
  const [customDomain, setCustomDomain] = useState(data.customDomain || '');

  const domainOptions = [
    {
      id: 'subdomain' as DomainType,
      titleKey: 'domainSetup.options.subdomain.title',
      descriptionKey: 'domainSetup.options.subdomain.description',
      fullDescriptionKey: 'domainSetup.options.subdomain.fullDescription',
      icon: <Globe className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      badgeKey: 'domainSetup.options.subdomain.badge',
      badgeColor: 'bg-green-100 text-green-700 border-green-200',
    },
    {
      id: 'custom' as DomainType,
      titleKey: 'domainSetup.options.custom.title',
      descriptionKey: 'domainSetup.options.custom.description',
      fullDescriptionKey: 'domainSetup.options.custom.fullDescription',
      icon: <LinkIcon className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      badgeKey: 'domainSetup.options.custom.badge',
      badgeColor: 'bg-[#FF7A00]/10 text-[#8B4513] border-[#FF7A00]/20',
    },
    {
      id: 'path' as DomainType,
      titleKey: 'domainSetup.options.path.title',
      descriptionKey: 'domainSetup.options.path.description',
      fullDescriptionKey: 'domainSetup.options.path.fullDescription',
      icon: <Zap className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      badgeKey: 'domainSetup.options.path.badge',
      badgeColor: 'bg-green-100 text-green-700 border-green-200',
    },
  ];

  const handleSelectType = (type: DomainType) => {
    setDomainType(type);
    onUpdate({ domainType: type });
  };

  const handleSlugChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    setSlug(sanitized);
    onUpdate({ slug: sanitized });
  };

  const handleCustomDomainChange = (value: string) => {
    setCustomDomain(value);
    onUpdate({ customDomain: value });
  };

  return (
    <div className="space-y-8">
      {/* Domain Type Selection */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="feature-icon w-12 h-12">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('domainSetup.title')}</h3>
            <p className="text-sm text-gray-500">{t('domainSetup.description')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {domainOptions.map((option) => {
            const isSelected = domainType === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectType(option.id)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-orange-500 shadow-xl scale-105'
                    : 'glass-card glass-card-hover'
                }`}
              >
                {/* Gradient Header */}
                <div
                  className="p-6 text-white text-center"
                  style={{ background: option.gradient }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                    {option.icon}
                  </div>
                  <h4 className="font-bold text-lg">{t(option.titleKey)}</h4>
                  <p className="text-sm text-white/80 mt-1">{t(option.descriptionKey)}</p>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${option.badgeColor}`}>
                    {t(option.badgeKey)}
                  </span>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subdomain Input */}
      {domainType === 'subdomain' && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900">
                {t('domainSetup.subdomain.label')}
              </label>
              <p className="text-xs text-gray-500">{t('domainSetup.subdomain.hint')}</p>
            </div>
          </div>
          <div className="flex items-stretch">
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder={t('domainSetup.subdomain.placeholder')}
              className="input-modern rounded-r-none border-r-0 text-left"
            />
            <div className="px-4 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-r-2xl border-2 border-l-0 border-gray-300 font-semibold whitespace-nowrap">
              {t('domainSetup.subdomain.suffix')}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-xs text-gray-500">
              {t('domainSetup.subdomain.liveAt')}{' '}
              <span className="font-semibold text-orange-600">
                {slug || 'restaurant-name'}{t('domainSetup.subdomain.suffix')}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Custom Domain Input */}
      {domainType === 'custom' && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-[#CC6200]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900">
                {t('domainSetup.customDomain.label')}
              </label>
              <p className="text-xs text-gray-500">{t('domainSetup.customDomain.hint')}</p>
            </div>
            <span className="ml-auto badge text-xs">{t('domainSetup.customDomain.premium')}</span>
          </div>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => handleCustomDomainChange(e.target.value)}
            placeholder={t('domainSetup.customDomain.placeholder')}
            className="input-modern"
          />
          <div className="mt-4 p-4 rounded-xl bg-purple-50 border border-[#FF7A00]/20">
            <p
              className="text-sm text-[#3A1F0B]"
              dangerouslySetInnerHTML={{ __html: t('domainSetup.customDomain.dnsNote') }}
            />
          </div>
        </div>
      )}

      {/* Path Input */}
      {domainType === 'path' && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900">
                {t('domainSetup.path.label')}
              </label>
              <p className="text-xs text-gray-500">{t('domainSetup.path.hint')}</p>
            </div>
          </div>
          <div className="flex items-stretch">
            <div className="px-4 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-l-2xl border-2 border-r-0 border-gray-300 font-semibold whitespace-nowrap">
              {t('domainSetup.path.prefix')}
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder={t('domainSetup.path.placeholder')}
              className="input-modern rounded-l-none"
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-xs text-gray-500">
              {t('domainSetup.path.liveAt')}{' '}
              <span className="font-semibold text-orange-600">
                {t('domainSetup.path.prefix')}{slug || 'restaurant-name'}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{t('domainSetup.infoCards.instantActivation.title')}</h4>
              <p className="text-sm text-gray-600">
                {t('domainSetup.infoCards.instantActivation.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Crown className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{t('domainSetup.infoCards.upgradeAnytime.title')}</h4>
              <p className="text-sm text-gray-600">
                {t('domainSetup.infoCards.upgradeAnytime.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Check */}
      {slug && domainType !== 'custom' && (
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-green-600">{t('domainSetup.availability.available')}</span> {t('domainSetup.availability.readyForYou')}
          </p>
        </div>
      )}
    </div>
  );
}
