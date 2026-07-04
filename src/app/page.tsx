'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SectionDivider from '@/components/ui/SectionDivider';
import ScrollProgress from '@/components/ui/ScrollProgress';

/* ── Lazy-load heavier sections for better initial paint ── */
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  ssr: false,
});
const TechStackSection = dynamic(() => import('@/components/sections/TechStackSection'), {
  ssr: false,
});
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), {
  ssr: false,
});
const TimelineSection = dynamic(() => import('@/components/sections/TimelineSection'), {
  ssr: false,
});
const GitHubHeatmapSection = dynamic(() => import('@/components/sections/GitHubHeatmapSection'), {
  ssr: false,
});
const QuoteSection = dynamic(() => import('@/components/sections/QuoteSection'), {
  ssr: false,
});
const ResumeSection = dynamic(() => import('@/components/sections/ResumeSection'), {
  ssr: false,
});
const FooterSection = dynamic(() => import('@/components/sections/FooterSection'), {
  ssr: false,
});
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Global UI overlays */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Main content */}
      <main className="w-full">
        <HeroSection />

        <SectionDivider variant="mixed" />

        <AboutSection />

        <SectionDivider variant="dotted" />

        <TechStackSection />

        <SectionDivider variant="gradient" />

        <ProjectsSection />

        <SectionDivider variant="mixed" />

        <TimelineSection />

        <SectionDivider variant="dotted" />

        <GitHubHeatmapSection />

        <SectionDivider variant="gradient" />

        <QuoteSection />

        <ResumeSection />

        <SectionDivider variant="mixed" />

        <FooterSection />
      </main>
    </>
  );
}
