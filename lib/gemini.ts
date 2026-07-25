import "server-only";
import { GoogleGenAI, Type } from "@google/genai";

const DEFAULT_MODEL = "gemini-2.5-flash";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
}

export const WORD_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    word: {
      type: Type.STRING,
      description:
        "A single common, family-friendly word or short phrase (1-3 words) fitting the given category/theme.",
    },
    hint: {
      type: Type.STRING,
      description:
        "A vague, related word or short phrase hinting at the secret word's theme WITHOUT revealing or naming the secret word itself (e.g. secret 'Lion' -> hint 'Safari').",
    },
  },
  required: ["word"],
};

interface GeminiWordResult {
  word: string;
  hint?: string;
}

const REQUEST_TIMEOUT_MS = 8000;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Gemini request timed out")), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

/**
 * Asks Gemini to pick a word for a custom category. Throws on any failure —
 * callers decide the fallback behavior.
 */
export async function generateWordForCategory(category: string): Promise<GeminiWordResult> {
  const ai = getClient();
  if (!ai) throw new Error("GEMINI_API_KEY is not configured");

  const response = await withTimeout(
    ai.models.generateContent({
      model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
      contents: `Pick one single secret word or short phrase for a party word-guessing game, for the category/theme: "${category}". It should be a well-known, family-friendly, unambiguous word.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { word: WORD_RESPONSE_SCHEMA.properties.word },
          required: ["word"],
        },
      },
    }),
    REQUEST_TIMEOUT_MS
  );

  const parsed = JSON.parse(response.text ?? "{}");
  if (typeof parsed.word !== "string" || !parsed.word.trim()) {
    throw new Error("Gemini did not return a usable word");
  }
  return { word: parsed.word.trim() };
}

/**
 * Asks Gemini for a vague hint related to an already-known secret word/category,
 * without giving the word away. Throws on any failure — callers decide the fallback.
 */
export async function generateHintForWord(category: string, word: string): Promise<string> {
  const ai = getClient();
  if (!ai) throw new Error("GEMINI_API_KEY is not configured");

  const response = await withTimeout(
    ai.models.generateContent({
      model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
      contents: `In a party game, the category is "${category}" and the secret word is "${word}". Give one vague, related hint word or short phrase for a player who does NOT know the secret word — it should point at the general theme without naming, rhyming with, or directly giving away "${word}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { hint: WORD_RESPONSE_SCHEMA.properties.hint },
          required: ["hint"],
        },
      },
    }),
    REQUEST_TIMEOUT_MS
  );

  const parsed = JSON.parse(response.text ?? "{}");
  if (typeof parsed.hint !== "string" || !parsed.hint.trim()) {
    throw new Error("Gemini did not return a usable hint");
  }
  return parsed.hint.trim();
}
