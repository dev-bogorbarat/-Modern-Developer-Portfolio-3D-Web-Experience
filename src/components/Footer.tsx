import React, { useState } from 'react';
import { ChevronUp, Github, Twitter, Linkedin, Instagram, Mail, Sparkles, Scale, ShieldCheck } from 'lucide-react';
import { LicenseModal } from './LicenseModal';
import { useTranslation } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        id="main-footer"
        className="glass py-12 px-6 text-slate-400 text-sm border-t border-white/10 relative"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Creator License */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <span className="font-bold text-white text-base tracking-wide bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                pardan3d
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                v2.0 WebGL
              </span>
              <button
                id="footer-open-license-badge-btn"
                type="button"
                onClick={() => setIsLicenseOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-white/10 transition cursor-pointer"
                title={t.footer.licenseDetails}
              >
                <Scale className="w-3 h-3 text-cyan-400" />
                <span>{t.footer.licenseBtn}</span>
              </button>
            </div>
            <p className="text-slate-400 text-xs">
              © 2026 <strong className="text-slate-200">pardan3d</strong> • {t.footer.copyright}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-[11px] text-slate-400">
              <button
                id="footer-open-license-text-btn"
                type="button"
                onClick={() => setIsLicenseOpen(true)}
                className="hover:text-cyan-400 underline underline-offset-2 transition cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>{t.footer.licenseDetails}</span>
              </button>
            </div>
          </div>

          {/* Middle: Social & Email Links */}
          <div className="flex items-center space-x-3">
            <a
              href="mailto:pardanmukslin@gmail.com"
              title="Email: pardanmukslin@gmail.com"
              aria-label="Email pardanmukslin@gmail.com"
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition border border-white/10"
            >
              <Mail className="w-4 h-4" />
            </a>
            {[
              { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com' },
              { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://twitter.com' },
              { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com' },
              { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', href: 'https://instagram.com' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition border border-white/10"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Right: Back to Top */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.footer.fps}</span>
            </div>

            <button
              id="back-to-top-btn"
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full glass hover:bg-white/10 text-xs font-semibold text-slate-200 transition border border-white/10 flex items-center gap-1.5 group cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </footer>

      {/* License Modal */}
      <LicenseModal isOpen={isLicenseOpen} onClose={() => setIsLicenseOpen(false)} />
    </>
  );
};
