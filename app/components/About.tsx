"use client";

import { Award, BookOpen, Heart, Languages, Sparkles, GraduationCap, CheckCircle2, Zap, Users, Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

// Brand Icons
const GithubIcon = ({ size = 16, className = "" }) => (
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

const FacebookIcon = ({ size = 16, className = "" }) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function About() {
  const { t, lang } = useLanguage();
  const [profileData, setProfileData] = useState<{
    name: string;
    title: string;
    bio: string;
    university: string;
    faculty: string;
    gpa: number;
    profileImage: string;
    interests: string[];
  }>({
    name: "ศิริมงคล มนุบุตร",
    title: "Front-end & Mobile Developer",
    bio: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ที่มุ่งมั่นในการพัฒนา Web Application และ Mobile Application มีประสบการณ์พัฒนาจริงด้วย Next.js, Flutter, Tailwind CSS, และ MongoDB/MySQL รวมถึงการออกแบบ UI/UX ผ่าน Figma และการประยุกต์ใช้ AI ในโปรเจกต์จริง พร้อมเปิดรับความรู้และความท้าทายใหม่ ๆ เพื่อร่วมสร้างสรรค์ซอฟต์แวร์คุณภาพ",
    university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
    faculty: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
    gpa: 3.05,
    profileImage: "/profile.jpg",
    interests: [
      "Web Application Development",
      "Mobile App (Flutter)",
      "AI & Machine Learning",
      "UI/UX Design & Prototyping",
      "Database Architecture",
      "Cloud & IT Support",
    ],
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data && data.name) {
          setProfileData({
            name: data.name || "ศิริมงคล มนุบุตร",
            title: data.title || "Front-end & Mobile Developer",
            bio: data.bio || "",
            university: data.university || "มหาวิทยาลัยราชภัฏศรีสะเกษ",
            faculty: data.faculty || "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
            gpa: data.gpa || 3.05,
            profileImage: data.profileImage || "/profile.jpg",
            interests: Array.isArray(data.interests) && data.interests.length > 0
              ? data.interests
              : [
                  "Web Application Development",
                  "Mobile App (Flutter)",
                  "AI & Machine Learning",
                  "UI/UX Design & Prototyping",
                  "Database Architecture",
                  "Cloud & IT Support",
                ],
          });
        }
      })
      .catch(() => {});
  }, []);

  const strengths = [
    {
      title: t("strength_fast_learner"),
      icon: <Zap size={18} className="text-amber-500" />,
      bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/40",
    },
    {
      title: t("strength_responsibility"),
      icon: <ShieldCheck size={18} className="text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/40",
    },
    {
      title: t("strength_teamwork"),
      icon: <Users size={18} className="text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/40",
    },
    {
      title: t("strength_problem_solving"),
      icon: <Lightbulb size={18} className="text-purple-500" />,
      bg: "bg-purple-50 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/40",
    },
    {
      title: t("strength_growth_mindset"),
      icon: <TrendingUp size={18} className="text-cyan-500" />,
      bg: "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200/50 dark:border-cyan-800/40",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[25%] right-[-8%] w-96 h-96 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-8%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-cyan-950/40 px-3.5 py-1 rounded-full border border-blue-200/60 dark:border-cyan-800/50">
            DISCOVER MY JOURNEY
          </span>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl mt-3">
            {t("about_title")}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_var(--neon-cyan)]" />
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-lg mx-auto text-sm sm:text-base font-medium">
            {t("about_subtitle")}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait Card & Social Links */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="glass-card p-6 rounded-3xl w-full flex flex-col items-center border border-zinc-200/70 dark:border-zinc-800/80 shadow-xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-2 border-white dark:border-zinc-800 bg-zinc-900 shadow-2xl">
                  <img
                    src={profileData.profileImage || "/profile.jpg"}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/profile.jpg";
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                  {lang === "th" && profileData.name ? profileData.name : t("about_name")}
                </h3>
                <p className="text-xs font-bold text-blue-600 dark:text-cyan-400 mt-1 uppercase tracking-wider">
                  {lang === "th" && profileData.title ? profileData.title : t("about_role_title")}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Work / Internship
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-6 flex flex-col gap-2.5 w-full text-left">
                <a
                  href="https://github.com/SirimongkolMannubut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2.5">
                    <GithubIcon size={16} />
                    GitHub Profile
                  </span>
                  <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </a>

                <a
                  href="https://www.facebook.com/sirimongkol.manubut.577/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2.5">
                    <FacebookIcon size={16} />
                    Facebook Profile
                  </span>
                  <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all duration-300"
                >
                  {t("hero_resume")}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Strengths, Education & Interests */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bio Card */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5 mb-3 text-blue-600 dark:text-cyan-400 font-bold text-sm">
                <BookOpen size={18} />
                <span>{t("about_bio_title")}</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base font-normal">
                {lang === "th" && profileData.bio ? profileData.bio : t("about_bio_text")}
              </p>
            </div>

            {/* Strengths / จุดเด่น & ความพร้อมในการทำงาน (From Resume) */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5 mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <Sparkles size={18} />
                <span>{t("about_strengths_title")}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strengths.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-2xl border ${item.bg} text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-200 hover:scale-[1.01]`}
                  >
                    <div className="p-1.5 rounded-xl bg-white dark:bg-zinc-900 shadow-xs">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Language Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Education Card */}
              <div className="glass-card p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    <GraduationCap size={18} />
                    <span>{t("about_education_title")}</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    {lang === "th" && profileData.university ? profileData.university : t("about_university")}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {lang === "th" && profileData.faculty ? profileData.faculty : t("about_faculty")}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Cumulative GPA:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 dark:bg-cyan-950/40 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800/50">
                    3.05 / 4.00
                  </span>
                </div>
              </div>

              {/* Language Card */}
              <div className="glass-card p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                    <Languages size={18} />
                    <span>{t("about_language_title")}</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    English Proficiency
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {t("about_language_level_title")}: <strong className="text-zinc-800 dark:text-zinc-200">{t("about_language_level")}</strong>
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                    สามารถสื่อสาร อ่านเอกสารทางเทคนิค และเข้าใจการเขียน Code / API Documentation ได้เป็นอย่างดี
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Reading & Technical Docs:</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Proficient</span>
                </div>
              </div>
            </div>

            {/* Technical Interests Tag Cloud */}
            <div className="glass-card p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5 mb-3.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Heart size={18} />
                <span>{t("about_interests_title")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-cyan-400 transition-colors"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
