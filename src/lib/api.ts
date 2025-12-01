import { Characters, Item, Transformations } from "@/types/types.pages";
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
                const text = await res.text();
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
    const first = await getCharacters(1);
    const totalPages = first.meta?.totalPages ?? 1;

    if (totalPages <= 1) return first.items;

    const pages = await Promise.all(
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => getCharacters(page))
    );

    const allItems: Item[] = pages.flatMap((p) => p.items ?? []);
    return allItems;
};
