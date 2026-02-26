import { Link } from 'react-router-dom';
import { Fragment, useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  HelpCircle,
  ChevronDown,
  Star,
  Clock,
  CreditCard,
  HeadphonesIcon,
  CheckCircle2,
  XCircle,
  Award,
} from 'lucide-react';
import { ScrollReveal, ScrollRevealBatch } from '../components/ScrollReveal';

/* ============================================================================
   Pricing Tiers Data
   ============================================================================ */

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  transactionFee: string;
  badge?: string;
  features: {
    included: string[];
    excluded: string[];
  };
  highlighted?: boolean;
  cta: {
    text: string;
    variant: 'primary' | 'secondary';
  };
  icon: React.ReactNode;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Essential features to get started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    transactionFee: '5%',
    badge: undefined,
    icon: <Star className="h-6 w-6" />,
    features: {
      included: [
        'Essential features',
        'Basic menu management',
        'Stripe payment integration',
        'Email support',
        'Mobile-optimized design',
        'Multi-language support',
        'Free subdomain',
      ],
      excluded: [
        'Cash on Delivery',
        'AI Assistant',
        'Advanced analytics',
        'Custom branding',
        'Priority support',
        'API access',
        'White-label solution',
      ],
    },
    cta: {
      text: 'Get Started Free',
      variant: 'secondary',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For growing restaurants',
    monthlyPrice: 30,
    yearlyPrice: 24,
    transactionFee: '3%',
    badge: 'Most Popular',
    highlighted: true,
    icon: <Sparkles className="h-6 w-6" />,
    features: {
      included: [
        'Everything in Starter',
        'Reduced 3% transaction fee',
        'Cash on Delivery',
        'AI Assistant',
        'Advanced analytics',
        'Priority support',
        'Custom branding & domain',
        'Social media integration',
      ],
      excluded: [
        'White-label solution',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
      ],
    },
    cta: {
      text: 'Start Free Trial',
      variant: 'primary',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Full-featured solution for chains',
    monthlyPrice: null,
    yearlyPrice: null,
    transactionFee: '2%',
    icon: <Award className="h-6 w-6" />,
    features: {
      included: [
        'Everything in Professional',
        'Lowest 2% transaction fee',
        'White-label solution',
        'Full API access',
        'Dedicated account manager',
        'Custom integrations',
        'Multi-branch support',
        'SLA guarantee',
      ],
      excluded: [],
    },
    cta: {
      text: 'Contact Sales',
      variant: 'secondary',
    },
  },
];

/* ============================================================================
   FAQ Data
   ============================================================================ */

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How does the transaction fee work?',
    answer: 'The transaction fee is only charged on online orders paid through our platform. There are no fees for cash orders or orders placed in-person. For example, if you have a 5% fee and process 1000 in online orders, you pay 50 in fees for that month.',
  },
  {
    id: 'faq-2',
    question: 'Can I switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to all features. When downgrading, the change takes effect at the end of your current billing cycle.',
  },
  {
    id: 'faq-3',
    question: 'Is there a free trial?',
    answer: 'The Starter plan is completely free forever. For Professional and Enterprise plans, we offer a 14-day free trial with full access to all features. No credit card required to start.',
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoice-based payments with net-30 terms.',
  },
  {
    id: 'faq-5',
    question: 'Can I use my own domain?',
    answer: 'Yes! Professional and Enterprise plans include custom domain support. We provide step-by-step instructions to connect your domain, or you can purchase one directly through our platform.',
  },
  {
    id: 'faq-6',
    question: 'How does the 20% yearly savings work?',
    answer: 'When you choose annual billing, you get 2 months free. For example, the Professional plan costs 30/month (360/year), but with annual billing, you only pay 288 (24/month equivalent).',
  },
  {
    id: 'faq-7',
    question: 'Is there a setup fee?',
    answer: 'No! There are absolutely no setup fees. You can launch your restaurant website in minutes without any upfront costs. Optional AI-generated menu images and branding assets can be added for a one-time fee.',
  },
  {
    id: 'faq-8',
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee. If you are not satisfied with our service within the first 30 days, contact us for a full refund, no questions asked.',
  },
];

/* ============================================================================
   Comparison Table Data
   ============================================================================ */

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    starter: boolean | string;
    professional: boolean | string;
    enterprise: boolean | string;
  }[];
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    category: 'Core Features',
    features: [
      { name: 'Website builder', starter: true, professional: true, enterprise: true },
      { name: 'Online ordering', starter: true, professional: true, enterprise: true },
      { name: 'Menu management', starter: 'Basic', professional: 'Advanced', enterprise: 'Advanced' },
      { name: 'Mobile-optimized', starter: true, professional: true, enterprise: true },
      { name: 'Multi-language', starter: true, professional: true, enterprise: true },
    ],
  },
  {
    category: 'Payments & Fees',
    features: [
      { name: 'Transaction fee', starter: '5%', professional: '3%', enterprise: '2%' },
      { name: 'Stripe integration', starter: true, professional: true, enterprise: true },
      { name: 'Cash on Delivery', starter: false, professional: true, enterprise: true },
      { name: 'Custom payment gateway', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'AI & Automation',
    features: [
      { name: 'AI Assistant', starter: false, professional: true, enterprise: true },
      { name: 'AI menu import', starter: true, professional: true, enterprise: true },
      { name: 'AI translations', starter: true, professional: true, enterprise: true },
      { name: 'Auto-pricing suggestions', starter: false, professional: true, enterprise: true },
    ],
  },
  {
    category: 'Analytics & Insights',
    features: [
      { name: 'Basic analytics', starter: true, professional: true, enterprise: true },
      { name: 'Advanced reports', starter: false, professional: true, enterprise: true },
      { name: 'Customer insights', starter: false, professional: true, enterprise: true },
      { name: 'Revenue forecasting', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'Branding & Customization',
    features: [
      { name: 'Free subdomain', starter: true, professional: true, enterprise: true },
      { name: 'Custom domain', starter: false, professional: true, enterprise: true },
      { name: 'Custom branding', starter: false, professional: true, enterprise: true },
      { name: 'White-label solution', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'Support',
    features: [
      { name: 'Email support', starter: true, professional: true, enterprise: true },
      { name: 'Priority support', starter: false, professional: true, enterprise: true },
      { name: 'Dedicated manager', starter: false, professional: false, enterprise: true },
      { name: 'SLA guarantee', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'Technical',
    features: [
      { name: 'API access', starter: false, professional: false, enterprise: true },
      { name: 'Webhooks', starter: false, professional: false, enterprise: true },
      { name: 'Custom integrations', starter: false, professional: false, enterprise: true },
      { name: 'Multi-branch support', starter: false, professional: false, enterprise: true },
    ],
  },
];

/* ============================================================================
   Toggle Switch Component
   ============================================================================ */

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (value: boolean) => void;
}

function BillingToggle({ isYearly, onToggle }: BillingToggleProps) {
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillRef.current) return;

    gsap.to(pillRef.current, {
      left: isYearly ? 'calc(100% - 68px - 4px)' : '4px',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isYearly]);

  return (
    <div className="flex items-center gap-4">
      <span
        className={`text-sm font-bold transition-all duration-300 ${
          !isYearly ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() => onToggle(!isYearly)}
        className="relative w-40 h-10 glass-card rounded-full p-1 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-pressed={isYearly}
      >
        <div
          ref={pillRef}
          className="absolute top-1 left-1 w-[68px] h-8 rounded-full gradient-bg shadow-md z-10"
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-600">
          {isYearly ? 'Yearly' : 'Monthly'}
        </span>
      </button>
      <span
        className={`text-sm font-bold transition-all duration-300 ${
          isYearly ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        Yearly
      </span>
    </div>
  );
}

/* ============================================================================
   Pricing Card Component
   ============================================================================ */

interface PricingCardProps {
  tier: PricingTier;
  isYearly: boolean;
}

function PricingCard({ tier, isYearly }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const price = isYearly && tier.yearlyPrice !== null ? tier.yearlyPrice : tier.monthlyPrice;
  const showMonthlyEquivalent = isYearly && tier.yearlyPrice !== null && tier.monthlyPrice !== 0;

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-card glass-card-hover rounded-3xl p-8 ${
        tier.highlighted ? 'pricing-popular glow-orange' : ''
      }`}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
          tier.highlighted
            ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white'
            : 'feature-icon'
        }`}
      >
        {tier.icon}
      </div>

      {/* Name & Tagline */}
      <div className="mb-6">
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          {tier.name}
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          {tier.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {price === null ? (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-gray-900">
              Custom
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black gradient-text">
                {price === 0 ? 'Free' : `$${price}`}
              </span>
              {price > 0 && (
                <span className="text-lg font-semibold text-gray-400">
                  /mo
                </span>
              )}
            </div>
            {showMonthlyEquivalent && (
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Billed ${price * 12}/year
                <span className="ml-2 inline-flex items-center gap-1 text-green-600 font-bold">
                  <Zap className="h-3 w-3" />
                  Save 20%
                </span>
              </p>
            )}
          </div>
        )}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
          <span className="text-sm font-bold text-orange-600">
            {tier.transactionFee} transaction fee
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {tier.features.included.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {feature}
            </span>
          </li>
        ))}
        {tier.features.excluded.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 opacity-40">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-500">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        to="/get-started"
        className={`block w-full px-6 py-4 rounded-2xl font-bold text-center transition-all duration-300 ${
          tier.highlighted
            ? 'btn-primary'
            : tier.cta.variant === 'primary'
            ? 'btn-primary'
            : 'btn-secondary'
        }`}
      >
        {tier.cta.text}
      </Link>
    </div>
  );
}

/* ============================================================================
   FAQ Accordion Item Component
   ============================================================================ */

interface FAQItemProps {
  faq: FAQ;
}

function FAQItem({ faq }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !chevronRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(chevronRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(chevronRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  return (
    <div className="glass-card rounded-2xl mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left group focus:outline-none"
      >
        <span className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors pr-4">
          {faq.question}
        </span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center flex-shrink-0 group-hover:from-orange-200 group-hover:to-pink-200 transition-all duration-300">
          <ChevronDown
            ref={chevronRef}
            className="h-5 w-5 text-orange-600"
          />
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden">
        <p className="px-6 pb-6 text-gray-600 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

/* ============================================================================
   Feature Checkmark Component for Table
   ============================================================================ */

interface FeatureCheckProps {
  value: boolean | string;
  highlighted?: boolean;
}

function FeatureCheck({ value, highlighted }: FeatureCheckProps) {
  if (typeof value === 'string') {
    return (
      <span
        className={`text-sm font-bold ${
          highlighted ? 'gradient-text' : value === 'Basic' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {value}
      </span>
    );
  }

  return value ? (
    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mx-auto">
      <Check className="h-5 w-5 text-green-600" />
    </div>
  ) : (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
      <XCircle className="h-5 w-5 text-gray-300" />
    </div>
  );
}

/* ============================================================================
   Main Pricing Page Component
   ============================================================================ */

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const savingsBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      heroRef.current.querySelector('.hero-badge'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        heroRef.current.querySelector('.hero-title'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(
        heroRef.current.querySelector('.hero-subtitle'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        heroRef.current.querySelector('.hero-toggle'),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 },
        '-=0.2'
      );
  }, []);

  useEffect(() => {
    if (!savingsBadgeRef.current) return;

    if (isYearly) {
      gsap.fromTo(
        savingsBadgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [isYearly]);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-gradient section-padding relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating-delayed" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="hero-badge badge mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Trusted by 500+ restaurants worldwide</span>
          </div>

          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="gradient-text">Simple, Transparent</span>
            <br />
            <span className="text-gray-900">Pricing</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            No hidden fees. Cancel anytime. Choose the perfect plan for your restaurant's success.
          </p>

          <div className="hero-toggle flex items-center justify-center mb-6">
            <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />
          </div>

          {isYearly && (
            <div
              ref={savingsBadgeRef}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg"
            >
              <Zap className="h-5 w-5" />
              <span className="text-sm font-bold">Save 20% with yearly billing</span>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealBatch
            stagger={0.15}
            direction="up"
            display="grid"
            gridCols={3}
            gap="2rem"
            className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
          >
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} isYearly={isYearly} />
            ))}
          </ScrollRevealBatch>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding gradient-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Why Restaurants Choose Us
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                We're committed to your success with risk-free guarantees
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealBatch
            stagger={0.1}
            direction="up"
            display="grid"
            gridCols={3}
            gap="2rem"
            className="md:grid-cols-3 grid-cols-1"
          >
            {/* Trust Badge 1 */}
            <div className="glass-card rounded-3xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                Money-Back Guarantee
              </h3>
              <p className="text-gray-600 font-medium">
                30-day full refund if you're not completely satisfied
              </p>
            </div>

            {/* Trust Badge 2 */}
            <div className="glass-card rounded-3xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                No Setup Fees
              </h3>
              <p className="text-gray-600 font-medium">
                Launch your restaurant website in minutes, completely free
              </p>
            </div>

            {/* Trust Badge 3 */}
            <div className="glass-card rounded-3xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                Cancel Anytime
              </h3>
              <p className="text-gray-600 font-medium">
                No contracts or long-term commitments required
              </p>
            </div>
          </ScrollRevealBatch>
        </div>
      </section>

      {/* Features Comparison Table */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="badge mb-6">
              <CompareArrows className="h-4 w-4" />
              <span>Side-by-side comparison</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See exactly what's included in each plan to make the right choice
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200/50 bg-gradient-to-r from-orange-50 to-pink-50">
                      <th className="text-left py-6 px-6 font-black text-gray-900">
                        Feature
                      </th>
                      <th className="text-center py-6 px-6 font-bold text-gray-500">
                        Starter
                      </th>
                      <th className="text-center py-6 px-6 font-black text-orange-600">
                        Professional
                      </th>
                      <th className="text-center py-6 px-6 font-bold text-gray-500">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((category) => (
                      <Fragment key={category.category}>
                        <tr className="bg-gray-50/50">
                          <td colSpan={4} className="py-4 px-6">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                              {category.category}
                            </span>
                          </td>
                        </tr>
                        {category.features.map((feature, idx) => (
                          <tr
                            key={feature.name}
                            className={`border-b border-gray-100 transition-colors ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                            }`}
                          >
                            <td className="py-5 px-6 text-sm font-bold text-gray-700">
                              {feature.name}
                            </td>
                            <td className="py-5 px-6 text-center">
                              <FeatureCheck value={feature.starter} />
                            </td>
                            <td className="py-5 px-6 text-center bg-gradient-to-b from-orange-50/50 to-transparent">
                              <FeatureCheck value={feature.professional} highlighted />
                            </td>
                            <td className="py-5 px-6 text-center">
                              <FeatureCheck value={feature.enterprise} />
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding hero-gradient">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="badge mb-6">
              <HelpCircle className="h-4 w-4" />
              <span>Got questions?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 gradient-animated opacity-10" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal direction="scale">
            <div className="card-gradient rounded-3xl p-10 md:p-16 text-center glow-orange">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to Grow Your Restaurant?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
                Join hundreds of restaurants already using Helmies Bites. Start free, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/get-started"
                  className="px-10 py-5 bg-white text-orange-600 rounded-2xl font-black hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/features"
                  className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/30 backdrop-blur-sm"
                >
                  See All Features
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">30-day guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeadphonesIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">24/7 support</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// Additional icon for comparison section
function CompareArrows({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m20 20-4-4" />
      <path d="m16 20 4-4" />
      <path d="M4 4l4 4" />
      <path d="M8 4l-4 4" />
      <path d="M12 12V4" />
      <path d="M12 12v8" />
      <path d="M4 12h16" />
    </svg>
  );
}
