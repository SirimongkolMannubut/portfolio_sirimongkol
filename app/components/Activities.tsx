"use client";

import { useState, useEffect } from "react";
import { Calendar, Award, Briefcase, CheckCircle2, ChevronRight, Building2, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type ActivityItem = {
  title: string;
  subtitle: string;
  date: string;
  type: "internship" | "training";
  organization: string;
  details: string[];
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
};

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    title: "นักศึกษาฝึกงาน (Software & System Intern)",
    subtitle: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)",
    organization: "Student Loan Fund (กยศ.)",
    date: "8 - 31 มิถุนายน 2569 (2026)",
    type: "internship",
    badge: "Enterprise Internship",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/40",
    icon: <Briefcase size={20} />,
    details: [
      "ตรวจสอบและจัดการโครงสร้างเอกสารในระบบฐานข้อมูลและไฟล์ดิจิทัลเพื่อความเป็นระเบียบและถูกต้องตามระเบียบ",
      "สนับสนุนทีมงานในการทดสอบระบบ (QA/Testing) และร่วมพัฒนาเว็บไซต์รวมถึงระบบงานสารสนเทศภายในขององค์กร",
      "จัดทำรายงานสรุปและวิเคราะห์ข้อมูลการดำเนินงาน (Data Analytics Report) พร้อมนำเสนอผลงานต่อคณะผู้บริหาร",
    ],
  },
  {
    title: "การพัฒนาเว็บแอปพลิเคชันด้วย Next.js, React.js และ UI/UX",
    subtitle: "Google Developer Groups (GDG)",
    organization: "Google Developer Groups",
    date: "2566 - 2567 (อบรมเชิงปฏิบัติการ)",
    type: "training",
    badge: "Professional Workshop",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
    icon: <Award size={20} />,
    details: [
      "ศึกษาและลงมือปฏิบัติจริงเกี่ยวกับการพัฒนาเว็บยุคใหม่ด้วย Next.js, React.js, HTML5 และ JavaScript (ES6+)",
      "ทำความเข้าใจเชิงลึกเกี่ยวกับการออกแบบ Responsive Web Design และการจัดการ Component Architecture",
      "เข้าร่วมกิจกรรม Networking และเรียนรู้แนวทางปฏิบัติที่ดีที่สุด (Best Practices) จากวิทยากรผู้เชี่ยวชาญ",
    ],
  },
];

export default function Activities() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<ActivityItem[]>(DEFAULT_ACTIVITIES);

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: ActivityItem[] = data.map((item: any) => ({
            title: item.title,
            subtitle: item.organization,
            organization: item.organization,
            date: item.period,
            type: item.type === "internship" || item.type === "work" ? "internship" : "training",
            badge: item.type === "internship" || item.type === "work" ? "Internship Experience" : "Training / Workshop",
            badgeColor: item.type === "internship" || item.type === "work"
              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/40"
              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
            icon: item.type === "internship" || item.type === "work" ? <Briefcase size={20} /> : <Award size={20} />,
            details: Array.isArray(item.description) ? item.description : [item.description],
          }));

          // Ensure SLF internship is present
          const hasSlf = mapped.some((m) => m.subtitle?.includes("กยศ") || m.organization?.includes("กยศ"));
          if (!hasSlf) {
            setItems([DEFAULT_ACTIVITIES[0], ...mapped]);
          } else {
            setItems(mapped);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="activities" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[40%] right-[5%] w-80 h-80 bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-cyan-950/40 px-3.5 py-1 rounded-full border border-blue-200/60 dark:border-cyan-800/50">
            PRACTICAL TRACK RECORD
          </span>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl mt-3">
            {t("activities_title")}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_var(--neon-cyan)]" />
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-lg mx-auto text-sm sm:text-base font-medium">
            {t("activities_subtitle")}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-8 space-y-12">
          {items.map((item, index) => {
            // Localized fallback
            const isFirst = index === 0;
            const displayTitle = lang !== "th" ? (isFirst ? t("act_1_title") : t("act_2_title")) : item.title;
            const displaySubtitle = lang !== "th" ? (isFirst ? t("act_1_org") : t("act_2_org")) : item.subtitle;
            const displayDate = lang !== "th" ? (isFirst ? t("act_1_period") : t("act_2_period")) : item.date;
            const displayDetails = lang !== "th"
              ? (isFirst ? [t("act_1_desc_1"), t("act_1_desc_2"), t("act_1_desc_3")] : [t("act_2_desc_1"), t("act_2_desc_2"), t("act_2_desc_3")])
              : item.details;

            return (
              <div key={index} className="relative pl-8 sm:pl-10 group">
                {/* Timeline Node */}
                <span className="absolute -left-[21px] top-1.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 border-2 border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.35)] z-10 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>

                {/* Timeline Card */}
                <div className="glass-card p-6 sm:p-7 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 shadow-md hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                        {displayTitle}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">
                        {displaySubtitle}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 w-fit h-fit whitespace-nowrap">
                      <Calendar size={13} />
                      {displayDate}
                    </span>
                  </div>

                  {displayDetails && (
                    <ul className="space-y-2.5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60">
                      {displayDetails.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed list-none flex items-start gap-2.5 font-medium"
                        >
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
