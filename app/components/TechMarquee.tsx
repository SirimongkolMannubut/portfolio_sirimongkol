"use client";

import { Code2, Smartphone, Database, Cpu, Sparkles, Terminal, Globe, Layers, GitBranch, Layout, FileCode2 } from "lucide-react";

export default function TechMarquee() {
  const techItems = [
    { name: "TypeScript (TS)", icon: <Code2 size={15} className="text-blue-400" /> },
    { name: "JavaScript (JS)", icon: <Terminal size={15} className="text-yellow-400" /> },
    { name: "Next.js 16", icon: <Globe size={15} className="text-blue-500" /> },
    { name: "React 19", icon: <Code2 size={15} className="text-cyan-400" /> },
    { name: "Tailwind CSS v4", icon: <Layout size={15} className="text-teal-400" /> },
    { name: "Flutter", icon: <Smartphone size={15} className="text-sky-400" /> },
    { name: "Dart", icon: <FileCode2 size={15} className="text-indigo-400" /> },
    { name: "MongoDB Atlas", icon: <Database size={15} className="text-emerald-500" /> },
    { name: "RESTful APIs", icon: <Cpu size={15} className="text-cyan-300" /> },
    { name: "Google Apps Script", icon: <Terminal size={15} className="text-emerald-400" /> },
    { name: "Make (Integromat)", icon: <Layers size={15} className="text-purple-400" /> },
    { name: "Gemini AI & Claude", icon: <Sparkles size={15} className="text-amber-400" /> },
    { name: "Git & GitHub", icon: <GitBranch size={15} className="text-sky-400" /> },
    { name: "Figma UI/UX", icon: <Layers size={15} className="text-rose-400" /> },
    { name: "MySQL", icon: <Database size={15} className="text-indigo-400" /> },
  ];

  const duplicated = [...techItems, ...techItems, ...techItems];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-zinc-200/50 dark:border-cyan-500/15 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-md">
      {/* Left/Right Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-xs hover:border-cyan-500/50 transition-colors whitespace-nowrap"
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
