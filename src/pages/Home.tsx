import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  ArrowRight,
  Zap,
  Palette,
  Smartphone,
  Globe,
  CheckCircle2,
  Play,
  Star,
  CreditCard,
  Truck,
  Clock,
  Utensils,
  Layout,
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

/* ============================================================================
   Types
   ============================================================================ */

interface Testimonial {
  id: number;
  name: string;
  role: string;
  restaurant: string;
  image: string;
  quote: string;
  rating: number;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

/* ============================================================================
   Data
   ============================================================================ */

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Kontinen',
    role: 'Owner',
    restaurant: 'Kotiharju Restaurant',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    quote: 'Helmies Bites transformed our business. We went from zero online presence to a fully functional ordering system in just 5 minutes. The AI menu import was incredibly accurate!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Erik Lindqvist',
    role: 'Manager',
    restaurant: 'Svea Kitchen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote: 'The multi-language support is a game-changer. Our Finnish and Swedish customers love browsing the menu in their native language. Orders have increased by 40%.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    role: 'Head Chef',
    restaurant: 'Bella Italia Helsinki',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    quote: 'Finally, a platform designed for restaurants. The themes are beautiful, mobile-optimized, and our customers love the ordering experience. Highly recommended!',
    rating: 5,
  },
];

const features: Feature[] = [
  {
    icon: <Utensils className="h-7 w-7" />,
    title: 'AI Menu Import',
    description: 'Upload your menu PDF and let AI extract, categorize, and translate everything automatically.',
  },
  {
    icon: <Palette className="h-7 w-7" />,
    title: 'Beautiful Themes',
    description: 'Choose from stunning presets or let AI create a unique look that matches your brand.',
  },
  {
    icon: <Smartphone className="h-7 w-7" />,
    title: 'Mobile Optimized',
    description: 'Your site looks perfect on every device. 70% of customers order from mobile.',
  },
  {
    icon: <Globe className="h-7 w-7" />,
    title: 'Multi-Language',
    description: 'Finnish, English, Swedish, and more - automatically translated by AI.',
  },
  {
    icon: <ShoppingBag className="h-7 w-7" />,
    title: 'Online Ordering',
    description: 'Accept orders online with integrated payment processing and real-time updates.',
  },
  {
    icon: <Layout className="h-7 w-7" />,
    title: 'Custom Domain',
    description: 'Use your own domain or get a free subdomain. Setup is instant.',
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: 'Sign Up & Wizard',
    description: 'Create your account in seconds. Our guided wizard walks you through every step.',
    icon: <Sparkles className="h-10 w-10" />,
  },
  {
    number: 2,
    title: 'AI Menu Setup',
    description: 'Upload your menu PDF. AI extracts items, prices, descriptions, and images automatically.',
    icon: <ChefHat className="h-10 w-10" />,
  },
  {
    number: 3,
    title: 'Choose Your Theme',
    description: 'Select from beautiful presets or let AI create a custom design based on your brand.',
    icon: <Palette className="h-10 w-10" />,
  },
  {
    number: 4,
    title: 'Launch & Start Receiving Orders',
    description: 'Go live instantly and start accepting orders. Manage everything from your dashboard.',
    icon: <Store className="h-10 w-10" />,
  },
];

const stats: Stat[] = [
  {
    value: '500+',
    label: 'Restaurants',
    icon: <Store className="h-6 w-6" />,
  },
  {
    value: '50K+',
    label: 'Orders Processed',
    icon: <ShoppingBag className="h-6 w-6" />,
  },
  {
    value: '98%',
    label: 'Satisfaction Rate',
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    value: '5 min',
    label: 'Average Setup',
    icon: <Clock className="h-6 w-6" />,
  },
];

/* ============================================================================
   Sub-Components
   ============================================================================ */

interface FloatingElementProps {
  className: string;
  delay: number;
  children: React.ReactNode;
}

function FloatingElement({ className, delay, children }: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = gsap.to(ref.current, {
      y: -20,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    });

    return () => {
      animation.kill();
      gsap.set(ref.current, { y: 0, rotation: 0 });
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface GlassStatCardProps {
  stat: Stat;
  index: number;
}

function GlassStatCard({ stat, index }: GlassStatCardProps) {
  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div className="glass-card glass-card-hover rounded-3xl p-8 text-center h-full">
        <div className="feature-icon w-12 h-12 mx-auto mb-4">
          {stat.icon}
        </div>
        <div className="stat-value text-4xl md:text-5xl mb-2">{stat.value}</div>
        <p className="text-gray-600 font-medium">{stat.label}</p>
      </div>
    </ScrollReveal>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-100 shadow-lg">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
          "{testimonial.quote}"
        </blockquote>

        {/* Author */}
        <div>
          <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
          <p className="text-gray-500">
            {testimonial.role}, <span className="text-orange-600">{testimonial.restaurant}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   Main Component
   ============================================================================ */

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animate testimonial carousel
  useEffect(() => {
    if (!testimonialTrackRef.current) return;

    gsap.to(testimonialTrackRef.current, {
      x: -activeTestimonial * 100,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [activeTestimonial]);

  return (
    <div>
      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section
        ref={heroRef}
        className="hero-gradient relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-amber-300/30 rounded-full blur-3xl" delay={0}>
            <div />
          </FloatingElement>
          <FloatingElement className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl" delay={1}>
            <div />
          </FloatingElement>
          <FloatingElement className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-yellow-200/40 rounded-full blur-3xl" delay={2}>
            <div />
          </FloatingElement>
        </div>

        {/* Floating food emojis */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement className="absolute top-32 left-[8%]" delay={0}>
            <span className="text-5xl md:text-6xl drop-shadow-lg">🍕</span>
          </FloatingElement>
          <FloatingElement className="absolute top-48 right-[12%]" delay={0.5}>
            <span className="text-5xl md:text-6xl drop-shadow-lg">🍔</span>
          </FloatingElement>
          <FloatingElement className="absolute bottom-40 left-[15%]" delay={1}>
            <span className="text-5xl md:text-6xl drop-shadow-lg">🍣</span>
          </FloatingElement>
          <FloatingElement className="absolute bottom-32 right-[8%]" delay={1.5}>
            <span className="text-5xl md:text-6xl drop-shadow-lg">🌮</span>
          </FloatingElement>
          <FloatingElement className="absolute top-1/2 left-[3%]" delay={2}>
            <span className="text-4xl md:text-5xl drop-shadow-lg">🥗</span>
          </FloatingElement>
          <FloatingElement className="absolute top-1/3 right-[5%]" delay={0.3}>
            <span className="text-4xl md:text-5xl drop-shadow-lg">🍜</span>
          </FloatingElement>
          <FloatingElement className="absolute bottom-1/3 left-[10%]" delay={0.8}>
            <span className="text-4xl md:text-5xl drop-shadow-lg">🍩</span>
          </FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <ScrollReveal direction="down" delay={0.2}>
                <div className="badge mb-8">
                  <Zap className="h-4 w-4" />
                  <span>Launch in 5 minutes with AI magic</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </ScrollReveal>

              {/* Headline */}
              <ScrollReveal direction="up" delay={0.3}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4">
                  <span className="gradient-text">Your Restaurant</span>
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
                  <span className="gradient-text">Website, Ready</span>
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
                  <span className="gradient-text">in Minutes</span>
                </h1>
              </ScrollReveal>

              {/* Subheadline */}
              <ScrollReveal direction="up" delay={0.5}>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join <strong className="text-orange-600">500+ restaurants</strong> using Helmies Bites.
                  AI-powered setup, beautiful themes, online ordering — all from <strong className="text-orange-600">€0 upfront</strong>.
                </p>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal direction="up" delay={0.7}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                  <Link
                    to="/get-started"
                    className="btn-primary flex items-center gap-3 text-lg"
                  >
                    Get Started Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="btn-secondary flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </div>
                    Watch Demo
                  </button>
                </div>
              </ScrollReveal>

              {/* Trust indicators */}
              <ScrollReveal direction="fade" delay={0.9}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>5-minute setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Hero Image */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="relative">
                {/* Main image with glass card effect */}
                <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200"
                    alt="Restaurant owner using tablet"
                    className="w-full h-[450px] lg:h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Floating stats card */}
                <FloatingElement className="absolute -bottom-6 -left-6 glass-card rounded-2xl shadow-xl p-5" delay={0}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-2xl gradient-text">+127%</p>
                      <p className="text-sm text-gray-600 font-medium">Online Orders</p>
                    </div>
                  </div>
                </FloatingElement>

                {/* Floating rating card */}
                <FloatingElement className="absolute -top-4 -right-4 glass-card rounded-2xl shadow-xl p-5" delay={1.5}>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-gray-900">4.9/5 Rating</p>
                  <p className="text-sm text-gray-500">500+ reviews</p>
                </FloatingElement>

                {/* Floating users card */}
                <FloatingElement className="absolute bottom-20 -right-8 glass-card rounded-2xl shadow-xl p-4" delay={2.5}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">M</div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">E</div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">S</div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">500+</p>
                      <p className="text-xs text-gray-500">Happy Owners</p>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================
          STATS SECTION
          ======================================== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-4">
                Trusted by restaurants across Finland
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                <span className="gradient-text">Join 500+ Restaurants</span>
              </h2>
              <p className="text-xl text-gray-600">Already growing with Helmies Bites</p>
            </ScrollReveal>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <GlassStatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          {/* Restaurant Logos */}
          <ScrollReveal direction="fade">
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <p className="text-center text-gray-500 font-medium mb-8">Trusted by amazing restaurants</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 transform bg-gradient-to-br ${
                      i === 0 ? 'from-orange-400 to-amber-500' :
                      i === 1 ? 'from-amber-500 to-yellow-500' :
                      i === 2 ? 'from-red-400 to-rose-500' :
                      i === 3 ? 'from-yellow-500 to-orange-500' :
                      i === 4 ? 'from-orange-600 to-amber-600' :
                      'from-rose-400 to-pink-500'
                    }`}
                  >
                    <Store className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================
          FEATURES SECTION
          ======================================== */}
      <section className="section-padding hero-gradient">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge mb-6">
                <Zap className="h-4 w-4" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                <span className="gradient-text">Everything You Need</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                All the tools to run your restaurant online, in one beautiful place
              </p>
            </div>
          </ScrollReveal>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 0.1}
                className="group"
              >
                <div className="glass-card glass-card-hover rounded-3xl p-8 h-full">
                  <div className="feature-icon mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal direction="fade" delay={0.8}>
            <div className="mt-16 text-center">
              <Link
                to="/features"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View All Features
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS SECTION
          ======================================== */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge mb-6">
                <Clock className="h-4 w-4" />
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                <span className="gradient-text">Launch in 4 Easy Steps</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From sign-up to live in less than 5 minutes
              </p>
            </div>
          </ScrollReveal>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 0.15}
                className="relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-orange-300 via-amber-300 to-transparent -z-10 rounded-full" />
                )}

                <div className="glass-card glass-card-hover rounded-3xl p-8 text-center h-full">
                  {/* Step number with gradient background */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-lg mx-auto gradient-bg">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-orange-600 shadow-md border-2 border-orange-200">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal direction="fade" delay={1}>
            <div className="mt-16 text-center">
              <Link
                to="/get-started"
                className="btn-primary inline-flex items-center gap-3"
              >
                Start Your Setup
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================
          TESTIMONIALS SECTION
          ======================================== */}
      <section className="section-padding hero-gradient">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="badge mb-6">
                <Star className="h-4 w-4 fill-current" />
                <span>Customer Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                <span className="gradient-text">Loved by Restaurant Owners</span>
              </h2>
              <p className="text-xl text-gray-600">
                See what our customers are saying about Helmies Bites
              </p>
            </div>
          </ScrollReveal>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                ref={testimonialTrackRef}
                className="flex transition-transform duration-500"
                style={{ width: `${testimonials.length * 100}%` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full px-4 flex-shrink-0"
                    style={{ width: `${100 / testimonials.length}%` }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'w-10 gradient-bg'
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          INTEGRATIONS SECTION
          ======================================== */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                <span className="gradient-text">Everything You Need, Built In</span>
              </h2>
              <p className="text-xl text-gray-600">
                Seamless integrations with payment and delivery platforms
              </p>
            </div>
          </ScrollReveal>

          {/* Integration cards */}
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
              {[
                { name: 'MobilePay', icon: <Smartphone className="h-8 w-8" />, gradient: 'from-pink-500 to-rose-500' },
                { name: 'Mastercard', icon: <CreditCard className="h-8 w-8" />, gradient: 'from-orange-500 to-amber-500' },
                { name: 'Visa', icon: <CreditCard className="h-8 w-8" />, gradient: 'from-blue-600 to-indigo-600' },
                { name: 'Stripe', icon: <CreditCard className="h-8 w-8" />, gradient: 'from-purple-600 to-violet-600' },
                { name: 'PayPal', icon: <CreditCard className="h-8 w-8" />, gradient: 'from-blue-500 to-cyan-500' },
              ].map((integration, index) => (
                <div
                  key={index}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-center justify-center"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 bg-gradient-to-r ${integration.gradient}`}>
                    {integration.icon}
                  </div>
                  <p className="font-semibold text-gray-900">{integration.name}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Feature highlights */}
          <ScrollReveal direction="fade">
            <div className="glass-dark rounded-3xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
                    <p className="text-gray-400">
                      PCI-compliant processing with industry-leading security
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Real-time Analytics</h3>
                    <p className="text-gray-400">
                      Track orders, revenue, and customer insights in real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Truck className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Delivery Integration</h3>
                    <p className="text-gray-400">
                      Built-in delivery management with zones, fees, and tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================
          FINAL CTA SECTION
          ======================================== */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="gradient-animated rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <FloatingElement className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" delay={0}>
                  <div />
                </FloatingElement>
                <FloatingElement className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" delay={1}>
                  <div />
                </FloatingElement>
                <FloatingElement className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" delay={2}>
                  <div />
                </FloatingElement>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join <strong className="text-white">500+ restaurants</strong> already growing with Helmies Bites.
                  Setup takes just <strong className="text-white">5 minutes</strong>.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <Link
                    to="/get-started"
                    className="px-10 py-5 bg-white text-orange-600 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
                  >
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 text-lg"
                  >
                    View Pricing
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-medium">No credit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-medium">5-minute setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-medium">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
