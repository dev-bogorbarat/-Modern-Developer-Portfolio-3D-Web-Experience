import React, { useState } from 'react';
import { ExternalLink, Sparkles, Box, Eye, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { t, language } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<'all' | 'webgl' | 'web' | 'design'>('all');

  const projects: ProjectItem[] = [
    {
      id: 'showroom-3d',
      title: 'Interactive 3D Showroom',
      category: 'webgl',
      subtitle:
        language === 'en'
          ? 'Virtual Product Showcase with Three.js & PBR Shaders'
          : language === 'ja'
          ? 'Three.js＆PBRシェーダーによるバーチャル製品ショールーム'
          : 'Virtual Product Showcase dengan Three.js & PBR Shaders',
      description:
        language === 'en'
          ? 'Immersive 3D virtual showroom designed for interactive product inspection with dynamic lights and 360-degree orbital rotation.'
          : language === 'ja'
          ? 'ダイナミックライティングと360度オービタル回転で製品を検査できる没入型3Dバーチャル展示体験。'
          : 'Pengalaman ruang pameran virtual 3D untuk memamerkan produk secara interaktif dengan pencahayaan dinamis dan rotasi 360 derajat.',
      fullDescription:
        language === 'en'
          ? 'This WebGL-powered 3D showroom is built for e-commerce and automotive experiences. Leveraging Three.js PBR materials, dynamic camera transitions, and real-time shadow mapping without impacting client performance.'
          : language === 'ja'
          ? 'eコマースや自動車業界向けに設計されたWebGLベースの3Dショールーム。Three.js PBRマテリアル、カメラ遷移、リアルタイムシャドウマッピングを軽量に実現。'
          : 'Showroom 3D berbasis WebGL ini dirancang untuk industri e-commerce dan otomotif futuristik. Memanfaatkan Three.js PBR (Physically Based Rendering) materials, dynamic camera transitions, dan shadow mapping real-time tanpa membebani performa perangkat klien.',
      tags: ['Three.js', 'WebGL', 'PBR Materials', 'Interactive 3D'],
      gradient: 'from-cyan-500 to-purple-600',
      badge: language === 'en' ? 'WebGL Highlight #1' : language === 'ja' ? '注目作品 #1' : 'Unggulan WebGL #1',
      demoType: 'showroom',
      features:
        language === 'en'
          ? [
              '360° orbital rotation & intuitive camera zoom',
              'Real-time material swap (Carbon, Chrome, Matte)',
              'Interactive studio lighting with 3 light sources',
              'Stable 60 FPS rendering on desktop and mobile',
            ]
          : language === 'ja'
          ? [
              '360°オービタル回転と直感的なズーム操作',
              'リアルタイムなマテリアル変更（カーボン、クロム、マット）',
              '3点光源によるインタラクティブなスタジオ照明',
              'デスクトップおよびスマートフォンで安定した60FPS動作',
            ]
          : [
              'Rotasi orbital 360° & Zoom kamera intuitif',
              'Material swap real-time (Carbon, Chrome, Matte)',
              'Lighting studio interaktif dengan 3 titik sumber cahaya',
              'Rendering stabil di 60 FPS pada desktop dan smartphone',
            ],
    },
    {
      id: 'game-concept-3d',
      title: '3D Web Game Concept',
      category: 'webgl',
      subtitle:
        language === 'en'
          ? 'Physics & Motion Browser Arcade Experiment'
          : language === 'ja'
          ? '物理演算とモーション制御ブラウザゲームの実験'
          : 'Eksperimen Mini Game Fisika & Kontrol Gerak',
      description:
        language === 'en'
          ? 'Browser-native mini game experiment driven by WebGL logic, gravity physics, and high-frequency raycasting hitboxes.'
          : language === 'ja'
          ? 'WebGLロジック、重力物理演算、高速レイキャスティングによるブラウザネイティブのミニゲーム実験。'
          : 'Eksperimen mini game berbasis logika WebGL dan kontrol interaktif browser dengan fisika gravitasi dan partikel.',
      fullDescription:
        language === 'en'
          ? 'A browser-native 3D arcade concept pushing the envelope on WebGL render speed and smooth collision detection (raycasting / bounding box) without plugins. Integrates spatial audio for maximum immersion.'
          : language === 'ja'
          ? '追加プラグインなしで高速描画と衝突判定（レイキャスティング／バウンディングボックス）の限界に挑む3Dアーケードゲーム実験。'
          : 'Eksperimen permainan arcade 3D browser-native yang menguji batas kecepatan rendering WebGL dan deteksi tabrakan (raycasting / bounding box) secara mulus tanpa plugin tambahan. Mengintegrasikan audio spatial untuk pengalaman imersif penuh.',
      tags: ['WebGL', 'Physics Engine', 'Game Loop', 'Raycasting'],
      gradient: 'from-purple-500 to-pink-600',
      badge: language === 'en' ? 'WebGL Highlight #2' : language === 'ja' ? '注目作品 #2' : 'Unggulan WebGL #2',
      demoType: 'game',
      features:
        language === 'en'
          ? [
              '60 FPS real-time raycaster collision detection',
              'Score counting and polygon burst particles upon impact',
              'Supports keyboard (WASD), mouse, and touch joystick',
              'Modular event-bus state architecture',
            ]
          : language === 'ja'
          ? [
              '60FPSのリアルタイムレイキャスター衝突検出',
              'スコア集計と標的破壊時のポリゴン爆破パーティクル',
              'キーボード（WASD）、マウス、タッチ操作対応',
              'イベントバスベースのモジュール化状態管理',
            ]
          : [
              'Deteksi tabrakan raycaster 60 FPS real-time',
              'Sistem skor dan partikel ledakan poligon saat target hancur',
              'Dukungan kontrol keyboard (WASD), mouse, dan joystick layar sentuh',
              'Arsitektur state modular berbasis event bus',
            ],
    },
    {
      id: 'cyber-visualizer',
      title: 'Audio-Reactive Cyber Sphere',
      category: 'design',
      subtitle:
        language === 'en'
          ? 'WebGL Sound Spectrum Parametric Geometry'
          : language === 'ja'
          ? 'WebGL音声スペクトラムによる幾何学ビジュアライザ'
          : 'Visualisasi Spektrum Suara Geometri WebGL',
      description:
        language === 'en'
          ? 'Parametric audio visualizer dynamically displacing 3D geometric vertices to the rhythm of sound frequency data.'
          : language === 'ja'
          ? '音の周波数リズムに合わせて3Dジオメトリの頂点を動的に変形させるパラメトリック音響視覚化。'
          : 'Visualisasi spektrum audio parametrik yang meregangkan vertex geometri 3D secara dinamis mengikuti ritme nada.',
      fullDescription:
        language === 'en'
          ? 'Audio-visual experiment analyzing Web Audio API FFT data to warp normal vectors and vertex displacement on a 3D Icosahedron in real time with neon wireframe glow.'
          : language === 'ja'
          ? 'Web Audio APIのFFT解析データに基づき、3D二十面体の法線ベクトルと頂点変位をネオン発光とともにリアルタイム制御。'
          : 'Eksperimen audio visual interaktif yang menganalisis Web Audio API FFT data untuk mendistorsi normal vector dan vertex displacement pada Icosahedron 3D secara langsung dengan efek neon wireframe futuristik.',
      tags: ['GLSL Shaders', 'Web Audio API', 'Frequency Mesh', 'Creative Coding'],
      gradient: 'from-blue-500 to-cyan-400',
      badge: language === 'en' ? 'Shader Visual' : language === 'ja' ? 'シェーダー視覚' : 'Shader Visual',
      demoType: 'visualizer',
      features:
        language === 'en'
          ? [
              'Web Audio API FFT Fast-Fourier Transform analyser',
              'Custom GLSL vertex shader distortion loop',
              'Bass-reactive color grading changes',
              'High-resolution frame screenshot export',
            ]
          : language === 'ja'
          ? [
              'Web Audio APIによる高速フーリエ変換（FFT）解析',
              'カスタムGLSL頂点シェーダーによる歪みアニメーション',
              '低音ビートに連動するカラーグレーディング変化',
              '高解像度フレームキャプチャ出力',
            ]
          : [
              'Web Audio API FFT Fast-Fourier Transform analyser',
              'Custom GLSL vertex shader distortion loop',
              'Palet warna reaktif otomatis berdasarkan intensitas bass',
              'Ekspor screenshot frame resolusi tinggi',
            ],
    },
    {
      id: 'spatial-ui-dashboard',
      title: 'Spatial UI & Futuristic Web',
      category: 'web',
      subtitle:
        language === 'en'
          ? 'Spatial Web Architecture with Glassmorphism & Depth'
          : language === 'ja'
          ? 'グラスモフィズムと奥行き感を持つ空間Web UI'
          : 'Antarmuka Spasial Web dengan Glassmorphism & Depth',
      description:
        language === 'en'
          ? 'State-of-the-art web interface featuring calibrated spatial depth, fluid particle transitions, and high typographic contrast.'
          : language === 'ja'
          ? '洗練された空間的奥行き、滑らかなパーティクル演出、高コントラストなタイポグラフィを備えた最新Web UI。'
          : 'Desain antarmuka web modern dengan efek kedalaman spasial, animasi transisi partikel, dan tipografi berkelas tinggi.',
      fullDescription:
        language === 'en'
          ? 'Interactive web experience showcasing multi-layer modern glassmorphism with high performance, strict WCAG AA contrast compliance, and buttery-smooth gestures.'
          : language === 'ja'
          ? 'マルチレイヤー構造の高性能グラスモフィズム、WCAG AA準拠の視認性、滑らかな操作性を両立させたWebシステム。'
          : 'Aplikasi web interaktif dengan arsitektur multi-layer, menghadirkan estetika glassmorphism modern dengan performa tinggi, kontras WCAG AA yang solid, dan interaksi responsif.',
      tags: ['React 19', 'Tailwind CSS', 'Spatial UI', 'Motion'],
      gradient: 'from-emerald-500 to-teal-400',
      badge: language === 'en' ? 'Frontend UI/UX' : language === 'ja' ? 'フロントエンドUI' : 'Frontend UI/UX',
      demoType: 'concept',
      features:
        language === 'en'
          ? [
              'High-performance glassmorphism with CSS fallback',
              'Coordinated layout animations with 0 Cumulative Layout Shift',
              'Adaptive color themes with comfortable eye contrast',
              'Fluid responsiveness across all viewport sizes',
            ]
          : language === 'ja'
          ? [
              'CSSフォールバック付きの高パフォーマンス・グラスモフィズム',
              'レイアウトシフト（CLS）ゼロの滑らかなアニメーション',
              '目に優しい快適なコントラストと適応型カラーテーマ',
              '全デバイスサイズに対応する完全レスポンシブ設計',
            ]
          : [
              'Desain glassmorphism berkinerja tinggi dengan fallback CSS',
              'Animasi layout terkoordinasi tanpa layout shift (CLS)',
              'Sistem tema warna fleksibel dengan kontras ramah mata',
              'Sepenuhnya responsif untuk semua ukuran viewport',
            ],
    },
  ];

  const filterTabs = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'webgl', label: t.projects.filterWebGL },
    { id: 'design', label: t.projects.filterDesign },
    { id: 'web', label: t.projects.filterWeb },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300 mb-3">
          <Box className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.projects.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {t.projects.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          {t.projects.subtitle}
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-12"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/30'
                : 'glass text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid with Motion Staggered Scroll Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: (index % 2) * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors duration-300 group shadow-xl flex flex-col justify-between"
            >
              {/* Visual Canvas Card Header / 3D Holographic Banner */}
              <div className="h-56 bg-slate-900/90 flex flex-col items-center justify-center relative overflow-hidden p-6 border-b border-white/5">
                {/* Animated Glowing Orb */}
                <div
                  className={`w-32 h-32 bg-gradient-to-tr ${project.gradient} rounded-full blur-2xl group-hover:scale-150 transition duration-700 opacity-60`}
                />

                {/* Holographic Wireframe Icon overlay */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md flex items-center justify-center text-cyan-300 group-hover:scale-110 transition duration-300 shadow-inner">
                    <Box className="w-7 h-7" />
                  </div>
                  <span className="text-slate-300 font-mono text-xs tracking-wider uppercase bg-black/50 px-3 py-1 rounded-full border border-white/10">
                    [ {project.title} ]
                  </span>
                </div>

                {/* Badge top right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur border border-white/10 text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {project.badge}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-sm backdrop-blur-xs cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>
                    {language === 'en'
                      ? 'Open Interactive 3D Viewer'
                      : language === 'ja'
                      ? '3Dインタラクティブビューアを開く'
                      : 'Buka Viewer 3D Interaktif'}
                  </span>
                </button>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-cyan-300 transition">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/5 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer group-hover:translate-x-1"
                  >
                    <span>{t.projects.btnViewDetails}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    WebGL Ready
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
