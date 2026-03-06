import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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

// Category metadata (icons and question IDs only - text comes from translations)
const categoryMeta = {
  gettingStarted: {
    icon: <HelpCircle className="h-5 w-5" />,
    questionIds: ['q1', 'q2', 'q3', 'q4', 'q5']
  },
  payments: {
    icon: <CreditCard className="h-5 w-5" />,
    questionIds: ['q1', 'q2', 'q3', 'q4', 'q5']
  },
  orders: {
    icon: <ShoppingBag className="h-5 w-5" />,
    questionIds: ['q1', 'q2', 'q3', 'q4', 'q5']
  },
  menu: {
    icon: <FileText className="h-5 w-5" />,
    questionIds: ['q1', 'q2', 'q3', 'q4', 'q5']
  },
  technical: {
    icon: <Settings className="h-5 w-5" />,
    questionIds: ['q1', 'q2', 'q3', 'q4', 'q5']
  },
  billing: {
    icon: <CreditCard className="h-5 w-5" />,
    questionIds: ['q1', 'q2', 'q3', 'q4', 'q5']
  }
};

type CategoryKey = keyof typeof categoryMeta;

export function FAQ() {
  const { t } = useTranslation('faq');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);

  // Build the full FAQ data from translations
  const faqData = useMemo(() => {
    const data: Record<CategoryKey, {
      title: string;
      icon: JSX.Element;
      questions: { id: string; question: string; answer: string }[];
    }> = {} as any;

    (Object.entries(categoryMeta) as [CategoryKey, typeof categoryMeta[CategoryKey]][]).forEach(([key, meta]) => {
      data[key] = {
        title: t(`categories.${key}.title`),
        icon: meta.icon,
        questions: meta.questionIds.map((qId) => ({
          id: `${key}-${qId}`,
          question: t(`categories.${key}.questions.${qId}.question`),
          answer: t(`categories.${key}.questions.${qId}.answer`)
        }))
      };
    });

    return data;
  }, [t]);

  const [activeIds, setActiveIds] = useState<Set<string>>(() => {
    // First item of each category active by default
    const defaults = new Set<string>();
    Object.entries(categoryMeta).forEach(([key]) => {
      defaults.add(`${key}-q1`);
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
  }, [faqData]);

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
                subtitle={t('hero.subtitle')}
                titleHighlight={t('hero.titleHighlight')}
                title={t('hero.title')}
                description={t('hero.description')}
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
                    placeholder={t('hero.searchPlaceholder')}
                    className="input-modern pl-14 pr-6 text-lg shadow-xl"
                  />
                </div>
              </div>

              {/* Quick stats */}
              {!searchQuery && (
                <div className="flex justify-center gap-8 mt-12 flex-wrap">
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">{totalQuestions}</div>
                    <div className="text-sm text-white/50 font-medium">{t('hero.stats.faqs')}</div>
                  </div>
                  <div className="w-px bg-[#2A1F15]/40"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">{t('hero.stats.categoriesCount')}</div>
                    <div className="text-sm text-white/50 font-medium">{t('hero.stats.categories')}</div>
                  </div>
                  <div className="w-px bg-[#2A1F15]/40"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">{t('hero.stats.supportValue')}</div>
                    <div className="text-sm text-white/50 font-medium">{t('hero.stats.support')}</div>
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
                    {t('search.found')} <span className="gradient-text font-bold">{filteredQuestions.length}</span>{' '}
                    {filteredQuestions.length === 1 ? t('search.result') : t('search.results')} {t('search.for')} "{searchQuery}"
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
                        {t('allCategories')}
                      </button>
                      {(Object.entries(faqData) as [CategoryKey, typeof faqData[CategoryKey]][]).map(([key, category]) => (
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
                  ? [[selectedCategory, faqData[selectedCategory]] as const]
                  : (Object.entries(faqData) as [CategoryKey, typeof faqData[CategoryKey]][]);

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
                            <span className="badge ml-auto">{category.questions.length} {t('faqsSuffix')}</span>
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
                <h3 className="text-2xl font-bold text-white mb-3">{t('noResults.title')}</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  {t('noResults.description_prefix')}{searchQuery}{t('noResults.description_suffix')}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {t('noResults.clearSearch')}
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
                {t('stillHaveQuestions.title')}
              </h2>

              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                {t('stillHaveQuestions.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AivoraButton to="/contact">{t('stillHaveQuestions.contactSupport')}</AivoraButton>
                <a
                  href="mailto:support@helmiesbites.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/10"
                >
                  {t('stillHaveQuestions.emailUs')}
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex justify-center gap-8 mt-12 flex-wrap">
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{t('stillHaveQuestions.trustIndicators.fastResponse')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{t('stillHaveQuestions.trustIndicators.expertHelp')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{t('stillHaveQuestions.trustIndicators.freeSupport')}</span>
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
              subtitle={t('bottomCta.subtitle')}
              titleHighlight={t('bottomCta.titleHighlight')}
              title={t('bottomCta.title')}
              description={t('bottomCta.description')}
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
