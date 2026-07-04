'use client';

import { motion } from 'framer-motion';

/* ────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────── */

const QUOTE =
  'Do so much work that it would be unreasonable for you to not be successful.';
const AUTHOR = 'Alex Hormozi';

/* ────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────── */

export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* ── Dotted-grid background (subtle texture) ── */}
      <div className="dotted-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl"
        >
          {/* ── Glassmorphic frame ── */}
          <div
            className="glass-card relative overflow-hidden px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20"
            style={{
              boxShadow:
                '0 0 80px rgba(6,182,212,0.04), 0 0 160px rgba(16,185,129,0.03)',
            }}
          >
            {/* Decorative dashed border overlay (matches reference) */}
            <div
              className="pointer-events-none absolute inset-3 sm:inset-4 rounded-xl"
              style={{
                border: '1.5px dashed var(--border)',
                opacity: 0.5,
              }}
            />

            {/* Gradient left accent bar */}
            <div
              className="pointer-events-none absolute left-0 top-10 bottom-10 w-[3px] rounded-full
                         bg-gradient-to-b from-accent-cyan via-accent-emerald to-transparent opacity-50"
            />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Large quotation mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'backOut' }}
                className="mb-6 sm:mb-8"
              >
                <span
                  className="block text-5xl sm:text-6xl md:text-7xl font-black leading-none select-none font-heading"
                  style={{
                    color: 'var(--muted-foreground)',
                    opacity: 0.25,
                  }}
                >
                  &ldquo;&rdquo;
                </span>
              </motion.div>

              {/* Quote body — editorial multi-weight italic treatment */}
              <blockquote className="max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-bold italic
                             leading-snug sm:leading-[1.4] text-foreground/90 font-heading"
                >
                  &ldquo;{QUOTE}&rdquo;
                </motion.p>
              </blockquote>

              {/* Author attribution */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4"
              >
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[var(--muted-foreground)]/40" />
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] font-code">
                  {AUTHOR}
                </p>
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[var(--muted-foreground)]/40" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
