"use client"
interface SearchResult {
  type: "character" | "planet" | "transformation";
  id: number;
  name: string;
  characterName?: string;
  characterImage?: string;
  characterId?: number;
  transformationId?: number;
  transformationName?: string;
  transformationKi?: string;
}

type EnrichedTransformResult = {
  characterId: number;
  characterName: string;
  characterImage?: string;
  transformation: { id: number; name: string; image?: string; ki?: string };
};

type PlainTransform = { id: number; name: string; image?: string; ki?: string };

function isEnrichedTransform(obj: unknown): obj is EnrichedTransformResult {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "characterId" in obj &&
    "transformation" in obj
  );
}

function isPlainTransform(obj: unknown): obj is PlainTransform {
  const rec = obj as Record<string, unknown>;
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    typeof rec.id === "number" &&
    typeof rec.name === "string"
  );
}
import { Item, PlanetsItem, Transformation } from "@/types/types.pages";
import Link from "next/link";
import { useEffect, useState, useRef, useTransition } from "react";
import { MANAGE_SEARCH, LOADING_ICON } from "@/components";

interface SearchResult {
  type: "character" | "planet" | "transformation";
  id: number;
  name: string;
}

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (search.trim() === "") {
      controllerRef.current?.abort();
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const t = setTimeout(() => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);

      (async () => {
        try {
          const q = encodeURIComponent(search);

          // Search in all three endpoints in parallel
          const [charsRes, planetsRes, transformationsRes] = await Promise.all([
            fetch(`/api/search?q=${q}`, { signal: controller.signal }),
            fetch(`/api/search/planets?q=${q}`, { signal: controller.signal }),
            fetch(`/api/search/transformations?q=${q}`, {
              signal: controller.signal,
            }),
          ]);

          const chars = charsRes.ok ? await charsRes.json() : { items: [] };
          const planets = planetsRes.ok
            ? await planetsRes.json()
            : { items: [] };
          const transformations = transformationsRes.ok
            ? await transformationsRes.json()
            : { items: [] };

          const results: SearchResult[] = [
            ...(chars.items ?? []).map((item: Item) => ({
              type: "character" as const,
              id: item.id,
              name: item.name,
            })),
            ...(planets.items ?? []).map((item: PlanetsItem) => ({
              type: "planet" as const,
              id: item.id,
              name: item.name,
            })),
            ...(transformations.items ?? []).map((item: Transformation) => ({
              type: "transformation" as const,
              id: item.id,
              name: item.name,
            })),
          ];

          startTransition(() => {
            setSearchResults(results);
          });
        } catch (err) {
          const e = err as unknown as { name?: string } | undefined;
          if (e?.name === "AbortError") return;
          console.error("[SearchBar] search error", err);
          startTransition(() => {
            setSearchResults([]);
          });
        } finally {
          setIsLoading(false);
        }
      })();
    }, 300);

    return () => {
      clearTimeout(t);
      controllerRef.current?.abort();
    };
  }, [search, startTransition]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === "") {
      setSearchResults([]);
    }
  };

  const loading = isLoading || isPending;

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case "character":
        return `/characters/${result.id}`;
      case "planet":
        return `/planets/${result.id}`;
      case "transformation":
        return `/transformations/${result.id}`;
    }
  };

  const getResultLabel = (result: SearchResult) => {
    switch (result.type) {
      case "character":
        return "👤 Personaje";
      case "planet":
        return "🌍 Planeta";
      case "transformation":
        return "⚡ Transformación";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="flex relative flex-col gap-2 m-4 size-full items-center justify-center"
    >
      <div className="flex gap-2 relative size-full">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar (ej: Vegeta, Tierra, Kaio-ken)"
          className="relative bg-gray-200 border text-xl px-4 rounded-xl w-full h-15 text-black outline-none border-orange-400 font-semibold z-11"
        />
        <span className="absolute flex items-center justify-center right-2.5 top-2.5 z-11 text-white bg-transparent rounded-xl font-semibold text-xl aspect-square size-10 object-cover">
          {loading ? (
            <LOADING_ICON PendingDots={false} PendingCircle={true} />
          ) : (
            <MANAGE_SEARCH />
          )}
        </span>
      </div>
      {search.trim() !== "" && !loading && (
        <div
          id="search"
          className="absolute bg-gray-200 rounded-xl p-2 overflow-auto z-10 mt-17 w-full flex flex-col gap-2 top-0 max-h-85 search"
        >
          {searchResults.length === 0 ? (
            <div className="w-full flex items-center justify-center p-4">
              <p className="text-black text-lg font-semibold">
                No se encontraron resultados
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1">
              {searchResults.map((result) => (
                <li key={`${result.type}-${result.id}`}>
                  <Link href={getResultLink(result)}>
                    <div className="text-black text-base hover:bg-orange-400 active:bg-orange-400 rounded-xl p-2 pl-3 cursor-pointer transition">
                      <p className="font-semibold text-lg">{result.name}</p>
                      <p className="text-xs opacity-75">
                        {getResultLabel(result)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
