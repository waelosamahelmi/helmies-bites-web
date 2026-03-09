import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import CountUp from 'react-countup';
import Marquee from 'react-fast-marquee';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  ArrowRight,
  Zap,
  Palette,
  Smartphone,
  Star,
  CreditCard,
  Truck,
  Clock,
  BarChart3,
  Shield,
  Sparkles,
  ChefHat,
  ShoppingBag,
  Store,
  Trophy,
  TrendingUp,
  Upload,
  Check,
  FileText,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';

/* ============================================================================
   Data (icons only - text comes from translations)
   ============================================================================ */

const stepIcons = [
  <Sparkles className="h-8 w-8" />,
  <ChefHat className="h-8 w-8" />,
  <Palette className="h-8 w-8" />,
  <Store className="h-8 w-8" />,
];

const stepKeys = ['signUp', 'aiMenu', 'theme', 'goLive'];
const stepNumbers = ['01', '02', '03', '04'];

const statIcons = [
  <Store className="h-6 w-6" />,
  <ShoppingBag className="h-6 w-6" />,
  <Trophy className="h-6 w-6" />,
  <Clock className="h-6 w-6" />,
];

const statValues = ['500+', '50K+', '98%', '5 min'];
const statKeys = ['restaurants', 'ordersProcessed', 'satisfactionRate', 'averageSetup'];

const themePresets = [
  { key: 'midnight', gradient: 'from-[#1a1a2e] to-[#16213e]' },
  { key: 'rustic', gradient: 'from-[#2A1F15] to-[#3d2b1a]' },
  { key: 'fresh', gradient: 'from-[#0D4F3C] to-[#1a7a5e]' },
  { key: 'royal', gradient: 'from-[#4a1942] to-[#6a2468]' },
];

const paymentMethods = ['Stripe', 'MobilePay', 'Apple Pay', 'Google Pay'];

const menuMockItems = [
  { emoji: '🍕', price: '€12.90' },
  { emoji: '🍝', price: '€14.50' },
  { emoji: '🥗', price: '€10.90' },
];

/* ============================================================================
   Sub-Components
   ============================================================================ */

function FloatingElement({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const animation = gsap.to(ref.current, { y: -20, rotation: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay });
    return () => { animation.kill(); gsap.set(ref.current, { y: 0, rotation: 0 }); };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

function useLottie(path: string) {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    fetch(path).then(r => r.json()).then(setData).catch(() => {});
  }, [path]);
  return data;
}

/* ============================================================================
   Main Component
   ============================================================================ */

export function Home() {
  const { t } = useTranslation('home');
  const [selectedTheme, setSelectedTheme] = useState(1);
  const cookingLottie = useLottie('/Cooking.json');
  const checklistLottie = useLottie('/Task Checklist.json');
  const creditCardLottie = useLottie('/Credit Card.json');
  const launchLottie = useLottie('/Sign Out.json');

  return (
    <div>
      {/* ===== HERO - Lottie + Two Column ===== */}
      <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-20 left-10 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl" delay={0}><div /></FloatingElement>
          <FloatingElement className="absolute top-40 right-10 w-96 h-96 bg-[#2A1F15]/50 rounded-full blur-3xl" delay={1}><div /></FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <ScrollReveal direction="up" delay={0.2}>
                <div className="badge mb-8">
                  <Zap className="h-4 w-4" />
                  <span>{t('hero.badge')}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05]">
                  <span className="gradient-text">{t('hero.title')}</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-xl leading-relaxed">
                  {t('hero.description')}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.7}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-started" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#CC6200] text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF7A00]/20">
                    {t('nav.getStartedFree', { ns: 'common' })} <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link to="/features" className="btn-secondary inline-flex items-center gap-3">
                    {t('hero.cta')} <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Lottie Cooking Animation */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="relative flex items-center justify-center">
                <div className="w-full max-w-lg">
                  {cookingLottie && (
                    <Lottie animationData={cookingLottie} loop autoPlay className="w-full" />
                  )}
                </div>

                <FloatingElement className="absolute -bottom-6 -left-6 glass-card xb-border p-5" delay={0}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#FF7A00] to-[#CC6200] rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-7 w-7 text-[#0D0907]" />
                    </div>
                    <div>
                      <p className="font-black text-2xl gradient-text">+127%</p>
                      <p className="text-sm text-white/50 font-medium">{t('floating.onlineOrders')}</p>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement className="absolute -top-4 -right-4 glass-card xb-border p-5" delay={1.5}>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-[#FF7A00] text-[#FF7A00]" />)}
                  </div>
                  <p className="text-lg font-bold text-white">{t('floating.rating')}</p>
                  <p className="text-sm text-white/40">{t('floating.reviews')}</p>
                </FloatingElement>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="hero-linear" />
      </section>

      {/* ===== STATS ===== */}
      <section className="section-padding bg-[#0D0907] section-glow">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle subtitle={t('stats.subtitle')} title={t('stats.title')} description={t('stats.description')} icon={<Store className="h-4 w-4" />} />
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {statValues.map((value, index) => {
              const numericMatch = value.match(/([\d.]+)/);
              const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
              const prefix = value.match(/^[^\d]*/)?.[0] || '';
              const suffix = value.match(/[^\d]*$/)?.[0] || '';
              return (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <div className="glass-card xb-border p-8 text-center">
                    <div className="feature-icon w-12 h-12 mx-auto mb-4">{statIcons[index]}</div>
                    <div className="stat-value text-4xl md:text-5xl mb-2">
                      <CountUp end={numericValue} duration={2.5} separator="," prefix={prefix} suffix={suffix} enableScrollSpy scrollSpyOnce />
                    </div>
                    <p className="text-white/50 font-medium">{t(`stats.${statKeys[index]}`)}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== AI MENU IMPORT - Browser Mockup ===== */}
      <section className="section-padding bg-[#2A1F15]/20 section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal direction="left">
                <div className="badge mb-6">
                  <FileText className="h-4 w-4" />
                  <span>{t('aiMenu.badge')}</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                  <span className="gradient-text">{t('aiMenu.title')}</span><br />
                  <span className="text-white">{t('aiMenu.titleLine2')}</span>
                </h2>
                <p className="text-lg text-white/50 mb-8 max-w-lg leading-relaxed">
                  {t('aiMenu.description')}
                </p>
                <div className="space-y-4">
                  {['upload', 'extract', 'categorize'].map((key) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 flex items-center justify-center">
                        <Check className="h-5 w-5 text-[#FF7A00]" />
                      </div>
                      <span className="text-white/70 font-semibold">{t(`aiMenu.steps.${key}`)}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div className="glass-card xb-border rounded-2xl overflow-hidden shadow-2xl">
                {/* Browser Bar */}
                <div className="flex items-center gap-2.5 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 ml-3 px-4 py-1.5 rounded-lg bg-white/5 text-sm text-white/40 font-medium">
                    helmies.fi/admin/menu
                  </div>
                </div>
                {/* Browser Body */}
                <div className="p-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-[#FF7A00]/25 rounded-2xl p-8 text-center mb-6 hover:border-[#FF7A00]/50 transition-colors">
                    <Upload className="h-10 w-10 text-[#FF7A00]/60 mx-auto mb-3" />
                    <p className="text-white/50 font-bold text-sm">{t('aiMenu.dropHere')}</p>
                    <p className="text-white/30 text-xs mt-1">{t('aiMenu.fileTypes')}</p>
                  </div>
                  {/* Menu Items */}
                  <div className="space-y-3">
                    {menuMockItems.map((item, i) => (
                      <ScrollReveal key={i} direction="left" delay={0.2 + i * 0.15}>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2A1F15] to-[#1A1410] flex items-center justify-center text-2xl flex-shrink-0">
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white">{t(`aiMenu.items.${i}.name`)}</div>
                            <div className="text-xs text-white/35 truncate">{t(`aiMenu.items.${i}.desc`)}</div>
                            <div className="text-sm font-extrabold text-[#FF7A00]">{item.price}</div>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 border border-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] text-sm font-bold flex-shrink-0">+</div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
              {/* Checklist Lottie */}
              {checklistLottie && (
                <div className="absolute -bottom-8 -right-8 w-28 h-28 hidden lg:block">
                  <Lottie animationData={checklistLottie} loop autoPlay />
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== BEAUTIFUL THEMES - Theme Cards ===== */}
      <section className="section-padding bg-[#0D0907] section-glow">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle={t('themes.subtitle')}
              title={t('themes.title')}
              description={t('themes.description')}
              icon={<Palette className="h-4 w-4" />}
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {themePresets.map((theme, index) => (
              <ScrollReveal key={theme.key} direction="up" delay={index * 0.1}>
                <button
                  onClick={() => setSelectedTheme(index)}
                  className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${
                    selectedTheme === index
                      ? 'border-[#FF7A00] shadow-lg shadow-[#FF7A00]/25 scale-105'
                      : 'border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="text-lg font-extrabold text-white">{t(`themes.presets.${theme.key}.name`)}</h3>
                    <p className="text-sm text-white/50">{t(`themes.presets.${theme.key}.label`)}</p>
                  </div>
                  {selectedTheme === index && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-[#FF7A00] rounded-full flex items-center justify-center animate-in zoom-in">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ORDERING & PAYMENTS - Phone Mockup ===== */}
      <section className="section-padding bg-[#2A1F15]/20 section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Phone Mockup */}
            <ScrollReveal direction="left">
              <div className="relative flex justify-center">
                <div className="w-[280px] sm:w-[320px] rounded-[2.5rem] border-[3px] border-white/10 bg-[#1A1410] overflow-hidden shadow-2xl shadow-black/50">
                  {/* Notch */}
                  <div className="w-32 h-7 bg-[#0D0907] rounded-b-2xl mx-auto" />
                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div className="text-center mb-3">
                      <div className="text-lg font-black text-white">{t('ordering.mockup.restaurantName')}</div>
                      <div className="text-xs text-white/40">{t('ordering.mockup.domain')}</div>
                    </div>
                    {menuMockItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2A1F15] to-[#1A1410] flex items-center justify-center text-xl flex-shrink-0">{item.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white">{t(`aiMenu.items.${i}.name`)}</div>
                          <div className="text-xs font-extrabold text-[#FF7A00]">{item.price}</div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-[#FF7A00]/15 border border-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] text-xs font-bold flex-shrink-0">+</div>
                      </div>
                    ))}
                    {/* Cart Bar */}
                    <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#CC6200] flex justify-between items-center">
                      <span className="text-sm font-bold text-white">🛒 3 {t('ordering.mockup.items')}</span>
                      <span className="text-sm font-black text-white">€38.30 →</span>
                    </div>
                  </div>
                </div>

                {/* Credit Card Lottie */}
                {creditCardLottie && (
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 hidden lg:block">
                    <Lottie animationData={creditCardLottie} loop autoPlay />
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Right - Features */}
            <div>
              <ScrollReveal direction="right">
                <div className="badge mb-6">
                  <CreditCard className="h-4 w-4" />
                  <span>{t('ordering.badge')}</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                  <span className="gradient-text">{t('ordering.title')}</span><br />
                  <span className="text-white">{t('ordering.titleLine2')}</span>
                </h2>
              </ScrollReveal>

              {/* Payment Icons */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="flex flex-wrap gap-3 mb-8">
                  {paymentMethods.map((name, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-[#FF7A00]" />
                      </div>
                      <span className="text-sm font-bold text-white">{name}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Feature Cards */}
              <div className="space-y-3">
                {['mobileOptimized', 'realTimeNotifications', 'analyticsReports'].map((key, i) => (
                  <ScrollReveal key={key} direction="right" delay={0.3 + i * 0.1}>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="feature-icon w-12 h-12 flex-shrink-0">
                        {i === 0 ? <Smartphone className="h-6 w-6" /> : i === 1 ? <Check className="h-6 w-6" /> : <BarChart3 className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">{t(`ordering.features.${key}.title`)}</div>
                        <div className="text-sm text-white/40">{t(`ordering.features.${key}.desc`)}</div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS - Steps ===== */}
      <section className="section-padding bg-[#0D0907] section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <SectionTitle subtitle={t('howItWorks.subtitle')} title={t('howItWorks.title')} align="left" icon={<Clock className="h-4 w-4" />} className="mb-8" />

                <div className="space-y-4">
                  {stepKeys.map((key, index) => (
                    <div key={key} className={`process-step xb-border ${index === 0 ? 'active' : ''}`}>
                      <div className="feature-icon w-12 h-12 flex-shrink-0">{stepIcons[index]}</div>
                      <span className="step-num">{stepNumbers[index]}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{t(`howItWorks.steps.${key}.title`)}</h3>
                        <p className="text-sm text-white/40 mt-1">{t(`howItWorks.steps.${key}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal direction="right">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="glass-card xb-border rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" alt="Dashboard" className="w-full h-52 object-cover" />
                    </div>
                    <div className="glass-card xb-border rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" alt="Menu" className="w-full h-64 object-cover" />
                    </div>
                  </div>
                  <div className="space-y-6 mt-12">
                    <div className="glass-card xb-border rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" alt="Theme" className="w-full h-64 object-cover" />
                    </div>
                    <div className="glass-card xb-border rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600" alt="Go Live" className="w-full h-52 object-cover" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTEGRATIONS ===== */}
      <section className="section-padding bg-[#2A1F15]/20 section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <SectionTitle subtitle={t('integrations.subtitle')} title={t('integrations.title')} description={t('integrations.description')} align="left" icon={<Zap className="h-4 w-4" />} className="mb-10" />
              <div className="space-y-6">
                {[
                  { icon: <Shield className="h-6 w-6" />, title: t('integrations.securePayments.title'), text: t('integrations.securePayments.text') },
                  { icon: <BarChart3 className="h-6 w-6" />, title: t('integrations.realTimeAnalytics.title'), text: t('integrations.realTimeAnalytics.text') },
                  { icon: <Truck className="h-6 w-6" />, title: t('integrations.deliveryIntegration.title'), text: t('integrations.deliveryIntegration.text') },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="feature-icon w-14 h-14 flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-xl mb-1 text-white">{item.title}</h3>
                      <p className="text-white/40">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-4">
                {[
                  [{ name: 'MobilePay', icon: <Smartphone className="h-6 w-6" /> }, { name: 'Mastercard', icon: <CreditCard className="h-6 w-6" /> }, { name: 'Visa', icon: <CreditCard className="h-6 w-6" /> }],
                  [{ name: 'Stripe', icon: <CreditCard className="h-6 w-6" /> }, { name: 'PayPal', icon: <CreditCard className="h-6 w-6" /> }, { name: 'Apple Pay', icon: <Smartphone className="h-6 w-6" /> }],
                ].map((row, rowIndex) => (
                  <Marquee key={rowIndex} gradient={false} speed={25 + rowIndex * 10} direction={rowIndex % 2 === 0 ? 'left' : 'right'} pauseOnHover className="py-2">
                    {row.map((item, i) => (
                      <div key={i} className="mx-4 glass-card xb-border p-4 flex items-center gap-3 min-w-[160px]">
                        <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">{item.icon}</div>
                        <span className="text-white font-semibold">{item.name}</span>
                      </div>
                    ))}
                  </Marquee>
                ))}

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="comparison-card text-center p-6">
                    <p className="text-white/40 text-sm font-bold uppercase mb-2">{t('integrations.withoutHelmies')}</p>
                    <p className="text-white/60 text-sm">{t('integrations.withoutDesc')}</p>
                  </div>
                  <div className="comparison-card text-center p-6" style={{ borderColor: 'rgba(255,122,0,0.2)' }}>
                    <p className="text-[#FF7A00] text-sm font-bold uppercase mb-2">{t('integrations.withHelmies')}</p>
                    <p className="text-white/60 text-sm">{t('integrations.withDesc')}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== GO LIVE CTA - Lottie + Pricing ===== */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2A1F15 0%, #0D0907 50%, #2A1F15 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-0 left-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" delay={0}><div /></FloatingElement>
          <FloatingElement className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4915C]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" delay={1}><div /></FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Launch Lottie */}
          <ScrollReveal direction="up">
            <div className="w-48 h-48 mx-auto mb-6">
              {launchLottie && (
                <Lottie animationData={launchLottie} loop autoPlay />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-5xl sm:text-6xl font-black mb-4">
              <span className="gradient-text">{t('goLive.title')}</span>
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
              {t('goLive.subtitle')}
            </p>
          </ScrollReveal>

          {/* 4 Steps Summary */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {stepKeys.map((key, i) => (
                <div key={key} className="glass-card xb-border px-6 py-4 text-center min-w-[160px]">
                  <div className="text-3xl font-black text-[#FF7A00] mb-1">{stepNumbers[i]}</div>
                  <div className="text-sm font-bold text-white">{t(`howItWorks.steps.${key}.title`)}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Pricing Preview */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="inline-flex flex-wrap justify-center gap-0 glass-card xb-border rounded-2xl overflow-hidden mb-10">
              {['starter', 'pro', 'annual'].map((plan, i) => (
                <div key={plan} className={`px-8 py-6 text-center ${i < 2 ? 'border-r border-white/[0.08]' : ''}`}>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">{t(`goLive.pricing.${plan}.label`)}</div>
                  <div className="text-3xl font-black text-[#FF7A00]">{t(`goLive.pricing.${plan}.price`)}</div>
                  <div className="text-xs text-white/35 mt-1">{t(`goLive.pricing.${plan}.detail`)}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/get-started" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#CC6200] text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF7A00]/20">
                {t('nav.getStartedNow', { ns: 'common' })} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary inline-flex items-center gap-2">{t('cta.viewPricing')}</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
