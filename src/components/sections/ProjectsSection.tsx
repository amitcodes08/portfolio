'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

interface Project {
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  accent: 'cyan' | 'emerald' | 'mixed';
  href: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'DevFlow',
    subtitle:
      'A modern, Next.js-driven technical support forum featuring context-aware AI answer generation, robust query tracking, and collaborative community discussions.',
    tags: ['NextJs', 'GeminiAPI', 'Q&A System', 'MongoDB', 'Shadcn UI'],
    accent: 'cyan',
    href: 'https://devflow-ocvx.onrender.com/',
  },
  {
    number: '02',
    title: 'Lumi',
    subtitle:
      'A custom Gen AI chatbot featuring advanced LLM orchestration, model-switching, and deep context-history tracking.',
    tags: ['React', 'LangChain', 'OpenAI', 'RAG', 'Javascript'],
    accent: 'emerald',
    href: 'https://github.com/amitcodes08/Lumi',
  },
  {
    number: '03',
    title: 'Sportz',
    subtitle:
      'A real-time sports commentary and scoring backend built with Node.js and PostgreSQL, utilizing WebSockets for instant, event-driven data delivery.',
    tags: ['Nodejs', 'WebSocket', 'PostgreSQL', 'Real-time', 'Javascript'],
    accent: 'mixed',
    href: 'https://github.com/amitcodes08/Sportz',
  },
];

/* ──────────────────────────────────────────────
   Accent-colour helpers
   ────────────────────────────────────────────── */

const accentStyles = {
  cyan: {
    border: 'from-cyan-400/80 via-cyan-500/40 to-cyan-400/10',
    glow: '0 0 40px rgba(6,182,212,0.12), 0 0 80px rgba(6,182,212,0.06)',
    hoverGlow: '0 0 50px rgba(6,182,212,0.22), 0 0 100px rgba(6,182,212,0.1)',
    tag: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
    number: 'text-cyan-500/20',
    numberHover: 'group-hover:text-cyan-500/30',
    dot: 'bg-cyan-400',
    barGradient: 'from-cyan-500 to-cyan-400/60',
    mockAccent: 'rgba(6,182,212,0.12)',
    mockStroke: 'rgba(6,182,212,0.25)',
    linkText: 'text-cyan-400',
    linkHover: 'group-hover:text-cyan-300',
  },
  emerald: {
    border: 'from-emerald-400/80 via-emerald-500/40 to-emerald-400/10',
    glow: '0 0 40px rgba(16,185,129,0.12), 0 0 80px rgba(16,185,129,0.06)',
    hoverGlow: '0 0 50px rgba(16,185,129,0.22), 0 0 100px rgba(16,185,129,0.1)',
    tag: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    number: 'text-emerald-500/20',
    numberHover: 'group-hover:text-emerald-500/30',
    dot: 'bg-emerald-400',
    barGradient: 'from-emerald-500 to-emerald-400/60',
    mockAccent: 'rgba(16,185,129,0.12)',
    mockStroke: 'rgba(16,185,129,0.25)',
    linkText: 'text-emerald-400',
    linkHover: 'group-hover:text-emerald-300',
  },
  mixed: {
    border: 'from-cyan-400/70 via-emerald-400/50 to-cyan-400/10',
    glow: '0 0 40px rgba(6,182,212,0.1), 0 0 80px rgba(16,185,129,0.08)',
    hoverGlow: '0 0 50px rgba(6,182,212,0.2), 0 0 100px rgba(16,185,129,0.12)',
    tag: 'border-cyan-500/15 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 text-cyan-300',
    number: 'text-cyan-500/15',
    numberHover: 'group-hover:text-cyan-500/25',
    dot: 'bg-gradient-to-r from-cyan-400 to-emerald-400',
    barGradient: 'from-cyan-500 via-emerald-400 to-cyan-500/60',
    mockAccent: 'rgba(6,182,212,0.1)',
    mockStroke: 'rgba(6,182,212,0.2)',
    linkText: 'text-cyan-400',
    linkHover: 'group-hover:text-cyan-300',
  },
} as const;

/* ──────────────────────────────────────────────
   Mock UI Preview (geometric / dotted grid)
   ────────────────────────────────────────────── */

function MockUIPreview({ accent }: { accent: Project['accent'] }) {
  const s = accentStyles[accent];
  return (
    <div
      className="relative h-44 sm:h-52 lg:h-60 w-full overflow-hidden rounded-xl"
      style={{ background: s.mockAccent }}
    >
      {/* Dotted grid background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle, ${s.mockStroke} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Decorative window chrome */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>

      {/* Geometric shapes — simulated UI skeleton */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-10 pb-6">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <div
            className={`h-3 w-3/4 rounded-full bg-gradient-to-r ${s.barGradient} opacity-30`}
          />
          <div
            className={`h-3 w-1/2 rounded-full bg-gradient-to-r ${s.barGradient} opacity-20`}
          />

          <div className="mt-3 flex gap-3">
            <div
              className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-lg opacity-20"
              style={{ background: s.mockStroke }}
            />
            <div className="flex flex-1 flex-col gap-2">
              <div
                className="h-2.5 w-full rounded-full opacity-15"
                style={{ background: s.mockStroke }}
              />
              <div
                className="h-2.5 w-4/5 rounded-full opacity-12"
                style={{ background: s.mockStroke }}
              />
              <div
                className="h-2.5 w-3/5 rounded-full opacity-10"
                style={{ background: s.mockStroke }}
              />
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <div
              className={`h-7 w-20 rounded-md bg-gradient-to-r ${s.barGradient} opacity-20`}
            />
            <div
              className="h-7 w-16 rounded-md opacity-10"
              style={{ background: s.mockStroke }}
            />
          </div>
        </div>
      </div>

      {/* Floating accent orb */}
      <div
        className="animate-float pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{
          background:
            accent === 'mixed'
              ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))'
              : accent === 'cyan'
                ? 'var(--accent-cyan)'
                : 'var(--accent-emerald)',
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Project Card
   ────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const s = accentStyles[project.accent];

  return (
    <div
      className="project-card group relative rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1"
      style={{
        boxShadow: s.glow,
        transition: 'box-shadow 0.5s ease, transform 0.5s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = s.hoverGlow;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = s.glow;
      }}
    >
      {/* ── Gradient border ── */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.border}`}
        />
      </div>

      {/* ── Card body ── */}
      <div className="glass-card relative z-10 overflow-hidden rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10">
        {/* Large background project number */}
        <span
          className={`pointer-events-none absolute -right-2 sm:-right-4 -top-4 sm:-top-6 select-none text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black
                      leading-none tracking-tighter transition-colors duration-500
                      ${s.number} ${s.numberHover} font-heading`}
        >
          {project.number}
        </span>

        {/* Content grid */}
        <div className="relative z-10 flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-8 xl:gap-10">
          {/* Left — Mock UI Preview */}
          <div className="w-full shrink-0 lg:w-[45%]">
            <MockUIPreview accent={project.accent} />
          </div>

          {/* Right — Info */}
          <div className="flex flex-1 flex-col justify-between gap-4 sm:gap-5">
            <div>
              {/* Title */}
              <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-foreground font-heading">
                {project.title}
              </h3>

              {/* Subtitle */}
              <p className="mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {project.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium font-code ${s.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* View Project link */}
            <a
              href={project.href}
              className={`inline-flex w-fit items-center gap-2 text-sm font-semibold
                          transition-colors duration-300 ${s.linkText} ${s.linkHover}`}
            >
              View Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Decorative Dotted Divider between cards
   ────────────────────────────────────────────── */

function DottedDivider() {
  return (
    <div className="project-divider flex items-center justify-center gap-3 py-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="flex gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/40" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Section
   ────────────────────────────────────────────── */

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* ── Heading reveal ── */
      const heading = section.querySelector('.projects-heading');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      /* ── Staggered card reveal ── */
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      /* ── Dotted dividers fade-in ── */
      const dividers = gsap.utils.toArray<HTMLElement>('.project-divider');

      dividers.forEach((div) => {
        gsap.fromTo(
          div,
          { opacity: 0, scaleX: 0.3 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: div,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden py-20 sm:py-28 md:py-36"
    >
      {/* ── Background decorative grid ── */}
      <div className="dotted-grid-accent pointer-events-none absolute inset-0 opacity-20" />

      {/* ── Top / Bottom separator lines ── */}
      <div className="line-h-accent absolute inset-x-0 top-0 opacity-40" />
      <div className="line-h-accent absolute inset-x-0 bottom-0 opacity-40" />

      {/* ── Ambient background orbs ── */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: 'var(--accent-cyan)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: 'var(--accent-emerald)' }}
      />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 relative z-10">
        {/* ── Heading ── */}
        <div className="projects-heading mb-12 sm:mb-16 md:mb-20 text-center">
          <span
            className="mb-4 inline-block rounded-full border border-glass-border
                       bg-accent-cyan-muted px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold
                       uppercase tracking-[0.2em] text-accent-cyan font-code"
          >
            Featured Work
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
            <span className="gradient-text">Projects Showcase</span>
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-md sm:max-w-lg text-sm sm:text-base text-muted-foreground">
            A curated selection of projects that reflect my passion for building
            impactful, high-performance applications.
          </p>
        </div>

        {/* ── Project Cards ── */}
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <div key={project.number}>
              <ProjectCard project={project} />
              {i < projects.length - 1 && (
                <div className="mt-6 sm:mt-8">
                  <DottedDivider />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
