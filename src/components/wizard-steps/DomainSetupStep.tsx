import { useState } from 'react';
import { Globe, Link as LinkIcon } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function DomainSetupStep({ data, onUpdate }: Props) {
  const [domainType, setDomainType] = useState(data.domainType || 'subdomain');
  const [slug, setSlug] = useState(data.slug || '');
  const [customDomain, setCustomDomain] = useState(data.customDomain || '');

  const handleUpdate = () => {
    onUpdate({ domainType, slug, customDomain });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Choose Your Domain Type</h3>

        <div className="space-y-3">
          <DomainOption
            selected={domainType === 'subdomain'}
            onClick={() => {
              setDomainType('subdomain');
              handleUpdate();
            }}
            title="Free Subdomain"
            description="restaurant.helmiesbites.fi"
            icon={<Globe className="h-5 w-5" />}
            free
          />

          <DomainOption
            selected={domainType === 'custom'}
            onClick={() => {
              setDomainType('custom');
              handleUpdate();
            }}
            title="Custom Domain"
            description="Use your own domain name"
            icon={<LinkIcon className="h-5 w-5" />}
          />

          <DomainOption
            selected={domainType === 'path'}
            onClick={() => {
              setDomainType('path');
              handleUpdate();
            }}
            title="Free Path"
            description="helmiesbites.fi/restaurant"
            icon={<Globe className="h-5 w-5" />}
            free
          />
        </div>
      </div>

      {domainType === 'subdomain' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Subdomain
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                handleUpdate();
              }}
              placeholder="restaurant-name"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="px-4 py-3 bg-gray-200 text-gray-600 rounded-r-lg border border-l-0 border-gray-200">
              .helmiesbites.fi
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Only lowercase letters, numbers, and hyphens allowed
          </p>
        </div>
      )}

      {domainType === 'custom' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Domain
          </label>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => {
              setCustomDomain(e.target.value);
              handleUpdate();
            }}
            placeholder="your-restaurant.fi"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            You'll need to update your DNS settings after setup
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> You can always add a custom domain later from your admin dashboard.
          Free domains are available immediately.
        </p>
      </div>
    </div>
  );
}

interface DomainOptionProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  free?: boolean;
}

function DomainOption({ selected, onClick, title, description, icon, free }: DomainOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border-2 rounded-lg flex items-start gap-3 text-left transition-all ${
        selected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className={`p-2 rounded ${selected ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900">{title}</p>
          {free && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Free</span>
          )}
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}
