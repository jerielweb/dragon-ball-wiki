import { Characters, Item } from "@/types/types.pages";
export const getCharacters = async (page = 1): Promise<Characters> => {
    const url = `https://dragonball-api.com/api/characters?page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch characters (status: ${response.status})`);
    }
    const data: Characters = await response.json();
    return data;
};

export const getCharacterById = async (id: number): Promise<Item | null> => {
    try {
        const url = `https://dragonball-api.com/api/characters/${id}`;
        const res = await fetch(url);
        if (!res.ok) {
            try {
            } catch {
            }
            return null;
        }
        const data: Item = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAllCharacters = async (): Promise<Item[]> => {
    let first: Characters;
    try {
        first = await getCharacters(1);
    } catch (err) {
        console.error('[getAllCharacters] failed to fetch first page', err);
        return [];
    }

    const totalPages = first.meta?.totalPages ?? 1;

    if (totalPages <= 1) return first.items ?? [];

    const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

    const settled = await Promise.allSettled(
        pageNumbers.map((page) => getCharacters(page))
    );

    const pages: Characters[] = [first];
    for (const s of settled) {
        if (s.status === 'fulfilled' && s.value) {
            pages.push(s.value as Characters);
        } else {
            console.warn('[getAllCharacters] page fetch failed or rejected, skipping', s);
        }
    }

    const allItems: Item[] = pages.flatMap((p) => p.items ?? []);
    return allItems;
};
