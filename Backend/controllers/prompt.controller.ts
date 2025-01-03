// controllers/prompt.controller.ts
import { Request, Response } from "express";
import { Prompt } from "../models/prompt.model";

export const submitPrompt = async (req: any, res: any) => {
  const user_id = req.user.id;
  const { prompt, response } = req.body;

  try {
    const newPrompt = new Prompt({ user_id, prompt, response });
    await newPrompt.save();

    res
      .status(201)
      .json({ message: "Prompt submitted successfully", prompt: newPrompt });
  } catch (error) {
    console.error("Error saving prompt:", error);
    res.status(500).json({ error: "Error saving prompt" });
  }
};
