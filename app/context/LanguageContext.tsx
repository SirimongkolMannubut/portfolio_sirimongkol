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
    nav_activities: "กิจกรรม & ฝึกงาน",
    nav_contact: "ติดต่อ",

    hero_greeting: "สวัสดีครับ 👋 ผมชื่อ",
    hero_name: "ศิริมงคล มนุบุตร",
    hero_role: "Front-end Developer | Flutter Developer | Automation & AI",
    hero_subtitle: "นักศึกษาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยราชภัฏศรีสะเกษ ผู้เชี่ยวชาญการพัฒนา Web & Mobile Application และการสร้างระบบ Workflow Automation ระดับองค์กรด้วย AI, Make, LINE API และ Google Cloud Solutions",
    hero_btn_projects: "ดูผลงานของฉัน",
    hero_btn_contact: "ติดต่อร่วมงาน",
    hero_resume: "ดาวน์โหลด Resume (PDF)",
    hero_chat_ai: "ถาม AI Co-Pilot",
    hero_status: "พร้อมเริ่มงานทันที / สัมภาษณ์งาน",
    hero_stat_gpa: "เกรดเฉลี่ยสะสม",
    hero_stat_projects: "ผลงานพัฒนาจริง",
    hero_stat_internship: "ประสบการณ์ฝึกงาน",
    hero_stat_internship_val: "กยศ. & Accounting Automation",

    about_title: "เกี่ยวกับฉัน (About Me)",
    about_subtitle: "ประวัติส่วนตัว จุดเด่น และประสบการณ์พัฒนาซอฟต์แวร์และระบบอัตโนมัติ",
    about_name: "ศิริมงคล มนุบุตร (ท็อป / Louis)",
    about_role_title: "Front-end & Automation Developer",
    about_bio_title: "ประวัติส่วนตัว",
    about_bio_text: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ที่มุ่งมั่นในการพัฒนา Web & Mobile Application และระบบ Enterprise Workflow Automation มีประสบการณ์พัฒนาจริงทั้ง Next.js, Flutter, Tailwind CSS, MongoDB, MySQL, Google Apps Script และการเชื่อมต่อ AI (Claude / Gemini / OpenAI) เข้ากับ LINE OA เพื่อช่วยให้องค์กรลดขั้นตอนการทำงานแบบแมนนวลได้อย่างมีประสิทธิภาพสูงสุด",
    about_education_title: "การศึกษา",
    about_university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
    about_faculty: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
    about_gpa: "GPA: 3.05",
    about_language_title: "ทักษะภาษาอังกฤษ",
    about_language_level_title: "ระดับความเข้าใจ",
    about_language_level: "ปานกลาง (Intermediate)",
    about_interests_title: "ความสนใจทางเทคโนโลยี",
    about_strengths_title: "จุดเด่นและความพร้อมในการทำงาน",
    strength_fast_learner: "เรียนรู้ได้รวดเร็ว (Fast Learner)",
    strength_responsibility: "มีความรับผิดชอบสูง (High Responsibility)",
    strength_teamwork: "ทำงานร่วมกับทีมได้ดีเยี่ยม (Team Player)",
    strength_problem_solving: "มีไหวพริบแก้ปัญหาเฉพาะหน้า (Problem Solver)",
    strength_growth_mindset: "พร้อมรับฟังและพัฒนาทักษะตนเองอยู่เสมอ (Growth Mindset)",

    skills_title: "ทักษะความสามารถ (Skills & Tech Stack)",
    skills_subtitle: "เทคโนโลยีและเครื่องมือที่ใช้ในการพัฒนาจริงในงานและโปรเจกต์",
    skills_web: "Web Development",
    skills_mobile: "Mobile Development",
    skills_database: "Database & Backend",
    skills_tools: "Tools & Workflow",
    skills_level_advanced: "ระดับสูง (Advanced)",
    skills_level_intermediate: "ระดับปานกลาง (Intermediate)",
    skills_level_basic: "พื้นฐาน (Basic)",

    projects_title: "ผลงานของฉัน (Featured Projects)",
    projects_subtitle: "ผลงานจริงจากการฝึกงานในองค์กร ระบบอัตโนมัติ และโปรเจกต์ที่พัฒนาขึ้น สามารถดูรายละเอียด โค้ดบน GitHub หรือดีไซน์บน Figma ได้",
    projects_filter_all: "ทั้งหมด (All)",
    projects_filter_internship: "งานฝึกงาน & องค์กร (Internship)",
    projects_filter_web: "เว็บแอปพลิเคชัน (Web)",
    projects_filter_mobile: "โมบายล์แอป (Mobile)",
    projects_filter_ai: "AI & Automation",
    projects_github: "ดูโค้ดบน GitHub",
    projects_figma: "ดูดีไซน์บน Figma",
    projects_details: "ดูรายละเอียดเชิงลึก",
    projects_badge_internship: "🌟 ผลงานช่วงฝึกงาน (Internship)",
    projects_badge_featured: "🔥 โปรเจกต์เด่น",

    // Flagship Project: LINE OA Multi-Company Document Intake
    proj_line_doc_title: "ระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA สำหรับหลายบริษัท (LINE OA Multi-Company Document Intake)",
    proj_line_doc_subtitle: "Enterprise Workflow Automation & AI Document Processing",
    proj_line_doc_desc: "ระบบอัตโนมัติสำหรับสำนักงานบัญชีที่ดูแลลูกค้ากว่า 10 บริษัท ช่วยให้พนักงานส่งเอกสารบัญชีผ่าน LINE OA แล้ว AI สกัดข้อมูลสำคัญ จัดเก็บลง Google Drive แยกโฟลเดอร์ 8 หมวดหมู่ และบันทึกลง Google Sheets ของบริษัทที่ถูกต้องทันที พร้อมระบบสิทธิ์ Multi-Tenant ป้องกันข้อมูลปนกัน",
    proj_line_doc_highlight_1: "ใช้ AI (Claude) สกัดข้อมูลเอกสารบัญชี (เลขที่, วันที่, ยอดก่อน VAT, ยอดรวม, เลขผู้เสียภาษี) ตอบเป็น Structured JSON",
    proj_line_doc_highlight_2: "ตรรกะแยกภาษีซื้อ/ภาษีขายอัตโนมัติด้วยเลขผู้เสียภาษี 13 หลัก พร้อมจัดเก็บไฟล์ลง Drive แยก 8 หมวดหมู่ตามงวดบัญชี",
    proj_line_doc_highlight_3: "ระบบความปลอดภัย Multi-Tenant ตรวจสิทธิ์พนักงาน, Session 15 นาที, ป้องกันเอกสารซ้ำ (Deduplication) และ Audit Log ครบวงจร",
    proj_line_doc_highlight_4: "Google Apps Script ช่วยผู้ดูแลสร้างโฟลเดอร์รายเดือนและตั้งค่าบริษัทใหม่อัตโนมัติ (Idempotent Trigger)",

    // Project 2: SLF Internship
    proj_slf_title: "ระบบสารสนเทศและจัดการเอกสาร กยศ. (SLF Internal System)",
    proj_slf_org: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ. / Student Loan Fund)",
    proj_slf_desc: "ระบบสารสนเทศและจัดการเอกสารภายในองค์กรสำหรับกองทุนเงินให้กู้ยืมเพื่อการศึกษา พัฒนาและร่วมทดสอบระบบงาน (QA/Testing) ดูแลฐานข้อมูล จัดการตรวจสอบและคัดกรองเอกสารสำคัญในระบบให้ถูกต้องเป็นระเบียบ พร้อมจัดทำรายงานวิเคราะห์ข้อมูลการดำเนินงานเสนอต่อคณะผู้บริหาร",
    proj_slf_highlight_1: "ทดสอบและตรวจสอบการทำงานของเว็บไซต์และระบบสารสนเทศภายในองค์กร (QA & Testing)",
    proj_slf_highlight_2: "บริหารจัดการโครงสร้างไฟล์และฐานข้อมูลเอกสารเพื่อความถูกต้องรวดเร็ว",
    proj_slf_highlight_3: "วิเคราะห์ข้อมูลสรุปผลการดำเนินงานและจัดทำ Executive Report นำเสนอผู้บริหาร",

    // Project 3: GreenPoint
    proj_green_title: "GreenPoint - Eco Point Collection Platform",
    proj_green_desc: "แอปพลิเคชันมือถือและเว็บสำหรับสะสมแต้มสินค้าเพื่อสิ่งแวดล้อม (Eco-friendly) พัฒนาด้วย Flutter และ Next.js เชื่อมต่อ MongoDB รองรับแผนที่ร้านค้าพาร์ทเนอร์ สแกน QR Code รับแต้มจริง และระบบจัดการคูปองแลกรางวัล",

    // Project 4: LouisAI
    proj_louis_title: "LouisAI - Smart LINE Chatbot",
    proj_louis_desc: "LINE Bot อัจฉริยะโต้ตอบอัตโนมัติ พัฒนาด้วย Python และเชื่อมต่อ OpenAI / External API รองรับการวิเคราะห์คำสั่งและตอบคำถามภาษาไทยและอังกฤษได้อย่างชาญฉลาด",

    // Activities
    activities_title: "ประสบการณ์และกิจกรรม (Experience & Activities)",
    activities_subtitle: "เส้นทางการฝึกงานจริงในองค์กรและกิจกรรมพัฒนาทักษะทางเทคโนโลยี",
    act_1_title: "นักศึกษาฝึกงาน (Software, Systems & Automation Intern)",
    act_1_org: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) & สำนักงานบัญชี",
    act_1_period: "2569 (2026)",
    act_1_desc_1: "พัฒนาระบบรับเอกสารบัญชีอัตโนมัติผ่าน LINE OA รองรับการใช้งานจริงหลายบริษัทด้วย AI และ Make Automation",
    act_1_desc_2: "ตรวจสอบและจัดการเอกสารในระบบฐานข้อมูล สนับสนุนทีมงานในการทดสอบและพัฒนาเว็บไซต์/ระบบสารสนเทศภายในองค์กร",
    act_1_desc_3: "จัดทำรายงานวิเคราะห์ข้อมูลการดำเนินงาน และนำเสนอผลงานต่อผู้บริหาร",

    act_2_title: "อบรมเชิงปฏิบัติการพัฒนาเว็บแอปพลิเคชัน (GDG Workshop)",
    act_2_org: "Google Developer Groups (GDG)",
    act_2_period: "2566 - 2567",
    act_2_desc_1: "การพัฒนาเว็บไซต์ด้วย HTML5, Modern CSS3 และ JavaScript (ES6+)",
    act_2_desc_2: "การพัฒนาเว็บแอปพลิเคชันด้วย Next.js, React.js และการต่อยอด State Management",
    act_2_desc_3: "หลักการออกแบบ UI/UX สำหรับ Responsive Web Application",

    // Contact
    contact_title: "ติดต่อฉัน (Contact)",
    contact_subtitle: "ช่องทางการติดต่อและส่งข้อความ",
    contact_subtitle_detail: "ยินดีเปิดรับโอกาสสัมภาษณ์งาน ตำแหน่ง Front-end Developer, Flutter Developer, หรือ Software & Automation Developer สามารถติดต่อผมผ่านช่องทางเหล่านี้หรือกรอกฟอร์มเพื่อส่งข้อความได้โดยตรงครับ",
    contact_channels_title: "ช่องทางการติดต่อโดยตรง",
    contact_phone: "เบอร์โทรศัพท์",
    contact_email: "อีเมล",
    contact_line: "Line ID",
    contact_form_title: "ส่งข้อความถึงผมโดยตรง",
    contact_form_name: "ชื่อของคุณ",
    contact_form_name_placeholder: "สมชาย ใจดี",
    contact_form_email: "อีเมลของคุณ",
    contact_form_email_placeholder: "somchai@example.com",
    contact_form_message: "ข้อความของคุณ",
    contact_form_msg_placeholder: "สวัสดีครับ สนใจติดต่อสัมภาษณ์งาน / สอบถามข้อมูล...",
    contact_form_send: "ส่งข้อความทันที",
    contact_form_success: "ส่งข้อความสำเร็จแล้ว! ระบบได้ส่งอีเมลแจ้งเตือนถึงผมเรียบร้อย ขอบคุณครับ",

    footer_copy: "© 2026 Sirimongkol Manubut. All rights reserved.",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_activities: "Experience",
    nav_contact: "Contact",

    hero_greeting: "Hello 👋 I'm",
    hero_name: "Sirimongkol Manubut",
    hero_role: "Front-end Developer | Flutter Developer | Automation & AI",
    hero_subtitle: "Computer Science student at Sisaket Rajabhat University specializing in high-performance Web & Mobile applications, enterprise workflow automation (Make, Google Apps Script), and AI integration.",
    hero_btn_projects: "View Featured Projects",
    hero_btn_contact: "Contact Me",
    hero_resume: "Download Resume (PDF)",
    hero_chat_ai: "Ask AI Co-Pilot",
    hero_status: "Available for Job & Interview Opportunities",
    hero_stat_gpa: "Academic GPA",
    hero_stat_projects: "Production Projects",
    hero_stat_internship: "Internship Org",
    hero_stat_internship_val: "SLF & Accounting Automation",

    about_title: "About Me",
    about_subtitle: "Personal background, key strengths & passion for software engineering",
    about_name: "Sirimongkol Manubut (Top / Louis)",
    about_role_title: "Front-end & Automation Developer",
    about_bio_title: "Biography",
    about_bio_text: "Computer Science student passionate about Web & Mobile development and enterprise workflow automation. Practical experience developing solutions with Next.js, Flutter, Tailwind CSS, MongoDB, MySQL, Google Apps Script, and AI integrations (Claude / Gemini / OpenAI) into LINE OA to automate complex manual business operations.",
    about_education_title: "Education",
    about_university: "Sisaket Rajabhat University",
    about_faculty: "Bachelor of Science in Computer Science",
    about_gpa: "GPA: 3.05",
    about_language_title: "English Proficiency",
    about_language_level_title: "Proficiency Level",
    about_language_level: "Intermediate",
    about_interests_title: "Technical Interests",
    about_strengths_title: "Key Strengths & Work Readiness",
    strength_fast_learner: "Fast Learner - Quick to master new tech stacks",
    strength_responsibility: "High Responsibility - Committed to deadlines & quality",
    strength_teamwork: "Strong Team Player - Collaborative & communicative",
    strength_problem_solving: "Agile Problem Solver - Handles unforeseen challenges",
    strength_growth_mindset: "Growth Mindset - Constantly learning & seeking feedback",

    skills_title: "Skills & Tech Stack",
    skills_subtitle: "Technologies, frameworks, and engineering tools applied in real projects",
    skills_web: "Web Development",
    skills_mobile: "Mobile Development",
    skills_database: "Database & Backend",
    skills_tools: "Tools & Workflow",
    skills_level_advanced: "Advanced",
    skills_level_intermediate: "Intermediate",
    skills_level_basic: "Basic",

    projects_title: "Featured Projects",
    projects_subtitle: "Real-world projects developed during enterprise internship, automation initiatives, and personal products.",
    projects_filter_all: "All Projects",
    projects_filter_internship: "Internship & Enterprise",
    projects_filter_web: "Web Apps",
    projects_filter_mobile: "Mobile (Flutter)",
    projects_filter_ai: "AI & Automation",
    projects_github: "View on GitHub",
    projects_figma: "View on Figma",
    projects_details: "Explore In-depth Details",
    projects_badge_internship: "🌟 Internship Project",
    projects_badge_featured: "🔥 Flagship Project",

    // Flagship Project: LINE OA Multi-Company Document Intake
    proj_line_doc_title: "LINE OA Multi-Company Document Intake & Automated Accounting Workflow",
    proj_line_doc_subtitle: "Enterprise Workflow Automation & AI Document Processing",
    proj_line_doc_desc: "Production workflow automation built for accounting firms managing 10+ client companies. Enables staff to submit documents via LINE OA; AI extracts key invoice/tax data, organizes files into 8 Google Drive categories, and updates Google Sheets with strict multi-tenant security.",
    proj_line_doc_highlight_1: "AI (Claude) document extraction for invoices, receipts, tax certificates, outputting structured JSON",
    proj_line_doc_highlight_2: "Automated input/output VAT classification via 13-digit Tax ID matching and 8-category Drive filing",
    proj_line_doc_highlight_3: "Multi-tenant access control, 15-minute secure session TTL, deduplication, and comprehensive Audit Log",
    proj_line_doc_highlight_4: "Google Apps Script administrative automation for monthly folder provision and setup (Idempotent Triggers)",

    // Project 2: SLF Internship
    proj_slf_title: "SLF Internal Information & Document System",
    proj_slf_org: "Student Loan Fund (กยศ. / SLF Thailand)",
    proj_slf_desc: "Internal enterprise information portal and document management system for the Student Loan Fund (SLF). Supported internal website QA testing and feature validation, managed database document records for high accuracy, and prepared analytical operational reports for executive review.",
    proj_slf_highlight_1: "Supported QA testing & verification of internal enterprise portal workflows",
    proj_slf_highlight_2: "Organized structured document records and database integrity",
    proj_slf_highlight_3: "Compiled operational data analytics reports for organizational management",

    // Project 3: GreenPoint
    proj_green_title: "GreenPoint - Eco Point Collection Platform",
    proj_green_desc: "Eco-friendly rewards platform built with Flutter and Next.js backed by MongoDB. Features interactive partner maps, physical QR code scanning for verified point collection, and store coupon redemption.",

    // Project 4: LouisAI
    proj_louis_title: "LouisAI - Smart LINE Chatbot",
    proj_louis_desc: "Intelligent automated Q&A LINE bot built with Python and external AI API integrations, delivering fast multilingual responses in Thai and English.",

    // Activities
    activities_title: "Experience & Activities",
    activities_subtitle: "Enterprise internship background and developer training history",
    act_1_title: "Software, Systems & Automation Intern",
    act_1_org: "Student Loan Fund (SLF) & Accounting Practice",
    act_1_period: "2026",
    act_1_desc_1: "Engineered multi-company LINE OA accounting document intake automation using AI and Make.",
    act_1_desc_2: "Audited and managed structured records in the document database system for high accuracy.",
    act_1_desc_3: "Prepared analytical operational data reports and presented results to department leadership.",

    act_2_title: "Web Application Development Workshop",
    act_2_org: "Google Developer Groups (GDG)",
    act_2_period: "2023 - 2024",
    act_2_desc_1: "Modern web architecture with HTML5, CSS3, and JavaScript (ES6+).",
    act_2_desc_2: "Web application development with Next.js, React.js, and state handling.",
    act_2_desc_3: "UI/UX design principles and Responsive Web Design best practices.",

    // Contact
    contact_title: "Get In Touch",
    contact_subtitle: "Available for Front-end, Flutter, or Software & Automation positions",
    contact_subtitle_detail: "Feel free to reach out for job interviews, internship opportunities, or collaborations via the channels below or send a direct message.",
    contact_channels_title: "Direct Contact Channels",
    contact_phone: "Phone Number",
    contact_email: "Email Address",
    contact_line: "Line ID",
    contact_form_title: "Send Me a Message",
    contact_form_name: "Your Name",
    contact_form_name_placeholder: "John Doe",
    contact_form_email: "Your Email",
    contact_form_email_placeholder: "johndoe@example.com",
    contact_form_message: "Your Message",
    contact_form_msg_placeholder: "Hi Sirimongkol, we would love to invite you for an interview...",
    contact_form_send: "Send Message Now",
    contact_form_success: "Message sent successfully! I have received an email notification and will get back to you shortly.",

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
    hero_role: "前端开发工程师 | Flutter 开发 | 工作流自动化与 AI",
    hero_subtitle: "四色菊皇家大学计算机科学专业学生，精通 Web & 移动端开发，以及基于 Make、LINE API、Google Apps Script 和 AI 构建企业级工作流自动化。",
    hero_btn_projects: "查看精选作品",
    hero_btn_contact: "联系与面试",
    hero_resume: "下载简历 (PDF)",
    hero_chat_ai: "咨询 AI 助手",
    hero_status: "随时可参加面试与入职",
    hero_stat_gpa: "大学 GPA",
    hero_stat_projects: "实际项目作品",
    hero_stat_internship: "实习机构",
    hero_stat_internship_val: "SLF & 财务自动化",

    about_title: "关于我",
    about_subtitle: "个人简介、核心优势与全栈及自动化开发能力",
    about_name: "Sirimongkol Manubut (盛蒙空 / Louis)",
    about_role_title: "前端与自动化开发工程师",
    about_bio_title: "个人简介",
    about_bio_text: "计算机科学专业学生，在 Web、移动开发及企业级自动化流设计方面拥有丰富实战经验。熟练运用 Next.js, Flutter, MongoDB, MySQL, Google Apps Script 以及将 AI (Claude/Gemini) 接入 LINE OA，帮助企业实现繁琐单据录入与审核的完全自动化。",
    about_education_title: "教育背景",
    about_university: "四色菊皇家大学",
    about_faculty: "计算机科学理学学士",
    about_gpa: "GPA: 3.05",
    about_language_title: "英语水平",
    about_language_level_title: "熟练程度",
    about_language_level: "中级 (Intermediate)",
    about_interests_title: "技术兴趣领域",
    about_strengths_title: "核心优势与工作素养",
    strength_fast_learner: "快速学习能力 (Fast Learner) - 能迅速掌握新技术栈",
    strength_responsibility: "高度责任心 (High Responsibility) - 重视代码质量与交付",
    strength_teamwork: "出色团队协作 (Team Player) - 沟通顺畅，乐于互助",
    strength_problem_solving: "敏锐解决问题 (Problem Solver) - 能沉着应对突发挑战",
    strength_growth_mindset: "成长型思维 (Growth Mindset) - 虚心听取反馈并持续精进",

    skills_title: "专业技能与技术栈",
    skills_subtitle: "在企业实习与真实项目中所使用的工具和技术",
    skills_web: "Web 开发",
    skills_mobile: "移动端开发",
    skills_database: "数据库与后端",
    skills_tools: "工具与工作流",
    skills_level_advanced: "精通 (Advanced)",
    skills_level_intermediate: "熟练 (Intermediate)",
    skills_level_basic: "基础 (Basic)",

    projects_title: "精选项目作品",
    projects_subtitle: "包含企业实习项目、财务自动化流水线与个人研发成果。",
    projects_filter_all: "全部作品",
    projects_filter_internship: "实习与企业级项目",
    projects_filter_web: "Web 应用",
    projects_filter_mobile: "移动端 (Flutter)",
    projects_filter_ai: "AI 与自动化",
    projects_github: "在 GitHub 查看",
    projects_figma: "在 Figma 查看",
    projects_details: "查看详细方案",
    projects_badge_internship: "🌟 实习代表项目",
    projects_badge_featured: "🔥 旗舰项目",

    // Flagship Project: LINE OA Multi-Company Document Intake
    proj_line_doc_title: "基于 LINE OA 的多公司会计单据自动化流转系统",
    proj_line_doc_subtitle: "企业级自动化与 AI 智能文档抽取系统",
    proj_line_doc_desc: "面向管理10+客户公司的会计师事务所研发的自动化系统。员工只需通过 LINE OA 拍照上传发票或单据，AI 即可提取关键字段，按8大类别自动归档至 Google Drive，并写入对应公司的 Google Sheets，具备严密的多租户权限控制。",
    proj_line_doc_highlight_1: "基于 AI (Claude) 的财务单据智能 OCR，输出规范结构化 JSON",
    proj_line_doc_highlight_2: "利用 13 位税号自动判定进项/销项税，并按账期归入对应 Drive 目录",
    proj_line_doc_highlight_3: "多公司数据隔离与 15 分钟会话机制，结合防重检查 (Deduplication) 与全流程审计日志",
    proj_line_doc_highlight_4: "编写 Google Apps Script 自动化脚本，定时批量配置月度文件夹与初始化新公司",

    // Project 2: SLF Internship
    proj_slf_title: "SLF 内部信息与档案管理系统",
    proj_slf_org: "泰国学生贷款基金 (Student Loan Fund / กยศ.)",
    proj_slf_desc: "为泰国学生贷款基金 (SLF) 打造的内部信息门户与档案管理系统。协助内部网站功能测试 (QA Testing)，维护数据库档案结构及准确性，并编写业务数据分析报告向管理层汇报。",
    proj_slf_highlight_1: "支持机构内部门户系统的工作流功能与 QA 测试",
    proj_slf_highlight_2: "管理结构化档案数据，保障信息准确与高效查阅",
    proj_slf_highlight_3: "汇总整理业务分析报告并向管理层呈报工作成果",

    // Project 3: GreenPoint
    proj_green_title: "GreenPoint - 环保绿点积分平台",
    proj_green_desc: "基于 Flutter 与 Next.js 开发的环保积分应用，后端采用 MongoDB。提供合作商家地图、二维码现场扫码积分及优惠券兑换管理功能。",

    // Project 4: LouisAI
    proj_louis_title: "LouisAI - 智能 LINE 机器人",
    proj_louis_desc: "基于 Python 和外部 AI API 构建的智能自动应答 LINE 机器人，支持泰英双语智能问答与高效指令处理。",

    // Activities
    activities_title: "经历与活动",
    activities_subtitle: "机构实习经历与开发者技能培训历程",
    act_1_title: "软件开发与工作流自动化实习生",
    act_1_org: "泰国学生贷款基金 (SLF) 与 会计实务机构",
    act_1_period: "2026年",
    act_1_desc_1: "研发基于 LINE OA 的多公司会计单据自动化流转系统，实现多租户与 AI 自动处理。",
    act_1_desc_2: "协助开发团队进行机构内部网站及业务系统的测试与优化，维护数据库数据一致性。",
    act_1_desc_3: "编制运营数据分析报告并向主管领导汇报成果。",

    act_2_title: "Web 应用开发实战工作坊",
    act_2_org: "谷歌开发者社区 (GDG)",
    act_2_period: "2023年 - 2024年",
    act_2_desc_1: "HTML5、CSS3 与现代 JavaScript (ES6+) Web 架构实战。",
    act_2_desc_2: "基于 Next.js、React.js 的 Web 应用与状态管理。",
    act_2_desc_3: "响应式网页设计 (RWD) 与 UI/UX 核心规范。",

    // Contact
    contact_title: "联系我",
    contact_subtitle: "欢迎就前端开发、Flutter 开发或自动化与全栈工程岗位进行沟通",
    contact_subtitle_detail: "欢迎通过以下方式与我取得联系，探讨面试机会、实习或技术合作，您也可以直接在线提交留言。",
    contact_channels_title: "直接联系方式",
    contact_phone: "电话号码",
    contact_email: "电子邮箱",
    contact_line: "Line ID",
    contact_form_title: "直接给我留言",
    contact_form_name: "您的姓名",
    contact_form_name_placeholder: "张三",
    contact_form_email: "您的邮箱",
    contact_form_email_placeholder: "zhangsan@example.com",
    contact_form_message: "留言内容",
    contact_form_msg_placeholder: "盛蒙空您好，我们对您的简历很感兴趣，希望能邀请您参加面试...",
    contact_form_send: "立即发送留言",
    contact_form_success: "留言已成功发送！已通过邮件即时通知我，我会尽快与您回复。",

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
    hero_role: "フロントエンドエンジニア | Flutter開発 | ワークフロー自動化・AI",
    hero_subtitle: "シーサケート・ラチャパット大学コンピュータサイエンス専攻。高品質なWeb・モバイル開発に加え、Make、LINE API、AIを統合したエンタープライズ業務自動化に強みを持っています。",
    hero_btn_projects: "実績を見る",
    hero_btn_contact: "お問い合わせ",
    hero_resume: "履歴書をダウンロード (PDF)",
    hero_chat_ai: "AIアシスタントに聞く",
    hero_status: "採用・面接・インターンシップ相談可能",
    hero_stat_gpa: "大学GPA",
    hero_stat_projects: "制作・開発実績",
    hero_stat_internship: "インターン先",
    hero_stat_internship_val: "SLF & 会計業務自動化",

    about_title: "私について",
    about_subtitle: "プロフィール・強み・ソフトウェア開発への情熱",
    about_name: "シリモンコン・マヌブット (Top / Louis)",
    about_role_title: "フロントエンド & 業務自動化開発者",
    about_bio_title: "プロフィール",
    about_bio_text: "Web・モバイル開発および企業向けワークフロー自動化に高い情熱を注ぐ学生。Next.js、Flutter、Tailwind CSS、MongoDB、MySQL、Google Apps Scriptを駆使し、LINE OAとAI (Claude/Gemini) を連携させたマルチテナント会計書類自動化システムを構築した実務経験があります。",
    about_education_title: "学歴",
    about_university: "シーサケート・ラチャパット大学",
    about_faculty: "コンピュータサイエンス学士",
    about_gpa: "GPA: 3.05",
    about_language_title: "英語能力",
    about_language_level_title: "理解度レベル",
    about_language_level: "中級 (Intermediate)",
    about_interests_title: "技術的関心",
    about_strengths_title: "強みと仕事への姿勢",
    strength_fast_learner: "素早い学習能力 (Fast Learner) - 新技術を迅速に習得",
    strength_responsibility: "強い責任感 (High Responsibility) - 品質と納期を徹底",
    strength_teamwork: "チームワーク力 (Team Player) - 円滑な協調とコミュニケーション",
    strength_problem_solving: "課題解決力 (Problem Solver) - 的確で臨機応変な対応",
    strength_growth_mindset: "成長意欲 (Growth Mindset) - 常に自己研鑽を惜しまない姿勢",

    skills_title: "スキル・技術スタック",
    skills_subtitle: "実際のインターン業務やプロジェクトで使用した言語・ツール群",
    skills_web: "Web 開発",
    skills_mobile: "モバイルアプリ開発",
    skills_database: "データベース・バックエンド",
    skills_tools: "ツール & ワークフロー",
    skills_level_advanced: "上級 (Advanced)",
    skills_level_intermediate: "中級 (Intermediate)",
    skills_level_basic: "初級 (Basic)",

    projects_title: "主な制作実績・プロジェクト",
    projects_subtitle: "組織インターンでの実務成果、業務自動化システム、および個人開発プロダクト。",
    projects_filter_all: "すべて",
    projects_filter_internship: "インターン・業務システム",
    projects_filter_web: "Web アプリ",
    projects_filter_mobile: "モバイル (Flutter)",
    projects_filter_ai: "AI & 自動化",
    projects_github: "GitHubで見る",
    projects_figma: "Figmaで見る",
    projects_details: "詳細アーキテクチャを見る",
    projects_badge_internship: "🌟 インターン実績",
    projects_badge_featured: "🔥 代表プロジェクト",

    // Flagship Project: LINE OA Multi-Company Document Intake
    proj_line_doc_title: "LINE OA 複数企業向け会計書類自動仕分け・取込システム",
    proj_line_doc_subtitle: "エンタープライズ・ワークフロー自動化 & AI書類OCR処理",
    proj_line_doc_desc: "10社以上のクライアントを抱える会計事務所向けに開発された自動化システム。スタッフがLINE OA経由で書類を送るだけで、AIが重要情報を抽出し、Google Driveの8カテゴリーに自動仕分けの上、該当企業のGoogle Sheetsへ即時記録。厳格なマルチテナント権限管理を実装。",
    proj_line_doc_highlight_1: "AI (Claude) による請求書・領収書・源泉徴収票の自動OCRと構造化JSON出力",
    proj_line_doc_highlight_2: "13桁の納税者番号による仕入/売上税の自動判別と月別8カテゴリーDrive仕分け",
    proj_line_doc_highlight_3: "マルチテナント権限管理、15分セッション制限、重複登録防止 (Deduplication)、完全監査ログ",
    proj_line_doc_highlight_4: "Google Apps Scriptによる月別フォルダ自動生成・新企業自動プロビジョニング",

    // Project 2: SLF Internship
    proj_slf_title: "SLF 内部情報・文書管理システム",
    proj_slf_org: "タイ学生ローン基金 (Student Loan Fund / กยศ.)",
    proj_slf_desc: "タイ学生ローン基金 (SLF) 向けの内部情報ポータルおよび文書管理システム。内部WebシステムのQAテスト検証、データベース文書データの整合性管理、組織幹部向けの実務分析レポート作成を担当。",
    proj_slf_highlight_1: "内部ポータルシステムのQA検証およびワークフローテスト支援",
    proj_slf_highlight_2: "構造化された文書データとデータベースの整合性管理",
    proj_slf_highlight_3: "実務データ分析レポートの作成および経営陣への成果報告",

    // Project 3: GreenPoint
    proj_green_title: "GreenPoint - 環境ポイント還元アプリ",
    proj_green_desc: "FlutterとNext.js、MongoDBで構築された環境配慮型ポイントアプリ。提携店舗マップ、QRコードスキャンでのポイント取得、クーポン交換機能を備えています。",

    // Project 4: LouisAI
    proj_louis_title: "LouisAI - LINE 自動応答ボット",
    proj_louis_desc: "PythonとAI APIを連携させた高精度LINEチャットボット。タイ語と英語のバイリンガル対応と迅速な自動応答を実現。",

    // Activities
    activities_title: "活動・経歴",
    activities_subtitle: "企業・機関でのインターンシップと開発者研修の記録",
    act_1_title: "ソフトウェア・システム & 業務自動化インターン",
    act_1_org: "タイ学生ローン基金 (SLF) & 会計事務所業務",
    act_1_period: "2026年",
    act_1_desc_1: "LINE OAとAIを活用した複数企業向け会計書類自動仕分けシステムを設計・構築。",
    act_1_desc_2: "組織内Webアプリケーションおよびワークフローのテスト・開発を支援し、整合性を維持。",
    act_1_desc_3: "業務データ分析レポートを作成し、幹部向けに成果をプレゼンテーション。",

    act_2_title: "Webアプリケーション開発ワークショップ",
    act_2_org: "Google Developer Groups (GDG)",
    act_2_period: "2023年 - 2024年",
    act_2_desc_1: "HTML5、CSS3、JavaScript (ES6+) によるWeb開発基礎。",
    act_2_desc_2: "Next.jsおよびReact.jsを活用したWebアプリ開発と状態管理。",
    act_2_desc_3: "レスポンシブWebデザインとUI/UXデザイン原則の実践。",

    // Contact
    contact_title: "お問い合わせ",
    contact_subtitle: "フロントエンド、Flutter、ソフトウェア・自動化開発の採用ご相談",
    contact_subtitle_detail: "面接のご相談、インターンシップ、または共同開発に関するお問い合わせは下記よりお願いいたします。",
    contact_channels_title: "直接連絡先一覧",
    contact_phone: "電話番号",
    contact_email: "メールアドレス",
    contact_line: "Line ID",
    contact_form_title: "メッセージを送信",
    contact_form_name: "お名前",
    contact_form_name_placeholder: "山田 太郎",
    contact_form_email: "メールアドレス",
    contact_form_email_placeholder: "yamada@example.com",
    contact_form_message: "メッセージ内容",
    contact_form_msg_placeholder: "シリモンコン様、面接のお願いについてご連絡いたしました...",
    contact_form_send: "今すぐメッセージを送信",
    contact_form_success: "メッセージが正常に送信されました！確認の通知を受け取りましたので、速やかにご返信いたします。",

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
    return (translations[lang] as any)?.[key] || (translations["th"] as any)?.[key] || key;
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
