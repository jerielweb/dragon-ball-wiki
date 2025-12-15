import { getCharacters } from "@/lib/api";
import { ARROW_R, PAGINATION_BUTTON, NAV_BAR } from "@/components";
import type { Item } from "@/types/types.pages";
import Image from "next/image";
import Link from "next/link";

export default async function Charaters({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const currentPage = Number(params?.page) || 1;
  const { items, meta } = await getCharacters(currentPage);

  return (
    <>
      <NAV_BAR
        link="/"
        linkP="/"
        showHome={true}
        path="/"
        showtitle={true}
        title="Personajes"
        showLogo={true}
        showNavLinks={false}
      />
      <main
        id="home"
        className="size-full min-h-screen flex flex-col items-center justify-center mt-15"
      >
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <PAGINATION_BUTTON
            currentPage={currentPage}
            totalPages={meta.totalPages}
            baseUrl="/characters"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center max-w-300 gap-4">
            {items.map((character: Item) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="relative flex flex-col border rounded-lg overflow-hidden group size-fit bg-amber-600"
              >
                <div className="w-70 h-125 overflow-hidden">
                  <span
                    id="overlay"
                    className="absolute w-80 h-20 inset-0 bg-black/50
                            blur-xl z-10 scale-150 -top-15 -left-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
                            "
                  ></span>
                  <h1 className="absolute top-2 left-5 text-white flex flex-col text-3xl font-black text-center z-30 group-hover:text-[35px] transition-all duration-300 ease-out">
                    {character.name}
                  </h1>
                  <div className="size-full object-contain scale-90 group-hover:scale-95 transition-transform duration-300">
                    <Image
                      width={200}
                      height={200}
                      src={character.image}
                      alt={character.name}
                      className="size-full object-contain z-10"
                    />
                  </div>
                </div>
                <div className="flex flex-row bottom-0 p-3 absolute w-full h-auto">
                  <span
                    className="relative left-2 bottom-0 flex-row
                        transition-all duration-300 ease-out size-fit p-1 flex items-center justify-center border group-hover:bottom-0
                        md:-bottom-15
                        bg-amber-800/30
                        -translate-x-2 z-20
                        rounded-full backdrop-blur-xs w-full
                        "
                  >
                    <div className="size-fit flex items-center justify-center group-active:translate-x-4 transition-all duration-100 ease-out">
                      <ARROW_R text={true} size={35} color="#fff" />
                    </div>
                  </span>
                  <span
                    id="overlay"
                    className="absolute w-80 h-20 inset-0 bg-black/50
                            blur-xl z-10 scale-150 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
                            "
                  ></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <PAGINATION_BUTTON
          currentPage={currentPage}
          totalPages={meta.totalPages}
          baseUrl="/characters"
        />
      </main>
    </>
  );
}
