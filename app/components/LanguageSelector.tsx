"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, LANG_CONFIG } from "../context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANG_CONFIG.find((l) => l.code === lang) || LANG_CONFIG[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-100/90 hover:bg-zinc-200/90 dark:bg-zinc-900/90 dark:hover:bg-cyan-950/50 border border-zinc-200/80 dark:border-cyan-500/40 text-zinc-800 dark:text-cyan-300 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.15)] active:scale-95"
        aria-label="Change language"
      >
        <Globe size={14} className="text-blue-600 dark:text-cyan-400 animate-pulse" />
        <span className="text-sm">{currentLang.flag}</span>
        <span className="font-extrabold">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 text-zinc-400 dark:text-cyan-400 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white/95 dark:bg-zinc-950/95 border border-zinc-200 dark:border-cyan-500/30 shadow-2xl backdrop-blur-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-cyan-500/80">
            Choose Language
          </div>
          {LANG_CONFIG.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLang(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                lang === item.code
                  ? "bg-blue-50 dark:bg-cyan-500/15 text-blue-600 dark:text-cyan-300 border-l-2 border-blue-600 dark:border-cyan-400"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">{item.flag}</span>
                <span>{item.label}</span>
              </div>
              {lang === item.code && <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-[0_0_8px_var(--neon-cyan)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
