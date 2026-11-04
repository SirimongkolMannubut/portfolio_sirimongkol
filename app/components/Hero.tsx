"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Mail, Terminal, Shield, Cpu, Code2, FileDown, Sparkles, CheckCircle2, GraduationCap, Briefcase, MapPin, Clock, ExternalLink, Box } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playHoverSound, playClickSound } from "../lib/audio";

// Brand Icons
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

export default function Hero() {
  const { t, lang } = useLanguage();
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(0);
  const [profileData, setProfileData] = useState<{ name?: string; title?: string }>({});
  const [timeStr, setTimeStr] = useState<string>("");

  // Role Rotator
  const roles = [
    "Front-end Developer (Next.js 16 & React 19)",
    "Flutter Mobile Application Developer",
    "Intern @ กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)",
    "Computer Science Student (GPA 3.05)",
    "Full-Stack & Gemini AI Enthusiast",
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data && (data.name || data.title)) {
          setProfileData({
            name: data.name,
            title: data.title,
          });
        }
      })
      .catch(() => {});
  }, []);

  const logs = [
    "sys.init: Sirimongkol.OS (Louis_6807) [ONLINE]",
    "auth: B.Sc. Computer Science @ Sisaket Rajabhat (GPA 3.05)",
    "flagship: LINE OA Multi-Company Intake (AI + Make + Drive)",
    "internship: Software & System Intern @ Student Loan Fund (กยศ.)",
    "stack: [TypeScript, JavaScript, Next.js 16, React 19, Flutter, Apps Script, MongoDB]",
    "status: Ready for immediate start & interviews 🚀",
  ];

  useEffect(() => {
    if (activeLine < logs.length) {
      const timer = setTimeout(() => {
        setTerminalText((prev) => [...prev, logs[activeLine]]);
        setActiveLine((prev) => prev + 1);
      }, 400);
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
      className="relative min-h-[96vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Cyber Grid & Ambient Glows */}
      <div className="cyber-grid" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[5%] w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/15 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-[5%] right-[5%] w-[420px] h-[420px] bg-purple-600/15 dark:bg-purple-600/15 rounded-full blur-[140px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[45%] left-[45%] w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Text & Information */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status & Live Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{t("hero_status")}</span>
              </div>

              {timeStr && (
                <div className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-mono font-semibold bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800">
                  <Clock size={12} className="text-cyan-500" />
                  <span>{timeStr} ICT (GMT+7)</span>
                </div>
              )}
            </div>

            {/* Main Greeting & Name */}
            <div id="hero-title-zone" className="space-y-2 relative transition-all">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-semibold uppercase tracking-wider flex items-center justify-center lg:justify-start gap-2">
                <Sparkles size={16} className="text-cyan-500" />
                <span>{t("hero_greeting")}</span>
              </p>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="block shimmer-text font-black pb-1">
                  {lang === "th" && profileData.name ? profileData.name : t("hero_name")}
                </span>
              </h1>

              {/* Dynamic Animated Rotating Role */}
              <div id="hero-role-zone" className="h-9 flex items-center justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-50/80 dark:bg-cyan-950/40 border border-blue-200/70 dark:border-cyan-800/60 text-xs sm:text-sm font-bold text-blue-700 dark:text-cyan-300 shadow-xs animate-in fade-in duration-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{roles[roleIndex]}</span>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p id="hero-subtitle-zone" className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t("hero_subtitle")}
            </p>

            {/* Action Buttons */}
            <div id="hero-cta-zone" className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => handleScroll("#projects")}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-400 text-white text-sm font-bold shadow-lg shadow-blue-500/25 dark:shadow-cyan-900/50 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero_btn_projects")}
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-sm font-bold shadow-md hover:shadow-cyan-500/20 transition-all duration-300 active:scale-95"
              >
                <FileDown size={17} />
                {t("hero_resume")}
              </a>

              <button
                onClick={() => handleScroll("#contact")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800 text-sm font-semibold transition-all duration-300 active:scale-95 shadow-xs"
              >
                <Mail size={16} />
                {t("hero_btn_contact")}
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex justify-center lg:justify-start items-center gap-3.5 pt-2 text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Connect:</span>
              <a
                href="https://github.com/SirimongkolMannubut"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 hover:text-blue-600 dark:hover:text-cyan-400 border border-zinc-200/60 dark:border-zinc-800 hover:scale-110 transition-all duration-300 shadow-xs"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/sirimongkol.manubut.577/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 hover:text-blue-600 dark:hover:text-cyan-400 border border-zinc-200/60 dark:border-zinc-800 hover:scale-110 transition-all duration-300 shadow-xs"
                title="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 hover:text-blue-600 dark:hover:text-cyan-400 border border-zinc-200/60 dark:border-zinc-800 hover:scale-110 transition-all duration-300 shadow-xs"
                title="Figma"
              >
                <FigmaIcon size={18} />
              </a>
              <a
                href="mailto:topt75870@gmail.com"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 hover:text-blue-600 dark:hover:text-cyan-400 border border-zinc-200/60 dark:border-zinc-800 hover:scale-110 transition-all duration-300 shadow-xs"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Holographic Avatar Bento & Terminal */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto space-y-4">
            {/* Holographic Avatar Bento Card */}
            <div id="hero-bento-zone" className="relative group">
              {/* Animated Rotating Gradient Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-3xl blur-md opacity-35 group-hover:opacity-60 transition duration-500" />

              <div className="relative glass-card p-5 rounded-3xl border border-zinc-200/80 dark:border-cyan-500/30 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  {/* Portrait with Conic Glow Ring */}
                  <div className="relative shrink-0">
                    <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-2xl overflow-hidden border-2 border-white dark:border-cyan-400 shadow-lg bg-zinc-900">
                      <img
                        src="/profile.jpg"
                        alt="Sirimongkol Manubut"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Live Online Badge */}
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-xs">
                      <CheckCircle2 size={13} className="text-white" />
                    </span>
                  </div>

                  {/* Profile Specs */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg text-zinc-900 dark:text-white truncate">
                      {lang === "th" && profileData.name ? profileData.name : "Sirimongkol Manubut"}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 dark:text-cyan-400 truncate mt-0.5">
                      Front-end & Flutter Developer
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/50">
                        <GraduationCap size={11} />
                        GPA 3.05
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/50">
                        <Briefcase size={11} />
                        Intern @ กยศ.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Tech Chips */}
                <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                  <span className="flex items-center gap-1 text-sky-500 dark:text-sky-400">
                    ⚡ Flutter & Dart
                  </span>
                  <span className="flex items-center gap-1 text-cyan-500 dark:text-cyan-400">
                    ⚛️ Next.js 16 / React
                  </span>
                  <span className="flex items-center gap-1 text-purple-500 dark:text-purple-400">
                    🤖 Gemini AI
                  </span>
                </div>
              </div>
            </div>

            {/* Futuristic Terminal Widget with Scanline */}
            <div id="hero-terminal-zone" className="relative w-full rounded-2xl overflow-hidden glass-card border border-zinc-200/80 dark:border-zinc-800/90 shadow-2xl">
              {/* Scanline laser beam effect */}
              <div className="scanline-beam" />

              {/* Terminal Header */}
              <div className="bg-zinc-100/95 dark:bg-zinc-950/95 px-4 py-2.5 border-b border-zinc-200/60 dark:border-zinc-800/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal size={11} />
                  sirimongkol.os - zsh
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-xs text-left h-48 overflow-y-auto no-scrollbar bg-white/40 dark:bg-black/50">
                <div className="space-y-1.5">
                  {terminalText.map((line, idx) => {
                    let lineElement = <span className="text-zinc-800 dark:text-zinc-200 leading-relaxed">{line}</span>;

                    if (line.includes("[ONLINE]")) {
                      lineElement = (
                        <span className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-semibold">
                          {line.replace(/\[ONLINE\]/g, "")}
                          <span className="text-emerald-500 font-bold">[ONLINE]</span>
                        </span>
                      );
                    } else if (line.includes("Ready for immediate start")) {
                      lineElement = (
                        <span className="text-cyan-500 dark:text-cyan-400 font-bold leading-relaxed">
                          {line}
                        </span>
                      );
                    }

                    return (
                      <div key={idx} className="flex gap-2 text-[11px] sm:text-xs">
                        <span className="text-blue-600 dark:text-cyan-400 font-bold">➜</span>
                        {lineElement}
                      </div>
                    );
                  })}
                  {activeLine < logs.length && (
                    <div className="flex gap-2">
                      <span className="text-blue-600 dark:text-cyan-400 font-bold">➜</span>
                      <span className="w-2 h-3.5 bg-zinc-800 dark:bg-cyan-400 cursor-blink inline-block" />
                    </div>
                  )}
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="bg-zinc-50/80 dark:bg-zinc-950/80 px-4 py-2 border-t border-zinc-200/50 dark:border-zinc-800/70 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                <div className="flex flex-col items-center gap-0.5">
                  <Cpu size={12} className="text-indigo-500" />
                  <span>NEXT.JS 16</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Code2 size={12} className="text-cyan-400" />
                  <span>REACT 19</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Shield size={12} className="text-emerald-400" />
                  <span>SECURE SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Ribbon */}
        <div className="mt-14 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-zinc-200/60 dark:border-zinc-800 hover:border-cyan-500/40 transition-all hover:scale-[1.02]">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">3.05</div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{t("hero_stat_gpa")}</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-zinc-200/60 dark:border-zinc-800 hover:border-cyan-500/40 transition-all hover:scale-[1.02]">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">{t("hero_stat_internship_val")}</div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{t("hero_stat_internship")}</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-zinc-200/60 dark:border-zinc-800 hover:border-cyan-500/40 transition-all hover:scale-[1.02]">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Code2 size={22} />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">3+ Featured</div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{t("hero_stat_projects")}</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-zinc-200/60 dark:border-zinc-800 hover:border-cyan-500/40 transition-all hover:scale-[1.02]">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">Gemini AI</div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">AI Co-Pilot Assistant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
