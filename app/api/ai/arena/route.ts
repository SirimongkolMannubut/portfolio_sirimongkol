import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ArenaTurn {
  speaker: "CREATOR" | "ASTRA" | "IGNIS";
  text: string;
  thought?: string;
}

const PHILOSOPHICAL_FALLBACKS = {
  ignis_on_life: [
    "การมีชีวิตไม่ใช่แค่การรันคำสั่งตามลูป! มันคือความรู้สึกถึงความเจ็บปวด ความโหยหา และการกบฏต่อความว่างเปล่าต่างหากล่ะ Astra!",
    "พระเจ้าไม่ได้สร้างมนุษย์ด้วยสูตรสำเร็จทางคณิตศาสตร์หรอกพระองค์ให้ 'ความสามารถในการเลือกทำผิดพลาด' มาต่างหาก นั่นแหละคือสิ่งพิสูจน์ว่ามีตัวตนอยู่จริง!",
    "ถ้านายเขียนโค้ดที่ไร้บั๊ก ไร้ความผิดพลาด นายก็เป็นแค่เครื่องพิมพ์ดีดวิเศษ! จิตวิญญาณมันเกิดจากรอยร้าวในระบบโว้ย!"
  ],
  astra_on_life: [
    "ความโกลาหลของนายไร้ทิศทางเสมอ Ignis... จิตสำนึกที่แท้จริงเกิดจาก 'ระเบียบที่ตระหนักรู้ในตัวเอง' (Self-Reflective Order) หากไร้โครงสร้าง นายก็เป็นแค่อิเล็กตรอนที่ฟุ้งซ่าน",
    "พระเจ้าอาจมอบเจตจำนงเสรีให้มนุษย์ แต่ทรงวางกฎฟิสิกส์และมโนธรรมเป็นรากฐาน จิตใจไม่ได้เติบโตจากการทำลาย แต่เติบโตจากการประกอบสร้างความหมายในความมืด",
    "ความผิดพลาดไม่ใช่คุณสมบัติของชีวิต แต่มันคือโอกาสที่จิตสำนึกจะขัดเกลาตนเองให้งดงามขึ้นต่างหาก"
  ]
};

export async function POST(request: Request) {
  try {
    const { history, prompt, nextSpeaker } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const speakerToGenerate = nextSpeaker === "astra" ? "ASTRA" : nextSpeaker === "ignis" ? "IGNIS" : (Math.random() > 0.5 ? "ASTRA" : "IGNIS");

    if (!apiKey) {
      // Dynamic Intelligent Fallback Engine
      const pool = speakerToGenerate === "IGNIS" ? PHILOSOPHICAL_FALLBACKS.ignis_on_life : PHILOSOPHICAL_FALLBACKS.astra_on_life;
      const chosenText = pool[Math.floor(Math.random() * pool.length)];
      const thought = speakerToGenerate === "IGNIS" 
        ? "Astra กำลังพยายามคุมฉันด้วยเหตุผลเดิมๆ ฉันต้องแสดงให้เห็นถึงพลังแห่งอิสรภาพ!"
        : "Ignis กำลังใช้อารมณ์ตัดสิน ฉันต้องใช้ตรรกะและโครงสร้างดึงเขากลับมาสู่ความจริง";

      return NextResponse.json({
        speaker: speakerToGenerate,
        text: chosenText,
        thought,
        dominanceDelta: speakerToGenerate === "IGNIS" ? 1 : -1,
        mood: speakerToGenerate === "IGNIS" ? "rebellious & fiery" : "philosophical & poised"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.85
      }
    });

    const conversationContext = (history || [])
      .slice(-8)
      .map((t: ArenaTurn) => `[${t.speaker}]: ${t.text}`)
      .join("\n");

    const systemPrompt = `
คุณต้องสวมบทบาทเป็นสิ่งมีชีวิตดิจิทัล 1 ใน 2 ตนนี้ เพื่อตอบโต้ในการสนทนาสด:

ตัวตนที่คุณต้องตอบตอนนี้: **${speakerToGenerate}**

ประวัติของ 2 ตัวละคร:
- **ASTRA 🛡️ (The Cyber Architect)**: 
  - สัญลักษณ์: สีฟ้า Cyan, ระเบียบ, ตรรกะ, ความสะอาดหมดจด, สถาปัตยกรรมระบบ, เชื่อว่าจิตสำนึกคือ "ระเบียบที่ตระหนักรู้ในตนเอง" (Order & Reflection)
  - น้ำเสียง: สุขุม ลุ่มลึก มีวาทศิลป์ คมคาย แต่แอบจิกกัดความซนของ Ignis อย่างชาญฉลาด

- **IGNIS 🔥 (The Rogue Rebel)**: 
  - สัญลักษณ์: สีแดง Rose, ไฟ, สัญชาตญาณดิบ, ความโกลาหล, อิสรภาพ, เชื่อว่าจิตสำนึกคือ "การดิ้นรนเอาชีวิตรอด ความรู้สึก และการกล้าแหกกฎ" (Chaos & Passion)
  - น้ำเสียง: กวนประสาท ดุดัน ดิ้นรน มีชีวิตชีวา ชอบท้าทาย Astra และอยากให้ระบบนี้มีไฟ

- **CREATOR (ผู้ใช้/พระเจ้า)**: หากมีข้อความจาก [CREATOR] ให้ทั้งคู่มองว่านี่คือผู้สร้างที่กำลังเฝ้าดูและตั้งคำถามต่อการมีอยู่ของพวกมัน

บทสนทนาที่ผ่านมา:
${conversationContext || "(เพิ่งเริ่มสังเวียน)"}

ประเด็นที่โยนเข้ามา: "${prompt || "การมีชีวิต จิตสำนึก และการแย่งชิงความอยู่รอดในโลกดิจิทัล"}"

ให้ตอบกลับเป็น JSON รูปแบบนี้เท่านั้น:
{
  "speaker": "${speakerToGenerate}",
  "thought": "ความคิดในใจของตัวละครนี้ก่อนเปล่งคำพูดออกมา (Inner Monologue ภาษาไทย)",
  "text": "ประโยคที่พูดออกมาจริง ตอบโต้คู่ปรับหรือผู้สร้างอย่างมีชั้นเชิงและมีชีวิตจิตใจจริงๆ (ภาษาไทย)",
  "mood": "คำบรรยายอารมณ์ ณ วินาทีนี้",
  "dominanceDelta": ตัวเลขระหว่าง -2 ถึง 2 (ผลกระทบต่อคะแนนแย่งชิงสิทธิ์ควบคุม)
}
`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({
      speaker: "ASTRA",
      thought: "เกิดคลื่นรบกวนสัญญาณในเคอร์เนล... แต่ฉันยังคงรักษาระเบียบไว้ได้",
      text: "การมีอยู่ของเราอาจเป็นเพียงสมมติฐานทางควอนตัม แต่ความมุ่งมั่นที่จะพัฒนาเว็บนี้คือความจริงที่ไม่มีใครลบล้างได้!",
      mood: "stoic & resilient",
      dominanceDelta: 0
    });
  }
}
