"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Mail, Terminal, Shield, Cpu, Code2 } from "lucide-react";

// Custom SVG Icons for Brands
const GithubIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FigmaIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(0);

  const logs = [
    "Initializing Sirimongkol.OS...",
    "Loading Computer Science profile parameters...",
    "Scanning skills: HTML/CSS, JS, Next.js, Flutter, MySQL...",
    "Connecting project repositories...",
    "-> LouisAI LINE Bot [ONLINE]",
    "-> GreenPoint [ONLINE] (linked to Figma)",
    "System check complete. Welcome to the future.",
  ];

  useEffect(() => {
    if (activeLine < logs.length) {
      const timer = setTimeout(() => {
        setTerminalText((prev) => [...prev, logs[activeLine]]);
        setActiveLine((prev) => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [activeLine]);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Futuristic Background */}
      <div className="cyber-grid" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-indigo-500/15 dark:bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Intro Text */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-xl text-xs font-bold bg-blue-50/50 text-blue-600 border border-blue-200/50 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/40 w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping" />
            COMPUTER SCIENCE & WEB DEV
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            <span className="block text-zinc-900 dark:text-white mb-2">{t("hero_greeting")}</span>
            <span className="block bg-gradient-to-r from-blue-605 via-cyan-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent pb-2 filter drop-shadow-sm font-black">
              {t("hero_name")}
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-bold tracking-wide text-zinc-700 dark:text-zinc-350">
            {t("hero_role")}
          </p>

          <p className="text-sm sm:text-base text-zinc-550 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => handleScroll("#projects")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6.5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-blue-550/20 dark:shadow-cyan-950/30 transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              {t("hero_btn_projects")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScroll("#contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6.5 py-3 rounded-2xl bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/85 text-zinc-700 dark:text-zinc-300 font-semibold transition-all duration-300 cursor-pointer active:scale-95"
            >
              {t("hero_btn_contact")}
            </button>
            <a
              href="/admin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6.5 py-3 rounded-2xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-cyan-500/10 dark:to-violet-500/10 border border-blue-500/30 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 font-semibold transition-all duration-300 cursor-pointer active:scale-95"
            >
              🔐 Admin CMS
            </a>
          </div>

          <div className="flex justify-center lg:justify-start items-center gap-5 pt-2 text-zinc-450 dark:text-zinc-500">
            <a
              href="https://github.com/SirimongkolMannubut"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-cyan-400 transition-colors duration-300"
              title="GitHub Profile"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://www.facebook.com/sirimongkol.manubut.577/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-cyan-400 transition-colors duration-300"
              title="Facebook Profile"
            >
              <FacebookIcon size={22} />
            </a>
            <a
              href="https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-cyan-400 transition-colors duration-300"
              title="Figma Profile"
            >
              <FigmaIcon size={22} />
            </a>
            <a
              href="mailto:topt75870@gmail.com"
              className="hover:text-zinc-900 dark:hover:text-cyan-400 transition-colors duration-300"
              title="Send Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        {/* Futuristic Terminal Widget */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto animate-float">
          <div className="w-full rounded-2xl overflow-hidden glass-card border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-zinc-100/80 dark:bg-zinc-950/80 px-4.5 py-3 border-b border-zinc-200/40 dark:border-zinc-850/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal size={10} />
                zsh - sirimongkol.os
              </span>
            </div>
            {/* Terminal Content */}
            <div className="p-5 font-mono text-xs text-left h-64 overflow-y-auto no-scrollbar bg-white/30 dark:bg-black/35">
              <div className="space-y-2">
                {terminalText.map((line, idx) => {
                  let lineElement = <span className="text-zinc-800 dark:text-zinc-100 leading-relaxed">{line}</span>;
                  
                  if (line.includes("[ONLINE]")) {
                    const parts = line.split("[ONLINE]");
                    lineElement = (
                      <span className="text-zinc-800 dark:text-zinc-100 leading-relaxed font-semibold">
                        {parts[0]}
                        <span className="text-emerald-600 dark:text-emerald-400">[ONLINE]</span>
                        {parts[1]}
                      </span>
                    );
                  } else if (line.includes("System check complete")) {
                    lineElement = (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold leading-relaxed">
                        {line}
                      </span>
                    );
                  }
                  
                  return (
                    <div key={idx} className="flex gap-2">
                      <span className="text-blue-600 dark:text-cyan-400 font-bold">➜</span>
                      {lineElement}
                    </div>
                  );
                })}
                {activeLine < logs.length && (
                  <div className="flex gap-2">
                    <span className="text-blue-600 dark:text-cyan-400 font-bold">➜</span>
                    <span className="w-2.5 h-4 bg-zinc-800 dark:bg-cyan-400 cursor-blink inline-block" />
                  </div>
                )}
              </div>
            </div>
            {/* Tech stats footer */}
            <div className="bg-zinc-50/50 dark:bg-zinc-950/55 p-4 border-t border-zinc-200/40 dark:border-zinc-850/50 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-450 dark:text-zinc-500 font-mono">
              <div className="flex flex-col items-center gap-1">
                <Cpu size={12} className="text-indigo-500 dark:text-indigo-400" />
                <span>CPU STABLE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Code2 size={12} className="text-blue-500 dark:text-cyan-400" />
                <span>NEXTJS 16</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield size={12} className="text-emerald-500 dark:text-emerald-400" />
                <span>SSL SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
