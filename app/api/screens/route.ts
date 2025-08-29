import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Screen from "@/models/Screen";

export async function GET(req: Request) {
  await connectDB();

  const role = req.headers.get("x-user-role"); // role enviado pelo frontend ou auth
  if (!role) return NextResponse.json({ error: "Role não informado" }, { status: 400 });

  const screens = await Screen.find({ rolesAllowed: role });
  return NextResponse.json(screens);
}
