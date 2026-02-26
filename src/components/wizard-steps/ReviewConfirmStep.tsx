import { Check, CreditCard, Truck, User } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function ReviewConfirmStep({ data }: Props) {
  const monthlyFee = calculateMonthlyFee(data);
  const oneTimeFee = calculateOneTimeFee(data);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Review Your Restaurant</h3>
        <ReviewSection
          icon={<User className="h-5 w-5" />}
          title="Restaurant Information"
          items={[
            { label: 'Name', value: data.name },
            { label: 'Cuisine', value: data.cuisine },
            { label: 'City', value: data.city },
          ]}
        />

        <ReviewSection
          icon={<Globe className="h-5 w-5" />}
          title="Website"
          items={[
            { label: 'Domain', value: `${data.slug || 'restaurant'}.helmiesbites.fi` },
            { label: 'Theme', value: data.theme?.name || 'Selected theme' },
          ]}
        />

        <ReviewSection
          icon={<Truck className="h-5 w-5" />}
          title="Menu"
          items={[
            { label: 'Items', value: `${data.menu?.items?.length || 0} menu items` },
            { label: 'Categories', value: `${data.menu?.categories?.length || 0} categories` },
          ]}
        />
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Pricing Summary</h3>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <PricingRow
            label="Service Fee"
            value="5% per online order"
            included
          />

          {data.features?.cashOnDelivery && (
            <PricingRow
              label="Cash on Delivery"
              value="€30/month"
              included
            />
          )}

          {data.features?.aiAssistant && (
            <PricingRow
              label="AI Assistant"
              value="€10/month"
              included
            />
          )}

          {data.features?.aiImages && (
            <PricingRow
              label="AI Menu Images (one-time)"
              value="€20"
              included
            />
          )}

          {data.features?.aiBranding && (
            <PricingRow
              label="AI Branding (one-time)"
              value="€5"
              included
            />
          )}

          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Monthly Total</span>
              <span className="text-xl font-bold text-gray-900">
                €{monthlyFee}/mo
              </span>
            </div>
            {oneTimeFee > 0 && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">One-time charges</span>
                <span className="text-sm text-gray-900">€{oneTimeFee}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-900">
          <Check className="h-4 w-4 inline mr-1" />
          <strong>You're all set!</strong> Click "Complete Setup" to launch your restaurant website.
          Your login credentials will be sent to your email.
        </p>
      </div>
    </div>
  );
}

interface ReviewSectionProps {
  icon: React.ReactNode;
  title: string;
  items: Array<{ label: string; value: string }>;
}

function ReviewSection({ icon, title, items }: ReviewSectionProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-orange-100 rounded text-orange-600">{icon}</div>
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
      <div className="ml-8 space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}:</span>
            <span className="text-gray-900">{item.value || '-'}</span>
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
}

function PricingRow({ label, value, included }: PricingRowProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center gap-2">
        {included ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <span className="h-4 w-4">+</span>
        )}
        <span className={included ? 'text-gray-900' : 'text-gray-600'}>{label}</span>
      </div>
      <span className="text-gray-900">{value}</span>
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
