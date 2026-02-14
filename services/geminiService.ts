import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert technical tutor for "EduStream Pro", a high-end tech education platform.
Your expertise includes Rust, Smart Contracts (Solidity), React, Next.js, Go, and Python.
Your goal is to help students understand complex concepts in a friendly, concise, and professional manner.
When answering, focus on code examples if relevant and keep your tone encouraging.
If a user asks about a specific course, provide context and helpful learning paths.
Always format your code blocks clearly.
`;

export const getAIResponse = async (history: ChatMessage[], message: string) => {
  try {
    // Fix: Using process.env.API_KEY directly as required by the GenAI SDK guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We use a chat-like structure for the history
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with the AI Tutor service. Please try again later.";
  }
};