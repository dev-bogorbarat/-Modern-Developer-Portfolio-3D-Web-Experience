import React from 'react';
import { ColorScheme } from '../types';

interface AmbientBackgroundProps {
  colorScheme: ColorScheme;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ colorScheme }) => {
  // Theme-coordinated color styles with gentle, low-contrast ambient opacity
  const themeGradients = {
    cyan: {
      orb1: 'from-cyan-500/15 to-blue-600/10',
      orb2: 'from-blue-600/12 to-indigo-700/10',
      orb3: 'from-teal-500/10 to-cyan-700/8',
      accentGlow: 'rgba(6, 182, 212, 0.07)',
    },
    purple: {
      orb1: 'from-purple-600/16 to-pink-600/10',
      orb2: 'from-fuchsia-600/12 to-indigo-800/10',
      orb3: 'from-violet-500/10 to-purple-800/8',
      accentGlow: 'rgba(168, 85, 247, 0.07)',
    },
    emerald: {
      orb1: 'from-emerald-600/15 to-teal-600/10',
      orb2: 'from-teal-600/12 to-cyan-800/10',
      orb3: 'from-green-500/10 to-emerald-800/8',
      accentGlow: 'rgba(16, 185, 129, 0.07)',
    },
    amber: {
      orb1: 'from-amber-600/15 to-orange-600/10',
      orb2: 'from-orange-600/12 to-yellow-800/10',
      orb3: 'from-yellow-500/10 to-amber-800/8',
      accentGlow: 'rgba(245, 158, 11, 0.07)',
    },
  };

  const currentTheme = themeGradients[colorScheme] || themeGradients.cyan;

  return (
    <div
      id="ambient-background-layer"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none bg-slate-950"
    >
      {/* 1. Slow-Moving Ambient Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-Left / Center Drift Orb */}
        <div
          className={`absolute -top-32 -left-28 w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] rounded-full bg-gradient-to-tr ${currentTheme.orb1} blur-[130px] opacity-75 animate-ambient-1 transition-colors duration-1000`}
        />

        {/* Center-Right Floating Orb */}
        <div
          className={`absolute top-1/3 -right-36 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full bg-gradient-to-bl ${currentTheme.orb2} blur-[140px] opacity-65 animate-ambient-2 transition-colors duration-1000`}
        />

        {/* Bottom-Center Undulating Orb */}
        <div
          className={`absolute -bottom-36 left-1/4 w-[600px] h-[600px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-t ${currentTheme.orb3} blur-[150px] opacity-60 animate-ambient-3 transition-colors duration-1000`}
        />

        {/* Central Subtle Core Light Accent behind 3D Mesh */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full blur-[110px] pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: currentTheme.accentGlow }}
        />
      </div>

      {/* 2. Cinematic Vignette (Darkens edges to preserve contrast on content and 3D shapes) */}
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />

      {/* 3. Subtle Ambient Animated Noise Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.038] mix-blend-overlay pointer-events-none animate-noise-subtle"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />
    </div>
  );
};
