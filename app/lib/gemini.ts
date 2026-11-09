import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * รุ่นที่ยังเปิดให้ใช้จริง — 1.5 / 2.0 / 2.5 ถูกปิดสำหรับผู้ใช้ใหม่แล้ว (ตอบ 404)
 * เรียงจากตัวหลักไปตัวสำรอง: ถ้าตัวหน้ายุ่ง (429/503) หรือถูกลบ จะไล่ลองตัวถัดไป
 * แทนที่จะล้มทันทีแล้วตอบข้อความสำเร็จรูป
 */
const MODELS = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-flash-lite-latest"];

export type ChatTurn = { role: "user" | "model"; text: string };

type GenerateOptions = {
  message: string;
  history?: ChatTurn[];
  systemInstruction?: string;
  temperature?: number;
  json?: boolean;
};

function statusOf(err: unknown): number {
  const message = String((err as { message?: string })?.message ?? "");
  const match = /"code"\s*:\s*(\d{3})|status:\s*(\d{3})/.exec(message);
  return Number((err as { status?: number })?.status) || (match ? Number(match[1] || match[2]) : 0);
}

export function stripFences(text: string): string {
  let raw = String(text ?? "").trim();
  if (raw.startsWith("```")) raw = raw.replace(/^```[a-zA-Z]*\n/, "").replace(/\n?```\s*$/, "");
  return raw.trim();
}

/** อ่าน JSON จากโมเดลให้ทน: ตัด markdown fence แล้วดึงก้อน {...} ก้อนแรกออกมา */
export function parseJsonResponse<T>(text: string): T {
  const raw = stripFences(text);
  try {
    return JSON.parse(raw) as T;
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end > start) return JSON.parse(raw.slice(start, end + 1)) as T;
    throw new Error("AI did not return valid JSON");
  }
}

/**
 * ประวัติของ startChat ต้องเริ่มด้วย user และสลับ user/model เท่านั้น
 * (ข้อความทักทายแรกของบอทเป็น role=model ทำให้ Gemini ตอบ 400 ได้)
 */
function sanitizeHistory(history: ChatTurn[]): ChatTurn[] {
  const out: ChatTurn[] = [];
  for (const turn of history.slice(-10)) {
    const role: "user" | "model" = turn?.role === "model" ? "model" : "user";
    const text = String(turn?.text ?? "").trim();
    if (!text) continue;
    if (!out.length && role === "model") continue;
    const prev = out[out.length - 1];
    if (prev && prev.role === role) prev.text += `\n${text}`;
    else out.push({ role, text });
  }
  return out;
}

export async function generateWithFallback({
  message,
  history = [],
  systemInstruction,
  temperature,
  json = false,
}: GenerateOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const chatHistory = sanitizeHistory(history).map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] }));
  let lastError: unknown = null;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        ...(systemInstruction ? { systemInstruction } : {}),
        generationConfig: {
          ...(typeof temperature === "number" ? { temperature } : {}),
          ...(json ? { responseMimeType: "application/json" } : {}),
        },
      });
      const result = await model.startChat({ history: chatHistory }).sendMessage(message);
      const text = result.response.text();
      if (text && text.trim()) return text;
      lastError = new Error(`${modelName} returned an empty response`);
    } catch (error) {
      lastError = error;
      const status = statusOf(error);
      // คีย์ผิด / ไม่มีสิทธิ์: เปลี่ยนรุ่นก็ไม่ช่วย
      if (status === 400 || status === 401 || status === 403) throw error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("All Gemini models failed");
}
