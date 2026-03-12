import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productName, tags, imageBase64 } = body;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are an expert UGC video director. Given a product name, some styling tags, and optionally an image, write a HIGHLY DESCRIPTIVE, cinematic, and viral 1-paragraph prompt for an AI Video Generator (like Sora) that will create a realistic lifestyle ad. Keep it in Turkish. Make it immersive. Include lighting, camera movement, and mood. Ensure the tone matches the tags.`
      }
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentArray: any[] = [
      { type: 'text', text: `Product Name: ${productName || 'Unknown Product'}\nTags: ${tags?.join(', ') || ''}\n\nGenerate the visual prompt.` }
    ];

    if (imageBase64) {
      // imageBase64 should be something like "data:image/jpeg;base64,/9j/4AAQSk..."
      contentArray.push({
        type: 'image_url',
        // Pass the data URI directly
        image_url: { url: imageBase64, detail: 'low' }
      });
    }

    messages.push({
      role: 'user',
      content: contentArray
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or gpt-4-turbo
      messages: messages,
      max_tokens: 150,
      temperature: 0.7,
    });

    const promptText = response.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ prompt: promptText });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: error.message || 'Error generating prompt' }, { status: 500 });
  }
}
