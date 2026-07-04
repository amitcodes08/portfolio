# 🌌 Amit Gupta | Developer Portfolio

A premium, production-ready, interactive portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion + GSAP**. 

This portfolio features an Apple-inspired Glassmorphic design language, smooth layout animations, interactive panels, a global tactile audio engine, and real-time dashboard elements.

---

## 🎨 Design Language & Aesthetic

* **Glassmorphism**: Translucent card structures (`backdrop-blur-xl`, `bg-glass`) bordered by sub-pixel borders (`var(--glass-border)`) and soft, diffused ambient glows.
* **Palette**: Deep zinc/slate background (`#09090b`) contrasted by dynamic **Cyan (`#06b6d4`)** and **Emerald (`#10b981`)** gradients.
* **Typography**: Clean, tabular typography mapping (Space Grotesk for geometric headings, Inter for highly readable body text, and monospaced JetBrains Mono for system metrics/code displays).

---

## 🚀 Key Features

### 1. ⚡ Interactive Hero Section
* **GSAP Character Splitting**: Splitted and rotated typography reveal animations for name components.
* **Interactive Particle System**: A pointer-reactive floating particle field that slides dynamically on cursor coordinate movements.
* **Ambient Gradients**: Fluid background radial blur spots that shift colors smoothly.

### 2. 📊 Dashboard-Style About & Stats
* Real-time counter animations triggered via GSAP `ScrollTrigger` for ratings and stats (e.g., LeetCode 1600+ rating, 500+ problems solved).
* Compact badges highlighting language fluencies (C++, Python, Java, JavaScript, TypeScript) and certifications.

### 3. 🛠️ Tech Stack Categorization
* Organized skills categories ("Frontend", "Backend", "AI / Languages", "Tools") inside hover-glow glass layout grids.

### 4. 📂 Interactive Projects Showcase
* Featured projects (e.g., *Nabha Aarogya Telemedicine*, *Lumi AI Chatbot*, *Live Meme Cricket*) equipped with sub-pixel borders, layout offsets, and interactive previews.

### 5. 🗺️ Timeline Journey
* Scroll-driven timeline connector line that matches page progress, plotting milestones (e.g., Unstop Campus Ambassador, Software Engineering Intern, Google Cloud Agentic AI Challenge).

### 6. 📅 GitHub Contribution Heatmap
* Integrates `react-github-calendar` in a customized cyan-to-emerald colour scheme, embedded in a responsive, scrollable glass frame.

### 7. 📖 Frosted Resume Viewer
* An inline macOS-style modal overlay with download/close control buttons, custom traffic light headers, and a responsive viewer pointing to `/resume/resume.pdf`.

### 8. 🔊 Tactical Audio System
* **Global Provider**: Intercepts `mousedown` click events on all interactive items (links, buttons, `.cursor-pointer`) to play a mechanical click.
* **Synth Fallback**: Utilizes Web Audio API oscillators to synthesize a low-latency click dynamically in case static audio files are blocked or absent.
* **Floating Mute Control**: Floating glass button with toggle state sync to `localStorage` for mute preferences.

### ⏰ Interactive Footer Clock
* Hovering over the copyright name replaces it with a live digital clock, auto-reverting after 3 seconds with interruption protection.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4, PostCSS
* **Animation**: Framer Motion, GSAP (with ScrollTrigger & useGSAP hook)
* **Icons**: Lucide React, React Icons

---

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/amitcodes08/portfolio-app.git
cd portfolio-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure assets
* Place your actual resume PDF file at `public/resume/resume.pdf`.
* Place your custom click sound WAV at `public/sounds/click.wav`.

### 4. Run the development server
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Project Structure

```bash
├── public/                 # Static assets (sounds, pdf, svg icons)
│   ├── resume/
│   │   └── resume.pdf      # Serving resume
│   └── sounds/
│       └── click.wav       # Tactile audio feedback click
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles & Tailwind layers
│   │   ├── layout.tsx      # App wrapper with SoundProvider
│   │   └── page.tsx        # Portfolio container
│   ├── components/
│   │   ├── sections/       # UI sections (Hero, About, Stack, Projects, Timeline, Heatmap, Footer)
│   │   └── ui/             # Reusable design tokens (MagneticButton, CustomCursor, SoundToggle)
│   ├── context/
│   │   └── SoundContext.tsx# Tactical sound environment context
│   └── hooks/
│       └── useClickSound.ts# Mouse down sound hook
```
