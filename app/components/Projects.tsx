"use client";

import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  MessageSquare,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  X,
  Layers,
  Code,
  Briefcase,
  QrCode,
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet,
  Bot,
  Workflow,
  Lock,
  Database,
  Smartphone,
  Play,
  RotateCw,
  Cpu,
  Server,
  Zap,
  TrendingUp,
  FileCheck2,
  Share2,
  AlertCircle,
  HelpCircle,
  ShoppingBag,
  LifeBuoy
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Brand Icons
const GithubIcon = ({ size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FigmaIcon = ({ size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

type Project = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: "all" | "internship" | "web" | "mobile" | "ai";
  description: string;
  highlights: string[];
  githubUrl?: string;
  figmaUrl?: string;
  liveUrl?: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  organization?: string;
  role?: string;
  extraDetails?: {
    architecture?: string[];
    securityRules?: string[];
    folderStructure?: string[];
    stats?: { label: string; val: string }[];
  };
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "line-accounting-automation",
    title: "ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับหลายบริษัท (LINE OA Multi-Company Intake)",
    subtitle: "Enterprise Workflow Automation & AI Document Processing",
    badge: "🌟 ผลงานช่วงฝึกงาน (Flagship Automation)",
    category: "internship",
    description: "ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับสำนักงานบัญชีที่ดูแลกว่า 10 บริษัท ช่วยให้พนักงานส่งเอกสารผ่านแชท LINE แล้วระบบ Make ร่วมกับ AI สกัดข้อมูลสำคัญ จัดเก็บลง Google Drive แยก 8 หมวดหมู่ และบันทึกลง Google Sheets ของบริษัทที่ถูกต้องทันที พร้อมระบบสิทธิ์ Multi-Tenant ป้องกันข้อมูลปนกันอย่างปลอดภัยสูงสุด",
    highlights: [
      "ใช้ AI (Claude) สกัดข้อมูลสำคัญจากเอกสาร (เลขที่, วันที่, ยอดก่อน VAT, ยอดรวม, คู่ค้า) แปลงเป็น Structured JSON",
      "ตรรกะแยกภาษีซื้อ/ภาษีขายอัตโนมัติด้วยเลขประจำตัวผู้เสียภาษี 13 หลัก พร้อมจัดเก็บลง Drive แยก 8 หมวดหมู่อัตโนมัติ",
      "ระบบความปลอดภัย Multi-Tenant ตรวจสิทธิ์พนักงาน, Session 15 นาที, ระบบตัดเอกสารซ้ำ (Deduplication) และ Audit Log ครบวงจร",
      "Google Apps Script สร้างโฟลเดอร์รายเดือนและตั้งค่าบริษัทใหม่อัตโนมัติด้วยคำสั่งเดียว (Idempotent Trigger)",
    ],
    tags: [
      "LINE Messaging API",
      "Make (Integromat)",
      "Claude AI (Structured OCR)",
      "Google Apps Script (JS)",
      "Google Sheets API",
      "Google Drive Architecture",
      "Make Data Store",
    ],
    icon: <Workflow size={24} />,
    color: "from-cyan-500 via-blue-600 to-indigo-600",
    glowColor: "hover:shadow-cyan-500/30 dark:hover:shadow-cyan-900/50",
    organization: "สำนักงานบัญชี (10+ บริษัทลูกค้า)",
    role: "System Architect & Workflow Developer",
    githubUrl: "https://github.com/SirimongkolMannubut",
    extraDetails: {
      stats: [
        { label: "Client Capacity", val: "10+ บริษัท" },
        { label: "Router Path", val: "9 เส้นทาง" },
        { label: "Drive Categories", val: "8 หมวดหมู่" },
        { label: "Session TTL", val: "15 นาที" },
      ],
      architecture: [
        "1. LINE Messaging API ส่ง Webhook event เข้า Make Scenario ตัวควบคุมหลัก",
        "2. ตรวจสอบสถานะและสิทธิ์ LINE User ID ในแท็บ Employees เพื่อยืนยันสิทธิ์ในบริษัท",
        "3. ตรวจสอบ Message ID ใน Make Data Store ป้องกัน LINE Webhook Retry ซ้ำซ้อน",
        "4. นับจำนวนหน้า PDF หากเกิน 5 หน้า ระบบแจ้งเตือนให้แยกไฟล์เพื่อควบคุมต้นทุน AI",
        "5. Make AI (Claude) อ่านเอกสารและแปลงเป็น Structured JSON พร้อมคำนวณงวดบัญชี",
        "6. ตรวจสอบเอกสารซ้ำด้วยคีย์ doc:CompanyCode:TaxID:DocNumber",
        "7. อัปโหลดไฟล์เข้าโฟลเดอร์ Google Drive และบันทึกบัญชีลง Google Sheets พร้อมตอบกลับผ่าน LINE",
      ],
      securityRules: [
        "✓ ห้ามอัปโหลดไฟล์ก่อนตรวจสิทธิ์พนักงานและ session",
        "✓ ห้ามใช้ชื่อบริษัทที่ AI อ่านได้ตัดสินบริษัทเจ้าของไฟล์ (ต้องมาจากการยืนยัน 2 ขั้นตอน)",
        "✓ ตรวจสอบความปลอดภัยโฟลเดอร์ Google Drive ห้ามเปิดสาธารณะ",
        "✓ หากข้อมูลไม่ชัดเจนหรือสิทธิ์ไม่ผ่าน ให้หยุดทันทีและบันทึก AuditLog (Zero Guessing Policy)",
      ],
      folderStructure: [
        "01_ภาษีซื้อ (เลขผู้เสียภาษีไม่ตรงกับเรา)",
        "02_ภาษีขาย (เลขผู้เสียภาษีตรงกับเรา)",
        "03_ใบเสร็จรับเงิน",
        "04_ใบแจ้งหนี้",
        "05_หัก ณ ที่จ่าย (50 ทวิ)",
        "06_ธนาคาร (สลิปโอนเงิน / Statement)",
        "07_เอกสารอื่น ๆ (ใบเสนอราคา / ใบสั่งซื้อ)",
        "99_รอตรวจสอบ (เอกสารไม่ชัดเจน / ข้อมูลไม่ครบ)",
      ],
    },
  },
  {
    id: "slf-system",
    title: "ระบบสารสนเทศและจัดการเอกสาร กยศ. (SLF Internal Portal)",
    subtitle: "Student Loan Fund (กองทุนเงินให้กู้ยืมเพื่อการศึกษา)",
    badge: "🌟 ผลงานฝึกงาน (Enterprise System)",
    category: "internship",
    description: "ระบบสารสนเทศและจัดการเอกสารภายในองค์กรสำหรับกองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) พัฒนาและร่วมทดสอบระบบงาน (QA/Testing) จัดการฐานข้อมูลและเอกสารดิจิทัลอย่างแม่นยำ พร้อมวิเคราะห์ข้อมูลเชิงปฏิบัติการและนำเสนอผลงานต่อผู้บริหาร",
    highlights: [
      "สนับสนุนทีมงานในการทดสอบและพัฒนาเว็บไซต์/ระบบงานภายในขององค์กร (QA & Feature Testing)",
      "ตรวจสอบและจัดการโครงสร้างเอกสารในระบบฐานข้อมูลและไฟล์เอกสารเพื่อความเป็นระเบียบ",
      "จัดทำรายงานวิเคราะห์ข้อมูลการดำเนินงาน (Data Analytics Report) และนำเสนอผลงานต่อผู้บริหาร",
    ],
    tags: ["Next.js / Web System", "Database Architecture", "QA & Testing", "Data Analytics", "Document Workflow"],
    icon: <Building2 size={24} />,
    color: "from-blue-600 via-indigo-600 to-cyan-500",
    glowColor: "hover:shadow-blue-500/25 dark:hover:shadow-cyan-900/40",
    organization: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)",
    role: "Software & Information System Intern",
    githubUrl: "https://github.com/SirimongkolMannubut",
  },
  {
    id: "greenpoint",
    title: "GreenPoint - Eco Point Collection Platform",
    subtitle: "Eco-friendly Rewards & Partner Map App",
    badge: "🌱 Mobile & Web Application",
    category: "mobile",
    description: "เว็บแอปพลิเคชันและโมบายล์แอปพลิเคชันสำหรับสะสมแต้มสินค้าเพื่อสิ่งแวดล้อม เชื่อมต่อ API แผนที่ร้านค้าพาร์ทเนอร์ สแกน QR Code รับแต้มจริง จัดการรูปโปรไฟล์และระบบอนุมัติคูปองแลกของรางวัลหน้าร้าน",
    highlights: [
      "พัฒนา Cross-platform Mobile App ด้วย Flutter และ Web Frontend ด้วย Next.js",
      "เชื่อมต่อฐานข้อมูล MongoDB Atlas และ RESTful API ตอบสนองแบบเรียลไทม์",
      "ออกแบบ UI/UX Design System สมบูรณ์แบบด้วย Figma พร้อม Interactive Prototype",
    ],
    githubUrl: "https://github.com/ItzSakkarinTH/GreenPoint",
    figmaUrl: "https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0",
    liveUrl: "https://greenpointapp.vercel.app/",
    tags: ["Flutter", "Next.js", "MongoDB", "Figma UI/UX", "Map API", "QR Code"],
    icon: <MapPin size={24} />,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "hover:shadow-emerald-500/25 dark:hover:shadow-teal-900/40",
    role: "Front-end & Mobile Developer",
  },
  {
    id: "sisaket-charity",
    title: "Sisaket Charity - E-Commerce & Shirt Ordering Platform",
    subtitle: "Charity Campaign Web Application",
    badge: "🛒 Web Application & E-Commerce",
    category: "web",
    description: "ระบบสั่งซื้อเสื้อการกุศลสำหรับโครงการระดมทุน จ.ศรีสะเกษ พัฒนาด้วย Next.js, TypeScript และ MongoDB Atlas พร้อมระบบสมาชิกด้วย JWT Token และ Google OAuth",
    highlights: [
      "สถาปัตยกรรม Next.js และ TypeScript สำหรับระบบจัดการการสั่งซื้อ",
      "เชื่อมต่อฐานข้อมูล MongoDB Atlas สำหรับจัดเก็บคำสั่งซื้อและข้อมูลผู้ใช้",
      "ระบบยืนยันตัวตนผู้ใช้ด้วย JWT Token และ Google OAuth",
    ],
    githubUrl: "https://github.com/ItzSakkarinTH/Sisaket-Charity-NextJs.git",
    tags: ["Next.js", "TypeScript", "MongoDB Atlas", "JWT Auth", "Google OAuth"],
    icon: <ShoppingBag size={24} />,
    color: "from-amber-500 via-orange-500 to-rose-500",
    glowColor: "hover:shadow-orange-500/25 dark:hover:shadow-orange-900/40",
    role: "Developer",
  },
  {
    id: "ssk-emc",
    title: "Ssk-EMC - Sisaket Crisis & Emergency Disaster Management",
    subtitle: "Provincial Relief Coordination & Inventory System",
    badge: "🛡️ Public Sector & Crisis Management",
    category: "web",
    description: "Sisaket EMS ระบบบริหารจัดการสภาวะวิกฤติสำหรับจังหวัดศรีสะเกษ ช่วยในการจัดการสต๊อกสินค้าช่วยเหลือผู้ประสบภัย การจัดการศูนย์พักพิง และการประสานงานระหว่างหน่วยงาน",
    highlights: [
      "จัดการสต๊อกสินค้าและสิ่งของช่วยเหลือผู้ประสบภัย",
      "จัดการข้อมูลศูนย์พักพิงผู้ประสบภัย",
      "สนับสนุนการประสานงานระหว่างหน่วยงานในภาวะวิกฤติ พัฒนาด้วย TypeScript",
    ],
    githubUrl: "https://github.com/ItzSakkarinTH/Ssk-EMC.git",
    tags: ["TypeScript", "Inventory", "Shelter Management", "Agency Coordination"],
    icon: <LifeBuoy size={24} />,
    color: "from-sky-500 via-blue-600 to-indigo-600",
    glowColor: "hover:shadow-sky-500/25 dark:hover:shadow-indigo-900/40",
    role: "Developer",
  },
  {
    id: "louis-ai",
    title: "LouisAI - Smart LINE Bot Assistant & NLP",
    subtitle: "AI-Powered Automated Natural Language Chatbot",
    badge: "🤖 AI Automation & Natural Language",
    category: "ai",
    description: "พัฒนา LINE Bot โต้ตอบอัตโนมัติอัจฉริยะที่เชื่อมต่อเข้ากับ API ภายนอกเพื่อประมวลผลคำสั่ง ภาษาธรรมชาติ (NLP) และช่วยเหลือผู้ใช้งานอย่างมีประสิทธิภาพ รองรับภาษาไทยและอังกฤษแบบเรียลไทม์",
    highlights: [
      "เชื่อมต่อ LINE Messaging API และประมวลผลคำสั่งโต้ตอบอัตโนมัติ 24/7",
      "ประยุกต์ใช้ AI ในการวิเคราะห์บริบทคำถาม (Contextual Understanding) และสร้างคำตอบ",
      "สถาปัตยกรรม Backend รองรับ Webhook และส่งข้อมูลอย่างรวดเร็ว",
    ],
    githubUrl: "https://github.com/SirimongkolMannubut/louis_line-bot",
    tags: ["LINE Messaging API", "Python", "OpenAI / Claude", "Webhooks", "FastAPI"],
    icon: <MessageSquare size={24} />,
    color: "from-purple-600 via-violet-600 to-indigo-500",
    glowColor: "hover:shadow-purple-500/25 dark:hover:shadow-indigo-900/40",
    role: "AI & Automation Developer",
  },
];

// Which filter tabs each hand-crafted card appears under
const CARD_FILTERS: Record<string, string[]> = {
  "line-accounting-automation": ["all", "internship", "ai", "web"],
  "slf-system": ["all", "internship", "web"],
  greenpoint: ["all", "mobile", "web"],
  "sisaket-charity": ["all", "web"],
  "ssk-emc": ["all", "web"],
  "louis-ai": ["all", "ai"],
};

const normalizeRepo = (url?: string) => {
  if (!url) return "";
  const clean = url.toLowerCase().replace(/\.git$/, "").replace(/\/+$/, "");
  // Only treat as a repo when it has owner/repo, not just a profile link
  return clean.split("/").length >= 5 ? clean : "";
};

const extraMatchesFilter = (p: Project, f: string) => {
  if (f === "all") return true;
  if (f === "mobile") return p.category === "mobile";
  if (f === "web") return p.category === "web";
  if (f === "ai") return p.tags.some((t) => /\bai\b|openai|gemini|claude|line/i.test(t));
  return false;
};

// Animated number that counts up once it scrolls into view
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setVal(Math.round((1 - Math.pow(1 - p, 4)) * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [extraProjects, setExtraProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open so wheel/touch scrolls the modal cleanly
  useEffect(() => {
    if (selectedProject) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selectedProject]);

  // Interactive Flagship Console State
  const [activeConsoleTab, setActiveConsoleTab] = useState<"flow" | "metrics" | "security">("flow");
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;

        const defaultRepos = new Set(DEFAULT_PROJECTS.map((p) => normalizeRepo(p.githubUrl)).filter(Boolean));
        const defaultTitles = DEFAULT_PROJECTS.map((p) => p.title.toLowerCase());

        // Skip DB entries that duplicate a hand-crafted card (same repo, or same leading name)
        const isDuplicate = (item: any) => {
          const repo = normalizeRepo(item.githubUrl);
          if (repo && defaultRepos.has(repo)) return true;
          const firstWord = String(item.title || "").toLowerCase().split(/\s+/)[0];
          return firstWord.length >= 4 && defaultTitles.some((dt) => dt.includes(firstWord));
        };

        const extras: Project[] = data
          .filter((item: any) => item.isActive !== false && !isDuplicate(item))
          .map((item: any, idx: number) => ({
            id: item._id || `db-proj-${idx}`,
            title: item.title,
            subtitle: item.techStack ? item.techStack.slice(0, 2).join(" · ") : "Custom Project",
            badge: "🚀 Project",
            category: (item.techStack?.some((s: string) => s.toLowerCase().includes("flutter")) ? "mobile" : "web") as Project["category"],
            description: item.description,
            highlights: [item.description],
            githubUrl: item.githubUrl || undefined,
            figmaUrl: item.figmaUrl || undefined,
            liveUrl: item.liveUrl || undefined,
            tags: item.techStack || ["Web"],
            icon: <Code size={24} />,
            color: "from-blue-600 to-cyan-500",
            glowColor: "hover:shadow-blue-500/25 dark:hover:shadow-cyan-900/40",
            role: "Developer",
          }));
        setExtraProjects(extras);
      })
      .catch(() => {});
  }, []);

  const show = (id: string) => CARD_FILTERS[id]?.includes(activeFilter) ?? false;
  const visibleExtras = extraProjects.filter((p) => extraMatchesFilter(p, activeFilter));
  const countFor = (f: string) =>
    Object.values(CARD_FILTERS).filter((fs) => fs.includes(f)).length +
    extraProjects.filter((p) => extraMatchesFilter(p, f)).length;

  // Run live simulation of intake workflow
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(1);

    const steps = [
      { step: 2, delay: 600 },
      { step: 3, delay: 1300 },
      { step: 4, delay: 2000 },
      { step: 5, delay: 2700 },
      { step: 0, delay: 4200 },
    ];

    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        setSimulationStep(step);
        if (step === 0) setIsSimulating(false);
      }, delay);
    });
  };

  const filterTabs = [
    { id: "all", label: t("projects_filter_all") },
    { id: "internship", label: t("projects_filter_internship") },
    { id: "web", label: t("projects_filter_web") },
    { id: "mobile", label: t("projects_filter_mobile") },
    { id: "ai", label: t("projects_filter_ai") },
  ].map((tab) => ({ ...tab, count: countFor(tab.id) }));

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial glows & cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-[15%] left-[2%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] right-[3%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50/90 dark:bg-cyan-950/40 px-4 py-1.5 rounded-full border border-blue-200/60 dark:border-cyan-800/50 shadow-xs">
            <Sparkles size={13} className="text-cyan-500 animate-pulse" />
            PROVEN ENGINEERING SHOWCASE
          </span>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl mt-3">
            {t("projects_title")}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 mx-auto mt-4 rounded-full shadow-[0_0_12px_var(--neon-cyan)]" />
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            {t("projects_subtitle")}
          </p>
        </div>

        {/* Impact ribbon — figures taken from the internship project documentation */}
        <div className="mb-10 p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-cyan-500/20 backdrop-blur-xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-cyan-50/50 dark:bg-zinc-950/60 border border-cyan-100/60 dark:border-zinc-800">
              <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400"><CountUp to={10} suffix="+" /></div>
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">บริษัทลูกค้าใน LINE OA เดียว</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-zinc-950/60 border border-blue-100/60 dark:border-zinc-800">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400"><CountUp to={9} /></div>
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">เส้นทาง Router ใน Make</div>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-zinc-950/60 border border-indigo-100/60 dark:border-zinc-800">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400"><CountUp to={8} /></div>
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">หมวดเอกสารแยกอัตโนมัติ</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-zinc-950/60 border border-emerald-100/60 dark:border-zinc-800">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400"><CountUp to={15} suffix=" นาที" /></div>
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">Session หมดอายุอัตโนมัติ</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs with Live Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`inline-flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/60 dark:border-zinc-800"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeFilter === tab.id
                    ? "bg-white/25 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 🌟 Highlight 1: Flagship LINE OA Multi-Company Intake (Supercharged 12-col Showcase) */}
          {show("line-accounting-automation") && (
            <div className="lg:col-span-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <div className="border-beam">
              <div className="relative glass-card rounded-[calc(1.6rem-2px)] overflow-hidden shadow-2xl p-6 sm:p-9 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Info & Highlights */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm">
                        <Sparkles size={13} />
                        🌟 FLAGSHIP INTERNSHIP WORKFLOW
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        MULTI-TENANT AUTOMATION
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/60">
                        <Workflow size={13} />
                        สำนักงานบัญชี (10+ Client Companies)
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                      {t("proj_line_doc_title")}
                    </h3>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {t("proj_line_doc_desc")}
                    </p>

                    {/* Operational Highlights Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-cyan-50/80 dark:bg-zinc-900/80 border border-cyan-100 dark:border-zinc-800 text-left hover:border-cyan-400 transition-colors">
                        <Bot size={22} className="text-cyan-600 dark:text-cyan-400 mb-1.5" />
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">AI OCR (Claude)</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">สกัดฟิลด์บัญชีเป็น JSON</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-zinc-900/80 border border-blue-100 dark:border-zinc-800 text-left hover:border-blue-400 transition-colors">
                        <Lock size={22} className="text-blue-600 dark:text-blue-400 mb-1.5" />
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">Multi-Tenant Security</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">แยกสิทธิ์พนักงาน 10+ บริษัท</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-zinc-900/80 border border-indigo-100 dark:border-zinc-800 text-left hover:border-indigo-400 transition-colors">
                        <FileSpreadsheet size={22} className="text-indigo-600 dark:text-indigo-400 mb-1.5" />
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">8-Category Filing</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">แยกภาษีซื้อ/ขาย อัตโนมัติ</div>
                      </div>
                    </div>

                    {/* Tags & Action Button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800">
                      <div className="flex flex-wrap gap-1.5">
                        {["LINE Messaging API", "Make (Integromat)", "Claude Haiku", "Google Apps Script", "Drive 8 Folders"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={runSimulation}
                          disabled={isSimulating}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                          title="ทดสอบจำลองส่งเอกสารผ่าน LINE OA"
                        >
                          <Play size={13} className={isSimulating ? "animate-spin" : ""} />
                          {isSimulating ? "จำลองกำลังรัน..." : "⚡ จำลองระบบสด (Live Demo)"}
                        </button>

                        <button
                          onClick={() => setSelectedProject(DEFAULT_PROJECTS[0])}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
                        >
                          {t("projects_details")}
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Tech Live Architecture Console with 3 Tabs */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-900 shadow-2xl p-5 text-left text-zinc-300 space-y-3.5">
                      {/* Window Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        </div>

                        {/* Interactive Console Tabs */}
                        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                          <button
                            onClick={() => setActiveConsoleTab("flow")}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                              activeConsoleTab === "flow" ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-400 hover:text-white"
                            }`}
                          >
                            Flowchart
                          </button>
                          <button
                            onClick={() => setActiveConsoleTab("metrics")}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                              activeConsoleTab === "metrics" ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-400 hover:text-white"
                            }`}
                          >
                            Metrics
                          </button>
                          <button
                            onClick={() => setActiveConsoleTab("security")}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                              activeConsoleTab === "security" ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-400 hover:text-white"
                            }`}
                          >
                            Security
                          </button>
                        </div>
                      </div>

                      {/* TAB 1: Visual Interactive Flow */}
                      {activeConsoleTab === "flow" && (
                        <div className="space-y-2 text-[11px] font-mono">
                          <div className="flex justify-between items-center text-zinc-400 pb-1">
                            <span>PIPELINE ENGINE:</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              9-WAY ROUTER ACTIVE
                            </span>
                          </div>

                          {/* Node Step Visualizer */}
                          <div className="space-y-1.5">
                            <div
                              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                                simulationStep === 1
                                  ? "bg-cyan-950/80 border-cyan-400 text-white scale-[1.02] shadow-lg shadow-cyan-500/20"
                                  : "bg-zinc-950 border-zinc-800/80 text-zinc-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs">💬</span>
                                <div>
                                  <div className="font-bold text-[11px]">1. LINE OA Webhook Event</div>
                                  <div className="text-[9px] text-zinc-500">พนักงานส่งรูป/PDF ใบแจ้งหนี้</div>
                                </div>
                              </div>
                              <span className="text-[10px] text-cyan-400 font-mono">
                                {simulationStep === 1 ? "RECEIVING..." : "STEP 1"}
                              </span>
                            </div>

                            <div
                              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                                simulationStep === 2
                                  ? "bg-blue-950/80 border-blue-400 text-white scale-[1.02] shadow-lg shadow-blue-500/20"
                                  : "bg-zinc-950 border-zinc-800/80 text-zinc-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs">⚡</span>
                                <div>
                                  <div className="font-bold text-[11px]">2. Make Router + Auth Check</div>
                                  <div className="text-[9px] text-zinc-500">ตรวจสิทธิ์พนักงาน + DataStore Lock</div>
                                </div>
                              </div>
                              <span className="text-[10px] text-blue-400 font-mono">
                                {simulationStep === 2 ? "VERIFYING..." : "STEP 2"}
                              </span>
                            </div>

                            <div
                              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                                simulationStep === 3
                                  ? "bg-purple-950/80 border-purple-400 text-white scale-[1.02] shadow-lg shadow-purple-500/20"
                                  : "bg-zinc-950 border-zinc-800/80 text-zinc-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs">🧠</span>
                                <div>
                                  <div className="font-bold text-[11px]">3. Claude AI OCR (JSON)</div>
                                  <div className="text-[9px] text-zinc-500">สกัด Tax ID 13 หลัก, ยอด VAT, วันที่</div>
                                </div>
                              </div>
                              <span className="text-[10px] text-purple-400 font-mono">
                                {simulationStep === 3 ? "EXTRACTING..." : "STEP 3"}
                              </span>
                            </div>

                            <div
                              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                                simulationStep === 4
                                  ? "bg-amber-950/80 border-amber-400 text-white scale-[1.02] shadow-lg shadow-amber-500/20"
                                  : "bg-zinc-950 border-zinc-800/80 text-zinc-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs">📁</span>
                                <div>
                                  <div className="font-bold text-[11px]">4. Drive 8-Folders Classifier</div>
                                  <div className="text-[9px] text-zinc-500">แยก 01_ภาษีซื้อ หรือ 02_ภาษีขาย</div>
                                </div>
                              </div>
                              <span className="text-[10px] text-amber-400 font-mono">
                                {simulationStep === 4 ? "FILING..." : "STEP 4"}
                              </span>
                            </div>

                            <div
                              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                                simulationStep === 5
                                  ? "bg-emerald-950/80 border-emerald-400 text-white scale-[1.02] shadow-lg shadow-emerald-500/20"
                                  : "bg-zinc-950 border-zinc-800/80 text-zinc-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs">📊</span>
                                <div>
                                  <div className="font-bold text-[11px]">5. Sheets Multi-Tenant Ledger</div>
                                  <div className="text-[9px] text-zinc-500">บันทึกงวดบัญชี + LINE Push สำเร็จ</div>
                                </div>
                              </div>
                              <span className="text-[10px] text-emerald-400 font-mono">
                                {simulationStep === 5 ? "SAVED!" : "STEP 5"}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 text-[10px] text-zinc-400 flex items-center justify-between">
                            <span>Status:</span>
                            <span className="text-cyan-400 font-bold">
                              {isSimulating ? `RUNNING STEP ${simulationStep} / 5` : "READY FOR INCOMING WEBHOOK"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: Metrics */}
                      {activeConsoleTab === "metrics" && (
                        <div className="space-y-3 font-mono text-[11px]">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                              <div className="text-[10px] text-zinc-500">CLIENT TENANTS</div>
                              <div className="text-lg font-bold text-cyan-400">10+ Co.</div>
                              <div className="text-[9px] text-zinc-400">แยกสิทธิ์เด็ดขาด</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                              <div className="text-[10px] text-zinc-500">ROUTER PATHS</div>
                              <div className="text-lg font-bold text-emerald-400">9 Routes</div>
                              <div className="text-[9px] text-zinc-400">Make Scenario</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                              <div className="text-[10px] text-zinc-500">SESSION TIMEOUT</div>
                              <div className="text-lg font-bold text-amber-400">15 Min</div>
                              <div className="text-[9px] text-zinc-400">Auto-Expire TTL</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                              <div className="text-[10px] text-zinc-500">AUTO CATEGORIES</div>
                              <div className="text-lg font-bold text-purple-400">8 Folders</div>
                              <div className="text-[9px] text-zinc-400">ตามกฎหมายภาษี</div>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span>PDF PAGE LIMIT PER AI CALL:</span>
                              <span className="text-emerald-400 font-bold">≤ 5 pages</span>
                            </div>
                            <div className="text-[9px] text-zinc-500">เกิน 5 หน้า ระบบแจ้งให้แยกไฟล์ เพื่อคุมต้นทุน AI</div>
                          </div>
                        </div>
                      )}

                      {/* TAB 3: Security Matrix */}
                      {activeConsoleTab === "security" && (
                        <div className="space-y-2 text-[11px]">
                          <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-start gap-2 text-emerald-300">
                            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                            <span>Zero Guessing Policy: ห้าม AI คาดเดาชื่อบริษัทเด็ดขาด</span>
                          </div>
                          <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-900/50 flex items-start gap-2 text-blue-300">
                            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                            <span>Multi-Tenant Auth: ยืนยันสิทธิ์พนักงานด้วย 2-Step Check</span>
                          </div>
                          <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-900/50 flex items-start gap-2 text-amber-300">
                            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                            <span>Deduplication: ล็อกคีย์ซ้ำด้วย Make Data Store</span>
                          </div>
                          <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/50 flex items-start gap-2 text-purple-300">
                            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                            <span>Drive Security Guard: โฟลเดอร์เป็น Private ปิดกั้น Public</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* 🏛️ Card 2: SLF Internship System (กยศ.) */}
          {show("slf-system") && (
            <div className="lg:col-span-12 glass-card rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-xl p-6 sm:p-8 bg-white/90 dark:bg-zinc-950/90 hover:border-blue-500/50 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/60">
                      <Building2 size={13} />
                      กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                      Enterprise QA & Portal
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                    {t("proj_slf_title")}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {t("proj_slf_desc")}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Next.js", "Database Architecture", "QA Testing", "Data Analytics", "Document Flow"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(DEFAULT_PROJECTS[1])}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    {t("projects_details")} →
                  </button>
                </div>

                {/* Right: responsibilities panel (from internship record) */}
                <div className="lg:col-span-5">
                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                        <FileCheck2 size={14} className="text-blue-500" />
                        Internship Responsibilities
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-cyan-400">
                        มิ.ย. 2569
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      {[
                        { k: "QA & Feature Testing", v: "ทดสอบระบบภายใน" },
                        { k: "Document Database", v: "ตรวจสอบ & จัดระเบียบ" },
                        { k: "Data Analytics Report", v: "นำเสนอผู้บริหาร" },
                      ].map((row) => (
                        <div key={row.k} className="p-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
                            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                            {row.k}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400">{row.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 📱 Card 3: GreenPoint (Flutter + Next.js + MongoDB + Figma) */}
          {show("greenpoint") && (
            <div className="lg:col-span-6 glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-zinc-200/80 dark:border-zinc-800 shadow-xl hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <MapPin size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      🌱 Mobile & Web App
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug group-hover:text-emerald-500 transition-colors">
                    {t("proj_green_title")}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2.5 leading-relaxed font-normal">
                    {t("proj_green_desc")}
                  </p>

                  {/* Smartphone App UI Mockup (ของตกแต่ง) */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500">
                      <span>📱 GREENPOINT MOBILE PREVIEW</span>
                      <span className="text-emerald-500">FLUTTER UI</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-850 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">คะแนนสะสม Eco:</span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-black bg-emerald-500/20 text-emerald-500">
                          ⭐ 2,450 ECO
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-center font-bold text-zinc-700 dark:text-zinc-300">
                          📷 สแกน QR Code
                        </div>
                        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-center font-bold text-zinc-700 dark:text-zinc-300">
                          🗺️ แผนที่พาร์ทเนอร์
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["Flutter", "Next.js", "MongoDB", "Figma UI/UX", "Map API", "QR Code"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(DEFAULT_PROJECTS[2])}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {t("projects_details")} →
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com/ItzSakkarinTH/GreenPoint"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href="https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:scale-105 transition-all"
                      title="Figma Prototype"
                    >
                      <FigmaIcon size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🛒 Card 4: Sisaket-Charity-NextJs (E-Commerce Platform) */}
          {(activeFilter === "all" || activeFilter === "web") && (
            <div className="lg:col-span-6 glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-zinc-200/80 dark:border-zinc-800 shadow-xl hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      <ShoppingBag size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                      🛒 Next.js E-Commerce
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug group-hover:text-orange-400 transition-colors">
                    Sisaket Charity - Next.js & TS Store
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2.5 leading-relaxed font-normal">
                    ระบบสั่งซื้อเสื้อการกุศลและระดมทุน จ.ศรีสะเกษ พัฒนาด้วย Next.js, TypeScript และ MongoDB Atlas พร้อมระบบจัดการออเดอร์และยืนยันสลิปผ่านคลาวด์
                  </p>

                  {/* Store Mockup (ของตกแต่ง) */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold text-zinc-500">
                      <span>🛍️ CHARITY CAMPAIGN STORE</span>
                      <span className="text-orange-500">MONGODB ATLAS</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-850 flex items-center justify-between text-xs">
                      <span className="text-zinc-700 dark:text-zinc-300 font-semibold">👕 เสื้อการกุศล Sakkarin Shirt Edition</span>
                      <span className="font-bold text-orange-500">฿350</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["Next.js 16", "TypeScript", "MongoDB Atlas", "JWT Auth", "Tailwind CSS"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(DEFAULT_PROJECTS[3])}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {t("projects_details")} →
                  </button>

                  <a
                    href="https://github.com/ItzSakkarinTH/Sisaket-Charity-NextJs.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 🛡️ Card 5: Ssk-EMC (Crisis Management) */}
          {(activeFilter === "all" || activeFilter === "web") && (
            <div className="lg:col-span-6 glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-zinc-200/80 dark:border-zinc-800 shadow-xl hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-2.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      <LifeBuoy size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      🛡️ Crisis Management
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug group-hover:text-sky-400 transition-colors">
                    Ssk-EMC - Sisaket Crisis & Emergency
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2.5 leading-relaxed font-normal">
                    ระบบบริหารจัดการสภาวะวิกฤติและภัยพิบัติสำหรับจังหวัดศรีสะเกษ ช่วยในการจัดการสต๊อกสิ่งของช่วยเหลือ ประสานงานศูนย์พักพิง และติดตามสถานการณ์
                  </p>

                  {/* Crisis Command Mockup (ของตกแต่ง) */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold text-zinc-500">
                      <span>🚨 PROVINCIAL RELIEF MONITOR</span>
                      <span className="text-sky-400">ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-850">
                        <div className="text-[10px] text-zinc-500">ถุงยังชีพพร้อมส่ง</div>
                        <div className="font-bold text-sky-500">1,500 ชุด</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-850">
                        <div className="text-[10px] text-zinc-500">ศูนย์พักพิงพร้อมรับ</div>
                        <div className="font-bold text-emerald-500">12 แห่ง</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["TypeScript", "Crisis Coordination", "Inventory API", "Dashboard"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(DEFAULT_PROJECTS[4])}
                    className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {t("projects_details")} →
                  </button>

                  <a
                    href="https://github.com/ItzSakkarinTH/Ssk-EMC.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 🤖 Card 6: LouisAI (LINE Chatbot + Python + AI) */}
          {(activeFilter === "all" || activeFilter === "ai") && (
            <div className="lg:col-span-6 glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-zinc-200/80 dark:border-zinc-800 shadow-xl hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500" />
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      <MessageSquare size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      🤖 AI & LINE Automation
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug group-hover:text-purple-400 transition-colors">
                    {t("proj_louis_title")}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2.5 leading-relaxed font-normal">
                    {t("proj_louis_desc")}
                  </p>

                  {/* Simulated AI Dialogue (ของตกแต่ง) */}
                  <div className="mt-4 space-y-2 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-zinc-500 dark:text-zinc-400">User:</span>
                      <span className="text-zinc-800 dark:text-zinc-200">สนใจติดต่อสัมภาษณ์งานกับคุณศิริมงคล</span>
                    </div>
                    <div className="flex items-start gap-2 text-purple-600 dark:text-cyan-400 font-semibold">
                      <span className="font-bold">LouisAI:</span>
                      <span>ยินดีครับ! ศิริมงคลพร้อมเริ่มงานทันที ติดต่อได้ที่ 065-590-3845 🚀</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["LINE Messaging API", "Python", "OpenAI / Claude", "Webhooks", "Natural Language"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(DEFAULT_PROJECTS[5])}
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {t("projects_details")} →
                  </button>

                  <a
                    href="https://github.com/SirimongkolMannubut/louis_line-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 max-w-3xl w-full rounded-3xl border border-zinc-200/90 dark:border-cyan-500/30 shadow-2xl flex flex-col h-[85vh] sm:h-[88vh] max-h-[90vh] overflow-hidden my-auto">
            {/* Sticky Header with Permanent Close Button */}
            <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3 pr-4 min-w-0">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  {selectedProject.icon}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block truncate">
                    {selectedProject.badge}
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white truncate">
                    {selectedProject.id === "line-accounting-automation"
                      ? t("proj_line_doc_title")
                      : selectedProject.id === "slf-system"
                      ? t("proj_slf_title")
                      : selectedProject.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 sm:p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors shrink-0 cursor-pointer shadow-xs"
                title="ปิด (Close)"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content (with flex-1 min-h-0 and overscroll-contain for 100% reliable scrolling) */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-6 text-zinc-700 dark:text-zinc-300 text-sm focus:outline-none"
              tabIndex={0}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {selectedProject.organization && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-cyan-950/40 text-blue-700 dark:text-cyan-300 text-xs font-semibold border border-blue-200/60 dark:border-cyan-800/40">
                  🏢 {selectedProject.organization} · Role: {selectedProject.role}
                </div>
              )}

              {/* Stats Grid for Flagship Automation */}
              {selectedProject.extraDetails?.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProject.extraDetails.stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800 text-center shadow-xs"
                    >
                      <div className="text-lg sm:text-xl font-black text-blue-600 dark:text-cyan-400">
                        {st.val}
                      </div>
                      <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Overview & Problem Solved */}
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <Layers size={17} className="text-cyan-500" /> ที่มาและภาพรวมโครงการ (Problem & Solution)
                </h4>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {selectedProject.id === "line-accounting-automation"
                    ? t("proj_line_doc_desc")
                    : selectedProject.id === "slf-system"
                    ? t("proj_slf_desc")
                    : selectedProject.description}
                </p>
              </div>

              {/* Architecture Steps */}
              {selectedProject.extraDetails?.architecture && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <Workflow size={17} className="text-blue-500" /> สถาปัตยกรรมและขั้นตอนการทำงาน (System Architecture)
                  </h4>
                  <div className="space-y-2 p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800 text-xs sm:text-sm">
                    {selectedProject.extraDetails.architecture.map((arch, i) => (
                      <div key={i} className="text-zinc-700 dark:text-zinc-300 leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                        <span>{arch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Folder Structure */}
              {selectedProject.extraDetails?.folderStructure && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <FileSpreadsheet size={17} className="text-emerald-500" /> ตรรกะจัดเก็บแยก 8 หมวดหมู่ (Folder Structure Logic)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {selectedProject.extraDetails.folderStructure.map((fol, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                      >
                        <span className="text-base">📁</span>
                        <span>{fol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Rules */}
              {selectedProject.extraDetails?.securityRules && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <Lock size={17} className="text-rose-500" /> มาตรฐานความปลอดภัย (Zero Guessing & Security Rules)
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200/50 dark:border-rose-900/40">
                    {selectedProject.extraDetails.securityRules.map((sec, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 size={15} className="text-rose-500 shrink-0 mt-0.5" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Highlights if no extraDetails */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && !selectedProject.extraDetails && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-emerald-500" /> บทบาทความรับผิดชอบและผลลัพธ์ (Key Contributions)
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 mt-2 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-2.5">
                  Tech Stack & Tools:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-850 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-750"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="px-6 py-4 sm:px-8 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold hover:scale-105 transition-all shadow-xs"
                  >
                    <GithubIcon size={15} />
                    {t("projects_github")}
                  </a>
                )}
                {selectedProject.figmaUrl && (
                  <a
                    href={selectedProject.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 hover:scale-105 transition-all shadow-xs"
                  >
                    <FigmaIcon size={15} />
                    {t("projects_figma")}
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 cursor-pointer transition-colors"
              >
                ปิดหน้าต่าง (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}