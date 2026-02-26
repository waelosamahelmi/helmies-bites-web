import { useState, useMemo } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';
import { AivoraButton } from '../components/AivoraButton';
import { LaunchCountdown } from '../components/LaunchCountdown';
import {
  Search,
  ChevronDown,
  HelpCircle,
  CreditCard,
  ShoppingBag,
  Settings,
  FileText,
  MessageCircle
} from 'lucide-react';

// FAQ data organized by category
const faqData = {
  'getting-started': {
    title: 'Getting Started',
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        id: 'gs-1',
        question: 'How long does it take to set up my restaurant website?',
        answer: 'Most restaurants can complete the initial setup in just 5 minutes. Our AI-powered wizard guides you through entering your restaurant information, uploading your menu, and selecting a theme. After setup, your website is immediately live and ready to accept orders.'
      },
      {
        id: 'gs-2',
        question: 'Do I need any technical skills?',
        answer: 'Not at all! Helmies Bites is designed specifically for restaurant owners who may not have technical expertise. Our intuitive interface and AI assistance make it easy to create a professional website without any coding or design knowledge.'
      },
      {
        id: 'gs-3',
        question: 'What information do I need to provide during setup?',
        answer: "You'll need your restaurant's basic information (name, address, contact details), your menu (can be uploaded as a PDF - our AI will extract the items), and your preferred color scheme. That's it! We handle the technical details."
      },
      {
        id: 'gs-4',
        question: 'Can I use my own domain name?',
        answer: 'Yes! You can connect your own custom domain (like www.yourrestaurant.fi) to your Helmies Bites website. We provide instructions for updating your DNS settings, or you can use a free subdomain like yourrestaurant.helmiesbites.fi.'
      },
      {
        id: 'gs-5',
        question: 'Is there a free trial?',
        answer: 'Absolutely! There is no upfront cost to get started. You only pay our 5% service fee when you receive online orders through the platform. This means you can try our service completely risk-free.'
      }
    ]
  },
  'payments': {
    title: 'Payments',
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        id: 'pay-1',
        question: 'What payment methods do you accept?',
        answer: "We integrate with major Finnish payment providers including Stripe, Paytrail, and MobilePay. Your customers can pay using credit/debit cards, mobile payments, and online banking services. We're constantly adding new payment options based on customer feedback."
      },
      {
        id: 'pay-2',
        question: 'How do I receive payments from orders?',
        answer: 'Payments from customer orders are transferred directly to your bank account. The processing time depends on your payment provider, but most transfers are completed within 1-3 business days. Our 5% service fee is automatically deducted from each order.'
      },
      {
        id: 'pay-3',
        question: 'What is your service fee?',
        answer: 'We charge a simple 5% service fee on each online order. This covers payment processing, hosting, maintenance, and customer support. There are no monthly fees, setup fees, or hidden charges. You only pay when you get orders.'
      },
      {
        id: 'pay-4',
        question: 'Do I need a separate payment processor account?',
        answer: 'We can set you up with our integrated payment processing, or if you already have a Stripe or Paytrail account, you can connect it to your Helmies Bites account. Both options are secure and compliant with Finnish payment regulations.'
      },
      {
        id: 'pay-5',
        question: 'Is PCI compliance handled?',
        answer: 'Yes, we handle all PCI compliance requirements through our certified payment partners. You don\'t need to worry about security certifications or data protection standards - we take care of everything so you can focus on your restaurant.'
      }
    ]
  },
  'orders': {
    title: 'Orders',
    icon: <ShoppingBag className="h-5 w-5" />,
    questions: [
      {
        id: 'ord-1',
        question: 'How do I receive online orders?',
        answer: 'Orders are received in real-time through your restaurant dashboard. You can also enable notifications via SMS, email, or our mobile app. When a new order comes in, you\'ll be alerted immediately with all the order details.'
      },
      {
        id: 'ord-2',
        question: 'Can I customize my order availability?',
        answer: 'Yes! You can set your opening hours, accept orders during specific times, or temporarily disable ordering when you\'re closed or fully booked. You have full control over when you accept orders.'
      },
      {
        id: 'ord-3',
        question: 'What happens if I need to cancel an order?',
        answer: 'If you need to cancel an order, you can do so from your dashboard. The customer will be notified immediately and their payment will be automatically refunded. We recommend contacting the customer directly if possible to explain the situation.'
      },
      {
        id: 'ord-4',
        question: 'Can I offer pickup and delivery?',
        answer: 'Yes, you can choose to offer pickup, delivery, or both. For delivery, you can set delivery zones, fees, and minimum order amounts. Our system can also integrate with third-party delivery services if you prefer.'
      },
      {
        id: 'ord-5',
        question: 'How are special requests handled?',
        answer: 'Customers can add special requests to their orders, which are displayed prominently in your order dashboard. You can review these requests and contact the customer if you need clarification before preparing their order.'
      }
    ]
  },
  'menu': {
    title: 'Menu',
    icon: <FileText className="h-5 w-5" />,
    questions: [
      {
        id: 'menu-1',
        question: 'How do I add my menu?',
        answer: 'The easiest way is to upload your existing menu as a PDF. Our AI will extract all items, descriptions, and prices automatically. You can then review and edit the extracted information. Alternatively, you can manually add items through our menu editor.'
      },
      {
        id: 'menu-2',
        question: 'Can I create multiple menus?',
        answer: 'Yes! You can create different menus for breakfast, lunch, dinner, or special events. You can schedule when each menu is active, making it easy to offer different items throughout the day or week.'
      },
      {
        id: 'menu-3',
        question: 'How do I update menu items or prices?',
        answer: 'Menu updates are simple through your dashboard. Just navigate to your menu, click on the item you want to edit, make your changes, and save. Changes are reflected immediately on your live website.'
      },
      {
        id: 'menu-4',
        question: 'Can I add photos to menu items?',
        answer: 'Absolutely! Adding photos makes your menu more appealing and can increase orders. You can upload multiple photos for each item, and our system will automatically optimize them for web display and fast loading.'
      },
      {
        id: 'menu-5',
        question: 'How does menu translation work?',
        answer: 'Our AI can automatically translate your menu into Finnish, Swedish, English, and other languages. You can review and edit translations to ensure accuracy. Multi-language menus help you serve a broader customer base.'
      }
    ]
  },
  'technical': {
    title: 'Technical',
    icon: <Settings className="h-5 w-5" />,
    questions: [
      {
        id: 'tech-1',
        question: 'Is my website mobile-friendly?',
        answer: 'Yes, every Helmies Bites website is fully responsive and optimized for mobile devices. Your site will look great and function perfectly on smartphones, tablets, and desktop computers.'
      },
      {
        id: 'tech-2',
        question: 'How reliable is the platform?',
        answer: 'We maintain 99.9% uptime with our cloud-based infrastructure. Your website is hosted on secure servers with automatic backups. We handle all maintenance and updates so you don\'t have to worry about technical issues.'
      },
      {
        id: 'tech-3',
        question: 'Can I integrate with social media?',
        answer: 'Yes, you can easily link your website to your social media profiles and add social sharing buttons. We also provide tools to help you promote your menu and special offers on platforms like Instagram and Facebook.'
      },
      {
        id: 'tech-4',
        question: 'What analytics are available?',
        answer: 'Your dashboard includes analytics showing order history, popular items, revenue trends, and customer information. These insights help you make data-driven decisions about your menu and marketing.'
      },
      {
        id: 'tech-5',
        question: 'Is my data secure?',
        answer: 'Security is our top priority. We use industry-standard encryption, comply with GDPR regulations, and regularly undergo security audits. Your data and your customers\' data are always protected.'
      }
    ]
  },
  'billing': {
    title: 'Billing',
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        id: 'bill-1',
        question: 'Are there any monthly fees?',
        answer: 'No, there are no monthly fees or subscriptions. You only pay our 5% service fee when you receive online orders. This means if you don\'t get any orders in a month, you pay nothing for that month.'
      },
      {
        id: 'bill-2',
        question: 'How do I view my billing history?',
        answer: 'Your billing history is available in your dashboard. You can view detailed reports of all fees collected, download invoices, and track your revenue over time.'
      },
      {
        id: 'bill-3',
        question: 'Are there additional fees for certain features?',
        answer: 'Our standard pricing includes all core features. Some premium add-ons like cash-on-delivery payment (+30/mo) or AI Assistant (+10/mo) are available for an additional fee, but these are completely optional.'
      },
      {
        id: 'bill-4',
        question: 'Can I get a refund for a service fee?',
        answer: 'Service fees are generally non-refundable as they cover payment processing and platform usage. However, if you believe a fee was charged in error, please contact our support team and we\'ll review your case.'
      },
      {
        id: 'bill-5',
        question: 'Do you offer enterprise plans?',
        answer: 'For large restaurant groups or chains, we can discuss custom pricing arrangements. Contact our sales team to discuss your specific needs and we\'ll create a plan that works for you.'
      }
    ]
  }
};

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeIds, setActiveIds] = useState<Set<string>>(() => {
    // First item of each category active by default
    const defaults = new Set<string>();
    Object.values(faqData).forEach((category) => {
      if (category.questions.length > 0) {
        defaults.add(category.questions[0].id);
      }
    });
    return defaults;
  });

  const toggleItem = (id: string) => {
    setActiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Flatten all questions for search
  const allQuestions = useMemo(() => {
    return Object.entries(faqData).flatMap(([categoryId, category]) =>
      category.questions.map((q) => ({
        ...q,
        categoryName: category.title,
        categoryId
      }))
    );
  }, []);

  // Filter questions based on search
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    return allQuestions.filter(
      (q) =>
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, allQuestions]);

  const totalQuestions = allQuestions.length;

  // Build a numbered list for rendering
  const renderAccordion = (
    questions: { id: string; question: string; answer: string }[],
    startIndex: number
  ) => (
    <div className="faq-accordion">
      {questions.map((item, idx) => {
        const num = startIndex + idx + 1;
        const isActive = activeIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`faq-item${isActive ? ' active' : ''}`}
          >
            <button
              className="faq-trigger"
              onClick={() => toggleItem(item.id)}
            >
              <span className="faq-number">
                {num < 10 ? `0${num}` : num}
              </span>
              <span className="faq-question">_ {item.question}</span>
              <span className="faq-arrow">
                <span></span>
              </span>
            </button>
            <div className="faq-body">
              <div className="faq-body-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0907] pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-[#0D0907] relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4915C]/20 rounded-full blur-3xl floating-delayed"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center py-16">
              <SectionTitle
                subtitle="Help Center"
                titleHighlight="How can we"
                title="help you?"
                description="Find answers to common questions about Helmies Bites. Can't find what you're looking for? We're here to help!"
                align="center"
              />

              {/* Search Bar with glass styling */}
              <div className="relative max-w-2xl mx-auto mt-12">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00] to-[#CC6200] rounded-3xl blur-lg opacity-30"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedCategory(null);
                    }}
                    placeholder="Search for answers..."
                    className="input-modern pl-14 pr-6 text-lg shadow-xl"
                  />
                </div>
              </div>

              {/* Quick stats */}
              {!searchQuery && (
                <div className="flex justify-center gap-8 mt-12 flex-wrap">
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">{totalQuestions}</div>
                    <div className="text-sm text-white/50 font-medium">FAQs</div>
                  </div>
                  <div className="w-px bg-[#2A1F15]/40"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">6</div>
                    <div className="text-sm text-white/50 font-medium">Categories</div>
                  </div>
                  <div className="w-px bg-[#2A1F15]/40"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">24/7</div>
                    <div className="text-sm text-white/50 font-medium">Support</div>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-[#2A1F15]/20 min-h-[500px]">
        <div className="max-w-4xl mx-auto">
          {searchQuery && filteredQuestions ? (
            // Search Results
            <ScrollReveal>
              <div className="mb-10">
                <div className="glass-card xb-border rounded-2xl p-6 text-center">
                  <p className="text-white/80 font-medium text-lg">
                    Found <span className="gradient-text font-bold">{filteredQuestions.length}</span>{' '}
                    {filteredQuestions.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                  </p>
                </div>
              </div>

              <div className="glass-card xb-border rounded-2xl p-6 md:p-10">
                {renderAccordion(filteredQuestions, 0)}
              </div>
            </ScrollReveal>
          ) : (
            // Categories
            <>
              {!searchQuery && (
                <ScrollReveal>
                  <div className="glass-card xb-border rounded-3xl p-4 mb-12">
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                          selectedCategory === null
                            ? 'gradient-bg text-white shadow-lg'
                            : 'text-white/60 hover:bg-[#FF7A00]/5'
                        }`}
                      >
                        <HelpCircle className="h-4 w-4" />
                        All Categories
                      </button>
                      {Object.entries(faqData).map(([key, category]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedCategory(key)}
                          className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                            selectedCategory === key
                              ? 'gradient-bg text-white shadow-lg'
                              : 'text-white/60 hover:bg-[#FF7A00]/5'
                          }`}
                        >
                          {category.icon}
                          {category.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {(() => {
                let globalIndex = 0;
                const categoriesToRender = selectedCategory
                  ? [[selectedCategory, faqData[selectedCategory as keyof typeof faqData]] as const]
                  : (Object.entries(faqData) as [string, typeof faqData[keyof typeof faqData]][]);

                return categoriesToRender.map(([key, category], categoryIndex) => {
                  const startIdx = globalIndex;
                  globalIndex += category.questions.length;

                  return (
                    <ScrollReveal key={key} direction="up" delay={categoryIndex * 0.05}>
                      <div className="mb-12">
                        {!selectedCategory && (
                          <div className="flex items-center gap-4 mb-8">
                            <div className="feature-icon">
                              {category.icon}
                            </div>
                            <h2 className="text-3xl font-black text-white">{category.title}</h2>
                            <span className="badge ml-auto">{category.questions.length} FAQs</span>
                          </div>
                        )}

                        <div className="glass-card xb-border rounded-2xl p-6 md:p-10">
                          {renderAccordion(category.questions, startIdx)}
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                });
              })()}
            </>
          )}

          {searchQuery && filteredQuestions?.length === 0 && (
            <ScrollReveal>
              <div className="glass-card xb-border rounded-3xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF7A00]/20 to-[#CC6200]/10 flex items-center justify-center">
                  <HelpCircle className="h-10 w-10 text-[#FF7A00]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No results found</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  We couldn't find any answers matching "{searchQuery}". Try different keywords or browse our categories below.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Clear Search
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-[#0D0907] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#FF7A00]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#FF7A00]/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="glass-card xb-border rounded-3xl p-8 md:p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center shadow-xl">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Still have questions?
              </h2>

              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                Can't find the answer you're looking for? Our friendly support team is here to help you get started.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AivoraButton to="/contact">Contact Support</AivoraButton>
                <a
                  href="mailto:support@helmiesbites.fi"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/10"
                >
                  Email Us
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex justify-center gap-8 mt-12 flex-wrap">
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Fast Response</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Expert Help</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Free Support</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionTitle
              subtitle="Get Started Today"
              titleHighlight="Transform"
              title="your restaurant"
              description="Join hundreds of restaurants already using Helmies Bites. Setup takes just 5 minutes, and you only pay when you get orders."
              align="center"
            />
            <div className="mt-10">
              <LaunchCountdown compact />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
