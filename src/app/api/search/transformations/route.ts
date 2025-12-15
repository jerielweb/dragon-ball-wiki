import { NextResponse } from 'next/server';
import { getAllTransformations } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() ?? '';

    console.log(`[api/search/transformations] query: "${q}"`);

    if (!q) {
      return NextResponse.json({ items: [] });
    }

    const items = await getAllTransformations();
    console.log(`[api/search/transformations] got ${items.length} total transformations`);

    const qLower = q.toLowerCase();
    const results = items.filter((item) => item.name.toLowerCase().includes(qLower));
    console.log(`[api/search/transformations] filtered to ${results.length} results`);

    const limited = results.slice(0, 50);

    return NextResponse.json({ items: limited });
  } catch (error) {
    console.error('[api/search/transformations] error', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}