import { NextResponse } from 'next/server';
import { getAllCharacters } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() ?? '';

    if (!q) {
      return NextResponse.json({ items: [] });
    }

    // Obtener todos los personajes (server-side)
    const items = await getAllCharacters();

    const qLower = q.toLowerCase();
    const results = items.filter((item) => item.name.toLowerCase().includes(qLower));

    // Limitar resultados para no devolver demasiado
    const limited = results.slice(0, 50);

    return NextResponse.json({ items: limited });
  } catch (error) {
    console.error('[api/search] error', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
