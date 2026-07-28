"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // Profile Form State
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    university: "",
    faculty: "",
    gpa: 3.05,
    profileImage: "",
  });

  // Projects State
  const [projects, setProjects] = useState<any[]>([]);
  const [projModal, setProjModal] = useState(false);
  const [editingProj, setEditingProj] = useState<any>(null);
  const [projForm, setProjForm] = useState({
    title: "",
    description: "",
    techStack: "",
    imageUrl: "",
    githubUrl: "",
    figmaUrl: "",
  });

  // Skills State
  const [skills, setSkills] = useState<any[]>([]);
  const [skillModal, setSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Web",
    level: 70,
  });

  // Contact State
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    lineId: "",
    github: "",
    facebook: "",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      loadAllData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      showToast("✅ เข้าสู่ระบบสำเร็จ!");
      loadAllData();
    } catch (err: any) {
      showToast("❌ " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setIsLoggedIn(false);
  };

  const loadAllData = () => {
    fetchProfile();
    fetchProjects();
    fetchSkills();
    fetchContact();
  };

  const fetchProfile = () => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => setProfile(d))
      .catch(() => {});
  };

  const saveProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to save");
      showToast("✅ บันทึกโปรไฟล์สำเร็จ!");
    } catch (err: any) {
      showToast("❌ " + err.message);
    }
  };

  const fetchProjects = () => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...projForm,
      techStack: projForm.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      const url = editingProj ? `/api/projects/${editingProj._id}` : "/api/projects";
      const method = editingProj ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to save project");
      setProjModal(false);
      fetchProjects();
      showToast("✅ บันทึกโปรเจกต์สำเร็จ!");
    } catch (err: any) {
      showToast("❌ " + err.message);
    }
  };

  const fetchSkills = () => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => setSkills(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSkill ? `/api/skills/${editingSkill._id}` : "/api/skills";
      const method = editingSkill ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });
      if (!res.ok) throw new Error("Failed to save skill");
      setSkillModal(false);
      fetchSkills();
      showToast("✅ บันทึกทักษะสำเร็จ!");
    } catch (err: any) {
      showToast("❌ " + err.message);
    }
  };

  const fetchContact = () => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d) => setContact(d))
      .catch(() => {});
  };

  const saveContact = async () => {
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Failed to save contact");
      showToast("✅ บันทึกข้อมูลติดต่อสำเร็จ!");
    } catch (err: any) {
      showToast("❌ " + err.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
            🛡️
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Portfolio Admin CMS</h1>
          <p className="text-zinc-400 text-sm mb-6">เข้าสู่ระบบเพื่อแก้ไขรูปโปรไฟล์และข้อมูลหน้าเว็บ</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="1234"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              เข้าสู่ระบบ →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-cyan-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl font-semibold text-sm animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between min-h-screen">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ⚡ Admin CMS
            </h2>
            <p className="text-xs text-zinc-500 mt-1">ระบบจัดการและแก้ไขข้อมูล</p>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "profile" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              👤 โปรไฟล์ & รูปภาพ
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "projects" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              🗂️ โปรเจกต์ผลงาน
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "skills" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              🛠️ ทักษะ (Skills)
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                activeTab === "contact" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              📬 ข้อมูลติดต่อ
            </button>
          </nav>
        </div>
        <div className="space-y-2">
          <a
            href="/"
            target="_blank"
            className="w-full text-center block px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            🌐 ดูหน้าเว็บหลัก
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-center block px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
          >
            🚪 ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold">👤 จัดการโปรไฟล์ & รูปภาพ</h1>
              <p className="text-zinc-400 text-sm mt-1">รูปโปรไฟล์และข้อมูลส่วนตัวที่จะแสดงผลที่หน้าบ้าน</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">URL รูปภาพโปรไฟล์</label>
                <input
                  type="text"
                  value={profile.profileImage}
                  onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                  placeholder="https://imgur.com/... หรือ URL รูปภาพออนไลน์"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                {profile.profileImage && (
                  <div className="mt-3 flex items-center gap-4">
                    <img src={profile.profileImage} alt="Preview" className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500" />
                    <span className="text-xs text-cyan-400 font-semibold">✓ ตัวอย่างรูปภาพโปรไฟล์</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">ชื่อ - นามสกุล</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">ตำแหน่ง (Title)</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">ประวัติส่วนตัว (Bio)</label>
                <textarea
                  value={profile.bio}
                  rows={4}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">มหาวิทยาลัย</label>
                  <input
                    type="text"
                    value={profile.university}
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    value={profile.gpa}
                    onChange={(e) => setProfile({ ...profile, gpa: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                  />
                </div>
              </div>
              <button
                onClick={saveProfile}
                className="px-6 py-3 bg-cyan-500 text-zinc-950 font-bold rounded-xl shadow-lg hover:bg-cyan-400 transition-colors"
              >
                💾 บันทึกข้อมูลโปรไฟล์
              </button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="max-w-4xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">🗂️ จัดการโปรเจกต์ผลงาน</h1>
                <p className="text-zinc-400 text-sm mt-1">เพิ่มหรือแก้ไขโปรเจกต์ผลงาน</p>
              </div>
              <button
                onClick={() => {
                  setEditingProj(null);
                  setProjForm({ title: "", description: "", techStack: "", imageUrl: "", githubUrl: "", figmaUrl: "" });
                  setProjModal(true);
                }}
                className="px-4 py-2.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl text-sm hover:bg-cyan-400 transition-colors"
              >
                + เพิ่มโปรเจกต์
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p._id || p.title} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-2">
                  <h3 className="font-bold text-lg text-white">{p.title}</h3>
                  <p className="text-zinc-400 text-xs line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.techStack?.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-cyan-400 text-[10px] rounded-md font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold">🛠️ จัดการทักษะ (Skills)</h1>
              <p className="text-zinc-400 text-sm mt-1">ปรับแต่งระดับความเชี่ยวชาญและหมวดหมู่</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s._id || s.name} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm">{s.name}</div>
                    <div className="text-xs text-cyan-400 mt-0.5">{s.category} · {s.level}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold">📬 ข้อมูลติดต่อ</h1>
              <p className="text-zinc-400 text-sm mt-1">เบอร์โทรศัพท์ อีเมล และโซเชียลมีเดีย</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">อีเมล</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Line ID</label>
                <input
                  type="text"
                  value={contact.lineId}
                  onChange={(e) => setContact({ ...contact, lineId: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>
              <button
                onClick={saveContact}
                className="px-6 py-3 bg-cyan-500 text-zinc-950 font-bold rounded-xl shadow-lg hover:bg-cyan-400 transition-colors"
              >
                💾 บันทึกข้อมูลติดต่อ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {projModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold">เพิ่ม / แก้ไขโปรเจกต์</h3>
            <form onSubmit={saveProject} className="space-y-3">
              <input
                type="text"
                placeholder="ชื่อโปรเจกต์"
                value={projForm.title}
                onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
              <textarea
                placeholder="คำอธิบาย"
                value={projForm.description}
                onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
              <input
                type="text"
                placeholder="Tech Stack (คั่นด้วยจุลภาค เช่น Flutter, Next.js)"
                value={projForm.techStack}
                onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={projForm.githubUrl}
                onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="Figma URL (ถ้ามี)"
                value={projForm.figmaUrl}
                onChange={(e) => setProjForm({ ...projForm, figmaUrl: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setProjModal(false)} className="px-4 py-2 bg-zinc-800 rounded-xl text-sm">
                  ยกเลิก
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-zinc-950 font-bold rounded-xl text-sm">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
