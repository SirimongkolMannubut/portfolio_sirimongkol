import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Project } from "@/app/lib/models/Project";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
