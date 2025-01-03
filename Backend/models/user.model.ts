import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, exclude: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
