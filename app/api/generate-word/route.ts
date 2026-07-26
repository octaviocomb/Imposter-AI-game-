import { NextResponse } from "next/server";
import { generateHintForWord, generateWordForCategory } from "@/lib/gemini";

interface GenerateWordRequest {
  category: string;
  isCustomCategory: boolean;
  word?: string;
  wantHint: boolean;
}

export async function POST(request: Request) {
  let body: GenerateWordRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body", fallbackAvailable: false }, { status: 400 });
  }

  const { category, isCustomCategory, word, wantHint } = body;

  if (typeof category !== "string" || !category.trim()) {
    return NextResponse.json({ error: "Missing category", fallbackAvailable: false }, { status: 400 });
  }

  let secretWord: string;

  if (isCustomCategory) {
    try {
      const result = await generateWordForCategory(category);
      secretWord = result.word;
    } catch {
      return NextResponse.json(
        {
          error:
            "Couldn't generate a word for that custom category. Try a built-in category instead.",
          fallbackAvailable: true,
        },
        { status: 502 }
      );
    }
  } else {
    if (typeof word !== "string" || !word.trim()) {
      return NextResponse.json({ error: "Missing word for built-in category", fallbackAvailable: false }, { status: 400 });
    }
    secretWord = word;
  }

  if (!wantHint) {
    return NextResponse.json({ word: secretWord });
  }

  try {
    const hint = await generateHintForWord(category, secretWord);
    return NextResponse.json({ word: secretWord, hint });
  } catch {
    return NextResponse.json({ word: secretWord, hintFailed: true });
  }
}
