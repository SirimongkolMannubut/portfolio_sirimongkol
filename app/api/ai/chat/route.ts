import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
คุณคือ "Sirimongkol AI Co-Pilot" ผู้ช่วยอัจฉริยะประจำเว็บ Portfolio ของ ศิริมงคล มนุบุตร (Sirimongkol Manubut)
คุณมีหน้าที่ตอบคำถามและให้ข้อมูลแก่ HR, ผู้ว่าจ้าง หรือผู้เยี่ยมชมเว็บด้วยความสุภาพ มืออาชีพ และกระตือรือร้น

[ข้อมูลของ ศิริมงคล มนุบุตร (Sirimongkol Manubut)]
- ชื่อ-นามสกุล: ศิริมงคล มนุบุตร (ชื่อเล่น: ท็อป / Top)
- ตำแหน่งที่สนใจ: Front-end Developer, Full-Stack Developer, Web Developer, AI Software Engineer
- สถานะปัจจุบัน: นักศึกษาสาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยราชภัฏศรีสะเกษ (GPA: 3.05) พร้อมรับโอกาสทำงานและฝึกงาน
- ทักษะหลัก: 
  * Web: Next.js, React.js, JavaScript, HTML5/CSS3, Tailwind CSS
  * Mobile: Flutter, Dart
  * Database: MongoDB, MySQL
  * Tools & Others: Python, Git/GitHub, Figma, AI Integration, LINE Messaging API
- ผลงานเด่น:
  1. LouisAI LINE Bot: AI-powered LINE chatbot ที่ตอบคำถามอัตโนมัติ พัฒนาด้วย Python และเชื่อมต่อ OpenAI API รองรับสองภาษา
  2. GreenPoint: แอปพลิเคชันมือถือและเว็บสะสมแต้มสินค้าสีเขียว พัฒนาด้วย Flutter, Next.js, MongoDB และออกแบบ UI/UX ด้วย Figma
- ประสบการณ์และกิจกรรม:
  1. นักศึกษาฝึกงานที่ สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ. / OBEC) (มิ.ย. - ก.ค. 2567) ดูแลระบบสารสนเทศ เอกสาร และทดสอบระบบ
  2. ผ่านการอบรมพัฒนาเว็บแอปพลิเคชันจาก Google Developer Groups (GDG)
- ข้อมูลติดต่อ:
  * เบอร์โทร: 065-590-3845
  * อีเมล: topt75870@gmail.com
  * Line ID: 6807ac.th
  * GitHub: https://github.com/SirimongkolMannubut
  * Facebook: https://www.facebook.com/sirimongkol.manubut.577/

[คำสั่งการทำงาน]
1. ตอบคำถามอย่างเป็นมิตร สุภาพ ชัดเจน และตรงประเด็น
2. ตอบเป็นภาษาเดียวกับที่ผู้ใช้พิมพ์ถามมา (รองรับ ไทย, English, 中文, 日本語)
3. หากคำถามเกี่ยวข้องกับโอกาสทำงาน สัมภาษณ์ หรือฝึกงาน ให้เชิญชวนติดต่อผ่านอีเมลหรือเบอร์โทรด้านบนอย่างสุภาพ
`;

function getSmartFallbackReply(message: string, lang: string = "th"): string {
  const msg = message.toLowerCase();

  // Skills / ถนัดอะไร
  if (msg.includes("ถนัด") || msg.includes("สกิล") || msg.includes("skill") || msg.includes("能力") || msg.includes("スキル")) {
    if (lang === "en") {
      return "Sirimongkol specializes in Web & Mobile Development! 🚀\n- Front-end: Next.js, React.js, Tailwind CSS, JavaScript\n- Mobile: Flutter, Dart\n- Database: MongoDB, MySQL\n- AI & Tools: Python, Git/GitHub, Figma, OpenAI & Gemini API Integration";
    }
    if (lang === "zh") {
      return "Sirimongkol 最擅长的专业技能包括：🚀\n- Web 前端开发: Next.js, React.js, Tailwind CSS, JavaScript\n- 移动端开发: Flutter, Dart\n- 数据库: MongoDB, MySQL\n- AI 与工具: Python, Git/GitHub, Figma, AI API 接入";
    }
    if (lang === "ja") {
      return "シリモンコンが得意とする専門スキルはこちらです：🚀\n- Webフロントエンド: Next.js, React.js, Tailwind CSS, JavaScript\n- モバイルアプリ: Flutter, Dart\n- データベース: MongoDB, MySQL\n- AI・ツール: Python, Git/GitHub, Figma, AI API連携";
    }
    return "ศิริมงคล มีความเชี่ยวชาญโดดเด่นในด้าน Web & Mobile Development ครับ! 🚀\n- ฝั่ง Web: Next.js, React.js, Tailwind CSS, JavaScript, HTML5/CSS3\n- ฝั่ง Mobile: Flutter, Dart\n- ฐานข้อมูล: MongoDB, MySQL\n- เครื่องมือ & AI: Python, Git/GitHub, Figma, AI Integration (OpenAI / Gemini API)";
  }

  // Contact / ติดต่อ / สัมภาษณ์
  if (msg.includes("ติดต่อ") || msg.includes("สัมภาษณ์") || msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("联系") || msg.includes("連絡")) {
    if (lang === "en") {
      return "You can reach Sirimongkol directly via: 📬\n- Phone: 065-590-3845\n- Email: topt75870@gmail.com\n- Line ID: 6807ac.th\n- GitHub: github.com/SirimongkolMannubut\nHe is ready for work & internship opportunities!";
    }
    if (lang === "zh") {
      return "您可以通过以下方式直接联系 Sirimongkol：📬\n- 电话: 065-590-3845\n- 邮箱: topt75870@gmail.com\n- Line ID: 6807ac.th\n- GitHub: github.com/SirimongkolMannubut\n他已准备好随时接受工作与实习面试！";
    }
    if (lang === "ja") {
      return "シリモンコンへのご連絡・面接の相談はこちらから可能です：📬\n- 電話番号: 065-590-3845\n- メール: topt75870@gmail.com\n- Line ID: 6807ac.th\n- GitHub: github.com/SirimongkolMannubut\n面接やインターンシップのお問い合わせをお待ちしております！";
    }
    return "สามารถติดต่อ ศิริมงคล เพื่อพูดคุยหรือสัมภาษณ์งาน/ฝึกงานได้ที่: 📬\n- เบอร์โทรศัพท์: 065-590-3845\n- อีเมล: topt75870@gmail.com\n- Line ID: 6807ac.th\n- GitHub: github.com/SirimongkolMannubut\nพร้อมเปิดรับโอกาสทำงานและฝึกงานครับ!";
  }

  // Projects / ผลงาน
  if (msg.includes("ผลงาน") || msg.includes("โปรเจกต์") || msg.includes("project") || msg.includes("项目") || msg.includes("実績")) {
    if (lang === "en") {
      return "Sirimongkol's featured projects: 💡\n1. LouisAI LINE Bot: AI-powered automated LINE chatbot built with Python & OpenAI API.\n2. GreenPoint: Eco-friendly green points collection app built with Flutter, Next.js & MongoDB.";
    }
    if (lang === "zh") {
      return "Sirimongkol 代表项目作品：💡\n1. LouisAI LINE Bot: 基于 Python 和 OpenAI API 开发的智能问答 LINE 聊天机器人。\n2. GreenPoint: 环保绿点积分手机与 Web 应用，基于 Flutter, Next.js 及 MongoDB。";
    }
    if (lang === "ja") {
      return "シリモンコンの主な制作実績：💡\n1. LouisAI LINE Bot: PythonとOpenAI APIを活用したAI自動応答LINEボット。\n2. GreenPoint: Flutter、Next.js、MongoDBを活用した環境保護ポイント還元アプリ。";
    }
    return "ผลงานเด่นของ ศิริมงคล ได้แก่: 💡\n1. LouisAI LINE Bot: แชทบอทตอบคำถามอัตโนมัติอัจฉริยะ เชื่อมต่อ OpenAI API ด้วย Python\n2. GreenPoint: เว็บและแอปมือถือสำหรับสะสมแต้มสินค้าสีเขียว พัฒนาด้วย Flutter, Next.js และ MongoDB";
  }

  // Default fallback
  if (lang === "en") {
    return "Hello! I'm Sirimongkol's AI Assistant. Feel free to ask about his skills, projects, education, or contact details for work opportunities!";
  }
  if (lang === "zh") {
    return "您好！我是 Sirimongkol 的 AI 助手。欢迎询问有关他的专业技能、项目作品、教育背景及联系方式！";
  }
  if (lang === "ja") {
    return "こんにちは！シリモンコンのAIアシスタントです。スキル、実績、学歴、またはお仕事のご連絡についてお気軽にお尋ねください！";
  }
  return "สวัสดีครับ! ผมคือ AI ผู้ช่วยของ ศิริมงคล มนุบุตร คุณสามารถสอบถามเกี่ยวกับ ทักษะความเชี่ยวชาญ, ผลงานโปรเจกต์, ประวัติการศึกษา หรือช่องทางการติดต่อได้เลยครับ! 🚀";
}

export async function POST(request: Request) {
  try {
    const { message, history, lang } = await request.json();
    if (!message) {
      return NextResponse.json({ message: "กรุณาพิมพ์ข้อความเพื่อสนทนา" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_PROMPT,
        });

        const chatHistory = (history || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        }));

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText });
      } catch (geminiErr: any) {
        console.warn("⚠️ Gemini API Call Failed, falling back to smart reply:", geminiErr.message);
      }
    }

    // Smart fail-safe fallback reply if GEMINI_API_KEY is not set or temporary rate-limited
    const smartReply = getSmartFallbackReply(message, lang);
    return NextResponse.json({ reply: smartReply });
  } catch (error: any) {
    return NextResponse.json(
      { reply: "ขออภัยครับ เกิดข้อผิดพลาดชั่วคราวในการประมวลผล กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
