import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  name: { type: String, required: true },
  idade: { type: Number, required: true },
  level: {
    type: String,
    enum: ["fundamental", "medio", "professor"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
