'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // ---------- scroll listener ----------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- theme init ----------
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.add('light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  // ---------- theme toggle ----------
  const toggleTheme = useCallback(() => {
    const next = !isDark;
    setIsDark(!isDark);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // ---------- smooth scroll ----------
  const handleNav = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [],
  );

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-1 left-2 right-2 z-50 flex justify-center"
      >
        <nav
          className={`
            transition-all duration-500 ease-out w-full
            ${
              scrolled
                ? 'mt-4 sm:mt-5 w-[calc(100%-2rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-full max-w-6xl rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-lg backdrop-blur-2xl'
                : 'max-w-full border-b border-transparent bg-transparent backdrop-blur-none'
            }
          `}
          style={
            scrolled
              ? {
                  borderImage:
                    'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-emerald), transparent) 1',
                  borderImageSlice: 1,
                  borderWidth: '0 0 1px 0',
                  borderStyle: 'solid',
                }
              : undefined
          }
        >
          <div
            className={`
              flex items-center justify-between transition-all duration-500 ease-out
              ${
                scrolled
                  ? 'px-6 sm:px-8 py-3.5 md:py-4'
                  : 'px-4 sm:px-6 md:px-8 py-4 md:py-5'
              }
            `}
          >
            {/* ----- Logo ----- */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative z-10 select-none"
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-bold text-white font-nav"
                style={{
                  background: 'var(--gradient-primary)',
                }}
              >
                AG
              </span>
            </a>

            {/* ----- Desktop links ----- */}
            <ul className="hidden items-center gap-4 lg:gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="relative flex h-9 items-center justify-center rounded-xl px-4 text-[10px] font-bold font-nav text-[var(--muted-foreground)] transition-colors duration-200 hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* ----- Right controls ----- */}
            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent-cyan)]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <Sun size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <Moon size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                className="relative z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent-cyan)] md:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-72 border-l border-[var(--glass-border)] bg-[var(--background)]"
              style={{
                boxShadow: '-10px 0 40px rgba(6, 182, 212, 0.08)',
              }}
            >
              <div className="flex h-full flex-col pt-24 px-6">
                {/* Decorative line */}
                <div className="line-h-accent mb-8" />

                <ul className="flex flex-col gap-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                    >
                      <button
                        onClick={() => handleNav(link.href)}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold font-nav text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: 'var(--gradient-primary)' }}
                        />
                        {link.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom decoration */}
                <div className="mt-auto pb-8">
                  <div className="line-h mb-4" />
                  <p className="text-xs text-[var(--muted-foreground)]">
                    © 2026 Amit Gupta
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
