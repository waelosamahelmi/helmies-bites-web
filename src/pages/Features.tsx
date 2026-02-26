import { Link } from 'react-router-dom';
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
  ArrowRight,
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

gsap.registerPlugin(ScrollTrigger);

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

const featureCategories: FeatureCategory[] = [
  {
    id: 'online-ordering',
    title: 'Online Ordering',
    description: 'Streamline your ordering process with a seamless customer experience',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-orange-500 to-amber-500',
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
    color: 'from-red-500 to-orange-500',
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
    color: 'from-green-500 to-emerald-500',
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
    color: 'from-blue-500 to-indigo-500',
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
    color: 'from-purple-500 to-violet-500',
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
    color: 'from-pink-500 to-rose-500',
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
    color: 'from-violet-500 to-purple-500',
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
  { name: 'Stripe', category: 'Payments', icon: '', color: 'from-indigo-500 to-purple-600' },
  { name: 'MobilePay', category: 'Payments', icon: '', color: 'from-pink-500 to-rose-500' },
  { name: 'PayPal', category: 'Payments', icon: '', color: 'from-blue-500 to-blue-600' },
  { name: 'Mailchimp', category: 'Marketing', icon: '', color: 'from-yellow-400 to-orange-500' },
  { name: 'Klaviyo', category: 'Marketing', icon: '', color: 'from-green-500 to-teal-500' },
  { name: 'QuickBooks', category: 'Accounting', icon: '', color: 'from-emerald-500 to-green-600' },
  { name: 'Xero', category: 'Accounting', icon: '', color: 'from-blue-600 to-indigo-600' },
  { name: 'Meta', category: 'Social', icon: '', color: 'from-blue-600 to-blue-700' },
  { name: 'Google', category: 'Analytics', icon: '', color: 'from-red-500 to-yellow-500' },
  { name: 'Facebook', category: 'Social', icon: '', color: 'from-blue-500 to-blue-600' },
];

// Icon Components
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

  return (
    <div className="glass-card glass-card-hover rounded-3xl overflow-hidden transition-all duration-500">
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-white/50 transition-colors duration-300"
      >
        <div className="flex items-center gap-5">
          <div className={`feature-icon p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white`}>
            {category.icon}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h3>
            <p className="text-gray-600 text-sm md:text-base mt-1">{category.description}</p>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-orange-100 rotate-180' : 'bg-gray-100'}`}>
          {isOpen ? <ChevronUp className="h-5 w-5 text-orange-600" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </div>
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div ref={featuresRef} className="p-6 md:p-8 pt-0 space-y-4">
          {category.features.map((feature, idx) => (
            <div key={idx} className="feature-item glass-card rounded-2xl p-5 border border-white/60 transition-all duration-300 hover:border-orange-200 hover:shadow-lg">
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="feature-icon w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{feature.title}</h4>
                    {feature.image && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 text-sm md:text-base leading-relaxed">{feature.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                    <Zap className="h-4 w-4" />
                    {feature.benefit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['online-ordering']));

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const tl = gsap.timeline();
      tl.from(heroRef.current.querySelector('.hero-title'),
        { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }
      )
      .from(heroRef.current.querySelector('.hero-subtitle'),
        { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )
      .from(heroRef.current.querySelector('.hero-cta'),
        { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3'
      )
      .from(heroRef.current.querySelectorAll('.stat-card'),
        { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3'
      );
    }

    // Scroll animations for sections
    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Comparison table animation
    const comparisonRows = document.querySelectorAll('.comparison-row');
    comparisonRows.forEach((row, idx) => {
      gsap.fromTo(row,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: idx * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
        }
      );
    });

    // Integration cards animation
    const integrationCards = document.querySelectorAll('.integration-card');
    gsap.fromTo(integrationCards,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.integrations-grid',
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
    <div className="font-sans">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-gradient relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating absolute top-20 left-[10%] opacity-10">
            <ShoppingCart className="h-16 w-16 text-orange-500" />
          </div>
          <div className="floating-delayed absolute top-40 right-[15%] opacity-10">
            <CreditCard className="h-20 w-20 text-orange-600" />
          </div>
          <div className="floating absolute bottom-20 left-[20%] opacity-10">
            <Truck className="h-18 w-18 text-amber-500" />
          </div>
          <div className="floating-delayed absolute top-32 left-[60%] opacity-10">
            <BarChart3 className="h-14 w-14 text-purple-500" />
          </div>
          <div className="floating absolute bottom-32 right-[25%] opacity-10">
            <Smartphone className="h-16 w-16 text-pink-500" />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="badge mb-8">
            <Zap className="h-4 w-4" />
            Everything You Need to Succeed
          </div>

          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="gradient-text">For Every Restaurant</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            From AI-powered setup to delivery management, everything you need to run a successful restaurant business in one beautiful platform.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/get-started"
              className="btn-primary inline-flex items-center justify-center gap-3"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#features"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Explore Features
            </a>
          </div>

          {/* Quick Stats with Glass Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="stat-card glass-card glass-card-hover rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">5 min</div>
              <div className="text-gray-600 text-sm mt-2 font-medium">Setup Time</div>
            </div>
            <div className="stat-card glass-card glass-card-hover rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">0%</div>
              <div className="text-gray-600 text-sm mt-2 font-medium">Commission</div>
            </div>
            <div className="stat-card glass-card glass-card-hover rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">24/7</div>
              <div className="text-gray-600 text-sm mt-2 font-medium">Support</div>
            </div>
            <div className="stat-card glass-card glass-card-hover rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">50+</div>
              <div className="text-gray-600 text-sm mt-2 font-medium">Integrations</div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-white" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <div className="badge mb-6">
              <Star className="h-4 w-4" />
              Comprehensive Platform
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              <span className="gradient-text">Complete Restaurant Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive suite of features designed to help you grow your restaurant business.
            </p>
          </div>

          <div className="space-y-5">
            {featureCategories.map((category) => (
              <FeatureAccordion
                key={category.id}
                category={category}
                isOpen={expandedCategories.has(category.id)}
                onToggle={() => toggleCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding hero-gradient">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <div className="badge mb-6">
              <BarChart3 className="h-4 w-4" />
              See the Difference
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              <span className="gradient-text">Why Helmies vs Traditional?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              See how we compare to traditional delivery platforms and ordering systems.
            </p>
          </div>

          <div className="scroll-reveal">
            <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
              {/* Comparison Header */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200/60">
                <div className="font-bold text-gray-700 text-lg">Feature</div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold shadow-lg">
                    <Star className="h-5 w-5 fill-white" />
                    Helmies
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl font-semibold">
                    Traditional
                  </div>
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="space-y-3">
                {comparisonData.map((item, idx) => (
                  <div key={idx} className="comparison-row grid grid-cols-3 gap-4 py-4 rounded-2xl bg-gradient-to-r from-white/80 to-transparent hover:from-orange-50/80 transition-all duration-300 items-center">
                    <div className="font-semibold text-gray-900 pl-4">{item.feature}</div>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl font-semibold border border-green-200">
                        <Check className="h-4 w-4" />
                        {item.helmies}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl font-medium border border-red-200">
                        <X className="h-4 w-4" />
                        {item.traditional}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="scroll-reveal mt-12 text-center">
            <Link
              to="/pricing"
              className="btn-primary inline-flex items-center gap-3"
            >
              View Pricing Plans
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Integration Showcase Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <div className="badge mb-6">
              <Zap className="h-4 w-4" />
              Connect Everything
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              <span className="gradient-text">Seamless Integrations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with the tools you already use. From payment processors to marketing platforms, we've got you covered.
            </p>
          </div>

          <div className="integrations-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-16">
            {integrations.map((integration) => (
              <div key={integration.name} className="integration-card group">
                <div className={`card-gradient bg-gradient-to-br ${integration.color} p-6 rounded-3xl text-white text-center shadow-lg transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                  <div className="font-black text-xl mb-1">{integration.name}</div>
                  <div className="text-xs opacity-80 font-medium">{integration.category}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Integration Categories Summary */}
          <div className="scroll-reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {Object.entries(
              integrations.reduce((acc: Record<string, number>, integration) => {
                acc[integration.category] = (acc[integration.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([category, count]) => (
              <div key={category} className="glass-card glass-card-hover rounded-3xl p-6 text-center">
                <div className="text-3xl font-black gradient-text mb-1">{count}+</div>
                <div className="text-gray-600 text-sm font-medium">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <div className="scroll-reveal max-w-4xl mx-auto text-center">
          <div className="card-gradient rounded-3xl p-10 md:p-16 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of restaurants already using Helmies to grow their business.
            </p>
            <Link
              to="/get-started"
              className="inline-flex px-10 py-5 bg-white text-orange-600 rounded-2xl font-black hover:bg-orange-50 transition-all items-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-300"
            >
              Get Started for Free
              <ArrowRight className="h-6 w-6" />
            </Link>
            <p className="mt-8 text-white/80 text-sm font-medium">
              No credit card required. Setup in 5 minutes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
