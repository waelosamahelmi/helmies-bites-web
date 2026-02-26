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
  Mail
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
    { year: '2020', title: 'Founded', description: 'Started with a vision to democratize restaurant technology' },
    { year: '2021', title: 'First 100 Restaurants', description: 'Reached our first milestone of serving 100 restaurants' },
    { year: '2022', title: 'AI Integration', description: 'Launched AI-powered menu translation and setup' },
    { year: '2023', title: '1000+ Restaurants', description: 'Expanded to serve over 1000 restaurants across Finland' },
    { year: '2024', title: 'European Expansion', description: 'Started serving restaurants across Europe' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center py-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Making restaurant technology
                <span className="text-orange-600"> accessible</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We believe every restaurant deserves a beautiful online presence, regardless of size or technical expertise.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
                  alt="Restaurant kitchen"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-4xl font-bold">4+</p>
                  <p className="text-sm">Years of serving restaurants</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                  From a small kitchen to big ideas
                </h2>
                <div className="space-y-4 text-gray-600">
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="up" delay={0}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower every restaurant with affordable, easy-to-use technology that helps them thrive in the digital age.
                  We believe that great food deserves to be discovered, ordered, and enjoyed by everyone.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A world where every restaurant, from the smallest family cafe to the largest dining establishment,
                  has equal access to the digital tools they need to succeed and grow their business.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Meet the people behind Helmies</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                A passionate team of food lovers, designers, and engineers working together to transform restaurant technology.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div className="group">
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-orange-600 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">What We Believe</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} direction="scale" delay={index * 0.1}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Key Milestones</h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div className={`relative flex items-start mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white transform -translate-x-1/2 mt-1.5 shadow-sm" />

                  <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <span className="text-orange-600 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-gray-600 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office/Location Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Visit Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Home</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ScrollReveal direction="left">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop"
                alt="Helsinki office"
                className="rounded-2xl shadow-xl w-full"
              />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Helsinki, Finland</h3>
                <p className="text-gray-600 mb-6">
                  We're proud to call Helsinki our home. From here, we serve restaurants across Finland and
                  continue our expansion throughout Europe.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <span>Punavuori, Helsinki, Finland</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="h-5 w-5 text-orange-600" />
                    <a href="mailto:hello@helmiesbites.fi" className="hover:text-orange-600 transition-colors">
                      hello@helmiesbites.fi
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span>25+ team members</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Join our growing family of restaurants
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of our story and let us help you write yours.
            </p>
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              Start your journey today
              <ArrowRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
