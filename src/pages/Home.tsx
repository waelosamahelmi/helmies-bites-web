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
    icon: <Utensils className="h-6 w-6" />,
    title: 'AI Menu Import',
    description: 'Upload your menu PDF and let AI extract, categorize, and translate everything automatically.',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Beautiful Themes',
    description: 'Choose from stunning presets or let AI create a unique look that matches your brand.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Mobile Optimized',
    description: 'Your site looks perfect on every device. 70% of customers order from mobile.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Multi-Language',
    description: 'Finnish, English, Swedish, and more - automatically translated by AI.',
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: 'Online Ordering',
    description: 'Accept orders online with integrated payment processing and real-time updates.',
  },
  {
    icon: <Layout className="h-6 w-6" />,
    title: 'Custom Domain',
    description: 'Use your own domain or get a free subdomain. Setup is instant.',
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: 'Sign Up & Wizard',
    description: 'Create your account in seconds. Our guided wizard walks you through every step.',
    icon: <Sparkles className="h-8 w-8" />,
  },
  {
    number: 2,
    title: 'AI Menu Setup',
    description: 'Upload your menu PDF. AI extracts items, prices, descriptions, and images automatically.',
    icon: <ChefHat className="h-8 w-8" />,
  },
  {
    number: 3,
    title: 'Choose Your Theme',
    description: 'Select from beautiful presets or let AI create a custom design based on your brand.',
    icon: <Palette className="h-8 w-8" />,
  },
  {
    number: 4,
    title: 'Launch & Start Receiving Orders',
    description: 'Go live instantly and start accepting orders. Manage everything from your dashboard.',
    icon: <Store className="h-8 w-8" />,
  },
];

const integrations = [
  { name: 'MobilePay', icon: <Smartphone className="h-8 w-8" />, color: 'bg-pink-500' },
  { name: 'Mastercard', icon: <CreditCard className="h-8 w-8" />, color: 'bg-orange-500' },
  { name: 'Visa', icon: <CreditCard className="h-8 w-8" />, color: 'bg-blue-600' },
  { name: 'Stripe', icon: <CreditCard className="h-8 w-8" />, color: 'bg-purple-600' },
  { name: 'PayPal', icon: <CreditCard className="h-8 w-8" />, color: 'bg-blue-500' },
];

const restaurantLogos = [
  { name: 'Restaurant 1', color: 'bg-orange-400' },
  { name: 'Restaurant 2', color: 'bg-amber-500' },
  { name: 'Restaurant 3', color: 'bg-red-400' },
  { name: 'Restaurant 4', color: 'bg-yellow-500' },
  { name: 'Restaurant 5', color: 'bg-orange-600' },
  { name: 'Restaurant 6', color: 'bg-rose-400' },
];

/* ============================================================================
   Sub-Components
   ============================================================================ */

interface FloatingFoodProps {
  className: string;
  delay: number;
  emoji: string;
}

function FloatingFood({ className, delay, emoji }: FloatingFoodProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = gsap.to(ref.current, {
      y: -20,
      rotation: 10,
      duration: 2,
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
    <div
      ref={ref}
      className={`absolute text-4xl md:text-6xl ${className}`}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
    >
      {emoji}
    </div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = text.split(' ');
    containerRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block opacity-0 translate-y-8 word-reveal">${word}</span>`
      )
      .join(' ');

    gsap.to('.word-reveal', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      delay,
    });
  }, [text, delay]);

  return <div ref={containerRef} className={className} />;
}

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !counterRef.current) return;

    const obj = { val: 0 };

    const scrollTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.floor(obj.val).toLocaleString() + suffix;
            }
          },
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [value, suffix]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl md:text-5xl font-bold text-orange-600">
        <span ref={counterRef}>0</span>
      </span>
      <p className="text-gray-600 mt-2">{label}</p>
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 -z-10" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000" />
        </div>

        {/* Floating food illustrations */}
        <FloatingFood className="top-32 left-[10%]" delay={0} emoji="🍕" />
        <FloatingFood className="top-48 right-[15%]" delay={0.5} emoji="🍔" />
        <FloatingFood className="bottom-40 left-[20%]" delay={1} emoji="🍣" />
        <FloatingFood className="bottom-32 right-[10%]" delay={1.5} emoji="🌮" />
        <FloatingFood className="top-1/2 left-[5%]" delay={2} emoji="🥗" />
        <FloatingFood className="top-1/3 right-[8%]" delay={0.3} emoji="🍜" />
        <FloatingFood className="bottom-1/3 left-[15%]" delay={0.8} emoji="🍩" />
        <FloatingFood className="top-1/4 left-1/2" delay={1.2} emoji="🥘" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <ScrollReveal direction="down" delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full mb-8 border border-orange-200 shadow-sm">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Launch in 5 minutes with AI magic
                  </span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </ScrollReveal>

              {/* Headline */}
              <div className="mb-6">
                <TextReveal
                  text="Your Restaurant Website,"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900"
                  delay={0.5}
                />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2">
                  <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Ready in Minutes
                  </span>
                </h1>
              </div>

              {/* Subheadline */}
              <ScrollReveal direction="up" delay={0.8}>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                  Join 500+ restaurants using Helmies Bites. AI-powered setup, beautiful themes,
                  online ordering, and complete management — all from €0 upfront.
                </p>
              </ScrollReveal>

              {/* CTA Buttons */}
              <ScrollReveal direction="up" delay={1}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                  <Link
                    to="/get-started"
                    className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-amber-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Get Started Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-gray-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-orange-600 ml-0.5" />
                    </div>
                    Watch Demo
                  </button>
                </div>
              </ScrollReveal>

              {/* Trust indicators */}
              <ScrollReveal direction="fade" delay={1.2}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
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
            <ScrollReveal direction="right" delay={0.5}>
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200"
                    alt="Restaurant owner using tablet"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">+127%</p>
                      <p className="text-sm text-gray-500">Online Orders</p>
                    </div>
                  </div>
                </div>

                {/* Floating rating card */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">4.9/5 Rating</p>
                  <p className="text-xs text-gray-500">500+ reviews</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF SECTION
          ======================================== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-4">
                Trusted by restaurants across Finland
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Join 500+ Restaurants Already Growing
              </h2>
            </div>
          </ScrollReveal>

          {/* Restaurant logos */}
          <ScrollReveal stagger={0.1}>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16 opacity-60">
              {restaurantLogos.map((logo) => (
                <div
                  key={logo.name}
                  className={`w-16 h-16 md:w-20 md:h-20 ${logo.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-lg transition-shadow hover:scale-110 transform transition-transform`}
                >
                  <Store className="h-8 w-8" />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-gray-100">
            <StatCounter value={500} suffix="+" label="Restaurants" />
            <StatCounter value={50000} suffix="+" label="Orders Processed" />
            <StatCounter value={98} suffix="%" label="Satisfaction Rate" />
            <StatCounter value={5} suffix=" min" label="Average Setup Time" />
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURES PREVIEW SECTION
          ======================================== */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-6">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Powerful Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                All the tools to run your restaurant online, in one place
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
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Additional features highlight */}
          <ScrollReveal direction="fade" delay={0.8}>
            <div className="mt-16 text-center">
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors border border-orange-200"
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Launch in 4 Easy Steps
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
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-transparent -z-10" />
                )}

                <div className="text-center">
                  {/* Step number */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow mx-auto">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-orange-600 shadow-md border-2 border-orange-200">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal direction="fade" delay={1}>
            <div className="mt-16 text-center">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
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
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-amber-50 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full mb-6">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">Customer Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Loved by Restaurant Owners
              </h2>
              <p className="text-xl text-gray-600">
                See what our customers are saying about Helmies Bites
              </p>
            </div>
          </ScrollReveal>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
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
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Photo */}
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-100 flex-shrink-0"
                        />

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                          {/* Stars */}
                          <div className="flex justify-center md:justify-start gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>

                          {/* Quote */}
                          <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                            "{testimonial.quote}"
                          </blockquote>

                          {/* Author */}
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                            <p className="text-gray-500">
                              {testimonial.role}, {testimonial.restaurant}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-orange-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need, Built In
              </h2>
              <p className="text-xl text-gray-600">
                Seamless integrations with payment and delivery platforms
              </p>
            </div>
          </ScrollReveal>

          {/* Integration cards */}
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors group hover:-translate-y-2 transform transition-all duration-300"
                >
                  <div
                    className={`${integration.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {integration.icon}
                  </div>
                  <p className="font-medium text-gray-900">{integration.name}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Feature highlights */}
          <ScrollReveal direction="fade">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
                    <p className="text-gray-400 text-sm">
                      PCI-compliant processing with industry-leading security
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Real-time Analytics</h3>
                    <p className="text-gray-400 text-sm">
                      Track orders, revenue, and customer insights in real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Delivery Integration</h3>
                    <p className="text-gray-400 text-sm">
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-600 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
                  Join 500+ restaurants already growing with Helmies Bites.
                  Setup takes just 5 minutes.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/get-started"
                    className="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold hover:bg-white/10 transition-colors border border-white/30"
                  >
                    View Pricing
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-orange-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>No credit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>5-minute setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Cancel anytime</span>
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
