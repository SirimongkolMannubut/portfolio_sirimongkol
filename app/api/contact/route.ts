import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Contact } from "@/app/lib/models/Contact";
import { Message } from "@/app/lib/models/Message";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === "messages") {
      const messages = await Message.find().sort({ createdAt: -1 });
      return NextResponse.json(messages);
    }

    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({
        phone: "065-590-3845",
        email: "topt75870@gmail.com",
        lineId: "6807ac.th",
        github: "https://github.com/SirimongkolMannubut",
        facebook: "https://www.facebook.com/sirimongkol.manubut.577/",
        figmaUrl: "https://www.figma.com/design/n7MeR6y12E3TSJlikgy8FG/GREEN_POINT_FOR_EVER?node-id=1100-1367&t=DjY83an2h8plSZme-0",
      });
    }
    return NextResponse.json(contact);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    // 1. Save message to MongoDB Atlas database
    const savedMsg = await Message.create({ name, email, message });

    // 2. Forward email notification to topt75870@gmail.com via FormSubmit
    try {
      await fetch("https://formsubmit.co/ajax/topt75870@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `📬 มีข้อความใหม่จากเว็บ Portfolio จากคุณ ${name}`,
          _template: "table",
        }),
      });
    } catch (emailErr) {
      console.warn("⚠️ Email forwarding warning:", emailErr);
    }

    return NextResponse.json({ success: true, message: "ส่งข้อความสำเร็จแล้ว!", data: savedMsg });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const contact = await Contact.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(contact);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
