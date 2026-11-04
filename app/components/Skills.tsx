"use client";

import { useState, useEffect } from "react";
import { Code2, Smartphone, Database, Wrench, Sparkles, Cpu, Globe, Terminal, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Skill = {
  name: string;
  level: string;
  percentage: number;
  highlight?: boolean;
};

type SkillGroup = {
  title: string;
  categoryKey: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  skills: Skill[];
};

const DEFAULT_SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Web & Full-Stack Development",
    categoryKey: "Web",
    icon: <Code2 size={22} />,
    color: "from-blue-600 to-cyan-500",
    glowColor: "shadow-blue-500/20 dark:shadow-cyan-950/30",
    skills: [
      { name: "TypeScript (TS)", level: "Advanced", percentage: 90, highlight: true },
      { name: "JavaScript (ES6+)", level: "Advanced", percentage: 90, highlight: true },
      { name: "Next.js 16 (App Router)", level: "Advanced", percentage: 88, highlight: true },
      { name: "React 19", level: "Advanced", percentage: 88 },
      { name: "Tailwind CSS v4", level: "Advanced", percentage: 92 },
      { name: "HTML5 & Modern CSS3", level: "Advanced", percentage: 90 },
    ],
  },
  {
    title: "Mobile Development",
    categoryKey: "Mobile",
    icon: <Smartphone size={22} />,
    color: "from-sky-500 to-indigo-600",
    glowColor: "shadow-sky-500/20 dark:shadow-indigo-950/30",
    skills: [
      { name: "Flutter", level: "Advanced", percentage: 85, highlight: true },
      { name: "Dart", level: "Advanced", percentage: 82 },
      { name: "Mobile UI / Responsive", level: "Advanced", percentage: 85 },
      { name: "State & Lifecycle Management", level: "Intermediate", percentage: 80 },
    ],
  },
  {
    title: "Backend & Database",
    categoryKey: "Database",
    icon: <Database size={22} />,
    color: "from-emerald-500 to-teal-600",
    glowColor: "shadow-emerald-500/20 dark:shadow-teal-950/30",
    skills: [
      { name: "Node.js & Route Handlers", level: "Advanced", percentage: 88, highlight: true },
      { name: "MongoDB Atlas & Mongoose", level: "Advanced", percentage: 85, highlight: true },
      { name: "RESTful APIs & Webhooks", level: "Advanced", percentage: 88 },
      { name: "JWT & Bcrypt Security", level: "Advanced", percentage: 82 },
      { name: "MySQL", level: "Intermediate", percentage: 75 },
    ],
  },
  {
    title: "Automation, AI & Tools",
    categoryKey: "Tools",
    icon: <Wrench size={22} />,
    color: "from-amber-500 to-orange-600",
    glowColor: "shadow-amber-500/20 dark:shadow-orange-950/30",
    skills: [
      { name: "Google Apps Script (JS)", level: "Advanced", percentage: 88, highlight: true },
      { name: "Make (Integromat Automation)", level: "Advanced", percentage: 90, highlight: true },
      { name: "Gemini AI & Claude Integration", level: "Advanced", percentage: 88, highlight: true },
      { name: "Git & GitHub Workflow", level: "Advanced", percentage: 88 },
      { name: "Figma UI/UX Prototyping", level: "Advanced", percentage: 85 },
      { name: "VS Code & AI Tools", level: "Advanced", percentage: 90 },
    ],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(DEFAULT_SKILL_GROUPS);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapLevelText = (pct: number) => (pct >= 80 ? "Advanced" : pct >= 60 ? "Intermediate" : "Basic");
          const categories: { [key: string]: Skill[] } = {
            Web: [],
            Mobile: [],
            Database: [],
            Tools: [],
          };
          data.forEach((s: any) => {
            const cat = s.category || "Web";
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push({
              name: s.name,
              level: mapLevelText(s.level || 75),
              percentage: s.level || 75,
              highlight: s.level >= 85,
            });
          });

          const updated: SkillGroup[] = DEFAULT_SKILL_GROUPS.map((group) => {
            const custom = categories[group.categoryKey];
            return {
              ...group,
              skills: custom && custom.length > 0 ? custom : group.skills,
            };
          });

          setSkillGroups(updated);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "Web", label: "Web Development" },
    { id: "Mobile", label: "Mobile (Flutter)" },
    { id: "Database", label: "Database & Backend" },
    { id: "Tools", label: "Tools & AI" },
  ];

  const displayedGroups = skillGroups.filter((g) => {
    if (activeCategory === "all") return true;
    return g.categoryKey === activeCategory;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Dynamic glow blur bg */}
      <div className="absolute top-[20%] left-[-8%] w-80 h-80 bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-8%] w-80 h-80 bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-cyan-950/40 px-3.5 py-1 rounded-full border border-blue-200/60 dark:border-cyan-800/50">
            ENGINEERING CAPABILITIES
          </span>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl mt-3">
            {t("skills_title")}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_var(--neon-cyan)]" />
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-lg mx-auto text-sm sm:text-base font-medium">
            {t("skills_subtitle")}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === c.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/60 dark:border-zinc-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedGroups.map((group) => (
            <div
              key={group.title}
              className={`glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 hover:${group.glowColor} transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1`}
            >
              <div>
                {/* Group Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${group.color} text-white shadow-md`}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                      {group.title}
                    </h3>
                    <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400">
                      Core Technical Competencies
                    </span>
                  </div>
                </div>

                {/* Skill List with Progress Bars */}
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                        <span className="text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                          {skill.name}
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          )}
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-500 dark:text-cyan-400">
                          {skill.percentage}%
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${group.color} transition-all duration-1000 shadow-[0_0_8px_rgba(6,182,212,0.5)]`}
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges footer */}
              <div className="mt-7 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/60 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
