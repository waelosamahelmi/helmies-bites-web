import { useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: <Phone className="h-7 w-7 text-white" />,
      title: 'Call Us',
      value: '+358 20 123 4567',
      link: 'tel:+358201234567',
      description: 'Mon-Fri, 9am-6pm EET',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <MapPin className="h-7 w-7 text-white" />,
      title: 'Visit Us',
      value: 'Helsinki, Finland',
      link: null,
      description: 'Punavuori district',
      color: 'from-blue-500 to-cyan-500'
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
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 mb-6">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700">We're here to help</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
                Get in <span className="gradient-text">touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Have questions about Helmies Bites? We'd love to hear from you.
                <br />
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl floating" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl floating-delayed" />
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <div className="glass-card rounded-3xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="feature-icon">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">Send us a message</h2>
                  </div>
                  <p className="text-gray-600 mb-8 ml-1">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  {isSubmitted && (
                    <div className="mb-8 p-5 bg-green-50/80 backdrop-blur-sm border-2 border-green-200/50 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-green-800">Message sent successfully!</p>
                        <p className="text-green-700 text-sm">Thank you! We've received your message and will respond soon.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
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
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
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
                      <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-3">
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
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
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
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="gradient-text">Contact</span> Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`glass-card glass-card-hover rounded-2xl p-5 cursor-pointer`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`feature-icon bg-gradient-to-br ${info.color}`}>
                          {info.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-orange-600 hover:text-orange-700 font-semibold block truncate transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-700 font-semibold truncate">{info.value}</p>
                          )}
                          <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Support Hours */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="feature-icon bg-gradient-to-br from-amber-500 to-orange-500">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Support Hours</h4>
                  </div>
                  <div className="space-y-4">
                    {supportHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-gray-100/50 last:border-0"
                      >
                        <span className="text-gray-600 font-medium">{schedule.day}</span>
                        <span className="text-gray-900 font-bold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t-2 border-orange-100">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      Average response time: within 24 hours
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Live Chat CTA */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="gradient-bg rounded-3xl p-6 text-white relative overflow-hidden">
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
                      className="w-full px-6 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-orange-50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
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
      <section className="section-padding bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="glass-card rounded-3xl overflow-hidden shadow-xl">
              <div className="aspect-video w-full bg-gradient-to-br from-orange-100 via-amber-50 to-pink-100 flex items-center justify-center relative">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-10 left-10 w-20 h-20 border-4 border-orange-200 rounded-lg" />
                  <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-pink-200 rounded-full" />
                  <div className="absolute top-1/2 right-20 w-12 h-12 border-4 border-purple-200 rounded-lg rotate-45" />
                </div>

                <div className="text-center relative z-10 p-8">
                  <div className="feature-icon mx-auto mb-6 bg-gradient-to-br from-orange-500 to-pink-500 w-20 h-20">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3">Helsinki, Finland</h3>
                  <p className="text-gray-600 text-lg mb-6">Punavuori District</p>
                  <a
                    href="https://maps.google.com/?q=Punavuori,Helsinki,Finland"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg border-2 border-orange-100"
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
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-10 md:p-16">
              <div className="feature-icon mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 w-20 h-20">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Looking for <span className="gradient-text">quick answers</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
                Check out our FAQ page for common questions about Helmies Bites.
              </p>
              <Link
                to="/faq"
                className="btn-primary inline-flex items-center gap-3"
              >
                <Sparkles className="h-5 w-5" />
                Visit FAQ
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-gradient relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl floating" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl floating-delayed" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-10 md:p-16">
              <div className="feature-icon mx-auto mb-6 bg-gradient-to-br from-orange-500 to-pink-500 w-20 h-20">
                <Send className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                Ready to get <span className="gradient-text">started</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
                Join hundreds of restaurants already using Helmies Bites to streamline their operations.
              </p>
              <Link
                to="/get-started"
                className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5"
              >
                <Send className="h-6 w-6" />
                Start Free Setup
              </Link>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required. Setup takes less than 5 minutes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
