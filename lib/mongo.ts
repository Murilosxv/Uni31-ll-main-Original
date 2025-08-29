import mongoose from "mongoose";

const MONGODB_URI =
"mongodb+srv://teste:teste@cluster0.sxmal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB conectado ✅");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
  }
}
