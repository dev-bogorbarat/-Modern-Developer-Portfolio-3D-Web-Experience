import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SceneControls } from './components/SceneControls';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem, Scene3DConfig } from './types';
import { initGlobalSoundEffects } from './utils/audio';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function PortfolioApp() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isObjectFocused, setIsObjectFocused] = useState<boolean>(false);
  const [bounceKey, setBounceKey] = useState<number>(0);

  // Inisialisasi efek suara interaktif hover & click
  useEffect(() => {
    const cleanup = initGlobalSoundEffects();
    return cleanup;
  }, []);

  // Keyboard Escape listener untuk kembali dari modal atau fokus 3D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isObjectFocused) setIsObjectFocused(false);
        if (selectedProject) setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isObjectFocused, selectedProject]);

  // Initial 3D Scene parameters
  const [sceneConfig, setSceneConfig] = useState<Scene3DConfig>({
    shape: 'torusknot',
    wireframe: true,
    speed: 1.0,
    particlesDensity: 700,
    colorScheme: 'cyan',
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Subtle Ambient Animated Gradient & Noise Layer */}
      <AmbientBackground colorScheme={sceneConfig.colorScheme} />

      {/* 3D WebGL Three.js Background Canvas */}
      <ThreeCanvas
        config={sceneConfig}
        isFocused={isObjectFocused}
        onFocusChange={(focused) => setIsObjectFocused(focused)}
        triggerBounceKey={bounceKey}
      />

      {/* Floating Tombol Kembali & Ganti Objek saat Objek 3D Difokuskan */}
      {isObjectFocused && (
        <>
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn max-w-[96vw]">
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl sm:rounded-full bg-slate-950/95 border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 backdrop-blur-xl">
              <button
                id="btn-back-from-3d-object"
                type="button"
                onClick={() => setIsObjectFocused(false)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-cyan-500/25 group shrink-0"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{t.focus.back}</span>
              </button>

              {/* Tombol Impuls Fisika Cannon.es */}
              <button
                id="btn-physics-bounce"
                type="button"
                onClick={() => setBounceKey((k) => k + 1)}
                className="px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 hover:text-white font-mono text-xs border border-emerald-400/50 flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-emerald-500/20 active:scale-95 shrink-0"
                title={t.focus.bounceHint}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>{t.focus.bounce}</span>
              </button>

              {/* Quick Switcher for Other 3D Objects */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5 px-1 scrollbar-none">
                {[
                  { id: 'diamond' as const, label: t.hero.shapes.diamond.label },
                  { id: 'star' as const, label: t.hero.shapes.star.label },
                  { id: 'torusknot' as const, label: t.hero.shapes.torusknot.label },
                  { id: 'icosahedron' as const, label: t.hero.shapes.icosahedron.label },
                  { id: 'torus' as const, label: t.hero.shapes.torus.label },
                  { id: 'octahedron' as const, label: t.hero.shapes.octahedron.label },
                  { id: 'dodecahedron' as const, label: t.hero.shapes.dodecahedron.label },
                  { id: 'sphere' as const, label: t.hero.shapes.sphere.label },
                ].map((s) => (
                  <button
                    key={s.id}
                    id={`focus-shape-${s.id}`}
                    type="button"
                    onClick={() => setSceneConfig((prev) => ({ ...prev, shape: s.id }))}
                    className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all shrink-0 border cursor-pointer ${
                      sceneConfig.shape === s.id
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Quick Language switcher inside focused bar */}
              <div className="hidden sm:block pl-1">
                <LanguageSwitcher variant="pills" />
              </div>
            </div>
          </div>

          {/* Hint interaksi fisika realistis di bagian bawah */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn max-w-[92vw] text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/85 border border-emerald-500/30 backdrop-blur-md text-xs text-slate-300 font-mono shadow-lg shadow-black/50">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.focus.bounceHint}</span>
            </div>
          </div>
        </>
      )}

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} isHidden={isObjectFocused} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col space-y-12">
        <Hero
          onFocusObject={() => setIsObjectFocused(true)}
          currentShape={sceneConfig.shape}
          onSelectShape={(shape) => setSceneConfig((prev) => ({ ...prev, shape }))}
        />
        <AboutSection />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating 3D Scene Customizer */}
      <SceneControls
        config={sceneConfig}
        onChangeConfig={(newConfig) => setSceneConfig(newConfig)}
        onFocusObject={() => setIsObjectFocused(true)}
      />

      {/* Interactive 3D Model Modal for Projects */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
