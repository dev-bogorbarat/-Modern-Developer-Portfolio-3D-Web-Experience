import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileCode,
  Sparkles,
  Copy,
  Check,
  UserCheck,
  Scale,
  Award,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const citationText = `Portofolio 3D & WebGL Architecture by Pardan Muklis (pardan3d) © 2026. Contact: pardanmukslin@gmail.com. Code licensed under MIT, Creative assets under CC BY-NC 4.0.`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="license-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="license-modal-content"
        className="glass-card max-w-2xl w-full rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{t.licenseModal.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono border border-cyan-500/30">
                  {language === 'en' ? 'Official' : language === 'ja' ? '公式' : 'Resmi'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{t.licenseModal.subtitle}</p>
            </div>
          </div>

          <button
            id="btn-close-license-modal"
            type="button"
            onClick={onClose}
            aria-label={t.licenseModal.close}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Creator Identification Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900/60 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-500/25 shrink-0">
              PM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-cyan-400 font-mono font-semibold">
                  {language === 'en'
                    ? 'Creator & Lead Author:'
                    : language === 'ja'
                    ? '制作者・著作権者:'
                    : 'Pencipta & Pembuat Karya:'}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">Pardan Muklis</h4>
              <p className="text-xs text-slate-300 font-mono">
                Brand: <strong className="text-cyan-300">pardan3d</strong> • Email:{' '}
                <a
                  href="mailto:pardanmukslin@gmail.com"
                  className="text-cyan-400 hover:underline"
                >
                  pardanmukslin@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
              <UserCheck className="w-3 h-3" />
              <span>{t.licenseModal.verifiedCreator}</span>
            </span>
          </div>
        </div>

        {/* Dual License Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Code Architecture License */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
              <FileCode className="w-4 h-4" />
              <span>{t.licenseModal.codeTitle}</span>
            </div>
            <div className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              MIT License (Open Source)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Programming code architecture, WebGL Three.js integrations, and frontend components may be studied, repurposed, and modified openly with original copyright attribution.'
                : language === 'ja'
                ? 'コードアーキテクチャ、Three.js実装、UIコンポーネントはMITライセンスの下でオープンに学習・再利用・改変可能です。'
                : 'Arsitektur kode pemrograman, integrasi WebGL Three.js, dan komponen UI frontend dapat dipelajari, digunakan kembali, serta dimodifikasi secara bebas dengan tetap menyertakan pemberitahuan hak cipta pembuat asli.'}
            </p>
          </div>

          {/* 2. Visual & 3D Assets License */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{t.licenseModal.artTitle}</span>
            </div>
            <div className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
              CC BY-NC 4.0
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'en'
                ? '3D artistic concepts, bespoke visual assets, custom GLSL shaders, and portfolio branding are protected under Creative Commons Non-Commercial terms. Commercial reuse requires license agreement.'
                : language === 'ja'
                ? '3Dビジュアルコンセプト、カスタムシェーダー、ブランド表現はCC BY-NC 4.0で保護されています。商用利用にはライセンス許諾が必要です。'
                : 'Konsep karya seni 3D, materi visual, shader kustom, dan identitas portofolio dilindungi oleh Creative Commons Non-Komersial. Penggunaan untuk tujuan komersial memerlukan lisensi eksklusif langsung dari Pardan Muklis.'}
            </p>
          </div>
        </div>

        {/* Client & Commercial Rights */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <Award className="w-4 h-4" />
            <span>{t.licenseModal.clientTitle}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'For commissioned client projects, full commercial intellectual property (IP) is transferred exclusively to the client upon project delivery and contractual completion.'
              : language === 'ja'
              ? '受託制作案件においては、契約および納品完了時に完全な商用知的財産権（フルIP）がクライアントへ譲渡されます。'
              : 'Untuk proyek komersial, klien yang memesan layanan pembuatan website 3D atau aset visual akan menerima hak kepemilikan komersial penuh (full intellectual property transfer) sesuai perjanjian kerja sama kontrak proyek.'}
          </p>
        </div>

        {/* Open Source Attributions */}
        <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-white/10">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.licenseModal.thirdPartyTitle}:</span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 font-mono">
            <li className="p-2 rounded-lg bg-black/20 border border-white/5">
              <strong className="text-slate-200 block">Three.js</strong> MIT License (mrdoob)
            </li>
            <li className="p-2 rounded-lg bg-black/20 border border-white/5">
              <strong className="text-slate-200 block">React 19</strong> MIT License (Meta)
            </li>
            <li className="p-2 rounded-lg bg-black/20 border border-white/5">
              <strong className="text-slate-200 block">Tailwind CSS</strong> MIT License
            </li>
            <li className="p-2 rounded-lg bg-black/20 border border-white/5">
              <strong className="text-slate-200 block">Cannon.es</strong> MIT License
            </li>
          </ul>
        </div>

        {/* Citation Copy Box */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300 font-mono truncate max-w-full">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-0.5">
              {t.licenseModal.copyCitation}:
            </span>
            <span className="text-[11px] text-cyan-300 select-all block break-all sm:break-normal">
              © 2026 Pardan Muklis (pardan3d) • MIT & CC BY-NC 4.0
            </span>
          </div>
          <button
            id="btn-copy-citation"
            type="button"
            onClick={handleCopyCitation}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer border border-white/15"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">{t.licenseModal.citationCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.licenseModal.copyCitation}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
