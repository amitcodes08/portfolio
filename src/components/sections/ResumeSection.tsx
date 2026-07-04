'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Download, ExternalLink } from 'lucide-react';

/* ────────────────────────────────────────────────
   Config — place your PDF at  public/resume/resume.pdf
   It will be served as /resume/resume.pdf by Next.js
   ──────────────────────────────────────────────── */
const RESUME_PATH = '/resume/AmitGupta_Resume.pdf';

/* ────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────── */

export default function ResumeSection() {
  const [isOpen, setIsOpen] = useState(false);

  const openViewer = useCallback(() => setIsOpen(true), []);
  const closeViewer = useCallback(() => setIsOpen(false), []);

  /* Lock body scroll while modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Close modal on Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeViewer]);

  return (
    <>
      {/* ═══════════════════════════════════════════
          INLINE BUTTON SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
        {/* Background decorative dots */}
        <div className="dotted-grid-accent pointer-events-none absolute inset-0 opacity-[0.06]" />

        <div className="section-container relative z-10 flex flex-col items-center gap-6 text-center">
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base text-[var(--muted-foreground)]"
          >
            Curious about my background?
          </motion.p>

          {/* ── Frosted glass pill button ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <button
              onClick={openViewer}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden
                         rounded-full px-7 sm:px-8 py-3.5 sm:py-4
                         text-sm sm:text-base font-semibold text-[var(--foreground)]
                         backdrop-blur-xl border border-[var(--glass-border)]
                         bg-[var(--glass)]
                         transition-all duration-500 ease-out
                         hover:scale-105 hover:border-[var(--accent-cyan)]/40
                         hover:shadow-[0_0_40px_rgba(6,182,212,0.18),0_0_80px_rgba(16,185,129,0.08)]
                         active:scale-[0.98]"
            >
              {/* Hover gradient fill */}
              <span
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500
                           group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(16,185,129,0.08))',
                }}
              />
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r
                           from-transparent via-white/[0.06] to-transparent
                           transition-transform duration-700 group-hover:translate-x-full"
              />

              <FileText className="relative z-[2] h-4 w-4 sm:h-5 sm:w-5 text-[var(--accent-cyan)] transition-colors" />
              <span className="relative z-[2]">View Resume</span>
              <ExternalLink
                className="relative z-[2] h-3.5 w-3.5 text-[var(--muted-foreground)]
                           transition-all duration-300
                           group-hover:text-[var(--accent-emerald)]
                           group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODAL OVERLAY — PDF Viewer
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={closeViewer}
          >
            {/* Dark translucent backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* ── Modal container ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex flex-col w-full max-w-4xl h-[85vh] sm:h-[88vh]
                         rounded-2xl overflow-hidden
                         border border-[var(--glass-border)]
                         bg-[var(--glass)] backdrop-blur-2xl"
              style={{
                boxShadow:
                  '0 0 80px rgba(6,182,212,0.1), 0 0 160px rgba(16,185,129,0.06)',
              }}
            >
              {/* ── Header bar ── */}
              <div
                className="flex shrink-0 items-center justify-between
                           px-5 sm:px-6 py-3.5 sm:py-4
                           border-b border-[var(--glass-border)]"
                style={{ background: 'rgba(var(--muted), 0.5)' }}
              >
                {/* Left — file info */}
                <div className="flex items-center gap-3">
                  {/* Traffic-light dots */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>

                  <FileText className="h-4 w-4 text-[var(--accent-cyan)]" />
                  <span className="text-sm font-medium text-[var(--foreground)] font-code">
                    resume.pdf
                  </span>
                </div>

                {/* Right — action buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={RESUME_PATH}
                    download
                    className="flex h-8 w-8 items-center justify-center rounded-lg
                               border border-[var(--border)] bg-[var(--muted)]
                               text-[var(--muted-foreground)]
                               transition-colors duration-200
                               hover:text-[var(--accent-emerald)] hover:border-[var(--accent-emerald)]/40"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>

                  <button
                    onClick={closeViewer}
                    className="flex h-8 w-8 items-center justify-center rounded-lg
                               border border-[var(--border)] bg-[var(--muted)]
                               text-[var(--muted-foreground)]
                               transition-colors duration-200
                               hover:text-red-400 hover:border-red-400/40"
                    title="Close (Esc)"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ── PDF iframe ── */}
              <iframe
                src={RESUME_PATH}
                title="Amit Gupta — Resume"
                className="flex-1 w-full"
                style={{
                  border: 'none',
                  background: 'var(--muted)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
