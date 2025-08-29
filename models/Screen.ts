import mongoose, { Schema } from "mongoose";

const ScreenSchema = new Schema({
  code: { type: String, required: true, unique: true }, // ex: "UNI31"
  title: { type: String, required: true },               // ex: "Suporte"
  rolesAllowed: [{ type: String, enum: ["professor", "aluno", "suporte"], required: true }],
});

export default mongoose.models.Screen || mongoose.model("Screen", ScreenSchema);
