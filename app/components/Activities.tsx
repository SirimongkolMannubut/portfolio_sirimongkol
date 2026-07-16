"use client";

import { Calendar, Award, Briefcase } from "lucide-react";

type ActivityItem = {
  title: string;
  subtitle: string;
  date: string;
  type: "work" | "training";
  details?: string[];
  icon: React.ReactNode;
};

export default function Activities() {
  const items: ActivityItem[] = [
    {
      title: "นักศึกษาฝึกงาน - กยศ.",
      subtitle: "กองทุนเงินให้กู้ยืมเพื่อการศึกษา",
      date: "8 - 31 มิถุนายน 2569 (2026)",
      type: "work",
      icon: <Briefcase size={18} />,
      details: [
        "ตรวจสอบและจัดการเอกสารในระบบฐานข้อมูลและไฟล์เอกสารเพื่อความเป็นระเบียบ",
        "สนับสนุนทีมงานในการทดสอบและพัฒนาเว็บไซต์และระบบงานภายในขององค์กร",
        "จัดทำรายงานวิเคราะห์ข้อมูลการดำเนินงาน และนำเสนอผลงานต่อผู้บริหาร",
      ],
    },
    {
      title: "การพัฒนาเว็บไซต์ด้วย HTML, CSS และ JavaScript",
      subtitle: "Google Developer Groups (GDG)",
      date: "อบรมเชิงปฏิบัติการ",
      type: "training",
      icon: <Award size={18} />,
      details: [
        "ศึกษาและปฏิบัติจริงเกี่ยวกับการพัฒนาเว็บเบื้องต้นด้วย HTML5, CSS3 และ JavaScript",
        "ทำความเข้าใจเกี่ยวกับการออกแบบ Responsive Web Design และ Responsive Layouts",
        "เข้าร่วมกิจกรรม Networking และเรียนรู้ทักษะที่จำเป็นกับเหล่านักพัฒนาจาก GDG",
      ],
    },
  ];

  return (
    <section id="activities" className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[50%] right-[10%] w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            กิจกรรมและประสบการณ์ (Activities)
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--neon-cyan)]" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-zinc-200/50 dark:border-zinc-800/80 ml-4 sm:ml-6 space-y-12">
          {items.map((item, index) => (
            <div key={index} className="relative pl-8 sm:pl-10">
              {/* Glowing node node */}
              <span className="absolute -left-[19px] top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border-2 border-blue-600 dark:border-cyan-500 text-blue-600 dark:text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)] z-10">
                {item.icon}
              </span>

              <div className="glass-card p-6 rounded-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50/50 text-blue-600 border border-blue-100/50 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/40 w-fit h-fit">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                </div>

                {item.details && (
                  <ul className="space-y-2.5">
                    {item.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed list-none relative pl-4 font-medium"
                      >
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-600 dark:bg-cyan-400 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
