'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Database,
  BrainCircuit,
  FileCode,
  Wrench,
  Layers,
  Globe,
  Server,
  Cpu,
  Terminal,
  GitBranch,
  Container,
  MonitorSmartphone,
  Box,
  Palette,
  Sparkles,
  Zap,
  Link2,
  Workflow,
  Cloud,
  type LucideIcon,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

interface TechItem {
  name: string;
  icon: LucideIcon | null;
  color: string;
}

interface TechCategory {
  title: string;
  icon: LucideIcon;
  items: TechItem[];
  accent: 'cyan' | 'emerald' | 'mixed';
  gridSpan: string;
}

const categories: TechCategory[] = [
  {
    title: 'Frontend',
    icon: Globe,
    accent: 'cyan',
    gridSpan: 'md:col-span-2',
    items: [
      { name: 'Next.js', icon: Layers, color: 'text-white' },
      { name: 'React', icon: Code2, color: 'text-cyan-400' },
      { name: 'Tailwind CSS', icon: Palette, color: 'text-sky-400' },
      { name: 'Framer Motion', icon: Sparkles, color: 'text-purple-400' },
      { name: 'GSAP', icon: Zap, color: 'text-emerald-400' },
      { name: 'HTML5', icon: FileCode, color: 'text-orange-400' },
      { name: 'CSS3', icon: Palette, color: 'text-blue-400' },
    ],
  },
  {
    title: 'Backend & DB',
    icon: Server,
    accent: 'emerald',
    gridSpan: 'md:col-span-2',
    items: [
      { name: 'Node.js', icon: Server, color: 'text-green-400' },
      { name: 'Express', icon: Workflow, color: 'text-zinc-300' },
      { name: 'MongoDB', icon: Database, color: 'text-green-500' },
      { name: 'PostgreSQL', icon: Database, color: 'text-blue-400' },
      { name: 'MySQL', icon: Database, color: 'text-orange-400' },
      { name: 'Neo4j', icon: Database, color: 'text-emerald-400' },
      { name: 'Prisma', icon: Link2, color: 'text-teal-300' },
    ],
  },
  {
    title: 'Gen AI Specialization',
    icon: BrainCircuit,
    accent: 'mixed',
    gridSpan: 'md:col-span-2',
    items: [
      { name: 'LangChain', icon: Link2, color: 'text-emerald-400' },
      { name: 'LangGraph', icon: Workflow, color: 'text-cyan-400' },
      { name: 'RAG Pipelines', icon: Workflow, color: 'text-cyan-400' },
      { name: 'Vector DB', icon: Database, color: 'text-emerald-400' },
      { name: 'Hugging Face', icon: Sparkles, color: 'text-yellow-400' },
    ],
  },
  {
    title: 'Languages',
    icon: Terminal,
    accent: 'cyan',
    gridSpan: 'md:col-span-1',
    items: [
      { name: 'C++', icon: Cpu, color: 'text-blue-400' },
      { name: 'Python', icon: Terminal, color: 'text-yellow-400' },
      { name: 'Java', icon: Box, color: 'text-red-400' },
      { name: 'JavaScript', icon: FileCode, color: 'text-yellow-300' },
      { name: 'TypeScript', icon: FileCode, color: 'text-blue-500' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: 'emerald',
    gridSpan: 'md:col-span-1',
    items: [
      { name: 'Git', icon: GitBranch, color: 'text-orange-400' },
      { name: 'Docker', icon: Container, color: 'text-blue-400' },
      { name: 'VS Code', icon: MonitorSmartphone, color: 'text-blue-500' },
      { name: 'Linux', icon: Terminal, color: 'text-yellow-400' },
      { name: 'Vercel', icon: Cloud, color: 'text-white' },
    ],
  },
];

/* flat list for marquee */
const allTechs = categories.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.title }))
);

/* ──────────────────────────────────────────────
   3D TILT CARD — smoothed with CSS transitions
   ────────────────────────────────────────────── */

interface TiltCardProps {
  category: TechCategory;
  index: number;
}

function TiltCard({ category, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rY = ((x - centerX) / centerX) * 8; // reduced from 10 to 8 for smoother feel
      const rX = ((centerY - y) / centerY) * 8;
      setRotateX(rX);
      setRotateY(rY);
      setShineX((x / rect.width) * 100);
      setShineY((y / rect.height) * 100);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const accentBorder =
    category.accent === 'cyan'
      ? 'hover:border-accent-cyan/30'
      : category.accent === 'emerald'
        ? 'hover:border-accent-emerald/30'
        : 'hover:border-accent-cyan/20';

  const accentGlow =
    category.accent === 'cyan'
      ? 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]'
      : category.accent === 'emerald'
        ? 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]'
        : 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.06),0_0_60px_rgba(16,185,129,0.04)]';

  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${category.gridSpan} group`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered
            ? 'transform 0.1s ease-out' // smooth follow during hover
            : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)', // smooth return
          willChange: 'transform',
        }}
        className={`glass-card relative overflow-hidden p-5 sm:p-6 md:p-8 ${accentBorder} ${accentGlow} transition-shadow duration-500`}
      >
        {/* Gradient shine overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${shineX}% ${shineY}%, rgba(6,182,212,0.07), transparent 40%)`,
          }}
        />

        {/* Dotted corner accent */}
        <div className="dotted-grid-accent absolute top-0 right-0 h-16 w-16 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

        {/* Category header */}
        <div className="relative z-20 mb-4 sm:mb-5 flex items-center gap-3">
          <div
            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg ${category.accent === 'cyan'
                ? 'bg-accent-cyan-muted'
                : category.accent === 'emerald'
                  ? 'bg-accent-emerald-muted'
                  : 'bg-accent-cyan-muted'
              }`}
          >
            <CategoryIcon
              className={`h-4 w-4 ${category.accent === 'cyan'
                  ? 'text-accent-cyan'
                  : category.accent === 'emerald'
                    ? 'text-accent-emerald'
                    : 'text-accent-cyan'
                }`}
            />
          </div>
          <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground font-heading">
            {category.title}
          </h3>
        </div>

        {/* Decorative line */}
        <div className="line-h relative z-20 mb-4 sm:mb-5 w-full" />

        {/* Tech badges */}
        <div className="relative z-20 flex flex-wrap gap-2 sm:gap-2.5">
          {category.items.map((tech) => {
            const TechIcon = tech.icon;
            return (
              <motion.span
                key={tech.name}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex cursor-default items-center gap-1.5 sm:gap-2 rounded-lg border border-border/60 bg-muted/60 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:border-border hover:bg-muted hover:text-foreground"
              >
                {TechIcon && <TechIcon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${tech.color}`} />}
                {tech.name}
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   MARQUEE BANNER
   ────────────────────────────────────────────── */

function MarqueeBanner() {
  const items = [...allTechs, ...allTechs];
  return (
    <div className="relative mb-10 sm:mb-16 w-full overflow-hidden py-4">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent" />

      {/* Row 1 – forward */}
      <div className="mb-3 flex w-max animate-marquee items-center gap-3 sm:gap-4">
        {items.map((tech, i) => {
          const TechIcon = tech.icon;
          return (
            <span
              key={`fwd-${i}`}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border border-border/40 bg-muted/40 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-muted-foreground backdrop-blur-sm"
            >
              {TechIcon && <TechIcon className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${tech.color}`} />}
              {tech.name}
            </span>
          );
        })}
      </div>

      {/* Row 2 – reverse */}
      <div className="flex w-max animate-marquee-reverse items-center gap-3 sm:gap-4">
        {[...items].reverse().map((tech, i) => {
          const TechIcon = tech.icon;
          return (
            <span
              key={`rev-${i}`}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border border-border/40 bg-muted/40 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-muted-foreground backdrop-blur-sm"
            >
              {TechIcon && <TechIcon className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${tech.color}`} />}
              {tech.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION COMPONENT
   ────────────────────────────────────────────── */

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative overflow-hidden py-20 sm:py-28 md:py-36"
    >
      {/* Background texture */}
      <div className="dotted-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Top decorative line */}
      <div className="line-h-accent absolute top-0 left-0 w-full opacity-40" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 relative z-10">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur-sm font-code">
            <Layers className="h-3 w-3 text-accent-cyan" />
            Tech Stack
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading"
        >
          <span className="gradient-text">Tech Stack</span>{' '}
          <span className="font-serif-accent text-foreground">Matrix</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 sm:mb-14 max-w-md sm:max-w-xl text-center text-sm sm:text-base leading-relaxed text-muted-foreground"
        >
          The tools &amp; technologies I leverage to build modern,
          performant, and AI-powered applications.
        </motion.p>

        {/* Dotted separator */}
        <div className="dotted-line-h mx-auto mb-8 sm:mb-12 w-28 sm:w-40" />

        {/* ── Marquee ── */}
        <MarqueeBanner />

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-4">
          {categories.map((cat, idx) => (
            <TiltCard key={cat.title} category={cat} index={idx} />
          ))}
        </div>

        {/* Bottom decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 sm:mt-16 flex items-center justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-border animate-dot-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="line-h-accent absolute bottom-0 left-0 w-full opacity-40" />
    </section>
  );
}
