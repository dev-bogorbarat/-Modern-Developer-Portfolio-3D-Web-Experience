import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'compact' | 'dropdown' | 'pills';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'dropdown',
}) => {
  const { language, setLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const currentOption = availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  if (variant === 'pills') {
    return (
      <div className={`inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 ${className}`}>
        {availableLanguages.map((opt) => {
          const isActive = opt.code === language;
          return (
            <button
              key={opt.code}
              id={`lang-pill-${opt.code}`}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{opt.flag}</span>
              <span className="uppercase text-[11px]">{opt.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        id="btn-language-selector"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-2.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer backdrop-blur shadow-sm hover:border-cyan-500/30"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Pilih Bahasa / Select Language / 言語選択"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-sm">{currentOption.flag}</span>
        <span className="uppercase font-mono text-[11px] font-semibold">{currentOption.code}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-slate-950/95 border border-cyan-500/30 shadow-2xl shadow-black/80 backdrop-blur-xl py-1.5 z-50 animate-fadeIn">
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1">
            Language / 言語
          </div>
          {availableLanguages.map((opt) => {
            const isSelected = opt.code === language;
            return (
              <button
                key={opt.code}
                id={`lang-option-${opt.code}`}
                type="button"
                onClick={() => {
                  setLanguage(opt.code as SupportedLanguage);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{opt.flag}</span>
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
