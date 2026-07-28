"use client";

import { useState, useEffect } from "react";
import { ExternalLink, MessageSquare, MapPin } from "lucide-react";

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

type Project = {
  title: string;
  description: string;
  githubUrl: string;
  figmaUrl?: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  imageUrl?: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "LouisAI LINE Bot",
    description: "พัฒนา LINE Bot โต้ตอบอัตโนมัติอัจฉริยะที่เชื่อมต่อเข้ากับ API ภายนอกเพื่อประมวลผลคำสั่งและช่วยเหลือผู้ใช้งานอย่างมีประสิทธิภาพ",
    githubUrl: "https://github.com/SirimongkolMannubut/louis_line-bot",
    tags: ["LINE API", "Node.js / Python", "API Integration", "AI Integration"],
    icon: <MessageSquare size={26} />,
    color: "from-green-550 to-emerald-500",
    glowColor: "hover:shadow-green-500/10 dark:hover:shadow-emerald-950/20",
  },
  {
    title: "GreenPoint",
    description: "เว็บแอปพลิเคชันสำหรับแสดงแผนที่ ค้นหาตำแหน่ง และจัดการข้อมูลร้านค้าที่เป็นมิตรกับสิ่งแวดล้อม ช่วยผู้ใช้ค้นหาร้านค้าได้สะดวกขึ้น",
    githubUrl: "https://github.com/ItzSakkarinTH/GreenPoint",
    figmaUrl: "https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0",
    tags: ["Next.js", "Tailwind CSS", "Map API", "Shop Management"],
    icon: <MapPin size={26} />,
    color: "from-blue-500 to-cyan-500",
    glowColor: "hover:shadow-blue-550/10 dark:hover:shadow-cyan-950/20",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-api-git-main-sirimongkolmannubuts-projects.vercel.app/api";
    fetch(`${apiUrl}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const colors = [
            { color: "from-green-550 to-emerald-500", glowColor: "hover:shadow-green-500/10 dark:hover:shadow-emerald-950/20", icon: <MessageSquare size={26} /> },
            { color: "from-blue-500 to-cyan-500", glowColor: "hover:shadow-blue-550/10 dark:hover:shadow-cyan-950/20", icon: <MapPin size={26} /> },
            { color: "from-purple-500 to-indigo-500", glowColor: "hover:shadow-purple-550/10 dark:hover:shadow-indigo-950/20", icon: <MessageSquare size={26} /> },
          ];
          const mapped: Project[] = data.map((item: any, idx: number) => {
            const style = colors[idx % colors.length];
            return {
              title: item.title,
              description: item.description,
              githubUrl: item.githubUrl || "https://github.com/SirimongkolMannubut",
              figmaUrl: item.figmaUrl || undefined,
              tags: item.techStack || ["Web"],
              icon: style.icon,
              color: style.color,
              glowColor: style.glowColor,
              imageUrl: item.imageUrl,
            };
          });
          setProjects(mapped);
        }
      })
      .catch(() => {
        // Fallback to default static data on network error
      });
  }, []);

  return (
    <section id="projects" className="py-20 relative bg-zinc-550/5 dark:bg-zinc-950/20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[40%] left-[20%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            ผลงานของฉัน (Projects)
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--neon-cyan)]" />
          <p className="text-zinc-550 dark:text-zinc-400 mt-4 max-w-lg mx-auto text-sm sm:text-base font-medium">
            นี่คือตัวอย่างผลงานบางส่วนที่ได้รับการพัฒนาขึ้น คุณสามารถคลิกปุ่ม GitHub หรือ Figma เพื่อดูรายละเอียด โค้ดต้นฉบับ หรือตัวอย่างการออกแบบได้โดยตรง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`glass-card rounded-3xl overflow-hidden flex flex-col group ${project.glowColor} hover:-translate-y-1`}
            >
              {/* Card Banner / Accent */}
              <div className={`h-3 bg-gradient-to-r ${project.color}`} />

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-5">
                  {/* Project Icon */}
                  <div
                    className={`p-3.5 rounded-2xl bg-gradient-to-tr ${project.color} text-white shadow-md`}
                  >
                    {project.icon}
                  </div>

                  {/* Top-Right Links */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors"
                      title="ดูโค้ดบน GitHub"
                    >
                      <GithubIcon size={20} />
                    </a>
                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-zinc-400 hover:text-pink-600 hover:bg-pink-50 dark:text-zinc-500 dark:hover:text-pink-400 dark:hover:bg-pink-955/20 transition-colors"
                        title="ดูดีไซน์บน Figma"
                      >
                        <FigmaIcon size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2.5">
                  {project.title}
                </h3>

                <p className="text-zinc-650 dark:text-zinc-350 text-sm sm:text-base leading-relaxed mb-6 flex-1 font-medium">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-50 dark:bg-zinc-900/60 text-zinc-650 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-auto w-full">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-850 dark:hover:bg-zinc-750 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <GithubIcon size={16} />
                    GitHub
                  </a>
                  {project.figmaUrl && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 dark:bg-pink-955/20 dark:hover:bg-pink-950/30 text-pink-650 dark:text-pink-400 font-semibold text-xs sm:text-sm transition-colors cursor-pointer border border-pink-100 dark:border-pink-900/50"
                    >
                      <FigmaIcon size={16} />
                      Figma
                    </a>
                  )}
                  {!project.figmaUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 transition-colors cursor-pointer"
                      title="Open Project"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
