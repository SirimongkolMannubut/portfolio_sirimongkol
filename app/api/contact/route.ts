import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Contact } from "@/app/lib/models/Contact";

export async function GET() {
  try {
    await connectToDatabase();
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
