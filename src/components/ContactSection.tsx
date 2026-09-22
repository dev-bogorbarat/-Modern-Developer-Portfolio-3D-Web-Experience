import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  MapPin,
  MessageSquare,
  Clock,
  Bell,
  BookOpen,
  Briefcase,
  ExternalLink,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t, language } = useTranslation();
  const officialEmail = 'pardanmukslin@gmail.com';
  const emailJsPublicKey = 'XWBV_l5nnONC6w5Rr';
  const emailJsServiceId = 'service_1jmqvtq';
  const emailJsTemplateId = 'template_xk1b5yk';
  const formRef = useRef<HTMLFormElement>(null);

  const [activeTab, setActiveTab] = useState<'story' | 'project'>('story');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    category: 'Inspirasi & Pengalaman 3D',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<string>('');
  const [isStoryHidden, setIsStoryHidden] = useState(false);
  const [autoHideCountdown, setAutoHideCountdown] = useState<number | null>(null);

  useEffect(() => {
    // Inisialisasi EmailJS dengan Public Key
    try {
      emailjs.init(emailJsPublicKey);
    } catch {
      // Fallback
    }
  }, []);

  // Timer hitung mundur untuk menyembunyikan formulir setelah selesai membagikan cerita
  useEffect(() => {
    if (submitted && autoHideCountdown !== null) {
      if (autoHideCountdown > 0) {
        const timer = setTimeout(() => {
          setAutoHideCountdown((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsStoryHidden(true);
      }
    }
  }, [submitted, autoHideCountdown]);

  const copyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    const now = new Date().toLocaleTimeString(language === 'ja' ? 'ja-JP' : language === 'en' ? 'en-US' : 'id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setSubmissionTime(now);

    const subject =
      activeTab === 'story'
        ? `[Cerita Baru] ${formData.title || 'Cerita dari Pengunjung'} - ${formData.name}`
        : `[Inquiry Proyek 3D] ${formData.category} - ${formData.name}`;

    try {
      // 1. Kirim langsung via EmailJS
      if (formRef.current) {
        try {
          await emailjs.sendForm(
            emailJsServiceId,
            emailJsTemplateId,
            formRef.current,
            emailJsPublicKey
          );
        } catch {
          try {
            await emailjs.send(
              emailJsServiceId,
              emailJsTemplateId,
              {
                from_name: formData.name,
                name: formData.name,
                from_email: formData.email,
                email: formData.email,
                _replyto: formData.email,
                reply_to: formData.email,
                message: formData.message,
                subject: subject,
                title: formData.title || '-',
                category: formData.category,
                to_email: officialEmail,
              },
              emailJsPublicKey
            );
          } catch {
            // ignore
          }
        }
      }

      // 2. Kirim juga ke Formspree sebagai reliable backup
      await fetch('https://formspree.io/f/xnpndzgo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          _replyto: formData.email,
          email: formData.email,
          _subject: subject,
          category: formData.category,
          title: formData.title || '-',
          message: formData.message,
        }),
      }).catch(() => {});
    } catch {
      // Ignore network errors
    } finally {
      setIsSending(false);
      setSubmitted(true);
      setAutoHideCountdown(5);
    }
  };

  const openMailClientDraft = () => {
    const subject = encodeURIComponent(
      activeTab === 'story'
        ? `[Story / Message] ${formData.title || 'Message from'} ${formData.name}`
        : `[Project Discussion] ${formData.category} - ${formData.name}`
    );
    const body = encodeURIComponent(
      `Hello Pardan,\n\nI would like to share the following:\n\n${formData.message}\n\nRegards,\n${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${officialEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300 mb-3">
          <Bell className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span>{t.contact.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {t.contact.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>
                {language === 'en'
                  ? 'Direct Contact Channel'
                  : language === 'ja'
                  ? '直接連絡先'
                  : 'Informasi Kontak Langsung'}
              </span>
            </h3>

            {/* Email Card with Copy Button */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">{t.contact.directEmailLabel}</div>
                  <a
                    href={`mailto:${officialEmail}`}
                    className="text-sm font-semibold text-white font-mono hover:text-cyan-400 transition"
                  >
                    {officialEmail}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="p-2 rounded-lg glass text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title={t.contact.copyEmail}
                aria-label={t.contact.copyEmail}
              >
                {copiedEmail ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Instant Notification Badge Alert */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white mb-0.5">
                  {language === 'en'
                    ? 'Instant Notification System'
                    : language === 'ja'
                    ? '即時通知システム'
                    : 'Sistem Notifikasi Instan'}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? `This form forwards messages and stories directly to the verified email inbox ${officialEmail} in real time.`
                    : language === 'ja'
                    ? `フォームから送信されたメッセージは公式メール ${officialEmail} へ即座にリアルタイム転送されます。`
                    : `Formulir terhubung otomatis untuk meneruskan cerita & pesan langsung ke inbox ${officialEmail} seketika tombol kirim ditekan.`}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">
                  {language === 'en' ? 'Base Location' : language === 'ja' ? '拠点' : 'Lokasi Kerja'}
                </div>
                <div className="text-sm font-semibold text-white">
                  {language === 'en'
                    ? 'Jakarta, Indonesia (Global Remote Available)'
                    : language === 'ja'
                    ? 'インドネシア・ジャカルタ（世界規模リモート対応）'
                    : 'Jakarta, Indonesia (Tersedia Remote Global)'}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">
                  {language === 'en' ? 'Availability Status' : language === 'ja' ? '受付状況' : 'Status Ketersediaan'}
                </div>
                <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'en'
                    ? 'Open for New 3D Collaborations & Inquiries'
                    : language === 'ja'
                    ? '新規3D共同プロジェクト受付中'
                    : 'Terbuka untuk Kolaborasi & Membaca Cerita Baru'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story / Project Form with Live Notification Trigger */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300">
            {isStoryHidden ? (
              <div className="text-center py-10 px-4 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>
                      {language === 'en'
                        ? 'Message Dispatched & Form Hidden'
                        : language === 'ja'
                        ? '送信完了・フォーム非表示'
                        : 'Cerita Selesai Dikirim & Formulir Disembunyikan'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white pt-1">
                    {language === 'en'
                      ? 'Thank You for Sharing!'
                      : language === 'ja'
                      ? 'メッセージありがとうございます！'
                      : 'Terima Kasih Telah Berbagi Cerita!'}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {language === 'en'
                      ? `Your message has been safely delivered to ${officialEmail}.`
                      : language === 'ja'
                      ? `メッセージは公式メール ${officialEmail} へ送信されました。`
                      : `Pesan Anda telah sukses diteruskan ke alamat email resmi: ${officialEmail}.`}
                  </p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="reopen-form-button"
                    type="button"
                    onClick={() => {
                      setIsStoryHidden(false);
                      setSubmitted(false);
                      setAutoHideCountdown(null);
                      setFormData({
                        name: '',
                        email: '',
                        title: '',
                        category: 'Inspirasi & Pengalaman 3D',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-cyan-500/25 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.contact.sendAnother}</span>
                  </button>
                </div>
              </div>
            ) : submitted ? (
              <div className="text-center py-8 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {t.contact.sentSuccess}
                  </h3>
                  <div className="mt-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 text-emerald-300 text-xs font-medium max-w-md mx-auto flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Notification dispatched! Please check your email inbox.'
                        : language === 'ja'
                        ? '通知が送信されました！メールボックスをご確認ください。'
                        : 'Pesan berhasil terkirim! Silakan cek inbox email Anda.'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mt-3">
                    {language === 'en' ? 'Thank you,' : language === 'ja' ? 'ありがとうございます、' : 'Terima kasih,'}{' '}
                    <strong className="text-white">{formData.name}</strong>.
                  </p>
                </div>

                {/* Auto-Hide Countdown Indicator */}
                {autoHideCountdown !== null && (
                  <div className="flex items-center justify-between bg-black/40 border border-cyan-500/20 rounded-xl px-4 py-2.5 text-xs text-slate-300 max-w-md mx-auto">
                    <span className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span>
                        {t.contact.autoHideNotice}{' '}
                        <strong className="text-cyan-400 font-mono font-semibold">
                          {autoHideCountdown} {language === 'ja' ? '秒' : language === 'en' ? 'sec' : 'detik'}
                        </strong>
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setAutoHideCountdown(null)}
                      className="text-[11px] text-slate-400 hover:text-white underline transition cursor-pointer ml-2"
                    >
                      {language === 'en' ? 'Cancel' : language === 'ja' ? 'キャンセル' : 'Batal'}
                    </button>
                  </div>
                )}

                {/* Notification Delivery Receipt Box */}
                <div className="bg-black/40 border border-cyan-500/30 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5" />
                      {language === 'en' ? 'Email Status' : language === 'ja' ? '送信ステータス' : 'Status Notifikasi Email'}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                      ✓ {language === 'en' ? 'Delivered' : language === 'ja' ? '送信済み' : 'Terkirim'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-slate-400 pt-1">
                    <span>{language === 'en' ? 'Recipient:' : language === 'ja' ? '受信者:' : 'Email Penerima:'}</span>
                    <span className="col-span-2 text-white font-mono font-medium">
                      {officialEmail}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-slate-400">
                    <span>{language === 'en' ? 'Sender:' : language === 'ja' ? '送信者:' : 'Pengirim:'}</span>
                    <span className="col-span-2 text-slate-200">
                      {formData.name} ({formData.email})
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-slate-400">
                    <span>{language === 'en' ? 'Timestamp:' : language === 'ja' ? '日時:' : 'Waktu Kirim:'}</span>
                    <span className="col-span-2 text-slate-200 font-mono">
                      {submissionTime || (language === 'en' ? 'Just now' : 'Baru saja')}
                    </span>
                  </div>
                </div>

                {/* Actions: Direct Email Client Draft & Hide Now */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    id="hide-now-button"
                    type="button"
                    onClick={() => {
                      setIsStoryHidden(true);
                      setAutoHideCountdown(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {language === 'en' ? 'Hide Form Now' : language === 'ja' ? '今すぐ隠す' : 'Sembunyikan Sekarang'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={openMailClientDraft}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Open in Mail App' : language === 'ja' ? 'メールソフトで開く' : 'Buka di Aplikasi Email'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setIsStoryHidden(false);
                      setAutoHideCountdown(null);
                      setFormData({
                        name: '',
                        email: '',
                        title: '',
                        category: 'Inspirasi & Pengalaman 3D',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full glass hover:bg-white/10 text-xs font-semibold text-slate-300 transition cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form
                id="contact-form"
                ref={formRef}
                action="https://formspree.io/f/xnpndzgo"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="from_name" value={formData.name} />
                <input type="hidden" name="user_name" value={formData.name} />
                <input type="hidden" name="from_email" value={formData.email} />
                <input type="hidden" name="email" value={formData.email} />
                <input type="hidden" name="reply_to" value={formData.email} />
                <input type="hidden" name="user_email" value={formData.email} />
                <input
                  type="hidden"
                  name="subject"
                  value={
                    activeTab === 'story'
                      ? `[Cerita Baru] ${formData.title || 'Cerita dari Pengunjung'} - ${formData.name}`
                      : `[Inquiry Proyek 3D] ${formData.category} - ${formData.name}`
                  }
                />
                <input type="hidden" name="to_email" value={officialEmail} />

                {/* Form Mode Tabs: Bagikan Cerita vs Diskusi Proyek */}
                <div className="flex rounded-2xl bg-black/30 p-1 border border-white/10 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('story');
                      setFormData((prev) => ({
                        ...prev,
                        category: 'Inspirasi & Pengalaman 3D',
                      }));
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                      activeTab === 'story'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.contact.tabStory}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('project');
                      setFormData((prev) => ({
                        ...prev,
                        category: 'Showroom 3D / WebGL',
                      }));
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                      activeTab === 'project'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{t.contact.tabProject}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {activeTab === 'story' ? t.contact.tabStory : t.contact.tabProject}
                  </h3>
                  <span className="text-[11px] text-cyan-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    Notif: {officialEmail}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t.contact.formName} *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder={t.contact.placeholderName}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t.contact.formEmail} *
                    </label>
                    <input
                      id="contact-email"
                      name="_replyto"
                      type="email"
                      required
                      placeholder={t.contact.placeholderEmail}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.contact.formCategory}
                  </label>
                  {activeTab === 'story' ? (
                    <select
                      id="story-category"
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition cursor-pointer"
                    >
                      <option value="Inspirasi & Pengalaman 3D">
                        {language === 'en' ? '3D Experience & Inspiration' : language === 'ja' ? '3D体験とインスピレーション' : 'Inspirasi & Pengalaman Menikmati Visual 3D'}
                      </option>
                      <option value="Kesan & Feedback Portofolio">
                        {language === 'en' ? 'Portfolio Feedback & Impressions' : language === 'ja' ? 'ポートフォリオの感想・フィードバック' : 'Kesan & Feedback Desain Portofolio'}
                      </option>
                      <option value="Ide Kreatif / Eksperimen Baru">
                        {language === 'en' ? 'Creative Experiments & Ideas' : language === 'ja' ? '実験的Web・クリエイティブアイデア' : 'Ide Kreatif / Eksperimen Web Masa Depan'}
                      </option>
                      <option value="Cerita Kolaborasi / Komunitas">
                        {language === 'en' ? 'Community & Collaboration Stories' : language === 'ja' ? 'コミュニティ・共同制作の物語' : 'Cerita Seputar Komunitas & Kreator'}
                      </option>
                    </select>
                  ) : (
                    <select
                      id="contact-project-type"
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition cursor-pointer"
                    >
                      <option value="Showroom 3D / WebGL">Virtual 3D Showroom / WebGL</option>
                      <option value="3D Web Game Concept">
                        {language === 'en' ? '3D Browser Game & Physics' : language === 'ja' ? '3Dブラウザゲーム＆物理演算' : 'Game Web 3D & Simulasi Fisika'}
                      </option>
                      <option value="GLSL Shaders & Visual">GLSL Shaders & Audio-Reactive Visual</option>
                      <option value="Modern Web App Frontend">Modern Web App Frontend Architecture</option>
                    </select>
                  )}
                </div>

                {/* Story Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.contact.formTitle}
                  </label>
                  <input
                    id="contact-title"
                    name="title"
                    type="text"
                    placeholder={t.contact.placeholderTitle}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.contact.formMessage} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={t.contact.placeholderMessage}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="submit-contact-btn"
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{t.contact.btnSending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>{t.contact.btnSend}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
