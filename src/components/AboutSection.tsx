import React, { useState } from 'react';
import { Box, Code, Palette, Cpu, Sparkles, CheckCircle2, Zap, Layers, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';

type FilterCategory = 'all' | '3d' | 'web' | 'design';

interface TechTool {
  name: string;
  category: '3d' | 'web' | 'design';
  typeLabel: string;
  iconColor: string;
}

export const AboutSection: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const coreSkills = [
    {
      id: '3d-webgl',
      category: '3d' as const,
      categoryLabel: t.about.filter3D,
      icon: <Box className="w-6 h-6 text-cyan-400" />,
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      hoverBorder: 'hover:border-cyan-500/50',
      title: 'Three.js & WebGL',
      description:
        language === 'en'
          ? 'Crafting real-time 3D interactive assets, spatial animations, and camera choreography in browser engines with 60 FPS optimization.'
          : language === 'ja'
          ? 'ブラウザ上で最適化されたパフォーマンスで、インタラクティブな3Dオブジェクト、空間アニメーション、カメラ制御を構築。'
          : 'Membuat objek 3D interaktif, animasi ruang, dan manipulasi kamera langsung di browser dengan performa optimal.',
      tags: ['Three.js', 'WebGL 2.0', 'GLSL Shaders', 'BufferGeometry', 'Lighting'],
      metric: `95% ${t.about.understanding}`,
    },
    {
      id: 'web-dev',
      category: 'web' as const,
      categoryLabel: t.about.filterWeb,
      icon: <Code className="w-6 h-6 text-purple-400" />,
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/50',
      title: 'Web Engineering',
      description:
        language === 'en'
          ? 'Architecting ultra-responsive, performant frontend web applications using bleeding-edge modern web standards and TypeScript.'
          : language === 'ja'
          ? '最新のWeb技術とTypeScriptを駆使し、高速かつレスポンシブなモダンフロントエンドWebアプリを設計・開発。'
          : 'Pengembangan frontend modern yang responsif, cepat, dan berkinerja tinggi menggunakan stack web terkini.',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion API'],
      metric: `92% ${t.about.understanding}`,
    },
    {
      id: 'design-ux',
      category: 'design' as const,
      categoryLabel: t.about.filterDesign,
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      iconBg: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      hoverBorder: 'hover:border-pink-500/50',
      title: '3D Design & UI/UX',
      description:
        language === 'en'
          ? 'Designing futuristic spatial interfaces, calibrated lighting, and aesthetic layout compositions that delight users.'
          : language === 'ja'
          ? '未来感のある空間UIデザイン、3Dライティング、洗練されたレイアウト構成で視覚体験を最大化。'
          : 'Perancangan antarmuka visual futuristik, pencahayaan 3D, dan tata letak elegan yang memanjakan mata pengguna.',
      tags: ['Blender 3D', 'Spatial UI', 'Glassmorphism', 'Color Theory', 'Figma'],
      metric: `88% ${t.about.understanding}`,
    },
  ];

  const tools: TechTool[] = [
    // 3D Tools
    { name: 'Three.js', category: '3d', typeLabel: '3D Engine', iconColor: 'text-cyan-400' },
    { name: 'WebGL 2.0', category: '3d', typeLabel: 'Graphics API', iconColor: 'text-cyan-400' },
    { name: 'GLSL Shaders', category: '3d', typeLabel: 'Shaders', iconColor: 'text-cyan-400' },
    { name: 'Blender 3D', category: '3d', typeLabel: 'Modeling', iconColor: 'text-cyan-400' },
    { name: 'PBR Lighting', category: '3d', typeLabel: 'Lighting', iconColor: 'text-cyan-400' },
    { name: 'Cannon.es', category: '3d', typeLabel: 'Physics', iconColor: 'text-cyan-400' },

    // Web Development
    { name: 'React 19', category: 'web', typeLabel: 'Frontend', iconColor: 'text-purple-400' },
    { name: 'TypeScript', category: 'web', typeLabel: 'Type Safety', iconColor: 'text-purple-400' },
    { name: 'Tailwind CSS', category: 'web', typeLabel: 'Styling', iconColor: 'text-purple-400' },
    { name: 'Vite Bundler', category: 'web', typeLabel: 'Build Tool', iconColor: 'text-purple-400' },
    { name: 'Motion API', category: 'web', typeLabel: 'Animation', iconColor: 'text-purple-400' },

    // Creative & UI/UX
    { name: 'Figma', category: 'design', typeLabel: 'UI Design', iconColor: 'text-pink-400' },
    { name: 'Spatial UX', category: 'design', typeLabel: '3D UX', iconColor: 'text-pink-400' },
    { name: 'Shader Art', category: 'design', typeLabel: 'Generative', iconColor: 'text-pink-400' },
    { name: 'Color Theory', category: 'design', typeLabel: 'Palette', iconColor: 'text-pink-400' },
  ];

  const filterTabs: { id: FilterCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.about.filterAll, icon: <Layers className="w-4 h-4" /> },
    { id: '3d', label: t.about.filter3D, icon: <Box className="w-4 h-4" /> },
    { id: 'web', label: t.about.filterWeb, icon: <Code className="w-4 h-4" /> },
    { id: 'design', label: t.about.filterDesign, icon: <Palette className="w-4 h-4" /> },
  ];

  const filteredSkills =
    activeFilter === 'all'
      ? coreSkills
      : coreSkills.filter((skill) => skill.category === activeFilter);

  const filteredTools =
    activeFilter === 'all'
      ? tools
      : tools.filter((tool) => tool.category === activeFilter);

  const getToolCount = (category: FilterCategory) => {
    if (category === 'all') return tools.length;
    return tools.filter((t) => t.category === category).length;
  };

  const workflowSteps =
    language === 'en'
      ? [
          {
            step: '01',
            title: 'Concept & Spatial UX',
            desc: 'Designing visual narratives and 3D spatial hierarchy prior to code execution.',
          },
          {
            step: '02',
            title: 'Mesh Modeling & Optimization',
            desc: 'Low-poly geometry optimization, vertex buffer packing, and geometry indexing.',
          },
          {
            step: '03',
            title: 'WebGL Shaders & Lighting',
            desc: 'Crafting PBR materials, dynamic particle systems, and atmospheric glow.',
          },
          {
            step: '04',
            title: 'Seamless Physics & Interaction',
            desc: 'Harmonizing cursor tracking, mobile gestures, and steady 60+ FPS playback.',
          },
        ]
      : language === 'ja'
      ? [
          {
            step: '01',
            title: 'コンセプト＆空間UX',
            desc: '実装前に3D空間の階層構造と視覚的ストーリーテリングを設計。',
          },
          {
            step: '02',
            title: 'モデリング＆メッシュ最適化',
            desc: '軽量なポリゴン設計、テクスチャ統合、バッファ圧縮による高速化。',
          },
          {
            step: '03',
            title: 'シェーダー＆ライティング',
            desc: 'PBRマテリアルの構築、リアルタイムパーティクル、アンビエント発光。',
          },
          {
            step: '04',
            title: '物理演算＆高レスポンス',
            desc: 'マウスカーソル・タッチ操作の同期と全ブラウザでの常時60FPS実現。',
          },
        ]
      : [
          {
            step: '01',
            title: 'Konseptual & Spatial UX',
            desc: 'Merancang ide visual dan hierarki ruang 3D sebelum implementasi kode.',
          },
          {
            step: '02',
            title: 'Modeling & Optimasi Mesh',
            desc: 'Optimasi poligon rendah (low-poly), texture atlasing, dan kompresi buffer.',
          },
          {
            step: '03',
            title: 'WebGL Shaders & Lighting',
            desc: 'Penyusunan material PBR, partikel dinamis, dan efek ambient glow.',
          },
          {
            step: '04',
            title: 'Responsif & Interaksi Halus',
            desc: 'Sinkronisasi mouse kursor, sentuhan mobile, dan 60+ FPS di semua browser.',
          },
        ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.about.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {t.about.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          {t.about.subtitle}
        </p>
      </motion.div>

      {/* Interactive Category Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-3 sm:p-4 rounded-2xl border border-white/10"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 self-start sm:self-center px-1">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>{t.about.filterAll}:</span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-btn-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span className="whitespace-nowrap">{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {getToolCount(tab.id)}
                </span>
              </button>
            );
          })}

          {activeFilter !== 'all' && (
            <button
              id="reset-filter-btn"
              onClick={() => setActiveFilter('all')}
              className="px-2.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Reset</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Skill Cards with Animated Layout Transitions */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`glass p-8 rounded-3xl border border-white/10 ${skill.hoverBorder} transition-colors duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden`}
            >
              {/* Ambient hover light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition pointer-events-none" />

              <div>
                <div
                  className={`w-14 h-14 ${skill.iconBg} rounded-2xl flex items-center justify-center mb-6 border transition group-hover:scale-110 duration-300`}
                >
                  {skill.icon}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">{skill.title}</h3>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    {skill.metric}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">{skill.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Tech Stack Pills with Category Filtering & Counter */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 mb-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">{t.about.toolsHeading}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              {filteredTools.length} / {tools.length}
            </span>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25 }}
                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${tool.iconColor}`} />
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                    {tool.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                  {tool.typeLabel}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* 4-Step Production Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="glass p-8 rounded-3xl border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-8 text-center sm:text-left flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <span>
            {language === 'en'
              ? '3D Visual Engineering Pipeline'
              : language === 'ja'
              ? '3Dビジュアル制作パイプライン'
              : 'Alur Kerja Rekayasa Visual 3D'}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative p-5 rounded-2xl bg-white/5 border border-white/5"
            >
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 font-mono">
                {step.step}
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
