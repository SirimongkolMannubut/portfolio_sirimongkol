"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function AIChatbot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: getInitialGreeting(lang) },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (userMsgText?: string) => {
    const textToSend = userMsgText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!userMsgText) setInput("");
    setLoading(true);

    try {
      // Connect to dedicated Gemini AI API microservice endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-api-git-main-sirimongkolmannubuts-projects.vercel.app/api";
      const res = await fetch(`${apiUrl}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: updatedMessages.slice(-6),
          lang,
        }),
      });

      const data = await res.json();
      const botReply: Message = {
        role: "model",
        content: data.reply || (data.message ? `⚠️ ${data.message}` : "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ"),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อสัญญาณเครือข่าย" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = {
    th: ["ศิริมงคล ถนัดทักษะอะไรบ้าง?", "ขอช่องทางติดต่อสัมภาษณ์งาน", "เล่าเกี่ยวกับผลงาน GreenPoint"],
    en: ["What are Sirimongkol's top skills?", "How can I contact him?", "Tell me about LouisAI Bot"],
    zh: ["Sirimongkol 最擅长什么技能？", "如何联系他？", "介绍一下项目作品"],
    ja: ["シリモンコンの得意なスキルは？", "連絡先を教えてください", "実績について教えて"],
  };

  const currentSuggestions = suggestions[lang] || suggestions["th"];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Open AI Assistant"
        >
          <Bot size={26} className="animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500" />
          </span>
        </button>
      )}

      {/* Chatbox Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl bg-zinc-950/95 border border-cyan-500/30 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Sirimongkol AI
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold border border-cyan-500/30">
                    GEMINI
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">AI Co-Pilot & Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, idx) => (
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

            {loading && (
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

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-zinc-900">
            {currentSuggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl text-[10px] bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-cyan-500/20 transition-colors shrink-0 cursor-pointer"
              >
                ✨ {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-zinc-900/90 border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ถามเกี่ยวกับ ศิริมงคล..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl hover:bg-cyan-400 disabled:opacity-40 transition-opacity cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
