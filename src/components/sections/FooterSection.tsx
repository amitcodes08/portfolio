'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';

/* ================================================================
   DATA
   ================================================================ */
interface ContactChannel {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}

const CHANNELS: ContactChannel[] = [
  {
    icon: <FaGithub size={22} />,
    label: 'GitHub',
    value: 'github.com/amitgupta',
    href: 'https://github.com/amitgupta',
  },
  {
    icon: <FaLinkedinIn size={22} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/amitgupta',
    href: 'https://linkedin.com/in/amitgupta',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'amitgupta@email.com',
    href: 'mailto:amitgupta@email.com',
  },
];

/* ================================================================
   MAGNETIC CARD
   ================================================================ */
function MagneticCard({ channel, index }: { channel: ContactChannel; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 22, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.12);
      y.set((e.clientY - cy) * 0.12);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={channel.href}
      target={channel.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block h-full rounded-2xl p-[1px] transition-shadow duration-500"
    >
      {/* Gradient border layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'var(--gradient-primary)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Card body */}
      <div className="relative flex h-full items-center gap-4 rounded-2xl bg-[var(--glass)] px-5 py-5 sm:px-6 sm:py-5 backdrop-blur-xl transition-all duration-500 group-hover:bg-[var(--card)]">
        {/* Icon */}
        <div
          className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl text-[var(--muted-foreground)] transition-all duration-300 group-hover:text-[var(--accent-cyan)]"
          style={{
            background: hovered ? 'var(--accent-cyan-muted)' : 'var(--muted)',
            transition: 'background .3s, color .3s',
          }}
        >
          {channel.icon}
        </div>

        {/* Text */}
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-code">
            {channel.label}
          </span>
          <span className="mt-0.5 text-xs sm:text-sm font-medium text-[var(--foreground)] truncate">
            {channel.value}
          </span>
        </div>

        {/* Arrow */}
        <ArrowUpRight
          size={16}
          className="ml-auto shrink-0 text-[var(--muted-foreground)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-emerald)]"
        />
      </div>
    </motion.a>
  );
}

/* ================================================================
   FOOTER SECTION
   ================================================================ */
export default function FooterSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.4 });

  return (
    <section id="contact" className="relative w-full overflow-hidden pt-20 sm:pt-28 md:pt-32 pb-0">
      {/* Decorative top dotted line */}
      <div className="dotted-line-h mx-auto mb-10 sm:mb-16 w-full max-w-xs sm:max-w-xl" />

      {/* Background glow blobs */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'var(--accent-cyan)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-40 h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'var(--accent-emerald)' }}
      />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 relative">
        {/* ---------- Heading ---------- */}
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-cyan)] font-code"
          >
            Get In Touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gradient-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading"
          >
            Let&apos;s Build Something Amazing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[var(--muted-foreground)]"
          >
            Always open to discussing new projects, creative ideas, or
            opportunities.
          </motion.p>
        </div>

        {/* ---------- Contact cards ---------- */}
        <div className="mx-auto mt-10 sm:mt-14 grid max-w-3xl gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          {CHANNELS.map((ch, i) => (
            <MagneticCard key={ch.label} channel={ch} index={i} />
          ))}
        </div>

        {/* ---------- Decorative line ---------- */}
        <div className="line-h-accent mx-auto mt-14 sm:mt-20 w-full max-w-xs sm:max-w-md" />

        {/* ---------- Bottom bar ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 pb-8 sm:pb-10 sm:flex-row sm:justify-between"
        >
          {/* Left — copyright */}
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            © 2025 Amit Gupta. Crafted with precision.
          </p>

          {/* Right — decorative dots */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="inline-block h-1 w-1 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? 'var(--accent-cyan)'
                      : 'var(--accent-emerald)',
                  opacity: 0.5 + i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
