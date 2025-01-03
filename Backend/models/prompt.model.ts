// models/Prompt.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPrompt extends Document {
  user_id: string;
  prompt: string;
  geminiResponse: string;
  mixtralResponse: string;
  llamaResponse: string;
  createdAt: Date;
}

const PromptSchema: Schema = new Schema(
  {
    user_id: { type: String, required: true },
    prompt: { type: String, required: true },
    geminiResponse: { type: Schema.Types.Mixed, required: true },
    mixtralResponse: { type: Schema.Types.Mixed, required: true },
    llamaResponse: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Prompt = mongoose.model<IPrompt>("Prompt", PromptSchema);
