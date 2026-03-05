import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import CountUp from 'react-countup';
import Marquee from 'react-fast-marquee';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, Trans } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  ArrowRight,
  Zap,
  Palette,
  Smartphone,
  Globe,
  Star,
  CreditCard,
  Truck,
  Clock,
  Utensils,
  BarChart3,
  Shield,
  Sparkles,
  ChefHat,
  ShoppingBag,
  Store,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';
import { AivoraButton } from '../components/AivoraButton';
import { LaunchCountdown } from '../components/LaunchCountdown';

/* ============================================================================
   Data (icons only - text comes from translations)
   ============================================================================ */

const featureIcons = [
  <Utensils className="h-7 w-7" />,
  <Palette className="h-7 w-7" />,
  <Smartphone className="h-7 w-7" />,
  <Globe className="h-7 w-7" />,
  <ShoppingBag className="h-7 w-7" />,
];

const featureKeys = ['aiMenuImport', 'beautifulThemes', 'mobileOptimized', 'multiLanguage', 'onlineOrdering'];

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

/* ============================================================================
   Main Component
   ============================================================================ */

export function Home() {
  const { t } = useTranslation('home');
  return (
    <div>
      {/* ===== HERO - Two Column ===== */}
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
                <LaunchCountdown showRestaurants className="mb-10" />
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.9}>
                <Link to="/features" className="btn-secondary inline-flex items-center gap-3">
                  {t('hero.cta')} <ArrowRight className="h-5 w-5" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="relative">
                <div className="glass-card xb-border rounded-3xl overflow-hidden shadow-2xl shadow-[#FF7A00]/5">
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" alt="Restaurant" className="w-full h-[450px] lg:h-[550px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907]/60 via-transparent to-transparent" />
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

                <FloatingElement className="absolute bottom-20 -right-8 glass-card xb-border p-4" delay={2.5}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#CC6200] border-2 border-[#0D0907] flex items-center justify-center text-[#0D0907] text-xs font-bold">M</div>
                      <div className="w-10 h-10 rounded-full bg-[#D4915C] border-2 border-[#0D0907] flex items-center justify-center text-white text-xs font-bold">E</div>
                      <div className="w-10 h-10 rounded-full bg-[#2A1F15] border-2 border-[#0D0907] flex items-center justify-center text-white text-xs font-bold">S</div>
                    </div>
                    <div>
                      <p className="font-bold text-white">500+</p>
                      <p className="text-xs text-white/40">{t('floating.happyOwners')}</p>
                    </div>
                  </div>
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

      {/* ===== FEATURES - Asymmetric Grid ===== */}
      <section className="section-padding bg-[#2A1F15]/20 section-glow">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle subtitle={t('features.subtitle')} title={t('features.title')} description={t('features.description')} icon={<Zap className="h-4 w-4" />} />
          </ScrollReveal>

          <div className="mt-16">
            <div className="grid lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-8">
                <ScrollReveal direction="up">
                  <div className="glass-card xb-border p-8 h-full">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" alt="AI Menu Import" className="w-full h-56 object-cover rounded-2xl" />
                      </div>
                      <div className="flex-1">
                        <div className="feature-icon mb-4">{featureIcons[0]}</div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t(`features.${featureKeys[0]}.title`)}</h3>
                        <p className="text-white/50 leading-relaxed">{t(`features.${featureKeys[0]}.description`)}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <div className="glass-card xb-border p-8 h-full">
                    <div className="feature-icon mb-4">{featureIcons[1]}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(`features.${featureKeys[1]}.title`)}</h3>
                    <p className="text-white/50 leading-relaxed">{t(`features.${featureKeys[1]}.description`)}</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureKeys.slice(2).map((key, index) => (
                <ScrollReveal key={key} direction="up" delay={(index + 2) * 0.1}>
                  <div className="glass-card xb-border p-8 h-full group">
                    <div className="feature-icon mb-6 group-hover:scale-110 transition-transform duration-300">{featureIcons[index + 2]}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(`features.${key}.title`)}</h3>
                    <p className="text-white/50 leading-relaxed">{t(`features.${key}.description`)}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal direction="fade" delay={0.6}>
            <div className="mt-12 text-center">
              <AivoraButton to="/features">{t('features.viewAll')}</AivoraButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BRAND MARQUEE - hidden until launch */}

      {/* ===== HOW IT WORKS - Two Column ===== */}
      <section className="section-padding bg-[#0D0907] section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <SectionTitle subtitle={t('howItWorks.subtitle')} title={t('howItWorks.title')} align="left" icon={<Clock className="h-4 w-4" />} className="mb-8" />
                <div className="mb-8">
                  <LaunchCountdown compact />
                </div>
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
                      <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=600" alt="Dashboard" className="w-full h-52 object-cover" />
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

      {/* TESTIMONIALS - hidden until launch */}

      {/* ===== INTEGRATIONS - Two Column ===== */}
      <section className="section-padding bg-[#0D0907] section-glow">
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

      {/* ===== FINAL CTA - Two Column ===== */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2A1F15 0%, #0D0907 50%, #2A1F15 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-0 left-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" delay={0}><div /></FloatingElement>
          <FloatingElement className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4915C]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" delay={1}><div /></FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <SectionTitle subtitle={t('cta.subtitle')} title={t('cta.title')} align="left" icon={<Sparkles className="h-4 w-4" />} className="mb-8" />
              <p className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
                <Trans i18nKey="cta.description" ns="home">
                  Be among the <strong className="text-[#FF7A00]">first restaurants</strong> to launch with Helmies Bites. Setup takes just <strong className="text-[#FF7A00]">5 minutes</strong>.
                </Trans>
              </p>
              <LaunchCountdown showRestaurants className="mb-8" />
              <Link to="/pricing" className="btn-secondary inline-flex items-center gap-2">{t('cta.viewPricing')}</Link>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="hidden lg:block">
                <div className="glass-card xb-border p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{t('cta.launchingSoon')}</h3>
                  <p className="text-white/50">{t('cta.launchingDate')}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
