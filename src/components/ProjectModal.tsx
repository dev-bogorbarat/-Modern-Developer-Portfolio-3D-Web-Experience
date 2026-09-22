import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X, ExternalLink, Github, Layers, RotateCw, ArrowLeft } from 'lucide-react';
import { ProjectItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t, language } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [meshColor, setMeshColor] = useState('#06b6d4');

  const isInteractingRef = useRef(false);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!project || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const width = canvas.parentElement?.clientWidth || 400;
    const isMobile = window.innerWidth < 640;
    const height = isMobile ? 260 : 320;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    // Create 3D geometry depending on project
    let geometry: THREE.BufferGeometry;
    if (project.demoType === 'showroom') {
      geometry = new THREE.TorusKnotGeometry(2, 0.6, 128, 32);
    } else if (project.demoType === 'game') {
      geometry = new THREE.DodecahedronGeometry(2.3, 1);
    } else if (project.demoType === 'visualizer') {
      geometry = new THREE.IcosahedronGeometry(2.4, 3);
    } else {
      geometry = new THREE.BoxGeometry(3, 3, 3, 4, 4, 4);
    }

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(meshColor),
      roughness: 0.15,
      metalness: 0.85,
      wireframe: wireframeMode,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Orbit grid / platform base
    const grid = new THREE.GridHelper(10, 10, 0x06b6d4, 0x1e293b);
    grid.position.y = -2.8;
    scene.add(grid);

    // Mouse & Touch drag interaction with auto-rotate pause & resume
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocityX = 0;
    let velocityY = 0;

    const startInteraction = (clientX: number, clientY: number) => {
      isDragging = true;
      isInteractingRef.current = true;
      setIsInteracting(true);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
      previousMousePosition = { x: clientX, y: clientY };
      velocityX = 0;
      velocityY = 0;
    };

    const moveInteraction = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;

      velocityX = deltaX * 0.008;
      velocityY = deltaY * 0.008;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const stopInteraction = () => {
      if (!isDragging) return;
      isDragging = false;

      // Resume auto rotation after 2.5s of inactivity
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        isInteractingRef.current = false;
        setIsInteracting(false);
      }, 2500);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => startInteraction(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveInteraction(e.clientX, e.clientY);
    const onMouseUp = () => stopInteraction();

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        moveInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => stopInteraction();

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        mesh.rotation.y += velocityX;
        mesh.rotation.x += velocityY;
        velocityX *= 0.95;
        velocityY *= 0.95;

        if (isRotatingRef.current && !isInteractingRef.current) {
          mesh.rotation.y += 0.008;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newWidth = canvas.parentElement.clientWidth;
      const newIsMobile = window.innerWidth < 640;
      const newHeight = newIsMobile ? 260 : 320;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [project, wireframeMode, meshColor]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-container"
        className="glass-card max-w-3xl w-full max-h-[92vh] sm:max-h-[90vh] rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-8 relative flex flex-col justify-between overflow-y-auto text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {project.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {project.id}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{project.title}</h3>
              <p className="text-sm text-cyan-400 mt-1 font-medium">{project.subtitle}</p>
            </div>

            <button
              id="btn-close-project-modal"
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 p-2.5 sm:p-2 rounded-full glass hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer shrink-0 flex items-center justify-center touch-manipulation"
              aria-label={t.projects.btnModalClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive 3D Model Sandbox Canvas with drag hint */}
          <div className="my-5 rounded-2xl bg-slate-950/80 border border-white/10 overflow-hidden relative shadow-inner">
            <div className="relative w-full h-[260px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Floating Quick Action Overlay */}
            <div className="p-3 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
              <span className="font-mono text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                {isInteracting ? (
                  <span className="text-amber-300 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    {language === 'en'
                      ? 'Auto-rotate paused (User interacting)'
                      : language === 'ja'
                      ? '自動回転一時停止中（操作中）'
                      : 'Auto-rotate dijeda (Berinteraksi)'}
                  </span>
                ) : isRotating ? (
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>
                      {language === 'en'
                        ? 'Auto-rotate active • Drag to rotate 3D'
                        : language === 'ja'
                        ? '自動回転中 • ドラッグで3D回転'
                        : 'Auto-rotate aktif • Geser untuk memutar'}
                    </span>
                  </span>
                ) : (
                  <span className="text-slate-400">
                    {language === 'en'
                      ? 'Auto-rotate disabled'
                      : language === 'ja'
                      ? '自動回転オフ'
                      : 'Auto-rotate dinonaktifkan'}
                  </span>
                )}
              </span>

              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-1.5 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setWireframeMode(!wireframeMode)}
                    className={`min-h-[40px] sm:min-h-0 px-3 py-2 sm:py-1 rounded-lg border transition flex items-center gap-1.5 cursor-pointer touch-manipulation active:scale-95 ${
                      wireframeMode
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="font-medium">{wireframeMode ? 'Solid' : 'Wireframe'}</span>
                  </button>

                  <button
                    id="toggle-modal-auto-rotate"
                    type="button"
                    onClick={() => setIsRotating(!isRotating)}
                    className={`min-h-[40px] sm:min-h-0 px-3 py-2 sm:py-1 rounded-lg border transition flex items-center gap-1.5 cursor-pointer touch-manipulation active:scale-95 ${
                      isRotating
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isRotating && !isInteracting ? 'animate-spin' : ''}`} />
                    <span className="font-medium">{isRotating ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}</span>
                  </button>
                </div>

                {/* Color pickers */}
                <div className="flex items-center gap-1 pl-1">
                  {['#06b6d4', '#a855f7', '#10b981', '#f59e0b'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setMeshColor(c)}
                      className="min-h-[40px] min-w-[40px] sm:min-h-[28px] sm:min-w-[28px] flex items-center justify-center p-1 rounded-lg hover:bg-white/5 transition touch-manipulation active:scale-90"
                      aria-label={`Color ${c}`}
                    >
                      <span
                        style={{ backgroundColor: c }}
                        className={`w-5 h-5 sm:w-4 sm:h-4 rounded-full transition transform ${
                          meshColor === c ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Description & Specs */}
          <div className="space-y-4 text-sm text-slate-300 pb-6">
            <p className="leading-relaxed">{project.fullDescription}</p>

            <div>
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-2">
                {t.projects.featuresLabel}:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-cyan-400 mt-0.5">▹</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Bottom Navigation */}
        <div className="sticky bottom-0 z-30 bg-slate-950/95 sm:bg-transparent backdrop-blur-xl -mx-4 sm:mx-0 px-4 sm:px-0 pt-3 pb-4 sm:pb-0 sm:pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            id="btn-back-project-bottom"
            type="button"
            onClick={onClose}
            className="min-h-[48px] sm:min-h-0 px-5 py-3 sm:py-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm transition border border-white/15 flex items-center justify-center gap-2 cursor-pointer group shadow-md touch-manipulation active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>
              {language === 'en'
                ? 'Back to Portfolio'
                : language === 'ja'
                ? 'ポートフォリオに戻る'
                : 'Kembali ke Portofolio'}
            </span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="min-h-[48px] sm:min-h-0 px-5 py-3 sm:py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:opacity-95 transition shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 touch-manipulation active:scale-95 text-center"
            >
              <span>{t.projects.btnOpenDemo}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => {
                alert(
                  language === 'en'
                    ? 'Sample Three.js repository link active in current session.'
                    : language === 'ja'
                    ? 'Three.jsサンプルリポジトリがアクティブです。'
                    : 'Tautan repositori sampel Three.js terbuka dalam sesi ini.'
                );
              }}
              className="min-h-[48px] sm:min-h-0 px-4 py-3 sm:py-2.5 rounded-full glass text-slate-200 text-sm font-medium hover:bg-white/10 transition border border-white/15 flex items-center justify-center gap-2 cursor-pointer touch-manipulation active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>{t.projects.btnSourceCode}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
