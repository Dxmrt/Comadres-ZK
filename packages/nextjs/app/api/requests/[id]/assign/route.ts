import { NextResponse } from 'next/server';
import { assignRequestById } from '../../../_db';

export async function POST(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json().catch(() => ({}));
  const comadre = body?.comadre ? String(body.comadre) : 'you';
  const updated = assignRequestById(id, comadre);
  if (!updated) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(updated);
}