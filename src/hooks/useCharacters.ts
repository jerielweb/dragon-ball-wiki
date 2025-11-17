'use client';

import { useState, useEffect } from 'react';
import { Characters } from '@/types/types.pages';

type ApiCharactersResponse = Partial<{
    items: Characters['items'];
    totalPages: number;
    meta: { totalPages?: number };
}>;
export const useCharacters = (initialPage = 1, defaultTotalPages = 58) => {
    const [page, setPage] = useState<number>(initialPage);
    const [data, setData] = useState<Characters | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(defaultTotalPages);

    useEffect(() => {
        let cancelled = false;

        const fetchPage = async () => {
            setLoading(true);
            setError(null);
                    try {
                        const url = `https://dragonball-api.com/api/characters?page=${page}`;
                        const res = await fetch(url);
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        const json = (await res.json()) as ApiCharactersResponse;
                        if (cancelled) return;

                        if (json.items && Array.isArray(json.items)) {
                            setData(json as unknown as Characters);
                        }

                        const maybeTotal = json.totalPages ?? json.meta?.totalPages;
                        if (typeof maybeTotal === 'number') setTotalPages(maybeTotal);
            } catch (err: unknown) {

                        if (!cancelled) {
                            if (err instanceof Error) setError(err.message);
                            else setError(String(err));
                        }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchPage();
        return () => {
            cancelled = true;
        };
    }, [page]);

    const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setPage((p) => Math.max(p - 1, 1));
    const goToPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

    return { data, loading, error, page, totalPages, nextPage, prevPage, goToPage, setPage } as const;
};
