'use client';

import { useState, useEffect } from 'react';
import { PlanetsResponse, Planet } from '@/lib/api';

type ApiPlanetsResponse = Partial<{
    items: Planet[];
    totalPages: number;
    meta: { totalPages?: number };
}>;

export const usePlanets = (initialPage = 1, defaultTotalPages = 10) => {
    const [page, setPage] = useState<number>(initialPage);
    const [data, setData] = useState<PlanetsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(defaultTotalPages);

    useEffect(() => {
        let cancelled = false;

        const fetchPage = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = `https://dragonball-api.com/api/planets?page=${page}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = (await res.json()) as ApiPlanetsResponse;
                if (cancelled) return;

                if (json.items && Array.isArray(json.items)) {
                    setData(json as unknown as PlanetsResponse);
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
