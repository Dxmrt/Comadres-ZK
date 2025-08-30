import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
export async function POST() {
  const commitment = '0x' + randomBytes(32).toString('hex');
  return NextResponse.json({ commitment });
}