'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

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
  const [activeSection, setActiveSection] = useState('about');
  const navRef = useRef<HTMLElement>(null);

  // ---------- scroll listener ----------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- active section tracking ----------
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));

    const handleScroll = () => {
      let active = 'about';
      const triggerY = window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            active = id;
          }
        }
      }
      setActiveSection((prev) => (prev !== active ? active : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to set initial active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
        gsap.to(window, {
          duration: 1.25, // slow and smooth scroll duration
          scrollTo: { y: el, offsetY: 20 },
          ease: 'power3.inOut',
        });
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
      {/* ===== CENTERED FLOATING PILL NAVBAR ===== */}
      <motion.nav
        ref={navRef}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
      >
        <div
          className={`
            flex items-center gap-0.5 rounded-full p-1.5 transition-all duration-500
            ${
              scrolled
                ? 'border border-[var(--glass-border)] bg-[var(--glass)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
                : 'border border-transparent bg-[var(--background)]/70 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-lg'
            }
          `}
        >
          {/* Desktop nav links */}
          <LayoutGroup>
            <div className="hidden items-center gap-0.5 md:flex">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      setActiveSection(sectionId);
                      handleNav(link.href);
                    }}
                    className={`
                      relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300
                      sm:px-4 sm:text-sm
                      ${
                        isActive
                          ? 'text-[var(--background)]'
                          : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                      }
                    `}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'var(--foreground)' }}
                        transition={{
                          type: 'spring',
                          stiffness: 110, // slower, gentler spring glide
                          damping: 20,    // smooth and fluid deceleration
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Theme toggle — always visible */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors duration-200 hover:bg-[var(--muted)]/60 hover:text-[var(--foreground)] md:ml-1"
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
                  <Sun size={14} />
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
                  <Moon size={14} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="relative z-50 flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors duration-200 hover:bg-[var(--muted)]/60 hover:text-[var(--foreground)] md:hidden"
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
                  <X size={16} />
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
                  <Menu size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

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
                  {NAV_LINKS.map((link, i) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.08 * i, duration: 0.4 }}
                      >
                        <button
                          onClick={() => handleNav(link.href)}
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold font-nav transition-colors ${
                            isActive
                              ? 'bg-[var(--muted)] text-[var(--foreground)]'
                              : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                          }`}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              background: isActive
                                ? 'var(--gradient-primary)'
                                : 'var(--border)',
                            }}
                          />
                          {link.label}
                        </button>
                      </motion.li>
                    );
                  })}
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
