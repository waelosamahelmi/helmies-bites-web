import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Palette, Smartphone, Globe, CheckCircle2 } from 'lucide-react';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Launch in 5 minutes with AI</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Restaurant Website,
            <span className="text-orange-600"> Ready in Minutes</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of restaurants using Helmies Bites. AI-powered setup, beautiful themes,
            online ordering, and complete management - all from €0 upfront.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/get-started"
              className="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/features"
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              See Features
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">No credit card required • 5-minute setup • Cancel anytime</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600">Powerful features to run your restaurant online</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-orange-600" />}
              title="Beautiful Themes"
              description="Choose from stunning presets or let AI create your unique look"
            />
            <FeatureCard
              icon={<Smartphone className="h-6 w-6 text-orange-600" />}
              title="Mobile Optimized"
              description="Your site looks perfect on every device, automatically"
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-orange-600" />}
              title="Multi-Language"
              description="Finnish, English, Swedish, and more - translated by AI"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-orange-600" />}
              title="Online Ordering"
              description="Accept orders online with integrated payment processing"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-orange-600" />}
              title="AI Menu Import"
              description="Upload your menu PDF - AI extracts and translates everything"
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-orange-600" />}
              title="Custom Domain"
              description="Use your own domain or get a free subdomain"
            />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Only pay for what you use</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <p className="text-6xl font-bold text-gray-900">5%</p>
              <p className="text-gray-600">service fee per online order</p>
            </div>

            <div className="space-y-4 mb-8">
              <PricingItem included={true} text="Beautiful restaurant website" />
              <PricingItem included={true} text="Online ordering system" />
              <PricingItem included={true} text="Mobile-optimized design" />
              <PricingItem included={true} text="Multi-language support" />
              <PricingItem included={true} text="Real-time order management" />
              <PricingItem included={false} text="Cash on Delivery (+€30/mo)" />
              <PricingItem included={false} text="AI Assistant (+€10/mo)" />
            </div>

            <Link
              to="/get-started"
              className="block w-full px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors text-center"
            >
              Start Free Setup
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Launch Your Restaurant Website?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of satisfied restaurants. Setup takes just 5 minutes.
          </p>
          <Link
            to="/get-started"
            className="inline-flex px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors items-center gap-2"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

interface PricingItemProps {
  included: boolean;
  text: string;
}

function PricingItem({ included, text }: PricingItemProps) {
  return (
    <div className="flex items-center gap-3">
      {included ? (
        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
      ) : (
        <span className="h-5 w-5 flex items-center justify-center text-gray-400 flex-shrink-0">+</span>
      )}
      <span className={included ? 'text-gray-900' : 'text-gray-600'}>{text}</span>
    </div>
  );
}
