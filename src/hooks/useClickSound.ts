'use client';

import { useCallback } from 'react';
import { useSoundContext } from '@/context/SoundContext';

/**
 * Custom hook to trigger the global tactile click sound.
 * Latency optimization: trigger this on `onMouseDown` instead of `onClick`
 * to make the physical reaction feel instant and high-end.
 */
export function useClickSound() {
  const { playClickSound, isSoundEnabled } = useSoundContext();

  const handleMouseDown = useCallback(() => {
    if (isSoundEnabled) {
      playClickSound();
    }
  }, [playClickSound, isSoundEnabled]);

  return handleMouseDown;
}
