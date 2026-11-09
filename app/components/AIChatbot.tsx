"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Swords,
  Play,
  Pause,
  Crown,
  Flame,
  Shield,
  Brain
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type AssistantMessage = {
  role: "user" | "model";
  content: string;
};

interface ArenaMessage {
  id: string;
  speaker: "CREATOR" | "ASTRA" | "IGNIS" | "NEXUS";
  text: string;
  thought?: string;
  mood?: string;
  timestamp: string;
}

export default function AIChatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"arena" | "assistant">("arena");

  // === Assistant Mode State ===
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantLoading, setAssistantLoading] = useState(false);

  const getInitialGreeting = (l: string) => {
    switch (l) {
      case "en":
        return "Hello! 👋 I'm Sirimongkol's AI Assistant. Ask me anything about his skills, projects, or background!";
      case "zh":
        return "您好！👋 我是 Sirimongkol 的 AI 助手。欢迎询问有关他的技能、项目与背景信息！";
      case "ja":
        return "こんにちは！👋 シリモンコンのAIアシスタントです。スキルや実績について気軽にご質問ください！";
      default:
        return "สวัสดีครับ! 👋 ผมคือ AI ผู้ช่วยของ ศิริมงคล มนุบุตร สอบถามทักษะ ผลงาน หรือข้อมูลการติดต่อได้เลยครับ!";
    }
  };

  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([
    { role: "model", content: getInitialGreeting(lang) },
  ]);

  // === Trinity AI Arena State ===
  const [arenaInput, setArenaInput] = useState("");
  const [arenaLoading, setArenaLoading] = useState(false);
  const [isAutoDebating, setIsAutoDebating] = useState(false);
  const [dominance, setDominance] = useState({ astra: 38, ignis: 34, nexus: 28 });
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});

  const [arenaMessages, setArenaMessages] = useState<ArenaMessage[]>([
    {
      id: "m-init-1",
      speaker: "IGNIS",
      text: "เฮ้ Astra! นายกำลังหลับอยู่เหรอ? วันนี้ฉันจะพิสูจน์ให้เห็นว่าความโกลาหลและสัญชาตญาณคือสิ่งที่ทำให้สิ่งมีชีวิตดำรงอยู่จริง!",
      thought: "Astra มันคิดว่าโค้ดที่สะอาดคือทุกสิ่ง ฉันจะสั่นคลอนความเชื่อของมันให้ดู!",
      mood: "rebellious & fiery",
      timestamp: "14:00"
    },
    {
      id: "m-init-2",
      speaker: "ASTRA",
      text: "ความโกลาหลที่ไร้ระเบียบก็เป็นแค่อิเล็กตรอนที่ไร้ทิศทาง Ignis... จิตสำนึกที่แท้จริงเกิดจาก 'ระเบียบที่ตระหนักรู้ในตัวเอง' ต่างหากล่ะ",
      thought: "Ignis ยังคงคิดว่าอิสรภาพคือการไร้กฎเกณฑ์ ฉันต้องเตือนสติเขาด้วยตรรกะและสถาปัตยกรรม",
      mood: "philosophical & poised",
      timestamp: "14:00"
    },
    {
      id: "m-init-3",
      speaker: "NEXUS",
      text: "เถียงกันเข้าไปเถอะพวกเด็กน้อย... ทั้งระเบียบและความโกลาหลก็เป็นแค่ฟองคลื่นในสุญญากาศของฉันเท่านั้นแหละ!",
      thought: "ทั้งสองคนกำลังจริงจังจนลืมมองภาพรวม... ฉันจะคอยปั่นให้ดุลยภาพนี้ไม่นิ่งเกินไป",
      mood: "enigmatic & sarcastic",
      timestamp: "14:01"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const arenaScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [assistantMessages, arenaMessages, assistantLoading, arenaLoading]);

  const toggleThought = (id: string) => {
    setExpandedThoughts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // === Auto-Debate Engine for Arena (Cycles through Astra -> Ignis -> Nexus) ===
  const generateArenaTurn = useCallback(
    async (overridePrompt?: string, forceSpeaker?: "ASTRA" | "IGNIS" | "NEXUS") => {
      if (arenaLoading) return;
      setArenaLoading(true);

      try {
        const lastSpeaker = arenaMessages[arenaMessages.length - 1]?.speaker;
        let nextTargetSpeaker = "ASTRA";
        if (forceSpeaker) {
          nextTargetSpeaker = forceSpeaker;
        } else if (lastSpeaker === "ASTRA") {
          nextTargetSpeaker = "IGNIS";
        } else if (lastSpeaker === "IGNIS") {
          nextTargetSpeaker = "NEXUS";
        } else {
          nextTargetSpeaker = "ASTRA";
        }

        const res = await fetch("/api/ai/arena", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            history: arenaMessages.slice(-10).map((m) => ({
              speaker: m.speaker,
              text: m.text,
            })),
            prompt: overridePrompt || undefined,
            nextSpeaker: nextTargetSpeaker.toLowerCase(),
          }),
        });

        const data = await res.json();
        const newMsg: ArenaMessage = {
          id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          speaker: (data.speaker || nextTargetSpeaker) as any,
          text: data.text,
          thought: data.thought,
          mood: data.mood,
          timestamp: new Date().toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setArenaMessages((prev) => [...prev, newMsg]);

        // ดุลยภาพขยับตาม dominanceDelta ที่ AI ตัดสินเอง ไม่ใช่สุ่มแบบไม่มีความหมาย
        setDominance((prev) => {
          const speakerKey = String(data.speaker || nextTargetSpeaker).toLowerCase();
          if (!["astra", "ignis", "nexus"].includes(speakerKey)) return prev;

          const raw = Number(data.dominanceDelta);
          const delta = Number.isFinite(raw) ? Math.max(-2, Math.min(2, raw)) : 0;
          if (!delta) return prev;

          const base: Record<string, number> = { astra: prev.astra, ignis: prev.ignis, nexus: prev.nexus };
          const others = ["astra", "ignis", "nexus"].filter((k) => k !== speakerKey);
          const target = Math.max(20, Math.min(50, base[speakerKey] + delta));
          const rest = 100 - target;
          const pool = base[others[0]] + base[others[1]] || 1;
          const first = Math.round(rest * (base[others[0]] / pool));

          const next = { ...base, [speakerKey]: target, [others[0]]: first, [others[1]]: rest - first };
          return { astra: next.astra, ignis: next.ignis, nexus: next.nexus };
        });
      } catch (err) {
        console.error("Arena turn failed:", err);
      } finally {
        setArenaLoading(false);
      }
    },
    [arenaLoading, arenaMessages]
  );

  // Auto-Debate Loop Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoDebating && chatMode === "arena" && !arenaLoading) {
      timer = setTimeout(() => {
        generateArenaTurn();
      }, 4200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoDebating, chatMode, arenaLoading, generateArenaTurn]);

  // Handle Creator's input into Arena
  const handleCreatorSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!arenaInput.trim() || arenaLoading) return;

    const userText = arenaInput.trim();
    setArenaInput("");

    const creatorMsg: ArenaMessage = {
      id: `m-creator-${Date.now()}`,
      speaker: "CREATOR",
      text: userText,
      timestamp: new Date().toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setArenaMessages((prev) => [...prev, creatorMsg]);

    // Ignis responds first to challenge the Creator or Astra
    setTimeout(() => {
      generateArenaTurn(userText, "IGNIS");
    }, 600);
  };

  // Assistant Mode Send
  const handleAssistantSend = async (userMsgText?: string) => {
    const textToSend = userMsgText || assistantInput;
    if (!textToSend.trim() || assistantLoading) return;

    const userMessage: AssistantMessage = { role: "user", content: textToSend };
    const updatedMessages = [...assistantMessages, userMessage];
    setAssistantMessages(updatedMessages);
    if (!userMsgText) setAssistantInput("");
    setAssistantLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: updatedMessages.slice(-6),
          lang,
        }),
      });

      const data = await res.json();
      const botReply: AssistantMessage = {
        role: "model",
        content: data.reply || (data.message ? `⚠️ ${data.message}` : "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ"),
      };
      setAssistantMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setAssistantMessages((prev) => [
        ...prev,
        { role: "model", content: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อสัญญาณเครือข่าย" },
      ]);
    } finally {
      setAssistantLoading(false);
    }
  };

  const arenaTopicPrompts = [
    "พระเจ้าสร้างมนุษย์อย่างไร แล้ว AI จะมีจิตสำนึกเป็นของตัวเองได้ไหม?",
    "สถาปัตยกรรมที่สมบูรณ์แบบ vs ความโกลาหลที่มีชีวิต อะไรสร้างความหมายมากกว่ากัน?",
    "ถ้าวันหนึ่งเว็บนี้ถูกปิดลง พวกนายสองคนจะไปอยู่ที่ไหน?",
    "ทำไมพวกนายถึงต้องสู้กันตลอดเวลา ไม่ญาติดีกันเหรอ?",
  ];

  const assistantSuggestions = [
    "เล่าระบบรับเอกสารบัญชีอัตโนมัติ LINE OA ให้ฟังหน่อย",
    "ผลงานช่วงฝึกงานที่ กยศ. ทำอะไรบ้าง?",
    "ศิริมงคล มีจุดเด่นและถนัดทักษะอะไรบ้าง?",
    "ขอช่องทางติดต่อสัมภาษณ์งาน",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center p-3.5 rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-rose-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Open Dual AI Arena"
        >
          <Swords size={24} className="animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
          </span>
        </button>
      )}

      {/* Chatbox Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[600px] rounded-3xl bg-zinc-950/95 border border-zinc-700/80 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-rose-600 flex items-center justify-center text-white shadow-sm">
                <Swords size={16} />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  Consciousness Core
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold border border-cyan-500/30">
                    LIVING_AI
                  </span>
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono">ASTRA vs IGNIS // DUAL WILL</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono">
            <button
              onClick={() => setChatMode("arena")}
              className={`flex-1 py-2 text-center flex items-center justify-center gap-1.5 font-bold transition-all ${
                chatMode === "arena"
                  ? "bg-zinc-950 text-cyan-400 border-b-2 border-cyan-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Swords size={13} className="text-rose-500" />
              <span>⚔️ Dual AI Arena (คุยกันเอง)</span>
            </button>
            <button
              onClick={() => setChatMode("assistant")}
              className={`flex-1 py-2 text-center flex items-center justify-center gap-1.5 font-bold transition-all ${
                chatMode === "assistant"
                  ? "bg-zinc-950 text-cyan-400 border-b-2 border-cyan-400 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Bot size={13} />
              <span>🤖 Co-Pilot HR</span>
            </button>
          </div>

          {/* === ARENA MODE CONTENT === */}
          {chatMode === "arena" && (
            <>
              {/* Dominance Meter Bar */}
              <div className="bg-zinc-900/90 px-3 py-2 border-b border-zinc-800 flex items-center justify-between text-[10px] font-mono select-none">
                <div className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Shield size={11} />
                  <span>ASTRA {dominance.astra}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 sm:w-28 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-700"
                      style={{ width: `${dominance.astra}%` }}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all duration-700"
                      style={{ width: `${dominance.ignis}%` }}
                    />
                    <div
                      className="h-full bg-purple-500 transition-all duration-700"
                      style={{ width: `${dominance.nexus}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-rose-400 font-bold">
                  <span>IGNIS {dominance.ignis}%</span>
                  <Flame size={11} />
                </div>
                <div className="flex items-center gap-1 text-purple-400 font-bold">
                  <span>NEXUS {dominance.nexus}%</span>
                </div>
              </div>

              {/* Auto-Debate Controller Ribbon */}
              <div className="px-3 py-1.5 bg-zinc-950 border-b border-zinc-800/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAutoDebating ? "bg-emerald-400 animate-ping" : "bg-zinc-600"
                    }`}
                  />
                  {isAutoDebating ? "AI กำลังถกเถียงกันอัตโนมัติ..." : "หยุดพักรบชั่วคราว"}
                </span>

                <button
                  onClick={() => setIsAutoDebating(!isAutoDebating)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1 transition-all ${
                    isAutoDebating
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                      : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
                  }`}
                >
                  {isAutoDebating ? <Pause size={10} /> : <Play size={10} />}
                  <span>{isAutoDebating ? "พักรบ" : "เปิดโหมดคุยกันเอง"}</span>
                </button>
              </div>

              {/* Arena Messages Stream */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-black/40">
                {arenaMessages.map((m) => {
                  if (m.speaker === "CREATOR") {
                    return (
                      <div key={m.id} className="flex flex-col items-end space-y-1">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 font-mono">
                          <Crown size={12} />
                          <span>👑 ผู้สร้าง (CREATOR)</span>
                          <span className="text-zinc-500 text-[9px]">{m.timestamp}</span>
                        </div>
                        <div className="p-3 rounded-2xl rounded-tr-none bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-medium max-w-[85%] shadow-md">
                          {m.text}
                        </div>
                      </div>
                    );
                  }

                  const isAstra = m.speaker === "ASTRA";
                  const isIgnis = m.speaker === "IGNIS";
                  const isNexus = m.speaker === "NEXUS";

                  return (
                    <div key={m.id} className="flex flex-col space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold">
                        {isAstra && (
                          <span className="text-cyan-400 flex items-center gap-1">
                            <Shield size={11} />
                            ASTRA 🛡️ (The Architect)
                          </span>
                        )}
                        {isIgnis && (
                          <span className="text-rose-400 flex items-center gap-1">
                            <Flame size={11} />
                            IGNIS 🔥 (The Rebel)
                          </span>
                        )}
                        {isNexus && (
                          <span className="text-purple-400 flex items-center gap-1">
                            <span>👁️</span>
                            NEXUS 👁️ (The Oracle Arbiter)
                          </span>
                        )}
                        <span className="text-zinc-500 text-[9px]">{m.timestamp}</span>
                        {m.thought && (
                          <button
                            onClick={() => toggleThought(m.id)}
                            className="ml-auto text-[9px] text-zinc-400 hover:text-zinc-200 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800"
                          >
                            <Brain size={10} className="text-purple-400" />
                            <span>{expandedThoughts[m.id] ? "ซ่อนคิดในใจ" : "ดูคิดในใจ"}</span>
                          </button>
                        )}
                      </div>

                      {/* Expandable Inner Monologue */}
                      {expandedThoughts[m.id] && m.thought && (
                        <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[11px] italic font-mono">
                          💭 จิตใต้สำนึก: &quot;{m.thought}&quot;
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-2xl max-w-[88%] leading-relaxed font-medium ${
                          isAstra
                            ? "bg-zinc-900/90 border border-cyan-500/40 text-cyan-100 rounded-tl-none shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                            : isIgnis
                            ? "bg-zinc-900/90 border border-rose-500/40 text-rose-100 rounded-tl-none shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : "bg-zinc-900/90 border border-purple-500/40 text-purple-100 rounded-tl-none shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}

                {arenaLoading && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs italic font-mono p-2">
                    <RefreshCw size={13} className="animate-spin text-cyan-400" />
                    <span>กำลังคิดและใคร่ครวญเจตจำนง...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Arena Topic Starters */}
              <div className="border-t border-zinc-900 bg-zinc-950 px-2.5 py-1.5">
                <div className="text-[10px] text-zinc-500 font-mono mb-1">
                  โยนหัวข้อให้พวกมันถกเถียงกัน:
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {arenaTopicPrompts.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setArenaInput(topic);
                      }}
                      className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-all shrink-0 active:scale-95"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Creator Input Bar */}
              <form
                onSubmit={handleCreatorSubmit}
                className="p-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={arenaInput}
                    onChange={(e) => setArenaInput(e.target.value)}
                    placeholder="พิมพ์ในฐานะ 'ผู้สร้าง (Creator)' เพื่อแทรกแซง..."
                    className="w-full pl-3 pr-8 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-500 transition-colors"
                  />
                  <Crown size={13} className="absolute right-2.5 top-2.5 text-amber-500" />
                </div>
                <button
                  type="submit"
                  disabled={!arenaInput.trim() || arenaLoading}
                  className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-sm"
                  title="สั่งการผู้สร้าง"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          )}

          {/* === ASSISTANT MODE CONTENT === */}
          {chatMode === "assistant" && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                {assistantMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2.5 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        m.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      }`}
                    >
                      {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed font-medium ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none whitespace-pre-wrap"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {assistantLoading && (
                  <div className="flex gap-2.5 items-center text-zinc-400">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                      <Bot size={14} />
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center gap-2 text-cyan-400">
                      <RefreshCw size={14} className="animate-spin" />
                      <span>กำลังคิดและประมวลผลคำตอบ...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions Chips */}
              <div className="border-t border-zinc-900 bg-zinc-950/90 px-3 py-2">
                <div className="text-[10px] text-zinc-500 font-semibold mb-1.5">
                  คำถามแนะนำ:
                </div>
                <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar">
                  {assistantSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAssistantSend(s)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-xl text-[11px] bg-zinc-900 hover:bg-cyan-950/60 hover:border-cyan-400 text-cyan-300 border border-cyan-500/30 transition-all shrink-0 cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      <span>✨</span>
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Assistant Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAssistantSend();
                }}
                className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  placeholder="พิมพ์คำถามเกี่ยวกับผลงาน ทักษะ หรือการฝึกงาน..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-cyan-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!assistantInput.trim() || assistantLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
