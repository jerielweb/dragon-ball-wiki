import { getPlanets } from "@/lib/api";
import { NAV_BAR } from "@/components";
import Link from "next/link";
import Image from "next/image";
import type { PlanetsItem } from "@/types/types.pages";


export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const currentPage = Number(params?.page) || 1;
  const { items, meta } = await getPlanets(currentPage);
    return(
        <>
            <NAV_BAR
                link="/"
                linkP="/"
                showHome={true}
                path="/"
                showtitle={true}
                title="Planetas"
                showLogo={true}
                showNavLinks={false}
            />
            <main className="flex items-center justify-center w-full mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center max-w-300 gap-4">
                    {items.map((planet: PlanetsItem) =>
                        <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs overflow-hidden group rounded-xl" key={planet.id}>
                            <div className="overflow-hidden">
                                <Link href={`/planets/${planet.id}`} className="overflow-hidden w-90 h-45 transition-all duration-300 ease-out">
                                    <Image className="rounded-t-base w-90 h-45 object-cover group-hover:scale-107 group-active:scale-107 transition-all duration-300 ease-out" src={planet.image} alt={planet.name} width={500} height={500}/>
                                </Link>
                            </div>
                            <div className="p-6 text-center">
                                <span className={planet.isDestroyed === true ? "inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm bg-red-300" : "inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm bg-green-300"}>
                                    {planet.isDestroyed === true ? "💥 Destruido" : "🪐 Intacto"}
                                </span>
                                <Link href={`/planets/${planet.id}`}>
                                    <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">{planet.name}</h5>
                                </Link>
                                <Link href={`/planets/${planet.id}`} className="inline-flex rounded-xl items-center text-black bg-amber-300 box-border border border-transparent active:bg-amber-400 hover:bg-amber-400 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 ">
                                    Ver Mas
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div></div>
            </main>
        </>
    );
}