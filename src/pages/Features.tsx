import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingCart,
  Utensils,
  CreditCard,
  Truck,
  BarChart3,
  Megaphone,
  Building2,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Palette,
  Globe,
  Clock,
  Zap,
  Users,
  Star,
  Package,
  MapPin,
  Bell,
  Mail,
  Gift,
  QrCode,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';
import { AivoraButton } from '../components/AivoraButton';
import { LaunchCountdown } from '../components/LaunchCountdown';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================================
   Types
   ============================================================================ */

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
  image?: string;
}

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: FeatureItem[];
  color: string;
}

/* ============================================================================
   Data
   ============================================================================ */

const featureCategories: FeatureCategory[] = [
  {
    id: 'online-ordering',
    title: 'Online Ordering',
    description: 'Streamline your ordering process with a seamless customer experience',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-[#FF7A00] to-[#CC6200]',
    features: [
      {
        icon: <ShoppingCart className="h-5 w-5" />,
        title: 'Smart Shopping Cart',
        description: 'Intuitive cart with real-time updates, quantity controls, and special instructions support.',
        benefit: 'Reduce cart abandonment by up to 35%',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80',
      },
      {
        icon: <CreditCard className="h-5 w-5" />,
        title: 'One-Click Checkout',
        description: 'Save customer details for lightning-fast repeat orders with Stripe integration.',
        benefit: 'Customers complete orders 3x faster',
        image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
      },
      {
        icon: <MapPin className="h-5 w-5" />,
        title: 'Real-Time Order Tracking',
        description: 'Live order status updates from preparation to delivery or pickup.',
        benefit: 'Reduce "Where is my order?" calls by 80%',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
      },
      {
        icon: <Clock className="h-5 w-5" />,
        title: 'Scheduled Ordering',
        description: 'Let customers order hours or days in advance for pickup or delivery.',
        benefit: 'Capture orders during off-peak hours',
      },
      {
        icon: <Bell className="h-5 w-5" />,
        title: 'Order Notifications',
        description: 'Instant SMS and email alerts for new orders, updates, and confirmations.',
        benefit: 'Never miss an order again',
      },
    ],
  },
  {
    id: 'menu-management',
    title: 'Menu Management',
    description: 'Create and manage beautiful, engaging menus with AI assistance',
    icon: <Utensils className="h-6 w-6" />,
    color: 'from-red-500 to-[#CC6200]',
    features: [
      {
        icon: <Palette className="h-5 w-5" />,
        title: 'AI-Powered Menu Setup',
        description: 'Upload photos and descriptions. Our AI organizes everything into categories, suggests prices, and creates modifiers.',
        benefit: 'Go from zero to live menu in under 5 minutes',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      },
      {
        icon: <Package className="h-5 w-5" />,
        title: 'Custom Modifiers & Options',
        description: 'Add toppings, sizes, cooking preferences, and special requests with ease.',
        benefit: 'Increase average order value by 20%',
      },
      {
        icon: <Star className="h-5 w-5" />,
        title: 'Photo Galleries',
        description: 'Upload multiple high-quality photos to showcase your dishes beautifully.',
        benefit: 'Photos increase orders by 30%',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      },
      {
        icon: <Globe className="h-5 w-5" />,
        title: 'Multi-Language Menus',
        description: 'AI translates your menu into Finnish, English, Swedish, and more automatically.',
        benefit: 'Reach a broader customer base',
      },
      {
        icon: <QrCode className="h-5 w-5" />,
        title: 'QR Code Menus',
        description: 'Generate printable QR codes for table-side ordering and contactless menus.',
        benefit: 'Reduce physical menu printing costs',
      },
    ],
  },
  {
    id: 'payment-processing',
    title: 'Payment Processing',
    description: 'Accept payments securely and get paid instantly',
    icon: <CreditCard className="h-6 w-6" />,
    color: 'from-[#FF7A00] to-[#CC6200]',
    features: [
      {
        icon: <CreditCard className="h-5 w-5" />,
        title: 'Stripe Integration',
        description: 'Accept all major credit cards, mobile wallets, and local payment methods through Stripe.',
        benefit: 'Industry-leading security and reliability',
        image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Instant Payouts',
        description: 'Configure daily automatic payouts to your bank account. No waiting weeks for your money.',
        benefit: 'Improve cash flow immediately',
      },
      {
        icon: <Smartphone className="h-5 w-5" />,
        title: 'Mobile Payments',
        description: 'Accept Apple Pay, Google Pay, and other mobile wallets for seamless checkout.',
        benefit: 'Mobile users convert 2x more',
      },
      {
        icon: <ReceiptIcon className="h-5 w-5" />,
        title: 'Digital Receipts',
        description: 'Automatic email receipts with order details and easy re-order links.',
        benefit: 'Encourage repeat purchases',
      },
    ],
  },
  {
    id: 'delivery-management',
    title: 'Delivery Management',
    description: 'Take control of your delivery operations or integrate with partners',
    icon: <Truck className="h-6 w-6" />,
    color: 'from-[#D4915C] to-[#FF7A00]/50',
    features: [
      {
        icon: <MapPin className="h-5 w-5" />,
        title: 'Delivery Zones',
        description: 'Define custom delivery areas with radius-based or polygon zones and unique fees.',
        benefit: 'Optimize delivery costs and coverage',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
      },
      {
        icon: <CalculatorIcon className="h-5 w-5" />,
        title: 'Dynamic Fee Calculation',
        description: 'Set fees based on distance, order size, or time-of-day with automatic adjustments.',
        benefit: 'Protect margins on small orders',
      },
      {
        icon: <Smartphone className="h-5 w-5" />,
        title: 'Driver App',
        description: 'Dedicated mobile app for delivery drivers with route optimization and status updates.',
        benefit: 'Complete control over delivery experience',
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: 'Driver Management',
        description: 'Assign orders to drivers, track deliveries, and optimize routes.',
        benefit: 'Complete control over delivery experience',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    description: 'Data-driven insights to grow your business',
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'from-[#CC6200] to-[#CC6200]',
    features: [
      {
        icon: <TrendingUpIcon className="h-5 w-5" />,
        title: 'Sales Analytics',
        description: 'Track revenue, average order value, and growth over time with beautiful visualizations.',
        benefit: 'Make data-driven business decisions',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      },
      {
        icon: <Star className="h-5 w-5" />,
        title: 'Popular Items Report',
        description: 'Discover your best-sellers and underperforming items to optimize your menu.',
        benefit: 'Focus on what drives profit',
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: 'Customer Insights',
        description: 'Understand customer behavior, order frequency, and lifetime value.',
        benefit: 'Identify and retain VIP customers',
      },
      {
        icon: <Clock className="h-5 w-5" />,
        title: 'Peak Hour Analysis',
        description: 'Identify your busiest times to optimize staffing and preparation.',
        benefit: 'Reduce wait times and improve service',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Tools',
    description: 'Attract new customers and keep them coming back',
    icon: <Megaphone className="h-6 w-6" />,
    color: 'from-[#D4915C] to-[#D4915C]',
    features: [
      {
        icon: <TagIcon className="h-5 w-5" />,
        title: 'Promotions & Discounts',
        description: 'Create coupon codes, percentage discounts, and BOGO offers with ease.',
        benefit: 'Drive sales during slow periods',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80',
      },
      {
        icon: <Gift className="h-5 w-5" />,
        title: 'Loyalty Programs',
        description: 'Reward repeat customers with points, free items, and exclusive perks.',
        benefit: 'Increase customer retention by 40%',
      },
      {
        icon: <Mail className="h-5 w-5" />,
        title: 'Email Campaigns',
        description: 'Send targeted email campaigns to announce specials, events, and promotions.',
        benefit: 'Reach customers directly in their inbox',
      },
      {
        icon: <Share2Icon className="h-5 w-5" />,
        title: 'Social Sharing',
        description: 'Easy sharing to Facebook, Instagram, and other social platforms.',
        benefit: 'Amplify your reach organically',
      },
    ],
  },
  {
    id: 'multi-location',
    title: 'Multi-Location Support',
    description: 'Manage multiple restaurants from a single dashboard',
    icon: <Building2 className="h-6 w-6" />,
    color: 'from-cyan-500 to-teal-500',
    features: [
      {
        icon: <Building2 className="h-5 w-5" />,
        title: 'Centralized Management',
        description: 'Manage menus, prices, and settings across all locations from one admin panel.',
        benefit: 'Save hours of administrative work',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
      },
      {
        icon: <GitBranchIcon className="h-5 w-5" />,
        title: 'Location-Specific Options',
        description: 'Customize menus, pricing, and delivery zones for each location independently.',
        benefit: 'Adapt to local market conditions',
      },
      {
        icon: <BarChart3 className="h-5 w-5" />,
        title: 'Aggregated Reporting',
        description: 'View individual location performance or consolidated reports across all locations.',
        benefit: 'See the big picture and details',
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: 'Role-Based Access',
        description: 'Grant location managers access only to their specific restaurant data.',
        benefit: 'Maintain security and control',
      },
    ],
  },
  {
    id: 'mobile-friendly',
    title: 'Mobile Friendly',
    description: 'Perfect experience on every device, everywhere',
    icon: <Smartphone className="h-6 w-6" />,
    color: 'from-[#CC6200] to-[#CC6200]',
    features: [
      {
        icon: <Smartphone className="h-5 w-5" />,
        title: 'Responsive Design',
        description: 'Your site looks stunning on phones, tablets, and desktops automatically.',
        benefit: '70% of customers order on mobile',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'PWA Support',
        description: 'Progressive Web App technology lets customers install your site like a native app.',
        benefit: 'Increase engagement and repeat orders',
      },
      {
        icon: <WifiIcon className="h-5 w-5" />,
        title: 'Offline Capability',
        description: 'Menu browsing works even with poor or no internet connection.',
        benefit: 'Never lose a customer to connectivity issues',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Lightning Fast',
        description: 'Optimized performance loads pages instantly even on older devices.',
        benefit: 'Faster sites convert more customers',
      },
    ],
  },
];

const comparisonData = [
  {
    feature: 'Setup Time',
    helmies: '5 minutes with AI',
    traditional: 'Days to weeks',
  },
  {
    feature: 'Monthly Cost',
    helmies: 'From 29/month',
    traditional: '99-299/month',
  },
  {
    feature: 'Commission on Orders',
    helmies: '0%',
    traditional: '15-30%',
  },
  {
    feature: 'Payment Processing',
    helmies: 'Direct Stripe - funds in your account',
    traditional: 'Held by platform, paid out weekly/monthly',
  },
  {
    feature: 'Menu Management',
    helmies: 'AI-powered, instant updates',
    traditional: 'Manual input, slow changes',
  },
  {
    feature: 'Custom Branding',
    helmies: 'Full customization with AI',
    traditional: 'Limited templates or expensive custom',
  },
  {
    feature: 'Customer Data',
    helmies: '100% yours - full export',
    traditional: 'Owned by platform',
  },
  {
    feature: 'Multi-Language',
    helmies: 'Auto-translate with AI',
    traditional: 'Manual translation needed',
  },
  {
    feature: 'Delivery Fees',
    helmies: 'You keep it all',
    traditional: 'Platform takes a cut',
  },
  {
    feature: 'Support',
    helmies: '24/7 Finnish support',
    traditional: 'Often outsourced, slow response',
  },
];

const integrations = [
  { name: 'Stripe', category: 'Payments', icon: '', color: 'from-[#FF7A00]/50 to-[#CC6200]' },
  { name: 'MobilePay', category: 'Payments', icon: '', color: 'from-[#D4915C] to-[#D4915C]' },
  { name: 'PayPal', category: 'Payments', icon: '', color: 'from-[#D4915C] to-blue-600' },
  { name: 'Mailchimp', category: 'Marketing', icon: '', color: 'from-yellow-400 to-[#CC6200]' },
  { name: 'Klaviyo', category: 'Marketing', icon: '', color: 'from-[#FF7A00] to-teal-500' },
  { name: 'QuickBooks', category: 'Accounting', icon: '', color: 'from-emerald-500 to-green-600' },
  { name: 'Xero', category: 'Accounting', icon: '', color: 'from-[#D4915C] to-[#D4915C]' },
  { name: 'Meta', category: 'Social', icon: '', color: 'from-[#D4915C] to-blue-700' },
  { name: 'Google', category: 'Analytics', icon: '', color: 'from-red-500 to-yellow-500' },
  { name: 'Facebook', category: 'Social', icon: '', color: 'from-[#D4915C] to-blue-600' },
];

/* ============================================================================
   Icon Components
   ============================================================================ */

function ReceiptIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 2v20l6-4 6 4V2H4Z"/><path d="m8 8 2 2 4-4"/></svg>;
}

function CalculatorIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 14h-2"/><path d="M16 18h-2"/><path d="M16 14v4"/><path d="M8 14h2"/><path d="M8 18h2"/><path d="M8 14v4"/><path d="M12 14h2"/><path d="M12 18h2"/><path d="M12 14v4"/></svg>;
}

function TrendingUpIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}

function TagIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>;
}

function Share2Icon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>;
}

function GitBranchIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>;
}

function WifiIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>;
}

/* ============================================================================
   Floating Element Sub-Component
   ============================================================================ */

function FloatingElement({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const animation = gsap.to(ref.current, { y: -15, rotation: 3, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay });
    return () => { animation.kill(); gsap.set(ref.current, { y: 0, rotation: 0 }); };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ============================================================================
   FeatureAccordion Component
   ============================================================================ */

function FeatureAccordion({ category, isOpen, onToggle }: { category: FeatureCategory; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && featuresRef.current) {
      const features = featuresRef.current.querySelectorAll('.feature-item');
      gsap.fromTo(features,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  // Separate first feature (hero/asymmetric) from the rest
  const firstFeature = category.features[0];
  const restFeatures = category.features.slice(1);

  return (
    <div className="glass-card xb-border rounded-3xl overflow-hidden transition-all duration-500">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors duration-300"
      >
        <div className="flex items-center gap-5">
          <div className={`feature-icon p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white`}>
            {category.icon}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{category.title}</h3>
            <p className="text-white/50 text-sm md:text-base mt-1">{category.description}</p>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#FF7A00]/10 rotate-180' : 'bg-[#2A1F15]/30'}`}>
          {isOpen ? <ChevronUp className="h-5 w-5 text-[#FF7A00]" /> : <ChevronDown className="h-5 w-5 text-white/50" />}
        </div>
      </button>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div ref={featuresRef} className="p-6 md:p-8 pt-0 space-y-5">
          {/* First Feature - Asymmetric Large Card */}
          {firstFeature && (
            <div className="feature-item">
              <div className="glass-card xb-border rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-5 gap-0">
                  {firstFeature.image && (
                    <div className="md:col-span-2 relative overflow-hidden">
                      <img
                        src={firstFeature.image}
                        alt={firstFeature.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D0907]/40" />
                    </div>
                  )}
                  <div className={`${firstFeature.image ? 'md:col-span-3' : 'md:col-span-5'} p-6 md:p-8`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="feature-icon w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#CC6200] text-white flex items-center justify-center">
                        {firstFeature.icon}
                      </div>
                      <h4 className="font-black text-xl text-white">{firstFeature.title}</h4>
                    </div>
                    <p className="text-white/50 mb-4 leading-relaxed">{firstFeature.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7A00]/10 text-[#FF7A00] rounded-full text-sm font-semibold border border-[#FF7A00]/20">
                      <Zap className="h-4 w-4" />
                      {firstFeature.benefit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Features - Grid Layout */}
          <div className="grid md:grid-cols-2 gap-4">
            {restFeatures.map((feature, idx) => (
              <div key={idx} className="feature-item glass-card xb-border rounded-2xl p-5 transition-all duration-300 hover:border-[#FF7A00]/20">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="feature-icon w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#CC6200] text-white flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-white/50 text-sm mb-3 leading-relaxed">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF7A00]/10 text-[#FF7A00] rounded-full text-xs font-semibold border border-[#FF7A00]/20">
                      <Zap className="h-3 w-3" />
                      {feature.benefit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   Main Component
   ============================================================================ */

export function Features() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['online-ordering']));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div className="font-sans pt-20">
      {/* ===== HERO SECTION - Two Column Aivora Layout ===== */}
      <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
        {/* Background Blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-20 left-10 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl" delay={0}><div /></FloatingElement>
          <FloatingElement className="absolute top-40 right-10 w-96 h-96 bg-[#2A1F15]/50 rounded-full blur-3xl" delay={1}><div /></FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <ScrollReveal direction="up" delay={0.2}>
                <div className="badge mb-8">
                  <Zap className="h-4 w-4" />
                  <span>Everything You Need to Succeed</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05]">
                  <span className="gradient-text">Powerful Features For Every Restaurant</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <p className="text-xl md:text-2xl text-white/50 mb-10 max-w-xl leading-relaxed">
                  From AI-powered setup to delivery management, everything you need to run a successful restaurant business in <strong className="text-[#FF7A00]">one beautiful platform</strong>.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.7}>
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                  <LaunchCountdown compact />
                  <a href="#features" className="btn-secondary flex items-center gap-3">
                    Explore Features
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.9}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: '5 min', label: 'Setup Time' },
                    { value: '0%', label: 'Commission' },
                    { value: '24/7', label: 'Support' },
                    { value: '50+', label: 'Integrations' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-card xb-border p-4 text-center">
                      <div className="text-xl md:text-2xl font-black gradient-text">{stat.value}</div>
                      <div className="text-white/40 text-xs mt-1 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Floating Icons Grid */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="relative h-[500px] lg:h-[600px]">
                {/* Central Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-[#FF7A00]/10 rounded-full blur-3xl" />
                </div>

                {/* Floating Feature Icons */}
                <FloatingElement className="absolute top-8 left-[10%] glass-card xb-border p-5 rounded-2xl" delay={0}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF7A00] to-[#CC6200] rounded-xl flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Online Ordering</p>
                      <p className="text-white/40 text-xs">Smart cart & checkout</p>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement className="absolute top-4 right-[5%] glass-card xb-border p-5 rounded-2xl" delay={0.5}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#D4915C] to-[#CC6200] rounded-xl flex items-center justify-center">
                      <Utensils className="h-6 w-6 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Menu Management</p>
                      <p className="text-white/40 text-xs">AI-powered setup</p>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement className="absolute top-[35%] left-[5%] glass-card xb-border p-5 rounded-2xl" delay={1}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF7A00] to-[#D4915C] rounded-xl flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Payments</p>
                      <p className="text-white/40 text-xs">Stripe & mobile wallets</p>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement className="absolute top-[40%] right-[0%] glass-card xb-border p-5 rounded-2xl" delay={1.5}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#CC6200] to-[#FF7A00] rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Analytics</p>
                      <p className="text-white/40 text-xs">Data-driven insights</p>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement className="absolute bottom-[20%] left-[15%] glass-card xb-border p-5 rounded-2xl" delay={2}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#D4915C] to-[#FF7A00] rounded-xl flex items-center justify-center">
                      <Truck className="h-6 w-6 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Delivery</p>
                      <p className="text-white/40 text-xs">Zones & tracking</p>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement className="absolute bottom-[10%] right-[10%] glass-card xb-border p-5 rounded-2xl" delay={2.5}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF7A00] to-[#CC6200] rounded-xl flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Mobile Ready</p>
                      <p className="text-white/40 text-xs">PWA & responsive</p>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Hero Linear Separator */}
        <div className="hero-linear" />
      </section>

      {/* ===== FEATURE CATEGORIES SECTION ===== */}
      <section id="features" className="section-padding bg-[#0D0907]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="Comprehensive Platform"
              title="Complete Restaurant Platform"
              description="Explore our comprehensive suite of features designed to help you grow your restaurant business."
              icon={<Star className="h-4 w-4" />}
            />
          </ScrollReveal>

          <div className="space-y-5 mt-16">
            {featureCategories.map((category) => (
              <ScrollReveal key={category.id} direction="up" once>
                <FeatureAccordion
                  category={category}
                  isOpen={expandedCategories.has(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON SECTION - Aivora "Without vs With" Layout ===== */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="See the Difference"
              title="Why Helmies vs Traditional?"
              description="See how we compare to traditional delivery platforms and ordering systems."
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </ScrollReveal>

          {/* Side-by-Side Comparison Cards (Aivora Pattern) */}
          <div className="grid lg:grid-cols-2 gap-6 mt-16 relative">
            {/* Without Helmies */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="comparison-card relative h-full">
                <h3 className="text-xl md:text-2xl font-black text-white/60 mb-8">Without Helmies</h3>
                <ul className="space-y-4">
                  {comparisonData.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                        <X className="h-3.5 w-3.5 text-red-400" />
                      </div>
                      <div>
                        <span className="text-white/40 text-sm font-medium block">{item.feature}</span>
                        <span className="text-white/60 text-sm">{item.traditional}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* V/S Badge - positioned on the right edge */}
                <span className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC6200] items-center justify-center text-[#0D0907] font-black text-sm border-2 border-[#0D0907] shadow-lg shadow-[#FF7A00]/20">
                  v/s
                </span>
              </div>
            </ScrollReveal>

            {/* With Helmies */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="comparison-card relative h-full" style={{ borderColor: 'rgba(255,122,0,0.15)' }}>
                <h3 className="text-xl md:text-2xl font-black gradient-text mb-8">With Helmies</h3>
                <ul className="space-y-4">
                  {comparisonData.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3.5 w-3.5 text-[#FF7A00]" />
                      </div>
                      <div>
                        <span className="text-white/40 text-sm font-medium block">{item.feature}</span>
                        <span className="text-white text-sm font-semibold">{item.helmies}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Mobile V/S Badge */}
            <div className="lg:hidden flex justify-center -my-3 relative z-10">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center text-[#0D0907] font-black text-sm border-2 border-[#0D0907] shadow-lg shadow-[#FF7A00]/20">
                v/s
              </span>
            </div>
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-12 text-center">
              <AivoraButton to="/pricing">View Pricing Plans</AivoraButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== INTEGRATION SECTION ===== */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="Connect Everything"
              title="Seamless Integrations"
              description="Connect with the tools you already use. From payment processors to marketing platforms, we have got you covered."
              icon={<Zap className="h-4 w-4" />}
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-16">
            {integrations.map((integration, idx) => (
              <ScrollReveal key={integration.name} direction="scale" delay={idx * 0.05} once>
                <div className="glass-card xb-border p-6 text-center group hover:border-[#FF7A00]/20 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                    <span className="text-white font-black text-lg">{integration.name.charAt(0)}</span>
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{integration.name}</div>
                  <div className="text-white/40 text-xs font-medium">{integration.category}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Integration Categories Summary */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-12">
              {Object.entries(
                integrations.reduce((acc: Record<string, number>, integration) => {
                  acc[integration.category] = (acc[integration.category] || 0) + 1;
                  return acc;
                }, {})
              ).map(([category, count]) => (
                <div key={category} className="glass-card xb-border p-6 text-center">
                  <div className="text-3xl font-black gradient-text mb-1">{count}+</div>
                  <div className="text-white/50 text-sm font-medium">{category}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA SECTION - Aivora Left-Aligned Layout ===== */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <ScrollReveal direction="left">
              <SectionTitle
                subtitle="Ready to grow?"
                title="Transform Your Restaurant"
                description="Join hundreds of restaurants already using Helmies to grow their business. No credit card required. Setup in 5 minutes."
                align="left"
                icon={<Zap className="h-4 w-4" />}
              />
              <div className="mt-10">
                <LaunchCountdown showRestaurants />
              </div>
            </ScrollReveal>

            {/* Right Column - Stats / Highlights */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-5">
                <div className="glass-card xb-border p-6">
                  <div className="feature-icon w-12 h-12 mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-black gradient-text mb-1">5 min</div>
                  <p className="text-white/50 text-sm">Average setup time with AI-powered wizard</p>
                </div>
                <div className="glass-card xb-border p-6">
                  <div className="feature-icon w-12 h-12 mb-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-black gradient-text mb-1">0%</div>
                  <p className="text-white/50 text-sm">Commission on every order you receive</p>
                </div>
                <div className="glass-card xb-border p-6">
                  <div className="feature-icon w-12 h-12 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-black gradient-text mb-1">500+</div>
                  <p className="text-white/50 text-sm">Restaurants already growing with us</p>
                </div>
                <div className="glass-card xb-border p-6">
                  <div className="feature-icon w-12 h-12 mb-4">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-black gradient-text mb-1">24/7</div>
                  <p className="text-white/50 text-sm">Finnish support whenever you need help</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
