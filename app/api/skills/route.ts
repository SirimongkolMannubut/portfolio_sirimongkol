import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Skill } from "@/app/lib/models/Skill";

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
