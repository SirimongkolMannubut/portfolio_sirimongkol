import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Admin } from "@/app/lib/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { username, password } = await request.json();

    // Find admin or create default admin (username: admin, pass: 1234) if none exists
    let admin = await Admin.findOne({ username });
    if (!admin && username === "admin") {
      const hashed = await bcrypt.hash("1234", 10);
      admin = await Admin.create({ username: "admin", password: hashed });
    }

    if (!admin) {
      return NextResponse.json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "sirimongkol_portfolio_secret_key_2025";
    const token = jwt.sign({ id: admin._id, username: admin.username }, secret, { expiresIn: "7d" });

    return NextResponse.json({ token, username: admin.username });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
