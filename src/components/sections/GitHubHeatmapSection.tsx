'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

/* ────────────────────────────────────────────────
   Config
   ──────────────────────────────────────────────── */

const GITHUB_USERNAME = 'amitcodes08';

/**
 * Custom contribution-level colour scales that match
 * the portfolio's Cyan → Emerald accent palette.
 *
 * Level 0 = no contributions (near-transparent base)
 * Level 4 = highest activity  (bright accent)
 */
const heatmapTheme = {
  dark: [
    '#161b22',                      // 0 — dark base
    'rgba(6, 182, 212, 0.20)',      // 1 — faint cyan
    'rgba(6, 182, 212, 0.45)',      // 2 — medium cyan
    '#06b6d4',                      // 3 — bright cyan
    '#10b981',                      // 4 — emerald peak
  ] as [string, string, string, string, string],
  light: [
    '#ebedf0',                      // 0
    'rgba(8, 145, 178, 0.18)',      // 1
    'rgba(8, 145, 178, 0.40)',      // 2
    '#0891b2',                      // 3
    '#059669',                      // 4
  ] as [string, string, string, string, string],
};

/* ────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────── */

export default function GitHubHeatmapSection() {
  /* Reactively detect dark / light mode so the calendar
     swaps its colour-scheme when the user toggles theme */
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const check = () =>
      setColorScheme(
        document.documentElement.classList.contains('light') ? 'light' : 'dark',
      );
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* ── Decorative background ── */}
      <div className="dotted-grid-accent pointer-events-none absolute inset-0 opacity-10" />

      <div className="section-container relative z-10">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full border border-glass-border
                       bg-accent-cyan-muted px-3 sm:px-4 py-1 text-[10px] sm:text-xs
                       font-semibold uppercase tracking-[0.2em] text-accent-cyan font-code"
          >
            Contributions
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
            <span className="gradient-text">GitHub</span>{' '}
            <span className="font-serif-accent text-foreground">Activity</span>
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-md sm:max-w-lg text-sm sm:text-base text-muted-foreground">
            A living snapshot of my open-source contributions and daily coding
            rhythm.
          </p>
        </motion.div>

        {/* ── Glassmorphic heatmap card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative mx-auto max-w-4xl overflow-hidden"
          style={{
            boxShadow:
              '0 0 60px rgba(6,182,212,0.06), 0 0 120px rgba(16,185,129,0.04)',
          }}
        >
          {/* Gradient top accent bar */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-50
                       bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
          />

          {/* Scrollable inner wrapper for small viewports */}
          <div className="overflow-x-auto p-5 sm:p-7 md:p-9">
            <div className="flex min-w-[700px] justify-center">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme={colorScheme}
                theme={heatmapTheme}
                fontSize={12}
                blockSize={13}
                blockMargin={4}
                blockRadius={3}
                style={{
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-mono), monospace',
                }}
              />
            </div>
          </div>

          {/* Bottom glow accent */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl opacity-30
                       bg-gradient-to-r from-transparent via-accent-emerald to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
