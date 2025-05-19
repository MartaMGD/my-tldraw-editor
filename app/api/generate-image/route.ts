import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const token = process.env.HUGGINGFACE_API_TOKEN;
  const payload = {
    model: 'black-forest-labs/flux-schnell',
    prompt,
    response_format: 'b64_json',
  };

  const response = await axios.post(
    'https://router.huggingface.co/nebius/v1/images/generations',
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const rawBase64 = response.data?.data?.[0]?.b64_json || null;
  const base64Image = rawBase64 ? `data:image/webp;base64,${rawBase64}` : null;

  return NextResponse.json({ base64Image });
}
