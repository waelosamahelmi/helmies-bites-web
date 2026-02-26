import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';

export function Pricing() {
  return (
    <div>
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">Only pay for what you use. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Starter</h2>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">5%</span>
                <span className="text-gray-600"> per order</span>
              </div>

              <ul className="space-y-3 mb-8">
                <PricingItem text="Beautiful website" included />
                <PricingItem text="Online ordering" included />
                <PricingItem text="Mobile-optimized" included />
                <PricingItem text="Multi-language" included />
                <PricingItem text="Admin dashboard" included />
                <PricingItem text="Cash on Delivery" />
                <PricingItem text="AI Assistant" />
              </ul>

              <Link
                to="/get-started"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-orange-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
                Most Popular
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">Pro</h2>
              <p className="text-gray-600 mb-6">For growing restaurants</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">5%</span>
                <span className="text-gray-600"> per order</span>
                <p className="text-sm text-gray-500 mt-1">+ €30/month</p>
              </div>

              <ul className="space-y-3 mb-8">
                <PricingItem text="Everything in Starter" included />
                <PricingItem text="Cash on Delivery" included />
                <PricingItem text="Priority support" included />
                <PricingItem text="Advanced analytics" included />
                <PricingItem text="Custom domain" included />
                <PricingItem text="AI Assistant" />
              </ul>

              <Link
                to="/get-started"
                className="block w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h2>
              <p className="text-gray-600 mb-6">Full-featured solution</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">5%</span>
                <span className="text-gray-600"> per order</span>
                <p className="text-sm text-gray-500 mt-1">+ €40/month</p>
              </div>

              <ul className="space-y-3 mb-8">
                <PricingItem text="Everything in Pro" included />
                <PricingItem text="AI Assistant" included />
                <PricingItem text="Multi-branch support" included />
                <PricingItem text="API access" included />
                <PricingItem text="Dedicated support" included />
                <PricingItem text="Custom integrations" included />
              </ul>

              <Link
                to="/get-started"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600">
              All plans include a free subdomain. Custom domains available on Pro and Enterprise.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              One-time fees: €20 for AI menu images, €5 for AI branding
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

interface PricingItemProps {
  text: string;
  included?: boolean;
}

function PricingItem({ text, included = false }: PricingItemProps) {
  return (
    <li className="flex items-center gap-2 text-sm">
      {included ? (
        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
      ) : (
        <Plus className="h-4 w-4 text-gray-400 flex-shrink-0" />
      )}
      <span className={included ? 'text-gray-900' : 'text-gray-400'}>{text}</span>
    </li>
  );
}
