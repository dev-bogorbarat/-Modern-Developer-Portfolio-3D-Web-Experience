import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircleQuestion, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  details?: string[];
}

export const FAQSection: React.FC = () => {
  const { t, language } = useTranslation();
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getFaqData = (): FAQItem[] => {
    if (language === 'en') {
      return [
        {
          id: 'faq-1',
          category: '3D Services',
          question: 'What 3D web development services do you offer?',
          answer:
            'I provide end-to-end solutions for next-generation interactive 3D web experiences, from spatial concept art to production code deployment.',
          details: [
            'Interactive 3D Product Showrooms for modern e-commerce and automotive brands',
            'Immersive WebGL & Three.js landing pages with real-time lighting and parallax',
            'Browser-native WebGL arcade mini games and physics simulations',
            'Custom GLSL shaders and audio-reactive frequency spectrum art',
            'Performance profiling & 3D mesh compression for fast mobile loading',
          ],
        },
        {
          id: 'faq-2',
          category: 'Formats & Assets',
          question: 'Which 3D file formats are supported for the web?',
          answer:
            'The recommended industry standards are GLTF (.gltf) and GLB (.glb) for their binary transmission efficiency and Draco compression support.',
          details: [
            'GLTF / GLB (packaged with Draco compression & KTX2 textures for rapid loading)',
            'OBJ / MTL & FBX (converted and optimized into production-ready GLB)',
            'Procedural Three.js geometries (0KB external file weight for instantaneous start)',
            'PBR Texture channels (Albedo, Normal, Roughness, Metalness, Ambient Occlusion)',
          ],
        },
        {
          id: 'faq-3',
          category: 'Mobile Performance',
          question: 'How do 3D scenes perform on smartphones and tablets?',
          answer:
            'All 3D experiences are engineered with a performance-first mindset. Scenes undergo rigorous stress testing to maintain a consistent 60 FPS on mid-range devices.',
          details: [
            'Dynamic Pixel Ratio capping (limited to 2x to eliminate GPU thermal throttling)',
            'Automated Frustum Culling & Level of Detail (LOD) mesh swaps',
            'Optimized low-poly topology with normal maps for crisp details without vertex bloat',
            'Full touch gesture support (orbital rotate, pinch-to-zoom, fling inertia)',
          ],
        },
        {
          id: 'faq-4',
          category: 'Timeline & Process',
          question: 'What is the estimated delivery timeframe for a 3D web project?',
          answer:
            'Timelines depend on scene complexity, interactive triggers, and whether 3D models are already available.',
          details: [
            'Basic interactive 3D landing page: 1 - 2 weeks',
            'Virtual 3D showroom with multi-material configurator: 2 - 3 weeks',
            'Complex spatial simulation or WebGL mini game: 3 - 5 weeks',
            'Every project includes milestone reviews, staging previews, and post-launch support',
          ],
        },
        {
          id: 'faq-5',
          category: 'Web Integration',
          question: 'Can these 3D components integrate with React, Next.js, or existing sites?',
          answer:
            'Yes, entirely seamlessly. 3D components are built as modular, decoupled modules that embed directly into existing React, Next.js, Vue, or static HTML web structures.',
          details: [
            'Fully compatible with React 19, Next.js App Router, Vite, and Vanilla JS',
            'Integrates with standard frontend state management systems',
            'Zero third-party plugins or browser extensions needed for end users',
          ],
        },
        {
          id: 'faq-6',
          category: 'Asset Creation',
          question: 'Do I need to supply existing 3D models, or can you create them from scratch?',
          answer:
            'Both workflows are welcome! If you have models from internal CAD or 3D designers, I clean topology and optimize them for WebGL. If starting from scratch, I model custom meshes, synthesize PBR textures, and design studio lighting aligned with your brand identity.',
        },
        {
          id: 'faq-7',
          category: 'License & Copyright',
          question: 'How are intellectual property and licenses handled for code and 3D assets?',
          answer:
            'All portfolio assets are transparently governed under a dual-licensing framework authored by Pardan Muklis:',
          details: [
            'Web Code Architecture & Components: Licensed under the MIT License (open for learning and development)',
            'Original 3D Artwork & Visual Concepts: Licensed under Creative Commons Attribution-NonCommercial (CC BY-NC 4.0)',
            'Commissioned Client Projects: Full commercial IP ownership is transferred exclusively to the client upon final delivery',
            'Review complete license documentation via the license button in the footer',
          ],
        },
      ];
    }

    if (language === 'ja') {
      return [
        {
          id: 'faq-1',
          category: '3D制作サービス',
          question: 'どのような3D Web開発サービスを提供していますか？',
          answer:
            '空間UIの構想から本番環境へのコード実装まで、次世代のインタラクティブ3D Web体験を包括的に提供しています。',
          details: [
            'eコマースおよび自動車ブランド向けのインタラクティブ3D製品ショールーム',
            'WebGL＆Three.jsを活用した没入型ランディングページと視差演出',
            'ブラウザネイティブのWebGLミニゲームおよび物理演算シミュレーション',
            '特注GLSLシェーダーと音響連動スペクトラムビジュアライザ',
            'モバイル端末に向けた3Dアセット圧縮と60FPSパフォーマンス最適化',
          ],
        },
        {
          id: 'faq-2',
          category: '対応フォーマット',
          question: 'Webで利用できる3Dモデル形式は何ですか？',
          answer:
            'データ伝送効率と読み込み速度の観点から、GLTF (.gltf) および GLB (.glb) を推奨形式として採用しています。',
          details: [
            'GLTF / GLB（Draco圧縮およびKTX2テクスチャによる超高速ロード）',
            'OBJ / FBX（Web用に軽量化・GLB形式へ最適化変換）',
            'Three.jsプロシージャルジオメトリ（外部ファイル不要で即時表示）',
            'PBRテクスチャ（アルベド、ノーマル、ラフネス、メタルネス、AO）',
          ],
        },
        {
          id: 'faq-3',
          category: 'モバイル最適化',
          question: 'スマートフォンやタブレットでの動作パフォーマンスはどうですか？',
          answer:
            'すべての制作物はパフォーマンス第一で設計されています。中位機種のスマートフォンでも安定して60FPSを維持できるよう厳格にテストしています。',
          details: [
            'GPU負荷を防止する動的ピクセル比（最大2倍に制限）',
            '視錐台カリング（Frustum Culling）と自動詳細度（LOD）制御',
            'ノーマルマップを活用した軽量ローポリゴン設計',
            'タッチジェスチャー対応（オービタル回転、ピンチズーム、慣性スワイプ）',
          ],
        },
        {
          id: 'faq-4',
          category: '制作期間とフロー',
          question: '3D Webプロジェクトの標準的な制作期間はどのくらいですか？',
          answer:
            'インタラクションの複雑さや3Dアセットの準備状況によって異なります。',
          details: [
            '基本的な3Dランディングページ: 1〜2週間',
            'マテリアル切替付きバーチャル3Dショールーム: 2〜3週間',
            '複雑な空間シミュレーションまたはWebGLゲーム: 3〜5週間',
            '定期的な進捗レビュー、ステージング確認、公開後サポートを含みます',
          ],
        },
        {
          id: 'faq-5',
          category: 'Web統合性',
          question: '既存のWebサイト（React / Next.js / WordPress等）に組み込めますか？',
          answer:
            'はい、完全にモジュール化されているため、既存のReact、Next.js、Vue、静的HTMLサイトへ簡単に埋め込み可能です。',
          details: [
            'React 19、Next.js App Router、Vite、Vanilla JSに完全対応',
            '既存のフロントエンド状態管理と自然に連携可能',
            '訪問者にプラグインや追加アプリのインストールを要求しません',
          ],
        },
        {
          id: 'faq-6',
          category: 'アセット制作',
          question: '3Dモデルは自社で用意する必要がありますか？',
          answer:
            'どちらでも対応可能です。既存のCADモデルがあればWeb用に最適化します。素材がない場合は、ゼロから3Dモデル、PBRテクスチャ、照明環境を制作いたします。',
        },
        {
          id: 'faq-7',
          category: 'ライセンスと権利',
          question: 'コードおよび3D制作物の著作権・ライセンス規定はどうなっていますか？',
          answer:
            '当ポートフォリオの全成果物は、Pardan Muklisによって明確に二重ライセンス管理されています：',
          details: [
            'Webコードアーキテクチャ: MIT License（学習・オープンな再利用可能）',
            'オリジナル3Dアート＆ビジュアル: Creative Commons 表示-非営利 (CC BY-NC 4.0)',
            '特注受託案件: 納品完了時に完全な商用著作権がクライアントへ譲渡されます',
            'フッターのライセンスボタンより完全な法的条項をご確認いただけます',
          ],
        },
      ];
    }

    // Default: Indonesian
    return [
      {
        id: 'faq-1',
        category: 'Layanan 3D',
        question: 'Layanan pengembangan 3D apa saja yang Anda tawarkan?',
        answer:
          'Saya menyediakan solusi menyeluruh untuk pengalaman web interaktif 3D generasi terbaru, mulai dari tahap konseptual hingga integrasi kode produksi.',
        details: [
          'Interactive 3D Product Showroom untuk e-commerce dan otomotif',
          'Landing Page Imersif berbasis WebGL & Three.js dengan efek parallax spasial',
          'Eksperimen Mini Game & Simulasi Fisika WebGL langsung di browser',
          'Custom GLSL Shaders & Animasi spektrum visual audio-reaktif',
          'Optimasi performa & kompresi aset 3D untuk web',
        ],
      },
      {
        id: 'faq-2',
        category: 'Format & Aset',
        question: 'Format file model 3D apa saja yang dapat digunakan?',
        answer:
          'Standar utama yang paling direkomendasikan untuk web adalah GLTF (.gltf) dan GLB (.glb) karena efisiensi transmisi datanya. Namun saya juga mendukung berbagai format lain.',
        details: [
          'GLTF / GLB (dengan Draco compression & KTX2 texture formats untuk loading instan)',
          'OBJ / MTL & FBX (akan dikonversi dan dioptimalkan ke GLB)',
          'Geometri prosedural Three.js (tanpa file eksternal untuk kecepatan maksimal)',
          'PBR Textures (Albedo, Normal, Roughness, Metalness, Ambient Occlusion)',
        ],
      },
      {
        id: 'faq-3',
        category: 'Performa Mobile',
        question: 'Bagaimana performa pengalaman 3D di perangkat smartphone & tablet?',
        answer:
          'Semua proyek 3D saya dibangun dengan prinsip performance-first. Setiap adegan diuji secara ketat agar stabil pada 60 FPS di desktop maupun ponsel mid-range.',
        details: [
          'Dynamic Pixel Ratio Capping (maksimal 2x untuk mencegah throttling GPU)',
          'Frustum Culling & Level of Detail (LOD) otomatis',
          'Low-poly modeling dengan normal mapping untuk visual detail tanpa beban render tinggi',
          'Fallback ramah sentuhan (touch gesture orbit & pinch zoom)',
        ],
      },
      {
        id: 'faq-4',
        category: 'Waktu & Alur Kerja',
        question: 'Berapa lama estimasi waktu pengerjaan proyek 3D?',
        answer:
          'Waktu pengerjaan bervariasi bergantung pada kompleksitas interaksi dan ketersediaan aset 3D yang siap pakai.',
        details: [
          'Landing page 3D interaktif dasar: 1 - 2 minggu',
          'Virtual Showroom 3D multi-produk dengan kustomisasi material: 2 - 3 minggu',
          'Simulasi spasial / Game WebGL kompleks: 3 - 5 minggu',
          'Setiap proyek mencakup fase tinjauan berkala, staging preview, dan garansi pasca rilis',
        ],
      },
      {
        id: 'faq-5',
        category: 'Integrasi Web',
        question: 'Apakah bisa diintegrasikan ke website yang sudah ada (React / Next.js / Vue / WordPress)?',
        answer:
          'Ya, sangat fleksibel. Komponen 3D dikemas secara mandiri dan modular, sehingga dapat langsung disematkan ke dalam aplikasi React, Next.js, Vue, atau bahkan website statis HTML tanpa merusak kode yang sudah ada.',
        details: [
          'Mendukung React 19, Next.js App Router, Vite, dan Vanilla JS',
          'Kompatibel dengan state management frontend yang Anda gunakan',
          'Tidak memerlukan plugin pihak ketiga atau instalasi aplikasi tambahan bagi pengunjung',
        ],
      },
      {
        id: 'faq-6',
        category: 'Pembuatan Aset',
        question: 'Apakah saya harus menyediakan aset 3D sendiri, atau Anda yang membuatnya?',
        answer:
          'Keduanya memungkinkan! Jika Anda sudah memiliki model 3D dari tim internal atau desainer CAD, saya akan melakukan pembersihan topologi dan optimasi WebGL. Jika belum memiliki aset, saya dapat membuat model 3D kustom, tekstur PBR, dan pencahayaan studio langsung dari awal sesuai brand guideline Anda.',
      },
      {
        id: 'faq-7',
        category: 'Lisensi & Hak Cipta',
        question: 'Bagaimana ketentuan lisensi dan hak cipta untuk karya dan proyek 3D?',
        answer:
          'Seluruh karya portofolio pardan3d dilisensikan secara transparan oleh Pardan Muklis dengan skema ganda:',
        details: [
          'Arsitektur Kode & Komponen Web: Dilisensikan di bawah MIT License (bebas dipelajari & dikembangkan secara terbuka)',
          'Konsep Karya Seni & Aset 3D Orisinal: Dilisensikan di bawah Creative Commons Atribusi-NonKomersial (CC BY-NC 4.0)',
          'Proyek Kustom Klien: Hak kepemilikan komersial penuh (full commercial copyright) dialihkan secara eksklusif kepada klien setelah proyek selesai dan diserahterimakan',
          'Pemberitahuan lisensi lengkap dapat ditinjau langsung melalui tombol lisensi di bagian footer',
        ],
      },
    ];
  };

  const faqData = getFaqData();

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.faq.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {t.faq.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          {t.faq.subtitle}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqData.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div
              key={faq.id}
              className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/10 bg-slate-900/80'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Question Trigger Header */}
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={isOpen}
                className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer group"
              >
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'rotate-180 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-white/5 text-slate-400 border border-white/10 group-hover:text-white'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsible Answer Content */}
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5 animate-fadeIn">
                  <p className="mb-3">{faq.answer}</p>

                  {faq.details && (
                    <ul className="mt-3 space-y-2 bg-black/20 p-4 rounded-xl border border-white/5">
                      {faq.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <span className="text-cyan-400 mt-0.5 font-bold">▹</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Prompt Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl glass border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shrink-0">
            <MessageCircleQuestion className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg">
              {language === 'en'
                ? 'Have a Custom Question Regarding Your Project?'
                : language === 'ja'
                ? 'プロジェクトに関する個別の相談がありますか？'
                : 'Punya Pertanyaan Khusus Terkait Proyek Anda?'}
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {language === 'en'
                ? 'Consult technical feasibility and 3D visual concepts directly with no obligation.'
                : language === 'ja'
                ? '技術的な実現可能性や3Dビジュアルのアイデアについてお気軽にご相談ください。'
                : 'Konsultasikan spesifikasi teknis dan ide visual 3D Anda secara gratis.'}
            </p>
          </div>
        </div>

        <a
          href="#contact"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0 group"
        >
          <span>
            {language === 'en' ? 'Ask Directly' : language === 'ja' ? '直接問い合わせる' : 'Tanyakan Langsung'}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
