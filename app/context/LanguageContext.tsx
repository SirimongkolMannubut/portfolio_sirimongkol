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
    hero_btn_admin: "เข้าสู่ระบบ Admin",
    hero_status: "พร้อมเปิดรับโอกาสทำงาน / ฝึกงาน",

    about_title: "เกี่ยวกับฉัน (About Me)",
    about_subtitle: "ประวัติส่วนตัว ทักษะ และแรงบันดาลใจ",
    about_bio_title: "ประวัติส่วนตัว",
    about_education_title: "การศึกษา",
    about_degree: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
    about_gpa: "GPA: ",
    about_interests_title: "ความสนใจด้านเทคโนโลยี",

    skills_title: "ทักษะความเชี่ยวชาญ (Skills)",
    skills_web: "Web Development",
    skills_mobile: "Mobile Development",
    skills_database: "Database System",
    skills_tools: "Tools & Workflow",

    projects_title: "ผลงานของฉัน (Projects)",
    projects_subtitle: "ตัวอย่างผลงานบางส่วนที่พัฒนาขึ้น คุณสามารถคลิกปุ่ม GitHub หรือ Figma เพื่อดูรายละเอียดเพิ่มเติมได้",
    projects_github: "ดูโค้ดบน GitHub",
    projects_figma: "ดูดีไซน์บน Figma",

    activities_title: "กิจกรรมและประสบการณ์ (Activities)",

    contact_title: "ติดต่อฉัน (Contact)",
    contact_subtitle: "ช่องทางการติดต่อและส่งข้อความ",
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
    hero_btn_admin: "Admin CMS Login",
    hero_status: "Available for work & internship opportunities",

    about_title: "About Me",
    about_subtitle: "Biography, background & passion for technology",
    about_bio_title: "Biography",
    about_education_title: "Education",
    about_degree: "Bachelor of Science in Computer Science",
    about_gpa: "GPA: ",
    about_interests_title: "Tech Interests",

    skills_title: "Skills & Expertise",
    skills_web: "Web Development",
    skills_mobile: "Mobile Development",
    skills_database: "Database System",
    skills_tools: "Tools & Workflow",

    projects_title: "Featured Projects",
    projects_subtitle: "Selected showcase of projects built with passion. Click GitHub or Figma buttons to inspect the code or design.",
    projects_github: "View on GitHub",
    projects_figma: "View on Figma",

    activities_title: "Experience & Activities",

    contact_title: "Get In Touch",
    contact_subtitle: "Feel free to reach out via channels below or send a direct message.",
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
    hero_btn_admin: "后台管理登录",
    hero_status: "随时接受工作与实习机会",

    about_title: "关于我",
    about_subtitle: "个人简介、教育背景与技术热情",
    about_bio_title: "个人简介",
    about_education_title: "教育背景",
    about_degree: "计算机科学理学学士",
    about_gpa: "GPA: ",
    about_interests_title: "技术兴趣领域",

    skills_title: "专业技能",
    skills_web: "Web 开发",
    skills_mobile: "移动端开发",
    skills_database: "数据库系统",
    skills_tools: "工具与工作流",

    projects_title: "精选项目作品",
    projects_subtitle: "精选的开发项目展示。点击 GitHub 或 Figma 按钮即可查看源代码与界面设计图。",
    projects_github: "在 GitHub 查看",
    projects_figma: "在 Figma 查看",

    activities_title: "经历与活动",

    contact_title: "联系我",
    contact_subtitle: "欢迎通过以下方式与我取得联系或直接在线发送消息。",
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
    hero_btn_admin: "管理者ログイン",
    hero_status: "就職・インターンシップの機会を募集中",

    about_title: "私について",
    about_subtitle: "プロフィール・学歴・技術への情熱",
    about_bio_title: "プロフィール",
    about_education_title: "学歴",
    about_degree: "コンピュータサイエンス学士",
    about_gpa: "GPA: ",
    about_interests_title: "関心のある技術分野",

    skills_title: "スキル・専門知識",
    skills_web: "Web 開発",
    skills_mobile: "モバイルアプリ開発",
    skills_database: "データベース",
    skills_tools: "ツール & ワークフロー",

    projects_title: "制作実績・プロジェクト",
    projects_subtitle: "開発したプロジェクトの一部です。GitHubまたはFigmaボタンをクリックしてコードやデザインをご確認いただけます。",
    projects_github: "GitHubで見る",
    projects_figma: "Figmaで見る",

    activities_title: "活動・経歴",

    contact_title: "お問い合わせ",
    contact_subtitle: "下記連絡先、またはフォームよりお気軽にご連絡ください。",
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
