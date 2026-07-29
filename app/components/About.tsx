"use client";

import { Award, BookOpen, Heart, Languages, Camera, Trash2, MessageCircle, Mail } from "lucide-react";
import { useState, useEffect } from "react";

// Custom SVG Icons for Brands
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

import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "ศิริมงคล มนุบุตร",
    title: "Computer Science Student · Developer",
    bio: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ที่มุ่งมั่นในการพัฒนา Web Application และเทคโนโลยี AI มีประสบการณ์ในการพัฒนาระบบ Full-Stack ทั้งฝั่ง Front-end และ Back-end รวมถึงการออกแบบฐานข้อมูลและการประยุกต์ใช้ AI ในงานจริง พร้อมเปิดรับความรู้และความท้าทายใหม่ ๆ เพื่อพัฒนาศักยภาพในการเป็น Software Developer ในอนาคต",
    university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
    faculty: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
    gpa: 3.05,
    profileImage: "",
  });

  useEffect(() => {
    const apiUrl = "/api";
    fetch(`${apiUrl}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data && data.name) {
          setProfileData({
            name: data.name || "ศิริมงคล มนุบุตร",
            title: data.title || "Computer Science Student · Developer",
            bio: data.bio || "",
            university: data.university || "มหาวิทยาลัยราชภัฏศรีสะเกษ",
            faculty: data.faculty || "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
            gpa: data.gpa || 3.05,
            profileImage: data.profileImage || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const interests = [
    "AI",
    "Web Development",
    "UI/UX Design",
    "Mobile App Development",
    "Graphic Design",
    "IT Support",
  ];

  return (
    <section id="about" className="py-20 relative bg-zinc-550/5 dark:bg-zinc-950/20 overflow-hidden">
      {/* Background element */}
      <div className="absolute top-[30%] right-[-10%] w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("about_title")}
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--neon-cyan)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Profile Photo / Avatar (Read-Only from Backend API) */}
          <div className="flex flex-col items-center">
            <div
              className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 bg-gradient-to-tr from-blue-500 via-indigo-650 to-cyan-500 dark:from-cyan-500 dark:via-indigo-600 dark:to-violet-500 flex items-center justify-center"
            >
              {profileData.profileImage && !imgError ? (
                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="text-center text-white p-6">
                  <div className="text-5xl font-black mb-2 tracking-wide">SM</div>
                  <div className="text-xs opacity-75">{profileData.name}</div>
                </div>
              )}
            </div>
            
            <div className="mt-5 text-center flex flex-col items-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{t("about_name")}</h3>
              <p className="text-sm font-medium text-zinc-400 dark:text-cyan-400 mt-1 uppercase tracking-wider">{t("about_role_title")}</p>
              
              {/* Quick social links under the title */}
              <div className="mt-5 flex flex-col gap-2.5 w-full max-w-[240px] text-left">
                {/* GitHub */}
                <a
                  href="https://github.com/SirimongkolMannubut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/30 dark:border-zinc-800/50 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-300"
                >
                  <GithubIcon size={16} className="text-zinc-800 dark:text-zinc-200" />
                  <span className="truncate">GitHub Profile</span>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/sirimongkol.manubut.577/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/30 dark:border-zinc-800/50 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-300"
                >
                  <FacebookIcon size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="truncate">Facebook Profile</span>
                </a>
                {/* Line */}
                <a
                  href="https://line.me/ti/p/~6807ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/30 dark:border-zinc-800/50 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-300"
                >
                  <MessageCircle size={16} className="text-green-600 dark:text-green-400" />
                  <span className="truncate">Line ID: 6807ac.th</span>
                </a>
                {/* Email */}
                <a
                  href="mailto:topt75870@gmail.com"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/30 dark:border-zinc-800/50 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-300"
                >
                  <Mail size={16} className="text-red-500 dark:text-red-400" />
                  <span className="truncate">topt75870@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Details & Biography */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-blue-650 dark:bg-cyan-500 rounded-full" />
                {t("about_bio_title")}
              </h4>
              <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed text-sm sm:text-base font-medium">
                {profileData.bio || t("about_bio_text")}
              </p>
            </div>

            {/* Grid of Education, Languages, Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Education Card */}
              <div className="glass-card p-6 rounded-3xl flex gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-cyan-955/20 text-blue-600 dark:text-cyan-400 h-fit border border-blue-100 dark:border-cyan-900/30">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{t("about_education_title")}</h4>
                  <p className="text-sm font-bold text-zinc-850 dark:text-zinc-200">
                    {t("about_university")}
                  </p>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 leading-relaxed">
                    {t("about_faculty")}
                  </p>
                  <div className="inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-750 dark:text-zinc-300">
                    {t("about_gpa")}
                  </div>
                </div>
              </div>

              {/* Language & Interests Card */}
              <div className="glass-card p-6 rounded-3xl flex gap-4">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400 h-fit border border-indigo-100 dark:border-indigo-900/30">
                  <Languages size={22} />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{t("about_language_title")}</h4>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t("about_language_level_title")}</span>
                    <span className="font-bold text-zinc-850 dark:text-zinc-200 text-xs">{t("about_language_level")}</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80">
                    <div className="bg-gradient-to-r from-blue-650 to-indigo-600 dark:from-cyan-500 dark:to-indigo-500 h-full rounded-full w-[65%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Tag Cloud */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                <Heart size={20} className="text-rose-500" />
                <h4 className="font-bold">{t("about_interests_title")}</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-350 border border-zinc-200/40 dark:border-zinc-800/60 hover:border-blue-300 dark:hover:border-cyan-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300"
                  >
                    {interest}
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
