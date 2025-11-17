"use client";

import { Item } from "@/types/types.pages";
import Link from "next/link";
import { useEffect, useState, useRef, useTransition } from "react";
import { MANAGE_SEARCH, LOADING_ICON } from "@/components";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (search.trim() === "") {
      controllerRef.current?.abort();
      setSearchResult([]);
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
          const res = await fetch(
            `/api/search?q=${encodeURIComponent(search)}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            startTransition(() => {
              setSearchResult([]);
            });
            return;
          }
          const json = await res.json();
          startTransition(() => {
            setSearchResult(json.items ?? []);
          });
        } catch (err) {
          if ((err as any)?.name === "AbortError") return;
          console.error("[SearchBar] search error", err);
          startTransition(() => {
            setSearchResult([]);
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
      setSearchResult([]);
    }
  };

  const loading = isLoading || isPending;

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
          placeholder="Buscar personaje (ej: Vegeta)"
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
          {searchResult.length === 0 ? (
            <div className="w-full flex items-center justify-center p-4">
              <p className="text-black text-lg font-semibold">
                No se encontraron resultados
              </p>
            </div>
          ) : (
            <ul>
              {searchResult.map((char) => (
                <li key={char.id}>
                  <Link href={`/characters/${char.id}`}>
                    <p className="text-black text-xl font-semibold hover:bg-orange-400 active:bg-orange-400 rounded-xl p-1 pl-2">
                      {char.name}
                    </p>
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
