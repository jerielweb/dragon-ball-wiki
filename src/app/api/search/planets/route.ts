import { NextResponse } from 'next/server';
import { getAllPlanets } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() ?? '';

    console.log(`[api/search/planets] query: "${q}"`);

    if (!q) {
      return NextResponse.json({ items: [] });
    }

    const items = await getAllPlanets();
    console.log(`[api/search/planets] got ${items.length} total planets`);

    const qLower = q.toLowerCase();
    const results = items.filter((item) => item.name.toLowerCase().includes(qLower));
    console.log(`[api/search/planets] filtered to ${results.length} results`);

    const limited = results.slice(0, 50);

    return NextResponse.json({ items: limited });
  } catch (error) {
    console.error('[api/search/planets] error', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
