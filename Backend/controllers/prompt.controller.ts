// controllers/prompt.controller.ts
import axios from "axios";

import { Prompt } from "../models/prompt.model";

const sendGeminiAPIRequest = async (prompt: string): Promise<any> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error sending request to Gemini API:", error);
    throw error;
  }
};

export const submitPrompt = async (req: any, res: any) => {
  const user_id = req.user.id;
  const { prompt, response } = req.body;

  try {
    console.log("new generated prompt", await sendGeminiAPIRequest(prompt));
    //const newPrompt = new Prompt({ user_id, prompt, response });
    //await newPrompt.save();

    // res
    //   .status(201)
    //   .json({ message: "Prompt submitted successfully", prompt: newPrompt });
  } catch (error) {
    console.error("Error saving prompt:", error);
    res.status(500).json({ error: "Error saving prompt" });
  }
};
