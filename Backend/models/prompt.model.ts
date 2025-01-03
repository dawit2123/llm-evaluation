// models/Prompt.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPrompt extends Document {
  user_id: string;
  prompt: string;
  response: string;
  createdAt: Date;
}

const PromptSchema: Schema = new Schema(
  {
    user_id: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Prompt = mongoose.model<IPrompt>("Prompt", PromptSchema);
