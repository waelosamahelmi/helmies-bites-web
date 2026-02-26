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
} from 'lucide-react';
import { ScrollReveal, ScrollRevealBatch } from '../components/ScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';

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
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Essential features to get started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    transactionFee: '5%',
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
  const toggleRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillRef.current) return;

    gsap.to(pillRef.current, {
      x: isYearly ? 0 : 72,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isYearly]);

  return (
    <div ref={toggleRef} className="flex items-center gap-3">
      <span
        className={`text-sm font-medium transition-colors ${
          !isYearly ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() => onToggle(!isYearly)}
        className="relative w-36 h-8 bg-gray-100 rounded-full p-1 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-pressed={isYearly}
      >
        <div
          ref={pillRef}
          className="absolute top-1 left-1 w-[68px] h-6 bg-orange-600 rounded-full shadow-sm"
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {isYearly ? 'Yearly -20%' : 'Monthly'}
        </span>
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          isYearly ? 'text-gray-900' : 'text-gray-500'
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
  const isHoveredRef = useRef(false);

  const price = isYearly && tier.yearlyPrice !== null ? tier.yearlyPrice : tier.monthlyPrice;
  const showMonthlyEquivalent = isYearly && tier.yearlyPrice !== null && tier.monthlyPrice !== 0;

  const handleMouseEnter = () => {
    if (!cardRef.current || !tier.highlighted) return;
    isHoveredRef.current = true;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !tier.highlighted) return;
    isHoveredRef.current = false;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        tier.highlighted
          ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white shadow-2xl shadow-orange-600/25'
          : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-200'
      }`}
    >
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
            <Sparkles className="h-3.5 w-3.5" />
            {tier.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-1 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
          {tier.name}
        </h3>
        <p className={`text-sm ${tier.highlighted ? 'text-orange-100' : 'text-gray-500'}`}>
          {tier.tagline}
        </p>
      </div>

      <div className="mb-6">
        {price === null ? (
          <div>
            <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
              Custom
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">
                {price === 0 ? 'Free' : `${price}`}
              </span>
              {price > 0 && (
                <span className={`text-lg ${tier.highlighted ? 'text-orange-100' : 'text-gray-500'}`}>
                  /mo
                </span>
              )}
            </div>
            {showMonthlyEquivalent && (
              <p className="text-sm text-orange-100 mt-1">
                Billed {price * 12}/year (save 20%)
              </p>
            )}
          </div>
        )}
        <div className="mt-3">
          <span className={`text-sm font-medium ${tier.highlighted ? 'text-orange-100' : 'text-gray-600'}`}>
            {tier.transactionFee} transaction fee
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {tier.features.included.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                tier.highlighted ? 'text-orange-200' : 'text-green-600'
              }`}
            />
            <span className={`text-sm ${tier.highlighted ? 'text-white' : 'text-gray-700'}`}>
              {feature}
            </span>
          </li>
        ))}
        {tier.features.excluded.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 opacity-60">
            <X
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                tier.highlighted ? 'text-orange-200' : 'text-gray-400'
              }`}
            />
            <span className={`text-sm ${tier.highlighted ? 'text-white' : 'text-gray-400'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/get-started"
        className={`block w-full px-6 py-3 rounded-xl font-semibold text-center transition-all duration-200 ${
          tier.highlighted
            ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg'
            : tier.cta.variant === 'primary'
            ? 'bg-orange-600 text-white hover:bg-orange-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  return (
    <AccordionItem value={faq.id} className="border-b border-gray-200 last:border-0">
      <AccordionTrigger
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-5 text-left group focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180 text-orange-600' : ''
          }`}
        />
      </AccordionTrigger>
      <AccordionContent asChild>
        <div ref={contentRef} className="overflow-hidden">
          <p className="pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
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
        className={`text-sm font-medium ${
          highlighted ? 'text-orange-600' : value === 'Basic' ? 'text-gray-500' : 'text-gray-700'
        }`}
      >
        {value}
      </span>
    );
  }

  return value ? (
    <Check className={`h-5 w-5 ${highlighted ? 'text-orange-600' : 'text-green-600'}`} />
  ) : (
    <X className="h-5 w-5 text-gray-300" />
  );
}

/* ============================================================================
   Main Pricing Page Component
   ============================================================================ */

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingCardsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero elements on mount
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by 500+ restaurants</span>
          </div>

          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>

          <p className="hero-subtitle text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No hidden fees. Cancel anytime. Choose the plan that fits your restaurant.
          </p>

          <div className="hero-toggle flex items-center justify-center">
            <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />
          </div>

          {isYearly && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Save 20% with yearly billing</span>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section ref={pricingCardsRef} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="fade">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 border border-orange-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Money-Back Guarantee</h3>
                  <p className="text-sm text-gray-600">
                    30-day full refund if you're not satisfied
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">No Setup Fees</h3>
                  <p className="text-sm text-gray-600">
                    Launch your restaurant website in minutes, completely free
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cancel Anytime</h3>
                  <p className="text-sm text-gray-600">
                    No contracts or long-term commitments required
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Comparison Table */}
      <section ref={tableRef} className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-gray-600">See exactly what's included in each plan</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 w-1/3">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-500">
                      Starter
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-orange-600">
                      Professional
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-500">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category) => (
                    <Fragment key={category.category}>
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="py-3 px-4">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {category.category}
                          </span>
                        </td>
                      </tr>
                      {category.features.map((feature) => (
                        <tr key={feature.name} className="border-b border-gray-100 hover:bg-gray-50/50">
                          <td className="py-4 px-4 text-sm font-medium text-gray-700">
                            {feature.name}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <FeatureCheck value={feature.starter} />
                          </td>
                          <td className="py-4 px-4 text-center">
                            <FeatureCheck value={feature.professional} highlighted />
                          </td>
                          <td className="py-4 px-4 text-center">
                            <FeatureCheck value={feature.enterprise} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-6">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Common Questions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Everything you need to know about our pricing</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <Accordion type="multiple" className="space-y-0">
              {faqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="scale">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Grow Your Restaurant?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of restaurants already using Helmies Bites. Start free, no credit card
                required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/get-started"
                  className="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  See All Features
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
