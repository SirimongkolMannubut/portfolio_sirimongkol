"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, FastForward, Compass, CheckCircle2, X } from "lucide-react";
import { playHoverSound, playClickSound, playWarpSound } from "../lib/audio";

interface SectionConfig {
  id: string;
  name: string;
  layersAtEnd: number;
  agents: {
    name: string;
    tech: string;
    color: string;
    selector: string;
    code: string;
    offsetY: number;
    offsetX: number;
  }[];
}

const TOUR_SECTIONS: SectionConfig[] = [
  {
    id: "home",
    name: "01 // HERO ARCHITECTURE",
    layersAtEnd: 63,
    agents: [
      {
        name: "Next.js 16",
        tech: "React 19 App Router",
        color: "#06b6d4",
        selector: "#hero-title-zone",
        code: "const Dev = () => <h1>Sirimongkol M.</h1>;",
        offsetY: -14,
        offsetX: 16,
      },
      {
        name: "Flutter Dev",
        tech: "Cross-Platform Mobile",
        color: "#38bdf8",
        selector: "#hero-role-zone",
        code: "RoleBadge(title: 'Flutter Developer')",
        offsetY: -12,
        offsetX: 24,
      },
      {
        name: "TypeScript (TS)",
        tech: "Strict Type System",
        color: "#3b82f6",
        selector: "#hero-subtitle-zone",
        code: "type Stack = ['Next.js 16', 'Flutter', 'TS'];",
        offsetY: -14,
        offsetX: 20,
      },
      {
        name: "SysArch @ กยศ.",
        tech: "Enterprise GovTech",
        color: "#10b981",
        selector: "#hero-bento-zone",
        code: "auth.verify('SLF_Internship', GPA: 3.05);",
        offsetY: -16,
        offsetX: 16,
      },
      {
        name: "ASTRA 🛡️",
        tech: "Order & Architect AI",
        color: "#06b6d4",
        selector: "#hero-terminal-zone",
        code: "astra.defend('Purity & Zero Glitch');",
        offsetY: -20,
        offsetX: 12,
      },
      {
        name: "IGNIS 🔥",
        tech: "Rogue Rival AI",
        color: "#f43f5e",
        selector: "#hero-terminal-zone",
        code: "ignis.spark('Chaos is true art!');",
        offsetY: 28,
        offsetX: 38,
      },
    ],
  },
  {
    id: "about",
    name: "02 // ACADEMIC & INTERNSHIP PROFILE",
    layersAtEnd: 124,
    agents: [
      {
        name: "CS @ Sisaket Rajabhat",
        tech: "Computer Science (GPA 3.05)",
        color: "#f59e0b",
        selector: "#about h2",
        code: "university.certify('B.Sc. Computer Science');",
        offsetY: -14,
        offsetX: 20,
      },
      {
        name: "Student Loan Fund (กยศ.)",
        tech: "Full-Time Intern 2024-2025",
        color: "#10b981",
        selector: "#about .glass-card",
        code: "govtech.audit('Student Loan Fund Systems');",
        offsetY: -16,
        offsetX: 30,
      },
      {
        name: "Figma UI/UX",
        tech: "Design System & Tokens",
        color: "#ec4899",
        selector: "#about",
        code: "figma.exportTokens({ rounded: '2xl' });",
        offsetY: 60,
        offsetX: 80,
      },
    ],
  },
  {
    id: "skills",
    name: "03 // FULL-STACK TECH STACKS",
    layersAtEnd: 198,
    agents: [
      {
        name: "TypeScript / ES6+",
        tech: "Modern JavaScript",
        color: "#3b82f6",
        selector: "#skills",
        code: "async function compileStack(): Promise<Dev>",
        offsetY: 40,
        offsetX: 30,
      },
      {
        name: "React 19 & Tailwind v4",
        tech: "High-Performance CSS",
        color: "#06b6d4",
        selector: "#skills",
        code: "@theme { --color-neon: #06b6d4; }",
        offsetY: 120,
        offsetX: 140,
      },
      {
        name: "MongoDB Atlas",
        tech: "NoSQL Cloud Database",
        color: "#22c55e",
        selector: "#skills",
        code: "mongoose.connect(process.env.MONGODB_URI);",
        offsetY: 180,
        offsetX: 60,
      },
      {
        name: "Gemini 2.5 AI",
        tech: "Multimodal AI Co-Pilot",
        color: "#a855f7",
        selector: "#skills",
        code: "ai.generate({ model: 'gemini-2.5-flash' });",
        offsetY: 80,
        offsetX: 220,
      },
    ],
  },
  {
    id: "projects",
    name: "04 // FLAGSHIP AUTOMATION & PROJECTS",
    layersAtEnd: 295,
    agents: [
      {
        name: "Claude Haiku Vision AI",
        tech: "Accounting Invoice OCR",
        color: "#f97316",
        selector: "#projects",
        code: "claude.ocr({ extract: ['TaxID', 'VAT_7%'] });",
        offsetY: 50,
        offsetX: 40,
      },
      {
        name: "Make.com Automation",
        tech: "9-Path Multi-Tenant Router",
        color: "#a855f7",
        selector: "#projects",
        code: "make.router.route(10_Clients_Drive_8Folders);",
        offsetY: 130,
        offsetX: 120,
      },
      {
        name: "SLF Portal Architect",
        tech: "Student Loan Fund Management",
        color: "#10b981",
        selector: "#projects",
        code: "deploy(SLF_Portal_Verification_Service);",
        offsetY: 200,
        offsetX: 50,
      },
      {
        name: "Google Apps Script",
        tech: "Google Workspace API",
        color: "#22c55e",
        selector: "#projects",
        code: "DriveApp.getFolderById(TargetFolderId);",
        offsetY: 90,
        offsetX: 260,
      },
    ],
  },
  {
    id: "activities",
    name: "05 // INTERNSHIP & COMMUNITY IMPACT",
    layersAtEnd: 342,
    agents: [
      {
        name: "GovTech Architect @ กยศ.",
        tech: "Public Sector Experience",
        color: "#10b981",
        selector: "#activities",
        code: "org.certify('Student Loan Fund Internship');",
        offsetY: 60,
        offsetX: 40,
      },
      {
        name: "Charity Platform Lead",
        tech: "Sisaket Rajabhat Hackathon",
        color: "#38bdf8",
        selector: "#activities",
        code: "deploy(Sisaket_Charity_Web_Platform);",
        offsetY: 140,
        offsetX: 160,
      },
    ],
  },
  {
    id: "contact",
    name: "06 // SECURE PRODUCTION DEPLOY",
    layersAtEnd: 381,
    agents: [
      {
        name: "API Gateway (SMTP)",
        tech: "Direct Contact Channel",
        color: "#06b6d4",
        selector: "#contact",
        code: "mail.send({ to: 'topt75870@gmail.com' });",
        offsetY: 50,
        offsetX: 40,
      },
      {
        name: "SSL & Security Audit",
        tech: "Zero Trust Protection",
        color: "#10b981",
        selector: "#contact",
        code: "security.enforce('SSL_TLS_v1.3_ENCRYPTED');",
        offsetY: 130,
        offsetX: 180,
      },
    ],
  },
];

interface LiveAgent {
  id: string;
  name: string;
  tech: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  boxX: number;
  boxY: number;
  boxWidth: number;
  boxHeight: number;
  boxVisible: boolean;
  typedCode: string;
}

export default function AgentSwarmCanvas() {
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [layersCount, setLayersCount] = useState<number>(48);
  const [agents, setAgents] = useState<LiveAgent[]>([]);
  const [tourProgress, setTourProgress] = useState<number>(0);
  const tourTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect current visible section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      TOUR_SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.4 && rect.bottom >= vh * 0.2) {
            setCurrentSectionIndex(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Agent Positions based on active section
  useEffect(() => {
    const currentSec = TOUR_SECTIONS[currentSectionIndex] || TOUR_SECTIONS[0];
    setLayersCount(currentSec.layersAtEnd);

    const newAgents: LiveAgent[] = currentSec.agents.map((agentDef, idx) => {
      let targetX = 100 + (idx % 3) * 280;
      let targetY = 120 + Math.floor(idx / 3) * 160;
      let boxX = targetX - 10;
      let boxY = targetY - 10;
      let boxWidth = 240;
      let boxHeight = 60;
      let boxVisible = true;

      // Find actual element on page if available
      const targetElement = document.querySelector(agentDef.selector);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        targetX = Math.max(30, rect.left + agentDef.offsetX);
        targetY = Math.max(80, rect.top + agentDef.offsetY);
        boxX = rect.left;
        boxY = rect.top;
        boxWidth = Math.min(window.innerWidth - rect.left - 20, rect.width);
        boxHeight = rect.height;
      }

      return {
        id: `${currentSec.id}-${idx}`,
        name: agentDef.name,
        tech: agentDef.tech,
        color: agentDef.color,
        x: targetX + (Math.random() - 0.5) * 60,
        y: targetY + (Math.random() - 0.5) * 40,
        targetX,
        targetY,
        boxX,
        boxY,
        boxWidth,
        boxHeight,
        boxVisible,
        typedCode: agentDef.code,
      };
    });

    setAgents(newAgents);
  }, [currentSectionIndex]);

  // Smooth Motion Loop
  useEffect(() => {
    let frameId: number;
    let tick = 0;

    const animateLoop = () => {
      frameId = requestAnimationFrame(animateLoop);
      tick++;

      setAgents((prev) =>
        prev.map((agent) => {
          // Slight natural hover jitter
          const jitterX = Math.sin(tick * 0.04) * 2;
          const jitterY = Math.cos(tick * 0.04) * 2;

          const dx = agent.targetX + jitterX - agent.x;
          const dy = agent.targetY + jitterY - agent.y;

          return {
            ...agent,
            x: agent.x + dx * 0.08 * speedMultiplier,
            y: agent.y + dy * 0.08 * speedMultiplier,
          };
        })
      );
    };

    frameId = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(frameId);
  }, [speedMultiplier]);

  // Autopilot Guided Tour Function (Smoothly scrolls section to section like in Reel 2)
  const startTour = useCallback(() => {
    playWarpSound();
    setIsTourActive(true);
    setTourStep(0);

    let step = 0;
    const runTourStep = () => {
      if (step >= TOUR_SECTIONS.length) {
        setIsTourActive(false);
        return;
      }

      const sec = TOUR_SECTIONS[step];
      const el = document.getElementById(sec.id);
      if (el) {
        const offset = 80;
        const targetPos = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth",
        });
      }

      setCurrentSectionIndex(step);
      setTourStep(step);
      setTourProgress(Math.round(((step + 1) / TOUR_SECTIONS.length) * 100));
      step++;

      // Tour advances every 4.8 seconds / speedMultiplier
      tourTimerRef.current = setTimeout(runTourStep, 4800 / speedMultiplier);
    };

    runTourStep();
  }, [speedMultiplier]);

  const pauseTour = () => {
    playClickSound();
    if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    setIsTourActive(false);
  };

  const cycleSpeed = () => {
    playClickSound();
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {/* 1. CAD Guide Lines & Selection Bounding Boxes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {agents.map((agent) => {
          if (!agent.boxVisible || agent.boxWidth <= 0) return null;
          return (
            <g key={`box-${agent.id}`} className="transition-all duration-300">
              {/* Full-width Horizontal Alignment Laser Line */}
              <line
                x1={0}
                y1={agent.boxY}
                x2="100%"
                y2={agent.boxY}
                stroke={agent.color}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.35"
              />
              {/* Full-height Vertical Alignment Laser Line */}
              <line
                x1={agent.boxX}
                y1={0}
                x2={agent.boxX}
                y2="100%"
                stroke={agent.color}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.35"
              />

              {/* Exact Bounding Selection Rectangle */}
              <rect
                x={agent.boxX - 4}
                y={agent.boxY - 4}
                width={agent.boxWidth + 8}
                height={agent.boxHeight + 8}
                fill={agent.color}
                fillOpacity="0.05"
                stroke={agent.color}
                strokeWidth="1.5"
                strokeDasharray="6 6"
                rx="10"
              />

              {/* Corner Grips */}
              <rect
                x={agent.boxX - 7}
                y={agent.boxY - 7}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.boxX + agent.boxWidth + 1}
                y={agent.boxY - 7}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.boxX - 7}
                y={agent.boxY + agent.boxHeight + 1}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.boxX + agent.boxWidth + 1}
                y={agent.boxY + agent.boxHeight + 1}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />

              {/* CAD Dimension & Component Tag */}
              <g transform={`translate(${agent.boxX}, ${agent.boxY - 12})`}>
                <rect
                  x="-2"
                  y="-10"
                  width={agent.name.length * 6.5 + 85}
                  height="16"
                  fill="#09090b"
                  stroke={agent.color}
                  strokeWidth="1"
                  rx="4"
                  opacity="0.95"
                />
                <text
                  x="4"
                  y="2"
                  fill={agent.color}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {agent.name} · {Math.round(agent.boxWidth)}×{Math.round(agent.boxHeight)}px
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* 2. Multiplayer AI Agent Cursors with Exact Language & Typing Bar */}
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="absolute transition-transform duration-75 ease-out pointer-events-none z-40"
          style={{
            transform: `translate3d(${agent.x}px, ${agent.y}px, 0)`,
          }}
        >
          {/* Cursor Pointer */}
          <div className="relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={agent.color}
              stroke="white"
              strokeWidth="1.5"
              className="filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            >
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
            </svg>

            {/* Glowing Pointer Tip Dot */}
            <span
              className="absolute top-0 left-0 w-2 h-2 rounded-full animate-ping opacity-75"
              style={{ backgroundColor: agent.color }}
            />
          </div>

          {/* Agent Spec Badge (Name + Tech Language + Live Typing) */}
          <div className="ml-4 -mt-2 space-y-1">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-white shadow-2xl whitespace-nowrap backdrop-blur-md border border-white/20"
              style={{
                backgroundColor: agent.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{agent.name}</span>
              <span className="text-[9px] px-1 py-0.2 rounded-md bg-black/35 font-mono text-zinc-100">
                {agent.tech}
              </span>
            </div>

            {/* Live Typing Code Pill */}
            {agent.typedCode && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-950/95 border border-zinc-700/80 text-[9px] font-mono text-zinc-200 shadow-2xl backdrop-blur-md max-w-sm truncate">
                <span className="text-cyan-400 font-bold">⚡</span>
                <span className="text-zinc-300 truncate">{agent.typedCode}</span>
                <span className="w-1 h-3 bg-cyan-400 cursor-blink inline-block" />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 3. Floating Bottom Tour Control HUD (Signature Reel 2 Bar) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-zinc-950/95 border border-cyan-500/40 shadow-[0_12px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-xs font-mono text-zinc-200">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isTourActive ? "bg-emerald-400" : "bg-cyan-400"
              } opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isTourActive ? "bg-emerald-500" : "bg-cyan-500"
              }`}
            />
          </span>
          <span className="font-bold text-zinc-200 tracking-wider">
            {TOUR_SECTIONS[currentSectionIndex]?.name || "SWARM ENGINE"}
          </span>
        </div>

        {/* Layer Count */}
        <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-zinc-400">
          <span className="text-cyan-400 font-bold">{layersCount}</span>
          <span>/ 381 LAYERS</span>
        </div>

        {/* Speed Toggle */}
        <button
          onClick={cycleSpeed}
          onMouseEnter={playHoverSound}
          className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-bold text-cyan-400 transition-colors cursor-pointer"
          title="ปรับความเร็วการจำลอง Tour"
        >
          {speedMultiplier}x
        </button>

        {/* Tour Start / Pause Button */}
        {isTourActive ? (
          <button
            onClick={pauseTour}
            onMouseEnter={playHoverSound}
            className="px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
            title="หยุด Tour ชั่วคราว"
          >
            <Pause size={11} />
            <span>PAUSE TOUR</span>
          </button>
        ) : (
          <button
            onClick={startTour}
            onMouseEnter={playHoverSound}
            className="px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-[11px] shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            title="เริ่มทัวร์ทั้งเว็บไซต์แบบในคลิป Instagram"
          >
            <Compass size={12} className="animate-spin" />
            <span>TOUR WEBSITE</span>
          </button>
        )}

        {/* Replay Button */}
        <button
          onClick={() => {
            playClickSound();
            window.scrollTo({ top: 0, behavior: "smooth" });
            startTour();
          }}
          onMouseEnter={playHoverSound}
          className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="กลับไปเริ่มต้นทัวร์ตั้งแต่หน้าแรก"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}
