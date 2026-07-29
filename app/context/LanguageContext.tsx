"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "th" | "en" | "zh" | "ja";

export const LANG_CONFIG: { code: Language; label: string; flag: string }[] = [
  { code: "th", label: "ไทย (TH)", flag: "🇹🇭" },
  { code: "en", label: "English (EN)", flag: "🇺🇸" },
  { code: "zh", label: "中文 (ZH)", flag: "🇨🇳" },
  { code: "ja", label: "日本語 (JA)", flag: "🇯🇵" },
];

export const translations = {
  th: {
    nav_home: "หน้าแรก",
    nav_about: "เกี่ยวกับฉัน",
    nav_skills: "ทักษะ",
    nav_projects: "ผลงาน",
    nav_activities: "กิจกรรม",
    nav_contact: "ติดต่อ",

    hero_greeting: "สวัสดีครับ 👋 ผมชื่อ",
    hero_name: "ศิริมงคล มนุบุตร",
    hero_role: "Front-end Developer & AI Enthusiast",
    hero_subtitle: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ มุ่งมั่นพัฒนา Web Application และนำเทคโนโลยี AI มาประยุกต์ใช้เพื่อแก้ไขปัญหาจริง",
    hero_btn_projects: "ดูผลงานของฉัน",
    hero_btn_contact: "ติดต่อฉัน",
    hero_status: "พร้อมเปิดรับโอกาสทำงาน / ฝึกงาน",

    about_title: "เกี่ยวกับฉัน (About Me)",
    about_subtitle: "ประวัติส่วนตัว ทักษะ และแรงบันดาลใจ",
    about_name: "ศิริมงคล มนุบุตร",
    about_role_title: "Full-Stack Intern / Developer",
    about_bio_title: "ประวัติส่วนตัว",
    about_bio_text: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ที่มุ่งมั่นในการพัฒนา Web Application และเทคโนโลยี AI มีประสบการณ์ในการพัฒนาระบบ Full-Stack ทั้งฝั่ง Front-end และ Back-end รวมถึงการออกแบบฐานข้อมูลและการประยุกต์ใช้ AI ในงานจริง พร้อมเปิดรับความรู้และความท้าทายใหม่ ๆ เพื่อพัฒนาศักยภาพในการเป็น Software Developer ในอนาคต",
    about_education_title: "การศึกษา",
    about_university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
    about_faculty: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
    about_gpa: "GPA: 3.05",
    about_language_title: "ภาษาอังกฤษ",
    about_language_level_title: "ระดับความเข้าใจ",
    about_language_level: "ปานกลาง (Intermediate)",
    about_interests_title: "ความสนใจ (Interests)",

    skills_title: "ทักษะความสามารถ (Skills)",
    skills_web: "Web Development",
    skills_mobile: "Mobile Development",
    skills_database: "Database System",
    skills_tools: "Tools & Workflow",
    skills_level_advanced: "ระดับสูง (Advanced)",
    skills_level_intermediate: "ระดับปานกลาง (Intermediate)",
    skills_level_basic: "พื้นฐาน (Basic)",

    projects_title: "ผลงานของฉัน (Projects)",
    projects_subtitle: "ตัวอย่างผลงานบางส่วนที่ได้รับการพัฒนาขึ้น คุณสามารถคลิกปุ่ม GitHub หรือ Figma เพื่อดูรายละเอียด โค้ดต้นฉบับ หรือตัวอย่างการออกแบบได้โดยตรง",
    projects_github: "ดูโค้ดบน GitHub",
    projects_figma: "ดูดีไซน์บน Figma",

    // Project 1: LouisAI
    proj_louis_desc: "AI-powered LINE chatbot ที่ตอบคำถามอัตโนมัติ พัฒนาด้วย Python และเชื่อมต่อ OpenAI API รองรับการสนทนาเป็นภาษาไทยและอังกฤษ",
    // Project 2: GreenPoint
    proj_green_desc: "แอปพลิเคชันมือถือและเว็บสำหรับสะสมแต้มสินค้าสีเขียว รองรับการสแกน QR Code รับแต้มจริง ระบบแผนที่พาร์ทเนอร์ และจัดการรูปโปรไฟล์",

    activities_title: "กิจกรรมและประสบการณ์ (Activities)",

    contact_title: "ติดต่อฉัน (Contact)",
    contact_subtitle: "ช่องทางการติดต่อและส่งข้อความ",
    contact_channels_title: "ช่องทางการติดต่อ",
    contact_phone: "เบอร์โทรศัพท์",
    contact_email: "อีเมล",
    contact_line: "Line ID",
    contact_form_name: "ชื่อของคุณ",
    contact_form_email: "อีเมลของคุณ",
    contact_form_message: "ข้อความของคุณ",
    contact_form_send: "ส่งข้อความ",
    contact_form_success: "ส่งข้อความสำเร็จแล้ว! ขอบคุณที่ติดต่อมาครับ",

    footer_copy: "© 2026 Sirimongkol Manubut. All rights reserved.",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_activities: "Activities",
    nav_contact: "Contact",

    hero_greeting: "Hello 👋 I'm",
    hero_name: "Sirimongkol Manubut",
    hero_role: "Front-end Developer & AI Enthusiast",
    hero_subtitle: "Computer Science student passionate about building Web Applications and integrating AI technologies to solve real-world problems.",
    hero_btn_projects: "View My Work",
    hero_btn_contact: "Contact Me",
    hero_status: "Available for work & internship opportunities",

    about_title: "About Me",
    about_subtitle: "Biography, background & passion for technology",
    about_name: "Sirimongkol Manubut",
    about_role_title: "Full-Stack Intern / Developer",
    about_bio_title: "Biography",
    about_bio_text: "Computer Science student passionate about Web Application development and AI technology. Experienced in Full-Stack development across Front-end and Back-end, database design, and applying AI to real-world applications. Eager to embrace new challenges and continuously grow as a Software Developer.",
    about_education_title: "Education",
    about_university: "Sisaket Rajabhat University",
    about_faculty: "Bachelor of Science in Computer Science",
    about_gpa: "GPA: 3.05",
    about_language_title: "English Proficiency",
    about_language_level_title: "Proficiency Level",
    about_language_level: "Intermediate",
    about_interests_title: "Interests",

    skills_title: "Skills & Expertise",
    skills_web: "Web Development",
    skills_mobile: "Mobile Development",
    skills_database: "Database System",
    skills_tools: "Tools & Workflow",
    skills_level_advanced: "Advanced",
    skills_level_intermediate: "Intermediate",
    skills_level_basic: "Basic",

    projects_title: "Featured Projects",
    projects_subtitle: "Selected showcase of projects built with passion. Click GitHub or Figma buttons to inspect the code or design.",
    projects_github: "View on GitHub",
    projects_figma: "View on Figma",

    // Project 1: LouisAI
    proj_louis_desc: "AI-powered LINE chatbot providing automated Q&A responses, built with Python & OpenAI API supporting bilingual conversations.",
    // Project 2: GreenPoint
    proj_green_desc: "Mobile & Web app for eco-friendly green points collection featuring QR scanning, partner maps, and user profile management.",

    activities_title: "Experience & Activities",

    contact_title: "Get In Touch",
    contact_subtitle: "Feel free to reach out via channels below or send a direct message.",
    contact_channels_title: "Contact Channels",
    contact_phone: "Phone Number",
    contact_email: "Email Address",
    contact_line: "Line ID",
    contact_form_name: "Your Name",
    contact_form_email: "Your Email",
    contact_form_message: "Your Message",
    contact_form_send: "Send Message",
    contact_form_success: "Message sent successfully! Thank you.",

    footer_copy: "© 2026 Sirimongkol Manubut. All rights reserved.",
  },
  zh: {
    nav_home: "首页",
    nav_about: "关于我",
    nav_skills: "技能",
    nav_projects: "项目作品",
    nav_activities: "经历与活动",
    nav_contact: "联系我",

    hero_greeting: "你好 👋 我是",
    hero_name: "Sirimongkol Manubut (盛蒙空)",
    hero_role: "前端开发工程师 & 人工智能爱好者",
    hero_subtitle: "计算机科学专业学生，致力于开发高质量的 Web 应用，并应用人工智能技术解决实际问题。",
    hero_btn_projects: "查看项目作品",
    hero_btn_contact: "联系我",
    hero_status: "随时接受工作与实习机会",

    about_title: "关于我",
    about_subtitle: "个人简介、教育背景与技术热情",
    about_name: "Sirimongkol Manubut (盛蒙空)",
    about_role_title: "全栈实习生 / 软件开发工程师",
    about_bio_title: "个人简介",
    about_bio_text: "计算机科学专业学生，热衷于 Web 应用开发与人工智能技术。具备前后端全栈开发、数据库设计以及 AI 实际应用经验。勇于接受新挑战，立志发展成为优秀的软件开发工程师。",
    about_education_title: "教育背景",
    about_university: "四色菊皇家大学",
    about_faculty: "计算机科学理学学士",
    about_gpa: "GPA: 3.05",
    about_language_title: "英语水平",
    about_language_level_title: "熟练程度",
    about_language_level: "中级 (Intermediate)",
    about_interests_title: "兴趣领域 (Interests)",

    skills_title: "专业技能",
    skills_web: "Web 开发",
    skills_mobile: "移动端开发",
    skills_database: "数据库系统",
    skills_tools: "工具与工作流",
    skills_level_advanced: "精通 (Advanced)",
    skills_level_intermediate: "熟练 (Intermediate)",
    skills_level_basic: "基础 (Basic)",

    projects_title: "精选项目作品",
    projects_subtitle: "精选的开发项目展示。点击 GitHub 或 Figma 按钮即可查看源代码与界面设计图。",
    projects_github: "在 GitHub 查看",
    projects_figma: "在 Figma 查看",

    // Project 1: LouisAI
    proj_louis_desc: "基于 Python 和 OpenAI API 开发的智能 LINE 聊天机器人，支持泰英双语自动问答服务。",
    // Project 2: GreenPoint
    proj_green_desc: "环保绿点积分手机与 Web 应用，支持 QR 码扫描领积分、合作商家地图及个人资料管理。",

    activities_title: "经历与活动",

    contact_title: "联系我",
    contact_subtitle: "欢迎通过以下方式与我取得联系或直接在线发送消息。",
    contact_channels_title: "联系方式",
    contact_phone: "电话号码",
    contact_email: "电子邮箱",
    contact_line: "Line ID",
    contact_form_name: "您的姓名",
    contact_form_email: "您的邮箱",
    contact_form_message: "留言内容",
    contact_form_send: "发送消息",
    contact_form_success: "消息发送成功！感谢您的联系。",

    footer_copy: "© 2026 Sirimongkol Manubut. 版权所有。",
  },
  ja: {
    nav_home: "ホーム",
    nav_about: "私について",
    nav_skills: "スキル",
    nav_projects: "制作実績",
    nav_activities: "活動・経歴",
    nav_contact: "お問い合わせ",

    hero_greeting: "こんにちは 👋 私は",
    hero_name: "シリモンコン・マヌブット",
    hero_role: "フロントエンドエンジニア & AI愛好家",
    hero_subtitle: "コンピュータサイエンス専攻の学生。Webアプリケーション開発とAI技術の活用に情熱を注いでいます。",
    hero_btn_projects: "実績を見る",
    hero_btn_contact: "お問い合わせ",
    hero_status: "就職・インターンシップの機会を募集中",

    about_title: "私について",
    about_subtitle: "プロフィール・学歴・技術への情熱",
    about_name: "シリモンコン・マヌブット",
    about_role_title: "フルスタックインターン / 開発者",
    about_bio_title: "プロフィール",
    about_bio_text: "Webアプリケーション開発とAI技術の活用に情熱を注ぐコンピュータサイエンス専攻の学生。フロントエンド・バックエンドのフルスタック開発、データベース設計、AIのシームレスな実用化経験があります。常に新しい技術に挑戦し、ソフトウェアエンジニアとしての成長を目指しています。",
    about_education_title: "学歴",
    about_university: "シーサケート・ラチャパット大学",
    about_faculty: "コンピュータサイエンス学士",
    about_gpa: "GPA: 3.05",
    about_language_title: "英語能力",
    about_language_level_title: "理解度レベル",
    about_language_level: "中級 (Intermediate)",
    about_interests_title: "関心分野 (Interests)",

    skills_title: "スキル・専門知識",
    skills_web: "Web 開発",
    skills_mobile: "モバイルアプリ開発",
    skills_database: "データベース",
    skills_tools: "ツール & ワークフロー",
    skills_level_advanced: "上級 (Advanced)",
    skills_level_intermediate: "中級 (Intermediate)",
    skills_level_basic: "初級 (Basic)",

    projects_title: "制作実績・プロジェクト",
    projects_subtitle: "開発したプロジェクトの一部です。GitHubまたはFigmaボタンをクリックしてコードやデザインをご確認いただけます。",
    projects_github: "GitHubで見る",
    projects_figma: "Figmaで見る",

    // Project 1: LouisAI
    proj_louis_desc: "PythonとOpenAI APIを活用したAI LINEチャットボット。自動応答システムと多言語対話に対応。",
    // Project 2: GreenPoint
    proj_green_desc: "環境保護ポイント還元アプリ。QRコードスキャン、パートナーマップ、プロフィール管理機能を搭載。",

    activities_title: "活動・経歴",

    contact_title: "お問い合わせ",
    contact_subtitle: "下記連絡先、またはフォームよりお気軽にご連絡ください。",
    contact_channels_title: "連絡先一覧",
    contact_phone: "電話番号",
    contact_email: "メールアドレス",
    contact_line: "Line ID",
    contact_form_name: "お名前",
    contact_form_email: "メールアドレス",
    contact_form_message: "メッセージ内容",
    contact_form_send: "送信する",
    contact_form_success: "メッセージが正常に送信されました！ありがとうございます。",

    footer_copy: "© 2026 Sirimongkol Manubut. All rights reserved.",
  },
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations["th"]) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "th",
  setLang: () => {},
  t: (key) => translations["th"][key] || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("th");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang && ["th", "en", "zh", "ja"].includes(savedLang)) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("preferred_lang", newLang);
  };

  const t = (key: keyof typeof translations["th"]): string => {
    return translations[lang][key] || translations["th"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
