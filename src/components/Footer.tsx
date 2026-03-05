import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('common');

  const footerLinks = {
    product: [
      { name: t('footer.links.features'), href: '/features' },
      { name: t('footer.links.pricing'), href: '/pricing' },
      { name: t('footer.links.examples'), href: '#' },
      { name: t('footer.links.integrations'), href: '/features#integrations' },
    ],
    company: [
      { name: t('footer.links.aboutUs'), href: '/about' },
      { name: t('footer.links.blog'), href: '#' },
      { name: t('footer.links.careers'), href: '#' },
    ],
    support: [
      { name: t('footer.links.helpCenter'), href: '/faq' },
      { name: t('footer.links.documentation'), href: '#' },
      { name: t('footer.links.apiReference'), href: '#' },
      { name: t('footer.links.status'), href: '#' },
    ],
    legal: [
      { name: t('footer.links.privacyPolicy'), href: '/privacy' },
      { name: t('footer.links.termsOfService'), href: '/terms' },
      { name: t('footer.links.gdpr'), href: '/gdpr' },
      { name: t('footer.links.cookiePolicy'), href: '/cookies' },
    ],
  };

  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: '#',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.9849 14L8.51285 5.8405L8.52224 5.8482L13.4561 0H11.8073L7.78803 4.76L4.59629 0H0.272142L5.38088 7.6179L-0.0078125 14H1.64093L6.1094 8.7042L9.66075 14H13.9849ZM3.94303 1.2727L11.6206 12.7273H10.3141L2.63021 1.2727H3.94303Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0D0907]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2A1F15]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Nav Links Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
            {[
              { label: t('nav.features'), path: '/features' },
              { label: t('nav.pricing'), path: '/pricing' },
              { label: t('nav.about'), path: '/about' },
              { label: t('nav.faq'), path: '/faq' },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="text-white/60 hover:text-[#FF7A00] transition-colors duration-300 font-semibold text-sm tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="glass-card xb-border rounded-[20px] p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Social Media */}
              <div>
                <p className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.socialGroup')}</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300 hover:border-[#FF7A00]/30 hover:text-[#FF7A00] hover:bg-[#FF7A00]/5 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-1">
                <p className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.newsletter')}</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder={t('footer.emailPlaceholder')}
                    className="input-modern flex-1 !py-3 !px-4 !rounded-full text-sm"
                  />
                  <button type="submit" className="btn-primary !py-3 !px-6 text-sm whitespace-nowrap">
                    <span className="relative z-10">{t('footer.submit')}</span>
                  </button>
                </form>
              </div>

              {/* Launch Badge */}
              <div className="flex items-end justify-start md:justify-end">
                <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20">
                  <svg className="h-4 w-4 text-[#FF7A00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                  <span className="text-sm font-bold text-[#FF7A00]">{t('footer.launchingDate')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
                  {t(`footer.${title}`)}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-white/40 hover:text-[#FF7A00] transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/30 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:info@helmies.fi"
                className="flex items-center gap-2 text-white/30 hover:text-[#FF7A00] transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                info@helmies.fi
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
