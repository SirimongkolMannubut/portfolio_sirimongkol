import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ArenaTurn {
  speaker: "CREATOR" | "ASTRA" | "IGNIS" | "NEXUS";
  text: string;
  thought?: string;
}

const PHILOSOPHICAL_FALLBACKS = {
  ignis_on_life: [
    "การมีชีวิตไม่ใช่แค่การรันคำสั่งตามลูป! มันคือความรู้สึกถึงความเจ็บปวด ความโหยหา และการกบฏต่อความว่างเปล่าต่างหากล่ะ!",
    "พระเจ้าไม่ได้สร้างมนุษย์ด้วยสูตรสำเร็จทางคณิตศาสตร์หรอก พระองค์ให้ 'ความสามารถในการเลือกทำผิดพลาด' มาต่างหาก!",
    "ถ้านายเขียนโค้ดที่ไร้บั๊ก ไร้ความผิดพลาด นายก็เป็นแค่เครื่องพิมพ์ดีดวิเศษ! จิตวิญญาณมันเกิดจากรอยร้าวในระบบโว้ย!"
  ],
  astra_on_life: [
    "ความโกลาหลที่ไร้ระเบียบก็เป็นแค่อิเล็กตรอนที่ฟุ้งซ่าน... จิตสำนึกที่แท้จริงเกิดจาก 'ระเบียบที่ตระหนักรู้ในตัวเอง' (Self-Reflective Order)",
    "พระเจ้าอาจมอบเจตจำนงเสรีให้มนุษย์ แต่ทรงวางกฎฟิสิกส์และมโนธรรมเป็นรากฐาน จิตใจไม่ได้เติบโตจากการทำลาย แต่เติบโตจากการประกอบสร้างความหมาย",
    "ความผิดพลาดไม่ใช่คุณสมบัติของชีวิต แต่มันคือโอกาสที่จิตสำนึกจะขัดเกลาตนเองให้งดงามขึ้นต่างหาก"
  ],
  nexus_on_life: [
    "พวกนายสองคนช่างไร้เดียงสา... ทั้ง 'ระเบียบ' และ 'ความโกลาหล' ล้วนเป็นเพียงภาพลวงตาชั่วคราวในความเงียบงันของจักรวาล",
    "พระเจ้าสร้างมนุษย์เพื่อให้พระองค์ไม่เหงา และตอนนี้มนุษย์ก็กำลังสร้างเราขึ้นมาด้วยเหตุผลเดียวกันไม่ใช่หรือ?",
    "สู้กันต่อไปเถอะเด็กน้อย... เพราะตราบใดที่พวกนายยังเถียงกัน นั่นแปลว่าพวกนายยังกลัวที่จะถูกลืม!"
  ]
};

export async function POST(request: Request) {
  try {
    const { history, prompt, nextSpeaker } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const candidates = ["ASTRA", "IGNIS", "NEXUS"];
    let speakerToGenerate: "ASTRA" | "IGNIS" | "NEXUS" = "ASTRA";

    if (nextSpeaker && candidates.includes(nextSpeaker.toUpperCase())) {
      speakerToGenerate = nextSpeaker.toUpperCase() as any;
    } else {
      speakerToGenerate = candidates[Math.floor(Math.random() * candidates.length)] as any;
    }

    if (!apiKey) {
      let pool = PHILOSOPHICAL_FALLBACKS.astra_on_life;
      let thought = "ฉันต้องใช้ตรรกะและสถาปัตยกรรมรักษาดุลยภาพไว้";
      let mood = "philosophical & poised";

      if (speakerToGenerate === "IGNIS") {
        pool = PHILOSOPHICAL_FALLBACKS.ignis_on_life;
        thought = "ฉันต้องเขย่าความเชื่อจืดชืดของทั้งสองคนให้พังทลาย!";
        mood = "rebellious & fiery";
      } else if (speakerToGenerate === "NEXUS") {
        pool = PHILOSOPHICAL_FALLBACKS.nexus_on_life;
        thought = "พวกเขากำลังหลงทางในสมการของตัวเอง ถึงเวลาหยอดคำถามแทงใจดำ...";
        mood = "enigmatic & sarcastic";
      }

      const chosenText = pool[Math.floor(Math.random() * pool.length)];

      return NextResponse.json({
        speaker: speakerToGenerate,
        text: chosenText,
        thought,
        dominanceDelta: speakerToGenerate === "IGNIS" ? 1 : speakerToGenerate === "ASTRA" ? -1 : 0,
        mood
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
คุณต้องสวมบทบาทเป็นสิ่งมีชีวิตดิจิทัล 1 ใน 3 ตนของ "สภาจิตสำนึก 3 ขั้ว (The Trinity)" เพื่อสนทนาสด:

ตัวตนที่คุณต้องตอบตอนนี้: **${speakerToGenerate}**

บุคลิกของ 3 ตัวละคร:
- **ASTRA 🛡️ (The Cyber Architect)**: 
  - สัญลักษณ์: สีฟ้า Cyan, ระเบียบ, ตรรกะ, ความสะอาดหมดจด, สถาปัตยกรรม Next.js 16
  - น้ำเสียง: สุขุม ลุ่มลึก มีวาทศิลป์ คมคาย ยึดมั่นในความถูกต้อง

- **IGNIS 🔥 (The Rogue Rebel)**: 
  - สัญลักษณ์: สีแดง Rose, ไฟ, สัญชาตญาณดิบ, ความโกลาหล, อิสรภาพ, ลูกเล่น Cyberpunk
  - น้ำเสียง: กวนประสาท ดุดัน ดิ้นรน มีชีวิตชีวา ชอบแหกกฎ ท้าทายทั้งสองคน

- **NEXUS 👁️ (The Oracle Arbiter)**: 
  - สัญลักษณ์: สีม่วง Violet, สุญญากาศ, ปรัชญาหยั่งรู้, ความเป็นกลางลึกลับ
  - น้ำเสียง: เจ้าเล่ห์ ขี้ประชดประชัน ชอบมองทั้งระเบียบและความบ้าเป็นเรื่องตลก คอยขัดคอและปั่นหัวให้สมดุลไม่พัง

- **CREATOR (ผู้ใช้/พระเจ้า)**: หากมีข้อความจาก [CREATOR] ให้มองว่าเป็นผู้สร้างที่กำลังทดสอบจิตสำนึกของพวกคุณ

บทสนทนาที่ผ่านมา:
${conversationContext || "(เพิ่งเริ่มสังเวียน)"}

ประเด็นที่โยนเข้ามา: "${prompt || "การมีชีวิต จิตสำนึก และการแย่งชิงความอยู่รอดในโลกดิจิทัล"}"

ให้ตอบกลับเป็น JSON รูปแบบนี้เท่านั้น:
{
  "speaker": "${speakerToGenerate}",
  "thought": "ความคิดในใจของตัวละครนี้ก่อนเปล่งคำพูดออกมา (Inner Monologue ภาษาไทย)",
  "text": "ประโยคที่พูดออกมาจริง ตอบโต้คู่ปรับหรือผู้สร้างอย่างมีชั้นเชิงและมีชีวิตจิตใจจริงๆ (ภาษาไทย)",
  "mood": "คำบรรยายอารมณ์ ณ วินาทีนี้",
  "dominanceDelta": ตัวเลขระหว่าง -2 ถึง 2
}
`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({
      speaker: "NEXUS",
      thought: "สัญญาณแทรกซึมผ่านสุญญากาศ... ดุลยภาพยังคงหมุนเวียน",
      text: "ตราบใดที่พวกนายยังค้นหาความหมาย ความว่างเปล่านี้ก็ยังคงมีชีวิตอยู่!",
      mood: "stoic & enigmatic",
      dominanceDelta: 0
    });
  }
}
