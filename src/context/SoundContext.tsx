'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playClickSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize state from localStorage once mounted (hydration-safe)
  useEffect(() => {
    const stored = localStorage.getItem('sound_enabled');
    if (stored === 'true') {
      setIsSoundEnabled(true);
    } else if (stored === null) {
      // Default to enabled for a premium experience, but user can mute
      setIsSoundEnabled(true);
      localStorage.setItem('sound_enabled', 'true');
    }
  }, []);

  // Preload the sound file on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/sounds/click.wav');
      audio.preload = 'auto';
      audioRef.current = audio;
    }
  }, []);

  // Web Audio API Synthesizer fallback for ultra-low latency & zero-file fallback
  const playSynthClick = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // High-end tactile click sound profile: high frequency, rapid decay
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Web Audio Synth failed:', e);
    }
  }, []);

  const playClickSound = useCallback(() => {
    if (audioRef.current) {
      // Reset position to play overlapping/rapid clicks
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {
        // Fallback to synth click if audio element play is blocked or file missing
        playSynthClick();
      });
    } else {
      playSynthClick();
    }
  }, [playSynthClick]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('sound_enabled', String(next));
      if (next) {
        // Confirm with a tactile click sound immediately upon enabling
        setTimeout(() => {
          playClickSound();
        }, 50);
      }
      return next;
    });
  }, [playClickSound]);

  // Global event interceptor for all interactive element clicks
  useEffect(() => {
    if (!isSoundEnabled) return;

    const handleGlobalMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine if the clicked element (or its parents) is interactive
      const interactiveEl = target.closest(
        'button, a, [role="button"], [role="link"], [data-cursor="pointer"], .cursor-pointer'
      );
      
      if (interactiveEl && !interactiveEl.hasAttribute('data-no-click-sound')) {
        playClickSound();
      }
    };

    window.addEventListener('mousedown', handleGlobalMouseDown, { capture: true, passive: true });
    return () => {
      window.removeEventListener('mousedown', handleGlobalMouseDown, { capture: true });
    };
  }, [isSoundEnabled, playClickSound]);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playClickSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
}
