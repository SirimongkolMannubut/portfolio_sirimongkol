import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Profile } from "@/app/lib/models/Profile";

export async function GET() {
  try {
    await connectToDatabase();
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: "ศิริมงคล มนุบุตร",
        title: "Front-end Developer & AI Enthusiast",
        bio: "นักศึกษาสาขาวิทยาการคอมพิวเตอร์ที่มุ่งมั่นในการพัฒนา Web Application และเทคโนโลยี AI มีประสบการณ์ในการพัฒนาระบบ Full-Stack ทั้งฝั่ง Front-end และ Back-end รวมถึงการออกแบบฐานข้อมูลและการประยุกต์ใช้ AI ในงานจริง พร้อมเปิดรับความรู้และความท้าทายใหม่ ๆ เพื่อพัฒนาศักยภาพในการเป็น Software Developer ในอนาคต",
        profileImage: "",
        gpa: 3.05,
        university: "มหาวิทยาลัยราชภัฏศรีสะเกษ",
        faculty: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
        interests: [
          "Web Application Development",
          "AI & Machine Learning",
          "UI/UX Design",
          "Database Architecture",
        ],
      });
    }
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const profile = await Profile.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
