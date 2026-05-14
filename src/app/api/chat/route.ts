import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const GROQ_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];

function isGroqModel(model: string) {
  return GROQ_MODELS.includes(model);
}

async function callGemini(contents: unknown[], model: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('Server missing GEMINI_API_KEY');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 700 },
    }),
  });

  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(json?.error?.message || `Gemini error (${resp.status})`);

  const parts = json?.candidates?.[0]?.content?.parts;
  const answer = Array.isArray(parts) ? parts.map((p: { text?: string }) => p?.text || '').join('').trim() : '';
  if (!answer) throw new Error('Empty response from Gemini');
  return answer;
}

async function callGroq(contents: unknown[], model: string): Promise<string> {
  if (!GROQ_API_KEY) throw new Error('Server missing GROQ_API_KEY');

  // Convert Gemini-style contents sang OpenAI messages
  const messages = (contents as Array<{ role: string; parts: Array<{ text: string }> }>).map((c) => ({
    role: c.role === 'model' ? 'assistant' : 'user',
    content: c.parts.map((p) => p.text).join(''),
  }));

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 700 }),
  });

  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(json?.error?.message || `Groq error (${resp.status})`);

  const answer = json?.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('Empty response from Groq');
  return answer;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contents, model } = body;

    if (!contents || !Array.isArray(contents)) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    const activeModel: string = model || 'gemini-3-flash-preview';

    const answer = isGroqModel(activeModel)
      ? await callGroq(contents, activeModel)
      : await callGemini(contents, activeModel);

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Chat API Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}