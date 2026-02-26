import { Check, Globe, Truck, User, ShoppingBag, CreditCard } from 'lucide-react';

interface Props {
  data: any;
  sessionId: string | null;
  onUpdate: (data: any) => void;
}

export function ReviewConfirmStep({ data }: Props) {
  const monthlyFee = calculateMonthlyFee(data);
  const oneTimeFee = calculateOneTimeFee(data);

  return (
    <div className="space-y-8">
      {/* Review Sections */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Review Your Restaurant</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Restaurant Information */}
          <ReviewCard
            icon={<User className="h-6 w-6" />}
            title="Restaurant Information"
            iconGradient="linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
            items={[
              { label: 'Name', value: data.name || 'Not set' },
              { label: 'Cuisine', value: getCuisineLabel(data.cuisine) || 'Not set' },
              { label: 'City', value: data.city || 'Not set' },
            ]}
          />

          {/* Website */}
          <ReviewCard
            icon={<Globe className="h-6 w-6" />}
            title="Website"
            iconGradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            items={[
              {
                label: 'Domain',
                value: data.domainType === 'custom'
                  ? data.customDomain || 'Not set'
                  : data.domainType === 'path'
                  ? `helmiesbites.fi/${data.slug || 'restaurant'}`
                  : `${data.slug || 'restaurant'}.helmiesbites.fi`
              },
              { label: 'Theme', value: data.theme?.name || 'Selected theme' },
            ]}
          />

          {/* Menu */}
          <ReviewCard
            icon={<ShoppingBag className="h-6 w-6" />}
            title="Menu"
            iconGradient="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
            items={[
              { label: 'Items', value: `${data.menu?.items?.length || 0} menu items` },
              { label: 'Categories', value: `${data.menu?.categories?.length || 0} categories` },
              { label: 'Languages', value: 'Finnish, English, Swedish' },
            ]}
          />

          {/* Contact */}
          <ReviewCard
            icon={<Truck className="h-6 w-6" />}
            title="Contact"
            iconGradient="linear-gradient(135deg, #d946ef 0%, #c026d3 100%)"
            items={[
              { label: 'Email', value: data.email || 'Not set' },
            ]}
          />
        </div>
      </div>

      {/* Pricing Summary */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Pricing Summary</h3>

        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Base Service */}
          <PricingRow
            label="Base Platform Fee"
            value="5% per online order"
            included
            description="Only pay when you get orders"
          />

          {/* Optional Features */}
          {data.features?.cashOnDelivery && (
            <PricingRow
              label="Cash on Delivery"
              value="€30/month"
              included
              description="Accept cash payments on delivery"
            />
          )}

          {data.features?.aiAssistant && (
            <PricingRow
              label="AI Assistant"
              value="€10/month"
              included
              description="Smart customer support AI"
            />
          )}

          {data.features?.aiImages && (
            <PricingRow
              label="AI Menu Images"
              value="€20"
              included
              description="One-time fee for AI-generated food images"
              oneTime
            />
          )}

          {data.features?.aiBranding && (
            <PricingRow
              label="AI Branding"
              value="€5"
              included
              description="One-time fee for AI-generated logo"
              oneTime
            />
          )}

          {/* Total */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 border-t border-orange-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-900">Monthly Total</span>
              <span className="text-2xl font-black gradient-text">
                €{monthlyFee}
                <span className="text-lg text-gray-500">/mo</span>
              </span>
            </div>
            {oneTimeFee > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">One-time charges</span>
                <span className="font-bold text-gray-900">€{oneTimeFee}</span>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-orange-200">
              <p className="text-sm text-gray-600">
                <Check className="h-4 w-4 inline text-green-600 mr-1" />
                No hidden fees. Cancel anytime.
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
            <h3 className="text-xl font-bold text-green-900 mb-2">You're All Set!</h3>
            <p className="text-green-800 mb-4">
              Click "Complete Setup" to launch your restaurant website. Your login credentials
              will be sent to your email address.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>Instant activation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>Free SSL certificate</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>Mobile responsive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-6 w-6 text-gray-600" />
          <h4 className="font-bold text-gray-900">Payment Information</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          You can add your payment details after setup. We offer various payment methods including
          credit card, direct debit, and invoice.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge">Visa</span>
          <span className="badge">Mastercard</span>
          <span className="badge">American Express</span>
          <span className="badge">Invoice</span>
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
}

function PricingRow({ label, value, included, description, oneTime }: PricingRowProps) {
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
              One-time
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

function getCuisineLabel(value: string): string {
  const cuisines: Record<string, string> = {
    finnish: 'Finnish',
    italian: 'Italian',
    chinese: 'Chinese',
    indian: 'Indian',
    thai: 'Thai',
    japanese: 'Japanese',
    burger: 'Burger & American',
    pizza: 'Pizza',
    kebab: 'Kebab',
    mexican: 'Mexican',
  };
  return cuisines[value] || value;
}
