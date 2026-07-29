"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("nav_home"), href: "#home" },
    { label: t("nav_about"), href: "#about" },
    { label: t("nav_skills"), href: "#skills" },
    { label: t("nav_projects"), href: "#projects" },
    { label: t("nav_activities"), href: "#activities" },
    { label: t("nav_contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Futuristic Neon Accent Bar */}
      <div className="h-[2.5px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-zinc-950/90 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-cyan-500/20 shadow-[0_4px_30px_rgba(6,182,212,0.15)]"
            : "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/40 dark:border-cyan-500/10 shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with Glowing Badge */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleClick(e, "#home")}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-blue-600/10 dark:bg-cyan-500/15 border border-blue-500/30 dark:border-cyan-500/40 text-blue-600 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-all duration-300">
                  <Code2 size={18} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    Sirimongkol
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PORTFOLIO
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-blue-50/80 dark:hover:bg-cyan-500/10 border border-transparent hover:border-blue-200 dark:hover:border-cyan-500/30 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
              <LanguageSelector />
              <ThemeToggle />
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center space-x-2 md:hidden">
              <LanguageSelector />
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-zinc-600 dark:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent dark:border-cyan-500/30 transition-all cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-200 dark:border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-cyan-950/40 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
