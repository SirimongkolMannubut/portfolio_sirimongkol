"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Play, Pause, UserPlus, RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";
import { playHoverSound, playClickSound, playWarpSound } from "../lib/audio";

interface AgentDef {
  id: string;
  name: string;
  tech: string;
  color: string;
  targetId: string;
  actionText: string;
  typewriterCode: string;
  desc: string;
}

const AGENT_TASKS: AgentDef[] = [
  {
    id: "nextjs",
    name: "Next.js 16",
    tech: "React 19 Server Component",
    color: "#06b6d4", // Cyan
    targetId: "hero-title-zone",
    actionText: "render(<HeroHeadline />)",
    typewriterCode: "const Dev = () => <h1>Sirimongkol</h1>;",
    desc: "Building App Router Layout & Title",
  },
  {
    id: "flutter",
    name: "Flutter & Dart",
    tech: "Cross-Platform Mobile",
    color: "#38bdf8", // Sky
    targetId: "hero-role-zone",
    actionText: "Widget build(BuildContext context)",
    typewriterCode: "RoleBadge(role: 'Flutter Developer')",
    desc: "Compiling Mobile Role Widget",
  },
  {
    id: "typescript",
    name: "TypeScript (TS)",
    tech: "Strict Type System",
    color: "#3b82f6", // Blue
    targetId: "hero-subtitle-zone",
    actionText: "type Profile = Readonly<Developer>",
    typewriterCode: "interface SkillStack { frontEnd: true }",
    desc: "Validating Types & Subtitle",
  },
  {
    id: "sysarch",
    name: "SysArch @ กยศ.",
    tech: "Enterprise Architecture",
    color: "#10b981", // Emerald
    targetId: "hero-bento-zone",
    actionText: "verifyCredentials({ gpa: 3.05, intern: 'กยศ.' })",
    typewriterCode: "auth.verify('SLF_LoanFund_Internship');",
    desc: "Locking GPA 3.05 & Internship Credentials",
  },
  {
    id: "claude",
    name: "Claude Haiku AI",
    tech: "Vision OCR & JSON Parsing",
    color: "#f97316", // Orange
    targetId: "hero-cta-zone",
    actionText: "ai.extractTaxInvoice(docStream)",
    typewriterCode: "model.generateContent({ format: 'json' })",
    desc: "Integrating Flagship LINE OA AI Pipeline",
  },
  {
    id: "make",
    name: "Make.com Automation",
    tech: "Multi-Tenant Webhook Routing",
    color: "#a855f7", // Purple
    targetId: "hero-cta-zone",
    actionText: "router.dispatch('9-Path Folder Route')",
    typewriterCode: "webhook.onReceive(10_Companies_Drive);",
    desc: "Connecting 9-Path Automation Router",
  },
  {
    id: "mongodb",
    name: "Node.js & MongoDB",
    tech: "Full-Stack Data Storage",
    color: "#22c55e", // Green
    targetId: "hero-terminal-zone",
    actionText: "db.connect('sirimongkol_os_cluster')",
    typewriterCode: "collection.log('Sirimongkol.OS [ONLINE]');",
    desc: "Streaming Terminal Telemetry Logs",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    tech: "Glassmorphic Cyber Grid",
    color: "#eab308", // Yellow
    targetId: "hero-bento-zone",
    actionText: "apply('glass-card border-cyan-500/30')",
    typewriterCode: "shadow: 0_0_25px_rgba(6,182,212,0.3);",
    desc: "Styling Holographic Conic Glow Ring",
  },
];

interface LiveAgentState {
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
  actionText: string;
  typedCode: string;
  status: "idle" | "moving" | "targeting" | "building" | "completed";
}

export default function AgentSwarmCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [layersCount, setLayersCount] = useState<number>(12);
  const totalLayers = 128;
  const [buildStep, setBuildStep] = useState<number>(0);
  const [agents, setAgents] = useState<LiveAgentState[]>([]);
  const [activeRipple, setActiveRipple] = useState<{ x: number; y: number; color: string } | null>(null);

  // Initialize Swarm Positions
  const resetSwarm = useCallback(() => {
    playWarpSound();
    setLayersCount(18);
    setBuildStep(0);

    const initial = AGENT_TASKS.map((task, idx) => ({
      id: task.id,
      name: task.name,
      tech: task.tech,
      color: task.color,
      x: 80 + (idx % 4) * 220 + (Math.random() - 0.5) * 50,
      y: 60 + Math.floor(idx / 4) * 200 + (Math.random() - 0.5) * 40,
      targetX: 100,
      targetY: 100,
      boxX: 0,
      boxY: 0,
      boxWidth: 0,
      boxHeight: 0,
      boxVisible: false,
      actionText: task.actionText,
      typedCode: "",
      status: "idle" as const,
    }));
    setAgents(initial);
  }, []);

  useEffect(() => {
    resetSwarm();
  }, [resetSwarm]);

  // Main Choreography Animation Loop
  useEffect(() => {
    if (!isActive) return;

    let frameId: number;
    let tick = 0;

    const runLoop = () => {
      frameId = requestAnimationFrame(runLoop);
      tick++;

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      setAgents((prevAgents) =>
        prevAgents.map((agent, idx) => {
          const task = AGENT_TASKS[idx];
          const targetEl = document.getElementById(task.targetId);

          let destX = agent.targetX;
          let destY = agent.targetY;
          let boxX = agent.boxX;
          let boxY = agent.boxY;
          let boxWidth = agent.boxWidth;
          let boxHeight = agent.boxHeight;
          let boxVisible = agent.boxVisible;
          let actionText = agent.actionText;
          let typedCode = agent.typedCode;
          let status = agent.status;

          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            // Relative to container
            const relX = rect.left - containerRect.left;
            const relY = rect.top - containerRect.top;

            // Agent target is slightly offset to top-left of the element
            destX = relX + (idx % 2 === 0 ? 12 : rect.width - 30);
            destY = relY - 18;

            boxX = relX;
            boxY = relY;
            boxWidth = rect.width;
            boxHeight = rect.height;
            boxVisible = true;

            // Calculate progress of typewriter
            const fullText = task.typewriterCode;
            const typeIndex = Math.floor((tick * 0.4 * speedMultiplier + idx * 5) % (fullText.length + 15));
            typedCode = fullText.slice(0, Math.min(typeIndex, fullText.length));

            if (typeIndex >= fullText.length && typeIndex <= fullText.length + 2 && tick % 40 === 0) {
              status = "completed";
            } else {
              status = "building";
            }
          } else {
            // Ambient roam
            destX = 100 + Math.sin(tick * 0.02 + idx) * 350 + (idx % 3) * 200;
            destY = 120 + Math.cos(tick * 0.02 + idx) * 150 + Math.floor(idx / 3) * 120;
            boxVisible = false;
          }

          // Smooth lerp movement with spring damp
          const lerpFactor = 0.045 * speedMultiplier;
          const newX = agent.x + (destX - agent.x) * lerpFactor;
          const newY = agent.y + (destY - agent.y) * lerpFactor;

          return {
            ...agent,
            x: newX,
            y: newY,
            targetX: destX,
            targetY: destY,
            boxX,
            boxY,
            boxWidth,
            boxHeight,
            boxVisible,
            actionText,
            typedCode,
            status,
          };
        })
      );

      // Periodically trigger a click ripple on an element
      if (tick % 75 === 0 && agents.length > 0) {
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        setActiveRipple({ x: randomAgent.x, y: randomAgent.y, color: randomAgent.color });
      }

      // Layer assembling counter
      if (tick % 50 === 0) {
        setLayersCount((prev) => (prev >= totalLayers ? 18 : prev + 1));
      }
    };

    frameId = requestAnimationFrame(runLoop);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, speedMultiplier, agents.length]);

  // Click handler to spawn a custom quick cursor
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setActiveRipple({ x: clickX, y: clickY, color: "#38bdf8" });
    playClickSound();
  };

  const cycleSpeed = () => {
    playClickSound();
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1));
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="absolute inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* 1. CAD Guide Lines & Selection Bounding Boxes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {agents.map((agent) => {
          if (!agent.boxVisible) return null;
          return (
            <g key={`guide-${agent.id}`} className="transition-all duration-300">
              {/* Full-width Horizontal Alignment Laser Line */}
              <line
                x1={0}
                y1={agent.boxY}
                x2="100%"
                y2={agent.boxY}
                stroke={agent.color}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
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
                opacity="0.3"
              />

              {/* Exact Bounding Selection Rectangle */}
              <rect
                x={agent.boxX - 6}
                y={agent.boxY - 6}
                width={agent.boxWidth + 12}
                height={agent.boxHeight + 12}
                fill={agent.color}
                fillOpacity="0.05"
                stroke={agent.color}
                strokeWidth="1.5"
                strokeDasharray="5 5"
                rx="12"
              />

              {/* Four Corner CAD Resize Grips */}
              <rect
                x={agent.boxX - 9}
                y={agent.boxY - 9}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.boxX + agent.boxWidth + 3}
                y={agent.boxY - 9}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.boxX - 9}
                y={agent.boxY + agent.boxHeight + 3}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.boxX + agent.boxWidth + 3}
                y={agent.boxY + agent.boxHeight + 3}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />

              {/* CAD Dimension & Component Tag */}
              <g transform={`translate(${agent.boxX}, ${agent.boxY - 14})`}>
                <rect
                  x="-2"
                  y="-10"
                  width={agent.name.length * 6.5 + 85}
                  height="16"
                  fill="#09090b"
                  stroke={agent.color}
                  strokeWidth="1"
                  rx="4"
                  opacity="0.9"
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

      {/* 2. Expanding Click Ripple Effect */}
      {activeRipple && (
        <div
          key={`${activeRipple.x}-${activeRipple.y}`}
          className="absolute w-8 h-8 rounded-full border-2 animate-ping pointer-events-none"
          style={{
            left: activeRipple.x - 16,
            top: activeRipple.y - 16,
            borderColor: activeRipple.color,
          }}
        />
      )}

      {/* 3. Multiplayer AI Agent Cursors with Exact Language & Typing Bar */}
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="absolute transition-transform duration-75 ease-out pointer-events-none z-40"
          style={{
            transform: `translate3d(${agent.x}px, ${agent.y}px, 0)`,
          }}
        >
          {/* Cursor Pointer (Figma/macOS Style) */}
          <div className="relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={agent.color}
              stroke="white"
              strokeWidth="1.5"
              className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
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
            {/* Primary Name Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-white shadow-xl whitespace-nowrap backdrop-blur-md border border-white/20"
              style={{
                backgroundColor: agent.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{agent.name}</span>
              <span className="text-[9px] px-1 py-0.2 rounded-md bg-black/30 font-mono text-zinc-100">
                {agent.tech}
              </span>
            </div>

            {/* Live Typing / Construction Code Pill */}
            {agent.typedCode && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-950/90 border border-zinc-700/80 text-[9px] font-mono text-zinc-200 shadow-xl backdrop-blur-md max-w-xs truncate">
                <span className="text-cyan-400 font-bold">⚡</span>
                <span className="text-zinc-300 truncate">{agent.typedCode}</span>
                <span className="w-1 h-3 bg-cyan-400 cursor-blink inline-block" />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 4. Floating Bottom Swarm Control HUD (The Viral Instagram Reel Bar) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-zinc-950/95 border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-xs font-mono text-zinc-200">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isActive ? "bg-emerald-400" : "bg-amber-400"
              } opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isActive ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
          </span>
          <span className="font-bold text-zinc-200 tracking-wider">
            {agents.length} AGENTS COMPILING
          </span>
        </div>

        {/* Layer Count */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-zinc-400">
          <span className="text-cyan-400 font-bold">{layersCount}</span>
          <span>/ {totalLayers} LAYERS SYNCED</span>
        </div>

        {/* Speed Multiplier Button */}
        <button
          onClick={cycleSpeed}
          onMouseEnter={playHoverSound}
          className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-bold text-cyan-400 transition-colors cursor-pointer"
          title="ปรับความเร็วการจำลอง Swarm"
        >
          {speedMultiplier}x SPEED
        </button>

        {/* Rebuild Sequence Button */}
        <button
          onClick={resetSwarm}
          onMouseEnter={playHoverSound}
          className="px-2.5 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
          title="รันการประกอบ UI สดใหม่อีกครั้ง (Rebuild Swarm)"
        >
          <RotateCcw size={11} />
          <span>REBUILD</span>
        </button>

        {/* Pause/Play Toggle */}
        <button
          onClick={() => {
            playClickSound();
            setIsActive(!isActive);
          }}
          onMouseEnter={playHoverSound}
          className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title={isActive ? "พัก Swarm ชั่วคราว" : "เล่น Swarm ต่อ"}
        >
          {isActive ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>
    </div>
  );
}
