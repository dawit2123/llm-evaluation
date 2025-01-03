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
const analyseResponse = async (
  prompt: string,
  response: string
): Promise<any> => {
  let promptedText = `Gemini, Imagine you're an AI analytics model. Given the prompt of ${prompt} and response of ${response}. I want you to analsyse them and return the accuracy, relevancy, coherence, completion scores like in the format [accuracy, relevancy, coherence, completion]. I just want a list [accuracy, relevancy, coherence, completion] and nothing else text or other.`;
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Groq API key is not configured");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      Accept: "application/json",
    };
    const data = {
      model: "llama-3.1-70b-versatile",
      messages: [{ role: "user", content: promptedText }],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const response = await axios.post(url, data, { headers });

    if (response.status !== 200) {
      const errorData = response.data;
      throw new Error(
        `Groq API error: ${response.status} - ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const responseData = response.data;
    if (!responseData.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from Groq API");
    }

    return responseData.choices[0].message.content;
  } catch (error) {
    console.error("Error sending request to Groq API:", error);
    throw error;
  }
};

const sendGroqLlamaRequest = async (
  prompt: string,
  model: string
): Promise<any> => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Groq API key is not configured");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      Accept: "application/json",
    };
    const data = {
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const response = await axios.post(url, data, { headers });

    if (response.status !== 200) {
      const errorData = response.data;
      throw new Error(
        `Groq API error: ${response.status} - ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const responseData = response.data;
    if (!responseData.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from Groq API");
    }

    return responseData.choices[0].message.content;
  } catch (error) {
    console.error("Error sending request to Groq API:", error);
    throw error;
  }
};

export const submitPrompt = async (req: any, res: any) => {
  const user_id = req.user.id;
  const { prompt } = req.body;

  try {
    let llamaResponse = await sendGroqLlamaRequest(
      prompt,
      "llama-3.1-70b-versatile"
    );
    console.log(
      "Groq Analysed Result",
      await analyseResponse(prompt, llamaResponse)
    );

    let mixtralResponse = await sendGroqLlamaRequest(
      prompt,
      "mixtral-8x7b-32768"
    );
    console.log(
      "Mixtral Analysed Result",
      await analyseResponse(prompt, mixtralResponse)
    );
    //const newPrompt = new Prompt({ user_id, prompt, response });
    //await newPrompt.save();

    //   res.status(201)
    //   .json({ message: "Prompt submitted successfully", prompt: newPrompt });
  } catch (error) {
    console.error("Error saving prompt:", error);
    res.status(500).json({ error: "Error saving prompt" });
  }
};
