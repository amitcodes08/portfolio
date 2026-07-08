'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Users, Terminal, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

interface Milestone {
  year: string;
  period: string;
  title: string;
  org: string;
  description: string;
  Icon: LucideIcon;
}

const milestones: Milestone[] = [
  {
    year: '2025',
    period: '2025 – 2026',
    title: 'Campus Ambassador',
    org: 'Unstop',
    description:
      'Led onboarding initiatives and event evangelism, growing campus engagement through strategic outreach and community building.',
    Icon: Users,
  },
  {
    year: '2026',
    period: '2026',
    title: 'Waiting for the next opportunity',
    org: '-',
    description:
      `If you have something for me, let's talk.`,
    Icon: Terminal,
  },
];

/* ──────────────────────────────────────────────
   Timeline Card
   ────────────────────────────────────────────── */

function TimelineCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const { Icon } = milestone;

  return (
    <div
      className={`
        timeline-item relative flex w-full items-center
        justify-start
        ${isLeft ? 'md:justify-start' : 'md:justify-end'}
      `}
      data-side={isLeft ? 'left' : 'right'}
    >
      {/* ── Card ── */}
      <div
        className={`
          glass-card group relative w-full
          p-5 sm:p-6 md:p-7
          md:w-[calc(50%-40px)]
          transition-shadow duration-500
          hover:shadow-[0_0_40px_rgba(6,182,212,0.12),0_0_60px_rgba(16,185,129,0.08)]
        `}
      >
        {/* Gradient top-border accent */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-60
                     bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-cyan"
        />

        {/* Year badge */}
        <span
          className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 rounded-full
                     border border-glass-border bg-accent-cyan-muted
                     px-3 py-0.5 text-[10px] sm:text-xs font-semibold tracking-wider text-accent-cyan font-code"
        >
          {milestone.period}
        </span>

        {/* Title row */}
        <div className="mb-2 flex items-center gap-2.5 sm:gap-3">
          <span
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl
                       bg-gradient-to-br from-accent-cyan/20 to-accent-emerald/20
                       text-accent-cyan transition-colors duration-300
                       group-hover:from-accent-cyan/30 group-hover:to-accent-emerald/30"
          >
            <Icon className="h-4 w-4" strokeWidth={1.8} />
          </span>

          <div className="min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight text-foreground font-heading">
              {milestone.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-accent-emerald font-code">
              {milestone.org}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {milestone.description}
        </p>

        {/* Connector arm (desktop only) */}
        <span
          className={`
            pointer-events-none absolute top-1/2 hidden h-[1px] w-10 -translate-y-1/2 md:block
            ${isLeft ? '-right-10 bg-gradient-to-r' : '-left-10 bg-gradient-to-l'}
            from-accent-cyan/60 to-transparent
          `}
        />
      </div>

      {/* ── Glowing node on the center line (desktop) ── */}
      <div
        className={`
          timeline-node pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 md:block
          ${isLeft ? 'right-[calc(50%-8px)]' : 'left-[calc(50%-8px)]'}
        `}
      >
        <span className="relative flex h-4 w-4">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/30" />
          <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-accent-cyan bg-background shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
        </span>
      </div>

      {/* ── Glowing node (mobile) ── */}
      <div className="timeline-node-mobile absolute -left-[25px] top-1/2 z-20 -translate-y-1/2 md:hidden">
        <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/30" />
          <span className="relative inline-flex h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border-2 border-accent-cyan bg-background shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Section
   ────────────────────────────────────────────── */

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const fill = lineFillRef.current;
      if (!section || !fill) return;

      /* ── Scroll-driven line fill ── */
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.3,
          },
        },
      );

      /* ── Mobile line fill ── */
      const mobileLine = section.querySelector('.timeline-line-mobile');
      if (mobileLine) {
        gsap.fromTo(
          mobileLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.3,
            },
          },
        );
      }

      /* ── Card reveal animations ── */
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item');

      items.forEach((item) => {
        const side = item.dataset.side;
        const xStart = side === 'left' ? -60 : 60;

        gsap.fromTo(
          item,
          { opacity: 0, x: xStart },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      /* ── Node pulse stagger ── */
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node, .timeline-node-mobile');

      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
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
      id="experience"
      className="relative w-full overflow-hidden py-20 sm:py-28 md:py-36"
    >
      {/* ── Background grain ── */}
      <div className="dotted-grid-accent pointer-events-none absolute inset-0 opacity-20" />

      {/* ── Top / Bottom separator lines ── */}
      <div className="line-h-accent absolute inset-x-0 top-0 opacity-40" />
      <div className="line-h-accent absolute inset-x-0 bottom-0 opacity-40" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 relative z-10">
        {/* ── Heading ── */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <span
            className="mb-4 inline-block rounded-full border border-glass-border
                       bg-accent-cyan-muted px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold
                       uppercase tracking-[0.2em] text-accent-cyan font-code"
          >
            Experience &amp; Milestones
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
            <span className="gradient-text">The Journey So Far</span>
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-md sm:max-w-lg text-sm sm:text-base text-muted-foreground">
            Key experiences and recognitions that have shaped my growth as a developer and community leader.
          </p>
        </div>

        {/* ── Timeline wrapper ── */}
        <div className="relative mx-auto max-w-4xl">
          {/* Center vertical track (desktop) */}
          <div
            ref={lineTrackRef}
            className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 md:block"
          >
            <div className="absolute inset-0 opacity-25"
                 style={{
                   backgroundImage:
                     'repeating-linear-gradient(180deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 12px)',
                 }}
            />
            <div
              ref={lineFillRef}
              className="absolute inset-x-0 top-0 h-full origin-top"
              style={{
                background:
                  'linear-gradient(180deg, var(--accent-cyan), var(--accent-emerald))',
                borderRadius: 2,
              }}
            />
          </div>

          {/* Mobile left track */}
          <div className="absolute left-0 top-0 h-full w-[2px] md:hidden">
            <div className="absolute inset-0 opacity-25"
                 style={{
                   backgroundImage:
                     'repeating-linear-gradient(180deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 12px)',
                 }}
            />
            <div
              className="timeline-line-mobile absolute inset-x-0 top-0 h-full origin-top"
              style={{
                background:
                  'linear-gradient(180deg, var(--accent-cyan), var(--accent-emerald))',
                borderRadius: 2,
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* ── Entries ── */}
          <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 lg:gap-20 pl-6 sm:pl-8 md:pl-0">
            {milestones.map((m, i) => (
              <TimelineCard key={i} milestone={m} index={i} />
            ))}
          </div>

          {/* End cap node (desktop) */}
          <div className="absolute -bottom-3 left-1/2 z-20 hidden -translate-x-1/2 md:block">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent-emerald bg-background shadow-[0_0_16px_rgba(16,185,129,0.5)]">
              <span className="h-2 w-2 rounded-full bg-accent-emerald" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
