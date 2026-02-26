import { Link } from 'react-router-dom';
import { Palette, Smartphone, Globe, CreditCard, Clock, BarChart3, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Beautiful Themes",
    description: "Choose from 10+ professionally designed themes or let AI create a unique look for your restaurant.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile-Optimized",
    description: "Your website looks perfect on every device - phones, tablets, and desktops.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-Language",
    description: "Finnish, English, Swedish, and more. AI translates your menu automatically.",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Online Payments",
    description: "Accept card payments securely with Stripe. Funds go directly to your account.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "5-Minute Setup",
    description: "Our AI-powered wizard gets you online in just 5 minutes. No technical skills needed.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Order Management",
    description: "Manage orders, update menu items, and track sales from your admin dashboard.",
  },
];

export function Features() {
  return (
    <div>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h1>
            <p className="text-xl text-gray-600">Everything you need to run your restaurant online</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
              >
                <div className="mb-4 text-orange-600">{feature.icon}</div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/get-started"
              className="inline-flex px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
