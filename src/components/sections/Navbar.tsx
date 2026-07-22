'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
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
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const navRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);

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
      // Don't update active section while GSAP is driving the scroll
      if (isScrollingRef.current) return;

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
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Lock scroll handler so it doesn't fight with the programmatic scroll
        isScrollingRef.current = true;
        gsap.to(window, {
          duration: 1.25,
          scrollTo: { y: el, offsetY: 20 },
          ease: 'power3.inOut',
          onComplete: () => {
            // Re-enable scroll tracking after GSAP finishes
            isScrollingRef.current = false;
          },
        });
      }
    },
    [],
  );

  return (
    <>
      {/* ===== CENTERED FLOATING PILL NAVBAR ===== */}
      <motion.nav
        ref={navRef}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed left-1/2 top-4 z-50 w-[calc(100vw-24px)] max-w-max -translate-x-1/2"
      >
        <div
          className={`
            w-full flex items-center justify-between gap-0.5 rounded-full p-1 transition-all duration-500
            sm:gap-1 sm:p-1.5
            ${
              scrolled
                ? 'border border-[var(--glass-border)] bg-[var(--glass)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
                : 'border border-transparent bg-[var(--background)]/70 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-lg'
            }
          `}
        >
          {/* Nav links (visible on both desktop and mobile) */}
          <div className="relative flex items-center gap-0.5 sm:gap-1">
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
                    relative rounded-full px-2 py-1 text-[10px] font-medium transition-colors duration-300
                    sm:px-3 sm:text-xs md:px-4 md:text-sm
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
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Theme toggle — always visible */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors duration-200 hover:bg-[var(--muted)]/60 hover:text-[var(--foreground)] sm:ml-1"
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
                  <Sun size={13} className="sm:h-3.5 sm:w-3.5" />
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
                  <Moon size={13} className="sm:h-3.5 sm:w-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
    </>
  );
}
