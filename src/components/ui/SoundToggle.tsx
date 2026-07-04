'use client';

import { useSoundContext } from '@/context/SoundContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useSoundContext();

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[80]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <button
        onMouseDown={(e) => {
          toggleSound();
        }}
        data-no-click-sound="true"
        className="relative flex h-11 w-11 items-center justify-center rounded-full
                   border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--foreground)]
                   backdrop-blur-md shadow-lg transition-all duration-300
                   hover:scale-105 hover:border-[var(--accent-cyan)]/40
                   hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                   active:scale-95"
        aria-label="Toggle sound effects"
      >
        {/* Subtle dynamic background glow */}
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500
                     hover:opacity-10"
          style={{
            background: isSoundEnabled
              ? 'var(--accent-cyan)'
              : 'var(--foreground)',
          }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {isSoundEnabled ? (
            <motion.span
              key="sound-on"
              initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute text-[var(--accent-cyan)]"
            >
              <Volume2 size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="sound-off"
              initial={{ rotate: 45, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -45, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute text-[var(--muted-foreground)]"
            >
              <VolumeX size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
