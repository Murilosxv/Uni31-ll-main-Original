// app/api/professor/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const professor = await User.findOne(); // pega o primeiro cadastrado
    return NextResponse.json(professor);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar professor" }, { status: 500 });
  }
}
