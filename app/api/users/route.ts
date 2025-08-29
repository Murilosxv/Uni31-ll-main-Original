// app/api/user/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// =================== CRIAR NOVO USUÁRIO ===================
export async function POST(request: Request) {
  try {
    const { email, senha, name, idade, level } = await request.json();
    await connectDB();

    // Verificar se já existe
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 409 }
      );
    }

    const newUser = await User.create({ email, senha, name, idade, level });

    // (Opcional) Enviar e-mail de confirmação futuramente:
    // await resend.emails.send({ ... });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário", details: error.message },
      { status: 400 }
    );
  }
}

// =================== LISTAR USUÁRIOS ===================
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários", details: error.message },
      { status: 500 }
    );
  }
}
