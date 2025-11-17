"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOADING_ICON } from "@/components"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function PaginationButton({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const goTo = (page: number) => {
    const href = `${baseUrl}?page=${page}`;
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      {hasPrevPage && (
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={isPending}
          className="px-4 py-2 text-lg bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >Anterior
        </button>
      )}
      <span className="text-lg px-4 py-2 bg-amber-600 text-white rounded-lg pointer-events-none min-w-[140px] flex flex-row items-center justify-center">
        {isPending ? <LOADING_ICON PendingDots={true} PendingCircle={false} /> : `Página ${currentPage} de ${totalPages}`}
      </span>
      {hasNextPage && (
        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={isPending}
          className="px-4 py-2 text-lg bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
