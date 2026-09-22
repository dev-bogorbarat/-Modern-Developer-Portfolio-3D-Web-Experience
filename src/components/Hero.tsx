import React from 'react';
import {
  ArrowRight,
  Sparkles,
  MousePointer,
  Layers,
  Cpu,
  Box,
  Maximize2,
  Gem,
  Disc,
  Shapes,
  Orbit,
  Circle,
  Star,
} from 'lucide-react';
import { SceneGeometryShape } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onFocusObject?: () => void;
  currentShape?: SceneGeometryShape;
  onSelectShape?: (shape: SceneGeometryShape) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onFocusObject,
  currentShape = 'torusknot',
  onSelectShape,
}) => {
  const { t } = useTranslation();

  const availableObjects: {
    id: SceneGeometryShape;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'diamond', icon: Gem },
    { id: 'star', icon: Star },
    { id: 'torusknot', icon: Shapes },
    { id: 'icosahedron', icon: Gem },
    { id: 'torus', icon: Disc },
    { id: 'octahedron', icon: Box },
    { id: 'dodecahedron', icon: Orbit },
    { id: 'sphere', icon: Circle },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative"
    >
      <div className="text-center max-w-3xl glass-card p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-white/15 backdrop-blur-xl">
        {/* Glow ambient spots */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Live status badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300 mb-6 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-[1.15] text-white">
          <span>{t.hero.titleMain}</span>{' '}
          <span className="text-cyan-400/70 font-light">|</span>{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t.hero.titleGradient}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8 p-3 rounded-2xl bg-black/30 border border-white/5 text-left text-xs">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">{t.hero.statsFps}</div>
              <div className="text-[11px] text-slate-400">{t.hero.statsFpsSub}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5">
            <Layers className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">{t.hero.statsThree}</div>
              <div className="text-[11px] text-slate-400">{t.hero.statsThreeSub}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5">
            <MousePointer className="w-4 h-4 text-pink-400 shrink-0" />
            <div>
              <div className="font-bold text-white text-sm">{t.hero.statsInteractive}</div>
              <div className="text-[11px] text-slate-400">{t.hero.statsInteractiveSub}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            id="hero-view-work-btn"
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
          >
            <span>{t.hero.btnViewWork}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {onFocusObject && (
            <button
              id="hero-inspect-object-btn"
              type="button"
              onClick={onFocusObject}
              className="px-6 py-3.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-semibold text-sm transition border border-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/10 group"
              title={t.hero.btnInspect}
            >
              <Box className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>{t.hero.btnInspect}</span>
            </button>
          )}

          <a
            id="hero-contact-btn"
            href="#contact"
            className="px-7 py-3.5 rounded-full glass font-semibold text-sm hover:bg-white/10 transition border border-white/20 text-slate-100 flex items-center justify-center"
          >
            {t.hero.btnContact}
          </a>
        </div>

        {/* Interactive 3D Objects Bar & Enlarge Controls */}
        <div className="mt-8 pt-5 border-t border-white/10 text-left space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t.hero.collectionTitle}</span>
            </div>
            {onFocusObject && (
              <button
                id="hero-click-enlarge-object-btn"
                type="button"
                onClick={onFocusObject}
                className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-100 font-semibold transition cursor-pointer bg-cyan-500/15 hover:bg-cyan-500/25 px-3.5 py-1.5 rounded-full border border-cyan-400/40 text-xs self-start sm:self-auto group shadow-sm shadow-cyan-500/15"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>{t.hero.btnEnlarge}</span>
              </button>
            )}
          </div>

          {/* Grid of 8 Different 3D Objects to inspect & switch */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableObjects.map((obj) => {
              const isSelected = currentShape === obj.id;
              const IconComp = obj.icon;
              const shapeInfo = t.hero.shapes[obj.id] || { label: obj.id, desc: '' };
              return (
                <button
                  key={obj.id}
                  id={`shape-choice-${obj.id}`}
                  type="button"
                  onClick={() => {
                    if (onSelectShape) onSelectShape(obj.id);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col items-center sm:items-start group ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-500/25 to-blue-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/30'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white'
                  }`}
                  title={`${shapeInfo.label} (${shapeInfo.desc})`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <IconComp
                      className={`w-4 h-4 ${
                        isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
                      }`}
                    />
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  <span className="font-bold text-xs truncate max-w-full">{shapeInfo.label}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-300 truncate max-w-full">
                    {shapeInfo.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
