import { getCharacterById, getAllCharacters } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { NAV_BAR } from "@/components"

import {
  translateRace,
  translateGender,
  translateKi,
  translateMaxKi,
  translateAffiliation
} from "@/functions/Characters.translate";

export async function generateStaticParams() {
  try {
    const characters = await getAllCharacters();
    return characters.map((character) => ({
      id: String(character.id),
    }));
  } catch (error) {
    console.error("[generateStaticParams] error fetching characters", error);
    return [];
  }
}

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = (await params) as { id?: string };
  const numericId = id ? parseInt(id, 10) : NaN;

  if (Number.isNaN(numericId)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">ID inválido</h1>
        <Link href="/characters" className="text-blue-500 hover:underline">
          Volver a la lista de personajes
        </Link>
      </div>
    );
  }

  const character = await getCharacterById(numericId);

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Personaje no encontrado</h1>
        <Link href="/characters" className="text-blue-500 hover:underline">
          Volver a la lista de personajes
        </Link>
      </div>
    );
  }
  const allCharacters = await getAllCharacters();
  const currentIndex = allCharacters.findIndex(
    (c) => Number(c.id) === Number(character.id)
  );
  const prevId =
    currentIndex > 0 ? allCharacters[currentIndex - 1].id : null;
  const nextId =
    currentIndex >= 0 && currentIndex < allCharacters.length - 1
      ? allCharacters[currentIndex + 1].id
      : null;

  return (
    <>
    <NAV_BAR
    linkP={prevId ? `/characters/${prevId}` : `/characters`}
    link={nextId ? `/characters/${nextId}` : `/characters`}
    showtitle={true}
    showHome={true}
    title="Detalle del Personaje"
    showLogo={true}
    showNavLinks={true}
    path="/characters"
    />
    <main className="size-full min-h-screen flex flex-col items-center justify-center py-8 pt-20">
      <article className="flex max-w-7xl flex-col gap-7 p-3 size-full">
        <header className="flex flex-row w-full md:gap-8 gap-2">
          <div className="w-40 md:w-50 h-80 flex flex-col items-center justify-center border border-amber-600 rounded-lg md:p-3 p-1">
            <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={400}
            className="rounded-lg size-full object-contain"
            />
          </div>
          <div>
            <h1 className="md:text-5xl text-3xl font-bold mb-4">{character.name}</h1>
            <div className="flex flex-col gap-3">
              <p className="md:text-2xl text-xl">
                <strong>Raza:</strong>&nbsp;{translateRace(character.race)}
              </p>
              <p className="md:text-2xl text-xl">
                <strong>Género:</strong>&nbsp;{translateGender(character.gender)}
              </p>
              <p className="md:text-2xl text-xl">
                <strong>Ki:</strong>&nbsp;{translateKi(character.ki)}
              </p>
              <p className="md:text-2xl text-xl">
                <strong>Ki Máximo:</strong>&nbsp;{translateMaxKi(character.maxKi)}
              </p>
              <p className="md:text-2xl text-xl">
                <strong>Afiliación:</strong>&nbsp;{translateAffiliation(character.affiliation)}
              </p>
            </div>
          </div>
        </header>
        <section>
          <p className="text-xl font-medium">
            {character.description || "Descripción no disponible."}
          </p>
        </section>
        {character.transformations && character.transformations.length > 0 && (
          <section className="w-full">
            <h2 className="text-3xl font-bold mb-4">Transformaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {character.transformations.map((transformation) => (
                <article
                  key={transformation.id}
                  className="border border-amber-600 rounded-lg p-4 flex flex-col items-center"
                >
                  <h3 className="text-2xl font-semibold mb-2">{transformation.name}</h3>
                  <div className="flex w-40 md:w-50 h-80">
                    <Image
                    src={transformation.image}
                    alt={transformation.name}
                    width={200}
                    height={300}
                    className="rounded-lg size-full object-contain"
                    />
                  </div>
                  <p className="my-5 text-xl">
                    <strong>Ki:</strong>&nbsp;{translateKi(transformation.ki)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>

    </main>
    </>
  );
}
