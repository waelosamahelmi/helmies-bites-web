import { useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';
import { AivoraButton } from '../components/AivoraButton';
import { LaunchCountdown } from '../components/LaunchCountdown';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-7 w-7 text-white" />,
      title: 'Email Us',
      value: 'support@helmiesbites.fi',
      link: 'mailto:support@helmiesbites.fi',
      description: 'We respond within 24 hours',
      color: 'from-[#FF7A00] to-[#CC6200]'
    },
    {
      icon: <Phone className="h-7 w-7 text-white" />,
      title: 'Call Us',
      value: '+358 20 123 4567',
      link: 'tel:+358201234567',
      description: 'Mon-Fri, 9am-6pm EET',
      color: 'from-[#CC6200] to-[#D4915C]'
    },
    {
      icon: <MapPin className="h-7 w-7 text-white" />,
      title: 'Visit Us',
      value: 'Helsinki, Finland',
      link: null,
      description: 'Punavuori district',
      color: 'from-[#D4915C] to-[#FF7A00]'
    }
  ];

  const supportHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EET' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EET' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl floating" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4915C]/20 rounded-full blur-3xl floating-delayed" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center py-16">
              <SectionTitle
                subtitle="We're here to help"
                title="touch"
                titleHighlight="Get in"
                description="Have questions about Helmies Bites? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
                icon={<MessageCircle className="h-4 w-4" />}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <div className="glass-card xb-border rounded-3xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="feature-icon">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white">Send us a message</h2>
                  </div>
                  <p className="text-white/60 mb-8 ml-1">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  {isSubmitted && (
                    <div className="mb-8 p-5 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FF7A00] rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-green-400">Message sent successfully!</p>
                        <p className="text-green-400/70 text-sm">Thank you! We've received your message and will respond soon.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-white/80 mb-3">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="input-modern"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-white/80 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="input-modern"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-white/80 mb-3">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="input-modern appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales Question</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-white/80 mb-3">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="input-modern resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Cards */}
              <ScrollReveal direction="right">
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <span className="gradient-text">Contact</span> Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="glass-card xb-border glass-card-hover rounded-2xl p-5 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`feature-icon bg-gradient-to-br ${info.color}`}>
                          {info.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white mb-1">{info.title}</h4>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-[#FF7A00] hover:text-[#FF7A00] font-semibold block truncate transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-white/80 font-semibold truncate">{info.value}</p>
                          )}
                          <p className="text-sm text-white/50 mt-1">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Support Hours */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="glass-card xb-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="feature-icon bg-gradient-to-br from-[#FF7A00] to-[#CC6200]">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Support Hours</h4>
                  </div>
                  <div className="space-y-4">
                    {supportHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                      >
                        <span className="text-white/60 font-medium">{schedule.day}</span>
                        <span className="text-white font-bold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <p className="text-sm text-white/50 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#FF7A00]" />
                      Average response time: within 24 hours
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Live Chat CTA */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #CC6200 50%, #D4915C 100%)' }}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <MessageCircle className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="text-xl font-bold">Need instant help?</h4>
                    </div>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      Chat with our support team for quick answers to your questions.
                    </p>
                    <button
                      onClick={() => alert('Live chat coming soon!')}
                      className="w-full px-6 py-4 bg-[#0D0907] text-white rounded-2xl font-bold hover:bg-[#1A1410] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Start Live Chat
                    </button>
                    <p className="text-white/70 text-sm mt-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Available Mon-Fri, 9am-6pm EET
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-[#2A1F15]/20" style={{ background: 'linear-gradient(to bottom, #0D0907, #2A1F15 50%, #0D0907)' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="glass-card xb-border rounded-3xl overflow-hidden shadow-xl">
              <div className="aspect-video w-full bg-gradient-to-br from-[#2A1F15] via-[#1A1410] to-[#0D0907] flex items-center justify-center relative">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[#FF7A00]/20 rounded-lg" />
                  <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-[#D4915C]/20 rounded-full" />
                  <div className="absolute top-1/2 right-20 w-12 h-12 border-4 border-[#FF7A00]/20 rounded-lg rotate-45" />
                </div>

                <div className="text-center relative z-10 p-8">
                  <div className="feature-icon mx-auto mb-6 bg-gradient-to-br from-[#FF7A00] to-[#D4915C] w-20 h-20">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">Helsinki, Finland</h3>
                  <p className="text-white/60 text-lg mb-6">Punavuori District</p>
                  <a
                    href="https://maps.google.com/?q=Punavuori,Helsinki,Finland"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#0D0907] text-[#FF7A00] rounded-2xl font-bold hover:bg-[#1A1410] transition-all transform hover:scale-105 shadow-lg border border-white/10"
                  >
                    <MapPin className="h-5 w-5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="glass-card xb-border rounded-3xl p-10 md:p-16">
              <div className="feature-icon mx-auto mb-6 bg-gradient-to-br from-[#CC6200] to-[#D4915C] w-20 h-20">
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
              <SectionTitle
                subtitle="Common Questions"
                title="quick answers?"
                titleHighlight="Looking for"
                description="Check out our FAQ page for common questions about Helmies Bites."
                icon={<HelpCircle className="h-4 w-4" />}
              />
              <div className="mt-8">
                <AivoraButton to="/faq">Visit FAQ</AivoraButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2A1F15 0%, #0D0907 50%, #2A1F15 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 floating" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4915C]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 floating-delayed" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="glass-card xb-border rounded-3xl p-10 md:p-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center">
                <Send className="h-12 w-12 text-white" />
              </div>
              <SectionTitle
                subtitle="Let's grow together"
                title="started?"
                titleHighlight="Ready to get"
                description="Join hundreds of restaurants already using Helmies Bites to streamline their operations."
                icon={<Sparkles className="h-4 w-4" />}
              />
              <div className="mt-10">
                <LaunchCountdown compact />
              </div>
              <p className="text-sm text-white/50 mt-6">
                No credit card required. Setup takes less than 5 minutes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
