import { ScrollReveal } from '../components/ScrollReveal';
import {
  Heart,
  Target,
  Users,
  Globe,
  Lightbulb,
  Shield,
  Sparkles,
  MapPin,
  ArrowRight,
  Mail,
  Award,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {

  const teamMembers = [
    {
      name: 'Marcus Helmi',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Former restaurant owner with 15 years of hospitality experience.'
    },
    {
      name: 'Sofia Lindqvist',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
      bio: 'Passionate about creating intuitive user experiences.'
    },
    {
      name: 'Erik Virtanen',
      role: 'Lead Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Building scalable solutions for the restaurant industry.'
    },
    {
      name: 'Aina Korhonen',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Dedicated to helping restaurants succeed online.'
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Customer First',
      description: 'Every decision starts with what is best for our restaurant partners and their customers.'
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our platform to stay ahead of industry trends and technology.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Reliability',
      description: 'Built on robust infrastructure ensuring your restaurant is always online and ready.'
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Simplicity',
      description: 'Complex technology made simple so you can focus on what matters - your food.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started with a vision to democratize restaurant technology', icon: <Rocket className="h-5 w-5" /> },
    { year: '2021', title: 'First 100 Restaurants', description: 'Reached our first milestone of serving 100 restaurants', icon: <Award className="h-5 w-5" /> },
    { year: '2022', title: 'AI Integration', description: 'Launched AI-powered menu translation and setup', icon: <Lightbulb className="h-5 w-5" /> },
    { year: '2023', title: '1000+ Restaurants', description: 'Expanded to serve over 1000 restaurants across Finland', icon: <Globe className="h-5 w-5" /> },
    { year: '2024', title: 'European Expansion', description: 'Started serving restaurants across Europe', icon: <Target className="h-5 w-5" /> }
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl floating" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl floating-delayed" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center py-20">
              <span className="badge mb-6">About Us</span>
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900">
                Making restaurant technology{' '}
                <span className="gradient-text">accessible</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We believe every restaurant deserves a beautiful online presence, regardless of size or technical expertise.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="glass-card rounded-3xl p-3 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
                    alt="Restaurant kitchen"
                    className="rounded-2xl w-full"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 glass-card-hover glass-card p-6 rounded-3xl floating">
                  <p className="stat-value">4+</p>
                  <p className="text-sm font-semibold text-gray-600">Years serving restaurants</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <span className="badge mb-4">Our Story</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-8 leading-tight">
                  From a small kitchen to{' '}
                  <span className="gradient-text">big ideas</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Helmies Bites was born from a simple observation: while technology has transformed many industries,
                    most restaurants still struggle to establish a strong online presence. Expensive websites,
                    complicated ordering systems, and technical barriers kept many amazing restaurants from reaching
                    their full potential.
                  </p>
                  <p>
                    Our founder, Marcus Helmi, experienced this firsthand while running his family's restaurant
                    in Helsinki. He knew there had to be a better way - a way that didn't require deep technical
                    knowledge or a large budget.
                  </p>
                  <p>
                    Today, we're proud to help hundreds of restaurants across Finland and beyond establish their
                    digital presence, accept online orders, and connect with customers in meaningful ways.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding hero-gradient relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge">Our Purpose</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
                Mission & <span className="gradient-text">Vision</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="up" delay={0}>
              <div className="glass-card-hover glass-card card-modern h-full">
                <div className="feature-icon mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To empower every restaurant with affordable, easy-to-use technology that helps them thrive in the digital age.
                  We believe that great food deserves to be discovered, ordered, and enjoyed by everyone.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="glass-card-hover glass-card card-modern h-full">
                <div className="feature-icon mb-6" style={{ background: 'var(--gradient-cool)' }}>
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  A world where every restaurant, from the smallest family cafe to the largest dining establishment,
                  has equal access to the digital tools they need to succeed and grow their business.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
                Meet the people behind <span className="gradient-text">Helmies</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A passionate team of food lovers, designers, and engineers working together to transform restaurant technology.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div className="glass-card-hover glass-card rounded-3xl p-6 text-center group">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 rounded-full gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">{member.name}</h3>
                  <p className="text-orange-600 font-bold text-sm mt-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-padding hero-gradient relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge">What We Believe</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
                Our Core <span className="gradient-text">Values</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} direction="scale" delay={index * 0.1}>
                <div className="glass-card-hover glass-card card-modern text-center">
                  <div className="feature-icon mx-auto mb-6 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="section-padding bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
                Key <span className="gradient-text">Milestones</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 rounded-full"
                 style={{ background: 'linear-gradient(180deg, #f97316, #d946ef, #8b5cf6)' }} />

            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div className={`relative flex items-start mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full border-4 border-white transform -translate-x-1/2 mt-1.5 shadow-lg gradient-bg z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                    <div className="glass-card glass-card-hover rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="feature-icon w-10 h-10">
                          {milestone.icon}
                        </div>
                        <span className="gradient-text text-2xl font-black">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 mt-3 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office/Location Section */}
      <section className="section-padding hero-gradient relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="badge">Visit Us</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
                Our <span className="gradient-text">Home</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="glass-card rounded-3xl p-3 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop"
                  alt="Helsinki office"
                  className="rounded-2xl w-full"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="glass-card card-modern">
                <h3 className="text-3xl font-black text-gray-900 mb-4">Helsinki, Finland</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  We're proud to call Helsinki our home. From here, we serve restaurants across Finland and
                  continue our expansion throughout Europe.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">Punavuori, Helsinki, Finland</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <a href="mailto:hello@helmiesbites.fi" className="font-medium hover:text-orange-600 transition-colors">
                      hello@helmiesbites.fi
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">25+ team members</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center gap-3 mt-8"
                >
                  Get in touch
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-animated section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Join our growing family of restaurants
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Be part of our story and let us help you write yours.
            </p>
            <Link
              to="/get-started"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-orange-600 rounded-2xl font-black hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-2xl"
            >
              Start your journey today
              <ArrowRight className="h-6 w-6" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
