// controllers/prompt.controller.ts
import axios from "axios";

import { Prompt } from "../models/prompt.model";
import { response } from "express";

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
    let startTime = Date.now();
    let geminiResponse = await sendGeminiAPIRequest(prompt);
    let duration = Date.now() - startTime;
    let geminiAnalysedResult = await analyseResponse(prompt, geminiResponse);
    let geminiObj = generateObj(geminiResponse, geminiAnalysedResult, duration);

    startTime = Date.now();
    let llamaResponse = await sendGroqLlamaRequest(
      prompt,
      "llama-3.1-70b-versatile"
    );
    duration = Date.now() - startTime;

    let llamaAnalysedResult = await analyseResponse(prompt, llamaResponse);
    let llamaObj = generateObj(llamaResponse, llamaAnalysedResult, duration);

    startTime = Date.now();
    let mixtralResponse = await sendGroqLlamaRequest(
      prompt,
      "mixtral-8x7b-32768"
    );
    duration = Date.now() - startTime;
    let mixtralAnalysedResult = await analyseResponse(prompt, mixtralResponse);
    let mixtralObj = generateObj(
      mixtralResponse,
      mixtralAnalysedResult,
      duration
    );
    let dataObj = {
      user_id,
      prompt,
      geminiResponse: geminiObj,
      llamaResponse: llamaObj,
      mixtralResponse: mixtralObj,
    };
    const newPrompt = new Prompt(dataObj);
    await newPrompt.save();

    res
      .status(201)
      .json({ message: "Prompt submitted successfully", data: dataObj });
  } catch (error) {
    console.error("Error saving prompt:", error);
    res.status(500).json({ error: "Error saving prompt" });
  }
};

export const reportAnalysis = async (req: any, res: any) => {};

const generateObj = (
  reponseText: string,
  analyseResponse: string,
  timeTaken: number
) => {
  const str = "[1,2,3]"; // String representation of an array

  // Step 1: Parse the string to get an array
  analyseResponse = JSON.parse(analyseResponse);
  let obj = {
    response: reponseText,
    accuracy: analyseResponse[0],
    relevancy: analyseResponse[1],
    coherence: analyseResponse[2],
    completion: analyseResponse[3],
    timeTaken: timeTaken,
  };
  return obj;
};
