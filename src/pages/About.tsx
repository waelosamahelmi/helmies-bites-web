import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTitle } from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import { LaunchCountdown } from '../components/LaunchCountdown';
import {
  Heart,
  Target,
  Users,
  Globe,
  Lightbulb,
  Shield,
  Sparkles,
  MapPin,
  Mail,
  Award,
  Rocket,
} from 'lucide-react';

/* ============================================================================
   Data
   ============================================================================ */

const teamMembers = [
  {
    name: 'Wael Helmi',
    role: 'Founder & CEO',
    image: '/img01.jpg',
    bio: 'Creative developer passionate about building beautiful digital experiences for the restaurant industry.',
    linkedin: 'https://www.linkedin.com/in/waelosamahelmi/',
  },
  {
    name: 'Nagham Alaa',
    role: 'UI/UX Designer',
    image: '/img02.jpg',
    bio: 'Creative developer crafting intuitive and stunning user experiences.',
    linkedin: 'https://www.linkedin.com/in/naghamalaa/',
  },
];

const values = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Customer First',
    description: 'Every decision starts with what is best for our restaurant partners and their customers.',
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Continuous Innovation',
    description: 'We constantly evolve our platform to stay ahead of industry trends and technology.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Reliability',
    description: 'Built on robust infrastructure ensuring your restaurant is always online and ready.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Simplicity',
    description: 'Complex technology made simple so you can focus on what matters - your food.',
  },
];

const milestones = [
  { year: 'Late 2025', title: 'Founded', description: 'Started building Helmies Bites with a vision to make restaurant technology accessible to everyone', icon: <Rocket className="h-5 w-5" /> },
  { year: 'Feb 2026', title: 'Platform Launch', description: 'Launching our AI-powered platform to help restaurants establish their digital presence', icon: <Globe className="h-5 w-5" /> },
];

/* ============================================================================
   Component
   ============================================================================ */

export function About() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl floating" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2A1F15]/50 rounded-full blur-3xl floating-delayed" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center py-20">
              <SectionTitle
                subtitle="About Us"
                title="accessible"
                titleHighlight="Making restaurant technology"
                description="We believe every restaurant deserves a beautiful online presence, regardless of size or technical expertise."
                icon={<Sparkles className="h-4 w-4" />}
              />
            </div>
          </ScrollReveal>
        </div>
        <div className="hero-linear" />
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="glass-card xb-border rounded-3xl p-3 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
                    alt="Restaurant kitchen"
                    className="rounded-2xl w-full"
                  />
                </div>
                {/* Floating stat card overlay */}
                <div className="absolute -bottom-8 -right-8 glass-card xb-border p-6 rounded-3xl floating">
                  <p className="stat-value text-3xl">2026</p>
                  <p className="text-sm font-semibold text-white/50">Launching now</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Text */}
            <ScrollReveal direction="right">
              <div>
                <SectionTitle
                  subtitle="Our Story"
                  title="big ideas"
                  titleHighlight="From a small kitchen to"
                  align="left"
                  icon={<Heart className="h-4 w-4" />}
                  className="mb-8"
                />
                <div className="space-y-6 text-white/50 text-lg leading-relaxed">
                  <p>
                    Helmies Bites was born from a simple observation: while technology has transformed many industries,
                    most restaurants still struggle to establish a strong online presence. Expensive websites,
                    complicated ordering systems, and technical barriers kept many amazing restaurants from reaching
                    their full potential.
                  </p>
                  <p>
                    Our founder, Wael Helmi, a creative developer based in Helsinki, saw this gap and set out
                    to build a better solution - one that doesn't require deep technical knowledge or a large
                    budget.
                  </p>
                  <p>
                    Now, as we launch in early 2026, we're ready to help restaurants across Finland and beyond
                    establish their digital presence, accept online orders, and connect with customers in meaningful ways.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Purpose"
              title="Vision"
              titleHighlight="Mission &"
              icon={<Target className="h-4 w-4" />}
              className="mb-16"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="up" delay={0}>
              <div className="glass-card xb-border p-8 rounded-3xl h-full">
                <div className="feature-icon mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Our Mission</h3>
                <p className="text-white/50 leading-relaxed text-lg">
                  To empower every restaurant with affordable, easy-to-use technology that helps them thrive in the digital age.
                  We believe that great food deserves to be discovered, ordered, and enjoyed by everyone.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="glass-card xb-border p-8 rounded-3xl h-full">
                <div className="feature-icon mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
                <p className="text-white/50 leading-relaxed text-lg">
                  A world where every restaurant, from the smallest family cafe to the largest dining establishment,
                  has equal access to the digital tools they need to succeed and grow their business.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Team"
              title="Helmies"
              titleHighlight="Meet the people behind"
              description="A passionate team of creative developers working together to transform restaurant technology."
              icon={<Users className="h-4 w-4" />}
              className="mb-16"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div className="glass-card xb-border rounded-3xl p-6 text-center group h-full">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#CC6200] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-32 h-32 rounded-full object-cover mx-auto border-4 border-white/10 shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-black text-white">{member.name}</h3>
                  <p className="text-[#FF7A00] font-bold text-sm mt-1">{member.role}</p>
                  <p className="text-white/40 text-sm mt-4 leading-relaxed">{member.bio}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-white/40 hover:text-[#FF7A00] transition-colors text-sm font-semibold"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="What We Believe"
              title="Values"
              titleHighlight="Our Core"
              icon={<Heart className="h-4 w-4" />}
              className="mb-16"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} direction="scale" delay={index * 0.1}>
                <div className="glass-card xb-border p-8 rounded-3xl text-center h-full group">
                  <div className="feature-icon mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MILESTONES TIMELINE ===== */}
      <section className="section-padding bg-[#0D0907]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="Our Journey"
              title="Milestones"
              titleHighlight="Key"
              icon={<Award className="h-4 w-4" />}
              className="mb-16"
            />
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line - orange gradient consistent with theme */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 rounded-full"
              style={{ background: 'linear-gradient(180deg, #FF7A00, #CC6200, #D4915C)' }}
            />

            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <div className={`relative flex items-start mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full border-4 border-[#0D0907] transform -translate-x-1/2 mt-1.5 shadow-lg bg-gradient-to-r from-[#FF7A00] to-[#CC6200] z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#0D0907] rounded-full" />
                  </div>

                  <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                    <div className="glass-card xb-border rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="feature-icon w-10 h-10">
                          {milestone.icon}
                        </div>
                        <span className="gradient-text text-2xl font-black">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-black text-white mt-2">{milestone.title}</h3>
                      <p className="text-white/50 mt-3 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFFICE / LOCATION ===== */}
      <section className="section-padding bg-[#2A1F15]/20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="Visit Us"
              title="Home"
              titleHighlight="Our"
              icon={<MapPin className="h-4 w-4" />}
              className="mb-12"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="glass-card xb-border rounded-3xl p-3 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop"
                  alt="Helsinki office"
                  className="rounded-2xl w-full"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="glass-card xb-border p-8 rounded-3xl">
                <h3 className="text-3xl font-black text-white mb-4">Helsinki, Finland</h3>
                <p className="text-white/50 mb-8 text-lg leading-relaxed">
                  We're proud to call Helsinki our home. From here, we serve restaurants across Finland and
                  continue our expansion throughout Europe.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#FF7A00] to-[#CC6200]">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">Punavuori, Helsinki, Finland</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#FF7A00] to-[#CC6200]">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <a href="mailto:hello@helmiesbites.fi" className="font-medium hover:text-[#FF7A00] transition-colors">
                      hello@helmiesbites.fi
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#FF7A00] to-[#CC6200]">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">25+ team members</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CTA - Left-Aligned Aivora Style ===== */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2A1F15 0%, #0D0907 50%, #2A1F15 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4915C]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <SectionTitle
                subtitle="Join our family"
                title="Ready to Get Started?"
                align="left"
                icon={<Sparkles className="h-4 w-4" />}
                className="mb-8"
              />
              <p className="text-xl text-white/50 mb-10 max-w-xl leading-relaxed">
                Be part of our story and let us help you write yours. Be among the{' '}
                <strong className="text-[#FF7A00]">first restaurants</strong> to launch with Helmies Bites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <LaunchCountdown compact />
                <Link to="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="hidden lg:block">
                <div className="glass-card xb-border p-8 text-center rounded-3xl">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#CC6200] flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Join Our Family</h3>
                  <p className="text-white/50">Be part of the growing community of restaurants thriving with Helmies Bites</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
