import React, { useState } from 'react';
import { Sliders, Check, RefreshCw, Layers, Box } from 'lucide-react';
import { Scene3DConfig, SceneGeometryShape } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface SceneControlsProps {
  config: Scene3DConfig;
  onChangeConfig: (newConfig: Scene3DConfig) => void;
  onFocusObject?: () => void;
}

export const SceneControls: React.FC<SceneControlsProps> = ({ config, onChangeConfig, onFocusObject }) => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const shapes: { id: SceneGeometryShape; label: string }[] = [
    { id: 'diamond', label: t.hero.shapes.diamond.label },
    { id: 'star', label: t.hero.shapes.star.label },
    { id: 'torusknot', label: t.hero.shapes.torusknot.label },
    { id: 'icosahedron', label: t.hero.shapes.icosahedron.label },
    { id: 'torus', label: t.hero.shapes.torus.label },
    { id: 'octahedron', label: t.hero.shapes.octahedron.label },
    { id: 'dodecahedron', label: t.hero.shapes.dodecahedron.label },
    { id: 'sphere', label: t.hero.shapes.sphere.label },
  ];

  const colors: { id: Scene3DConfig['colorScheme']; name: string; bg: string }[] = [
    { id: 'cyan', name: 'Cyan Neon', bg: 'bg-cyan-500' },
    { id: 'purple', name: 'Cyber Purple', bg: 'bg-purple-500' },
    { id: 'emerald', name: 'Matrix Green', bg: 'bg-emerald-500' },
    { id: 'amber', name: 'Solar Gold', bg: 'bg-amber-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Control Box */}
      {isOpen && (
        <div
          id="scene-controls-panel"
          className="mb-3 w-72 sm:w-80 glass-card p-5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl text-slate-100 animate-fadeIn text-xs space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-sm tracking-wide flex items-center gap-1.5 text-white">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>{t.controls.title}</span>
            </span>
            <button
              type="button"
              onClick={() =>
                onChangeConfig({
                  shape: 'torusknot',
                  wireframe: true,
                  speed: 1,
                  particlesDensity: 700,
                  colorScheme: 'cyan',
                })
              }
              title={t.controls.reset}
              className="text-slate-400 hover:text-cyan-400 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Geometry Selector */}
          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t.controls.shapeLabel}:</label>
            <div className="grid grid-cols-2 gap-1.5">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChangeConfig({ ...config, shape: s.id })}
                  className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition ${
                    config.shape === s.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                  {config.shape === s.id && <Check className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* Wireframe toggle */}
          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t.controls.wireframeLabel}:</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onChangeConfig({ ...config, wireframe: true })}
                className={`px-2.5 py-1.5 rounded-lg border text-center transition flex items-center justify-center gap-1 ${
                  config.wireframe
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-semibold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {t.controls.wireframeOn}
              </button>
              <button
                type="button"
                onClick={() => onChangeConfig({ ...config, wireframe: false })}
                className={`px-2.5 py-1.5 rounded-lg border text-center transition flex items-center justify-center gap-1 ${
                  !config.wireframe
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-semibold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {t.controls.wireframeOff}
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">{t.controls.colorLabel}:</label>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onChangeConfig({ ...config, colorScheme: c.id })}
                  className={`w-7 h-7 rounded-full ${c.bg} transition transform hover:scale-110 flex items-center justify-center ${
                    config.colorScheme === c.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70'
                  }`}
                  title={c.name}
                  aria-label={c.name}
                >
                  {config.colorScheme === c.id && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Speed slider */}
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>{t.controls.speedLabel}:</span>
              <span className="font-mono text-cyan-400">{config.speed}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={config.speed}
              onChange={(e) => onChangeConfig({ ...config, speed: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Trigger Object Focus Mode */}
          {onFocusObject && (
            <button
              id="controls-focus-object-btn"
              type="button"
              onClick={() => {
                onFocusObject();
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 font-semibold text-xs border border-cyan-500/40 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Box className="w-3.5 h-3.5" />
              <span>{t.hero.btnInspect}</span>
            </button>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="toggle-scene-controls"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-full glass border border-white/20 text-white font-medium shadow-xl hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition flex items-center gap-2.5 backdrop-blur-xl group cursor-pointer"
      >
        <Sliders className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        <span className="text-xs font-semibold tracking-wide">
          {isOpen
            ? language === 'en'
              ? 'Close 3D Controls'
              : language === 'ja'
              ? '3D設定を閉じる'
              : 'Tutup Kontrol 3D'
            : language === 'en'
            ? '3D Customizer'
            : language === 'ja'
            ? '3D設定'
            : 'Ubah Objek 3D'}
        </span>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </button>
    </div>
  );
};
