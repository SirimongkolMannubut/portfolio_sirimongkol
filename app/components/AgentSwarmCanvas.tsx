"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, Sparkles, UserPlus, Zap } from "lucide-react";
import { playHoverSound, playClickSound } from "../lib/audio";

interface Agent {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  action: "idle" | "moving" | "selecting" | "clicking" | "typing";
  boxWidth: number;
  boxHeight: number;
  boxVisible: boolean;
  pulse: number;
}

const AGENT_PROFILES = [
  { name: "Next.js 16", color: "#06b6d4" },
  { name: "Flutter Dev", color: "#38bdf8" },
  { name: "Claude AI", color: "#f97316" },
  { name: "Make Automation", color: "#a855f7" },
  { name: "SysArch @ กยศ.", color: "#10b981" },
  { name: "TypeScript Core", color: "#3b82f6" },
  { name: "Gemini 2.5", color: "#ec4899" },
  { name: "MongoDB Atlas", color: "#22c55e" },
  { name: "UI/UX Layout", color: "#eab308" },
  { name: "Security Audit", color: "#ef4444" },
];

export default function AgentSwarmCanvas() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [agentCount, setAgentCount] = useState<number>(8);
  const [layersCount, setLayersCount] = useState<number>(38);
  const totalLayers = 128;
  const containerRef = useRef<HTMLDivElement>(null);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Initialize Agents
  useEffect(() => {
    const initialAgents: Agent[] = AGENT_PROFILES.slice(0, agentCount).map((p, idx) => ({
      id: idx,
      name: p.name,
      color: p.color,
      x: 100 + Math.random() * 800,
      y: 80 + Math.random() * 500,
      targetX: 100 + Math.random() * 800,
      targetY: 80 + Math.random() * 500,
      speed: 0.035 + Math.random() * 0.025,
      action: "idle",
      boxWidth: 120 + Math.random() * 180,
      boxHeight: 40 + Math.random() * 80,
      boxVisible: Math.random() > 0.4,
      pulse: 0,
    }));
    setAgents(initialAgents);
  }, []);

  // Autonomous Swarm Motion Engine
  useEffect(() => {
    if (!isActive) return;

    let frameId: number;
    let timer = 0;

    const loop = () => {
      frameId = requestAnimationFrame(loop);
      timer++;

      setAgents((prev) =>
        prev.map((agent) => {
          let { x, y, targetX, targetY, speed, boxVisible, boxWidth, boxHeight, action } = agent;

          // Check if agent reached target
          const dist = Math.hypot(targetX - x, targetY - y);
          if (dist < 15 || Math.random() < 0.008) {
            // Pick new target within container
            const w = containerRef.current?.clientWidth || 1000;
            const h = containerRef.current?.clientHeight || 650;

            targetX = 60 + Math.random() * (w - 140);
            targetY = 60 + Math.random() * (h - 140);

            // Change action randomly
            const rand = Math.random();
            if (rand < 0.4) {
              action = "selecting";
              boxVisible = true;
              boxWidth = 140 + Math.random() * 260;
              boxHeight = 35 + Math.random() * 90;
            } else if (rand < 0.7) {
              action = "clicking";
              boxVisible = false;
            } else {
              action = "moving";
              boxVisible = false;
            }
          }

          // Smooth lerp movement
          const currentSpeed = speed * speedMultiplier;
          x += (targetX - x) * currentSpeed;
          y += (targetY - y) * currentSpeed;

          return {
            ...agent,
            x,
            y,
            targetX,
            targetY,
            action,
            boxVisible,
            boxWidth,
            boxHeight,
          };
        })
      );

      // Periodically update layer counter to simulate live building
      if (timer % 90 === 0) {
        setLayersCount((prev) => (prev >= totalLayers ? 24 : prev + 1));
      }
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, speedMultiplier]);

  // Spawn new agent
  const addAgent = () => {
    playClickSound();
    if (agents.length >= AGENT_PROFILES.length) return;
    const nextProfile = AGENT_PROFILES[agents.length];
    const newAgent: Agent = {
      id: agents.length,
      name: nextProfile.name,
      color: nextProfile.color,
      x: 200 + Math.random() * 400,
      y: 150 + Math.random() * 300,
      targetX: 200 + Math.random() * 500,
      targetY: 150 + Math.random() * 350,
      speed: 0.04,
      action: "selecting",
      boxWidth: 200,
      boxHeight: 60,
      boxVisible: true,
      pulse: 0,
    };
    setAgents((prev) => [...prev, newAgent]);
    setAgentCount((prev) => prev + 1);
  };

  const toggleActive = () => {
    playClickSound();
    setIsActive(!isActive);
  };

  const cycleSpeed = () => {
    playClickSound();
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1));
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* 1. Alignment Guides & Selection Boxes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {agents.map((agent) => {
          if (!agent.boxVisible) return null;
          return (
            <g key={`box-${agent.id}`} className="transition-opacity duration-300">
              {/* Vertical CAD Guide Line */}
              <line
                x1={agent.x}
                y1={0}
                x2={agent.x}
                y2="100%"
                stroke={agent.color}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.35"
              />
              {/* Horizontal CAD Guide Line */}
              <line
                x1={0}
                y1={agent.y}
                x2="100%"
                y2={agent.y}
                stroke={agent.color}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.35"
              />

              {/* Selection Bounding Box */}
              <rect
                x={agent.x - 10}
                y={agent.y - 10}
                width={agent.boxWidth}
                height={agent.boxHeight}
                fill={agent.color}
                fillOpacity="0.06"
                stroke={agent.color}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                rx="6"
              />

              {/* Corner Selection Handles */}
              <rect
                x={agent.x - 13}
                y={agent.y - 13}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.x + agent.boxWidth - 13}
                y={agent.y - 13}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.x - 13}
                y={agent.y + agent.boxHeight - 13}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <rect
                x={agent.x + agent.boxWidth - 13}
                y={agent.y + agent.boxHeight - 13}
                width="6"
                height="6"
                fill="white"
                stroke={agent.color}
                strokeWidth="1.5"
              />

              {/* Dimension Tag */}
              <text
                x={agent.x}
                y={agent.y - 16}
                fill={agent.color}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {Math.round(agent.boxWidth)} × {Math.round(agent.boxHeight)} px
              </text>
            </g>
          );
        })}
      </svg>

      {/* 2. Multiplayer AI Agent Cursors */}
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="absolute transition-transform duration-75 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${agent.x}px, ${agent.y}px, 0)`,
          }}
        >
          {/* Cursor Pointer (Figma/macOS Style) */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={agent.color}
            stroke="white"
            strokeWidth="1.5"
            className="filter drop-shadow-md"
          >
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>

          {/* Agent Label Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-white shadow-lg whitespace-nowrap ml-3 -mt-1 backdrop-blur-md"
            style={{
              backgroundColor: agent.color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>{agent.name}</span>
            {agent.action === "selecting" && (
              <span className="text-[8px] bg-black/25 px-1 rounded">BUILDING</span>
            )}
          </div>
        </div>
      ))}

      {/* 3. Floating Bottom Swarm Control HUD (Signature Reel 2 Bar) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-2xl text-xs font-mono text-zinc-300">
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
          <span className="font-bold text-zinc-200">
            {agents.length} AGENTS ACTIVE
          </span>
        </div>

        {/* Layer Count */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-zinc-400">
          <span>{layersCount} / {totalLayers} LAYERS</span>
        </div>

        {/* Speed Toggle */}
        <button
          onClick={cycleSpeed}
          onMouseEnter={playHoverSound}
          className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-bold text-cyan-400 transition-colors cursor-pointer"
          title="ปรับความเร็ว Agent"
        >
          {speedMultiplier}x SPEED
        </button>

        {/* Add Agent Button */}
        <button
          onClick={addAgent}
          onMouseEnter={playHoverSound}
          disabled={agents.length >= AGENT_PROFILES.length}
          className="px-2.5 py-1 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-[11px] font-bold text-blue-300 transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-40"
          title="เพิ่ม AI Agent ใน Swarm"
        >
          <UserPlus size={11} />
          <span>+ AGENT</span>
        </button>

        {/* Pause/Play Toggle */}
        <button
          onClick={toggleActive}
          onMouseEnter={playHoverSound}
          className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title={isActive ? "พักการจำลอง Swarm" : "เริ่มการจำลอง Swarm"}
        >
          {isActive ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>
    </div>
  );
}
