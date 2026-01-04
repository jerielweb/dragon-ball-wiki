import { Characters, Item } from "@/types/types.pages";

// ========== PERSONAJES ==========
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
      return null;
    }
    const data: Item = await res.json();
    return data;
  } catch (error) {
    console.error('[getCharacterById] error', error);
    return null;
  }
};

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

// ========== PLANETAS ==========
export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: null | string;
}

export interface PlanetsResponse {
  items: Planet[];
  meta?: {
    totalPages?: number;
    currentPage?: number;
  };
}

export const getPlanets = async (page = 1): Promise<PlanetsResponse> => {
  try {
    const url = `https://dragonball-api.com/api/planets?page=${page}`;
    console.log(`[getPlanets] fetching ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[getPlanets] status ${res.status}`);
      return { items: [] };
    }
    const data: PlanetsResponse = await res.json();
    console.log(`[getPlanets] got ${data.items?.length ?? 0} items from page ${page}`);
    return data;
  } catch (err) {
    console.error('[getPlanets] error', err);
    return { items: [] };
  }
};

export const getPlanetById = async (id: number): Promise<Planet | null> => {
  try {
    const url = `https://dragonball-api.com/api/planets/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    const data: Planet = await res.json();
    return data;
  } catch (error) {
    console.error('[getPlanetById] error', error);
    return null;
  }
};

export const getAllPlanets = async (): Promise<Planet[]> => {
  let first: PlanetsResponse;
  try {
    first = await getPlanets(1);
  } catch (err) {
    console.error('[getAllPlanets] failed to fetch first page', err);
    return [];
  }

  const totalPages = first.meta?.totalPages ?? 1;

  if (totalPages <= 1) {
    console.log(`[getAllPlanets] only 1 page, returning ${first.items?.length ?? 0} items`);
    return first.items ?? [];
  }

  const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

  const settled = await Promise.allSettled(
    pageNumbers.map((page) => getPlanets(page))
  );

  const pages: PlanetsResponse[] = [first];
  for (const s of settled) {
    if (s.status === 'fulfilled' && s.value) {
      pages.push(s.value as PlanetsResponse);
    }
  }

  const allItems: Planet[] = pages.flatMap((p) => p.items ?? []);
  console.log(`[getAllPlanets] total items collected: ${allItems.length}`);
  return allItems;
}

export const getPlanestsById = async (id: number): Promise<Item | null> => {
  try {
    const url = `https://dragonball-api.com/api/planets/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    const data: Item = await res.json();
    return data;
  } catch (error) {
    console.error('[getCharacterById] error', error);
    return null;
  }
};

// ========== TRANSFORMACIONES ==========
export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: null | string;
}

export const getTransformations = async (page = 1): Promise<Transformation[]> => {
  try {
    const url = `https://dragonball-api.com/api/transformations?page=${page}`;
    console.log(`[getTransformations] fetching ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[getTransformations] status ${res.status}`);
      return [];
    }
    const data: Transformation[] = await res.json();
    console.log(`[getTransformations] got ${data?.length ?? 0} items from page ${page}`);
    return data ?? [];
  } catch (err) {
    console.error('[getTransformations] error', err);
    return [];
  }
};

export const getAllTransformations = async (): Promise<Transformation[]> => {
  try {
    const data = await getTransformations(1);
    console.log(`[getAllTransformations] got ${data?.length ?? 0} total transformations`);
    return data ?? [];
  } catch (err) {
    console.error('[getAllTransformations] failed to fetch', err);
    return [];
  }
};
