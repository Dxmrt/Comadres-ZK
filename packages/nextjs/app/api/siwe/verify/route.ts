import { NextRequest } from 'next/server';
import { SiweMessage } from 'siwe';
export async function POST(req: NextRequest) {
  const { message, signature } = await req.json();
  const siwe = new SiweMessage(message);
  const res = await siwe.verify({ signature, domain: siwe.domain });
  if (!res.success) return new Response('Invalid', { status: 401 });
  return new Response('ok');
}