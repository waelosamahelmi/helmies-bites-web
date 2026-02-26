import { useState, useMemo } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Search,
  ChevronDown,
  HelpCircle,
  CreditCard,
  ShoppingBag,
  Settings,
  FileText,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { Link } from 'react-router-dom';

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
        answer: 'Our standard pricing includes all core features. Some premium add-ons like cash-on-delivery payment (+€30/mo) or AI Assistant (+€10/mo) are available for an additional fee, but these are completely optional.'
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

  // Flatten all questions for search
  const allQuestions = useMemo(() => {
    return Object.entries(faqData).flatMap(([categoryId, category]) =>
      category.questions.map(q => ({
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
    return allQuestions.filter(q =>
      q.question.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, allQuestions]);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center py-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                How can we <span className="text-orange-600">help?</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find answers to common questions about Helmies Bites
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory(null);
                  }}
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg shadow-sm"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4 bg-white min-h-[500px]">
        <div className="max-w-4xl mx-auto">
          {searchQuery && filteredQuestions ? (
            // Search Results
            <ScrollReveal>
              <div className="mb-8">
                <p className="text-gray-600">
                  Found {filteredQuestions.length} {filteredQuestions.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </p>
              </div>

              <Accordion.Root type="multiple" className="space-y-4">
                {filteredQuestions.map((item) => (
                  <AccordionItem key={item.id} value={item.id} question={item.question} answer={item.answer} />
                ))}
              </Accordion.Root>
            </ScrollReveal>
          ) : (
            // Categories
            <>
              {!searchQuery && (
                <ScrollReveal>
                  <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === null
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Categories
                    </button>
                    {Object.entries(faqData).map(([key, category]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          selectedCategory === key
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.icon}
                        {category.title}
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {(selectedCategory ? [faqData[selectedCategory as keyof typeof faqData]] : Object.values(faqData)).map((category, categoryIndex) => (
                <ScrollReveal key={category.title} direction="up" delay={categoryIndex * 0.05}>
                  <div className="mb-12">
                    {!selectedCategory && (
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                          {category.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                      </div>
                    )}

                    <Accordion.Root type="multiple" className="space-y-4">
                      {category.questions.map((item) => (
                        <AccordionItem
                          key={item.id}
                          value={item.id}
                          question={item.question}
                          answer={item.answer}
                        />
                      ))}
                    </Accordion.Root>
                  </div>
                </ScrollReveal>
              ))}
            </>
          )}

          {searchQuery && filteredQuestions?.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try different keywords or browse our categories below.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Clear Search
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
              <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Can't find the answer you're looking for? Our friendly team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:support@helmiesbites.fi"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Email Us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of restaurants already using Helmies Bites.
            </p>
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              Start Free Setup
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// Accordion Item Component
interface AccordionItemProps {
  value: string;
  question: string;
  answer: string;
}

function AccordionItem({ value, question, answer }: AccordionItemProps) {
  return (
    <Accordion.Item
      value={value}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden data-[state=open]:border-orange-300 data-[state=open]:shadow-sm transition-all"
    >
      <Accordion.Trigger className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors group">
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown className="h-5 w-5 text-gray-400 group-data-[state=open]:text-orange-600 transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0" />
      </Accordion.Trigger>
      <Accordion.Content className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed">
        <div className="border-t border-gray-100 pt-4">
          {answer}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
