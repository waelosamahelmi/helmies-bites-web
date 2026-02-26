import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  HelpCircle,
  Star,
  Clock,
  CreditCard,
  HeadphonesIcon,
  XCircle,
  Award,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';
import { LaunchCountdown } from '../components/LaunchCountdown';

/* ============================================================================
   Pricing Tiers Data
   ============================================================================ */

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  color: string;
  colorBadge: string;
  priceDisplay: string;
  priceSubtext: string;
  setupFee: string;
  highlights: string[];
  bestFor: string;
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
    tagline: 'Pay-as-you-go',
    color: '#FF7A00',
    colorBadge: 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20',
    priceDisplay: '5%',
    priceSubtext: 'per online order',
    setupFee: '€0 setup',
    highlights: ['€49 minimum monthly fee', '5% per online order', 'No commitment required'],
    bestFor: 'Small cafés, testing the waters',
    icon: <Star className="h-6 w-6" />,
    features: {
      included: [
        'Full website builder',
        'Online ordering system',
        'AI menu import',
        'Stripe payment integration',
        'Mobile-optimized design',
        'Multi-language support',
        'Free subdomain',
        'Email support',
        '€49 minimum monthly fee',
      ],
      excluded: [
        'Offline payment support',
        'Custom branding & domain',
        'AI Assistant',
        'Advanced analytics',
        'Priority support',
      ],
    },
    cta: {
      text: 'Start for Free',
      variant: 'secondary',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Monthly subscription',
    color: '#D4915C',
    colorBadge: 'bg-[#D4915C]/10 text-[#D4915C] border-[#D4915C]/20',
    priceDisplay: '€129',
    priceSubtext: '/month',
    setupFee: '€500 one-time setup',
    highlights: ['Full features unlocked', 'Offline payments included', '€500 one-time setup'],
    bestFor: 'Established restaurants ready to commit',
    highlighted: true,
    icon: <Sparkles className="h-6 w-6" />,
    features: {
      included: [
        'Everything in Starter',
        'No transaction fees',
        'Offline payment support (cash, card terminal)',
        'AI Assistant for customers',
        'Advanced analytics & reports',
        'Custom branding & domain',
        'Priority support',
        'Social media integration',
        'Delivery zone management',
      ],
      excluded: [
        'White-label solution',
        'API access',
        'Dedicated account manager',
      ],
    },
    cta: {
      text: 'Get Started',
      variant: 'primary',
    },
  },
  {
    id: 'annual',
    name: 'Annual',
    tagline: 'Best value',
    color: '#fbbf24',
    colorBadge: 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/20',
    priceDisplay: '€99',
    priceSubtext: '/month billed annually',
    setupFee: '€0 setup',
    highlights: ['€1,190/first year', 'Renewal: €1,390/year', '3-year: €2,990 (€83/mo)'],
    bestFor: 'Restaurants wanting maximum savings',
    icon: <Award className="h-6 w-6" />,
    features: {
      included: [
        'Everything in Pro',
        'No transaction fees',
        'All features unlocked',
        '€0 setup (saves €500)',
        'Lowest effective monthly cost',
        'Dedicated account manager',
        'Custom integrations',
        'Multi-branch support',
        'SLA guarantee',
      ],
      excluded: [],
    },
    cta: {
      text: 'Lock in Savings',
      variant: 'primary',
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
    question: 'How does the Starter pay-as-you-go model work?',
    answer: 'With Starter, you pay 5% of your online orders processed through our platform — no monthly subscription. There is a minimum monthly fee of €49 to cover platform costs. For example, if you process €2,000 in online orders, you pay €100 (5%). If your 5% comes to less than €49, you still pay the €49 minimum.',
  },
  {
    id: 'faq-2',
    question: 'What does the €500 Pro setup fee include?',
    answer: 'The one-time €500 setup fee covers full onboarding: we configure your website, import your menu with AI, set up your custom domain, configure offline payment terminals, and provide a dedicated training session. With the Annual plan, setup is completely free (€0).',
  },
  {
    id: 'faq-3',
    question: 'Can I switch between plans?',
    answer: 'Absolutely! The natural upgrade path is: Starter → Pro → Annual. You can upgrade at any time. When switching from Starter to Pro, you pay the €500 setup fee and start the monthly billing. When switching to Annual, the setup fee is waived and any remaining Pro subscription is prorated.',
  },
  {
    id: 'faq-4',
    question: 'How does the Annual plan pricing work?',
    answer: 'First year: €1,190 (effectively €99/month). Renewal: €1,390/year. We also offer a 3-year commitment at €2,990 total (just €83/month). All annual plans include €0 setup and all features unlocked from day one.',
  },
  {
    id: 'faq-5',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and PayPal. Annual and 3-year plans can also be paid via invoice.',
  },
  {
    id: 'faq-6',
    question: 'What about offline payments on the Starter plan?',
    answer: 'The Starter plan only supports online payments through Stripe. If you need to accept cash, card terminal payments, or other offline methods, you\'ll need the Pro or Annual plan.',
  },
  {
    id: 'faq-7',
    question: 'Is there a contract or commitment?',
    answer: 'All plans require a 3-month cancellation notice. Annual: 1-year or 3-year commitment with our best rates.',
  },
  {
    id: 'faq-8',
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee on Pro and Annual plans. If you\'re not satisfied within the first 30 days, contact us for a full refund — no questions asked.',
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
    pro: boolean | string;
    annual: boolean | string;
  }[];
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    category: 'Pricing',
    features: [
      { name: 'Monthly cost', starter: '5% + €49 min', pro: '€129/mo', annual: '€99/mo' },
      { name: 'Setup fee', starter: '€0', pro: '€500', annual: '€0' },
      { name: 'Transaction fees', starter: '5%', pro: '0%', annual: '0%' },
      { name: 'Commitment', starter: 'None', pro: 'Monthly', annual: '1 or 3 years' },
    ],
  },
  {
    category: 'Core Features',
    features: [
      { name: 'Website builder', starter: true, pro: true, annual: true },
      { name: 'Online ordering', starter: true, pro: true, annual: true },
      { name: 'AI menu import', starter: true, pro: true, annual: true },
      { name: 'Mobile-optimized', starter: true, pro: true, annual: true },
      { name: 'Multi-language', starter: true, pro: true, annual: true },
    ],
  },
  {
    category: 'Payments',
    features: [
      { name: 'Stripe integration', starter: true, pro: true, annual: true },
      { name: 'Offline payments (cash, terminal)', starter: false, pro: true, annual: true },
      { name: 'Custom payment gateway', starter: false, pro: false, annual: true },
    ],
  },
  {
    category: 'AI & Automation',
    features: [
      { name: 'AI menu import', starter: true, pro: true, annual: true },
      { name: 'AI Assistant', starter: false, pro: true, annual: true },
      { name: 'AI translations', starter: true, pro: true, annual: true },
    ],
  },
  {
    category: 'Branding & Customization',
    features: [
      { name: 'Free subdomain', starter: true, pro: true, annual: true },
      { name: 'Custom domain', starter: false, pro: true, annual: true },
      { name: 'Custom branding', starter: false, pro: true, annual: true },
      { name: 'White-label solution', starter: false, pro: false, annual: true },
    ],
  },
  {
    category: 'Analytics & Support',
    features: [
      { name: 'Basic analytics', starter: true, pro: true, annual: true },
      { name: 'Advanced reports', starter: false, pro: true, annual: true },
      { name: 'Email support', starter: true, pro: true, annual: true },
      { name: 'Priority support', starter: false, pro: true, annual: true },
      { name: 'Dedicated account manager', starter: false, pro: false, annual: true },
      { name: 'SLA guarantee', starter: false, pro: false, annual: true },
    ],
  },
  {
    category: 'Technical',
    features: [
      { name: 'API access', starter: false, pro: false, annual: true },
      { name: 'Custom integrations', starter: false, pro: false, annual: true },
      { name: 'Multi-branch support', starter: false, pro: false, annual: true },
    ],
  },
];

/* ============================================================================
   Check SVG Icon (Aivora-style)
   ============================================================================ */

function CheckSvg() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        opacity="0.1"
        d="M21 10.5C21 11.396 19.8993 12.1345 19.6787 12.9605C19.4513 13.8145 20.027 15.0045 19.5947 15.7517C19.1555 16.5112 17.8342 16.6022 17.2183 17.2183C16.6022 17.8342 16.5112 19.1555 15.7517 19.5947C15.0045 20.027 13.8145 19.4513 12.9605 19.6787C12.1345 19.8993 11.396 21 10.5 21C9.604 21 8.8655 19.8993 8.0395 19.6787C7.1855 19.4513 5.9955 20.027 5.24825 19.5947C4.48875 19.1555 4.39775 17.8342 3.78175 17.2183C3.16575 16.6022 1.8445 16.5112 1.40525 15.7517C0.973 15.0045 1.54875 13.8145 1.32125 12.9605C1.10075 12.1345 0 11.396 0 10.5C0 9.604 1.10075 8.8655 1.32125 8.0395C1.54875 7.1855 0.973 5.9955 1.40525 5.24825C1.8445 4.48875 3.16575 4.39775 3.78175 3.78175C4.39775 3.16575 4.48875 1.8445 5.24825 1.40525C5.9955 0.973 7.1855 1.54875 8.0395 1.32125C8.8655 1.10075 9.604 0 10.5 0C11.396 0 12.1345 1.10075 12.9605 1.32125C13.8145 1.54875 15.0045 0.973 15.7517 1.40525C16.5112 1.8445 16.6022 3.16575 17.2183 3.78175C17.8342 4.39775 19.1555 4.48875 19.5947 5.24825C20.027 5.9955 19.4513 7.1855 19.6787 8.0395C19.8993 8.8655 21 9.604 21 10.5Z"
        fill="#FF7A00"
      />
      <path
        d="M13.5336 7.37076L9.53661 11.3678L7.46461 9.29751C7.01486 8.84776 6.28511 8.84776 5.83536 9.29751C5.38561 9.74726 5.38561 10.477 5.83536 10.9268L8.74211 13.8335C9.17961 14.271 9.89011 14.271 10.3276 13.8335L15.1611 9.00001C15.6109 8.55026 15.6109 7.82051 15.1611 7.37076C14.7114 6.92101 13.9834 6.92101 13.5336 7.37076Z"
        fill="#FF7A00"
      />
    </svg>
  );
}

/* ============================================================================
   Feature Checkmark Component for Comparison Table
   ============================================================================ */

interface FeatureCheckProps {
  value: boolean | string;
  highlighted?: boolean;
}

function FeatureCheck({ value, highlighted }: FeatureCheckProps) {
  if (typeof value === 'string') {
    return (
      <span
        className={`text-sm font-bold ${highlighted ? 'gradient-text' : value === 'Basic' ? 'text-white/40' : 'text-white/60'
          }`}
      >
        {value}
      </span>
    );
  }

  return value ? (
    <div className="w-8 h-8 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mx-auto">
      <Check className="h-5 w-5 text-[#FF7A00]" />
    </div>
  ) : (
    <div className="w-8 h-8 rounded-full bg-[#2A1F15]/30 flex items-center justify-center mx-auto">
      <XCircle className="h-5 w-5 text-gray-300" />
    </div>
  );
}

/* ============================================================================
   Main Pricing Page Component
   ============================================================================ */

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');

  const starterTier = pricingTiers[0];
  const proTier = pricingTiers[1];
  const annualTier = pricingTiers[2];

  // Pro plan pricing toggle values
  const proMonthlyPrice = '129';
  const proYearlyPrice = '1,390';
  const proMonthlyLabel = '/month';
  const proYearlyLabel = '/year';

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0D0907] font-sans pt-20">
      {/* ================================================================
          Hero Section
          ================================================================ */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7A00]/10 rounded-full mix-blend-normal filter blur-3xl opacity-30 floating" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#D4915C]/10 rounded-full mix-blend-normal filter blur-3xl opacity-30 floating-delayed" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <SectionTitle
              subtitle="Pricing Plans"
              titleHighlight="Simple & Flexible"
              title="Pricing"
              description="Start free. Upgrade as you grow. Every tier feeds the next — no dead ends."
              icon={<Sparkles className="h-4 w-4" />}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          Pricing Cards - Asymmetric Grid
          ================================================================ */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Two-column: Starter (5) + Pro (7) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Starter Plan - Left column */}
            <ScrollReveal direction="up" className="lg:col-span-5">
              <div className="relative glass-card xb-border rounded-[20px] p-8 h-full">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${starterTier.color}15`, color: starterTier.color }}
                >
                  {starterTier.icon}
                </div>

                {/* Price */}
                <h2 className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black" style={{ color: starterTier.color }}>
                    {starterTier.priceDisplay}
                  </span>
                  <span className="text-lg font-semibold text-white/40">
                    {starterTier.priceSubtext}
                  </span>
                </h2>

                {/* Setup fee badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs font-bold text-white/70 border border-white/10">
                    {starterTier.setupFee}
                  </span>
                </div>

                {/* CTA Button */}
                <div className="mb-6">
                  <LaunchCountdown compact />
                </div>

                {/* Feature list */}
                <ul className="space-y-3 mb-10">
                  {starterTier.features.included.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckSvg />
                      <span className="text-sm font-medium text-white/80">{feature}</span>
                    </li>
                  ))}
                  {starterTier.features.excluded.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-[#2A1F15]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="h-3 w-3 text-white/40" />
                      </div>
                      <span className="text-sm font-medium text-white/50">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing tag */}
                <span className="pricing-tag">Free Plan</span>
              </div>
            </ScrollReveal>

            {/* Pro Plan - Right column (larger) */}
            <ScrollReveal direction="up" delay={0.15} className="lg:col-span-7">
              <div className="relative glass-card xb-border rounded-[20px] p-8 h-full">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${proTier.color}15`, color: proTier.color }}
                >
                  {proTier.icon}
                </div>

                {/* Price + Toggle row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h2 className="flex items-baseline gap-1">
                    <span className="text-5xl font-black" style={{ color: proTier.color }}>
                      €<span>{isYearly ? proYearlyPrice : proMonthlyPrice}</span>
                    </span>
                    <span className="text-lg font-semibold text-white/40">
                      {isYearly ? proYearlyLabel : proMonthlyLabel}
                    </span>
                  </h2>

                  {/* Monthly / Yearly Toggle */}
                  <div className="flex items-center gap-3 text-sm font-bold text-white/60">
                    <span className={!isYearly ? 'text-[#FF7A00]' : ''}>Monthly</span>
                    <button
                      onClick={() => setIsYearly(!isYearly)}
                      className={`price-toggle ${isYearly ? 'active' : ''}`}
                      aria-label="Toggle billing period"
                    />
                    <span className={isYearly ? 'text-[#FF7A00]' : ''}>
                      Yearly <span className="text-[#FF7A00]/70 text-xs">10% off</span>
                    </span>
                  </div>
                </div>

                {/* Setup fee badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs font-bold text-white/70 border border-white/10">
                    {proTier.setupFee}
                  </span>
                </div>

                {/* CTA Button */}
                <div className="mb-6">
                  <LaunchCountdown compact />
                </div>

                {/* Feature list in two columns on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-10">
                  <ul className="space-y-3">
                    {proTier.features.included.slice(0, 5).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckSvg />
                        <span className="text-sm font-medium text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3 mt-3 md:mt-0">
                    {proTier.features.included.slice(5).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckSvg />
                        <span className="text-sm font-medium text-white/80">{feature}</span>
                      </li>
                    ))}
                    {proTier.features.excluded.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 opacity-40">
                        <div className="w-5 h-5 rounded-full bg-[#2A1F15]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="h-3 w-3 text-white/40" />
                        </div>
                        <span className="text-sm font-medium text-white/50">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing tag */}
                <span className="pricing-tag">Premium Plan</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Annual Plan - Full-width highlight card */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="relative glass-card xb-border rounded-[20px] p-8 md:p-10 border-2 border-[#fbbf24]/30 glow-amber">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#fbbf24] to-[#FF7A00] text-[#0D0907] shadow-lg whitespace-nowrap">
                Best Value
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left side: Icon + price + CTA */}
                <div className="lg:col-span-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${annualTier.color}15`, color: annualTier.color }}
                  >
                    {annualTier.icon}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2">{annualTier.name}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${annualTier.colorBadge}`}>
                    {annualTier.tagline}
                  </span>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-black" style={{ color: annualTier.color }}>
                      {annualTier.priceDisplay}
                    </span>
                    <span className="text-lg font-semibold text-white/40">
                      {annualTier.priceSubtext}
                    </span>
                  </div>

                  <div className="mt-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs font-bold text-white/70 border border-white/10">
                      {annualTier.setupFee}
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6 space-y-2">
                    {annualTier.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 flex-shrink-0" style={{ color: annualTier.color }} />
                        <span className="text-sm font-bold text-white/90">{h}</span>
                      </div>
                    ))}
                  </div>

                  <LaunchCountdown compact />
                </div>

                {/* Right side: Features in two columns */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <ul className="space-y-3">
                      {annualTier.features.included.slice(0, 5).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckSvg />
                          <span className="text-sm font-medium text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-3 mt-3 md:mt-0">
                      {annualTier.features.included.slice(5).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckSvg />
                          <span className="text-sm font-medium text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="mt-6 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Best for</span>
                    <p className="text-sm font-medium text-white/70 mt-1">{annualTier.bestFor}</p>
                  </div>
                </div>
              </div>

              {/* Pricing tag */}
              <span className="pricing-tag">Annual Plan</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          Trust Section
          ================================================================ */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal direction="up">
            <SectionTitle
              subtitle="Trust"
              titleHighlight="Why Restaurants"
              title="Choose Us"
              description="We're committed to your success with risk-free guarantees"
              icon={<Shield className="h-4 w-4" />}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Trust Badge 1 */}
            <ScrollReveal direction="up" delay={0}>
              <div className="glass-card xb-border rounded-[20px] p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  Money-Back Guarantee
                </h3>
                <p className="text-white/60 font-medium">
                  30-day full refund if you're not completely satisfied
                </p>
              </div>
            </ScrollReveal>

            {/* Trust Badge 2 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="glass-card xb-border rounded-[20px] p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#D4915C] flex items-center justify-center shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  No Setup Fees
                </h3>
                <p className="text-white/60 font-medium">
                  Launch your restaurant website in minutes, completely free
                </p>
              </div>
            </ScrollReveal>

            {/* Trust Badge 3 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="glass-card xb-border rounded-[20px] p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 to-[#FF7A00]/50 flex items-center justify-center shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  3-Month Notice
                </h3>
                <p className="text-white/60 font-medium">
                  Cancel with a 3-month notice period
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          Features Comparison Table
          ================================================================ */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal direction="up">
            <SectionTitle
              subtitle="Side-by-side comparison"
              titleHighlight="Compare All"
              title="Features"
              description="See exactly what's included in each plan to make the right choice"
              icon={<CompareArrows className="h-4 w-4" />}
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="glass-card xb-border rounded-[20px] overflow-hidden mt-12">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#2A1F15]/10">
                      <th className="text-left py-6 px-6 font-black text-white">
                        Feature
                      </th>
                      <th className="text-center py-6 px-6 font-bold text-[#FF7A00]">
                        Starter
                      </th>
                      <th className="text-center py-6 px-6 font-black text-[#D4915C]">
                        Pro
                      </th>
                      <th className="text-center py-6 px-6 font-bold text-[#fbbf24]">
                        Annual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((category) => (
                      <Fragment key={category.category}>
                        <tr className="bg-[#2A1F15]/10">
                          <td colSpan={4} className="py-4 px-6">
                            <span className="text-xs font-black text-white/40 uppercase tracking-wider">
                              {category.category}
                            </span>
                          </td>
                        </tr>
                        {category.features.map((feature, idx) => (
                          <tr
                            key={feature.name}
                            className={`border-b border-white/5 transition-colors ${idx % 2 === 0 ? 'bg-[#0D0907]/50' : 'bg-[#2A1F15]/10'
                              }`}
                          >
                            <td className="py-5 px-6 text-sm font-bold text-white/80">
                              {feature.name}
                            </td>
                            <td className="py-5 px-6 text-center">
                              <FeatureCheck value={feature.starter} />
                            </td>
                            <td className="py-5 px-6 text-center bg-[#D4915C]/5">
                              <FeatureCheck value={feature.pro} highlighted />
                            </td>
                            <td className="py-5 px-6 text-center">
                              <FeatureCheck value={feature.annual} />
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

      {/* ================================================================
          FAQ Section - Numbered Accordion (Aivora-style)
          ================================================================ */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal direction="up">
            <SectionTitle
              subtitle="Got questions?"
              titleHighlight="Frequently Asked"
              title="Questions"
              description="Everything you need to know about our pricing and plans"
              icon={<HelpCircle className="h-4 w-4" />}
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="faq-accordion mt-12">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`faq-item ${activeFaqId === faq.id ? 'active' : ''}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="faq-number">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="text-white/30 font-bold mx-1">_</span>
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-arrow">
                      <span></span>
                    </span>
                  </button>
                  <div className="faq-body">
                    <div className="faq-body-inner">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          CTA Section
          ================================================================ */}
      <section className="section-padding bg-[#0D0907] relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal direction="scale">
            <div className="text-center">
              <SectionTitle
                subtitle="Get Started"
                titleHighlight="Ready to Grow"
                title="Your Restaurant?"
                description="Join hundreds of restaurants already using Helmies Bites. Start free, no credit card required."
                icon={<Sparkles className="h-4 w-4" />}
              />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <LaunchCountdown showRestaurants />
                <Link
                  to="/features"
                  className="btn-secondary"
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

/* ============================================================================
   Additional SVG icon for comparison section
   ============================================================================ */

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
