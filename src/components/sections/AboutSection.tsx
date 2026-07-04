'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────── */

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: 'cyan' | 'emerald';
}

const stats: StatItem[] = [
  { label: 'LeetCode Rating', value: 1700, suffix: '+', color: 'cyan' },
  { label: 'Problems Solved', value: 500, suffix: '+', color: 'emerald' },
  { label: 'Projects Built', value: 5, suffix: '+', color: 'cyan' },
  { label: 'Certifications', value: 3, suffix: '+', color: 'emerald' },
];

const languages = [
  { name: 'C++', color: 'cyan' },
  { name: 'Python', color: 'emerald' },
  { name: 'Java', color: 'cyan' },
  { name: 'JavaScript', color: 'emerald' },
  { name: 'TypeScript', color: 'cyan' },
] as const;

const cpBadges = [
  { label: 'Pupil - Codeforces', icon: '⚔️' },
  { label: 'LeetCode 1700+', icon: '🏆' },
] as const;

/* ─── Framer Motion variants ───────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 22 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 350, damping: 18 },
  },
};

/* ─── Component ────────────────────────────────────── */

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* GSAP ScrollTrigger — animated counters */
  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;

        const target = { val: 0 };

        gsap.to(target, {
          val: stats[i].value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = `${Math.round(target.val)}${stats[i].suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden"
    >
      {/* ── Decorative background dots ── */}
      <div className="dotted-grid-accent absolute inset-0 opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 relative z-10">
        {/* ═══════ Heading ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-3 font-code">
            Dashboard
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block font-heading">
            About & Stats
          </h2>
          <div className="dotted-line-h mx-auto mt-6 sm:mt-8 w-32 sm:w-48" />
        </motion.div>

        {/* ═══════ Bio + Certification grid ═══════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* ── About text — spans 2 cols on lg ── */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-6 sm:p-8 lg:col-span-2 relative group"
          >
            {/* subtle accent bar */}
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-60" />

            <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mb-3 sm:mb-4 flex items-center gap-2 font-heading">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse-glow" />
              Who I Am
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-sm sm:text-[15px]">
              I&apos;m <span className="text-[var(--foreground)] font-medium">Amit Gupta</span> — a
              third‑year <span className="text-[var(--accent-cyan)]">Information Technology</span> student
              balancing the thrill of{' '}
              <span className="text-[var(--accent-emerald)]">algorithmic competitive programming</span>{' '}
              with building real‑world{' '}
              <span className="text-[var(--accent-cyan)]">AI applications</span>. I ship
              production‑grade code by day and solve rating‑pushing problems by night — always
              chasing the intersection of elegant algorithms and impactful software.
            </p>
          </motion.div>

          {/* ── Certification Spotlight ── */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-6 sm:p-8 relative group flex flex-col justify-between"
          >
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-[var(--accent-emerald)] to-transparent opacity-60" />

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mb-3 sm:mb-4 flex items-center gap-2 font-heading">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse-glow" />
                Certification Spotlight
              </h3>
              <p className="text-[var(--muted-foreground)] text-xs sm:text-sm mb-3">
                Industry-recognized credential
              </p>
            </div>

            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--accent-emerald-muted)] p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">🎓</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                    Oracle Cloud Infrastructure
                  </p>
                  <p className="text-xs text-[var(--accent-emerald)] mt-0.5 font-code">
                    AI Foundation Certified
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Dotted separator ── */}
        <div className="dotted-line-h my-8 sm:my-10 mx-auto w-full max-w-xs sm:max-w-md" />

        {/* ═══════ Stats grid ═══════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass-card p-4 sm:p-6 text-center relative group cursor-default"
            >
              {/* hover glow ring */}
              <div
                className={`absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  stat.color === 'cyan' ? 'glow-cyan' : 'glow-emerald'
                }`}
              />

              <span
                ref={(el) => { counterRefs.current[i] = el; }}
                className={`block text-2xl sm:text-3xl md:text-4xl font-bold font-code tracking-tight ${
                  stat.color === 'cyan'
                    ? 'text-[var(--accent-cyan)]'
                    : 'text-[var(--accent-emerald)]'
                }`}
              >
                0{stat.suffix}
              </span>
              <span className="block mt-1.5 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-[var(--muted-foreground)] uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Dotted separator ── */}
        <div className="dotted-line-h my-8 sm:my-10 mx-auto w-full max-w-xs sm:max-w-md" />

        {/* ═══════ Languages + CP Badges ═══════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2"
        >
          {/* ── Language fluency ── */}
          <motion.div variants={cardVariants} className="glass-card p-6 sm:p-8 relative">
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-60" />

            <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mb-4 sm:mb-5 flex items-center gap-2 font-heading">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse-glow" />
              Language Fluency
            </h3>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {languages.map((lang) => (
                <motion.span
                  key={lang.name}
                  variants={badgeVariants}
                  whileHover={{ scale: 1.06 }}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors duration-300 cursor-default font-code ${
                    lang.color === 'cyan'
                      ? 'border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan-muted)] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/60'
                      : 'border-[var(--accent-emerald)]/30 bg-[var(--accent-emerald-muted)] text-[var(--accent-emerald)] hover:border-[var(--accent-emerald)]/60'
                  }`}
                >
                  {lang.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Competitive Programming ── */}
          <motion.div variants={cardVariants} className="glass-card p-6 sm:p-8 relative">
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-[var(--accent-emerald)] to-transparent opacity-60" />

            <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mb-4 sm:mb-5 flex items-center gap-2 font-heading">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse-glow" />
              Competitive Programming
            </h3>

            <div className="flex flex-col gap-3">
              {cpBadges.map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={badgeVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--muted)] p-3 sm:p-4 cursor-default transition-colors duration-300 hover:border-[var(--accent-emerald)]/40"
                >
                  <span className="text-lg sm:text-xl">{badge.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--foreground)]">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
