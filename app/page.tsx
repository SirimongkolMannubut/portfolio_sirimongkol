import Header from "./components/Header";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Activities from "./components/Activities";
import Contact from "./components/Contact";
import AIChatbot from "./components/AIChatbot";
import InteractiveBackground from "./components/InteractiveBackground";
import PremiumEffects from "./components/PremiumEffects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col relative overflow-x-hidden">
      {/* Intro, aurora, grain, scroll progress, cursor aura, reveal */}
      <PremiumEffects />

      {/* Interactive Cyber Particle Background */}
      <InteractiveBackground />

      <Header />
      
      <main className="flex-grow flex flex-col relative z-10">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Activities />
        <Contact />
      </main>

      {/* Floating Gemini AI Chatbot */}
      <AIChatbot />

      <footer className="py-8 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-800/50 text-center relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Sirimongkol Manubut. All rights reserved.</p>
          <p className="mt-1 text-zinc-400 dark:text-zinc-600">
            Crafted with Next.js 16, React 19, Tailwind CSS v4, Gemini AI, and Lucide Icons.
          </p>
        </div>
      </footer>
    </div>
  );
}
