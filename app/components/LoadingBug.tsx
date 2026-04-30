// src/components/LoadingBug.tsx
"use client";

export default function LoadingBug() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-cyan-500 overflow-hidden">
      {/* Texture de bruit numérique */}
      <div className="absolute inset-0 noise-bg pointer-events-none" />
      
      {/* Effet de scanline (ligne qui descend) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full animate-bounce opacity-20" />

      <div className="relative glitch-overlay p-4 border border-cyan-900">
        <h2 className="text-2xl tracking-[0.5em] mb-4 animate-pulse">
          SIGNAL LOST...
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-xs opacity-70">RECALIBRATING QUANTUM SENSORS</p>
          <div className="w-64 h-1 bg-cyan-900">
            <div className="h-full bg-cyan-400 animate-[load_2s_ease-in-out]" style={{ width: '100%' }} />
          </div>
          <p className="text-[10px] text-right opacity-50 uppercase">Buffer: 0x882A - Critical</p>
        </div>
      </div>
    </div>
  );
}