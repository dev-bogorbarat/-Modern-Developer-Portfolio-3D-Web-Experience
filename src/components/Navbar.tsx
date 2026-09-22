import React, { useState, useEffect } from 'react';
import { Menu, X, Box, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, toggleSound } from '../utils/audio';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  activeSection: string;
  isHidden?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, isHidden = false }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    if (isHidden) {
      setMobileMenuOpen(false);
    }
  }, [isHidden]);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4 sm:px-6 py-3.5 flex justify-between items-center ${
        isHidden
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      } ${
        isScrolled
          ? 'glass shadow-lg shadow-black/20 border-b border-white/10'
          : 'glass border-b border-white/5'
      }`}
    >
      <a
        href="#home"
        className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-2 group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition">
          <Box className="w-4 h-4" />
        </div>
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
          pardan3d
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1 sm:space-x-2 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs lg:text-sm ${
                isActive
                  ? 'text-cyan-400 bg-white/10 shadow-sm border border-cyan-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          );
        })}

        {/* Sound Toggle Button */}
        <button
          id="sound-fx-toggle"
          type="button"
          onClick={handleToggleSound}
          title={soundOn ? t.nav.soundOn : t.nav.soundOff}
          className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
            soundOn
              ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 shadow-sm shadow-cyan-500/20'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
          }`}
          aria-label={soundOn ? t.nav.soundOn : t.nav.soundOff}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Language Selector Dropdown */}
        <LanguageSwitcher variant="dropdown" />

        <a
          href="#contact"
          className="ml-1 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs tracking-wider uppercase shadow-md shadow-cyan-500/25 hover:opacity-90 transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t.nav.hireMe}
        </a>
      </div>

      {/* Right controls on mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <LanguageSwitcher variant="dropdown" />

        <button
          id="mobile-sound-toggle"
          type="button"
          onClick={handleToggleSound}
          className={`p-2 rounded-lg border text-xs flex items-center justify-center cursor-pointer ${
            soundOn
              ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
              : 'glass text-slate-400'
          }`}
          aria-label={soundOn ? t.nav.soundOn : t.nav.soundOff}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg glass text-slate-300 hover:text-white transition cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-card border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden animate-fadeIn shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Pilih Bahasa / Language:</span>
            <LanguageSwitcher variant="pills" />
          </div>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md"
          >
            {t.hero.btnContact}
          </a>
        </div>
      )}
    </nav>
  );
};
