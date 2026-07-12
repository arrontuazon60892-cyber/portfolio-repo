import { getSystemPrompt } from "../../../src/lib/arronChat";

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent`;

export const runtime = "nodejs";

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.text === "string" &&
        message.text.trim()
    )
    .slice(-12)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.text.trim() }],
    }));
}

function extractText(data) {
  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim() || ""
  );
}

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "Missing AI configuration on the server. Add GEMINI_API_KEY in your deployment environment variables.",
      },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const history = sanitizeMessages(payload?.messages);
  if (!history.length) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: getSystemPrompt() }],
        },
        contents: history,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 700,
        },
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error:
            data?.error?.message ||
            "The AI service could not complete the request right now.",
        },
        { status: response.status }
      );
    }

    const text = extractText(data);
    if (!text) {
      return Response.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ text });
  } catch {
    return Response.json(
      { error: "The chatbot could not reach the AI service. Please try again." },
      { status: 500 }
    );
  }
}
