import { NextResponse } from 'next/server';
import { listRequests, createRequest } from '../_db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const owner = url.searchParams.get('owner') || undefined;
  return NextResponse.json({ items: listRequests(owner || undefined) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = String(body?.message ?? '').trim();
  const area = body?.area ? String(body.area) : undefined;
  const owner = body?.owner ? String(body.owner) : undefined;
  if (!message) return NextResponse.json({ error: 'message required' }, { status: 400 });
  const item = createRequest(message, area, owner);
  return NextResponse.json(item, { status: 201 });
}