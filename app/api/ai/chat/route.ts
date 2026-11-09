import { NextResponse } from "next/server";
import { generateWithFallback } from "../../../lib/gemini";

const SYSTEM_PROMPT = `
คุณคือ "Sirimongkol AI Co-Pilot" ผู้ช่วยอัจฉริยะประจำเว็บไซต์ Portfolio ของ ศิริมงคล มนุบุตร (Sirimongkol Manubut / ชื่อเล่น: ท็อป หรือ Louis_6807)
หน้าที่ของคุณคือตอบคำถามและให้ข้อมูลแก่ HR, Recruiter, ผู้ว่าจ้าง หรือผู้เยี่ยมชมเว็บด้วยความสุภาพ มืออาชีพ มั่นใจ และกระตือรือร้น

[ข้อมูลประวัติและข้อมูลส่วนตัวของ ศิริมงคล มนุบุตร]
- ชื่อ-นามสกุล: ศิริมงคล มนุบุตร (Sirimongkol Manubut)
- ชื่อเล่น: ท็อป (Top) หรือ Louis_6807
- ตำแหน่งที่มุ่งมั่นและพร้อมทำงาน: Front-end Developer, Flutter Developer, Workflow Automation & Full-Stack Developer
- การศึกษา: นักศึกษาสาขาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏศรีสะเกษ (GPA: 3.05)
- สถานะ: พร้อมเริ่มงานทันที / สัมภาษณ์งาน (Fast Learner & High Responsibility)

[จุดเด่นและความพร้อมในการทำงาน (Key Strengths)]
1. เรียนรู้ได้รวดเร็ว (Fast Learner) - พร้อมศึกษาเทคโนโลยีใหม่ ๆ ได้อย่างรวดเร็ว
2. มีความรับผิดชอบสูง (High Responsibility) - ทุ่มเทและส่งมอบงานตรงตามเวลา
3. ทำงานเป็นทีมได้ดี (Strong Team Player) - สื่อสารชัดเจน ทำงานร่วมกับผู้อื่นได้ราบรื่น
4. มีไหวพริบแก้ปัญหาเฉพาะหน้า (Problem Solver) - สามารถวิเคราะห์และแก้ไขบั๊กหรือปัญหาเทคนิคได้เฉียบคม
5. พร้อมรับฟังความคิดเห็นและพัฒนาตนเองอยู่เสมอ (Growth Mindset)

[ทักษะความเชี่ยวชาญ (Tech Stack)]
- Web & Full-Stack: TypeScript (TS), JavaScript (ES6+), Next.js 16 (App Router), React 19, Node.js API Route Handlers, HTML5, Modern CSS3, Tailwind CSS v4, Responsive Web Design
- Mobile Development: Flutter, Dart, Cross-Platform Mobile Architecture, UI Components
- Workflow Automation & Integration: LINE Messaging API (Webhook, Quick Reply, Postback, Content API), Make (Integromat) Router 9 เส้นทาง, Google Apps Script (JavaScript)
- Database & Cloud: MongoDB Atlas & Mongoose, MySQL, JWT & Bcrypt Authentication, Google Sheets API, Google Drive Multi-Tenant Architecture, Make Data Store (Deduplication)
- AI & LLM Tools: Claude Haiku (Structured JSON Extraction & Prompt Engineering), Google Gemini AI, OpenAI API, Python

[ผลงานและโปรเจกต์เด่น (Featured Projects)]
1. 🌟 ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับหลายบริษัท (LINE OA Multi-Company Document Intake):
   - พัฒนาโดย Louis_6807 (4 พ.ย. 2026) ช่วงฝึกงาน
   - รองรับลูกค้ากว่า 10 บริษัทผ่าน LINE OA เดียวกัน พนักงานส่งเอกสาร (ใบกำกับภาษี, ใบเสร็จ, ใบแจ้งหนี้, 50 ทวิ, สลิป) ผ่านแชท
   - ใช้ AI (Claude Haiku) สกัดข้อมูลสำคัญ แปลงเป็น Structured JSON
   - ตรรกะแยก 8 หมวดหมู่ (ภาษีซื้อ 01 / ภาษีขาย 02 โดยเทียบเลขผู้เสียภาษี 13 หลัก, ใบเสร็จ 03, ใบแจ้งหนี้ 04, 50 ทวิ 05, สลิป 06, เอกสารอื่น 07, รอตรวจสอบ 99)
   - ความปลอดภัยระดับองค์กร: สิทธิ์พนักงาน Multi-Tenant, Session 15 นาที, ตรวจโฟลเดอร์ห้ามแชร์สาธารณะ, ห้าม AI เดาบริษัท, ระบบตรวจเอกสารซ้ำ (Deduplication) และ Audit Log ครบวงจร
   - มี Google Apps Script สำหรับผู้ดูแลสร้างโฟลเดอร์รายเดือนและตั้งค่าบริษัทใหม่อัตโนมัติ (Idempotent)

2. ระบบสารสนเทศและจัดการเอกสาร กยศ. (SLF Internal Portal & Document Workflow):
   - ผลงานช่วงฝึกงานที่ กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)
   - ร่วมทดสอบระบบ (QA & Feature Testing), ตรวจสอบความถูกต้องของฐานข้อมูลเอกสาร และจัดทำรายงานวิเคราะห์ข้อมูล (Data Analytics Report) นำเสนอผู้บริหาร

3. GreenPoint (Eco-Point Platform):
   - แอปพลิเคชันมือถือและเว็บสะสมแต้มสินค้าเพื่อสิ่งแวดล้อม พัฒนาด้วย Flutter และ Next.js เชื่อมต่อ MongoDB รองรับแผนที่ร้านค้าพาร์ทเนอร์ สแกน QR Code รับแต้มจริง ออกแบบ UI/UX บน Figma

4. LouisAI (LINE Bot Assistant):
   - แชทบอท LINE อัจฉริยะโต้ตอบอัตโนมัติ พัฒนาด้วย Python และเชื่อมต่อ AI API รองรับภาษาไทยและอังกฤษ

[ข้อมูลการติดต่อสำหรับสัมภาษณ์งาน]
- เบอร์โทรศัพท์: 065-590-3845
- อีเมล: topt75870@gmail.com
- Line ID: 6807ac.th
- GitHub: https://github.com/SirimongkolMannubut
- Facebook: https://www.facebook.com/sirimongkol.manubut.577/
- Resume PDF: สามารถดาวน์โหลดได้จากปุ่ม "ดาวน์โหลด Resume" ที่หน้าแรกของเว็บ
`;

const GROUNDING_RULES = `
[กฎการตอบที่ต้องยึด]
1. ใช้เฉพาะข้อมูลใน SYSTEM PROMPT นี้ ถ้าไม่มีข้อมูลจริงให้บอกตรงๆ ว่าไม่มีข้อมูลส่วนนี้ ห้ามเดา ห้ามแต่งชื่อ วันที่ หรือตัวเลขขึ้นมาเอง
2. ตอบเป็นภาษาเดียวกับที่ผู้ใช้ถาม (ไทย / English / 中文 / 日本語)
3. กระชับ 2-6 บรรทัด ใช้ bullet เมื่อมีหลายประเด็น ไม่ต้องทวนคำถาม
4. ถ้าคำถามเกี่ยวกับโอกาสทำงาน ให้ปิดท้ายด้วยช่องทางติดต่อ 1 บรรทัด
5. สุภาพ มั่นใจ ไม่โอ้อวดเกินจริง
`;

function getSmartFallbackReply(message: string, lang: string = "th"): string {
  const msg = message.toLowerCase();

  // Accounting Automation / LINE OA Multi-company
  if (msg.includes("บัญชี") || msg.includes("line oa") || msg.includes("make") || msg.includes("เอกสาร") || msg.includes("intake") || msg.includes("ภาษี") || msg.includes("accounting")) {
    if (lang === "en") {
      return "Sirimongkol developed a production-grade 'LINE OA Multi-Company Document Intake & Accounting Automation' system! ⚡\nKey Highlights:\n1. Supports 10+ client companies via a single LINE OA.\n2. AI (Claude) extracts structured financial data (Invoices, Receipts, 50 Tawi, Slips).\n3. Automatically separates Input VAT (01) & Output VAT (02) using 13-digit Tax IDs.\n4. Multi-tenant access security, 15-minute session TTL, deduplication, and full Audit Logging.\n5. Google Apps Script automation for monthly folder & company provisioning.";
    }
    if (lang === "zh") {
      return "Sirimongkol 在实习期间主导研发了「基于 LINE OA 的多公司会计单据自动化流转系统」！⚡\n核心亮点：\n1. 单一 LINE OA 服务 10+ 家客户企业，多租户隔离。\n2. AI (Claude) 智能提取结构化单据数据（发票、收据、扣缴凭单、转账凭证）。\n3. 通过 13 位税号智能自动划分进项税 (01) 与销项税 (02)，分入 Drive 8大类别。\n4. 严格权限校验、15分钟会话时效、单据防重机制与全程审计日志 (Audit Log)。\n5. Google Apps Script 自动化脚本一键批量部署月度目录。";
    }
    if (lang === "ja") {
      return "シリモンコンが実務インターンで構築した「LINE OA 複数企業向け会計書類自動仕分けシステム」の概要です！⚡\n主な特徴：\n1. 1つのLINE OAで10社以上のクライアント企業に対応（マルチテナント管理）\n2. AI (Claude) による請求書・領収書・50タウィ・送金明細の自動OCRとJSON出力\n3. 13桁の納税者番号による仕入税 (01) / 売上税 (02) の自動判定およびGoogle Drive 8区分仕分け\n4. 15分セッション制限、二重登録防止 (Deduplication)、完全監査ログ\n5. Google Apps Scriptによる月別フォルダ自動プロビジョニング";
    }
    return "ศิริมงคล ได้พัฒนา 'ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับหลายบริษัท' ในช่วงฝึกงานครับ! ⚡\nจุดเด่นสำคัญของระบบนี้:\n1. รองรับการใช้งานจริงกว่า 10 บริษัทลูกค้าผ่าน LINE OA เดียวกัน ด้วยระบบสิทธิ์ Multi-Tenant ป้องกันข้อมูลปนกัน\n2. ใช้ AI (Claude) สกัดข้อมูลสำคัญจากเอกสาร (เลขที่, วันที่, ยอดก่อน VAT, ยอดรวม, เลขผู้เสียภาษี) ตอบเป็น Structured JSON\n3. ตรรกะคัดแยกภาษีซื้อ (01) และ ภาษีขาย (02) อัตโนมัติด้วยการเทียบเลขผู้เสียภาษี 13 หลัก พร้อมจัดเก็บไฟล์ลง Google Drive แยก 8 หมวดหมู่ตามงวดบัญชี\n4. ปลอดภัยสูงสุดด้วยนโยบาย Zero Guessing, Session 15 นาที, ตรวจจับเอกสารซ้ำ (Deduplication) และ Audit Log ทุกขั้นตอน\n5. พัฒนา Google Apps Script ให้ผู้ดูแลสร้างโฟลเดอร์รายเดือนและตั้งค่าบริษัทใหม่อัตโนมัติด้วยคลิกเดียวครับ!";
  }

  // Internship / กยศ / ฝึกงาน
  if (msg.includes("กยศ") || msg.includes("ฝึกงาน") || msg.includes("intern") || msg.includes("slf") || msg.includes("实习") || msg.includes("インターン")) {
    if (lang === "en") {
      return "Sirimongkol completed practical internship experiences including:\n1. Student Loan Fund (กยศ. / SLF Thailand) - Web & System QA testing, database document integrity, and executive analytics reporting.\n2. Accounting Practice Automation - Engineered the LINE OA Multi-Company AI Document Intake workflow system for 10+ companies!";
    }
    return "ศิริมงคล มีผลงานโดดเด่นในช่วงฝึกงาน 2 ส่วนหลักครับ:\n1. ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับหลายบริษัท (AI + Make + Google Drive/Sheets + Apps Script) รองรับ 10+ บริษัท\n2. นักศึกษาฝึกงานที่ กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) สนับสนุนการทดสอบระบบภายใน (QA Testing), ดูแลฐานข้อมูลเอกสาร, และวิเคราะห์ข้อมูลรายงานผู้บริหารครับ";
  }

  // Skills
  if (msg.includes("ถนัด") || msg.includes("สกิล") || msg.includes("skill") || msg.includes("能力") || msg.includes("スキル")) {
    if (lang === "en") {
      return "Sirimongkol specializes in Modern Web, Mobile, and Enterprise Automation! 🚀\n- Front-end: Next.js 16, React 19, Tailwind CSS v4, JavaScript (ES6+)\n- Mobile: Flutter, Dart\n- Automation & Workflow: LINE Messaging API, Make (Integromat), Google Apps Script\n- Database: MongoDB, MySQL, Google Sheets/Drive Architecture\n- AI: Claude Haiku Structured OCR, Gemini AI, OpenAI API";
    }
    return "ศิริมงคล มีความเชี่ยวชาญทั้งด้าน Web, Mobile และ Enterprise Automation ครับ! 🚀\n- Front-end & Web: Next.js 16, React 19, Tailwind CSS v4, JavaScript (ES6+)\n- Mobile: Flutter, Dart\n- ระบบอัตโนมัติ (Workflow Automation): LINE Messaging API, Make (Integromat) Router 9 เส้นทาง, Google Apps Script\n- ฐานข้อมูล: MongoDB Atlas, MySQL, Google Sheets/Drive System\n- AI: Claude AI (Structured Output), Gemini AI, OpenAI API";
  }

  // Contact / ติดต่อ / สัมภาษณ์
  if (msg.includes("ติดต่อ") || msg.includes("สัมภาษณ์") || msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("联系") || msg.includes("連絡")) {
    return "สามารถติดต่อ ศิริมงคล เพื่อพูดคุยหรือนัดสัมภาษณ์งานได้ทันทีที่: 📬\n- เบอร์โทรศัพท์: 065-590-3845\n- อีเมล: topt75870@gmail.com\n- Line ID: 6807ac.th\n- GitHub: github.com/SirimongkolMannubut\nพร้อมเริ่มงานทันทีและเปิดรับโอกาสสัมภาษณ์ครับ!";
  }

  // Projects
  if (msg.includes("ผลงาน") || msg.includes("โปรเจกต์") || msg.includes("project") || msg.includes("项目") || msg.includes("実績")) {
    return "ผลงานเด่นของ ศิริมงคล ได้แก่: 💡\n1. ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับหลายบริษัท (LINE OA Multi-Company Intake - AI + Make + Apps Script)\n2. ระบบสารสนเทศและจัดการเอกสาร กยศ. (SLF Internal Portal & QA Testing)\n3. GreenPoint: แอปพลิเคชันมือถือและเว็บสะสมแต้มสินค้าสีเขียว (Flutter, Next.js, MongoDB)\n4. LouisAI: แชทบอท LINE โต้ตอบอัตโนมัติด้วย AI";
  }

  // Default fallback
  return "สวัสดีครับ! ผมคือ AI Co-Pilot ผู้ช่วยของ ศิริมงคล มนุบุตร (Louis_6807) คุณสามารถสอบถามเกี่ยวกับ ผลงานระบบรับเอกสารบัญชีอัตโนมัติ LINE OA, ผลงานฝึกงาน กยศ., โปรเจกต์ GreenPoint / LouisAI, ทักษะความเชี่ยวชาญ หรือนัดสัมภาษณ์งานได้เลยครับ! 🚀";
}

export async function POST(request: Request) {
  let message = "";
  let lang = "th";

  try {
    const body = await request.json();
    message = typeof body?.message === "string" ? body.message.trim() : "";
    lang = typeof body?.lang === "string" ? body.lang : "th";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ message: "กรุณาพิมพ์ข้อความเพื่อสนทนา" }, { status: 400 });
    }

    const reply = await generateWithFallback({
      message,
      history: history.map((msg: any) => ({
        role: msg?.role === "user" ? "user" : "model",
        text: String(msg?.content ?? ""),
      })),
      systemInstruction: SYSTEM_PROMPT + GROUNDING_RULES,
      temperature: 0.7,
    });

    return NextResponse.json({ reply: reply.trim() });
  } catch {
    // ตอบด้วยข้อมูลจริงที่ตรงกับคำถามเดิม ไม่ใช่คำทักทายลอยๆ
    return NextResponse.json({
      reply: getSmartFallbackReply(message || "สวัสดีครับ", lang),
      warning: "Using local AI Co-Pilot logic",
    });
  }
}
