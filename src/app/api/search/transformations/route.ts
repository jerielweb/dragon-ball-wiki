import { NextResponse } from "next/server";
import { getAllTransformations } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (!q) return NextResponse.json({ items: [] });

    const all = await getAllTransformations();
    const qLower = q.toLowerCase();

    const items = (all ?? []).filter((t) =>
      typeof t.name === "string" ? t.name.toLowerCase().includes(qLower) : false
    );

    return NextResponse.json({ items });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/search/transformations] error", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}