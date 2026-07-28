import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Activity } from "@/app/lib/models/Activity";

export async function GET() {
  try {
    await connectToDatabase();
    const activities = await Activity.find().sort({ order: 1 });
    return NextResponse.json(activities);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const activity = await Activity.create(body);
    return NextResponse.json(activity, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
