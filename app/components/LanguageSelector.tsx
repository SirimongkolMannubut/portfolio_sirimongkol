"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, LANG_CONFIG, Language } from "../context/LanguageContext";
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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-900/80 dark:hover:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm"
        aria-label="Change language"
      >
        <Globe size={14} className="text-blue-500 dark:text-cyan-400" />
        <span>{currentLang.flag}</span>
        <span className="font-bold">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Select Language
          </div>
          {LANG_CONFIG.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLang(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                lang === item.code
                  ? "bg-blue-50 dark:bg-cyan-955/30 text-blue-600 dark:text-cyan-400"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </div>
              {lang === item.code && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
