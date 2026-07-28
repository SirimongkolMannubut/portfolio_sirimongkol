"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MessageCircle, Copy, Check, Send } from "lucide-react";

// Custom SVG Icons for Brands
const GithubIcon = ({ size = 20, className = "" }) => (
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

const FigmaIcon = ({ size = 20, className = "" }) => (
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

const FacebookIcon = ({ size = 20, className = "" }) => (
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

const DEFAULT_CONTACT = [
  {
    label: "เบอร์โทรศัพท์",
    value: "065-590-3845",
    href: "tel:0655903845",
    icon: <Phone size={20} />,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-955/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30",
  },
  {
    label: "อีเมล",
    value: "topt75870@gmail.com",
    href: "mailto:topt75870@gmail.com",
    icon: <Mail size={20} />,
    color: "bg-blue-50 text-blue-600 dark:bg-cyan-955/20 dark:text-cyan-400 border border-blue-105 dark:border-cyan-900/30",
  },
  {
    label: "Line ID",
    value: "6807ac.th",
    href: "https://line.me/ti/p/~6807ac.th",
    icon: <MessageCircle size={20} />,
    color: "bg-green-50 text-green-600 dark:bg-green-955/20 dark:text-green-400 border border-green-100 dark:border-green-900/30",
  },
];

export default function Contact() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    const apiUrl = "/api";
    fetch(`${apiUrl}/contact`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data && (data.phone || data.email)) {
          setContactInfo([
            {
              label: "เบอร์โทรศัพท์",
              value: data.phone || "065-590-3845",
              href: `tel:${(data.phone || "0655903845").replace(/[^0-9]/g, "")}`,
              icon: <Phone size={20} />,
              color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-955/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30",
            },
            {
              label: "อีเมล",
              value: data.email || "topt75870@gmail.com",
              href: `mailto:${data.email || "topt75870@gmail.com"}`,
              icon: <Mail size={20} />,
              color: "bg-blue-50 text-blue-600 dark:bg-cyan-955/20 dark:text-cyan-400 border border-blue-105 dark:border-cyan-900/30",
            },
            {
              label: "Line ID",
              value: data.lineId || "6807ac.th",
              href: `https://line.me/ti/p/~${data.lineId || "6807ac.th"}`,
              icon: <MessageCircle size={20} />,
              color: "bg-green-50 text-green-600 dark:bg-green-955/20 dark:text-green-400 border border-green-100 dark:border-green-900/30",
            },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // TIP: หากต้องการให้ฟอร์มนี้ส่งข้อความจริงไปยังอีเมลของคุณเมื่อเปิดตัวเว็บ
    // คุณสามารถสมัครบริการฟรีของ Formspree (formspree.io) หรือ Web3Forms (web3forms.com)
    // จากนั้นนำ URL ที่ได้มาทำการ fetch POST ที่นี่
    // ตัวอย่างเช่น:
    // fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   body: new FormData(e.target as HTMLFormElement),
    //   headers: { 'Accept': 'application/json' }
    // })
    
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 relative bg-zinc-550/5 dark:bg-zinc-950/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-[-10%] left-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            ติดต่อฉัน (Contact)
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--neon-cyan)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              ช่องทางการติดต่อ
            </h3>
            <p className="text-sm text-zinc-550 dark:text-zinc-400 mb-6 leading-relaxed font-medium">
              หากต้องการติดต่อสอบถาม ร่วมงาน หรือสัมภาษณ์ฝึกงาน 
              สามารถติดต่อผมผ่านช่องทางเหล่านี้ หรือกรอกฟอร์มเพื่อส่งข้อความได้โดยตรงครับ
            </p>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="glass-card p-4.5 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                        {info.label}
                      </span>
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 hover:text-blue-650 dark:hover:text-cyan-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(info.value)}
                    className="p-2.5 rounded-xl text-zinc-450 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    title="คัดลอกข้อมูล"
                  >
                    {copiedText === info.value ? (
                      <Check size={16} className="text-green-550" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Links/Social cards */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="https://github.com/SirimongkolMannubut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-205 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-cyan-800 transition-all cursor-pointer"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href="https://www.facebook.com/sirimongkol.manubut.577/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-cyan-800 transition-all cursor-pointer"
              >
                <FacebookIcon size={16} className="text-blue-600 dark:text-blue-400" />
                Facebook
              </a>
              <a
                href="https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-cyan-800 transition-all cursor-pointer"
              >
                <FigmaIcon size={16} />
                Figma
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 glass-card p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
              ส่งข้อความถึงผม
            </h3>

            {formSubmitted ? (
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-6 rounded-2xl text-center">
                <h4 className="font-bold text-lg mb-1">ส่งข้อความสำเร็จ!</h4>
                <p className="text-sm">ขอบคุณสำหรับข้อความครับ ผมจะติดต่อกลับโดยเร็วที่สุด</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2"
                    >
                      ชื่อของคุณ
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="สมชาย ใจดี"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2"
                    >
                      อีเมลติดต่อ
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="somchai@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2"
                  >
                    ข้อความ
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="เขียนข้อความของคุณที่นี่..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:border-transparent text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-555 text-white font-semibold shadow-md shadow-blue-200 dark:shadow-none transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <Send size={16} />
                  ส่งข้อความ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
