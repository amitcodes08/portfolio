'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, ExternalLink, Send } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

/* ───────────────────────────────────────────── */

const FIRST_NAME = 'Amit';
const LAST_NAME = 'Gupta';
const TAGLINE =
  'Full-Stack Developer & Competitive Programmer specialized in Gen AI, RAG Pipelines, and Interactive UIs.';
const PARTICLE_COUNT = 48;

/* ─── Types ─── */
interface Particle {
  id: number; x: number; y: number;
  size: number; opacity: number; delay: number; duration: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: (i * 37 + 13) % 100,
    y: (i * 53 + 7) % 100,
    size: 2 + (i % 4),
    opacity: 0.15 + (i % 5) * 0.08,
    delay: (i % 8) * 0.4,
    duration: 4 + (i % 5) * 1.5,
  }));
}

/* ─── ParticleField ─── */
function ParticleField() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const [particles] = useState<Particle[]>(generateParticles);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 30);
    },
    [mouseX, mouseY],
  );

  return (
    <motion.div
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      onPointerMove={handlePointerMove}
      style={{ x: springX, y: springY }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.id % 2 === 0 ? 'rgba(6,182,212,0.5)' : 'rgba(16,185,129,0.4)',
          }}
          animate={{ opacity: [p.opacity, p.opacity * 2.2, p.opacity], scale: [1, 1.6, 1], y: [0, -12, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );
}

/* ─── DotGrid ─── */
function DotGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 30, damping: 40 });
  const sY = useSpring(mouseY, { stiffness: 30, damping: 40 });

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ x: sX, y: sY }}
      onPointerMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
        mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 8);
      }}
    >
      <div className="absolute inset-0 dotted-grid opacity-85" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, var(--background) 75%)' }} />
    </motion.div>
  );
}

/* ─── ScrollIndicator ─── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.6 }}
    >
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground font-code">Scroll</span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-accent-cyan" />
      </motion.div>
    </motion.div>
  );
}

/* ─── HeroSection ─── */
export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [firstNameRef, lastNameRef].forEach((ref) => {
        const el = ref.current;
        if (!el) return;
        const isLastName = ref === lastNameRef;
        const text = el.textContent ?? '';
        el.textContent = '';
        if (isLastName) {
          el.classList.remove('gradient-text');
        }
        el.classList.remove('opacity-0');
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(80px) rotateX(-90deg)';
          span.classList.add('hero-char');
          if (isLastName) {
            span.classList.add('gradient-text');
          }
          el.appendChild(span);
        });
      });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.hero-char', { opacity: 1, y: 0, rotateX: 0, stagger: 0.06, duration: 1, delay: 0.3 })
        .fromTo(taglineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')
        .fromTo(badgeRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      <DotGrid />
      <ParticleField />

      {/* Decorative lines — hidden on small screens */}
      <div className="dotted-line-h absolute top-24 left-0 w-full opacity-30 hidden sm:block" />
      <div className="dotted-line-h absolute bottom-24 left-0 w-full opacity-30 hidden sm:block" />
      <div className="dotted-line-v absolute top-0 left-[15%] h-full opacity-20 hidden md:block" />
      <div className="dotted-line-v absolute top-0 right-[15%] h-full opacity-20 hidden md:block" />

      {/* Gradient blurs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: 'var(--accent-cyan)' }} />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[350px] w-[350px] sm:h-[600px] sm:w-[600px] rounded-full opacity-15 blur-[140px]" style={{ background: 'var(--accent-emerald)' }} />

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-glass px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-medium tracking-widest uppercase text-muted-foreground backdrop-blur-md opacity-0 font-code"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
          </span>
          Available for work
        </div>

        {/* Name */}
        <h1 className="flex flex-col items-center gap-3 sm:gap-4 font-stretch uppercase" style={{ perspective: '600px' }}>
          <span ref={firstNameRef} className="opacity-0 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-widest text-foreground leading-none">
            {FIRST_NAME}
          </span>
          <span ref={lastNameRef} className="opacity-0 gradient-text block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-widest leading-none">
            {LAST_NAME}
          </span>
        </h1>

        {/* Tagline */}
        <p ref={taglineRef} className="mx-auto mt-4 sm:mt-6 max-w-md sm:max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground opacity-0">
          Full-Stack Developer &amp; Competitive Programmer who{' '}
          <span className="font-serif-accent text-base sm:text-lg md:text-xl text-foreground/80">
            ships end-to-end
          </span>{' '}
          — Gen AI, RAG Pipelines, and Interactive UIs.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 opacity-0 sm:flex-row">
          <MagneticButton href="#projects" strength={0.3}>
            <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-background transition-shadow hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <span className="absolute inset-0 z-0" style={{ background: 'var(--gradient-primary)' }} />
              <span className="absolute inset-0 z-[1] translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              <ExternalLink className="relative z-[2] h-4 w-4" />
              <span className="relative z-[2]">View Work</span>
            </span>
          </MagneticButton>

          <MagneticButton href="#contact" strength={0.3}>
            <span className="border-gradient group relative inline-flex items-center gap-2 rounded-full border border-border px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-glass hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <Send className="h-4 w-4 text-accent-emerald transition-transform duration-300 group-hover:rotate-12" />
              Let&apos;s Connect
            </span>
          </MagneticButton>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
