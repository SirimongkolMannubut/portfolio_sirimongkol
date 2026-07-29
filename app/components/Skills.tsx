"use client";

import { useState, useEffect } from "react";
import { Code2, Smartphone, Database, Wrench } from "lucide-react";

type Skill = {
  name: string;
  level: string;
  percentage: number;
};

type SkillGroup = {
  title: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  skills: Skill[];
};

const DEFAULT_SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Web Development",
    icon: <Code2 size={22} />,
    color: "from-blue-500 to-cyan-500",
    glowColor: "shadow-blue-500/20 dark:shadow-cyan-950/30",
    skills: [
      { name: "HTML/CSS", level: "Advanced", percentage: 85 },
      { name: "JavaScript", level: "Advanced", percentage: 80 },
      { name: "Next.js", level: "Intermediate", percentage: 70 },
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone size={22} />,
    color: "from-sky-400 to-indigo-500",
    glowColor: "shadow-sky-500/20 dark:shadow-indigo-950/30",
    skills: [
      { name: "Flutter", level: "Advanced", percentage: 80 },
    ],
  },
  {
    title: "Database",
    icon: <Database size={22} />,
    color: "from-emerald-450 to-teal-500",
    glowColor: "shadow-emerald-500/20 dark:shadow-teal-950/30",
    skills: [
      { name: "MySQL", level: "Intermediate", percentage: 75 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: <Wrench size={22} />,
    color: "from-amber-450 to-orange-500",
    glowColor: "shadow-amber-500/20 dark:shadow-orange-950/30",
    skills: [
      { name: "Git / GitHub", level: "Advanced", percentage: 80 },
      { name: "Figma", level: "Advanced", percentage: 80 },
      { name: "AI Tools", level: "Advanced", percentage: 85 },
    ],
  },
];

import { useLanguage } from "../context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(DEFAULT_SKILL_GROUPS);

  useEffect(() => {
    const apiUrl = "/api";
    fetch(`${apiUrl}/skills`)
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
              level: mapLevelText(s.level || 70),
              percentage: s.level || 70,
            });
          });

          const updated: SkillGroup[] = [
            {
              title: "Web Development",
              icon: <Code2 size={22} />,
              color: "from-blue-500 to-cyan-500",
              glowColor: "shadow-blue-500/20 dark:shadow-cyan-950/30",
              skills: categories["Web"].length > 0 ? categories["Web"] : DEFAULT_SKILL_GROUPS[0].skills,
            },
            {
              title: "Mobile Development",
              icon: <Smartphone size={22} />,
              color: "from-sky-400 to-indigo-500",
              glowColor: "shadow-sky-500/20 dark:shadow-indigo-950/30",
              skills: categories["Mobile"].length > 0 ? categories["Mobile"] : DEFAULT_SKILL_GROUPS[1].skills,
            },
            {
              title: "Database",
              icon: <Database size={22} />,
              color: "from-emerald-450 to-teal-500",
              glowColor: "shadow-emerald-500/20 dark:shadow-teal-950/30",
              skills: categories["Database"].length > 0 ? categories["Database"] : DEFAULT_SKILL_GROUPS[2].skills,
            },
            {
              title: "Tools & Workflow",
              icon: <Wrench size={22} />,
              color: "from-amber-450 to-orange-500",
              glowColor: "shadow-amber-500/20 dark:shadow-orange-950/30",
              skills: categories["Tools"].length > 0 ? categories["Tools"] : DEFAULT_SKILL_GROUPS[3].skills,
            },
          ];
          setSkillGroups(updated);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Dynamic glow blur bg */}
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("skills_title")}
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--neon-cyan)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className={`glass-card p-6 sm:p-8 rounded-3xl hover:${group.glowColor}`}
            >
              <div className="flex items-center gap-3.5 mb-6">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-tr ${group.color} text-white shadow-md`}
                >
                  {group.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>

              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-sm mb-1.5 font-semibold">
                      <span className="text-zinc-800 dark:text-zinc-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-550 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/80">
                        {skill.level}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/65 dark:border-zinc-800/80 p-[2px]">
                      <div
                        className={`h-full bg-gradient-to-r ${group.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
