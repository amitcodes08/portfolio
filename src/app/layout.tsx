import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Syncopate, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";
import SoundToggle from "@/components/ui/SoundToggle";

/* ── Typography System ──
   Inter         → Body text, UI labels, navigation (clean & readable)
   Space Grotesk → Headings, section titles (modern geometric display)
   JetBrains Mono → Code, counters, stats (technical monospace)
   Stretch Pro   → Hero Section name/display headings
   Syncopate     → Navbar and small futuristic accents
   Instrument Serif → Decorative serif-italic accents in section headings
*/
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const stretchPro = localFont({
  src: "./fonts/stretch-pro.regular.woff2",
  variable: "--font-stretch-pro",
  display: "swap",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-syncopate",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amit Gupta | Full-Stack Developer & Competitive Programmer",
  description:
    "Portfolio of Amit Gupta — Full-Stack Developer specializing in Gen AI, RAG Pipelines, and Interactive UIs. Competitive programmer with LeetCode 1700+ rating.",
  keywords: [
    "Amit Gupta",
    "Full-Stack Developer",
    "Competitive Programmer",
    "Gen AI",
    "RAG Pipelines",
    "Next.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Amit Gupta" }],
  openGraph: {
    title: "Amit Gupta | Full-Stack Developer & Competitive Programmer",
    description:
      "Portfolio of Amit Gupta — Full-Stack Developer specializing in Gen AI, RAG Pipelines, and Interactive UIs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${stretchPro.variable} ${syncopate.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen w-full bg-background text-foreground">
        <SoundProvider>
          {children}
          <SoundToggle />
        </SoundProvider>
      </body>
    </html>
  );
}
